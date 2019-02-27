import React from 'react';
import Styled from 'styled-components';

export default  ({placeholder,value,name,onChange,type}) => {
  return (
    <Input
      type={type}
      placeholder={placeholder}
      value={value}
      name={name}
      onChange={onChange} />
  )
}

const Input = Styled.input`
  padding: .75rem;
  background:transparent;
  border: none;
  border-bottom:1px solid black;
  font-size:18px;
  color: #333;
`;