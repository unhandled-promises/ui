import React from 'react'
import Styled from 'styled-components';
import * as moment from "moment";
import AliceCarousel from 'react-alice-carousel';
import "react-alice-carousel/lib/alice-carousel.css";
import EmptyCard from './EmptyCard';

export default ({ devices }) => {
  if(devices.errorType || !devices || !devices.type) {
    return <EmptyCard heading={"Devices"} />
  }
  return (
    <Card>
      <CardHeading>
        <h3>Devices</h3>
      </CardHeading>
      <CardBody>
      <AliceCarousel items={devices} mouseDragEnabled autoPlay={true} autoPlayInterval={3000} dotsDisabled={true} buttonsDisabled={true}>
        {devices.map((device, i) => {
          return (
            <Group key={i}>
              <h4>{device.deviceVersion}</h4>
              <p>Battery: {device.battery}</p>
              <p>Last Sync Time: {moment(device.lastSyncTime).format('YYYY-MM-DD')}</p>
              <p>Type: {device.type}</p>
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
grid-template-rows: auto 1fr;
  border-radius: 25px;
  box-shadow: #696773 -10px 5px 10px 10px;
  min-height: 200px;
  margin: 50px 20px 20px 20px;
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
const Group = Styled.div`
  position: relative;
  display: block;
  padding: 10px 15px;
  background-color: #fff;
  height: 90%
}
`

