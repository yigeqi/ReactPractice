import React from 'react'
import { inject, observer } from 'mobx-react'
import PropTypes from 'prop-types'
import { AppState } from '../../store/app-state'

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

TopicList.propTypes = {
  appState: PropTypes.instanceOf(AppState)
}

export default TopicList
