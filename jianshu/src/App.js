import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter, Route } from "react-router-dom";
import Header from './common/Header';
import store from './store';
import Home from './pages/home';
import Detail from './pages/detail';
import Login from './pages/login';

class App extends Component {
  render() {
    return (
    	<Provider store={store}>
      	<BrowserRouter>
        		<Route path='/' exact render={()=><div><Header/><Home/></div>} />
        		<Route path='/detail/:id' exact render={(routeProps)=><div><Header/><Detail {...routeProps}/></div>} />
            <Route path='/login' exact component={Login} />
      	</BrowserRouter>
    	</Provider>
    );
  }
}
export default App;
// export default connect(mapStateToProps,null)(App);