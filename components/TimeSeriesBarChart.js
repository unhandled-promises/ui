import React from 'react'
import Styled from 'styled-components';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts'

const TimeSeriesBarChart = ({data, title, yMax}) =>
  <div className="panel panel-default">
    <Title>{title}</Title>
    <div className="panel-body">
      <BarChart width={475} height={300} data={data}
                margin={{top: 20, right: 10, left: 0, bottom: 20}}>
        <XAxis dataKey="dateTime"/>
        <YAxis domain={[0, yMax]}/>
        <CartesianGrid strokeDasharray="3 3"/>
        <Tooltip/>
        <Bar dataKey="value" fill="#8884d8" />
      </BarChart>
    </div>
  </div>

export default TimeSeriesBarChart

const Title = Styled.div`
  margin-top: 50px;
  font-weight: bold;
`