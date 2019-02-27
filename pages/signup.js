import React, { Component } from 'react';
import Button from '../components/Button';
import Styled from 'styled-components';
import Nav from '../components/Nav';

class SignUp extends Component {
	state = {
		companyNameInput:'',
		addressInput:'',
		address2Input:'',
		cityInput:'',
		stateInput:'',
		countryInput:'',
		zipInput:'',
		ownerNameInput:'',
	}
	render() {
		return (
			<React.Fragment>
			<Nav/>
			<h3>Register Your Company</h3>
			<SignUpDiv>
				<form>
					<input placeholder="Company Name"></input>
					<input placeholder="Address"></input>
					<input placeholder="Address 2"></input>
					<input placeholder="City"></input>
					<input placeholder="State"></input>
					<input placeholder="Country"></input>
					<input placeholder="Zip Code"></input>
					<input placeholder="Owner Name"></input>
					<Button type="green">Next</Button>
				</form>
			</SignUpDiv>
			</React.Fragment>
		)
	}
}

export default SignUp;

const SignUpDiv = Styled.div `
	display: grid;
	grid-template-columns: repeat(3, 1fr);
	

`