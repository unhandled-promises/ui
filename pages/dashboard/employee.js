import React, { Component } from 'react';
import Styled from 'styled-components';
import Footer from '../../components/Footer';;
import Modal from '../../components/Modal';
import { EMPLOYEES_API, CUSTOMERS_API } from "../../static/api-config";
import Router from 'next/router';
import Badges from '../../components/Badges'
import Friends from '../../components/Friends'
import LifetimeStats from '../../components/LifetimeStats'
import EmployeeCard from '../../components/EmployeeCard'
import { Container, Row, Col } from 'styled-bootstrap-grid';
import Devices from '../../components/Devices';
import TimeSeriesBarChart from '../../components/TimeSeriesBarChart';
import Health from '../../components/Health';
import SideBar from "../../components/SideBar";
import EmployeeInfo from "../../components/EmployeeInfo";
import { withStyles } from "@material-ui/core/styles";
import CompanyInfo from "../../components/CompanyInfo";

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
		jwt: '',
		displayEmployeeInfo: false,
		displayCompanyInfo: false,
		employeeData: {},
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

	performEmployeeUpdate = async (employee) => {
		await fetch(`${EMPLOYEES_API}api/employee/${employee.id}`, {
			method: "PUT",
			body: JSON.stringify({
				"first_name": employee.firstName,
				"last_name": employee.lastName,
				"dob": employee.date,
				"phone": employee.phone,
			}),
			headers: {
				"Authorization": sessionStorage.getItem("jwt"),
				"Content-Type": "application/json"
			},
		})

		this.fetchData("/", "employeeData");
		await this.setState({ displayEmployeeInfo: false });
	}

	performCompanyUpdate = async (company) => {
		console.log("companyName: ", company.company_name);
		await fetch(`${CUSTOMERS_API}api/customers/${company._id}`, {
			method: "PUT",
			body: JSON.stringify({
				"name": company.company_name,
				"address": company.address,
				"email": company.email,
				"city": company.city,
				"postal": company.postal,
				"state": company.state
			}),
			headers: {
				"Authorization": sessionStorage.getItem("jwt"),
				"Content-Type": "application/json"
			},
		})
		await this.setState({ displayCompanyInfo: false });
	}

	performSidebarAction = async (navType) => {
		if ("editEmployee" === navType) {
			await this.setState({ displayEmployeeInfo: true });
		} else if ("editCompany" === navType) {
			await this.setState({ displayCompanyInfo: true });
		}
	}

	performModalAction = async (event) => {
		const { name, id } = event.target;
		if ("editEmployee" === name) {
			await this.setState({ displayEmployeeInfo: false });
		} else if ("editCompany" === name) {
			await this.setState({ displayCompanyInfo: false });
		}
	}

	render() {
		const { classes } = this.props;
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
				<SideBar onClickIcon={this.performSidebarAction}>
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
						{this.state.employeeData._id !== undefined ?
							<EmployeeInfoDiv shouldDisplay={this.state.displayEmployeeInfo}>
								<Modal name="editEmployee"
									buttonNames={[]}
									show={this.state.displayEmployeeInfo}
									handleClick={this.performModalAction}
									handleClose={this.performModalAction}
								>
									<EmployeeInfo classes={classes} handler={this.performEmployeeUpdate} scope="update" employeeId={this.state.employeeData._id} jwt={this.state.jwt} />
								</Modal>
							</EmployeeInfoDiv>
							: ""}
						{this.state.employeeData.company !== undefined ?
							<CompanyInfoDiv shouldDisplay={this.state.displayCompanyInfo}>
								<Modal name="editCompany"
									buttonNames={[]}
									show={this.state.displayCompanyInfo}
									handleClick={this.performModalAction}
									handleClose={this.performModalAction}
								>
									<CompanyInfo classes={classes} handler={this.performCompanyUpdate} scope="update" customerId={this.state.employeeData.company} jwt={this.state.jwt} />
								  </Modal>
							</CompanyInfoDiv>
							: ""}
					</LoginDiv>
				</SideBar>
				<Footer />
			</React.Fragment >
		)
	}
}

export default withStyles(styles)(Employee);

const EmployeeInfoDiv = Styled.div`
    grid-template-columns: 2fr;
    max-width: 800px;
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
	display:${({ shouldDisplay }) => (shouldDisplay === true) ? "grid" : "none"}
`

const CompanyInfoDiv = Styled.div`
    grid-template-columns: 2fr;
    max-width: 800px;
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
	display:${({ shouldDisplay }) => (shouldDisplay === true) ? "grid" : "none"}
`

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
const styles = theme => ({
	// tieredWrap: {
	// 	display: "flex",
	// 	flexDirection: "row",
	// 	flexWrap: "wrap",
	// 	justifyContent: "space-between",
	// 	alignItems: "center",
	// },
})

const Title = Styled.h2`
	text-align: center;
	color: grey;
`