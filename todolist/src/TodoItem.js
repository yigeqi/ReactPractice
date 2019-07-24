import React, {
	Component
} from 'react'
import PropTypes from 'prop-types'
import {
	Button
} from 'antd'

class TodoItem extends Component {
	constructor(props) {
		super(props);
		this.delItem = this.delItem.bind(this)
	}
	shouldComponentUpdate(nextProps, nextState) {
		return nextProps.item !== this.props.item ? true : false;
	}
	render() {
		return (
			<div>
				{this.props.item}
				<Button onClick={this.delItem}>remove</Button>
			</div>
		)
	}
	delItem() {
		const {
			removeItem,
			index
		} = this.props;
		removeItem(index)
		//this.props.removeItem(this.props.index)
	}
}
TodoItem.propTypes = {
	index: PropTypes.number.isRequired,
	item: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	removeItem: PropTypes.func
}
TodoItem.defaultProps = {
	item: 'hello'
}
export default TodoItem