import React from 'react'
import Styled from 'styled-components';
import * as moment from "moment";

export default ({ employeeInfo }) => {
  return (
    <Card>
      <CardHeading>
        <h3>{employeeInfo.first_name} {employeeInfo.last_name}</h3>
      </CardHeading>
      <CardBody>
        <Group>
          <img src={employeeInfo.avatar} style={{ height: 125, borderRadius: "50%" }} alt="" />
          <p>Date of Birth: {moment(employeeInfo.dob).format('YYYY-MM-DD')}</p>
          <p>Email: {employeeInfo.email}</p>
        </Group>
      </CardBody>
    </Card>
  )
};

const Card = Styled.div`
  display: grid;
  border-radius: 25px;
  box-shadow: #696773 -10px 5px 10px 10px;
  max-height: 250px;
  margin: 70px 20px 20px 20px;
  overflow: hidden
`
const CardHeading = Styled.div`
  margin: 0;
  text-align: center;
  background-color: #f5f5f5;
  border-bottom: 1px solid #ddd;
  h3{
    margin: .5rem;
  }
`
const CardBody = Styled.div`
  margin: 5px;
  overflow: hidden;
  text-align: center;
`
const Group = Styled.div`
  position: relative;
  display: block;
  padding: 10px 15px;
  background-color: #fff;
  p{
    margin: 10px
  }
}
`