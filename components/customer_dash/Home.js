import React from 'react';
import Styled from 'styled-components';
import Card from '../Card'
import Modal from '../Modal';

 const Home = ({employees}) => {

  const getStatus = (bpm) => {
    console.log(bpm);
    if(bpm === "-"){
      return "No Signal"
    }else{
      if(bpm > 160){
        return "Danger"
      } else if(bpm > 120 && bpm < 159){
        return "Warning"
      } else if(bpm > 41 && bpm < 80){
        return "Normal"
      }else if(bpm < 40){
        return "Danger"
      }
    }
  }

  const renderEmployees = (employeesArray) => {
    return employeesArray.map((employee,index)=>{
      console.log(`printing employee:`);
      console.log(employee);
      let restingHeartRate;
      let steps;
      if(employee.hasOwnProperty("fitbit")){
        if(employee.fitbit.hasOwnProperty("summary")){
          if(employee.fitbit.summary.hasOwnProperty("restingHeartRate")){
            restingHeartRate = employee.fitbit.summary.restingHeartRate;
          }
          else{
            restingHeartRate = "-";
          }
          if(employee.fitbit.summary.hasOwnProperty("steps")){
            steps = employee.fitbit.summary.steps;
          }else{
            steps = "-";
          }
        }else{
          restingHeartRate = "-";
        }
      }else{
        restingHeartRate = "-";
      }

      return (
        <EmployeeCard key={index}>
          <Card 
            status={getStatus(restingHeartRate)}
            key={index}
            avatar={employee.avatar}
            title={`${employee.first_name} ${employee.last_name}`}
            body={
            <div>
              <p><i class="fas fa-heartbeat"></i>{restingHeartRate}</p>
              <p><i class="fas fa-shoe-prints"></i>{steps}</p>
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
  display: grid;
  grid-template-columns: repeat(auto-fill,minmax(300px,1fr));
  grid-template-rows: auto 1fr;
  justify-items: center;
  align-items: start;
  min-height: 100%;

  h1{
    grid-column: 1/-1;
    justify-self: center;
  }
`

const EmployeeCard = Styled.div`
  min-width: 75%;
  background-color: #eee;
  border-radius: 30px;
`;