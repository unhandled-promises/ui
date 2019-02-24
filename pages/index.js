import React, { Component } from 'react';
import Link from 'next/link';
import Styled from 'styled-components';

class App extends Component{
 state={
  codeInput:'',
  secret:'123456',
  verified:false,
  employee:{
    firstNameInput:'',
    lastNameInput:'',
    monthInput:'',
    dayInput:'',
    yearInput:'',
    address1Input:'',
    address2Input:'',
    stateInput:'',
    zipInput:''
  }
 }

 handleInputChange = (event) => {
  const {name,value} = event.target;
  console.log(name,value);

  this.setState({
    [name]:value,
  })
 }

 handleClick = () => {
  const {codeInput,secret} = this.state;
  if(codeInput === secret){
    console.log(`verification successful`);
    this.setState({verified:true})
  }
  else{
    console.log(`invalid code`);
  }
 }

 render(){
   return(
     <WelcomeDiv>
       <CardBody>
         <VerifyDiv verified={this.state.verified}>
          <h3>Welcome! To continue, please enter the code that was emailed to you</h3>
          <input 
            placeholder="Enter Code" 
            value={this.state.codeInput}
            name="codeInput"
            onChange={this.handleInputChange}/>
          <VerifyBtn onClick={this.handleClick}>
            Verify
          </VerifyBtn>
         </VerifyDiv>
        <InfoForm verified={this.state.verified}>
          <h3>Please Verify/Enter Your Information:</h3>
          <input 
            placeholder="First Name"
            value={this.state.firstNameInput}
            onChange={this.handleInputChange}
            name="firstNameInput"/>
          <input 
            placeholder="Last Name"
            value={this.state.lastNameInput}
            onChange={this.handleInputChange}
            name="lastNameInput"/>
        </InfoForm>
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

const VerifyDiv = Styled.div`
  display:${({verified})=>(verified)?"none":"block"}
`

const VerifyBtn = Styled.button`
  padding: 1.5rem;
  background-color: #9FBEBA;
  border: none;
  margin: 1rem;
`

const InfoForm = Styled.div`
  display:${({verified})=>(verified)?"grid":"none"}
`