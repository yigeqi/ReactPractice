import React, { PureComponent } from 'react'
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { ListItem, ListInfo, LoadMore } from '../style';
import { actionCreators } from '../store'

class List extends PureComponent {
	componentDidMount(){
		this.props.getArticleList(this.props.page);
	}
	render(){
		return (
			<div>
				{this.props.list.map(item=>(
					<Link to={'/detail/'+item.get('id')} key={item.get('id')}>
						<ListItem>
							<img alt='' className='pic' src={item.get('imgUrl')} />
							<ListInfo>
								<h3 className='title'>{item.get('title')}</h3>
								<p className='desc'>{item.get('desc')}</p>
							</ListInfo>
						</ListItem>
					</Link>
				))}
				<LoadMore 
					className={this.props.page>=4?'disabled':''} 
					onClick={() => this.props.getArticleList(this.props.page)}>
						更多文字
				</LoadMore>
			</div>)
	}
}
const mapStateToProps=(state)=>({
	list: state.getIn(['home', 'articleList']),
	page: state.getIn(['home', 'page'])
});
const mapDidpatchToProps=(dispatch)=>({
	getArticleList(page){
		page<4 && dispatch(actionCreators.getArticleList(page))
	}
});
export default connect(mapStateToProps,mapDidpatchToProps)(List);