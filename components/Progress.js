import React, { Component } from 'react';
import Styled from 'styled-components';

export default ({step}) => {

  return (
    <ProgressBarDiv step={step}>
      <StepCircleDiv step={step}>
        <Label1 step={step}>{(step>0)?<i class="fas fa-check"></i>:'1'}</Label1>
        <Title>Verify Code</Title>
      </StepCircleDiv>
      <BarSpan1 step={step} />
      <StepCircleDiv step={step}>
        <Label2 step={step}>{(step>1)?<i class="fas fa-check"></i>:'2'}</Label2>
        <Title>Company Info</Title>
      </StepCircleDiv>
      <BarSpan2 step={step} />
      <StepCircleDiv step={step}>
        <Label3 step={step}>{(step>2)?<i class="fas fa-check"></i>:'3'}</Label3>
        <Title>Package Selection</Title>
      </StepCircleDiv>
      <BarSpan3 step={step} />
      <StepCircleDiv step={step}>
        <Label4 step={step}>{(step>3)?<i class="fas fa-check"></i>:'4'}</Label4>
        <Title>Payment Info</Title>
      </StepCircleDiv>
      <BarSpan4 step={step} />
      <StepCircleDiv step={step}>
        <Label5 step={step}>{(step>4)?<i class="fas fa-check"></i>:'5'}</Label5>
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
  display:grid;
  grid-template-columns: repeat(9,auto);
  align-items: center;
`

const StepCircleDiv = Styled.div`
  display:inline-block;
  background:#fff;
  width:40px;
  height:40px;
  border-radius: 40px;
  border: 2px solid #1f2d3f;
  box-shadow: inset 0 0 2px #fff;

  ${StepCircleDiv}:nth-of-type(${({step})=>step+1}){
    border: 2px solid green;
  }
`

const Label1 = Styled.span`
  line-height:40px;
  background-color: ${({step})=>(step>0)?'green':'#fff'};
  border-radius:50%;
  padding: 9px 9px;
`

const Label2 = Styled.span`
  line-height:40px;
  background-color: ${({step})=>(step>1)?'green':'#fff'};
  border-radius:50%;
  padding: 9px 9px;
`

const Label3 = Styled.span`
  line-height:40px;
  background-color: ${({step})=>(step>2)?'green':'#fff'};
  border-radius:50%;
  padding: 9px 9px;
`

const Label4 = Styled.span`
  line-height:40px;
  background-color: ${({step})=>(step>3)?'green':'#fff'};
  border-radius:50%;
  padding: 9px 9px;
`

const Label5 = Styled.span`
  line-height:40px;
  background-color: ${({step})=>(step>4)?'green':'#fff'};
  border-radius:50%;
  padding: 9px 9px;
`

const Title = Styled.span`
  font-size:13px;
  display: block;
  margin-top: 5px;
  text-align: center;
`

const BarSpan1 = Styled.span`
  position: relative;
  width: 80px;
  height: 5px;
  border-left: none;
  border-right: none;
  border-top: 2px solid black;
  border-bottom: 2px solid black;
  margin: 0;
  background-color: ${({step})=>(step>0)?'green':'#fff'};
`

const BarSpan2 = Styled.span`
  position: relative;
  width: 80px;
  height: 5px;
  border-left: none;
  border-right: none;
  border-top: 2px solid black;
  border-bottom: 2px solid black;
  margin: 0;
  background-color: ${({step})=>(step>1)?'green':'#fff'};
`

const BarSpan3 = Styled.span`
  position: relative;
  width: 80px;
  height: 5px;
  border-left: none;
  border-right: none;
  border-top: 2px solid black;
  border-bottom: 2px solid black;
  margin: 0;
  background-color: ${({step})=>(step>2)?'green':'#fff'};
`

const BarSpan4 = Styled.span`
  position: relative;
  width: 80px;
  height: 5px;
  border-left: none;
  border-right: none;
  border-top: 2px solid black;
  border-bottom: 2px solid black;
  margin: 0;
  background-color: ${({step})=>(step>3)?'green':'#fff'};
`
