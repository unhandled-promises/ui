import React from 'react';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Legend, Label   } from 'recharts';

export default ({data}) => {

  const names = data.map(employee => {
    return employee.first_name
  });

  const generateColor = () => {
    const numbers = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += numbers[Math.floor(Math.random() * 16)];
    }
    return color;  }

  return(
    <LineChart width={1000} height={500} data={data}>
      <Legend />
      {data.map(employee=>{
        return (
          <Line 
            type="monotone" 
            dataKey="value" 
            name={`${employee.first_name} ${employee.last_name}`}
            data={employee.history["activities-steps"]} 
            stroke={generateColor()}
            margin={{ top: 5, right: 30, left: 20, bottom: 20 }} />    
        )
      })}
      <CartesianGrid  stroke="#ccc" strokeDasharray="3 3" />
      <XAxis allowDuplicatedCategory={false} dataKey="dateTime">
        <Label offset={0} position="insideBottom">Date</Label>
      </XAxis>
      <YAxis>
        <Label offset={0} angle={-90} position="insideLeft">Steps</Label>
      </YAxis>
    </LineChart>
  )
}