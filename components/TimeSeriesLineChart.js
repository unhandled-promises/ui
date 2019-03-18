import React from 'react';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Legend   } from 'recharts';

export default ({data}) => {

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
          <Line type="monotone" dataKey="value" data={employee.history["activities-steps"]} stroke={generateColor()} />    
        )
      })}
      <CartesianGrid stroke="#ccc" strokeDasharray="3 3" />
      <XAxis tickCount="30" dataKey="dateTime" />
      <YAxis />
    </LineChart>
  )
}