import React from 'react'
import Styled from 'styled-components';

export default ({ heading }) => {
  return (

    <Card>
      <CardHeading>
        <h3>{heading}</h3>
      </CardHeading>
      <CardBody>
        <img
          src={"../static/images/unavailable.png"}
          style={{ height: "225px" }}
          alt=""
        />
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