import React from 'react'
import Styled from 'styled-components';
import * as moment from "moment";

export default ({ devices }) => {
  return (
    <Card>
      <CardHeading>
        <h3>Devices</h3>
      </CardHeading>
      <CardBody>
        {devices.map((device, i) => {
          return (
            <Group>
              <h4>{device.deviceVersion}</h4>
              <p>Battery: {device.battery}</p>
              <p>Last Sync Time: {moment(device.lastSyncTime).format('YYYY-MM-DD')}</p>
              <p>Type: {device.type}</p>
            </Group>
          )
        })}
      </CardBody>
    </Card>
  )
}

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

