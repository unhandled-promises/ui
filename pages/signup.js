import React, { Component } from 'react';
import Button from '../components/Button';
import Styled from 'styled-components';
import Nav from '../components/Nav';
import Input from '../components/Input';
import Footer from '../components/Footer';
import Selection from '../components/Selection';
import Link from 'next/link';
import { STATUS_CODES } from 'http';

class SignUp extends Component {
	state = {
		verifyStep: 0,
		companyNameInput:{
			value: '',
			regex: /^.{1,50}$/,
			error: "Please enter a valid name.",
			isValid: false
		} ,
		addressInput:{
			 value: '',
			 regex: /^\d+\s[A-z]+\s[A-z]+/g,
			 error: "Please enter a valid address.",
			 isValid: false
		},
		address2Input:{
			value: '',
	   },
		cityInput: {
			value: '',
			regex: /[a-zA-Z\s]+/g,
			error: "Please enter a valid city name.",
			isValid: false
	   },
		stateInput: {
			value: '',
	   },
		countryInput: {
			value: '',
			regex: /[a-zA-Z\s]+/g,
			error: "Please enter a valid country name.",
			isValid: false
	   },
		zipInput: {
			value: '',
			regex: /(^\d{5}$)|(^\d{5}-\d{4}$)/,
			error: "Please enter a valid zip code.",
			isValid: false
	   },
		emailInput: {
			value: '',
			regex: /^[^@]+@[^@]+\.[^@]+$/,
			error: "Please enter a valid email address.",
			isValid: false
	   },
		cardTypeInput: {
			value: ''
	   },
		cardNumberInput: {
			value: '',
			regex: /^4[0-9]{12}(?:[0-9]{3})?$/,
			error: "Please enter a valid credit card number.",
			isValid: false
	   },
		cardExpInput: {
			value: '',
			regex: /^(0[1-9]|1[0-2])\/?([0-9]{4}|[0-9]{2})$/,
			error: "Please enter a valid expiration date.",
			isValid: false
	   },
		plan: ''
	}

	handleInputChange = (event) => {
		const { name, value } = event.target;
		console.log(name, value);
		const prevState = {...this.state[name]}
		console.log (prevState);
		prevState.value = value;
		this.setState({ [name]: prevState, })
	}

	handleBlur = (event) => {
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

	submitCompany = async () => {
		const body = {
			"name":this.state.companyNameInput.value,
			"address": this.state.addressInput.value,
			"address2": this.state.address2Input.value,
			"city":this.state.cityInput.value,
			"state":this.state.stateInput.value,
			"country":this.state.countryInput.value,
			"postal":this.state.zipInput.value,
			"email":this.state.emailInput.value,
			"package": this.state.plan,
			"card_type":this.state.cardTypeInput.value,
			"card_number": this.state.cardNumberInput.value,
			"card_exp": this.state.cardExpInput.value,
			"active":true
		}
		const response = await fetch ("https://customer-api-p3.herokuapp.com/api/customers", {
			method:"POST",
			body:JSON.stringify(body),
			headers: { 'Content-Type': 'application/json' }
		});
		const data = await response.json();
		console.log(data);

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
		} else if (name === "submit") {
			this.submitCompany();
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
						value={this.state.companyNameInput.value}
						name="companyNameInput"
						onChange={this.handleInputChange}
						onBlur={this.handleBlur}
					/>
					<Input
						placeholder="Address"
						value={this.state.addressInput.value}
						name="addressInput"
						onChange={this.handleInputChange}
						onBlur={this.handleBlur}
					/>
					<Input
						placeholder="Address 2"
						value={this.state.address2Input.value}
						name="address2Input"
						onChange={this.handleInputChange}
					/>
					<Input
						placeholder="City"
						value={this.state.cityInput.value}
						name="cityInput"
						onChange={this.handleInputChange}
						onBlur={this.handleBlur}
					/>
					<Selection
						options={["Select State","AK","AL","AR","AZ","CA","CO","CT","DC","DE","FL","GA","GU","HI","IA","ID", "IL","IN","KS","KY","LA","MA","MD","ME","MH","MI","MN","MO","MS","MT","NC","ND","NE","NH","NJ","NM","NV","NY", "OH","OK","OR","PA","PR","PW","RI","SC","SD","TN","TX","UT","VA","VI","VT","WA","WI","WV","WY"]}
						value={this.state.stateInput.value}
						name="stateInput"
						onChange={this.handleInputChange}
					/>
					<Input
						placeholder="Country"
						value={this.state.countryInput.value}
						name="countryInput"
						onChange={this.handleInputChange}
						onBlur={this.handleBlur}
					/>
					<Input
						placeholder="Zip Code"
						value={this.state.zipInput.value}
						name="zipInput"
						onChange={this.handleInputChange}
						onBlur={this.handleBlur}
					/>
					<Input
						placeholder="Email"
						value={this.state.emailInput.value}
						name="emailInput"
						onChange={this.handleInputChange}
						onBlur={this.handleBlur}
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
					<Selection
						options={["Select Card", "Visa", "Mastercard", "American Express"]}
						value={this.state.cardTypeInput.value}
						name="cardTypeInput"
						onChange={this.handleInputChange}
					/>
					<Input
						placeholder="Card Number"
						value={this.state.cardNumberInput.value}
						name="cardNumberInput"
						onChange={this.handleInputChange}
						onBlur={this.handleBlur}
					/>
					<Input
						placeholder="Expiration Date"
						value={this.state.cardExpInput.value}
						name="cardExpInput"
						onChange={this.handleInputChange}
						onBlur={this.handleBlur}
					/>
					<Button type="green" onClick={this.handleClick}>Next</Button>
				</PaymentDiv>
				<ConfirmDiv verifyStep={this.state.verifyStep}>
					<h3>Review and Confirm Purchase</h3>
					<span><h4>Company Name: </h4>{this.state.companyNameInput.value}</span>
					<span><h4>Address: </h4>{this.state.addressInput.value}</span>
					<span><h4>Address 2: </h4>{this.state.address2Input.value}</span>
					<span><h4>City: </h4>{this.state.cityInput.value}</span>
					<span><h4>State: </h4>{this.state.stateInput.value}</span>
					<span><h4>Country: </h4>{this.state.countryInput.value}</span>
					<span><h4>Zip: </h4>{this.state.zipInput.value}</span>
					<span><h4>Email: </h4>{this.state.emailInput.value}</span>
					<span><h4>Plan Selected: </h4>{this.state.plan}</span>
					<span><h4>Card Type: </h4>{this.state.cardTypeInput.value}</span>
					<span><h4>Card Number: </h4>{this.state.cardNumberInput.value}</span>
					<span><h4>Expiration Date: </h4>{this.state.cardExpInput.value}</span>
					<Button type="green" name="submit" onClick={this.handleClick}>Submit</Button>
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