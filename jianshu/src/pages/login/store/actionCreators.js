import * as constans from './constans';

export const toggleLogin = (isLogin)=>({
	type:constans.TOGGLE_LOGIN,
	isLogin
});
export const login = (account,password)=>(
  (dispatch)=>{
		//axios 发送 登录请求，此处省略，假设返回都是成功登录
		dispatch(toggleLogin(true))
  }
)

 