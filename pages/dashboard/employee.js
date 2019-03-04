import React, { Component } from 'react';
import Styled from 'styled-components';
import Button from '../../components/Button';
import Footer from '../../components/Footer';
import Card from '../../components/Card';
import Nav from '../../components/Nav';
import Input from '../../components/Input';
import Modal from '../../components/Modal';
import Selection from '../../components/Selection';

class Employee extends Component {
	state={

	}


render() {
	return(
		<Body>
			<Nav />
				<Card title="Heart Rate"/>
				<Card title="Coordinates"/>
				<Card title="Altitude"/>
				<Button type="green">Trends</Button>
				<Button type="red">Stop Transmission</Button>
			<Footer />
		</Body>
	)
}
}

export default Employee;

const Body = Styled.div `
	display: grid;
	grid-template-rows: 100px auto 1fr auto;
`