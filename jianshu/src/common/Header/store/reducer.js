import * as constans from './constans'
import { fromJS } from 'immutable'
const defaultState = fromJS({
	focus:false,
	hotSearchList:[]
});

export default (state=defaultState, action)=>{
	switch(action.type){
		case constans.SEARCH_INPUT_FOCUS:
		  return state.set('focus', true);
		case constans.SEARCH_INPUT_BLUR:
		  return state.set('focus', false);
		case constans.SET_HOT_SEARCH_LIST:
		  return state.set('hotSearchList',action.data)
		default:
		  return state;
	}
}