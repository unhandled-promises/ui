import React, { Component } from 'react';
import Styled from 'styled-components';
import Button from '../../components/Button';
import Footer from '../../components/Footer';
import Input from '../../components/Input';
import Modal from '../../components/Modal';
import FullNav from '../../components/FullNav';
import Selection from '../../components/Selection';
import EmployeeManager from '../../components/customer_dash/EmployeeManager';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { CUSTOMERS_API, EMPLOYEES_API } from "../../static/api-config";
import Link from 'next/link'

class Customer extends Component{
  state={

  }

  render(){
    return(
      <React.Fragment>
        <FullNav>
          <Link href="/dashboard/customer"><NavLink >Home</NavLink></Link>
          <Link prefetch href="/dashboard/customer/manage"><NavLink>Manage</NavLink></Link>
        </FullNav>
        <h1>Home</h1>
      </React.Fragment>
    )
  }
}

export default Customer;

const NavLink = Styled.a`
  margin:.5rem;
  color: white;
  text-decoration: none;
  font-size: 1.2rem;
`