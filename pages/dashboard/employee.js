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
		employeeData: {
			firstName: '',
			lastName: '',
			password: '',
			phone: '',
			dob:''
		},
		firstNameInput: {
			value: '',
			regex: /^[a-z]+$/i,
			error: "Please enter a valid first name",
			isValid: true
		},
		lastNameInput: {
			value: '',
			regex: /^[a-z]+$/i,
			error: "Please enter a valid last name",
			isValid:true
		},
		passwordInput: {
			value: '',
			regex: /[\w]+/,
			error: "Please enter a valid password at least 8 characters in length",
			isValid: true
		},
		phoneInput: {
			value: '',
			regex: /(^([\d]{3}\-){2})[\d]{4}$/,
			error: 'Please enter a phone number in 555-555-5555 format',
			isValid: true
		},
		dateInput: {
			value: ''
		},
		isDisabled: true
	}

	async componentDidMount() {
		const jwt = await sessionStorage.getItem("jwt");
		if (jwt) {
			await this.setState({ jwt: jwt });
			const tokenData = await jwt_decode(jwt);
			const employeeData = await this.fetchEmployeeInfo(tokenData.id);
			await this.setState({ employeeData: employeeData });
			setInterval(()=>{this.fetchEmployeeHeartRate(tokenData.id)},10000)
		} else {
			Router.push("/login");
		}
	}

	fetchEmployeeInfo = async (id) => {
		const { jwt } = this.state;
		const getInfoResponse = await fetch(`${EMPLOYEES_API}api/employee/${id}`,{
			method:"GET",
			headers:{
				"Authorization": jwt
			}
		});
		const getInfoData = await getInfoResponse.json();
		return getInfoData;
	}

	fetchEmployeeHeartRate = async (id) => {
		const { jwt } = this.state;
		const heartRateResponse = await fetch(`${EMPLOYEES_API}api/employee/${id}/activities/heart`,{
			headers:{
				"Authorization": jwt
			}
		})

		const heartRateData = await heartRateResponse.json();
		console.log(heartRateData);
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
		console.log(value);
		const prevState = { ...this.state[name] };
		prevState.value = value;
		this.setState({
			[name]: prevState,
		})
	}

	handleBlur = async (event) => {
		console.log(event.target);
		const { name } = event.target;
		const value = this.state[name].value;
		switch (name) {
			case "firstNameInput":
				await this.validateForm(name, value);
				console.log(this.state.firstNameInput.isValid);
				break;
			case "lastNameInput":
				await this.validateForm(name, value);
				console.log(this.state.lastNameInput.isValid);
				break;
			case "passwordInput":
				await this.validateForm(name, value);
				console.log(this.state.passwordInput.isValid);
				break;
			case "phoneInput":
				await this.validateForm(name, value);
				console.log(this.state.phoneInput.isValid);
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
		const {jwt} = this.state;
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
				"Content-type": "application/json"
			}
		})
		const updateData = await updateResponse.json();
		console.log(updateData);
	}

	logUserOut = async () => {
		console.log(`Logging user out and removing jwt from session storage`);
		await sessionStorage.removeItem("jwt");
		Router.push("/login");
	  }

	handleClick = async (event) => {
		const { name } = event.target;
		switch (name) {
			case "edit":
				const { id } = this.state.employeeData;
				const { first_name:firstName, last_name:lastName, password, phone, dob } = this.state.employeeData;
				const prevFirstNameState = { ...this.state.firstNameInput };
				const prevLastNameState = { ...this.state.lastNameInput };
				const prevPhoneState = { ...this.state.phoneInput };
				const prevDobState = { ...this.state.dateInput };
				const prevPasswordState = { ...this.state.passwordInput };

				prevFirstNameState.value = firstName;
				prevLastNameState.value = lastName;
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
				const { _id:employeeId } = this.state.employeeData;	
				console.log(`id: ${employeeId}`);
				const validInfo = firstNameInput.isValid && lastNameInput.isValid  && passwordInput.isValid;
				if (validInfo) {
					const updatedInfo = {
						firstName: firstNameInput.value,
						lastName: lastNameInput.value,
						password: passwordInput.value,
						phone: phoneInput.value,
						dob: dateInput.value,
						id: employeeId
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
					<Input type="text" name="firstNameInput" placeholder="First Name" value={this.state.firstNameInput.value } onChange={this.handleInputChange} onBlur={this.handleBlur} />
					<Input type="text" name="lastNameInput" placeholder="Last Name" value={this.state.lastNameInput.value} onChange={this.handleInputChange} onBlur={this.handleBlur} />
					<Input type="password" name="passwordInput" placeholder="Password" value={this.state.passwordInput.value} onChange={this.handleInputChange} onBlur={this.handleBlur} />
					<Input type="text" name="phoneInput" placeholder="Phone Number" value={this.state.phoneInput.value} onChange={this.handleInputChange} onBlur={this.handleBlur} />
					<Input type="date" name="dateInput" placeholder="Date of Birth" value={this.state.dateInput.value} onChange={this.handleInputChange} />
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