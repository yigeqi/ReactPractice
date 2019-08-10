import React from 'react'
import { hot } from 'react-hot-loader/root'; // eslint-disable-line
import { BrowserRouter, Link } from 'react-router-dom'
import { Provider } from 'mobx-react'
import Routers from './config/routers'
import { appState } from './store/app-state'

class App extends React.Component {
  componentDidMount() {
    // do
  }
  render() {
    return (
      <Provider appState={appState}>
        <BrowserRouter>
          <Link to='/'>首页</Link>
          <Link to='/detail'>详情页</Link>
          <Routers />
        </BrowserRouter>
      </Provider>
    )
  }
}

export default module.hot ? hot(App) : App
