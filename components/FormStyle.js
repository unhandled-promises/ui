import React from 'react';
import Styled from 'styled-components';

export default ({ primary, secondary, children }) => {
    return (
        <FormStyle>{children}</FormStyle>
    )
}

const FormStyle = Styled.div`
    max-width: 800px;
	width:80%;
	padding:30px;
	margin:40px auto;
	background: #FFF;
	border-radius: 10px;
	-webkit-border-radius:10px;
	-moz-border-radius: 10px;
	box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.13);
	-moz-box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.13);
	-webkit-box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.13);
`
