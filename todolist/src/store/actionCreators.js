import {INIT_TODOLIST, CHANGE_INPUT_VALUE,ADD_TODOLIST,REMOVE_TODOLIST} from './actionTypes'

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
