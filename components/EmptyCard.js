import React from 'react'
import Styled from 'styled-components';

export default ({ heading }) => {
  return (
    <Card>
      <CardHeading>
        <h3>{heading}</h3>
      </CardHeading>
      <CardBody>
        <img src={"../static/images/unavailable.png"} alt=""/>
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