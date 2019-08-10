
import React from 'react'
import ReactDom from 'react-dom'
import App from './app'

const root = document.getElementById('root');

ReactDom.hydrate(<App />, root);

if (module.hot) {
  module.hot.accept('./app', () => {
    ReactDom.hydrate(<App />, root);
  });
}
