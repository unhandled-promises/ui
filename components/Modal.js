import React from 'react'
import Styled from 'styled-components'
import Button from '../components/Button'

export default ({name,handleClose,show,children}) => {

  return (
    <ModalDiv show={show}>
      <ModalBody>
        {children}
        <Button name={name} onClick={handleClose} type="blue">Close</Button>
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
  width: 80%;
  height: auto;
  top: 50%;
  left:50%;
  transform: translate(-50%,-50%);
`;