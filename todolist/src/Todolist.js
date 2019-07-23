import React,{Component,Fragment} from 'react';
import './Todolist.css';
import TodoItem from './TodoItem'

class Todolist extends Component {
  constructor(props){
    super(props);
    this.state={
      addValue:'',
      list:[]
    }
    this.handleInput=this.handleInput.bind(this)
    this.addItem=this.addItem.bind(this)
    this.removeItem=this.removeItem.bind(this)
  }
  render(){
    return (
      <Fragment>
        <div>
          <label htmlFor='textInput'>输入todolist</label>
          <input 
            id='textInput' 
            value={this.state.addValue} 
            onChange={this.handleInput}
          />
          <button onClick={this.addItem}>add item</button>
        </div>
        <div>
          {this.getItems()}
        </div>
      </Fragment>
    )
  }
  getItems(){
    return this.state.list.map((item,index)=>{
       return (
        <TodoItem 
          key={index} 
          item={item} 
          index={index} 
          removeItem={this.removeItem}
        />)
    })
  }
  handleInput(e){
    const addValue = e.target.value;
    this.setState(()=>({addValue}))
  }
  addItem(){
    this.setState(prevState=>({
      addValue:'',
      list:[...prevState.list,prevState.addValue]
    }))
  }
  removeItem(index){
    this.setState(prevState=>{
      const list=[...prevState.list]
      list.splice(index,1);
      return {list}
    })
  }
}

export default Todolist;
