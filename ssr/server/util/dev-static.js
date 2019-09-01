const ReactDOMServer = require('react-dom/server')
const MemoryFS = require('memory-fs')
const path = require('path')
const axios = require('axios')
const webpack = require('webpack')
const ssrPrepass = require('react-ssr-prepass')
const ejs = require('ejs')
const serialize = require('serialize-javascript')
const Helmet = require('react-helmet').default
const serverConfig = require('../../build/webpack.server.config.js')
const proxy = require('http-proxy-middleware')

// 使用http请求的方式得到index.html
const getTemplate = () => {
  return new Promise((resolve, reject) => {
    axios.get('http://localhost:8888/public/server.ejs')
      .then(res => resolve(res.data))
      .catch(err => {
        console.error('get template error', err)
      })
  })
}

const NativeModule = require('module')
const vm = require('vm')
const getModuleFromString = (bundle, filename) => {
  const m = { exports: {} }
  const wrapper = NativeModule.wrap(bundle)
  const script = new vm.Script(wrapper, {
    filename: filename,
    displayErrors: true
  })
  const result = script.runInThisContext()
  result.call(m.exports, m.exports, require, m)
  return m
}

const mfs = new MemoryFS()
const compiler = webpack(serverConfig)
// 通过webpack(config)可以启动一个compiler,
// 它可以监听config里entry下的文件，有改动时为自动重新打包
// const Module = module.constructor
let serverBundle, createStoreMap

compiler.outputFileSystem = mfs
// 把webpack打包结果放到内存中，而非硬盘中（慢）
compiler.watch({}, (err, stats) => {
  // 错误处理
  if (err) {
    console.error(err.stack || err)
    if (err.details) {
      console.error(err.details)
    }
    return
  }
  const info = stats.toJson()
  if (stats.hasErrors()) {
    console.error(info.errors)
  }
  if (stats.hasWarnings()) {
    console.warn(info.warnings)
  }
  // 之后读取内存中build的文件：
  const bundle = mfs.readFileSync(
    path.join(serverConfig.output.path, serverConfig.output.filename), 'utf8'
  )
  // 把bundle变成一个可执行的模块
  // const m = new Module()
  // m._compile(bundle, 'server-entry.js')
  const m = getModuleFromString(bundle, 'server-entry.js')
  serverBundle = m.exports.default
  createStoreMap = m.exports.createStoreMap
})
const getStoreStates = (stores) => {
  return Object.keys(stores).reduce((result, storeName) => {
    result[storeName] = stores[storeName].toJSON() // toJSON方法来自app-state.js
    return result
  }, {})
}
module.exports = (app) => {
  // 没有proxy的话，后面index.html里的js文件就也会走app.get('*',...)
  app.use('/public', proxy({ target: 'http://localhost:8888' }))

  app.get('*', function (req, res) {
    // 获取index.html后把里面的'<!-- app -->'替换成server端的渲染结果就可以了（目前不支持服务端的路由）
    getTemplate().then(template => {
      const routerContext = {}
      // console.log(asyncBootstrap, createStoreMap)
      const stores = createStoreMap()
      const comp = serverBundle(stores, routerContext, req.url)
      // ssrPrepass用于在render之前调用组件的fetchData方法获取数据
      ssrPrepass(comp, (_element, instance) => {
        if (instance !== undefined && typeof instance.fetchData === 'function') {
          return instance.fetchData()
        }
      }).then(() => {
        // 当页面有redirect时，默认ssr不会渲染redicrctTo的组件，但是routerContext会有url属性,可以做手动跳转
        if (routerContext.url) {
          res.status(302).setHeader('Location', routerContext.url)
          res.end()
          return
        }
        const content = ReactDOMServer.renderToString(comp)
        const helmet = Helmet.renderStatic()
        let state = getStoreStates(stores)
        state = serialize(state)
        const html = ejs.render(template, {
          appString: content,
          initialState: state,
          helmet
        })
        // const html = template.replace('<!-- app -->', content)
        res.send(html)
      }).catch(err => console.log(err))
    })
  })
}
