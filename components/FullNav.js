import React from 'react';
import Styled from 'styled-components';

export default ({sticky,children}) => {
	return (
		<Nav sticky={sticky} items={children}>
			<h1>App Name</h1>
      {children}
		</Nav>
	)
};

const Nav = Styled.div`
	width: 100%;
	position:${({sticky})=>(sticky)?"sticky":"block"};
	top:0;
	background-color: #9FBEBA;
	margin-bottom:0;
	color: #ffffff;
	overflow:auto;
  display: grid;
  grid-template-columns: ${({items})=>`1fr repeat(${items.length},auto)`};
  align-items:center;

  >a:hover{
    color:red;
  }
`
