import React from 'react';
import Styled from 'styled-components';

export default  ({children}) => {
  return (
    <Input>
      {children}
    </Input>
  )
}

const Input = Styled.input`
  padding: 1rem;
`;