import React from 'react';
import Styled from 'styled-components';

export default ({primary, secondary}) => {
	return (
        <FormPrimary>{primary}<FormSecondary>{secondary}</FormSecondary></FormPrimary>
	)
}

const FormPrimary = Styled.h1 `
    background: #364252;
	padding: 20px 30px 15px 30px;
	margin: -30px -30px 30px -30px;
	border-radius: 10px 10px 0 0;
	-webkit-border-radius: 10px 10px 0 0;
	-moz-border-radius: 10px 10px 0 0;
	color: #fff;
	text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.12);
	font: normal 30px 'Bitter', serif;
	-moz-box-shadow: inset 0px 2px 2px 0px rgba(255, 255, 255, 0.17);
	-webkit-box-shadow: inset 0px 2px 2px 0px rgba(255, 255, 255, 0.17);
	box-shadow: inset 0px 2px 2px 0px rgba(255, 255, 255, 0.17);
	border: 1px solid #257C9E;
`

const FormSecondary = Styled.span`
    display: block;
    margin-top: 2px;
    font: 13px Arial, Helvetica, sans-serif;
`