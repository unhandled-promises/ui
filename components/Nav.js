import React from 'react';
import Styled from 'styled-components';

export default ({sticky}) => {
	return (
		<Nav sticky={sticky}>
			<h1>fit2work</h1>
		</Nav>
	)
};

const Nav = Styled.div`
	width: 100%;
	position:${({sticky})=>(sticky)?"sticky":"block"};
	top:0;
	font-family: 'Baloo Chettan', cursive;
	font-size: 30px;
	text-align: center;
	background-color: #1f2d3f;
	opacity: .9;
	margin-bottom:0;
	color: #ffffff;
	overflow:none;
	display: flex;
	justify-content: center;
	flex-direction: column
`