import React from 'react'
import Styled from 'styled-components';
import AliceCarousel from 'react-alice-carousel';
import "react-alice-carousel/lib/alice-carousel.css";
import EmptyCard from './EmptyCard';

export default ({ badges }) => {
  if(!badges) {
    return <EmptyCard heading={"Badges"} />
  }
  return (
    <Card>
      <CardHeading>
        <h3>Badges</h3>
      </CardHeading>
      <CardBody>
      <AliceCarousel items={badges} mouseDragEnabled autoPlay={true} autoPlayInterval={3000} dotsDisabled={true} buttonsDisabled={true}>
          {badges.map((badge, i) => {
            return (
              <Group key={i}>
                <h4>{badge.shortName}</h4>
                <img src={badge.image100px} alt="" />
                <p>{badge.description}</p>
                <p>Earned {badge.timesAchieved} times</p>
                <p>Last on {badge.dateTime}</p>
              </Group>
            )
          })}
        </AliceCarousel>
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
  // height: 90%
}
`