import {INIT_TODOLIST, CHANGE_INPUT_VALUE,ADD_TODOLIST,REMOVE_TODOLIST} from './actionTypes'
import axios from 'axios'

export const getInputChangeAction=(value)=>({
	type:CHANGE_INPUT_VALUE,
	value
})

export const getAddTodolistAction=()=>({
	type:ADD_TODOLIST
})

export const getRemoveTodolistAction=(index)=>({
	type:REMOVE_TODOLIST,
	value:index
})

export const initTodolistAction=(list)=>({
	type:INIT_TODOLIST,
	list
})

export const getTodolist=()=>(
	(dispatch)=>{
		axios.get('/api/todolist.json').then(resp=>{
      dispatch(initTodolistAction(resp.data))
    }).catch(e=>console.log(e))
	}
)