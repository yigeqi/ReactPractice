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
	getHotSearchList(){//0-9,10-19,20-29,(page-1)*10--(page*10-1)
		const { focus, isMouseEnter, hotSearchList, page } = this.props;
		return focus||isMouseEnter?(<SearchInfoWrapper onMouseEnter={this.props.mouseEnter} onMouseLeave={this.props.mouseLeave}>
  		<span className='title'>热门搜索</span>
  		<span onClick={()=>this.props.switchSearchItems(page,hotSearchList)} className='switch'>换一批</span>
	  		<SearchInfo>
	  		  {hotSearchList.slice((page-1)*10,(page*10-1)).map(
	  		  	item=><SearchInfoItem key={item}>{item}</SearchInfoItem>)}
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
				  	    onBlur={()=>this.props.searchInputBlur(this.props.isMouseEnter)}>
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
	isMouseEnter:state.getIn(['header', 'isMouseEnter']),
	hotSearchList:state.getIn(['header','hotSearchList']),
	page:state.getIn(['header','page'])
});
const mapDispatchToProps=(dispatch)=>({
	searchInputFocus(list){
    list.size==0&&dispatch(actionCreators.getHotSearchList())
		dispatch(actionCreators.searchInputFocus());
	},
	searchInputBlur(isMouseEnter){
		dispatch(actionCreators.searchInputBlur());
	},
	switchSearchItems(page, hotSearchList){
		const totalPage = hotSearchList.toJS().length/10;
		dispatch(actionCreators.switchSearchItems(page>=totalPage ? 1 : page+1));
	},
	mouseEnter(){
		dispatch(actionCreators.mouseEnter())
	},
	mouseLeave(){
		dispatch(actionCreators.mouseLeave())
	}
})

export default connect(mapStateToProps,mapDispatchToProps)(Header);