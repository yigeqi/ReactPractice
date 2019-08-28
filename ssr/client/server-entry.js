import React from 'react'
// import { StaticRouter } from 'react-router-dom'
// import App from './views/App'

// export default <App /> // 不能写成export default () => <App />，会导致dev-static.js的serverBundle为空字符串
// const createApp = (routerContext, url) => (
//   <StaticRouter context={routerContext} location={url}>
//     <App />
//   </StaticRouter>
// )

// export default createApp
import { StaticRouter } from 'react-router-dom'
import { Provider, useStaticRendering } from 'mobx-react'
import App from './views/App'
import { createStoreMap } from './store/store'

useStaticRendering(true)
// ssr时，不同页面是各自不同的store实例
export default (stores, routerContext, url) => (
  <Provider {...stores}>
    <StaticRouter context={routerContext} location={url}>
      <App />
    </StaticRouter>
  </Provider>
)
export { createStoreMap } // 用于开发模式下的ssr里的serverBundle
