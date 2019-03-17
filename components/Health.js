import React from 'react'
import Styled from 'styled-components';
import EmptyCard from './EmptyCard';

export default ({ todayStats, heading, image, value, description }) => {
  // if (!todayStats.summary || todayStats.summary === undefined) {
  //   return <EmptyCard heading={"Today's Stats"} />
  // }
  return (
    <Card>
      <CardHeading>
        <h3>{heading}</h3>
      </CardHeading>
      <CardBody>
        <img src={image} style={{ height: 150 }} alt="" />
        <h4>{value} {description}</h4>
      </CardBody>
    </Card>
  )
};

const Card = Styled.div`
  display: grid;
  border-radius: 25px;
  box-shadow: #696773 -10px 5px 10px 10px;
  min-height: 200px;
  margin: 50px 20px 20px 20px;
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
  margin: auto;
  text-align: center;
  overflow: hidden;
  img{
    padding-top: 20px
  }
`
const IconBlock = Styled.i`
    color: #FFFFFF;
`
const IconDetails = Styled.i`
    color: ${props => props.colorChoice};
`
