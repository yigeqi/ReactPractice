import React,{Component,Fragment} from 'react';
import TodoItem from './TodoItem';
// import axios from 'axios'
import {Input, Button, List} from 'antd'
import store from './store'
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
    //此处需要用charles设置mock接口数据
    // axios.get('/api/todolist').then(resp=>{
    //   this.setState(()=>({list:resp.data}))
    // }).catch(e=>console.log(e))
  }
  render(){
    return (
      <Fragment>
        <div>
          <label htmlFor='textInput'>输入todolist</label>
          <Input style={{width:'300px',margin:'30px'}}
            placeholder='add new todolist here'
            id='textInput' 
            value={this.state.inputVal} 
            onChange={this.handleInput}
          />
          <Button type='primary' onClick={this.addItem}>add item</Button>
        </div>
        {/* <div ref={itemsWrapper=>this.itemsWrapper=itemsWrapper}>*/}
        <div ref={itemsWrapper=>this.itemsWrapper=itemsWrapper}>
          <List bordered
            dataSource={this.state.list}
            renderItem={(item,index)=>(
              <List.Item>
                <TodoItem 
                  key={index} 
                  item={item} 
                  index={index} 
                  removeItem={this.removeItem}
                />
              </List.Item>
            )}
          />
        </div>
      </Fragment>
    )
  }
  handleInput(e){
    const inputVal = e.target.value;
    //this.setState(()=>({inputVal}))
    const action = {
      type: 'change_input_val',
      value: inputVal
    };
    store.dispatch(action);
  }
  addItem(){
    // this.setState(prevState=>({
    //   inputVal:'',
    //   list:[...prevState.list,prevState.inputVal]
    // }),()=>{console.log(this.itemsWrapper.querySelectorAll('div').length);} );
    const action = {
      type: 'add_todolist'
    };
    store.dispatch(action)
  }
  handleStoreChange(){
    this.setState(store.getState())
  }
  removeItem(index){
    // this.setState(prevState=>{
    //   const list=[...prevState.list]
    //   list.splice(index,1);
    //   return {list}
    // })
    const action = {
      type: 'remove_todolist',
      value:index
    }
    store.dispatch(action)
  }
}

export default Todolist;
