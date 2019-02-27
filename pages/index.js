import React, { Component } from 'react';
import Link from 'next/link';
import Styled from 'styled-components';
import Button from '../components/Button';
import Nav from '../components/Nav';
import Footer from '../components/Footer';
import Hero from '../components/Hero';

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
     <React.Fragment>
    <Nav/>
     <WelcomeDiv>
       <Hero/>
         <VerifyDiv verified={this.state.verified}>
          <h3>Welcome! To continue, please enter the code that was emailed to you</h3>
          <input 
            placeholder="Enter Code" 
            value={this.state.codeInput}
            name="codeInput"
            onChange={this.handleInputChange}/>
          <Button type="green" onClick={this.handleClick}>
            Verify
          </Button>
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
     </WelcomeDiv>
     <Footer/>
     </React.Fragment>
   )
 }
}

export default App;

const WelcomeDiv = Styled.div`
  background-color: #E5E5E5;
  min-height: 35vh;
  display: grid;
  grid-template-rows: 1fr auto auto;
  justify-items: stretch;
  align-items: center;
  
  h3{
    text-align: center;
  }
  
  input{
    margin: 1rem;
    display:block;
    justify-self: stretch;
  }

`;


const VerifyDiv = Styled.div`
  display:${({verified})=>(verified)?"none":"block"}
`

const InfoForm = Styled.div`
  display:${({verified})=>(verified)?"grid":"none"}
`