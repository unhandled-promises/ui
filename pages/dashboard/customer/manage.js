import React, { Component } from 'react';
import Styled from 'styled-components'
import FullNav from '../../../components/FullNav';
import Link from 'next/link';
import Modal from '../../../components/Modal';

export default class extends Component{
  state = {
    jwt:'',
    employees:[]
  }

  renderEmployees = () => {

  }

  componentDidMount(){
    const jwt = sessionStorage.getItem("jwt");
    this.setState({jwt:jwt});
  }
  
  render(){
    return(
      <React.Fragment>
        <FullNav>
          <Link prefetch href="/dashboard/customer"><NavLink>Home</NavLink></Link>
          <Link href="/dashboard/customer/manage"><NavLink>Manage</NavLink></Link>
        </FullNav>
        <ManageDiv>
          <h1>Manage Employees</h1>
          <EmployeeListDiv>
            {this.renderEmployees()}
          </EmployeeListDiv>
        </ManageDiv>
      </React.Fragment>
      
    )
  }
}

const NavLink = Styled.a`
  margin:.5rem;
`

const ManageDiv= Styled.div`
  display: grid;
  grid-template-columns: 65vw 1fr;

  >h1{
    grid-column:1/-1;
    justify-self: center;
  }
`

const EmployeeListDiv = Styled.div`

`;