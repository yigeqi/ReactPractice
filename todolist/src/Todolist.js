import React,{Component,Fragment} from 'react';
import TodoItem from './TodoItem';
// import axios from 'axios'
import {Input, Button, List} from 'antd'
import './Todolist.css';
import 'antd/dist/antd.css'

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
            value={this.state.addValue} 
            onChange={this.handleInput}
          />
          <Button type='primary' onClick={this.addItem}>add item</Button>
        </div>
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
    const addValue = e.target.value;
    this.setState(()=>({addValue}))
  }
  addItem(){
    this.setState(prevState=>({
      addValue:'',
      list:[...prevState.list,prevState.addValue]
    }),()=>{console.log(this.itemsWrapper.querySelectorAll('div').length);} );
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
