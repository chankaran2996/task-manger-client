import React from 'react'

import { 
    PieChart, 
    Pie, 
    Cell, 
    ResponsiveContainer,
    Legend,
    Tooltip,
} from 'recharts';

const CustomPieChart = ({pieChartData, colors}) => {
    // console.log(pieChartData)
    if (!pieChartData || pieChartData.length === 0) {
        return <p>No data available</p>;
      }
  return (
    <ResponsiveContainer width="100%" height={325}>
        <PieChart>
            <Pie 
                data={pieChartData} 
                dataKey="value"
                nameKey="name"
                cx="50%" 
                cy="50%"  
                outerRadius={130} 
                innerRadius={100}
                labelLine={false} 
                label={({ percent }) => `${(percent * 100).toFixed(0)}%`}
            >
                {
                    pieChartData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                    ))
                }
            </Pie>
            {/* <Tooltip/>
             */}
             <Tooltip 
                formatter={(value, name) => [`${value}`, `${name}`]}
                contentStyle={{ backgroundColor: "#f5f5f5", borderRadius: "10px" }}
            />
            <Legend/>
        </PieChart>
    </ResponsiveContainer>
  )
}

export default CustomPieChart
