import React from 'react';
import {connect} from 'react-redux';
import {
	CSSTransition
} from 'react-transition-group'
import {
	HeaderWrapper,
	Logo,
	Nav,
	NavItem,
	Side,
	Button,
	SearchWrapper,
	SearchInput
} from './style';

const Header = (props) => {
	return (
		<HeaderWrapper>
			<Logo></Logo>
			<Nav>
				<NavItem className='active left'>首页</NavItem>
				<NavItem className='downloadApp left'>下载App</NavItem>
	  		<NavItem className='right'>登录</NavItem>
	  		<NavItem className='right'><i className='iconfont'>&#xe607;</i></NavItem>
	  		<SearchWrapper>
	    		<CSSTransition in={props.focus} timeout={300} classNames='slide'>
						<SearchInput 
			  	    className={props.focus?'focus':''}
			  	    onFocus={props.searchInputFocus}
			  	    onBlur={props.searchInputBlur}>
						</SearchInput>
	  			</CSSTransition>
	  	  	<i className={props.focus?'focus iconfont':'iconfont'} >&#xe60a;</i>
	  		</SearchWrapper>
	  	</Nav>
	  	<Side>
		  	<Button>注册</Button>
		  	<Button className='write'>写文章</Button>
		  </Side>
		</HeaderWrapper>
	);
}
const mapStateToProps=(state)=>({
	focus:state.header.focus
});
const mapDispatchToProps=(dispatch)=>({
	searchInputFocus(){
		dispatch({type:'search_input_focus'})
	},
	searchInputBlur(){
		dispatch({type:'search_input_blur'})
	}
})

export default connect(mapStateToProps,mapDispatchToProps)(Header);