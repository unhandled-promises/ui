import React from 'react';
import Styled from 'styled-components';

export default ({type,children,onClick,name,id,size, className}) => {


  return (
    <Button
      size={size}
      name={name}
      id={id}
      type={type}
      onClick={onClick}
      className={className}>
      {children}
    </Button>
  )
}

const Button = Styled.button`
  width: ${({size})=>{
    switch (size){
      case 'small':
        return '100%';
      case 'normal':
        return 'auto';
    }
  }};
  height: ${({size})=>{
    switch (size){
      case 'small':
        return '100%';
      case 'normal':
        return 'auto';
    }
  }};

  padding: ${({size})=>{
    switch(size){
      case "normal":
        return ".75rem";
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
      case 'orange':
        return '#FFA600'
      case 'alt-orange':
        return '#fed75e'
      case 'dark':
        return '#1F2D3F'
      case 'transparent':
        return 'rgba(0,0,0,0)'

    }
  }};
  border: none;
  margin: ${({size})=>{
    switch(size){
      case "normal":
        return ".5rem";
      case "small":
      return "0";
    }
  }};
  color: white;
  font-size:1rem;
`