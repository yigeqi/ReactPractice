const defaultState={
	focus:false
}

export default (state=defaultState, action)=>{
	switch(action.type){
	  case 'search_input_focus':
      return {focus:true};
	  case 'search_input_blur':
	    return {focus:false};
	  default:
  	  return state;
	}
}