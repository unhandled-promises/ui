import React, { Component } from 'react';
import Styled from 'styled-components'
import Card from '../Card'
import Modal from '../Modal';

 const Home = ({employees}) => {

  const getStatus = (bpm) => {
    if(bpm > 160){
      return "Danger"
    } else if(bpm > 120){
      return "Warning"
    } else if(bpm > 60){
      return "Normal"
    }else if(bpm < 40){
      return "Danger"
    }
  }

  const renderEmployees = (employeesArray) => {
    return employeesArray.map((employee,index)=>{
      console.log(`printing employee:`);
      console.log(employee);
      const { restingHeartRate } = employee.heartRate.summary;
      return (
        <EmployeeCard key={index}>
          <Card 
            status={getStatus(restingHeartRate)}
            key={index}
            title={`${employee.first_name} ${employee.last_name}`}
            body={
            <div>
              <EmployeeAvatar src={employee.avatar}/>
              <p><i class="fas fa-heartbeat"></i>{` ${employee.heartRate.summary.restingHeartRate}`}</p>
              <p><i class="fas fa-shoe-prints"></i>{` ${employee.heartRate.summary.steps}`}</p>
              <p>{`Status: ${getStatus(restingHeartRate)}`}</p>
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
  grid-template-columns: repeat(auto-fit,minmax(300px,1fr));
  justify-items: center;

  h1{
    grid-column: 1/-1;
    justify-self: center;
  }
`

const EmployeeCard = Styled.div`
  min-width: 75%;
`;

const EmployeeAvatar = Styled.img`
  border-radius: 50%;
`