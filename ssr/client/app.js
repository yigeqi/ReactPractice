import React from 'react'
import { hot } from 'react-hot-loader/root'; // eslint-disable-line
import { BrowserRouter, Link } from 'react-router-dom'
import Routers from './config/routers'

class App extends React.Component {
  componentDidMount() {
    // do
  }
  render() {
    return (
      <BrowserRouter>
        <Link to='/'>首页</Link>
        <Link to='/detail'>详情页</Link>
        <Routers />
      </BrowserRouter>
    )
  }
}

export default module.hot ? hot(App) : App
