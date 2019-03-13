import React from 'react'
import Styled from 'styled-components';

export default ({ employeeInfo }) => {
  return (

    <Card>
      <CardHeading>
        <h3>{employeeInfo.first_name} {employeeInfo.last_name}</h3>
      </CardHeading>
      <CardBody>
        <img
          src={employeeInfo.avatar}
          style={{ height: 50, left: 10, borderRadius: "50%" }}
          alt=""
        />
        <p>Date of Birth: {employeeInfo.dob}</p>
        <p>Email: {employeeInfo.email}</p>
      </CardBody>
    </Card>
  )
};

const Card = Styled.div`
  display: grid;
  grid-template-rows: auto 1fr;
  background-color: #EFEFEF;
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
`
