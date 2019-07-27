import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter, Route } from "react-router-dom";
import Header from './common/Header';
import store from './store'
import Home from './pages/home'


class App extends Component {
  render() {
    return (
    	<Provider store={store}>
          <div>
          	<Header/>
          	<BrowserRouter>
          		<Route path='/' exact component={Home} />
          		<Route path='/detail' exact component={()=><div>detail</div>} />
          	</BrowserRouter>
          </div>
    	</Provider>
    );
  }
}

export default App;