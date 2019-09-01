import React from 'react'
import ReactDom from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'mobx-react'
import App from './views/App'
import AppState from './store/app-state'

const root = document.getElementById('root')
const initialState = window.__INITIAL_STATE__ || {} // eslint-disable-line
const render = (Component) => {
  ReactDom.hydrate(
    <Provider appState={new AppState(initialState.appState)}>
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
    const App2 = require('./views/App').default // eslint-disable-line
    render(App2)
  });
}
