const ReactDOMServer = require('react-dom/server')
const MemoryFS = require('memory-fs')
const path = require('path')
const axios = require('axios')
const webpack = require('webpack')
const serverConfig = require('../../build/webpack.server.config.js')
const proxy = require('http-proxy-middleware')

// 使用http请求的方式得到index.html
const getTemplate = () => {
  return new Promise((resolve, reject) => {
    axios.get('http://localhost:8888/public/index.html')
      .then(res => resolve(res.data))
      .catch(err => {
        console.error('get template error', err)
      })
  })
}

const mfs = new MemoryFS()
const compiler = webpack(serverConfig)
// 通过webpack(config)可以启动一个compiler,
// 它可以监听config里entry下的文件，有改动时为自动重新打包
const Module = module.constructor
let serverBundle // , createStoreMap

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
  const serverBundleStr = mfs.readFileSync(
    path.join(serverConfig.output.path, serverConfig.output.filename), 'utf8'
  )
  // 把serverBundleStr变成一个可执行的模块
  // console.log(serverBundleStr)
  const m = new Module()
  m._compile(serverBundleStr, 'server-entry.js')
  serverBundle = m.exports.default
  // createStoreMap = m.exports.createStoreMap
})

module.exports = (app) => {
  // 没有proxy的话，后面index.html里的js文件就也会走app.get('*',...)
  app.use('/public', proxy({ target: 'http://localhost:8888' }))

  app.get('*', function (req, res) {
    // 获取index.html后把里面的'<!-- app -->'替换成server端的渲染结果就可以了（目前不支持服务端的路由）
    getTemplate().then(template => {
      const routerContext = {}
      const comp = serverBundle(routerContext, req.url)
      // console.log(comp)
      const content = ReactDOMServer.renderToString(comp)
      const html = template.replace('<!-- app -->', content)
      res.send(html)
    })
  })
}
