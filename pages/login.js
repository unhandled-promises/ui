import React, { Component } from 'react';
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
          <LoginBtn>Login</LoginBtn>
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

const LoginBtn = Styled.button`
  padding: 1.5rem;
  background-color: #9FBEBA;
  border: none;
  margin: 1rem;
`