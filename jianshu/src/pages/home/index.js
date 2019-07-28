import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { actionCreators } from './store';
import List from './components/List';
import Recommend from './components/Recommend';
import Writer from './components/Writer';
import {
	HomeWrapper,
	HomeLeft,
	HomeRight,
	BackTop
} from './style'

class Home extends PureComponent {
	backTop(){
		window.scrollTo(0,0);
	}
	componentDidMount(){
    window.addEventListener('scroll',this.props.scrollFn);
	}
	componentWillUnmount(){
    window.removeEventListener('scroll',this.props.scrollFn);
	}
	render(){
		return (
			<HomeWrapper>
				<HomeLeft>
					<img className='banner-img' alt='' src="//upload.jianshu.io/admin_banners/web_images/4318/60781ff21df1d1b03f5f8459e4a1983c009175a5.jpg?imageMogr2/auto-orient/strip|imageView2/1/w/1250/h/540" />
					<List />
				</HomeLeft>
				<HomeRight>
					<Recommend />
					<Writer />
				</HomeRight>
				{this.props.showScrollTop ? <BackTop onClick={this.backTop}>^</BackTop> : null }
			</HomeWrapper>
		)
	}
}
const mapStateToProps=(state)=>({
	showScrollTop:state.getIn(['home','showScrollTop'])
});
const mapDispatchToProps=(dispatch)=>({
  scrollFn(){
    if(document.documentElement.scrollTop>200){
    	dispatch(actionCreators.toggleScrollTop(true))
    }else{
    	dispatch(actionCreators.toggleScrollTop(false))
    }
  }
})
export default connect(mapStateToProps, mapDispatchToProps)(Home)