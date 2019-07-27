import * as constans from './constans'
import { fromJS } from 'immutable'
const defaultState = fromJS({
	articleList:[],
	page:1
});

export default (state=defaultState, action)=>{
	switch(action.type){
		case constans.SET_ARTICLE_LIST:
		  return state.merge({
		  	articleList:fromJS(state.get('articleList').concat(action.data)),
		  	page:action.page
		  });
		default:
		  return state;
	}
}