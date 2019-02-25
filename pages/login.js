import React, { Component } from 'react';
import Button from '../components/Button';
import Styled from 'styled-components';

class Login extends Component{
  state = {
    emailInput:'',
    passwordInput:''
  }

  render(){
    return(
      <LoginDiv>
        <h3>Please Log-in</h3>
        <form>
          <input placeholder="email"/>
          <input placeholder="password" />
          <Button type="green">Login</Button>
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