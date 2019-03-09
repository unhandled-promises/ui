import React, { Component } from 'react';
import Button from '../components/Button';
import Input from '../components/Input';
import Styled from 'styled-components';
import Router from 'next/router';
import { CUSTOMERS_API, EMPLOYEES_API } from "../static/api-config";
import { decode } from 'punycode';

class Login extends Component{
  state = {
    emailInput:{
      value:'',
      regex:/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      error:'Please enter a valid email',
    },
    passwordInput:{
      value:'',
      regex:/[]/,
      error:"Please enter a valid password at least 8 characters in length",
    }
  }

  handleBlur = (event) => {
    const { name } = event.target;
    const value = this.state[name].value;
  };

  handleInputChange = (event) => {
    const {name,value} = event.target;
    const prevState = {...this.state[name]};
    prevState.value = value;
    this.setState({
      [name]:prevState,
    })
  }

  handleClick = (event) => {
    event.preventDefault();
    const { name } = event.target;
    switch (name){
      case 'loginBtn':
        const { value:email } = this.state.emailInput;
        const { value:password } = this.state.passwordInput;
        this.verifyCredentials(email,password);
    }
  }

  verifyCredentials = async (email,password) => {
    console.log(`attempting login with ${email,password}`);
    try{
      const loginResponse = await fetch(`${EMPLOYEES_API}api/employee/login`,{
        method:"POST",
        headers:{
          "Content-Type": "application/json"
        },
        body:JSON.stringify({
          "email": email,
          "password": password
        })
      });
  
      const loginData = await loginResponse.json();
      console.log(loginData);
      if(loginData.success){
        const { token } = loginData;
        sessionStorage.setItem("jwt",token);
        const decodeToken = jwt_decode(token)
        console.log(decodeToken.role);
        if(decodeToken.role === "manager" || decode.role === "owner"){
          Router.push("/dashboard/customer")
        }else if(decodeToken.role === "employee"){
          Router.push("/dashboard/employee")
        }
      }
      else{
        console.log(`Login failed`);
      }
    }
    catch(err){
      console.log(err);
    }
  }

  render(){
    return(
      <LoginDiv>
        <h3>Please Log-in</h3>
        <form>
          <Input 
            type="text"
            placeholder="Email"
            value={this.state.emailInput.value}
            onChange={this.handleInputChange}
            onBlur={this.handleBlur}
            name="emailInput"/>
          <Input 
            type="text"
            placeholder="Password"
            value={this.state.passwordInput.value}
            onChange={this.handleInputChange}
            onBlur={this.handleBlur}
            name="passwordInput"/>
          <Button 
            type="blue"
            name="loginBtn"
            onClick={this.handleClick}>
              Login
          </Button>
        </form>
      </LoginDiv>
    )
  }
}

export default Login;

const LoginDiv = Styled.div`
  display: grid;
  grid-template-rows: 1fr auto auto;
  justify-items: center;
  background-color: #e5e5e5;

  input{
    display: block;
  }
`