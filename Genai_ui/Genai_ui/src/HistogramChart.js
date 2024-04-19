import React from 'react';
import { Bar } from 'react-chartjs-2';

const HistogramChart = ({ data }) => {
  const { "X-Axis": XAxis, "Y-Axis": YAxis } = data;

  const chartData = {
    labels: XAxis.map(([min, max]) => {
        if (min !== undefined && max !== undefined) {
          return `${min}-${max}`;
        }
        return '';
      }),
    datasets: [
      {
        label: 'Number of Shipments',
        data: YAxis,
        backgroundColor: 'rgba(75,192,192,0.2)',
        borderColor: 'rgba(75,192,192,1)',
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    scales: {
      x: {
        title: {
          display: true,
          text: 'Delay Hours',
          color: 'white',
        },
      },
      y: {
        title: {
          display: true,
          text: 'Number of Shipments',
          color: 'white',
        },
      },
    },
  };

  return (
    <div>
      <h5>Histogram Analysis</h5>
      <Bar data={chartData} options={chartOptions} />
    </div>
  );
};

export default HistogramChart;
