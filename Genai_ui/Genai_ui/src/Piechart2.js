// import "./styles.css";
import React, { useCallback, useState } from "react";
import { PieChart, Pie, Sector, Cell } from "recharts";

// const data = [
//   { name: "Atmospheric Corrosion", value: 10.00 },
//   { name: "Pitting Corrosion", value: 16.60 },
//   { name: "Erosion Corrosion", value: 29.05 },
//   { name: "Fatigue Corrosion", value: 41.10 }
// ];

const renderActiveShape = (props) => {
  const RADIAN = Math.PI / 180;
  const {
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    startAngle,
    endAngle,
    fill,
    payload,
    percent,
    Cost
  } = props;
  const sin = Math.sin(-RADIAN * midAngle);
  const cos = Math.cos(-RADIAN * midAngle);
  const sx = cx + (outerRadius + 10) * cos;
  const sy = cy + (outerRadius + 10) * sin;
  const mx = cx + (outerRadius + 30) * cos;
  const my = cy + (outerRadius + 30) * sin;
  const ex = mx + (cos >= 0 ? 1 : -1) * 22;
  const ey = my;
  const textAnchor = cos >= 0 ? "start" : "end";

  return (
    <g>
      <text x={cx} y={cy} dy={8} textAnchor="middle" fill={fill} >
        {payload.corrosionType}
      </text>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
      />
      <Sector
        cx={cx}
        cy={cy}
        startAngle={startAngle}
        endAngle={endAngle}
        innerRadius={outerRadius + 6}
        outerRadius={outerRadius + 10}
        fill={fill}
      />
      <path
        d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`}
        stroke={fill}
        fill="none"
      />
      <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
      <text
        x={ex + (cos >= 0 ? 1 : -1) * 12}
        y={ey}
        textAnchor={textAnchor}
        fill={fill}
        fontSize={14}
      >{`${Cost}`}</text>
    </g>
  );
};

export default function App({ data }) {
    const chartData = Object.entries(data["Pie Chart"]).map(([corrosionType, cost]) => ({
        corrosionType,
        Cost: parseFloat(cost), // Assuming cost is a percentage string, convert it to a number
      }));
      console.log(chartData);
  const colors = ["rgba(76, 221, 239, 1)", "rgba(135, 116, 255, 1)", "rgba(22, 91, 170, 1)", "rgba(161, 85, 185, 1)", "rgba(46, 156, 220, 1)", "green", "yellow"];
  const [activeIndex, setActiveIndex] = useState(0);
  const onPieEnter = useCallback(
    (_, index) => {
      setActiveIndex(index);
    },
    [setActiveIndex]
  );

  return (
    <PieChart width={500} height={310} margin={{ top: -45, right: 20, left: 50, bottom:10}}>
      <Pie
        activeIndex={activeIndex}
        activeShape={renderActiveShape}
        data={chartData}
        cx={200}
        cy={200}
        innerRadius={85}
        outerRadius={115}
        fill="#8884d8"
        dataKey="Cost"
        onMouseEnter={onPieEnter}
      >
       {
          chartData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
          ))
        } </Pie>
    </PieChart>
  );
}
