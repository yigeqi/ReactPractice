import React, {
	Component
} from 'react';
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

class Header extends Component {
	constructor(props) {
		super(props);
		this.state = {
			focus: false
		};
		this.searchInputFocus = this.searchInputFocus.bind(this);
		this.searchInputBlur = this.searchInputBlur.bind(this);
	}
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
		    		<CSSTransition in={this.state.focus} timeout={300} classNames='slide'>
							<SearchInput 
				  	    className={this.state.focus?'focus':''}
				  	    onFocus={this.searchInputFocus}
				  	    onBlur={this.searchInputBlur}>
							</SearchInput>
		  			</CSSTransition>
		  	  	<i className={this.state.focus?'focus iconfont':'iconfont'} >&#xe60a;</i>
		  		</SearchWrapper>
		  	</Nav>
		  	<Side>
			  	<Button>注册</Button>
			  	<Button className='write'>写文章</Button>
			  </Side>
			</HeaderWrapper>
		);
	}
	searchInputFocus() {
		this.setState({
			focus: true
		});
	}
	searchInputBlur() {
		this.setState({
			focus: false
		});
	}
}

export default Header;