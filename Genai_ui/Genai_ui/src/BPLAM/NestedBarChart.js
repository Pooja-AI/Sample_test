// import React, { useState, useRef, useEffect } from 'react';
// import { Bar } from 'react-chartjs-2';

// const NestedBarChart = ({ data }) => {
//   const [selectedBarIndex, setSelectedBarIndex] = useState(null);
//   const [selectedBarIndex2, setSelectedBarIndex2] = useState(null);
//   const [nestedChartData, setNestedChartData] = useState(null);
//   const [nestedChartData2, setNestedChartData2] = useState(null);
//   const chartRef = useRef(null);

//   const handleBarClick = (event, chart) => {
//     const activePoints = chart.getElementsAtEventForMode(event, 'nearest', { intersect: true }, false, false);

//     if (activePoints.length > 0) {
//       const selectedIndex = activePoints[0].index;
//       const selectedIndex2 = activePoints[0].index;
//       const nestedData1 = data[selectedIndex]?.nestedData;
//       const nestedData2 = nestedData1[selectedIndex2]?.nestedData;
      

//       if (nestedData1) {
//         setNestedChartData({
//           labels: nestedData1.map(item => item.label),
//           datasets: [
//             {
//               label: 'Nested Chart',
//               backgroundColor: 'rgba(0, 0, 255, 0.6)', // Blue color
//               borderColor: 'rgba(255, 0, 255, 1)',
//               borderWidth: 1,
//               data: nestedData1.map(item => item.value),
//             },
//           ],
//         });
//         // if (nestedData2) {
//         //     setNestedChartData({
//         //       labels: nestedData2.map(item => item.label),
//         //       datasets: [
//         //         {
//         //           label: 'Nested Chart',
//         //           backgroundColor: 'rgba(0, 0, 255, 0.6)', // Blue color
//         //           borderColor: 'rgba(255, 0, 255, 1)',
//         //           borderWidth: 1,
//         //           data: nestedData2.map(item => item.value),
//         //         },
//         //       ],
//         //     });
    
//         //   }
//         //   setSelectedBarIndex2(selectedIndex2);
//       }
      

//       setSelectedBarIndex(selectedIndex);
//     }
//   };

//   const chartData = {
//     labels: data.map((item) => item.label),
//     datasets: [
//       {
//         label: 'Main Chart',
//         backgroundColor: 'rgba(0, 0, 255, 0.6)', // Blue color
//         borderColor: 'rgba(255, 0, 255, 1)',
//         borderWidth: 1,
//         data: data.map((item) => item.value),
//       },
//     ],
//   };

//   const chartOptions = {
//     onClick: (event, elements) => handleBarClick(event, chartRef.current),
//     scales: {
//       x: {
//         beginAtZero: true,
//       },
//       y: {
//         offset: true,
//       },
//     },
//     plugins: {
//       legend: {
//         display: false, // Hide the legend for simplicity
//       },
//     },
//   };

//   useEffect(() => {
//     if (chartRef.current && chartRef.current.chartInstance && chartRef.current.chartInstance.options) {
//       chartRef.current.chartInstance.options.hover.onHover = handleBarClick;
//     }
//   }, []);

//   return (
//     <div style={{ marginLeft:'10px', textAlign: 'center', width: '650px', overflowX: 'auto', height: '200px', backgroundColor: 'lightgray', borderRadius: '10px', padding: '15px' }}>
//       <Bar ref={chartRef} data={chartData} options={chartOptions} />
//       {selectedBarIndex !== null && (
//         <div style={{ position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', backgroundColor: 'white', padding: '20px', borderRadius: '10px' }}>
//           {nestedChartData && <Bar data={nestedChartData} options={chartOptions} />}
//           {/* {nestedChartData2 && <Bar data={nestedChartData2} options={chartOptions} />} */}
//         </div>
//       )}
//       {/* {selectedBarIndex2 !== null && (
//         <div style={{ position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', backgroundColor: 'white', padding: '20px', borderRadius: '10px' }}>
//           {nestedChartData2 && <Bar data={nestedChartData2} options={chartOptions} />}
//           {nestedChartData2 && <Bar data={nestedChartData2} options={chartOptions} />} 
//         </div>
//       )} */}
      
//     </div>
//   );
// };

// export default NestedBarChart;


// import React, { useState, useEffect, useRef } from 'react';
// import { Bar } from 'react-chartjs-2';

// const MultiLevelBarChart = ({ data }) => {
//   const [nestedData, setNestedData] = useState(null);
//   const chartRef = useRef(null);

//   const handleBarClick = (event, chart) => {
//     const activePoints = chart.getElementsAtEventForMode(event, 'nearest', { intersect: true }, false, false);

//     if (activePoints.length > 0) {
//       const selectedIndex = activePoints[0].index;
//       const clickedData = data[selectedIndex]?.nestedData;

//       if (clickedData) {
//         setNestedData(clickedData);
//       }
//     }
//   };

//   const chartData = {
//     labels: data.map((item) => item.label),
//     datasets: [
//       {
//         label: 'Main Chart',
//         backgroundColor: 'rgba(0, 0, 255, 0.6)', // Blue color
//         borderColor: 'rgba(255, 0, 255, 1)',
//         borderWidth: 1,
//         data: data.map((item) => item.value),
//       },
//     ],
//   };

//   const chartOptions = {
//     onClick: (event, elements) => handleBarClick(event, chartRef.current),
//     scales: {
//       x: {
//         beginAtZero: true,
//       },
//       y: {
//         offset: true,
//       },
//     },
//   };

//   useEffect(() => {
//     if (chartRef.current && chartRef.current.chartInstance) {
//       chartRef.current.chartInstance.options.hover.onHover = handleBarClick;
//     }
//   }, [handleBarClick]);

//   return (
//     <div style={{ marginLeft: '10px', textAlign: 'center', width: '650px', overflowX: 'auto', height: '200px', backgroundColor: 'lightgray', borderRadius: '10px', padding: '15px' }}>
//       <Bar ref={chartRef} data={chartData} options={chartOptions} />
//       {nestedData && (
//         <div style={{ marginTop: '20px' }}>
//           <MultiLevelBarChart data={nestedData} />
//         </div>
//       )}
//     </div>
//   );
// };
// export default MultiLevelBarChart;




// import React, { useState, useEffect, useRef } from 'react';
// import { Bar } from 'react-chartjs-2';

// const MultiLevelBarChart = ({ data }) => {
//   const [nestedData, setNestedData] = useState(null);
//   const [nestedData2, setNestedData2] = useState(null);
//   const chartRef = useRef(null);

//   const handleBarHover = (event, chart) => {
//     const activePoints = chart.getElementsAtEventForMode(event, 'nearest', { intersect: true }, false, false);

//     if (activePoints.length > 0) {
//       const selectedIndex = activePoints[0].index;
//       const hoveredData = data[selectedIndex]?.nestedData;

//       if (hoveredData) {
//         setNestedData(hoveredData);
//         setNestedData2(null); // Reset nestedData2 when hovering on a new bar
//       }
//     }
//   };

//   const handleBarHoverNested = (event, chart) => {
//     const activePoints = chart.getElementsAtEventForMode(event, 'nearest', { intersect: true }, false, false);

//     if (activePoints.length > 0) {
//       const selectedIndex = activePoints[0].index;
//       const hoveredData = nestedData?.[selectedIndex]?.nestedData;

//       if (hoveredData) {
//         setNestedData2(hoveredData);
//       }
//     }
//   };

//   const chartData = {
//     labels: data.map((item) => item.label),
//     datasets: [
//       {
//         label: 'Main Chart',
//         backgroundColor: 'rgba(0, 0, 255, 0.6)',
//         borderColor: 'rgba(255, 0, 255, 1)',
//         borderWidth: 1,
//         data: data.map((item) => item.value),
//       },
//     ],
//   };

//   const chartOptions = {
//     onHover: (event, elements) => handleBarHover(event, chartRef.current),
//     scales: {
//       x: {
//         beginAtZero: true,
//       },
//       y: {
//         offset: true,
//       },
//     },
//   };

//   const nestedChartOptions = {
//     onHover: (event, elements) => handleBarHoverNested(event, chartRef.current),
//     scales: {
//       x: {
//         beginAtZero: true,
//       },
//       y: {
//         offset: true,
//       },
//     },
//   };

//   useEffect(() => {
//     if (chartRef.current && chartRef.current.chartInstance) {
//       chartRef.current.chartInstance.options.hover.onHover = handleBarHover;
//     }
//   }, [handleBarHover]);

//   return (
//     <div style={{ marginLeft: '10px', textAlign: 'center', width: '650px', overflowX: 'auto', height: '200px', backgroundColor: 'lightgray', borderRadius: '10px', padding: '15px' }}>
//       <Bar ref={chartRef} data={chartData} options={chartOptions} />
//       {nestedData && (
//         <div style={{ position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', backgroundColor: 'white', padding: '20px', borderRadius: '10px' }}>
//           <Bar
//             data={{
//               labels: nestedData.map((item) => item.label),
//               datasets: [
//                 {
//                   label: 'Nested Chart',
//                   backgroundColor: 'rgba(0, 0, 255, 0.6)',
//                   borderColor: 'rgba(255, 0, 255, 1)',
//                   borderWidth: 1,
//                   data: nestedData.map((item) => item.value),
//                 },
//               ],
//             }}
//             options={nestedChartOptions}
//           />
//         </div>
//       )}
//       {nestedData2 && (
//         <div style={{ position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', backgroundColor: 'white', padding: '20px', borderRadius: '10px' }}>
//           <Bar
//             data={{
//               labels: nestedData2.map((item) => item.label),
//               datasets: [
//                 {
//                   label: 'Nested Chart 2',
//                   backgroundColor: 'rgba(0, 255, 0, 0.6)',
//                   borderColor: 'rgba(255, 0, 0, 1)',
//                   borderWidth: 1,
//                   data: nestedData2.map((item) => item.value),
//                 },
//               ],
//             }}
//             options={nestedChartOptions}
//           />
//         </div>
//       )}
//     </div>
//   );
// };

// export default MultiLevelBarChart;

import React, { useState, useEffect, useRef } from 'react';
import { Bar } from 'react-chartjs-2';
import 'chartjs-plugin-datalabels';


const MultiLevelBarChart = ({ data ,onCloseChart}) => {
  const [nestedData1, setNestedData1] = useState(null);
  const [nestedData2, setNestedData2] = useState(null);
  const [nestedData3, setNestedData3] = useState(null);
  const chartRef = useRef(null);
  const [showPopup, setShowPopup] = useState(false); //new state for popup visibility
  const [showChart, setShowChart] = useState(true);
  const [hoveredLabel, setHoveredLabel] = useState(null);
  const [clickedLabel, setClickedLabel] = useState(null);
  console.log("Entered Multilevel chart");
  console.log("Nested data",data);

  const handleCloseChart = () => {
    setShowChart(false);
  };

  const handleLabelHover = (label) => {
    setHoveredLabel(label);
  };

  const handleLabelClick = (label) => {
    setClickedLabel(label);
  };

  const abbreviateLabel = (label) => {
    return label
      .split(' ')
      .map((word) => word.charAt(0))
      .join('.');
  };

  const handleBarHover1 = (event, chart) => {
    const activePoints = chart.getElementsAtEventForMode(event, 'nearest', { intersect: true }, false, false);

    if (activePoints.length > 0) {
      const selectedIndex = activePoints[0].index;
      const hoveredData = data[selectedIndex]?.level2;
      // const hoveredData = data[selectedIndex]?.nestedData;
      const hoveredLabel = data[selectedIndex]?.label;
      handleLabelHover(hoveredLabel);
      console.log("hvd1",hoveredData);

      if (hoveredData) {
        setNestedData1(hoveredData);
        setNestedData2(null); // Reset level 2 data
        setNestedData3(null); // Reset level 3 data
        setShowPopup(true); //show popup on hover 
      }
    }
  };

  const handleMouseLeave = () => {
    // Reset nested data and hide the popup when mouse leaves
    setNestedData1(null);
    setNestedData2(null);
    setNestedData3(null);
    setShowPopup(false);
  };

  const handleBarHover2 = (event, chart) => {
    const activePoints = chart.getElementsAtEventForMode(event, 'nearest', { intersect: true }, false, false);

    if (activePoints.length > 0) {
      const selectedIndex = activePoints[0].index;
      const hoveredData = nestedData1?.[selectedIndex]?.level3;
      // const hoveredData = nestedData1[selectedIndex]?.nestedData;
      const hoveredLabel = nestedData1?.[selectedIndex]?.label;
      handleLabelHover(hoveredLabel);
      console.log("hvd2",hoveredData)

      if (hoveredData) {
        setNestedData2(hoveredData);
        setNestedData3(null); // Reset level 3 data
      }
    }
  };

  const handleBarHover3 = (event, chart) => {
    const activePoints = chart.getElementsAtEventForMode(event, 'nearest', { intersect: true }, false, false);

    if (activePoints.length > 0) {
      const selectedIndex = activePoints[0].index;
      const hoveredData = nestedData2?.[selectedIndex]?.level4;
      // const hoveredData = nestedData2[selectedIndex]?.nestedData;
      const hoveredLabel = nestedData2?.[selectedIndex]?.label;
      handleLabelHover(hoveredLabel);
      console.log("hvd3",hoveredData)

      if (hoveredData) {
        setNestedData3(hoveredData);
      }
    }
  };
  console.log('nestedData1',nestedData1)
  console.log('nestedData2',nestedData2)
  console.log('nestedData3',nestedData3)

  const breakLabel = (label) => {
    const words = label.split(' ');
    if (words.length > 2) {
      const halfIndex = Math.ceil(words.length / 2);
      const firstLine = words.slice(0, halfIndex).join(' ');
      const secondLine = words.slice(halfIndex).join(' ');
      return [firstLine, secondLine];
    }
    return [label];

  };

  // console.log(Object.keys(data))
  
  const chartData = {
   
    // labels: Object.keys(data),
    // labels: Object.keys(data).map(breakLabel).flat(),
    labels: data.map((item) => breakLabel(item.label)),
    // labels: data.map((item) => {
    //   const words = item.label.split(' ');
    //   if (words.length > 2) {
    //     // Insert line break after two words
    //     const modifiedLabel = `${words[0]} ${words[1]}\n${words.slice(2).join(' ')}`;
    //     return modifiedLabel;
    //   }
    //   return item.label;
    // }),
    // labels: data.map((item) => item.label.replace(/ /g, '<br/>')),
    datasets: [
      {
        backgroundColor: 'rgba(135, 116, 255,0.9)',
        data: data.map((item) => item.value),
      },
    ],
  };

  

  const nestedChartOptions1 = {
    onHover: (event, elements) => handleBarHover1(event, chartRef.current),
   
    scales: {
      x: {
        beginAtZero: true,
        ticks: {
          // display: false,
          color: '#FFFFFF', // Color for x-axis labels
        },
        grid: {
          color: 'rgba(0, 0, 0, 0.1)', // Color for x-axis grid lines
        },
      },
      y: {
        offset: true,
        ticks: {
          display: false,
          color: '#FFFFFF', // Color for y-axis labels
        },
        grid: {
          color: 'rgba(0, 0, 0, 0.1)', // Color for y-axis grid lines
        },
      },
    },
    plugins:{
      legend:{
          display:false,
    },
    datalabels: {
      display: true,
      color: "white",
      formatter: Math.round(data.map((item) => item.value)),
      anchor: 'end',
      align: 'top',
      
    }
      
  },

  // animation: {
  //   onComplete: (context) => {
  //     const { chart } = context;
  //     const { ctx } = chart;
  //     const dataset = chart.data.datasets[0];

  //     const gradient = ctx.createLinearGradient(0, chart.height, 0, 0); // Adjusted gradient direction
  //     gradient.addColorStop(0, '#6B5CD1');
  //     gradient.addColorStop(1, '#1E58EF');

  //     // Loop through each bar
  //     chart.getDatasetMeta(0).data.forEach((bar) => {
  //       ctx.fillStyle = gradient;
  //       ctx.fillRect(bar.x, bar.y, bar.width, bar.height);
  //     });
  //   },
  // },
  };

  const nestedChartOptions2 = {
    onHover: (event, elements) => handleBarHover2(event, chartRef.current),
    scales: {
      x: {
        beginAtZero: true,
        
      },
      y: {
        display: false,
        offset: true,
      },
    },
    plugins:{
      legend:{
          display:false,
    },
    datalabels: {
      display: true,
      color: "white",
      formatter: Math.round(data.map((item) => item.value)),
      anchor: 'end',
      align: 'top'
    }
  },
  };

  const nestedChartOptions3 = {
    onHover: (event, elements) => handleBarHover3(event, chartRef.current),
    scales: {
      x: {
        beginAtZero: true,
      },
      y: {
        display: false,
        offset: true,
      },
    },
  };

  useEffect(() => {
    if (chartRef.current && chartRef.current.chartInstance) {
      chartRef.current.chartInstance.options.hover.onHover = handleBarHover1;
    }
  }, [handleBarHover1]);

  useEffect(() => {
    // Reset hovered label when leaving the component
    return () => {
      setHoveredLabel(null);
    };
  }, []);

  return (
    <div style={{ marginTop:'5px',marginLeft: '10px', textAlign: 'center', width: '665px', overflowX: 'auto', height: '450px', backgroundColor: 'rgba(255, 255, 255, 0.0)', borderRadius: '10px', padding: '15px'}}
      onMouseLeave={handleMouseLeave}>
      <Bar ref={chartRef} data={chartData} options={nestedChartOptions1} style={{overflowY: 'auto'}}/>
      {nestedData1 && showChart && showPopup &&(
        
        <div style={{ position: 'fixed', top: '63%', left: '33%', width:'630px', height:'230px', backgroundColor: 'rgba(43, 46, 68, 1)',transform: 'translate(-50%, -50%)',  padding: '20px', borderRadius: '10px' }}onCloseChart={handleCloseChart}     //backgroundColor: 'rgba(43, 46, 68, 1)',
          onMouseLeave={handleMouseLeave}>
          {/* <button onClick={onCloseChart}>X</button> */}
          <Bar
            data={{
              labels: nestedData1.map((item) => breakLabel(item.label)),
              datasets: [
                {
                  //label: 'Level 2 Chart',
                  //backgroundColor: 'rgba(0, 0, 255, 0.6)',
                  backgroundColor: 'rgba(107,92, 209, 0.9)',
                  //backgroundColor: 'linear-gradient(to top,#6B5CD1,#1E58EF)',
                  // borderColor: 'rgba(255, 0, 255, 1)',
                  // borderWidth: 1,
                  data: nestedData1.map((item) => item.value),
                },
              ],
            }}
            options={nestedChartOptions2}
          />
        </div>
      )}
      {/* {nestedData2 && showChart &&(
        <div style={{ position: 'fixed', top: '25%', left: '30%', transform: 'translate(-50%, -50%)', backgroundColor: 'rgba(255, 255, 255, 0.8)', padding: '20px', borderRadius: '10px',width:'500px' ,height:'230px'}} onCloseChart={handleCloseChart}>
          <Bar
            data={{
              labels: nestedData2.map((item) => abbreviateLabel(item.label)),
              datasets: [
                {
                  label: 'Level 3 Chart',
                  backgroundColor: 'rgba(0, 255, 0, 0.6)',
                  borderColor: 'rgba(255, 0, 0, 1)',
                  borderWidth: 1,
                  data: nestedData2.map((item) => item.value),
                },
              ],
            }}
            options={nestedChartOptions3}
          />
        </div>
      )} */}
      {/* {nestedData3 && showChart &&(
        <div style={{ position: 'fixed', top: '40%', left: '30%', transform: 'translate(-50%, -50%)', backgroundColor: 'rgba(255, 255, 255, 0.8)', padding: '20px', borderRadius: '10px' }} onCloseChart={handleCloseChart}>
          <Bar
            data={{
              labels: nestedData3.map((item) => abbreviateLabel(item.label)),
              datasets: [
                {
                  label: 'Level 4 Chart',
                  backgroundColor: 'rgba(255, 0, 0, 0.6)',
                  borderColor: 'rgba(0, 0, 255, 1)',
                  borderWidth: 1,
                  data: nestedData3.map((item) => item.value),
                },
              ],
            }}
          />
        </div>
      )} */}
      {clickedLabel && (
        <div style={{ position: 'fixed', top: '80%', left: '50%', transform: 'translate(-50%, -50%)', backgroundColor: 'rgba(255, 255, 255, 0.8)', padding: '20px', borderRadius: '10px', textAlign: 'center' }} onClick={() => setClickedLabel(null)}>
          {clickedLabel}
        </div>
      )}
    </div>
  //   <div style={{ marginLeft: '10px', textAlign: 'center', width: '622px', overflowX: 'auto', height: '230px', backgroundColor: 'rgba(255, 255, 255, 0.1)', borderRadius: '10px', padding: '15px' }}
  //   onMouseLeave={() => setHoveredLabel(null)}>
  //   <Bar
  //     ref={chartRef}
  //     data={chartData}
  //     options={{
  //       ...nestedChartOptions1,
  //       plugins: {
  //         legend: {
  //           display: true,
  //           labels: {
  //             filter: function (legendItem, chartData) {
  //               return legendItem.datasetIndex === 0;
  //             },
  //           },
  //         },
  //       },
  //       onHover: (_, elements) => {
  //         const hoveredElement = elements[0];
  //         if (hoveredElement) {
  //           const index = hoveredElement.index;
  //           handleLabelHover(data[index]?.label);
  //         } else {
  //           handleLabelHover(null);
  //         }
  //       },
  //     }}
  //   />
  //   {hoveredLabel && (
  //     <div
  //       style={{
  //         textDecoration: 'underline',
  //         textDecorationStyle: 'dashed',
  //         cursor: 'pointer',
  //       }}
  //       onClick={() => handleLabelClick(hoveredLabel)}
  //     >
  //       {hoveredLabel}
  //     </div>
  //   )}
  //   {clickedLabel && (
  //     <div
  //       style={{
  //         position: 'fixed',
  //         top: '80%',
  //         left: '50%',
  //         transform: 'translate(-50%, -50%)',
  //         backgroundColor: 'rgba(255, 255, 255, 0.8)',
  //         padding: '20px',
  //         borderRadius: '10px',
  //         textAlign: 'center',
  //       }}
  //       onClick={() => setClickedLabel(null)}
  //     >
  //       {clickedLabel}
  //     </div>
  //   )}
  // </div>
//   <div style={{ marginLeft: '10px', textAlign: 'center', width: '622px', overflowX: 'auto', height: '230px', backgroundColor: 'rgba(255, 255, 255, 0.1)', borderRadius: '10px', padding: '15px' }}>
//   <Bar
//     ref={chartRef}
//     data={chartData}
//     options={{
//       ...nestedChartOptions1,
//       plugins: {
//         legend: {
//           display: false,
//         },
//       },
//       onHover: (_, elements) => {
//         const hoveredElement = elements[0];
//         if (hoveredElement) {
//           const index = hoveredElement.index;
//           handleLabelClick(data[index]?.label);
//         }
//       },
//     }}
//   />
//   {clickedLabel && (
//     <div
//       style={{
//         textDecoration: 'underline',
//         textDecorationStyle: 'dashed',
//         cursor: 'pointer',
//         marginTop: '10px', // Adjust spacing
//       }}
//       onClick={() => setClickedLabel(null)}
//     >
//       {clickedLabel}
//     </div>
//   )}
// </div>

  );
};

export default MultiLevelBarChart;


  
  







