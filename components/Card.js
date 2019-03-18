import React from 'react';
import Styled from 'styled-components';

export default ({title,body,className,status,avatar}) => {
	return (
		<Card status={status} className ={className}>
      <EmployeeAvatar src={avatar} />
      <h3>{title}</h3>
      <CardBody>
        {body}
      </CardBody>
		</Card>
	)
};

const Card = Styled.div`
  display: grid;
  grid-template-columns: auto 1fr;
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
  min-height: 200px;
  padding: 1rem;

  h3{
    margin:.5rem;
  }
`

const EmployeeAvatar = Styled.img`
  border-radius: 50%;
  height: 50px
`

const CardBody = Styled.div`
  text-align: center;
  margin: 10px;
  grid-column:1/-1;
`