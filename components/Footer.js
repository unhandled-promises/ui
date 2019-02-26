import React from 'react';
import Styled from 'styled-components';

export default () => {
	return (
		<Footer>Copyright 2019 Unhandled Promises</Footer>
	)
}

const Footer =Styled.div `
	width: 100%;
	height:5vw;
	bottom:0;
	margin-bottom:0;
	text-align:center;
	background-color: #9FBEBA;
	color: white;
	overflow:auto;
	display: flex;
	justify-content: center;
	flex-direction: column
`