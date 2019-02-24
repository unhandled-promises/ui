import React, { Component } from 'react';
import Link from 'next/link';
import Styled from 'styled-components';

class App extends Component{
 state={
  codeInput:''
 }

 handleInputChange = (event) => {
  const {name,value} = event.target;
  console.log(name,value);

  this.setState({
    [name]:value,
    secret:123456
  })
 }

 handleClick = () => {
   
 }

 render(){
   return(
     <WelcomeDiv>
       <CardBody>
        <h3>Welcome! To continue, please enter the code that was emailed to you</h3>
        <input 
          placeholder="Enter Code" 
          value={this.state.codeInput}
          name="codeInput"
          onChange={this.handleInputChange}/>
        <VerifyBtn>Verify</VerifyBtn>
       </CardBody>
     </WelcomeDiv>
   )
 }
}

export default App;

const WelcomeDiv = Styled.div`
  background-color: #E5E5E5;
  min-height: 35vh;

`;

const CardBody = Styled.div`
  display: grid;
  grid-template-rows: 1fr auto auto;
  justify-items: center;
  align-items: center;
  min-height: inherit;

  h3{
    text-align: center;
  }

  input{
    margin: 1rem;
    padding: 1.5rem;
  }
`;

const VerifyBtn = Styled.button`
  padding: 1.5rem;
  background-color: #9FBEBA;
  border: none;
  margin: 1rem;
`