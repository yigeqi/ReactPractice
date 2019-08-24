import React from 'react'
import { inject, observer } from 'mobx-react'
import PropTypes from 'prop-types'
import AppState from '../../store/app-state'

@inject('appState') @observer
class TopicList extends React.Component {
  constructor(props) {
    super(props)
    this.changeName = this.changeName.bind(this)
  }
  componentDidMount() {
    // do
  }
  changeName(e) {
    this.props.appState.changeName(e.target.value)
  }
  render() {
    return (
      <div>
        <input type='text' onChange={this.changeName} />
        {this.props.appState.msg}
      </div>
    )
  }
}

TopicList.propTypes = {
  appState: PropTypes.instanceOf(AppState)
}

export default TopicList
