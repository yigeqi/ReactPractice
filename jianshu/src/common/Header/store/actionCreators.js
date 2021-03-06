import * as constans from './constans';
import axios from 'axios';
import {fromJS} from 'immutable';

export const searchInputFocus = ()=>({
	type:constans.SEARCH_INPUT_FOCUS
})

export const searchInputBlur = ()=>({
	type:constans.SEARCH_INPUT_BLUR
})

const setHostSearchList=(data)=>({
	type:constans.SET_HOT_SEARCH_LIST,
	data:fromJS(data)
})

export const getHotSearchList=()=>{
	return (dispatch)=>{
		axios.get('./api/headerHotSearchItems.json').then(
      (data)=>{
      	dispatch(setHostSearchList(data.data.data))
      }
		)
	}
}

export const switchSearchItems=(page)=>({
	type:constans.SWITCH_SEARCH_ITEMS,
	page
})
export const mouseEnter=()=>({
	type:constans.MOUSE_ENTER
})
export const mouseLeave=()=>({
	type:constans.MOUSE_LEAVE
})