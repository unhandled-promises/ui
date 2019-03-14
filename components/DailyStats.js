import React from 'react'
import Styled from 'styled-components';

export default ({ todayStats }) => {
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
  background: linear-gradient(to bottom right, #fed75e, #FFA600);
  border-radius: 25px;
  justify-items: center;
  box-shadow: #696773 -10px 5px 10px;
  min-height: 200px;
  margin-bottom: 20px;
  margin-top: 10px;
`

const CardHeading = Styled.div`
  margin: 0;
  h3{
    margin:.5rem;
  }
`

const CardBody = Styled.div`
  margin:0;
  align-self: center;
  margin: 10px;
  background-color: #fff;
  width: 95%;
  h4{
    padding: 0px 15px;
  }
  p{
    padding: 0px 15px;
  }
`

const IconBlock = Styled.i`
    color: #FFFFFF;
`

const IconDetails = Styled.i`
    color: ${props => props.colorChoice};
`
