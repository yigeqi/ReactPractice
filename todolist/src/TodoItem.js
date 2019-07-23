import React,{Component} from 'react'

class TodoItem extends Component{
	constructor(props){
		super(props);
		this.delItem=this.delItem.bind(this)
	}
	render(){
		return (
			<div>{this.props.item}<button onClick={this.delItem}>remove</button></div>
		)
	}
	delItem(){
		const {removeItem,index}=this.props;
		removeItem(index)
		//this.props.removeItem(this.props.index)
	}
}
export default TodoItem