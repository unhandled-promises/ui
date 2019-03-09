import React, { Component } from 'react';
import Router from 'next/router';
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
      isValid:true
    },
    detailsModal:false,
    firstNameInput:{
      value:'',
      regex:/^[a-z]+$/i,
      error:"Please enter a valid first name",
      isValid:true
    },
    lastNameInput:{
      value:'',
      regex:/^[a-z]+$/i,
      error:"Please enter a valid last name",
      isValid: true
    },
    dateInput:{
      value:''
    },
    phoneInput:{
      value:'',
      regex:/(^([\d]{3}\-){2})[\d]{4}$/,
      error:'Please enter a phone number in 555-555-5555 format',
      isValid:true
    }
  }

  findEmployeesByCompany = async (id) => {
    console.log(this.state.jwt);
    try{
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
    catch(error){
      console.log(error);
    }
  }

  createEmployee = async (email,companyId) => {
    console.log(`Creating employee ${email} ${companyId}`);
    const { jwt } = this.state;
    try{
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
    catch(error){
      console.log(error);
    }
  }

  updateEmployeeInformation = async (employeeInfo) => {
    const { id, firstName, lastName, phone, email, dob } = employeeInfo;
    const { jwt } = this.state;
    try{
      const updateResponse = await fetch(`${EMPLOYEES_API}api/employee/${id}`,{
        method:"PUT",
        body:JSON.stringify({
          "first_name": firstName,
          "last_name": lastName,
          "dob": dob,
          "phone": phone,
          "email": email
        }),
        headers:{
          "Authorization": jwt,
          "Content-Type": "application/json"
        }
      })
  
      const updateData = await updateResponse.json();
      console.log(updateData);
    }
    catch(error){
      console.log(error);
    }
  }

  deleteEmployee = async (id) => {
    console.log(`Deleting employee for id ${id}`);
    const { jwt } = this.state;
    try{
      const deleteResponse = await fetch (`${EMPLOYEES_API}api/employee/${id}`,{
        method:"DELETE",
        headers:{
          "Authorization": jwt
        }
      })
  
      const deleteData = await deleteResponse.json();
      console.log(deleteData);
    }
    catch(error){
      console.log(error);
    }
  }

  logUserOut = async () => {
    console.log(`Logging user out and removing jwt from session storage`);
    await sessionStorage.removeItem("jwt");
    window.location = "/login";
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
      case "Logout":
        this.logUserOut();
        break;
      case "addModal":
        this.setState({
          addModal:false
        })
        break;
      case "detailsModal":
        this.setState({detailsModal:true});
        break;
    }
  }

  handleClick = async (event) => {
    const { name } = event.target;
    let employees;
    switch (name) {
      case "Add Employee":
      const { emailInput, customerData } = this.state;
        if(emailInput.isValid){
          console.log(emailInput.value);
          await this.createEmployee(emailInput.value,customerData.company);
          const prevEmailState = this.state.emailInput;
          prevEmailState.value = "";
          employees = await this.findEmployeesByCompany(this.state.customerData.company);
          await this.setState({ 
            addModal: false,
            emailInput: prevEmailState,
            employees: employees
          });

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
        this.setState({detailsModal:true});
        break;

      case "detailsModal":
        this.setState({detailsModal:false});
        break;

      case "Remove":
        const { _id } = this.state.activeEmployee;
        await this.deleteEmployee(_id);
        employees = await this.findEmployeesByCompany(this.state.customerData.company);
        this.setState({
          detailsModal:false,
          employees: employees
        });
        break;

      case "Update":
      const { firstNameInput, lastNameInput, phoneInput, dateInput} = this.state;
      const { _id: id } = this.state.activeEmployee;
      console.log(`id: ${id}`);
        const validInfo = firstNameInput.isValid && lastNameInput.isValid && phoneInput.isValid && emailInput.isValid;
        if(validInfo){
          const updatedInfo = {
            firstName: firstNameInput.value,
            lastName: lastNameInput.value,
            email: emailInput.value,
            phone: phoneInput.value,
            dob: dateInput.value,
            id: id
          }
          console.log(updatedInfo);
          await this.updateEmployeeInformation(updatedInfo);
          employees = await this.findEmployeesByCompany(this.state.customerData.company);
        }
        else{
          console.log(`Please enter valid information`);
        }
        this.setState({
          detailsModal:false,
          employees: employees
        });
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
      case "firstNameInput":
        this.validateForm(name,value);
        break;
      case "lastNameInput":
        this.validateForm(name,value);
        break;
      case "phoneInput":
        this.validateForm(name,value);
        break;
    }
  }

  validateForm = (name,value) => {
    const isValid = (this.state[name].regex.test(value)) ? true : false;
    const updatedState = {...this.state[name]};
    updatedState.isValid = isValid;
    this.setState({
      [name]:updatedState
    })
   }

  async componentWillMount(){
    console.log(`will mount`);
    const jwt = await sessionStorage.getItem("jwt");
    if(jwt){
      await this.setState({jwt:jwt});
    }else{
      Router.push("/login");
    }
  }

  async componentDidMount(){
    console.log(`did mount`);
    const jwt = await sessionStorage.getItem("jwt");
    console.log(jwt);
    const customerData = await jwt_decode(jwt);
    console.log(customerData);
    this.setState({customerData:customerData})
    const employees = await this.findEmployeesByCompany(this.state.customerData.company);
    this.setState({employees:employees});
    console.log(this.state.jwt);
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
            <Button type="green" onClick={this.handleNavClick} name="Logout">Logout</Button>
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
        {/* Detils modal to update and remove the selected employee */}
        <Modal
          name="detailsModal"
          buttonNames={["Remove","Update"]}
          show={this.state.detailsModal}
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