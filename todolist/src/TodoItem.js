import React,{Component} from 'react'
import PropTypes from 'prop-types'

class TodoItem extends Component{
	constructor(props){
		super(props);
		this.delItem=this.delItem.bind(this)
	}
	shouldComponentUpdate(nextProps, nextState){
		return nextProps.item!==this.props.item?true: false;
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
TodoItem.propTypes={
	index: PropTypes.number.isRequired,
	item: PropTypes.string,
	removeItem: PropTypes.func
}
TodoItem.defaultProps={
	item: 'hello'
}
export default TodoItem