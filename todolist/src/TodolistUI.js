import React,{Fragment} from 'react';
import TodoItem from './TodoItem';
import {Input, Button, List} from 'antd'

import './Todolist.css';
import 'antd/dist/antd.css'

const TodolistUI = (props)=>(
  <Fragment>
    <div>
      <label htmlFor='textInput'>输入todolist</label>
      <Input style={{width:'300px',margin:'30px'}}
        placeholder='add new todolist here'
        id='textInput' 
        value={props.inputVal} 
        onChange={props.handleInput}
      />
      <Button type='primary' onClick={props.addItem}>add item</Button>
    </div>
    <div>
      <List bordered
        dataSource={props.list}
        renderItem={(item,index)=>(
          <List.Item>
            <TodoItem 
              key={index} 
              item={item} 
              index={index} 
              removeItem={(index)=>{props.removeItem(index)}}
            />
          </List.Item>
        )}
      />
    </div>
  </Fragment>
)

export default TodolistUI;
