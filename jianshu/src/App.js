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
      	<BrowserRouter>
          <div>
          	<Header/>
        		<Route path='/' exact component={Home} />
        		<Route path='/detail' exact component={()=><div>detail</div>} />
          </div>
      	</BrowserRouter>
    	</Provider>
    );
  }
}

export default App;