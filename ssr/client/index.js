import React from 'react'
import ReactDom from 'react-dom'
import App from './views/App'

const root = document.getElementById('root')
ReactDom.hydrate(<App />, root)

if (module.hot) {
  module.hot.accept('./views/App', () => {
    ReactDom.hydrate(App, root)
  });
}
