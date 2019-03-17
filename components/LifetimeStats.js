import React from 'react'
import Styled from 'styled-components';
import EmptyCard from './EmptyCard';

export default ({ lifetimeStats }) => {
  if (!lifetimeStats.lifetime || !lifetimeStats.best) {
    return <EmptyCard heading={"Lifetime Stats"} />
  }
  return (
    <Card>
      <CardHeading>
        <h3>Lifetime Stats</h3>
      </CardHeading>
      <CardBody>
        <Group>
          <h4>Distance (kilometers)</h4>
          <p>Total: {lifetimeStats.lifetime.total.distance}</p>
          <p>Best: {lifetimeStats.best.total.distance.value} on {lifetimeStats.best.total.distance.date}</p>
          <h4>Steps</h4>
          <p>Total: {lifetimeStats.lifetime.total.steps}</p>
          <p>Best: {lifetimeStats.best.total.steps.value} on {lifetimeStats.best.total.steps.date}</p>
        </Group>
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
  margin: 70px 20px 20px 20px;
  style="float: left; 
  width: 70%";
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
const Group = Styled.div`
  position: relative;
  display: block;
  padding: 10px 15px;
  background-color: #fff;
  height: 90%
}
`