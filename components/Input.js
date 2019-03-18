import React from 'react';
import Styled from 'styled-components';

export default  ({placeholder,value,name,onChange,onBlur,type,isValid,error, className,label}) => {
  return (
    <React.Fragment>
      <FloatingLabelDiv>
        <Input
          type={type}
          placeholder={placeholder}
          value={value}
          name={name}
          onChange={onChange}
          onBlur={onBlur}
          className={className} />
          <Label>{label}</Label>
      </FloatingLabelDiv>
      {(isValid)?
          null:
        <MessageDiv>
          <p>{error}</p>
        </MessageDiv>}
    </React.Fragment>
    
  )
}

const FloatingLabelDiv = Styled.div`
  width: 100%;
  box-sizing: border-box;
  display: block;
  position: relative;
  overflow: hidden;
  border-width: 1px;
  color: rgba(#2c3e50,.75);
  margin: .5rem;

  &:valid {
    background: white;
  }

  &:focus {
    border-color: blue;
  }

  &:focus + label {
    background: #f06d06;
    color: white;
    font-size: 70%;
    padding: 1px 6px;
    z-index: 2;
    text-transform: uppercase;
  }
`
const Label = Styled.label`
  top: 0;
  bottom: 0;
  left: 0;
  width: auto;
  transition:
    background 0.2s,
    color 0.2s,
    top 0.2s,
    bottom 0.2s,
    right 0.2s,
    left 0.2s;
  position: absolute;
  color: #999;
  padding: 7px 6px;
`

const Input = Styled.input`
    width:90%;
    position: relative;
    background-color: transparent;
    top:0;
    left:0;
    z-index:1;
    outline:0;
    padding: 8px;
    border: none;
    border-bottom: 1px solid grey;
    outline: 0;
    -moz-outline: 0;
    -webkit-outline: 0;
    &:focus {
      background-color: rgba(0,0,0,.05);
      outline: 0;
      -moz-outline: 0;
      -webkit-outline: 0;
      box-shadow:0;
      border:2px solid #5B85AA;
      padding: 4px 6px 20px 6px;
    }

    &:focus + label {
      top:100%;
      margin-top:-16px;
      background: #5B85AA;
      color: white;
      font-size: 70%;
      padding: 1px 6px;
      z-index: 2;
      text-transform: uppercase;
    }
`;

const MessageDiv = Styled.div`
  p{
    position: absolute
    font-size: 9px;
    color: red;
    text-align: left;
    margin: .5rem .5rem;
    font-weight: bold;
  }
`