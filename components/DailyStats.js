import React from 'react'
import Styled from 'styled-components';
import EmptyCard from './EmptyCard';

export default ({ todayStats }) => {
  if(!todayStats.summary || todayStats.summary === undefined) {
    return <EmptyCard heading={"Today's Stats"} />
  }
  return (
    <Card>
      <CardHeading>
        <h3>Today's Stats</h3>
      </CardHeading>
      <CardBody>
        <p>Heart Rate: {todayStats.summary.restingHeartRate} <IconDetails colorChoice={"red"} className="fas fa-heartbeat"></IconDetails></p>
        <p>Steps: {todayStats.summary.steps} </p>
        <p>Calories Burned: {todayStats.summary.caloriesOut} </p>
      </CardBody>
    </Card>
  )
};

const Card = Styled.div`
  display: grid;
  grid-template-rows: auto 1fr;
  border-radius: 25px;
  box-shadow: #696773 -10px 5px 10px 10px;
  min-height: 200px;
  margin: 50px 20px 20px 20px;
  style="float: left; 
  width: 50%";
  overflow: hidden
`
const CardHeading = Styled.div`
  margin: 0;
  background-color: #f5f5f5;
  border-bottom: 1px solid #ddd;
  h3{
    margin: .5rem;
  }
`
const CardBody = Styled.div`
  margin: 5px;
  align-self: center;
  overflow: hidden;
`
const IconBlock = Styled.i`
    color: #FFFFFF;
`
const IconDetails = Styled.i`
    color: ${props => props.colorChoice};
`
