import React from 'react'
import axios from 'axios'

class TopicDetail extends React.Component {
  constructor(props) {
    super(props)
    this.getAT = this.getAT.bind(this)
    this.topics = this.topics.bind(this)
    this.login = this.login.bind(this)
    this.markAll = this.markAll.bind(this)
    this.state = {
      accessToken: ''
    }
  }
  componentDidMount() {
    // do
  }
  /* eslint-disable */
  getAT(e) {
    this.setState({ accessToken: e.target.value })
  }
  topics() {
    axios.get('/api/topics')
  }
  login() {
    // const
    axios.post('/api/login', { accesstoken: this.state.accessToken })
  }
  markAll() {
    axios.post('/api/message/mark_all?accessToken=true')
  }
  /* eslint-enable */
  render() {
    return (
      <div>
        <p>this is topic Detail.</p>
        <button type='button' onClick={this.topics}>topics</button>
        <input type='text' placeholder='your accessToken' onChange={this.getAT} />
        <button type='button' onClick={this.login}>login</button>
        <button type='button' onClick={this.markAll}>markAll</button>
      </div>
    )
  }
}

export default TopicDetail
