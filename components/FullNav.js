import React from 'react';
import Styled from 'styled-components';

export default ({sticky,children}) => {
	return (
		<Nav sticky={sticky} items={children}>
			<h1>Fit2Work</h1>
      {children}
		</Nav>
	)
};

const Nav = Styled.div`
	width: 100%;
	position:${({sticky})=>(sticky)?"sticky":"block"};
	top:0;
	font-family: 'Baloo Chettan', cursive;
	font-size: 30px;
	background-color: #1f2d3f;
	margin-bottom:0;
	color: #ffffff;
	opacity: .9;
  display: grid;
  grid-template-columns: ${({items})=>`1fr repeat(${items.length},auto)`};
  align-items:center;
	font-size: 1.2rem;
	
	h1{
		margin-left: 10px;
	}

  >a:hover{
    color:#eee;
  }
`