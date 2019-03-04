import React, { Component } from 'react';
import Styled from 'styled-components';
import Button from '../../components/Button';
import Home from '../../components/customer_dash/Home';
import Input from '../../components/Input';
import Manage from '../../components/customer_dash/Manage';
import Modal from '../../components/Modal';
import FullNav from '../../components/FullNav';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { CUSTOMERS_API, EMPLOYEES_API } from "../../static/api-config";

class Customer extends Component{
  state={
    showHome:true,
    showManage: false,
    jwt:'',
    employees:[],
    customerData:{}
  }

  findEmployeesByCompany = async (id) => {
    console.log(this.state.jwt);
    const employeesResponse = await fetch(`${EMPLOYEES_API}api/employee/bycustomer/${id}`,{
      method:"GET",
      headers:{
        "Authorization":this.state.jwt
      }
    });

    const employeesData = await employeesResponse.json();
    console.log(employeesData);
    return employeesData;
  }

  handleNavClick = (event) => {
    const { name } = event.target;
    switch(name){
      case "Home":
        this.setState({
          showManage:false,
          showHome:true
        });
        break;
      case "Manage":
        this.setState({
          showHome:false,
          showManage:true
        })
    }
  }

  async componentDidMount(){
    const jwt = await sessionStorage.getItem("jwt");
    this.setState({jwt:jwt});
    const customerData = await jwt_decode(jwt);
    console.log(customerData);
    this.setState({customerData:customerData})
    const employees = await this.findEmployeesByCompany(this.state.customerData.company);
    this.setState({employees:employees});
  }

  render(){
    return(
      <React.Fragment>
        <FullNav>
          <Button type="green" onClick={this.handleNavClick} name="Home">Home</Button>
          <Button type="green" onClick={this.handleNavClick} name="Manage">Manage</Button>
        </FullNav>
        {(this.state.showHome)?<Home employees={this.state.employees}/>: null}
        {(this.state.showManage)?<Manage employees={this.state.employees} />: null}
      </React.Fragment>
    )
  }
}

export default Customer;

const NavLink = Styled.a`
  margin:.5rem;
  color: white;
  text-decoration: none;
`