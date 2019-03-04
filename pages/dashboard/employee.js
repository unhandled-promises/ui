import React, { Component } from 'react';
import Styled from 'styled-components';
import Button from '../../components/Button';
import Footer from '../../components/Footer';
import Card from '../../components/Card';
import FullNav from '../../components/FullNav';
import Input from '../../components/Input';
import Modal from '../../components/Modal';
import Selection from '../../components/Selection';
import { CUSTOMERS_API, EMPLOYEES_API } from "../../static/api-config";
import Link from 'next/link';

class Employee extends Component {
	state={
		userName: "Louis Tully"
	}


render() {
	return(
		<React.Fragment>
			<FullNav>
				<Link href="/dashboard/employee"><NavLink>Home</NavLink></Link>
				<Link href="/dashboard/employee/settings"><NavLink>Settings</NavLink></Link>
			</FullNav>
				<WelcomeDiv><h1>Welcome {this.state.userName}!</h1></WelcomeDiv>
				<CardWrapper>
				<Card title="Heart Rate"/>
				<Card title="Coordinates"/>
				<Card title="Altitude"/>
				</CardWrapper>
				<ButtonDiv>
				<Button type="green">Trends</Button>
				<Button type="red">Stop Transmission</Button>
				</ButtonDiv>
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