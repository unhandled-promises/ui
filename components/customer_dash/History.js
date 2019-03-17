import React from 'react';
import Styled from 'styled-components';

const History = ({employees}) => {
  return(
    <HistroyDiv>
      <h1>Employee Trending</h1>
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