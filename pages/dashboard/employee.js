import React, { Component } from 'react';
import Styled from 'styled-components';
import Button from '../../components/Button';
import Footer from '../../components/Footer';
import Card from '../../components/Card';
import FullNav from '../../components/FullNav';
import Toggle from '../../components/Toggle';
import Input from '../../components/Input';
import Modal from '../../components/Modal';
import Selection from '../../components/Selection';
import { CUSTOMERS_API, EMPLOYEES_API } from "../../static/api-config";
import Link from 'next/link';

class Employee extends Component {
	state={
		stopTransmission: false,
		editModal: false,
		jwt: '',
		employeeData: {},
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
		  passwordInput:{
			value:'',
			regex:/[]/,
			error:"Please enter a valid password at least 8 characters in length",
			isValid:false
		  },
		  phoneInput:{
			value:'',
			regex:/(^([\d]{3}\-){2})[\d]{4}$/,
			error:'Please enter a phone number in 555-555-5555 format',
			isValid:false
		  },
		  dateInput: {
			  value:''
		  }
	}

async componentDidMount() {
	const jwt = await sessionStorage.getItem("jwt");
	this.setState({jwt:jwt});
	const employeeData = await jwt_decode(jwt);
	console.log(employeeData);
	this.setState({employeeData: employeeData});
}

toggleTransmission = () => {
	if (this.state.stopTransmission === false) {
	this.setState({stopTransmission: true})
	} else {
		this.setState({stopTransmission: false})
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

handleBlur = event => {
	console.log(event.target);
		const {name} = event.target;
		const value = this.state[name].value;
		if(name === event.target.name){
			console.log(`validating ${event.target.name}`);
			console.log(this.state[name]);
			console.log(this.state[name].regex.test(value));
			const isValid = (this.state[name].regex.test(value)) ? true : false;
			const updatedState = {...this.state[name]};
			updatedState.isValid = isValid;
			this.setState({
			  [name]:updatedState
			})
		  }
}

updateAccountInfo = async employeeInfo => {
	const {id, firstName, lastName, password, phone, dob} = employeeInfo;
	const jwt = this.state;
	const updateResponse = await fetch(`${EMPLOYEES_API}api/employee/${id}`, {
		method:"PUT",
		body: JSON.stringify({
			"first_name": this.state.firstNameInput,
			"last_name": this.state.lastNameInput,
			"password": this.state.passwordInput,
			"phone":this.state.phoneInput,
			"dob":this.state.dateInput
		}),
		headers: {
			"Authorization": jwt,
			"Content-type": "application.json"
		}
	})
	const updateData = await updateResponse.json();
    console.log(updateData);
}

handleClick = (event) => {
	const { name } = event.target;
	switch (name) {
		case "edit":
		this.setState({
			editModal: true
		})
		break;
		case "editModal":
		this.setState({
			editModal:false
		})
		break;
		case "Update Information":
		updateAccountInfo();
		this.setState({
			editModal: false
		})
	}
}

render() {
	return(
		<React.Fragment>
			<FullNav>
				<Link href="/dashboard/employee"><NavLink>Home</NavLink></Link>
				<NavLink >Edit Account</NavLink>
			</FullNav>
				<WelcomeDiv><h1>Welcome {this.state.employeeData.email}!</h1></WelcomeDiv>
				<CardWrapper>
				<Card title="Heart Rate"/>
				<Card title="Coordinates"/>
				<Card title="Altitude"/>
				</CardWrapper>
				<ButtonDiv>
				<Button type="green">Trends</Button>
				<Button type="red" onClick={this.toggleTransmission}>{this.state.stopTransmission ? "Start Transmission" : "Stop Transmission"}</Button>
				<Button type="blue" name="edit" onClick={this.handleClick}>Edit Account</Button>
				</ButtonDiv>
				<Modal name="editModal" 
				buttonNames={["Update Information"]} 
				show={this.state.editModal}
				onSubmit={this.handleClick}
				handleClose={this.handleClick}>
					<h3>Edit Your Information</h3>
					<input type="text" name="firstNameInput" placeholder="First Name" value={this.state.employeeData.first_name} onChange={this.handleChange} onBlur={this.handleBlur}/>
					<input type="text" name="lastNameInput" placeholder="Last Name" value={this.state.employeeData.last_name} onChange={this.handleChange} onBlur={this.handleBlur}/>
					<input type="text" name="passwordInput" placeholder="Password" value={this.state.employeeData.password} onChange={this.handleChange} onBlur={this.handleBlur}/>
					<input type="text" name="phoneInput" placeholder="Phone Number" value={this.state.employeeData.phone} onChange={this.handleChange} onBlur={this.handleBlur}/>
					<input type="date" name="dateInput" placeholder="Date of Birth" value={this.state.employeeData.dob} onChange={this.handleChange}/>
				</Modal>								
			<Footer />
		</React.Fragment>
	)
}
}

export default Employee;


const NavLink = Styled.a `
	margin:.5rem;
	color: white;
	text-decoration: none;
`
const WelcomeDiv = Styled.div `
	text-align:center;
`

const CardWrapper = Styled.div `
	display: grid;
	grid-gap: 20px;
	margin:20px;
	grid-template-columns: repeat(3, 1fr);
`

const ButtonDiv = Styled.div `
	margin: auto;
	width: 50vw;
`