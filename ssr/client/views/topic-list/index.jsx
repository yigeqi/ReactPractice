import React from 'react'
import Helmet from 'react-helmet'

class TopicList extends React.Component {
  componentDidMount() {
    // do
  }
  render() {
    return (
      <div>
        <Helmet>
          <title>this is topic list title</title>
          <meta name='description' content='topic-list description' />
        </Helmet>
        <div>this is TopicList.</div>
      </div>
    )
  }
}

export default TopicList
