import React from 'react'
import { inject, observer } from 'mobx-react'

@inject('appState') @observer
class TopicList extends React.Component {
  componentDidMount() {
    // do
  }
  render() {
    return (
      <div>{this.props.appState.msg}</div>
    )
  }
}

export default TopicList
