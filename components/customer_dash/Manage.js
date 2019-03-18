import React from 'react';
import Styled from 'styled-components';
import Button from '../Button';
import Card from '../Card';

 const Manage = ({employees,onClick}) => {

  const renderEmployees = (employeesArray) => {
    return employeesArray.map((employee,index)=>{
      return (
        <EmployeeCard key={index}>
          <Card 
            key={index}
            avatar={employee.avatar}
            title={`${employee.first_name} ${employee.last_name}`}
            body={
            <div>
              <p>{`Role: ${employee.role}`}</p>
              <p>{`Email: ${employee.email}`}</p>
              <p>{`Phone: ${employee.phone}`}</p>
              <Button
                size="small"
                id={index}
                type="orange"
                onClick={onClick}
                name="Edit">
                Edit
              </Button>
            </div>
            }  />
        </EmployeeCard>
      )
    })
  }

    return(
      <ManageDiv>
        <h1>Manage Employees</h1>
          {renderEmployees(employees)}
      </ManageDiv>
    )
}

export default Manage;

const ManageDiv= Styled.div`
display: grid;
grid-template-columns: repeat(auto-fit,minmax(300px,1fr));
justify-items: center;
grid-gap: 10px;

h1{
  grid-column: 1/-1;
  justify-self: center;
}
`

const EmployeeCard = Styled.div`
  background-color: #eee;
  border-radius: 30px;
  div>button{
    text-align: center;
  }
`;