import React from 'react'
import ReactDom from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'mobx-react'
import App from './views/App'
import appState from './store/app-state'

const root = document.getElementById('root')
// const render = (Component) => {
//   ReactDom.hydrate(
//     <BrowserRouter>
//       <Component />
//     </BrowserRouter>,
//     root
//   )
// }
const render = (Component) => {
  ReactDom.hydrate(
    <Provider appState={appState}>
      <BrowserRouter>
        <Component />
      </BrowserRouter>
    </Provider>,
    root
  )
}
render(App)
if (module.hot) {
  module.hot.accept('./views/App', () => {
    // ReactDom.hydrate(App, root)
    // const NextApp = require('./views/App').default  // eslint-disable-line
    // render(NextApp)
    render(App)
  });
}
