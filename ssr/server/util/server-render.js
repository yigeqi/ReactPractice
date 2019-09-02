const ReactDOMServer = require('react-dom/server')
const ssrPrepass = require('react-ssr-prepass')
const ejs = require('ejs')
const serialize = require('serialize-javascript')
const Helmet = require('react-helmet').default

const getStoreStates = (stores) => {
  return Object.keys(stores).reduce((result, storeName) => {
    result[storeName] = stores[storeName].toJSON() // toJSON方法来自app-state.js
    return result
  }, {})
}

module.exports = (bundle, template, req, res) => {
  return new Promise((resolve, reject) => {
    const createStoreMap = bundle.createStoreMap
    const createApp = bundle.default
    const routerContext = {}
    const stores = createStoreMap()
    const app = createApp(stores, routerContext, req.url)
    // ssrPrepass用于在render之前调用组件的fetchData方法获取数据
    ssrPrepass(app, (_element, instance) => {
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
      const content = ReactDOMServer.renderToString(app)
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
      resolve()
    }).catch(reject)
  })
}
