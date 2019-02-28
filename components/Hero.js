import React from 'react';
import Styled from 'styled-components';

export default ({image}) => {
	return (
		<Hero img={image}>
			<HeroText>Start Working Safer Today!</HeroText>
		</Hero>
	)
}

const Hero = Styled.div `
	background-image: url(${({img})=>img});
	height: 49vh;
	background-position: center;
	background-repeat: no-repeat;
	background-size: cover;
	position: block;
`

const HeroText = Styled.h1`
	background-color: rgba(0,0,0,0.1);
	padding: 1rem;
	margin: 1rem;
	text-align: center;
	border-radius: 15px;
`