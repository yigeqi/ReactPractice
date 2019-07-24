import React,{Component} from 'react';
import TodolistUI from './TodolistUI'
import store from './store'
import axios from 'axios'
import {initTodolistAction, getInputChangeAction,getAddTodolistAction,getRemoveTodolistAction} from './store/actionCreators'

import './Todolist.css';
import 'antd/dist/antd.css'

class Todolist extends Component {
  constructor(props){
    super(props);
    this.state=store.getState();
    this.handleInput=this.handleInput.bind(this)
    this.addItem=this.addItem.bind(this)
    this.removeItem=this.removeItem.bind(this)
    this.handleStoreChange=this.handleStoreChange.bind(this)
    store.subscribe(this.handleStoreChange)
  }
  componentDidMount(){
    axios.get('/api/todolist.json').then(resp=>{
      store.dispatch(initTodolistAction(resp.data))
    }).catch(e=>console.log(e))          
  }
  render(){
    return (
      <TodolistUI
        inputVal={this.state.inputVal}
        list={this.state.list}
        handleInput={this.handleInput}
        addItem={this.addItem}
        removeItem={this.removeItem}
      />
    )
  }
  handleInput(e){
    const inputVal = e.target.value;
    store.dispatch(getInputChangeAction(inputVal));
  }
  addItem(){
    store.dispatch(getAddTodolistAction())
  }
  handleStoreChange(){
    this.setState(store.getState())
  }
  removeItem(index){
    store.dispatch(getRemoveTodolistAction(index))
  }
}

export default Todolist;
