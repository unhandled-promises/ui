import React, { Component } from 'react';
import Router from 'next/router';
import Styled from 'styled-components';
import Button from '../../components/Button';
import Home from '../../components/customer_dash/Home';
import Input from '../../components/Input';
import Manage from '../../components/customer_dash/Manage';
import Modal from '../../components/Modal';
import Nav from '../../components/Nav';
import { CUSTOMERS_API, EMPLOYEES_API } from "../../static/api-config";

class Customer extends Component{
  state={
    showHome:true,
    showManage: false,
    addModal:false,
    navExpand:false,
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

  fetchEmployeeHeartRate = async (id) => {
		const { jwt } = this.state;
		const heartRateResponse = await fetch(`${EMPLOYEES_API}api/employee/${id}/activities/today`,{
			headers:{
				"Authorization": jwt
			}
		})
    console.log(heartRateResponse);
		const heartRateData = await heartRateResponse.json();
    console.log(heartRateData);
    return heartRateData;
	}

  logUserOut = async () => {
    console.log(`Logging user out and removing jwt from session storage`);
    await sessionStorage.removeItem("jwt");
    window.location = "/login";
  }

  // Click events for the side control panel
  handleNavClick = (event) => {
    const { name,id } = event.target;
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
      case "Minimize":
        this.setState({navExpand:false});
        break;
      case "Expand":
        this.setState({navExpand:true});
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

    switch(id){
      case "Minimize":
        this.setState({navExpand:false});
        break;
      case "Expand":
        this.setState({navExpand:true});
        break;
    }
  }

  handleClick = async (event) => {
    const { name } = event.target;
    let employees;
    switch (name) {
      case "Add Employee":
      let { emailInput, customerData } = this.state;
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
      const { firstNameInput, lastNameInput, phoneInput, dateInput } = this.state;
      
      const { _id: id } = this.state.activeEmployee;
      console.log(`id: ${id}`);
        const validInfo = firstNameInput.isValid && lastNameInput.isValid && phoneInput.isValid && this.state.emailInput.isValid;
        if(validInfo){
          const updatedInfo = {
            firstName: firstNameInput.value,
            lastName: lastNameInput.value,
            email: this.state.emailInput.value,
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
    const jwt = await sessionStorage.getItem("jwt");
    if(jwt){
      await this.setState({jwt:jwt});
    }else{
      Router.push("/login");
    }
  }

  async componentDidMount(){
    const jwt = await sessionStorage.getItem("jwt");
    const customerData = await jwt_decode(jwt);
    await this.setState({customerData:customerData})
    const employees = await this.findEmployeesByCompany(this.state.customerData.company);
    // await this.setState({employees:employees});
    await employees.forEach(async (employee,index) => {
      const employeeHeartData = await this.fetchEmployeeHeartRate(employee._id);
      console.log(employeeHeartData);
      const employeesFitbit = [...employees];
      employeesFitbit[index].heartRate = employeeHeartData;
      await this.setState({employees:employeesFitbit});
    });
  }

  render(){
    return(
      <React.Fragment>
        <DashBody toggle={this.state.navExpand}>
          <NavDiv>
            <Nav />
          </NavDiv>
          <ControlPanel toggle={this.state.navExpand}>
            <NameDiv>
              {(this.state.navExpand)?
              <h2>Hello, {this.state.customerData.email}</h2>:
              null}
              {(this.state.navExpand)?
              <Button size="normal" type="transparent" onClick={this.handleNavClick} name="Minimize"><i id="Minimize" class="fas fa-angle-double-left"></i></Button>:
              <Button size="small" type="transparent" onClick={this.handleNavClick} name="Expand"><i id="Expand" class="fas fa-angle-double-right"></i></Button>}
            </NameDiv>
            {(this.state.navExpand)?
            <Button size="normal" type="orange" onClick={this.handleNavClick} name="Home">Home</Button>:
            <Button size="small" type="transparent" onClick={this.handleNavClick} name="Home"><i class="fas fa-home"></i></Button>}
            {(this.state.navExpand)?
            <Button size="normal" type="orange" onClick={this.handleNavClick} name="Manage">Manage</Button>:
            <Button size="small" type="transparent" onClick={this.handleNavClick} name="Manage"><i class="fas fa-users"></i></Button>}
            {(this.state.showManage)?
            (this.state.navExpand)?
            <Button size="normal" type="alt-orange" onClick={this.handleNavClick} name="Add">Add Employees</Button>:
            <Button size="small" type="transparent" onClick={this.handleNavClick} name="Add"><i class="fas fa-plus"></i></Button>:
            null}
            {(this.state.navExpand)?
            <Button size="normal" type="orange" onClick={this.handleNavClick} name="Logout">Logout</Button>:
            <Button size="small" type="transparent" onClick={this.handleNavClick} name="Logout"><i class="fas fa-sign-out-alt"></i></Button>}
          </ControlPanel>
          <MainView>
            {(this.state.showHome)?<Home employees={this.state.employees}/>: null}
            {(this.state.showManage)?<Manage employees={this.state.employees} onClick={this.handleClick} />: null}
          </MainView>
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
          <h3>Edit Employee Information</h3>
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

const NameDiv = Styled.div`
  margin:.5rem;
  color: white;
  text-decoration: none;
  display: grid;
  grid-template-columns: 1fr auto;
  transition: 1000ms;
  h2{
    display: inline-block;
  }
`

const NavDiv = Styled.div`
  grid-area: Nav;
`;

const DashBody = Styled.div`
 font-family: 'Baloo Chettan', cursive;
 display: grid;
 height:100vh;
 width:100vw;
 transition: 1000ms;
 grid-template-columns:${({toggle})=>{
   switch(toggle){
     case true:
      return "1fr 80vw"
     case false:
      return "120px 1fr" 
   }
  }};
 grid-template-rows: auto 1fr 1fr;
 grid-template-areas:
  "Nav Nav"
  "Side Main"
  "Side Main";

  @media(max-width: 768px){
    grid-template-areas:
    "Nav Nav"
    "Main Main"
    "Side Side"
  }
`

const ControlPanel = Styled.div`
  display: grid;
  width:100%;
  background-color: #1f2d3f;
  grid-area: Side;
  transition: 1000ms;
  grid-template-rows:${({toggle})=>{
    switch(toggle){
      case true:
        return "auto repeat(3,1fr)"
      case false:
        return "repeat(5,100px)"
    }
  }};
  align-items:${({toggle})=>{
    switch(toggle){
      case true:
        return "stretch"
      case false:
        return "start"
    }
  }};

  justify-items: ${({toggle})=>{
    switch(toggle){
      case true:
        return "stretch"
      case false:
        return "stretch"
    }
  }};

  >h2{
    text-align:center;
  }

  @media(max-width:768px){
    grid-template-columns:repeat(4,1fr)
    grid-template-rows:1fr;
  }
`

const MainView = Styled.div`
  grid-area: Main;
`