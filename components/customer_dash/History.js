import React from 'react';
import Styled from 'styled-components';
import TimeSeriesLineChart from '../TimeSeriesLineChart';

const History = ({employees}) => {
  return(
    <HistroyDiv>
      <h1>Employee Trending</h1>
      <TimeSeriesLineChart data={employees} title="Step History" />
    </HistroyDiv>
  )
}

export default History;

const HistroyDiv = Styled.div`
  display: grid;

  h1{
    justify-self: center;
  }
`