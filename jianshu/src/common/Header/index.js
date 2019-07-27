import React, { Component } from 'react';
import {connect} from 'react-redux';
import { CSSTransition } from 'react-transition-group';
import { actionCreators } from './store';
import {
	HeaderWrapper,
	Logo,
	Nav,
	NavItem,
	Side,
	Button,
	SearchWrapper,
	SearchInput,
	SearchInfoWrapper,
	SearchInfo,
	SearchInfoItem
} from './style';

class Header extends Component {
	constructor(props){
		super(props);
	}
	getHotSearchList(){
		let listItems;
		if(this.props.focus){
			listItems = this.props.hotSearchList.map(item=><SearchInfoItem key={item}>{item}</SearchInfoItem>);
		}
		return this.props.focus?(<SearchInfoWrapper>
	  	  		<span className='title'>热门搜索</span><span className='switch'>换一批</span>
	  	  		<SearchInfo>
	  	  		  {listItems}
	  	  		</SearchInfo>
	  	  	</SearchInfoWrapper>):null;

	}
	render(){
	return (
		<HeaderWrapper>
			<Logo></Logo>
			<Nav>
				<NavItem className='active left'>首页</NavItem>
				<NavItem className='downloadApp left'>下载App</NavItem>
	  		<NavItem className='right'>登录</NavItem>
	  		<NavItem className='right'><i className='iconfont'>&#xe607;</i></NavItem>
	  		<SearchWrapper>
	    		<CSSTransition in={this.props.focus} timeout={300} classNames='slide'>
						<SearchInput 
			  	    className={this.props.focus?'focus':''}
			  	    onFocus={()=>this.props.searchInputFocus(this.props.hotSearchList)}
			  	    onBlur={this.props.searchInputBlur}>
						</SearchInput>
	  			</CSSTransition>
	  	  	<i className={this.props.focus?'focus iconfont':'iconfont'} >&#xe60a;</i>
	  	  	{this.getHotSearchList()}
	  		</SearchWrapper>
	  	</Nav>
	  	<Side>
		  	<Button>注册</Button>
		  	<Button className='write'>写文章</Button>
		  </Side>
		</HeaderWrapper>
	);
  }
}
const mapStateToProps=(state)=>({
	focus:state.getIn(['header', 'focus']),
	hotSearchList:state.getIn(['header','hotSearchList'])
});
const mapDispatchToProps=(dispatch)=>({
	searchInputFocus(list){
    list.size==0&&dispatch(actionCreators.getHotSearchList())
		dispatch(actionCreators.searchInputFocus());
	},
	searchInputBlur(){
		dispatch(actionCreators.searchInputBlur());
	}
})

export default connect(mapStateToProps,mapDispatchToProps)(Header);