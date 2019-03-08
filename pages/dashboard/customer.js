import React, { Component } from 'react';
import Styled from 'styled-components';
import Button from '../../components/Button';
import Home from '../../components/customer_dash/Home';
import Input from '../../components/Input';
import Manage from '../../components/customer_dash/Manage';
import Modal from '../../components/Modal';
import Nav from '../../components/Nav';
import FullNav from '../../components/FullNav';
import { CUSTOMERS_API, EMPLOYEES_API } from "../../static/api-config";

class Customer extends Component{
  state={
    showHome:true,
    showManage: false,
    addModal:false,
    jwt:'',
    employees:[],
    activeEmployee:{},
    customerData:{},
    emailInput:{
      value:'',
      regex:/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      error:'Please enter a valid email',
      isValid:false
    },
    detailModal:false,
    firstNameInput:{
      value:'',
      regex:/^[a-z]+$/i,
      error:"Please enter a valid first name",
      isValid:false
    },
    lastNameInput:{
      value:'',
      regex:/^[a-z]+$/i,
      error:"Please enter a valid last name",
    },
    dateInput:{
      value:''
    },
    phoneInput:{
      value:'',
      regex:/(^([\d]{3}\-){2})[\d]{4}$/,
      error:'Please enter a phone number in 555-555-5555 format',
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

  createEmployee = async (email,companyId) => {
    console.log(`Creating employee ${email} ${companyId}`);
    const { jwt } = this.state;
    const createResponse = await fetch(`${EMPLOYEES_API}api/employee/`,{
      method:"POST",
      body:JSON.stringify({
        company:companyId,
        email:email
      }),
      headers:{
        "Authorization": jwt,
        "Content-Type": "application/json"
      }
    })

    const createData = await createResponse.json();
    console.log(createData);
  }

  validateForm = (name,value) => {
    const isValid = (this.state[name].regex.test(value)) ? true : false;
    const updatedState = {...this.state[name]};
    updatedState.isValid = isValid;
    this.setState({
      [name]:updatedState
    })
   }

  // Click events for the side control panel
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
        break;
      case "detailModal":
        this.setState({detailModal:true});
        break;
    }
  }

  handleClick = async (event) => {
    const { name } = event.target;
    const { emailInput, customerData } = this.state;
    switch (name) {
      case "Add Employee":
        if(emailInput.isValid){
          await this.createEmployee(emailInput.value,customerData.company);
        }
        else{
          console.log(emailInput.error)
        }
        break;
      case "Edit":
      // When opening the details modal, activeEmployee state must be transfered to firstNameInput state so handInputChange can work properly
      // with the prepopulated information
        const { id: employeeIndex } = event.target;
        await this.setState({activeEmployee:this.state.employees[employeeIndex]});
        const { first_name:first, last_name:last, email, phone, dob } = this.state.activeEmployee;
        const prevFirstNameState = {...this.state.firstNameInput};
        const prevLastNameState = {...this.state.lastNameInput};
        const prevPhoneState = {...this.state.phoneInput};
        const prevDobState = {...this.state.dateInput};
        const prevEmailState = {...this.state.emailInput};
        
        prevFirstNameState.value = first;
        prevLastNameState.value = last;
        prevEmailState.value = email;
        prevDobState.value = dob;
        prevPhoneState.value = phone;

        this.setState({
          firstNameInput:prevFirstNameState,
          lastNameInput:prevLastNameState,
          emailInput:prevEmailState,
          dateInput:prevDobState,
          phoneInput:prevPhoneState

        });
        this.setState({detailModal:true});
        break;
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

  handleBlur = (event) => {
    console.log(event.target);
    const {name} = event.target;
    const value = this.state[name].value;
    switch(name){
      case "emailInput":
        this.validateForm(name,value);
        break;
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
        <DashBody>
          <NavDiv>
            <Nav />
          </NavDiv>
          <ControlPanel>
            <h2>Hello, {this.state.customerData.email}</h2>
            <Button type="green" onClick={this.handleNavClick} name="Home">Home</Button>
            <Button type="green" onClick={this.handleNavClick} name="Manage">Manage</Button>
            {(this.state.showManage)?<Button type="blue" onClick={this.handleNavClick} name="Add">Add Employees</Button>:null}
          </ControlPanel>
          {(this.state.showHome)?<Home employees={this.state.employees}/>: null}
          {(this.state.showManage)?<Manage employees={this.state.employees} onClick={this.handleClick} />: null}
        </DashBody>
        <Modal
          name="addModal"
          buttonNames={["Add Employee"]}
          show={this.state.addModal}
          handleClick={this.handleClick}
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
        <Modal
          name="detailModal"
          buttonNames={["Remove","Update"]}
          show={this.state.detailModal}
          handleClose={this.handleClick}
          handleClick={this.handleClick}>
          <Input
           type="text" 
           placeholder="Enter First Name" 
           value={this.state.firstNameInput.value}
           name="firstNameInput"
           onChange={this.handleInputChange}
           onBlur={this.handleBlur}/>
          <Input
           type="text" 
           placeholder="Enter Lirst Name" 
           value={this.state.lastNameInput.value}
           name="lastNameInput"
           onChange={this.handleInputChange}
           onBlur={this.handleBlur}/>
          <Input
           type="text" 
           placeholder="Enter Email" 
           value={this.state.emailInput.value}
           name="emailInput"
           onChange={this.handleInputChange}
           onBlur={this.handleBlur}/>
          <Input
           type="text" 
           placeholder="Enter Phone Number" 
           value={this.state.phoneInput.value}
           name="phoneInput"
           onChange={this.handleInputChange}
           onBlur={this.handleBlur}/>
          <Input
           type="date" 
           value={this.state.dateInput.value}
           name="dateInput"
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
  
  >h2{
    text-align:center;
    
  }
`