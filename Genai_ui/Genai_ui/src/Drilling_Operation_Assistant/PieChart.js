import React from 'react';
import '../Summary.css';

import { PieChart, Pie, CartesianGrid, Tooltip, Cell } from 'recharts';

  const Piechart = ({ chartData }) => {

    const COLORS =  ["rgba(76, 221, 239, 1)", "rgba(135, 116, 255, 1)", "rgba(22, 91, 170, 1)", "rgba(161, 85, 185, 1)", "rgba(46, 156, 220, 1)", "rgba(116, 123, 169, 0.3)", "white"];

  return (
    <PieChart width={550} height={270} margin={{ top: 20, right: 10, left: 1, bottom: 20 }}>
      <CartesianGrid stroke="rgba(65, 67, 82, 1)" />
      <Pie
        dataKey="value"
        data={chartData}
        cx="50%"
        cy="50%"
        outerRadius={80}
        fill="#8884d8"
        label
      >
        {chartData.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
        ))}
      </Pie>
      <Tooltip
        contentStyle={{
          backgroundColor: '#f5f5f5',
          fontSize: '10px',
          borderRadius: 10,
          padding: '10px',
          color: 'black'
        }}
      />
    </PieChart>
  );
};

export default Piechart;
