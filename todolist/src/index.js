import React from 'react';
import ReactDOM from 'react-dom';
import Todolist from './Todolist';
import store from './store'
import {Provider} from 'react-redux'


const App=()=>(
	<Provider store={store}>
		<Todolist/>
	</Provider>
);	

ReactDOM.render(<App />, document.getElementById('root'));
 