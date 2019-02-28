import React from 'react';
import Styled from 'styled-components';

export default ({sticky}) => {
	return (
		<Nav sticky={sticky}>
			<h1>App Name</h1>
		</Nav>
	)
};

const Nav = Styled.div`
	width: 100%;
	position:${({sticky})=>(sticky)?"sticky":"block"};
	top:0;
	text-align: center;
	background-color: #9FBEBA;
	margin-bottom:0;
	color: #ffffff;
	overflow:auto;
	display: flex;
	justify-content: center;
	flex-direction: column
`