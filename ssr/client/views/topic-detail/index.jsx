import React from 'react'
import PropTypes from 'prop-types'
import { observer, inject } from 'mobx-react'
import { AppState } from '../../store/app-state'

@inject('appState') @observer
export default class TopicDetail extends React.Component {
  componentDidMount() {
    // do
  }
  render() {
    const { appState } = this.props
    return (
      <div>
        this is TopicDetail with
        {appState.msg}
      </div>
    )
  }
}

TopicDetail.propTypes = {
  appState: PropTypes.instanceOf(AppState).isRequired
}
