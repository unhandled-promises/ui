import React, { Component } from 'react';
import Styled from 'styled-components';
import Button from '../../../components/Button';
import Footer from '../../../components/Footer';
import Card from '../../../components/Card';
import FullNav from '../../../components/FullNav';
import { CUSTOMERS_API, EMPLOYEES_API } from "../../../static/api-config";
import Link from 'next/link';

export default class extends Component {
	state = {
		jwt: ''
	}

	render () {
		return(
			<React.Fragment>
				<FullNav>
					<Link href="/dashboard/employee"><NavLink>Home</NavLink></Link>
					<Link href="/dashboard/employee/settings"><NavLink>Settings</NavLink></Link>
				</FullNav>
				<SettingsHead><h1>Settings</h1></SettingsHead>
				<Button type="green">Account Info</Button>
				<Button type="green">Device Info</Button>
				<Button type="blue">Back</Button>
				<Footer/>
			</React.Fragment>
		)
	}
}

const NavLink = Styled.a `
	margin:.5rem;
	color: white;
	text-decoration: none;
	`
const SettingsHead = Styled.div `
	text-align: center;
`