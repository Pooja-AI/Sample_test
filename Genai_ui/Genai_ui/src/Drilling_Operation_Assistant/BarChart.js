import React from 'react';
import '../Summary.css';

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

  const Barchart = ({ barChartData, yAxis, xAxis }) => {

  const colors = {
    'Average Cost': 'rgba(135, 116, 255, 1)', 
  };

  return (
    <BarChart width={550} height={270} data={barChartData} margin={{ top: 20, right: 10, left: 1, bottom: 20 }}>
      <CartesianGrid stroke="rgba(65, 67, 82, 1)" />
      <XAxis
        dataKey="name"
        stroke="rgba(65, 67, 82, 1)"
        tick={{ fill: 'white', fontSize: 10, fontWeight: 100 }}
        label={{
          value: xAxis,
          fill: 'white',
          fontSize: 14,
          dy: 25,
          fontWeight: 400,
        }}
      />
      <YAxis
        dataKey="value"
        stroke="rgba(65, 67, 82, 1)"
        tick={{ fill: 'white', fontSize: 10, fontWeight: 100 }}
        label={{
          value: yAxis,
          fill: 'white',
          fontSize: 14,
          angle: -90,
          dy: 1,
          dx: -15,
          fontWeight: 400,
        }}
      />
      <Tooltip
        contentStyle={{
          backgroundColor: '#f5f5f5',
          fontSize: '10px',
          borderRadius: 10,
          padding: '10px',
          color: 'black'
        }}
      />
      
      <Bar dataKey="value" fill={colors['Average Cost']} barSize={50} />
    </BarChart>
  );
};

export default Barchart;
