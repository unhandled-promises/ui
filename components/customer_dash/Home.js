import React, { Component } from 'react';
import Styled from 'styled-components'
import Card from '../Card'
import Modal from '../Modal';

 const Home = ({employees}) => {

  const renderEmployees = (employeesArray) => {
    return employeesArray.map((employee,index)=>{
      return (
        <EmployeeCard key={index}>
          <Card 
            key={index}
            title={`${employee.first_name} ${employee.last_name}`}
            body={
            <div>
              <EmployeeAvatar src={employee.avatar}/>
              <p>{`Heart Rate: ${employee.role}`}</p>
              <p>{`Status: ${employee.role}`}</p>
            </div>
            }  />
        </EmployeeCard>
      )
    })
  }

  return(
    <HomeDiv>
       <h1>Employee Snapshot</h1>
       {renderEmployees(employees)}
     </HomeDiv>     
  )
}

export default Home;

const HomeDiv = Styled.div`
  margin: 1rem;
  display: grid;
  grid-template-columns: repeat(3,1fr);
  justify-items: center;

  h1{
    grid-column: 1/-1;
    justify-self: center;
  }
`

const EmployeeCard = Styled.div`
  min-width: 30%;
`;

const EmployeeAvatar = Styled.img`
  border-radius: 50%;
`