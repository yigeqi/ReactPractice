import React, {
	Component
} from 'react';
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

class Header extends Component {
	render() {
		return (
			<HeaderWrapper>
			<Logo></Logo>
			<Nav>
		  <NavItem className='active left'>首页</NavItem>
		  <NavItem className='downloadApp left'>下载App</NavItem>
		  <NavItem className='right'>登录</NavItem>
		  <NavItem className='right'><i className='iconfont'>&#xe607;</i></NavItem>
		  <SearchWrapper>
		  	<SearchInput></SearchInput>
		  	<i className='iconfont'>&#xe60a;</i>
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

export default Header;