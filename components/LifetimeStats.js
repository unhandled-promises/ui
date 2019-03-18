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
  border-radius: 25px;
  box-shadow: #696773 -10px 5px 10px 10px;
  margin: 70px 20px 20px 20px;
  overflow: hidden
`
const CardHeading = Styled.div`
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
}
`