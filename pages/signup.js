import React, { Component } from 'react';
import Button from '../components/Button';
import Styled from 'styled-components';
import Nav from '../components/Nav';
import Input from '../components/Input';
import Footer from '../components/Footer';
import Link from 'next/link';

class SignUp extends Component {
	state = {
		verifyStep: 0,
		companyNameInput: '',
		addressInput: '',
		address2Input: '',
		cityInput: '',
		stateInput: '',
		countryInput: '',
		zipInput: '',
		emailInput: '',
		cardTypeInput: '',
		cardNumberInput: '',
		cardExpInput: '',
		plan: ''
	}

	handleInputChange = (event) => {
		const { name, value } = event.target;
		console.log(name, value);
		this.setState({ [name]: value })
	}


	handleClick = (event) => {
		const { name } = event.target;
		console.log(event.target);
		console.log(name);
		if (name === "Bronze") {
			this.setState((prevState) => ({ plan: name, verifyStep: prevState.verifyStep + 1 }))
		} else if (name === "Silver") {
			this.setState((prevState) => ({ plan: name, verifyStep: prevState.verifyStep + 1 }))
		} else if (name === "Gold") {
			this.setState((prevState) => ({ plan: name, verifyStep: prevState.verifyStep + 1 }))
		} else if (name === "edit") {
			this.setState((prevState) => ({ verifyStep: prevState.verifyStep - 3 }))
		} else {
			this.setState((prevState) => ({ verifyStep: prevState.verifyStep + 1 }))
			console.log("clicked");
			console.log(this.state.verifyStep);
		}
		console.log(this.state.plan);
	}


	render() {
		return (
			<React.Fragment>
				<Nav />
				<SignUpDiv verifyStep={this.state.verifyStep}>
					<h3>Register Your Company</h3>
					<Input
						placeholder="Company Name"
						value={this.state.companyNameInput}
						name="companyNameInput"
						onChange={this.handleInputChange}
					/>
					<Input
						placeholder="Address"
						value={this.state.addressInput}
						name="addressInput"
						onChange={this.handleInputChange}
					/>
					<Input
						placeholder="Address 2"
						value={this.state.address2Input}
						name="address2Input"
						onChange={this.handleInputChange}
					/>
					<Input
						placeholder="City"
						value={this.state.cityInput}
						name="cityInput"
						onChange={this.handleInputChange}
					/>
					<Input
						placeholder="State"
						value={this.state.stateInput}
						name="stateInput"
						onChange={this.handleInputChange}
					/>
					<Input
						placeholder="Country"
						value={this.state.countryInput}
						name="countryInput"
						onChange={this.handleInputChange}
					/>
					<Input
						placeholder="Zip Code"
						value={this.state.zipInput}
						name="zipInput"
						onChange={this.handleInputChange}
					/>
					<Input
						placeholder="Email"
						value={this.state.emailInput}
						name="emailInput"
						onChange={this.handleInputChange}
					/>
					<Button type="green" onClick={this.handleClick}>Next</Button>

				</SignUpDiv>
				<BundleDiv verifyStep={this.state.verifyStep}>
					<h3>Select Your Bundle</h3>
					<Button type="green" name="Bronze" onClick={this.handleClick}>Bronze - 1-200 Employees</Button>
					<Button type="green" name="Silver" onClick={this.handleClick}>Silver - 201-500 Employees</Button>
					<Button type="green" name="Gold" onClick={this.handleClick}>Gold - 501-1000 Employees</Button>
				</BundleDiv>
				<PaymentDiv verifyStep={this.state.verifyStep}>
					<h3>Enter Your Payment Information</h3>
					<Input
						placeholder="Card Type"
						value={this.state.cardTypeInput}
						name="cardTypeInput"
						onChange={this.handleInputChange}
					/>
					<Input
						placeholder="Card Number"
						value={this.state.cardNumberInput}
						name="cardNumberInput"
						onChange={this.handleInputChange}
					/>
					<Input
						placeholder="Expiration Date"
						value={this.state.cardExpInput}
						name="cardExpInput"
						onChange={this.handleInputChange}
					/>
					<Button type="green" onClick={this.handleClick}>Next</Button>
				</PaymentDiv>
				<ConfirmDiv verifyStep={this.state.verifyStep}>
					<h3>Review and Confirm Purchase</h3>
					<span><h4>Company Name: </h4>{this.state.companyNameInput}</span>
					<span><h4>Address: </h4>{this.state.addressInput}</span>
					<span><h4>Address 2: </h4>{this.state.address2Input}</span>
					<span><h4>City: </h4>{this.state.cityInput}</span>
					<span><h4>State: </h4>{this.state.stateInput}</span>
					<span><h4>Country: </h4>{this.state.countryInput}</span>
					<span><h4>Zip: </h4>{this.state.zipInput}</span>
					<span><h4>Email: </h4>{this.state.emailInput}</span>
					<span><h4>Plan Selected: </h4>{this.state.plan}</span>
					<span><h4>Card Type: </h4>{this.state.cardTypeInput}</span>
					<span><h4>Card Number: </h4>{this.state.cardNumberInput}</span>
					<span><h4>Expiration Date: </h4>{this.state.cardExpInput}</span>
					<Button type="green">Submit</Button>
					<Button type="blue" name="edit" onClick={this.handleClick}>Edit</Button>
					<Link href="/"><Button type="red">Cancel</Button></Link>
				</ConfirmDiv>
				<Footer />
			</React.Fragment>
		)
	}
}

export default SignUp;

const SignUpDiv = Styled.div`
	grid-template-columns: repeat(3, 1fr);
	display:${({ verifyStep }) => (verifyStep === 0) ? "grid" : "none"}
`

const BundleDiv = Styled.div`
	display:${({ verifyStep }) => (verifyStep === 1) ? "grid" : "none"}
`

const PaymentDiv = Styled.div`
	display:${({ verifyStep }) => (verifyStep === 2) ? "grid" : "none"}
`

const ConfirmDiv = Styled.div`
	grid-template-columns: repeat(3, 1fr);
	display:${({ verifyStep }) => (verifyStep === 3) ? "grid" : "none"};
`