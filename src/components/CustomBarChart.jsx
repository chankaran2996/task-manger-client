import React from 'react'

import {
    BarChart, 
    Bar, 
    XAxis, 
    YAxis, 
    CartesianGrid, 
    Tooltip, 
    ResponsiveContainer,
    Legend,
    Cell,
} from 'recharts';

const CustomBarChart = ({barChartData}) => {

    // console.log(barChartData)

  const getBarColor = (entry) => {
    if (entry.name === 'High') {
      return '#FF1F57'; 
    } else if (entry.name === 'Medium') {
      return '#FE9900'; 
    } else if (entry.name === 'Low') {
      return '#00BC7D'; 
    }
    return '#00BC7D'; 
  }
  return (
    <div className=''>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart 
        data={barChartData} 
        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip 
            formatter={(value, name) => [`${value}`, `${name}`]}
            contentStyle={{ backgroundColor: "#f5f5f5", borderRadius: "10px" }}
          />
          <Legend />
          <Bar dataKey="value" fill="#8884d8">
            {
              barChartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={getBarColor(entry)} />
              ))
            }
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}

export default CustomBarChart
