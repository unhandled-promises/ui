import React from 'react';
import Styled from 'styled-components';

export default ({type,children,onClick,name,id}) => {

  return (
    <Button
      name={name}
      id={id}
      type={type}
      onClick={onClick}>
      {children}
    </Button>
  )
}

const Button = Styled.button`
  padding: 1.5rem;
  background-color:${({type}) => { 
    switch (type){
      case 'green':
        return '#9FBEBA'
      case 'blue':
        return '#5B85AA'
      case 'red':
        return '#AA5B5B'
      case 'dark':
        return '#1F2D3F'
    }
  }};
  border: none;
  margin: 1rem;
  color: white;
  font-size:1rem;
`