import React from 'react';
import Styled from 'styled-components';

export default  ({placeholder,value,name,onChange,onBlur,type,isValid,error}) => {
  return (
    <React.Fragment>
      <Input
        type={type}
        placeholder={placeholder}
        value={value}
        name={name}
        onChange={onChange}
        onBlur={onBlur} />
      {(isValid)?
        null:
      <MessageDiv>
        <p>{error}</p>
      </MessageDiv>}
    </React.Fragment>
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

const MessageDiv = Styled.div`
  p{
    font-size: 9px;
    color: red;
  }
`