import React from 'react'
import { hot } from 'react-hot-loader/root';

class App extends React.Component {
	render() {
		return (<div>this is app111.</div>)
	}
}

export default module.hot ? hot(App) : App

