import React from 'react';
import Styled from 'styled-components';

export default ({title,body,className,status}) => {
	return (
		<Card status={status} className ={className}>
			<CardHeading>
        <h3>{title}</h3>
      </CardHeading>
      <CardBody>
        {body}
      </CardBody>
		</Card>
	)
};

const Card = Styled.div`
  display: grid;
  grid-template-rows: auto 1fr;
  border: ${({status})=>{
    console.log(status);
    switch (status){
      case 'Normal':
        return '5px solid #0070ff'
      case 'Warning':
        return '5px solid #ffa274'
      case 'Danger':
        return '5px solid #ff8074'
      default:
        return 'none'
    }
  }};
  justify-items: center;
  box-shadow: #696773 -10px 5px 10px;
  min-height: 200px;
`

const CardHeading = Styled.div`
  margin: 0;
  h3{
    margin:.5rem;
  }
`

const CardBody = Styled.div`
  margin:0;
  text-align: center;
  margin: 10px;
`