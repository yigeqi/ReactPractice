import {CHANGE_INPUT_VALUE,ADD_TODOLIST,REMOVE_TODOLIST} from './actionTypes'

const defaultState={
	inputVal:'3',
	list:[1,2]
}

export default ((state=defaultState,action)=>{
	if(action.type===CHANGE_INPUT_VALUE){
		const newState=JSON.parse(JSON.stringify(state));
		newState.inputVal=action.value;
		return newState;
	}
	if(action.type===ADD_TODOLIST){
		const newState=JSON.parse(JSON.stringify(state));
		newState.list.push(state.inputVal);
		newState.inputVal='';
		return newState;
	}
	if(action.type===REMOVE_TODOLIST){
		const newState=JSON.parse(JSON.stringify(state));
		newState.list.splice(action.value,1);
		return newState;
	}
	return state;
})