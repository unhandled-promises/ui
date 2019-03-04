import React, { Component } from 'react';
import Styled from 'styled-components'
import FullNav from '../FullNav';
import Link from 'next/link';
import Modal from '../Modal';

 const Manage = ({employees}) => {

  const renderEmployees = (employeesArray) => {
    return employeesArray.map(employee=>{
      return (
        <li>{`${employee.first_name} ${employee.last_name}`}</li>
      )
    })
  }

    return(
      <React.Fragment>
        <ManageDiv>
          <h1>Manage Employees</h1>
          <EmployeeListDiv>
            {renderEmployees(employees)}
          </EmployeeListDiv>
        </ManageDiv>
      </React.Fragment>
      
    )
}

export default Manage;

const NavLink = Styled.a`
  margin:.5rem;
`

const ManageDiv= Styled.div`
  display: grid;
  grid-template-columns: 65vw 1fr;

  >h1{
    grid-column:1/-1;
    justify-self: center;
  }
`

const EmployeeListDiv = Styled.div`

`;