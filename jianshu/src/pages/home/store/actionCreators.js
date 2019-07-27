import * as constans from './constans';
import axios from 'axios';
import {fromJS} from 'immutable';

const setArticleList=(data,page)=>({
	type:constans.SET_ARTICLE_LIST,
	// data,
	data:fromJS(data),
	page
})

export const getArticleList=(page)=>{
	return (dispatch)=>{
		axios.get(`./api/homeArticleList.json?page=${page}`).then(
	  (data)=>{
	  	//0-4,5-9,10-14 (page-1)*5--(page*5-1)
	  	dispatch(setArticleList(data.data.data.slice((page-1)*5, page*5),page+1))
	  })
	}
}
