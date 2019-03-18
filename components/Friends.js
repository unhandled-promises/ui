import React from 'react'
import AliceCarousel from 'react-alice-carousel';
import "react-alice-carousel/lib/alice-carousel.css";
import Styled from 'styled-components';
import EmptyCard from './EmptyCard';

export default ({ friends }) => {
  if(!friends || friends === undefined) {
    return <EmptyCard heading={"Friends"} />
  }
  return (
    <Card>
      <CardHeading>
        <h3>Friends</h3>
      </CardHeading>
      <CardBody>
        <AliceCarousel items={friends} mouseDragEnabled autoPlay={true} autoPlayInterval={3000} dotsDisabled={true} buttonsDisabled={true}>
          {friends.map((friend, i) => {
            return (
              <Group key={i}>
                <span>{friend.average.steps}</span>
                <img src={friend.user.avatar} style={{ borderRadius: "50%" }} alt="" />
                <h4>{friend.user.displayName}</h4>
              </Group>
            )
          })}
        </AliceCarousel>
      </CardBody>
    </Card>
  )
}

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
  span{
    display: inline-block;
    min-width: 10px;
    padding: 3px 7px;
    font-size: 12px;
    font-weight: bold;
    line-height: 1;
    color: #fff;
    text-align: center;
    white-space: nowrap;
    vertical-align: middle;
    background-color: blue;
    border-radius: 10px;
    float: right;
  }
}
`