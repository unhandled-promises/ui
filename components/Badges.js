import React from 'react'
import Styled from 'styled-components';

export default ({ badges }) => {
  return (
    <Card>
      <CardHeading>
        <h3>Badges</h3>
      </CardHeading>
      <CardBody>
        {badges.badges.map((badge, i) => {
          return (
            <Group>
              <h4>{badge.shortName}</h4>
              <p><img src={badge.image100px} alt="" /></p>
              <p>{badge.description}</p>
              <p>Earned {badge.timesAchieved} times</p>
              <p>Last on {badge.dateTime}</p>
            </Group>
          )
        })}
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
`
const Group = Styled.div`
  position: relative;
  display: block;
  padding: 10px 15px;
  margin-bottom: -1px;
  background-color: #fff;
  border: 1px solid #ddd;
}
`