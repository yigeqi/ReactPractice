import React, {
  Component
} from 'react';
import TodolistUI from './TodolistUI'
import {
  connect
} from 'react-redux'
import {
  getTodolistAction,
  getInputChangeAction,
  getAddTodolistAction,
  getRemoveTodolistAction
} from './store/actionCreators'
import store from './store'

import './Todolist.css';
import 'antd/dist/antd.css'

class Todolist extends Component {
  constructor(props) {
    super(props);
    this.state = store.getState();
  }
  componentDidMount() {
    store.dispatch(getTodolistAction())
  }
  render() {
    return (
      <TodolistUI
        inputVal={this.props.inputVal}
        list={this.props.list}
        handleInput={this.props.handleInput}
        addItem={this.props.addItem}
        removeItem={this.props.removeItem}
      />
    )
  }
}

const mapStateToProps = (state) => ({
  inputVal: state.inputVal,
  list: state.list
})
const mapDispatchToProps = (dispatch) => ({
  handleInput(e) {
    const inputVal = e.target.value;
    dispatch(getInputChangeAction(inputVal));
  },
  addItem() {
    dispatch(getAddTodolistAction())
  },
  removeItem(index) {
    dispatch(getRemoveTodolistAction(index))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(Todolist);