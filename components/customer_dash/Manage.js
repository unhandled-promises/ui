import React, { Component } from 'react';
import Styled from 'styled-components';
import Button from '../Button';
import Card from '../Card';

 const Manage = ({employees,onClick}) => {

  const renderEmployees = (employeesArray) => {
    return employeesArray.map((employee,index)=>{
      return (
        <EmployeeCard key={index}>
          <Card 
            key={index}
            title={`${employee.first_name} ${employee.last_name}`}
            body={
            <div>
              <p>{`Role: ${employee.role}`}</p>
              <p>{`Email: ${employee.email}`}</p>
              <p>{`Phone: ${employee.phone}`}</p>
              <Button
                size="small"
                id={index}
                type="orange"
                onClick={onClick}
                name="Edit">
                Edit
              </Button>
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

const ManageDiv= Styled.div`
margin: 1rem;
display: grid;
grid-template-columns: repeat(3,1fr);
justify-items: center;

h1{
  grid-column: 1/-1;
  justify-self: center;
}
`

const EmployeeListDiv = Styled.div`

`;

const EmployeeCard = Styled.div`
  div>button{
    text-align: center;
  }
`;