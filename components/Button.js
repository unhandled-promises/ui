import React from 'react';
import Styled from 'styled-components';

export default ({type,children,onClick}) => {

  return (
    <Button
      type={type}
      onClick={onClick}>
      {children}
    </Button>
  )
}

// export default Button;

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
    }
  }};
  border: none;
  margin: 1rem;
`