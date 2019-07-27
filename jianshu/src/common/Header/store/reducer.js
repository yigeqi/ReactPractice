import * as constans from './constans'
import { fromJS } from 'immutable'
const defaultState = fromJS({
	focus:false,
	isMouseEnter:false,
	hotSearchList:[],
	page:1
});

export default (state=defaultState, action)=>{
	switch(action.type){
		case constans.SEARCH_INPUT_FOCUS:
		  return state.set('focus', true);
		case constans.SEARCH_INPUT_BLUR:
		  return state.set('focus', false);
		case constans.SET_HOT_SEARCH_LIST:
		  return state.set('hotSearchList',action.data)
		case constans.SWITCH_SEARCH_ITEMS:
			return state.set('page',action.page);
		case constans.MOUSE_ENTER:
			return state.set('isMouseEnter',true);
		case constans.MOUSE_LEAVE:
			return state.set('isMouseEnter',false);
		default:
		  return state;
	}
}