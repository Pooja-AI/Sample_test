// import React, { useState, useEffect } from "react";
// import { Bar } from "react-chartjs-2";
// import Chart from "chart.js/auto";
// import "chartjs-plugin-datalabels";
// import ChartDataLabels from "chartjs-plugin-datalabels";
// import {
//   Chart as ChartJS,
//   BarElement,
//   CategoryScale,
//   LinearScale,
//   Tooltip,
// } from "chart.js";
// ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip);

// Chart.register(ChartDataLabels);
// const breakLabel = (label) => {
//   const words = label.split(" ");
//   if (words.length > 4) {
//     const halfIndex = Math.ceil(words.length / 2);
//     const firstLine = words.slice(0, halfIndex).join(" ");
//     const secondLine = words.slice(halfIndex).join(" ");
//     return [firstLine, secondLine];
//   }
//   return [label];
// };
// const truncateLabel = (label, maxLength = 15) => {
//   const words = label.split(" ");
//   if (words.length > 2) {
//     const truncatedLabel = `${words[0]} ... ${words[words.length - 1]}`;
//     return truncatedLabel.length > maxLength
//       ? truncatedLabel.substring(0, maxLength) + "..."
//       : truncatedLabel;
//   }
//   return label;
// };



// // const sortDataByValues = (data) => {
// //   const dataArray = Object.entries(data);
// //   dataArray.sort((a, b) => b[1] - a[1]);

// //   const sortedData = Object.fromEntries(dataArray);
// //   return sortedData;
// // };

// // const generateLinearGradientColors = (maxValue, numBars) => {
// //   const colors = [];
// //   const maxHue = 180; // Cyan is at 180 degrees in HSL

// //   for (let i = 0; i < numBars; i++) {
// //     const hue = (i / (numBars - 1)) * maxHue;
// //     const saturation = 100;
// //     const lightness = (i / (numBars - 1)) * 50 + 50; // Vary lightness from 50 to 100
// //     const canvas = document.createElement("canvas");
// //     const context = canvas.getContext("2d");

// //     const gradient = context.createLinearGradient(0, 0, 400, 0); // Horizontal gradient
// //     //const gradient = context.createLinearGradient(3, 217, 255, 1); // Horizontal gradient
// //     gradient.addColorStop(
// //       0,
// //       `hsla(${hue}, ${saturation}%, ${lightness}%, 0.8)`
// //     );
// //     gradient.addColorStop(1, "rgba(0, 0, 255, 0.8)"); // You can change the end color here
// //     //gradient.addColorStop(1, 'rgba(106, 89, 255, 1)'); // You can change the end color here

// //     colors.push(gradient);
// //   }

// //   return colors;
// // };

// const HorizontalBarChart = ({ data }) => {
//   // const sortedData = sortDataByValues(data);
//   const [isHovered, setIsHovered] = useState(false);
//   const labels = Object.keys(data);
//   data = Object.values(data);
//   const initialData = {
//     labels,
//     datasets: [
//       {
//         label: "Noisy Apps",
//         data,
//         backgroundColor: (context) => {
//           // Create a gradient for each bar
//           const gradient = context.chart.ctx.createLinearGradient(
//             0,
//             100,
//             100,
//             0
//           );
//           gradient.addColorStop(0, "#675dff"); // Start color
//           gradient.addColorStop(1, "#05d7ff"); // End color
//           return gradient;
//         },
//         barThickness: 20,
//       },
//     ],
//   };

//   const [chartData, setChartData] = useState(initialData);
//   const [ascendingOrder, setAscendingOrder] = useState(true);

//   useEffect(() => {
//     ChartJS.register("datalabels", require("chartjs-plugin-datalabels"));
//   }, []);

//   const handleSort = () => {
//     const sortedData = {
//       labels: [...initialData.labels],
//       datasets: [
//         {
//           ...initialData.datasets[0],
//           data: [...initialData.datasets[0].data].sort((a, b) =>
//             ascendingOrder ? a - b : b - a
//           ),
//         },
//       ],
//     };

//     // Sort the labels based on the sorted data
//     sortedData.labels.sort((a, b) => {
//       const aIndex = initialData.labels.indexOf(a);
//       const bIndex = initialData.labels.indexOf(b);
//       return ascendingOrder ? aIndex - bIndex : bIndex - aIndex;
//     });

//     setChartData(sortedData);
//     setAscendingOrder(!ascendingOrder);
//   };
//   const yDataKeys = labels.map((label) => {
//     const limit = 15;
//     // console.log(label)
//     return label.length > limit ? label.substr(0, limit) + '...' : label;
//   });
//   // const chartOptions = {

//   //   scales: {
//   //     x: [
//   //       {
//   //         display: false,
//   //         grid: {
//   //           display: false,
//   //         },
//   //       },
//   //       {
//   //         ticks: {
//   //           maxRotation: 0,
//   //           autoSkip: true,
//   //           maxTicksLimit: 10,
//   //           callback: function (value) {
//   //             // Truncate label to a specific length
//   //             const limit = 15; // Set your desired character limit
//   //             if (value && value.length > limit) {
//   //               return value.substr(0, limit) + "...";
//   //             } else {
//   //               return value;
//   //             }
//   //           },
//   //         },
//   //       },
//   //     ],
//   //     y: {
//   //       display: true,
//   //       ticks: {
//   //         color: "white",
//   //         maxRotation: 0,
//   //         autoSkip: false,
//   //         // callback: function (value, index) {
//   //         //   return yDataKeys[index];
//   //         // },
//   //       },
//   //       grid: {
//   //         display: false,
//   //       },
//   //     },
//   //   },
//   //   // ... other options ...
//   // };


//   const chartOptions = {
//     indexAxis: "y",
//     layout: {
//       padding: 10,
//     },
//     plugins: {
//       legend: {
//         display: false,
//       },
//       datalabels: {
//         color: "white",
//         anchor: "end",
//         align: "end",

//         offset: 4,
//         formatter: (value, context) => {
//           return value;
//         },
//       },
//     },
//     scales: {
//       x: [{
//         display: false,
//         grid: {
//           display: false,
//         },
//       }
//       ],
//       y: {
//         display: true,
//         ticks: {
//           color: "white",
//           maxRotation: 0,
//           autoSkip: false,
//           callback: function (value, index) {
//             return yDataKeys[index];
//           },
//         },
//         grid: {
//           display: false,
//         },
//       },
//     },
//     maintainAspectRatio: false,
//     responsive: true,
//     aspectRatio: 2,
//     elements: {
//       bar: {
//         borderRadius: 5,
//       },
//     },
//     legend: {
//       display: false,
//     },
//     title: {
//       display: false,
//     },
//     layout: {
//       padding: {
//         left: 10,
//         right: 10,
//         top: 10,
//         bottom: 5,
//         // 
//       },
//     },
//   };

//   const buttonStyle = {
//     position: "relative",
//     top: "30%",
//     left:"60%",
//     marginTop:"10px",
//     // marginLeft: "380px",
//     // padding: "8px",
//     width: "fit-content",
//     height: '30px',
//     backgroundColor: "transparent",
//     color: "#fff",
//     borderRadius: "5px",
//     cursor: "pointer",
//     border: "1px solid #e6c520",
//   };



//   // const HorizontalBarChart = ({ data }) => {
//   //     console.log("Entered horizontal bar chart");
//   //     console.log("data",data);

//   //   const sortedData = sortDataByValues(data);
//   //   const [isHovered, setIsHovered] = useState(false);

//   // const chartData = {

//   //     labels: isHovered
//   //       ? Object.keys(data)
//   //       : Object.keys(data).map((label) => truncateLabel(label)),
//   //     hoverlabels:Object.keys(sortedData),
//   //   datasets: [
//   //     {
//   //       label: 'Noisy Apps',

//   //       backgroundColor:'#4CDDEF',

//   //       hoverBackgroundColor: 'rgba(0, 255, 255, 1)',
//   //       hoverBorderColor: 'rgba(255, 0, 255, 1)',
//   //       data: Object.values(sortedData),
//   //     },
//   //   ],
//   // };
//   // console.log(Object.keys(sortedData));
//   // console.log(Object.values(sortedData));

//   // const chartOptions = {
//   //     indexAxis:'y',
//   //   elements:{
//   //     bar:{
//   //       borderWidth:1,
//   //     }
//   //   },
//   //   responsive:true,
//   //   scales: {
//   //     x: {
//   //       ticks: {
//   //         color: '#FFFFFF', // Color for x-axis labels

//   //       },

//   //       grid: {
//   //         color: 'rgba(0, 0, 0, 0.1)', // Color for x-axis grid lines
//   //       },
//   //     },
//   //     y: {
//   //       ticks: {
//   //         color: '#FFFFFF', // Color for y-axis labels
//   //       },
//   //       grid: {
//   //         color: 'rgba(0, 0, 255, 0.1)', // Color for y-axis grid lines
//   //       },
//   //     },
//   //   },

//   //   plugins:{
//   //     legend:{
//   //         display:false,
//   //   },

//   //   datalabels: {
//   //     display: true,
//   //     color: "white",
//   //     formatter: Math.round(Object.keys(sortedData)),
//   //     anchor: 'end',
//   //     align: 'end'
//   //   }

//   //   },
//   //   tooltips: {
//   //     callbacks: {
//   //         label: (tooltipItem) => isHovered ? tooltipItem.label : truncateLabel(tooltipItem.label),
//   //     //   label: (context) => context.dataset.label,
//   //     //   label:(tooltipItem) => tooltipItem.label,
//   //       title: () => null,
//   //     }
//   // }
//   //   };

//   return (
//     <div >
//       <div style={{display:"flex"}}><p className='bplam-header-barchart' style={{marginTop:"10px"}}>Ticket Analysis Summary</p>      
//       <button style={buttonStyle} onClick={handleSort}>
//         {ascendingOrder ? "▲" : "▼"}
//       </button>
//       </div>
//       <div><p className="bplam-header-barchart-text">These 10 apps constitute about 75% of the business processes aligned Incidents</p></div>
//       <div style={{ flexDirection: "column", display: "flex", marginLeft: '5px', textAlign: 'center', width: '470px', height: '450px', backgroundColor: 'rgba(255, 255, 255, 0.0)', borderRadius: '10px', padding: '5px' }} onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
//         <Bar style={{ height: '410px !important' }} data={chartData} options={chartOptions} />
//       </div>


//     </div>
//   );
// };

// export default HorizontalBarChart;


import React, { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";
import Chart from "chart.js/auto";
import "chartjs-plugin-datalabels";
import ChartDataLabels from "chartjs-plugin-datalabels";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
} from "chart.js";
ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip);
 
Chart.register(ChartDataLabels);
 
 
const HorizontalBarChart = ({ count, data }) => {
  const [isHovered, setIsHovered] = useState(false);
 
  const labels = Object.keys(data);
  data = Object.values(data);
 
  const initialData = {
    labels,
    datasets: [
      {
        label: "Noisy Apps",
        data,
        backgroundColor: (context) => {
          const gradient = context.chart.ctx.createLinearGradient(
            0,
            100,
            100,
            0
          );
          gradient.addColorStop(0, "#675dff");
          gradient.addColorStop(1, "#05d7ff");
          return gradient;
        },
        barThickness: 20,
      },
    ],
  };
 
  const [chartData, setChartData] = useState(initialData);
  const [ascendingOrder, setAscendingOrder] = useState(false);
 
  useEffect(() => {
    ChartJS.register("datalabels", require("chartjs-plugin-datalabels"));
 
    // Sort the data initially in descending order
    const sortedData = {
      labels: [...initialData.labels],
      datasets: [
        {
          ...initialData.datasets[0],
          data: [...initialData.datasets[0].data].sort((a, b) =>
            ascendingOrder ? a - b : b - a
          ),
        },
      ],
    };
 
    // Sort the labels based on the sorted data
    sortedData.labels.sort((a, b) => {
      const aIndex = initialData.labels.indexOf(a);
      const bIndex = initialData.labels.indexOf(b);
      return ascendingOrder ? aIndex - bIndex : bIndex - aIndex;
    });
 
    setChartData(sortedData);
  }, [ascendingOrder]);
 
  const handleSort = () => {
    const sortedData = {
      labels: [...initialData.labels],
      datasets: [
        {
          ...initialData.datasets[0],
          data: [...initialData.datasets[0].data].sort((a, b) =>
            ascendingOrder ? a - b : b - a
          ),
        },
      ],
    };
 
    sortedData.labels.sort((a, b) => {
      const aIndex = initialData.labels.indexOf(a);
      const bIndex = initialData.labels.indexOf(b);
      return ascendingOrder ? aIndex - bIndex : bIndex - aIndex;
    });
 
    setChartData(sortedData);
    setAscendingOrder(!ascendingOrder);
  };
 
  const yDataKeys = labels.map((label) => {
    const limit = 15;
    return label.length > limit ? label.substr(0, limit) + '...' : label;
  });
 
  const chartOptions = {
    indexAxis: "y",
    layout: {
      padding: 10,
    },
    plugins: {
      legend: {
        display: false,
      },
      datalabels: {
        color: "white",
        anchor: "end",
        align: "end",
        offset: 4,
        formatter: (value, context) => {
          return value;
        },
      },
    },
    scales: {
      x: 
        {
          display: false,
          grid: {
            display: false,
          },
        },
      
      y: {
        display: true,
        ticks: {
          color: "white",
          maxRotation: 0,
          autoSkip: false,
          callback: function (value, index) {
            return yDataKeys[index];
          },
        },
        grid: {
          display: false,
        },
      },
    },
    maintainAspectRatio: false,
    responsive: true,
    aspectRatio: 2,
    elements: {
      bar: {
        borderRadius: 5,
      },
    },
    legend: {
      display: false,
    },
    title: {
      display: false,
    },
    layout: {
      padding: {
        left: 10,
        right: 20,
        top: 10,
        bottom: 5,
      },
    },
  };
 
  const buttonStyle = {
    position: "relative",
    top: "30%",
    left: "52%",
    marginTop: "10px",
    width: "fit-content",
    height: '30px',
    backgroundColor: "transparent",
    color: "#fff",
    borderRadius: "5px",
    cursor: "pointer",
    border: "1px solid #e6c520",
  };
 
  return (
    <div>
      <div style={{ display: "flex" }}>
      <p className='bplam-header-barchart' style={{marginTop:"10px",fontWeight:'500', fontSize:'14px'}}>Top 10 Noisy Applications</p>  
        <button style={buttonStyle} onClick={handleSort}>
          {ascendingOrder ? "▼" : "▲"}
        </button>
      </div>
      <div>
        <p className="bplam-header-barchart-text">
          These 10 apps constitute about {count}% of the business processes aligned Incidents
        </p>
      </div>
      <div style={{ flexDirection: "column", display: "flex", marginLeft: '5px', textAlign: 'center', width: '470px', height: '450px', backgroundColor: 'rgba(255, 255, 255, 0.0)', borderRadius: '10px', padding: '5px' }} onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
        <Bar style={{ height: '410px !important' }} data={chartData} options={chartOptions} />
      </div>
    </div>
  );
};
 
export default HorizontalBarChart;
