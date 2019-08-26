import React from 'react'
import { hot } from 'react-hot-loader/root'; // eslint-disable-line
// hot用于开发时的热更新hot-module-replacement
// import { Link } from 'react-router-dom'
// import Routes from '../config/router'

class App extends React.Component {
  componentDidMount() {
    // do
  }
  render() {
    return (
      <div>THIS IS APPss11111122222
        {/* <div>
          <Link to='/'>to home</Link>
          <br />
          <Link to='/detail'>to detail</Link>
        </div>
        <Routes /> */}
      </div>
    )
  }
}

export default module.hot ? hot(App) : App
