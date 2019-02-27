import React from 'react';
import Styled from 'styled-components';

export default ({options,onChange,name}) => {
  return (
    <Selection onChange={onChange} name={name}>
      {options.map((option,index)=>{
        return <option key={index} value={option}>{option}</option>
      })}
    </Selection>
  )
}

const Selection = Styled.select`
  background:transparent;
  border: none;
`