import React from 'react';
import Styled from 'styled-components';

export default ({type,children,onClick,name,id,size}) => {

  return (
    <Button
      size={size}
      name={name}
      id={id}
      type={type}
      onClick={onClick}>
      {children}
    </Button>
  )
}

const Button = Styled.button`
  padding: ${({size})=>{
    switch(size){
      case "normal":
        return "1.5rem";
      case "small":
        return "1rem";
    }
  }};
  background-color:${({type}) => { 
    switch (type){
      case 'green':
        return '#9FBEBA'
      case 'blue':
        return '#5B85AA'
      case 'red':
        return '#AA5B5B'
      case 'transparent':
        return 'rgba(0,0,0,0)'
    }
  }};
  border: none;
  margin: ${({size})=>{
    switch(size){
      case "normal":
        return "1rem";
      case "small":
      return "0";
    }
  }};
  color: white;
  font-size:1rem;
`