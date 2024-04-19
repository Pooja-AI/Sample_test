import React from 'react';
import {
  PieChart,
  Pie,
  Tooltip,
  Legend,
  Cell
} from "recharts";

const App = ({ data }) => {
  // Transform your data into an array of objects
  const chartData = Object.entries(data["Pie Chart"]).map(([corrosionType, cost]) => ({
    corrosionType,
    Cost: parseFloat(cost), // Assuming cost is a percentage string, convert it to a number
  }));

  const colors = ["#8884d8", "rgba(99, 31, 225, 0.826)", "#ffc658", "#82ca9d", "rgba(51, 184, 237, 0.712)", "green", "yellow"];

  return (
    <PieChart width={400} height={300}>
      <Pie
        dataKey="Cost"
        fontSize={"10px"}
        isAnimationActive={false}
        data={chartData}
        cx={200}
        cy={100}
        outerRadius={60}
        nameKey="corrosionType"
        label
      >
        {
          chartData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
          ))
        }
      </Pie>
      <Legend
        wrapperStyle={{
          marginLeft: "20px",
          backgroundColor: 'transparent',
          fontSize: '10px',
          borderRadius: 3,
          lineHeight: '20px'
        }}/>
      <Tooltip
        contentStyle={{
          backgroundColor: '#f5f5f5',
          fontSize: '10px',
          borderRadius: 10,
          padding: '10px',
        }}
      />
    </PieChart>
  );
};

export default App;
