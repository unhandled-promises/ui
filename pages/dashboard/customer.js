import React, { Component } from 'react';
import Styled from 'styled-components';
import Button from '../../components/Button';
import Home from '../../components/customer_dash/Home';
import Input from '../../components/Input';
import Manage from '../../components/customer_dash/Manage';
import Modal from '../../components/Modal';
import Nav from '../../components/Nav';
import FullNav from '../../components/FullNav';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { CUSTOMERS_API, EMPLOYEES_API } from "../../static/api-config";

class Customer extends Component{
  state={
    showHome:true,
    showManage: false,
    addModal:false,
    jwt:'',
    employees:[],
    customerData:{},
    emailInput:{
      value:'',
      regex:/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      error:'Please enter a valid email',
      isValid:false
    }
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

  validateForm = (name,value) => {
    const isValid = (this.state[name].regex.test(value)) ? true : false;
    const updatedState = {...this.state[name]};
    updatedState.isValid = isValid;
    this.setState({
      [name]:updatedState
    })
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
        break;
      case "Add":
        this.setState({
          addModal:true
        })
        break;
      case "addModal":
        this.setState({
          addModal:false
        })
    }
  }

  handleInputChange = (event) => {

  }

  handleBlur = (event) => {

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
        <DashBody>
          <NavDiv>
            <Nav />
          </NavDiv>
          <ControlPanel>
            <Button type="green" onClick={this.handleNavClick} name="Home">Home</Button>
            <Button type="green" onClick={this.handleNavClick} name="Manage">Manage</Button>
            {(this.state.showManage)?<Button type="blue" onClick={this.handleNavClick} name="Add">Add Employees</Button>:null}
          </ControlPanel>
          {(this.state.showHome)?<Home employees={this.state.employees}/>: null}
          {(this.state.showManage)?<Manage employees={this.state.employees} />: null}
        </DashBody>
        <Modal
          name="addModal"
          buttonNames={["Add Employee"]}
          show={this.state.addModal}
          handleClose={this.handleNavClick}>
          <h3>Add an Employee</h3>
          <Input
           type="text" 
           placeholder="Enter Email" 
           value={this.state.emailInput.value}
           name="emailInput"
           onChange={this.handleInputChange}
           onBlur={this.handleBlur}/>
        </Modal>
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

const NavDiv = Styled.div`
  grid-column:1/-1
`;

const DashBody = Styled.div`
 display: grid;
 height:100vh;
 width:100vw;
 grid-template-columns: 1fr 80vw;
 grid-template-rows: auto 1fr;

`

const ControlPanel = Styled.div`
  display: grid;
  background-color: #333;
`