import React from 'react'
import Styled from 'styled-components';
import * as moment from "moment";
import EmptyCard from './EmptyCard';

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
  padding: 10px 15px;
  background-color: #fff;
}
`