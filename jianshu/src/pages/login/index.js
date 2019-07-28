import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { actionCreators } from './store';
import {
	LoginWrapper,
	LoginBox,
	Input,
	Button
} from './style'

class Login extends PureComponent {
	render(){
		return this.props.isLogin ? <Redirect to='/' /> :
			<LoginWrapper>
				<LoginBox>
					<Input placeholder='账号' ref={(input) => {this.account = input}}/>
					<Input placeholder='密码' type='password' ref={(input) => {this.password = input}}/>
					<Button onClick={() => this.props.login(this.account.value, this.password.value)}>登录</Button>
				</LoginBox>
			</LoginWrapper>
	}
}
const mapStateToProps=(state)=>({
	isLogin:state.getIn(['login','isLogin'])
});
const mapDispatchToProps=(dispatch)=>({
  login(account,password){
    dispatch(actionCreators.login(account,password))
  }
})
export default connect(mapStateToProps, mapDispatchToProps)(Login)