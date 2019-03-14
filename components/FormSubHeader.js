import React from 'react';
import Styled from 'styled-components';

export default ({number, text}) => {
	return (
        <FormSubHeader><FormSubHeaderSpan>{number}</FormSubHeaderSpan>{text}</FormSubHeader>
	)
}

const FormSubHeader = Styled.div `
    font: normal 20px 'Bitter', serif;
    color: #364252;
    margin-bottom: 5px;
`

const FormSubHeaderSpan = Styled.span`
    background: #364252;
    padding: 5px 10px 5px 10px;
    position: absolute;
    border-radius: 50%;
    -webkit-border-radius: 50%;
    -moz-border-radius: 50%;
    border: 4px solid #fff;
    font-size: 14px;
    margin-left: -45px;
    color: #fff;
    margin-top: -3px;
`
