import React, { Component } from 'react';
import Styled from 'styled-components';
import Footer from '../../components/Footer';
import FullNav from '../../components/FullNav';
import Input from '../../components/Input';
import Modal from '../../components/Modal';
import { EMPLOYEES_API } from "../../static/api-config";
import Link from 'next/link';
import Router from 'next/router';
import Badges from '../../components/Badges'
import Friends from '../../components/Friends'
import LifetimeStats from '../../components/LifetimeStats'
import EmployeeCard from '../../components/EmployeeCard'
import { Container, Row, Col } from 'styled-bootstrap-grid';
import DailyStats from '../../components/DailyStats';
import Devices from '../../components/Devices';
import TimeSeriesBarChart from '../../components/TimeSeriesBarChart';
import Health from '../../components/Health';
import SideBar from "../../components/SideBar";

class Employee extends Component {
	state = {
		todayStats: {
			summary: {
				restingHeartRate: '',
				steps: '',
				caloriesOut: '',
			},
		},
		lifetimeStats: {
			best: {
				total: {
					distance: {
						date: '',
						value: ''
					},
					steps: {
						date: '',
						value: ''
					}
				}
			},
			lifetime: {
				total: {
					distance: '',
					steps: ''
				}
			}
		},
		badges: {
			badges: []
		},
		devices: [],
		friends: { friends: [] },
		steps: { 'activities-steps': [] },
		distance: { 'activities-distance': [] },
		editModal: false,
		jwt: '',
		employeeData: {

			firstName: '',
			lastName: '',
			password: '',
			phone: '',
			dob: '',
			email: ''
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
			isValid: true
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
			this.setState({ jwt: jwt });
			this.fetchData("/", "employeeData");
			this.fetchData("/activities/lifetime/", "lifetimeStats");
			this.fetchData('/badges/', 'badges')
			this.fetchData("/activities/today/", "todayStats");
			this.fetchData("/friends/", "friends");
			this.fetchData("/devices/", "devices");
			this.fetchData("/activities/steps/month/", "steps");
			this.fetchData("/activities/distance/month/", "distance");
			// setInterval(()=>{this.fetchEmployeeHeartRate(tokenData.id)},10000)
		} else {
			Router.push("/login/");
		}
	}

	fetchData = async (url, stateKey) => {
		const { jwt } = this.state;
		const token = await jwt_decode(jwt);
		try {
			const response = await fetch(`${EMPLOYEES_API}api/employee/${token.id}${url}`, {
				method: "GET",
				headers: {
					"Authorization": jwt
				}
			});
			const jsonResponse = await response.json();
			await this.setState({ [stateKey]: jsonResponse })
		} catch (error) {
			console.log(error);
		};
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
		const { jwt } = this.state;
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
				const { first_name: firstName, last_name: lastName, password, phone, dob } = this.state.employeeData;
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
				const { _id: employeeId } = this.state.employeeData;
				console.log(`id: ${employeeId}`);
				const validInfo = firstNameInput.isValid && lastNameInput.isValid && passwordInput.isValid;
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
		let caloriesOut = "N/A";
		let restingHeartRate = "N/A";

		if (this.state.todayStats && this.state.todayStats.summary) {
			caloriesOut = this.state.todayStats.summary.caloriesOut;
		};
		if (this.state.todayStats && this.state.todayStats.summary && this.state.todayStats.summary.restingHeartRate) {
			restingHeartRate = this.state.todayStats.summary.restingHeartRate;
		};
		return (
			<React.Fragment>
				<SideBar>
					{/* <FullNav>
						<Link href="/dashboard/employee"><NavLink>Home</NavLink></Link>
						<NavLink onClick={this.handleClick} name="Logout">Logout</NavLink>
					</FullNav> */}
					<LoginDiv>
						<Container>
							<Title>Your Personal Health Dashboard</Title>
							<Row>
								<Col col="3">
									<Friends friends={this.state.friends.friends} />
								</Col>
								<Col col="5">
									<EmployeeCard employeeInfo={this.state.employeeData} />
								</Col>
								<Col col="3">
									<LifetimeStats lifetimeStats={this.state.lifetimeStats} />
								</Col>
							</Row>
							<Row>
								<Col col="3">
									<Devices devices={this.state.devices} />
								</Col>
								<Col col="5">
									<TimeSeriesBarChart data={this.state.steps['activities-steps']} title="Steps" yMax={15000} />
								</Col>
								<Col col="3">
									<Health heading="Calories Burned" image="../static/images/calories-burned.jpeg" value={caloriesOut} description="calories" />
								</Col>
							</Row>
							<Row>
								<Col col="3">
									<Badges badges={this.state.badges.badges} />
								</Col>
								<Col col="5">
									<TimeSeriesBarChart data={this.state.distance['activities-distance']} title="Distance (kilometers)" yMax={10} />
								</Col>
								<Col col="3">
									<Health todayStats={this.state.todayStats} heading="Resting Heart Rate" image="../static/images/heart-rate.jpg" value={restingHeartRate} description="beats per minute" />
								</Col>
							</Row>
						</Container>
						<Modal name="editModal"
							buttonNames={["Update"]}
							show={this.state.editModal}
							handleClick={this.handleClick}
							handleClose={this.handleClick}>
							<h3>Edit Your Information</h3>
							<Input type="text" name="firstNameInput" placeholder="First Name" value={this.state.firstNameInput.value} onChange={this.handleInputChange} onBlur={this.handleBlur} />
							<Input type="text" name="lastNameInput" placeholder="Last Name" value={this.state.lastNameInput.value} onChange={this.handleInputChange} onBlur={this.handleBlur} />
							<Input type="password" name="passwordInput" placeholder="Password" value={this.state.passwordInput.value} onChange={this.handleInputChange} onBlur={this.handleBlur} />
							<Input type="text" name="phoneInput" placeholder="Phone Number" value={this.state.phoneInput.value} onChange={this.handleInputChange} onBlur={this.handleBlur} />
							<Input type="date" name="dateInput" placeholder="Date of Birth" value={this.state.dateInput.value} onChange={this.handleInputChange} />
						</Modal>
					</LoginDiv>
				</SideBar>
				<Footer />
			</React.Fragment >
		)
	}
}

export default Employee;

const LoginDiv = Styled.div`
    grid-template-columns: 2fr;
    max-width: 1200px;
    width:80%;
    padding:30px;
    margin:40px auto;
    background: #FFF;
    border-radius: 10px;
    -webkit-border-radius:10px;
    -moz-border-radius: 10px;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.13);
    -moz-box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.13);
    -webkit-box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.13);
	display: grid;
	text-align: center
`

const NavLink = Styled.a`
	margin:.5rem;
	color: white;
	text-decoration: none;
	cursor: pointer;
`

const Title = Styled.h2`
	text-align: center;
	color: grey;
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