import React, { Component } from 'react';
import Link from 'next/link';
import Styled from 'styled-components';
import Button from '../components/Button';
import Nav from '../components/Nav';
import Footer from '../components/Footer';
import Input from '../components/Input';
import Selection from '../components/Selection';

class Verify extends Component{
 state={
  codeInput:'',
  secret:'123456',
  verifyStep:0,
  firstNameInput:'',
  lastNameInput:'',
  dateInput:'',
  phoneInput:'',
  emailInput:'',
  company:'Los Pollos Hermanos',
  role:'Meth Lord',
  deviceInput:''
 }

 handleInputChange = (event) => {
  const {name,value} = event.target;
  console.log(name,value);

    this.setState({
      [name]:value,
    })
 }

 handleClick = (event) => {
  const {codeInput,secret} = this.state;
  const {name} = event.target;
  if(name === "verifyCode"){
    if(codeInput === secret){
      console.log(`verification successful`);
      this.setState((prevState)=>({verifyStep:prevState.verifyStep+1}))
    }
    else{
      console.log(`invalid code`);
    }
   }
   else if(name === "verifyInfo"){
     this.setState((prevState)=>({verifyStep:prevState.verifyStep+1}))
   }
   else if(name === "verifyDevice"){
     this.setState((prevState)=>({
       verifyStep:prevState.verifyStep+1}))
   }

  }
  
 render(){
   return(
    <Body>
    <Nav/>
     <WelcomeDiv>
         <VerifyDiv verifyStep={this.state.verifyStep}>
          <h3>Welcome! To continue, please enter the code that was emailed to you</h3>
          <Input
            type="text" 
            placeholder="Enter Code" 
            value={this.state.codeInput}
            name="codeInput"
            onChange={this.handleInputChange}/>
          <Button name="verifyCode" type="green" onClick={this.handleClick}>
            Verify
          </Button>
         </VerifyDiv>
        <InfoForm verifyStep={this.state.verifyStep}>
          <h3>Please Verify/Enter Your Information:</h3>
          <FieldDiv>
            <p>Company: {this.state.company}</p>
            <p>Role: {this.state.role}</p>
          </FieldDiv>
          <Input 
            type="text"
            placeholder="First Name"
            value={this.state.firstNameInput}
            onChange={this.handleInputChange}
            name="firstNameInput"/>
          <Input 
            type="text"
            placeholder="Last Name"
            value={this.state.lastNameInput}
            onChange={this.handleInputChange}
            name="lastNameInput"/>
          <Input
            type="text"
            placeholder="Email"
            value={this.state.emailInput}
            onChange={this.handleInputChange}
            name="emailInput"/>
          <Input
            type="text"
            placeholder="Phone (xxx-xxx-xxxx)"
            value={this.state.phoneInput}
            onChange={this.handleInputChange}
            name="phoneInput"/>
          <Input 
            type="date"
            value={this.state.dateInput}
            onChange={this.handleInputChange}
            name="dateInput"/>
          <Button 
            name="verifyInfo"
            type="green"
            onClick={this.handleClick}>
              Submit
          </Button>
        </InfoForm>
        <DeviceForm verifyStep={this.state.verifyStep}>
          <h3>Type of Device to Activate</h3>
          <Selection 
            options={["Select Device","Fitbit"]}
            onChange={this.handleInputChange}
            name="deviceInput"/>
          <Button
            name="verifyDevice"
            type="green"
            onClick={this.handleClick}>
            Authorize with Provider
          </Button>
        </DeviceForm>
        <ConsentForm verifyStep={this.state.verifyStep}>
          <h3>Authorized!</h3>
          <FieldDiv>
          <Button
            name="consentBtn"
            type="blue"
            onClick={this.handleClick}>
            Consent
          </Button>
          <Button
            name="denyBtn"
            type="red"
            onClick={this.handleClick}>
            Deny
          </Button>
          </FieldDiv>
        </ConsentForm>
     </WelcomeDiv>
     <Footer/>
     </Body>
   )
 }
}

export default Verify;

const Body =Styled.div`
  min-height: 100vh;
  display: grid;
  grid-template-rows: auto 1fr auto
`

const WelcomeDiv = Styled.div`
  background-color: #E5E5E5;
  margin:.5rem;
  display: grid;
  grid-template-rows: 1fr auto auto;
  justify-items: stretch;
  align-items: center;
  text-align: center;
  
  input{
    display:block;
    justify-self: stretch;
    max-width: 100%;
    margin: 0 .5rem;
  }

`;

const FieldDiv = Styled.div`
  display: grid;
  grid-template-columns: repeat(2,1fr);
`

const VerifyDiv = Styled.div`
  display:${({verifyStep})=>(verifyStep===0)?"grid":"none"};
`

const InfoForm = Styled.div`
  display:${({verifyStep})=>(verifyStep===1)?"grid":"none"};
`

const DeviceForm = Styled.div`
  display:${({verifyStep})=>(verifyStep===2)?"grid":"none"};
`

const ConsentForm = Styled.div`
display:${({verifyStep})=>(verifyStep===3)?"grid":"none"};
`