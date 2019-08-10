import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import TopicList from '../views/topic-list'
import TopicDetail from '../views/topic-detail'

// export default () => [
const Routers = () => [
  <Route key='/' exact path='/' render={() => (<Redirect to='/list' />)} />,
  <Route key='list' exact path='/list' component={TopicList} />,
  <Route key='detail' exact path='/detail' component={TopicDetail} />
]

export default Routers
