import React from 'react'
import PropTypes from 'prop-types'
import { observer, inject } from 'mobx-react'
import { AppState } from '../../store/app-state'

@inject('appState') @observer
export default class TopicDetail extends React.Component {
  constructor() {
    super()
    this.changeName = this.changeName.bind(this)
  }
  componentDidMount() {
    // do
  }
  changeName(e) {
    this.props.appState.changeName(e.target.value)
  }
  render() {
    const { appState } = this.props
    return (
      <div>
        <input type='text' onChange={this.changeName} />
        <p>this is TopicDetail with {appState.msg}</p>
      </div>
    )
  }
}

TopicDetail.propTypes = {
  appState: PropTypes.instanceOf(AppState)
  // 加上isRequired的话，会因为react16版本，mobx报warning
}
