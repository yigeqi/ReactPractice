import React from 'react'
// import { StaticRouter } from 'react-router-dom'
import App from './views/App'

export default <App /> // 不能写成export default () => <App />，会导致dev-static.js的serverBundle为空字符串
// const createApp = (routerContext, url) => (
//   <StaticRouter context={routerContext} location={url}>
//     <App />
//   </StaticRouter>
// )

// export default createApp
