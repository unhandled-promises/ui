import React, { Component } from 'react';
import Styled from 'styled-components';
import Button from '../Button';
import Card from '../Card';
import Input from '../Input';

 const Manage = ({employees}) => {

  const renderEmployees = (employeesArray) => {
    return employeesArray.map((employee,index)=>{
      return (
        <EmployeeCard>
          <Card 
            key={index}
            title={`${employee.first_name} ${employee.last_name}`}
            body={
            <div>
              <p>{`Role: ${employee.role}`}</p>
              <p>{`Email: ${employee.email}`}</p>
              <p>{`Phone: ${employee.phone}`}</p>
            </div>
            }  />
        </EmployeeCard>
      )
    })
  }

    return(
      <ManageDiv>
        <h1>Manage Employees</h1>
        <EmployeeListDiv>
          {renderEmployees(employees)}
        </EmployeeListDiv>
      </ManageDiv>
    )
}

export default Manage;

const NavLink = Styled.a`
  margin:.5rem;
`

const AddForm = Styled.div`

`;

const ManageDiv= Styled.div`
  display: grid;
  grid-template-columns: 1fr;

  >h1{
    justify-self: center;
  }
`

const EmployeeListDiv = Styled.div`

`;

const EmployeeCard = Styled.div`

`;