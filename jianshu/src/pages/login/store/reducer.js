import * as constans from './constans'
import { fromJS } from 'immutable'
const defaultState = fromJS({
	isLogin:false
});

export default (state=defaultState, action)=>{
	switch(action.type){
		case constans.TOGGLE_LOGIN:
		  return state.set('isLogin', action.isLogin);
		default:
		  return state;
	}
}