import React, { Component } from 'react';
import Styled from 'styled-components';
import Button from '../../components/Button';
import Footer from '../../components/Footer';
import Input from '../../components/Input';
import Modal from '../../components/Modal';
import FullNav from '../../components/FullNav';
import Selection from '../../components/Selection';
import { CUSTOMERS_API, EMPLOYEES_API } from "../../static/api-config";

class Customer extends Component{
  state={

  }

  render(){
    return(
      <FullNav items={["Home","Manage Customers","Preferences","Logout"]} />
    )
  }
}

export default Customer;