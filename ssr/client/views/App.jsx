import React from 'react'
import { hot } from 'react-hot-loader/root'; // eslint-disable-line
// hot用于开发时的热更新hot-module-replacement
import { BrowserRouter, Link } from 'react-router-dom'
import Routes from '../config/router'

class App extends React.Component {
  componentDidMount() {
    // do
  }
  render() {
    return (
      <BrowserRouter>
        <div>
          <Link to='/'>to home</Link>
          <br />
          <Link to='/detail'>to detail</Link>
        </div>
        <Routes />
      </BrowserRouter>
    )
  }
}

export default module.hot ? hot(App) : App