import React from 'react';
import Styled from 'styled-components';

export default  ({placeholder,value,name,onChange,onBlur,type,isValid,error, className}) => {
  return (
    <React.Fragment>
      <Input
        type={type}
        placeholder={placeholder}
        value={value}
        name={name}
        onChange={onChange}
        onBlur={onBlur}
        className={className} />
      {(isValid)?
        null:
      <MessageDiv>
        <p>{error}</p>
      </MessageDiv>}
    </React.Fragment>
  )
}

const Input = Styled.input`
    display: block;
    box-sizing: border-box;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    padding: 8px;
    border-radius: 6px;
    -webkit-border-radius:6px;
    -moz-border-radius:6px;
    border: 2px solid #fff;
    box-shadow: inset 0px 1px 1px rgba(0, 0, 0, 0.33);
    -moz-box-shadow: inset 0px 1px 1px rgba(0, 0, 0, 0.33);
    -webkit-box-shadow: inset 0px 1px 1px rgba(0, 0, 0, 0.33);
`;

const MessageDiv = Styled.div`
  p{
    position: absolute
    font-size: 10px;
    color: red;
    text-align: left;
    margin: .5rem .5rem;
    font-weight: bold;
  }
`