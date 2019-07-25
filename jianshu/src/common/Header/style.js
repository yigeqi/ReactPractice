import styled from 'styled-components';
import logoPic from '../../static/nav-logo.png';

export const HeaderWrapper = styled.div `
height:56px;
position:relative;
border-bottom:1px solid #f0f0f0;
`;
export const Logo = styled.a.attrs({
	herf: '/'
})
`
width:100px;
position:absolute;
top:0;
left:0;
height:100%;
display:block;
background:url(${logoPic});
background-size:contain;
`;
export const Nav = styled.div `
background:red;
height:100%;
width:960px;
margin:0 auto;
`;