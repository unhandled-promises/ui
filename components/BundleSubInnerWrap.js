import React from 'react';
import Styled from 'styled-components';

export default ({ children }) => {
    return (
        <FormSubInnerWrap>{children}</FormSubInnerWrap>
    )
}

const FormSubInnerWrap = Styled.div`
    display: grid;
    grid-template-columns: 33% 33% 33%;
    grid-gap: 10px;
    justify-items: center;
    padding: 30px;
    background: #F8F8F8;
    border-radius: 6px;
    margin-bottom: 15px;
`
