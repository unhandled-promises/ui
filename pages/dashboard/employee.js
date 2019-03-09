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
import Router from 'next/router';

class Employee extends Component {
	state = {
		stopTransmission: false,
		editModal: false,
		jwt: '',
		employeeData: {},
		activeEmployee: {},
		firstNameInput: {
			value: '',
			regex: /^[a-z]+$/i,
			error: "Please enter a valid first name",
			isValid: false
		},
		lastNameInput: {
			value: '',
			regex: /^[a-z]+$/i,
			error: "Please enter a valid last name",
		},
		passwordInput: {
			value: '',
			regex: /[]/,
			error: "Please enter a valid password at least 8 characters in length",
			isValid: false
		},
		phoneInput: {
			value: '',
			regex: /(^([\d]{3}\-){2})[\d]{4}$/,
			error: 'Please enter a phone number in 555-555-5555 format',
			isValid: false
		},
		dateInput: {
			value: ''
		},
		isDisabled: true
	}

	async componentDidMount() {
		const jwt = await sessionStorage.getItem("jwt");
		if (jwt) {this.setState({ jwt: jwt });
		const employeeData = await jwt_decode(jwt);
		console.log(employeeData);
		this.setState({ employeeData: employeeData });
	} else {
		Router.push("/login");
	}
	}

	toggleTransmission = () => {
		if (this.state.stopTransmission === false) {
			this.setState({ stopTransmission: true })
		} else {
			this.setState({ stopTransmission: false })
		}
	}

	handleInputChange = (event) => {
		const { name, value } = event.target;
		const prevState = { ...this.state[name] };
		prevState.value = value;
		this.setState({
			[name]: prevState,
		})
	}

	handleBlur = (event) => {
		console.log(event.target);
		const { name } = event.target;
		const value = this.state[name].value;
		switch (name) {
			case "firstNameInput":
				this.validateForm(name, value);
				break;
			case "lastNameInput":
				this.validateForm(name, value);
				break;
			case "passwordInput":
				this.validateForm(name, value);
				break;
			case "phoneInput":
				this.validateForm(name, value);
				break;
		}
	}

	validateForm = (name, value) => {
		const isValid = (this.state[name].regex.test(value)) ? true : false;
		const updatedState = { ...this.state[name] };
		updatedState.isValid = isValid;
		this.setState({
			[name]: updatedState
		})
	}

	updateAccountInfo = async (updatedInfo) => {
		console.log("Updating User")
		const { id, firstName, lastName, password, phone, dob } = updatedInfo;
		const jwt = this.state;
		const updateResponse = await fetch(`${EMPLOYEES_API}api/employee/${id}`, {
			method: "PUT",
			body: JSON.stringify({
				"first_name": firstName,
				"last_name": lastName,
				"password": password,
				"phone": phone,
				"dob": dob
			}),
			headers: {
				"Authorization": jwt,
				"Content-type": "application.json"
			}
		})
		const updateData = await updateResponse.json();
		console.log(updateData);
	}

	logUserOut = async () => {
		console.log(`Logging user out and removing jwt from session storage`);
		await sessionStorage.removeItem("jwt");
		window.location = "/login";
	  }

	handleClick = async (event) => {
		const { name } = event.target;
		switch (name) {
			case "edit":
				const { id: employeeIndex } = event.target;
				// await this.setState({ 
				// 	activeEmployee: 
				// 	this.state.employees
				// 	[employeeIndex] 
				// });
				const { first_name: first, last_name: last, password, phone, dob } = this.state.activeEmployee;
				const prevFirstNameState = { ...this.state.firstNameInput };
				const prevLastNameState = { ...this.state.lastNameInput };
				const prevPhoneState = { ...this.state.phoneInput };
				const prevDobState = { ...this.state.dateInput };
				const prevPasswordState = { ...this.state.passwordInput };

				prevFirstNameState.value = first;
				prevLastNameState.value = last;
				prevPasswordState.value = password;
				prevDobState.value = dob;
				prevPhoneState.value = phone;

				this.setState({
					firstNameInput: prevFirstNameState,
					lastNameInput: prevLastNameState,
					passwordInput: prevPasswordState,
					dateInput: prevDobState,
					phoneInput: prevPhoneState
				});
				this.setState({
					editModal: true
				})
				break;
			case "editModal":
				this.setState({
					editModal: false
				})
				break;
			case "Update":
				const { firstNameInput, lastNameInput, phoneInput, passwordInput, dateInput } = this.state;
				const { _id: id } = this.state.employeeData.id;
				console.log(`id: ${id}`);
				const validInfo = firstNameInput.isValid && lastNameInput.isValid && phoneInput.isValid && passwordInput.isValid;
				if (validInfo) {
					const updatedInfo = {
						firstName: firstNameInput.value,
						lastName: lastNameInput.value,
						password: passwordInput.value,
						phone: phoneInput.value,
						dob: dateInput.value,
						id: id
					}
					console.log(updatedInfo);
					await this.updateAccountInfo(updatedInfo);
					this.setState({
						editModal: false
					})
				}
				else {
					console.log(`Please enter valid information`);
				}
				break;
				case "Logout":
				this.logUserOut();
				break;

		}
	}

	render() {
		return (
			<React.Fragment>
				<FullNav>
					<Link href="/dashboard/employee"><NavLink>Home</NavLink></Link>
					<NavLink onClick={this.handleClick} name="Logout">Logout</NavLink>
				</FullNav>
				<WelcomeDiv><h1>Welcome {this.state.employeeData.email}!</h1></WelcomeDiv>
				<CardWrapper>
					<Card title="Heart Rate" />
					<Card title="Coordinates" />
					<Card title="Altitude" />
				</CardWrapper>
				<ButtonDiv>
					<Button type="green">Trends</Button>
					<Button type="red" onClick={this.toggleTransmission}>{this.state.stopTransmission ? "Start Transmission" : "Stop Transmission"}</Button>
					<Button type="blue" name="edit" onClick={this.handleClick}>Edit Account</Button>
				</ButtonDiv>
				<Modal name="editModal"
					buttonNames={["Update"]}
					show={this.state.editModal}
					handleClick={this.handleClick}
					handleClose={this.handleClick}>
					<h3>Edit Your Information</h3>
					<Input type="text" name="firstNameInput" placeholder="First Name" value={this.state.employeeData.first_name} onChange={this.handleChange} onBlur={this.handleBlur} />
					<Input type="text" name="lastNameInput" placeholder="Last Name" value={this.state.employeeData.last_name} onChange={this.handleChange} onBlur={this.handleBlur} />
					<Input type="password" name="passwordInput" placeholder="Password" value={this.state.employeeData.password} onChange={this.handleChange} onBlur={this.handleBlur} />
					<Input type="text" name="phoneInput" placeholder="Phone Number" value={this.state.employeeData.phone} onChange={this.handleChange} onBlur={this.handleBlur} />
					<Input type="date" name="dateInput" placeholder="Date of Birth" value={this.state.employeeData.dob} onChange={this.handleChange} />
				</Modal>
				<Footer />
			</React.Fragment>
		)
	}
}

export default Employee;


const NavLink = Styled.a`
	margin:.5rem;
	color: white;
	text-decoration: none;
`
const WelcomeDiv = Styled.div`
	text-align:center;
`

const CardWrapper = Styled.div`
	display: grid;
	grid-gap: 20px;
	margin:20px;
	grid-template-columns: repeat(3, 1fr);
`

const ButtonDiv = Styled.div`
	margin: auto;
	width: 50vw;
`