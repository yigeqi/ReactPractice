import React, { PureComponent } from 'react';

class Detail extends PureComponent {
	render(){
		return (
			<div>this is detail page with id is {this.props.match.params.id}</div>)
	}
}

export default Detail