import React from 'react'
import PropTypes from 'prop-types'
import { observer, inject } from 'mobx-react'
import axios from 'axios';
import AppState from '../../store/app-state'

// export default class TopicDetail extends React.Component {
//   componentDidMount() {
//     // do
//   }
//   render() {
//     return (<div>topic detail</div>)
//   }
// }
@inject('appState') @observer
export default class TopicDetail extends React.Component {
  constructor() {
    super()
    this.changeName = this.changeName.bind(this)
    // this.getTopics = this.getTopics.bind(this)
  }
  componentDidMount() {
    // do
  }
  changeName(e) {
    this.props.appState.changeName(e.target.value)
  }
  /* eslint-disable */
  getTopics() {
    axios.get('/api/topics').then(res => {
      console.log(res)
    }).catch(err => {
      console.log(err)
    })
  }
  mark() {
    axios.post('/api/message/mark_all?needAccessToken=true').then(res => {
      console.log(res)
    }).catch(err => {
      console.log(err)
    })
  }
  login() {
    axios.post('/api/user/login', {accessToken: 'be6-87e5-c9c135b0279b'}).then(res => {
      console.log(res)
    }).catch(err => {
      console.log(err)
    })
  }
  /* eslint-enable */
  render() {
    const { appState } = this.props
    return (
      <div>
        <input type='text' onChange={this.changeName} />
        <p>this is TopicDetail with {appState.msg}</p>
        <button type='button' onClick={this.getTopics}>get topics</button>
        <button type='button' onClick={this.login}>login</button>
        <button type='button' onClick={this.mark}>mark</button>
      </div>
    )
  }
}

TopicDetail.propTypes = {
  appState: PropTypes.instanceOf(AppState)
  // 加上isRequired的话，会因为react16版本，mobx报warning
}
