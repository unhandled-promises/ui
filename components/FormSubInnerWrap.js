import React from 'react';
import Styled from 'styled-components';

export default ({ children }) => {
    return (
        <FormSubInnerWrap>{children}</FormSubInnerWrap>
    )
}

const FormSubInnerWrap = Styled.div`
    padding: 30px;
    background: #F8F8F8;
    border-radius: 6px;
    margin-bottom: 15px;
`
