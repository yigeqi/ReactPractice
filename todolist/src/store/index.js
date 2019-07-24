import {createStore} from 'redux'
import reducer from './reducer'

const store=createStore(reducer,
/*为了使浏览器的redux dev tools生效*/
window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)

export default store;
