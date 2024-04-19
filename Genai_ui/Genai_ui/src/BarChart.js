import React from 'react';
import './Summary.css';

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

  const Barchart = ({ barChartData }) => {
  // Calculate the average cost for each year


  // const averageData = barChartData.map((yearData) => {
  //   const year = yearData.Year;
  //   const totalCost = Object.values(yearData)
  //     .slice(1) // Exclude the "Year" property
  //     .reduce((acc, cost) => acc + cost, 0);
  //   const averageCost = totalCost / (Object.keys(yearData).length - 1); // Subtract 1 to exclude "Year"
  //   return { Year: year, 'Average Cost': averageCost };
  // });

  // Define the colors and other chart properties
  const colors = {
    'Average Cost': 'rgba(135, 116, 255, 1)', // You can choose a color for the average cost bar
  };

  return (
    <BarChart width={550} height={270} data={barChartData} margin={{ top: 5, right: 10, left: 1, bottom: 20 }}>
      <CartesianGrid stroke="rgba(65, 67, 82, 1)" />
      <XAxis
        dataKey="Year"
        stroke="rgba(65, 67, 82, 1)"
        tick={{ fill: 'white', fontSize: 10, fontWeight: 100 }}
        label={{
          value: 'Year',
          fill: 'white',
          fontSize: 13,
          dy: 15,
          fontWeight: 200,
        }}
      />
      <YAxis
        stroke="rgba(65, 67, 82, 1)"
        tick={{ fill: 'white', fontSize: 10, fontWeight: 100 }}
        label={{
          value: 'TotalCost',
          fill: 'white',
          fontSize: 10,
          angle: -90,
          dy: 1,
          dx: -20,
          fontWeight: 100,
        }}
      />
      <Tooltip
        contentStyle={{
          backgroundColor: '#f5f5f5',
          fontSize: '10px',
          borderRadius: 10,
          padding: '10px',
        }}
      />
      
      <Bar dataKey="TotalCost" fill={colors['Average Cost']} barSize={50} />
    </BarChart>
  );
};

export default Barchart;
