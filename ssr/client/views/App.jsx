import React from 'react'
import { hot } from 'react-hot-loader/root'; // eslint-disable-line
// hot用于开发时的热更新hot-module-replacement

class App extends React.Component {
  componentDidMount() {
    // do
  }
  render() {
    return (<div>this is appss11ss1.</div>)
  }
}

export default module.hot ? hot(App) : App
