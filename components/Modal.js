import React from 'react'
import Styled from 'styled-components'
import Button from '../components/Button'

export default ({name,handleClose,handleClick,show,children,buttonNames=null}) => {

  return (
    <ModalDiv show={show}>
      <ModalBody>
        {children}
        <Button size="normal" name={name} onClick={handleClose} type="blue">Close</Button>
        {buttonNames.map((button,index) => {
          return <Button size="normal" key={index} name={button} onClick={handleClick} type="blue">{button}</Button>
        })}
      </ModalBody>
    </ModalDiv>
  )
}

const ModalDiv = Styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0,0,0,0.5);
  display: ${({show})=>show?"block":"none"}
`;

const ModalBody = Styled.section`
  position: fixed;
  background: #fff;
  width: 35%;
  height: auto;
  top: 50%;
  left:50%;
  transform: translate(-50%,-50%);
  display: grid;
  padding: 2rem;

  button{
    min-width: 50%;
    justify-self: center;
  }
`;