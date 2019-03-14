import React from 'react'
import Styled from 'styled-components';

export default ({ lifetimeStats }) => {
  return (

    <Card>
      <CardHeading>
        <h3>Lifetime Stats</h3>
      </CardHeading>
      <CardBody>
        <h4>Distance (miles)</h4>
        <p>Total: {lifetimeStats.lifetime.total.distance}</p>
        <p>Best: {lifetimeStats.best.total.distance.value} on {lifetimeStats.best.total.distance.date}</p>
        <h4>Steps</h4>
        <p>Total: {lifetimeStats.lifetime.total.steps}</p>
        <p>Best: {lifetimeStats.best.total.steps.value} on {lifetimeStats.best.total.steps.date}</p>
      </CardBody>
    </Card>
  )
};

const Card = Styled.div`
  display: grid;
  grid-template-rows: auto 1fr;
  background: linear-gradient(to bottom right, #fed75e, #FFA600);
  border-radius: 25px;
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
  h4{
    padding: 0px 15px;
  }
  p{
    padding: 0px 15px;
  }
`
