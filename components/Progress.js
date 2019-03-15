import React, { Component } from 'react';
import Styled from 'styled-components';


export default ({step}) => {

  return (
    <ProgressBarDiv>
      <StepCircleDiv>
        <Label>1</Label>
        <Title>Company Info</Title>
      </StepCircleDiv>
      <BarSpan />
      <StepCircleDiv>
        <Label>2</Label>
        <Title>Package Selection</Title>
      </StepCircleDiv>
      <BarSpan />
      <StepCircleDiv>
        <Label>3</Label>
        <Title>Payment Info</Title>
      </StepCircleDiv>
      <BarSpan />
      <StepCircleDiv>
        <Label>4</Label>
        <Title>Confirm</Title>
      </StepCircleDiv>
    </ProgressBarDiv>
  )
}

const ProgressBarDiv = Styled.div`
  width = 100%;
  margin: 2rem auto;
  padding-bottom: 3rem;
  text-align: center;
  display: grid;
  grid-template-columns: repeat(7,auto);
  align-items: center;
`

const StepCircleDiv = Styled.div`
  display:inline-block;
  background:#fff;
  width:40px;
  height:40px;
  border-radius: 40px;
  border: 2px solid #1f2d3f;
`

const Label = Styled.span`
  line-height:40px;
`

const Title = Styled.span`
  font-size:13px;
  display: block;
  margin-top: 5px;
  text-align: center;
`

const BarSpan = Styled.span`
  position: relative;
  width: 80px;
  height: 5px;
  border-left: none;
  border-right: none;
  border-top: 2px solid black;
  border-bottom: 2px solid black;
  margin: 0;
`