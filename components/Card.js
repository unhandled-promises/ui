import React from 'react';
import Styled from 'styled-components';

export default ({title,body}) => {
	return (
		<Card>
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
  background-color: #EFEFEF;
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
  align-self: center;
  display:grid;
  justify-items: center;
  margin: 10px;
`