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
  border-bottom:2px solid #666;
  font-size:18px;
  color: #333;

  :focus{
    border: 2px solid #666;
  }
`;

const MessageDiv = Styled.div`
  p{
    font-size: 10px;
    color: red;
    text-align: left;
    margin: .5rem .5rem;
    font-weight: bold;
  }
`