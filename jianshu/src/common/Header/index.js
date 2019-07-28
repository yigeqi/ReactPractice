import React, { PureComponent } from 'react';
import {connect} from 'react-redux';
import { Link } from 'react-router-dom';
import { CSSTransition } from 'react-transition-group';
import { actionCreators } from './store';
import { actionCreators as loginActionCreators } from '../../pages/login/store';
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

class Header extends PureComponent {
	getHotSearchList(){//0-9,10-19,20-29,(page-1)*10--(page*10-1)
		const { focus, isMouseEnter, hotSearchList, page } = this.props;
		return focus||isMouseEnter?(
			<SearchInfoWrapper onMouseEnter={this.props.mouseEnter} onMouseLeave={this.props.mouseLeave}>
	  		<span className='title'>热门搜索</span>
	  		<span onClick={()=>this.props.switchSearchItems(page,hotSearchList,this.spinIcon)} className='switch'>
		  		<i ref={spinIcon=>this.spinIcon=spinIcon} className='iconfont spinIcon'>&#xe602;</i>换一批
	  		</span>
	  		<SearchInfo>
	  		  {hotSearchList.slice((page-1)*10,(page*10-1)).map(
	  		  	item=><SearchInfoItem key={item}>{item}</SearchInfoItem>)}
	  		</SearchInfo>
	  	</SearchInfoWrapper>):null;

	}
	render(){
		return (
			<HeaderWrapper>
				<Link to='/'>
					<Logo></Logo>
				</Link>
				<Nav>
					<Link to='/'><NavItem className='active left'>首页</NavItem></Link>
					<NavItem className='downloadApp left'>下载App</NavItem>
		  		{this.props.isLogin?
		  			<NavItem onClick={this.props.logout} className='right'>登出</NavItem> : 
		  			<Link to='/login'><NavItem className='right'>登录</NavItem></Link>
		  		}
		  		<NavItem className='right'><i className='iconfont'>&#xe607;</i></NavItem>
		  		<SearchWrapper>
		    		<CSSTransition in={this.props.focus} timeout={300} classNames='slide'>
							<SearchInput 
				  	    className={this.props.focus?'focus':''}
				  	    onFocus={()=>this.props.searchInputFocus(this.props.hotSearchList)}
				  	    onBlur={()=>this.props.searchInputBlur(this.props.isMouseEnter)}>
							</SearchInput>
		  			</CSSTransition>
		  	  	<i className={this.props.focus?'focus iconfont zoom':'iconfont  zoom'} >&#xe60a;</i>
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
	isLogin:state.getIn(['login','isLogin']),
	focus:state.getIn(['header', 'focus']),
	isMouseEnter:state.getIn(['header', 'isMouseEnter']),
	hotSearchList:state.getIn(['header','hotSearchList']),
	page:state.getIn(['header','page'])
});
const mapDispatchToProps=(dispatch)=>({
	logout(){
		dispatch(loginActionCreators.toggleLogin(false));
	},
	searchInputFocus(list){
    list.size===0&&dispatch(actionCreators.getHotSearchList())
		dispatch(actionCreators.searchInputFocus());
	},
	searchInputBlur(isMouseEnter){
		dispatch(actionCreators.searchInputBlur());
	},
	switchSearchItems(page, hotSearchList,spinIcon){
		//”换一批“前的spinIcon的转圈动画效果
		let angle = spinIcon.style.transform.replace(/[^\d]/ig,'');
		angle = angle ? parseInt(angle, 10)+360 : 360;
		spinIcon.style.transform = `rotate(${angle}deg)`;
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