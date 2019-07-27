import * as constans from './constans'

const defaultState={
	focus:false
}

export default (state=defaultState, action)=>{
	switch(action.type){
		case constans.SEARCH_INPUT_FOCUS:
		return {focus:true};
		case constans.SEARCH_INPUT_BLUR:
		return {focus:false};
		default:
		return state;
	}
}