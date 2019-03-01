import React, { Component } from 'react';
import Link from 'next/link';
import Styled from 'styled-components';
import Button from '../components/Button';
import Nav from '../components/Nav';
import Footer from '../components/Footer';
import Input from '../components/Input';
import Selection from '../components/Selection';
import Modal from '../components/Modal';

class Verify extends Component{
 state={
  codeInput:{
    value:'',
    regex:/[^[A-Z0-9]{0,8}$]/,
    isValid:false
  },
  secret:'123456',
  verifyStep:0,
  firstNameInput:{
    value:'',
    regex:/[a-z]/i,
    error:""
  },
  lastNameInput:{
    value:'',
    regex:/a-z/i,
    error:""
  },
  dateInput:{
    value:''
  },
  phoneInput:'',
  emailInput:{
    value:'',
    regex:/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    error:''
  },
  company:'',
  role:'',
  deviceInput:'',
  termsModal:false,
  byeModal:false
 }

 checkForEmployee = (email) => {
   console.log(`Checking database for ${email}`);
 }

 verifyCode = async (code) => {
   console.log(`Verifying ${code}`);
   const response = await fetch("https://employee-api-p3.herokuapp.com/api/employee/5c76b82eba01760021a0322a");
   const data = await response.json();
   console.log(data);
 }

 handleBlur = (event) => {
  console.log(event.target);
  const {name} = event.target;
  const value = this.state[name].value;
  if(name === "emailInput"){
    console.log(`validating email input`);
    console.log(this.state[name]);
    console.log(this.state[name].regex.test(value));
    const isValid = (this.state[name].regex.test(value)) ? true : false;
    const updatedState = {...this.state[name]};
    updatedState.isValid = isValid;
    this.setState({
      [name]:updatedState
    })
  }

 }

 handleInputChange = (event) => {
  const {name,value} = event.target;
  const prevState = {...this.state[name]};
  prevState.value = value;
    this.setState({
      [name]:prevState,
    })
 }

 handleClick = async (event) => {
   console.log(event.target);
  const {codeInput,secret} = this.state;
  const {name} = event.target;
  if(name === "verifyCode"){
    if(codeInput === secret){
      console.log(`verification successful`);
      this.verifyCode();
      this.setState((prevState)=>({verifyStep:prevState.verifyStep+1}))
    }
    else{
      console.log(`invalid code`);
    }
   }
   else if(name === "verifyEmail"){
     if(this.state.emailInput.isValid){
      this.setState((prevState)=>({verifyStep:prevState.verifyStep+1}))
     }
     else{
       console.log(`enter a valid email`);
     }
   }
   else if(name === "verifyInfo"){
     this.setState((prevState)=>({verifyStep:prevState.verifyStep+1}))
   }
   else if(name === "verifyDevice"){
     this.setState((prevState)=>({
       verifyStep:prevState.verifyStep+1}))
   }
   else if(name === "consentBtn"){
     this.setState({termsModal:true})
   }
   else if(name === "denyBtn"){
     this.setState({byeModal:true})
   }
   else if(name === "termsModal"){
     this.setState({termsModal:false})
   }
   else if(name === "byeModal"){
     this.setState({byeModal:false})
   }

  }
  
 render(){
   return(
    <Body>
    <Nav/>
     <WelcomeDiv>
        <EmailDiv verifyStep={this.state.verifyStep}>
         <h3>Welcome! To continue, please enter your email</h3>
         <Input
           type="text" 
           placeholder="Enter Email" 
           value={this.state.emailInput.value}
           name="emailInput"
           onChange={this.handleInputChange}
           onBlur={this.handleBlur}/>
         <Button name="verifyEmail" type="green" onClick={this.handleClick}>
           Continue
         </Button>
        </EmailDiv>
        <VerifyDiv verifyStep={this.state.verifyStep}>
         <h3>Enter your verification code</h3>
         <Input
           type="text" 
           placeholder="Enter Code" 
           value={this.state.codeInput.value}
           name="codeInput"
           onChange={this.handleInputChange}/>
         <Button name="verifyCode" type="green" onClick={this.handleClick}>
           Verify
         </Button>
        </VerifyDiv>
        <InfoForm verifyStep={this.state.verifyStep.value}>
          <h3>Please Verify/Enter Your Information:</h3>
          <FieldDiv>
            <p>Company: {this.state.company}</p>
            <p>Role: {this.state.role}</p>
          </FieldDiv>
          <Input 
            type="text"
            placeholder="First Name"
            value={this.state.firstNameInput.value}
            onChange={this.handleInputChange}
            name="firstNameInput"/>
          <Input 
            type="text"
            placeholder="Last Name"
            value={this.state.lastNameInput.value}
            onChange={this.handleInputChange}
            name="lastNameInput"/>
          <Input
            type="text"
            placeholder="Phone (xxx-xxx-xxxx)"
            value={this.state.phoneInput.value}
            onChange={this.handleInputChange}
            name="phoneInput"/>
          <Input 
            type="date"
            value={this.state.dateInput.value}
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
     <Modal
      name="termsModal" 
      show={this.state.termsModal}
      handleClose={this.handleClick}>
       <h3>Privacy & Terms</h3>
       <p>Doggo ipsum doggorino doggo noodle horse fluffer porgo, lotsa pats heckin shibe. Boof floofs borking doggo very jealous pupper much ruin diet, smol borking doggo with a long snoot for pats mlem. Most angery pupper I have ever seen wow such tempt thicc mlem borkf the neighborhood pupper much ruin diet, extremely cuuuuuute length boy clouds adorable doggo. Doge doggo pupperino shoober, doing me a frighten super chub. Heckin angery woofer bork smol borking doggo with a long snoot for pats heckin angery woofer boof, what a nice floof doge what a nice floof. Tungg heck wow such tempt, doing me a frighten. Clouds super chub many pats shibe smol doing me a frighten big ol corgo, wow such tempt heckin angery woofer such treat woofer yapper. Blop the neighborhood pupper you are doing me a frighten pats smol borking doggo with a long snoot for pats, maximum borkdrive what a nice floof. Thicc maximum borkdrive what a nice floof you are doing me the shock, such treat waggy wags. Snoot long bois the neighborhood pupper he made many woofs, heckin angery woofer.  Heckin angery woofer big ol pupper snoot long woofer pupperino, noodle horse bork. Boofers pats maximum borkdrive, many pats.</p>
     </Modal>
     <Modal 
      name="byeModal"
      show={this.state.byeModal}
      handleClose={this.handleClick}>
       <h3>We're Sorry You Feel That Way!</h3>
       <p>Come back soon now, ya hear?</p>
     </Modal>
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

const EmailDiv = Styled.div`
  display:${({verifyStep})=>(verifyStep===0)?"grid":"none"};
`

const VerifyDiv = Styled.div`
display:${({verifyStep})=>(verifyStep===1)?"grid":"none"};
`

const InfoForm = Styled.div`
  display:${({verifyStep})=>(verifyStep===2)?"grid":"none"};
`

const DeviceForm = Styled.div`
  display:${({verifyStep})=>(verifyStep===3)?"grid":"none"};
`

const ConsentForm = Styled.div`
display:${({verifyStep})=>(verifyStep===4)?"grid":"none"};
`