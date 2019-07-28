import styled from 'styled-components';
import logoPic from '../../static/nav-logo.png';

export const HeaderWrapper = styled.div `
height:56px;
position:relative;
border-bottom:1px solid #f0f0f0;
`;
export const Logo = styled.div`
width:100px;
position:absolute;
top:0;
left:0;
height:100%;
display:block;
background:url(${logoPic});
background-size:contain;
`;export const Nav = styled.div `
height:100%;
width:960px;
margin:0 auto;
`;
export const NavItem = styled.div `
height:100%;
line-height:56px;
padding:0 20px;
&.active{
	color:#ea6f5a;
}
&.downloadApp{
	color:#333;
}
&.left{
	float:left;
	font-size:17px;
}
&.right{
	color:#969696;
	float:right;
	font-size:15px;
}
`;
export const SearchWrapper = styled.div `
float:left;
position:relative;
.zoom{
	position: absolute;
	right: 1px;
	bottom: 1px;
	width: 30px;
	line-height: 30px;
	border-radius: 15px;
	text-align: center;
	&.focus{
		color:#fff;
		background:#666;
	}}`;
export const SearchInput = styled.input.attrs({placeholder: '搜索'})`
	outline:none;
	border:none;
	background:#eee;
	height:31px;
	width:160px;
	margin-top:10px;
	margin-left:20px;
	padding:0 36px 0 10px;
	border-radius: 15px;
	font-size:14px;
	color:#666;
	&::placeholder{
		color:#999;
	}
	&.focus{
		width:240px;
	}
	&.slide-enter {
		transition: all .3s ease-out;
	} &
	.slide-enter-active {
		width: 240px;
	} &
	.slide-exit {
		transition: all .3s ease-out;
	} &
	.slide-exit-active {
		width: 160px;
	}
`;
export const SearchInfoWrapper=styled.div`
	position: absolute;
	left: 22px;
	top: 56px;
	width: 240px;
	padding: 5px 20px;
	box-shadow: 0 0 8px rgba(0, 0, 0, .2);
	background: #fff;
	&::before{
    content: "";
    left: 33px;
    width: 12px;
    height: 12px;
    -webkit-transform: rotate(45deg);
    -ms-transform: rotate(45deg);
    transform: rotate(45deg);
    top: -6px;
    z-index: 1;
    position: absolute;
    background: #fff;
	}
	.title{
		margin-top: 20px;
	  margin-bottom: 15px;
	  line-height: 20px;
	  font-size: 14px;
	  color: #969696;
	}
	.switch{
	  color: #969696;
		float:right;
		margin-top:5px;
		font-size: 13px;
	  cursor: pointer;
	}
	.spinIcon{
		display:block;
		float:left;
		font-size:12px;
		margin-right:5px;
		margin-top:1px;
		transition: all .3s ease-in;
	}
`;
export const SearchInfo = styled.div`
overflow:hidden;
padding-top: 10px;
`;
export const SearchInfoItem = styled.a`
	display: block;
	float: left;
	line-height: 20px;
	padding: 0 5px;
	margin-right: 10px;
	margin-bottom: 10px;
	font-size: 12px;
	border: 1px solid #ddd;
	color: #787878;
	border-radius: 3px;
`;
export const Side = styled.div `
	position: absolute;
	right: 0;
	top: 0;
	overflow: hidden;
	`;
export const Button = styled.div `
	width: 80px;
	height: 38px;
	float: left;
	margin-right: 20px;
	line-height: 38px;
	margin-top: 8px;
	text-align: center;
	border: 1px solid #ea6f5a;
	border-radius: 20px;
	color: #ea6f5a; 
	&.write {
		background: #ea6f5a;
		color: white;
	}
	`;