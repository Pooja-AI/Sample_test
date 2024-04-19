//MultilevelPieChart.js
// import React, { useEffect } from 'react';
// import * as ZoomCharts from 'zoomcharts';

// const MultiPieChartComponent = (data) => {
//   useEffect(() => {
//     const chart = new ZoomCharts.PieChart({
//       pie: {
//         innerRadius: 0
//       },
//       container: "demo",
//       data: [
//         {
//            data
//         }
//       ],
//       toolbar: {
//         fullscreen: true,
//         enabled: true
//       },
//       interaction: {
//         resizing: {
//           enabled: false
//         }
//       }
//     });

//     // Cleanup function to destroy the chart when the component unmounts
//     return () => {
//       chart.destroy();
//     };
//   }, []); // The empty dependency array ensures that this effect runs once after the initial render

//   return <div id="demo" />;
// };

// export default MultiPieChartComponent;


// import React from 'react';
// import { Doughnut } from 'react-chartjs-2';

// const MultilevelPieChart = ({data}) => {
//   const chartData = {
//     datasets: [{
//         data: data.map((item) => item.value),
//     }
//     ],
//   };

//   const options = {
//     cutout: 2,
//     rotation: -Math.PI,
//     circumference: Math.PI,
//     legend: {
//       display: false,
//     },
//   };

//   return <Doughnut data={chartData} options={options} />;
// };

// export default MultilevelPieChart;

// import React from 'react';
// import { Doughnut } from 'react-chartjs-2';

// const MultilevelPieChart = ({ data }) => {
//   const flattenChartData = (data) => {
//     const flattened = [];

//     data.forEach((level1) => {
//       flattened.push({
//         label: level1.label,
//         value: level1.value,
//       });

//       if (level1.level2) {
//         level1.level2.forEach((level2) => {
//           flattened.push({
//             label: level2.label,
//             value: level2.value,
//           });

//           if (level2.level3) {
//             level2.level3.forEach((level3) => {
//               flattened.push({
//                 label: level3.label,
//                 value: level3.value,
//               });
//             });
//           }
//         });
//       }
//     });

//     return flattened;
//   };

//   const generateColors = (count) => {
//     // You can implement your own logic to generate colors
//     // This is a simple example, you might want to use a library like 'randomcolor'
//     const colors = [];
//     for (let i = 0; i < count; i++) {
//       colors.push(`rgba(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, 0.7)`);
//     }
//     return colors;
//   };

//   const flattenedData = flattenChartData(data);

//   const chartData = {
//     labels: flattenedData.map((item) => item.label),
//     datasets: [
//       {
//         data: flattenedData.map((item) => item.value),
//         backgroundColor: generateColors(flattenedData.length),
//       },
//     ],
//   };
//   const chartOptions = {
//     plugins:{
//         legend:{
//             display:false,
//       },
//       datalabels: {
//         display: true,
//         color: "white",
//         formatter: Math.round(data.map((item) => item.value)),
//         align: "top",
//         anchor:'end'
//       }
//     },
//   };
//   return (
//     <div style={{ marginTop:'5px',marginLeft: '10px', textAlign: 'center', width: '665px', overflowX: 'auto', height: '450px', backgroundColor: 'rgba(255, 255, 255, 0.0)', borderRadius: '10px', padding: '15px' }}>
//       <Doughnut data={chartData} options={chartOptions}/>
//     </div>
//   );
// };

// export default MultilevelPieChart;

import React, { useState, useEffect, useRef } from 'react';
import { Doughnut, Pie } from 'react-chartjs-2';
// import { Pie } from 'recharts';
import fullscreen from "../images/fullScreen.svg";
import minimize from "../images/minimize.png"
import back from "../images/piebackbplam.png"

import ChartDataLabels from 'chartjs-plugin-datalabels';
// import Pie from '../Piechart.js';
// import { PieChart } from 'recharts';

// const FullScreenChart = ({ onCloseFullScreen }) => {
//   // Your full-screen pie chart component
//   const [nestedData1, setNestedData1] = useState(null);
//   const [nestedData2, setNestedData2] = useState(null);
//   const [nestedData3, setNestedData3] = useState(null);
//   const chartRef = useRef(null);
//   const [showPopup, setShowPopup] = useState(false); //new state for popup visibility
//   const [showChart, setShowChart] = useState(true);
//   const [hoveredLabel, setHoveredLabel] = useState(null);
//   const [clickedLabel, setClickedLabel] = useState(null);
//   const [formattedLabels, setFormattedLabels] = useState([]);
//   const [isFullScreen, setIsFullScreen] = useState(false);
//   const [data, setData] = useState([]);



//   console.log("Entered Multilevel chart");
//   console.log("Nested data",data);

//   const handleCloseChart = () => {
//     setShowChart(false);
//   };

//   const handleLabelHover = (label) => {
//     setHoveredLabel(label);
//   };

//   const handleLabelClick = (label) => {
//     setClickedLabel(label);
//   };

//   const abbreviateLabel = (label) => {
//     return label
//       .split(' ')
//       .map((word) => word.charAt(0))
//       .join('.');
//   };
//   const breakLabel = (label) => {
//     const words = label.split(" ");
//     if (words.length > 1) {
//       const halfIndex = Math.ceil(words.length /2);
//       const firstLine = words.slice(0, halfIndex).join(" ");
//       const secondLine = words.slice(halfIndex).join(" ");
//       return [firstLine, secondLine];
//     }
//     return [label];
//   };
//   const truncateLabel = (label, maxLength = 15) => {
//     const words = label.split(" ");
//     if (words.length > 2) {
//       const truncatedLabel = `${words[0]} ... ${words[words.length - 1]}`;
//       return truncatedLabel.length > maxLength
//         ? truncatedLabel.substring(0, maxLength) + "..."
//         : truncatedLabel;
//     }
//     return label;
//   };
//   const generateColors = (count) => {
//         // You can implement your own logic to generate colors
//         // This is a simple example, you might want to use a library like 'randomcolor'
//         const colors = [];
//         for (let i = 0; i < count; i++) {
//           colors.push(`rgba(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, 0.7)`);
//         }
//         return colors;
//       };
//       // const toggleFullScreen = () => {
//       //   const element = document.documentElement;

//       //   if (!isFullScreen) {
//       //     if (element.requestFullscreen) {
//       //       element.requestFullscreen();
//       //     } else if (element.mozRequestFullScreen) {
//       //       element.mozRequestFullScreen();
//       //     } else if (element.webkitRequestFullscreen) {
//       //       element.webkitRequestFullscreen();
//       //     } else if (element.msRequestFullscreen) {
//       //       element.msRequestFullscreen();
//       //     }
//       //   } else {
//       //     if (document.exitFullscreen) {
//       //       document.exitFullscreen();
//       //     } else if (document.mozCancelFullScreen) {
//       //       document.mozCancelFullScreen();
//       //     } else if (document.webkitExitFullscreen) {
//       //       document.webkitExitFullscreen();
//       //     } else if (document.msExitFullscreen) {
//       //       document.msExitFullscreen();
//       //     }
//       //   }

//       //   setIsFullScreen(!isFullScreen);
//       // };

//       const toggleFullScreen = () => {
//         setIsFullScreen(!isFullScreen);
//       };


//   const handleBarHover1 = (event, chart) => {
//     if (chart && chart.getElementsAtEventForMode) {
//       const activePoints = chart.getElementsAtEventForMode(event, 'nearest', { intersect: true }, false, false);

//     if (activePoints.length > 0) {
//       const selectedIndex = activePoints[0].index;
//       const hoveredData = data[selectedIndex]?.level2;
//       // const hoveredData = data[selectedIndex]?.nestedData;
//       const hoveredLabel = data[selectedIndex]?.label;
//       handleLabelHover(hoveredLabel);
//       console.log("hvd1",hoveredData);

//       if (hoveredData) {
//         setNestedData1(hoveredData);
//         setNestedData2(null); // Reset level 2 data
//         setNestedData3(null); // Reset level 3 data
//         setShowPopup(true); //show popup on hover 
//         setShowChart(false);
//       }
//       else {
//         // If there is no level 2 data, reset everything
//         setNestedData1(null);
//         setNestedData2(null);
//         setNestedData3(null);
//         setShowPopup(false);
//         setShowChart(true);
//       }
//     }
//     }
//   };

//   const handleMouseLeave = () => {
//     // Reset nested data and hide the popup when mouse leaves
//     setNestedData1(null);
//     setNestedData2(null);
//     setNestedData3(null);
//     setShowPopup(false);
//   };

//   const handleBarHover2 = (event, chart) => {
//     console.log('chartRef.current:', chartRef.current); // Log chartRef for debugging

//   if (chartRef.current && chartRef.current.chartInstance) {
//     const activePoints = chartRef.current.chartInstance.getElementsAtEventForMode(event, 'nearest', { intersect: true }, false, false);
//     // const activePoints = chart.getElementsAtEventForMode(event, 'nearest', { intersect: true }, false, false);

//     if (activePoints.length > 0) {
//       const selectedIndex = activePoints[0].index;
//       const hoveredData = nestedData1?.[selectedIndex]?.level3;
//       // const hoveredData = nestedData1[selectedIndex]?.nestedData;
//       const hoveredLabel = nestedData1?.[selectedIndex]?.label;
//       handleLabelHover(hoveredLabel);
//       console.log("hvd2",hoveredData)

//       if (hoveredData) {
//         setNestedData2(hoveredData);
//         setNestedData3(null); // Reset level 3 data
//       }
//     }
//   }
//   };

//   const handleBarHover3 = (event, chart) => {
//     const activePoints = chart.getElementsAtEventForMode(event, 'nearest', { intersect: true }, false, false);

//     if (activePoints.length > 0) {
//       const selectedIndex = activePoints[0].index;
//       const hoveredData = nestedData2?.[selectedIndex]?.level4;
//       // const hoveredData = nestedData2[selectedIndex]?.nestedData;
//       const hoveredLabel = nestedData2?.[selectedIndex]?.label;
//       handleLabelHover(hoveredLabel);
//       console.log("hvd3",hoveredData)

//       if (hoveredData) {
//         setNestedData3(hoveredData);
//       }
//     }
//   };
//   console.log('nestedData1',nestedData1)
//   console.log('nestedData2',nestedData2)
//   console.log('nestedData3',nestedData3)

//   const handleBackButtonClick = () => {
//     // Reset level 2 data and show the level 1 chart
//     setNestedData1(null);
//     setShowChart(true);
//   };

//   const chartData = {
//     labels: data.map((item) => (item.label)),
//     datasets: [
//       {

//         backgroundColor: generateColors(data.length),
//             position: 'absolute',
//             left: '50%',
//             top: '50%',
//             transform: 'translate(-50%, -50%)',
//             width: '100px', // Adjust this value to control arrow length
//             height: '20px', // Adjust this value to control arrow width
//             background: 'rgba(255, 255, 255, 0.7)', // Same as borderColor in options
//             clipPath: 'polygon(50% 0%, 100% 100%, 0% 100%)', // Triangle shape
//             zIndex: 10,
//             pointerEvents: 'none', // Allow interactions with the chart behind

//         data: data.map((item) => item.value),
//       },
//     ],
//   };

//   const nestedChartOptions1 = {
//     onClick: (event, elements) => handleBarHover1(event, chartRef.current),


//     plugins:{

//       legend:{
//           display:true,
//           position: 'right',
//           align: 'center',
//           labels: {
//             boxWidth: 10, // Adjust as needed
//           },
//     },
//     datalabels: {
//       display: true,
//       color: "white",
//     //   formatter: (Math.round(data.map((item) => item.value))),
//     formatter: (value, context) => {

//         const label = context.chart.data.labels[context.dataIndex];
//         let sum = 0;
//                 let dataArr = context.chart.data.datasets[0].data;
//                 dataArr.map(data => {
//                     sum += data;
//                 });
//                 let percentage = (value*100 / sum).toFixed(0);
//                 return value !== 0 ? `${value} \n (${percentage}%)` : null;

//       },

//       align: "start",
//       anchor:'end',
//       offset:-50,
//       textAlign: 'center',
//       clip: true,
//       borderRadius: 5,
//       backgroundColor: 'rgba(0, 0, 0, 0.8)', // Customize background color
//       borderColor: 'rgba(255, 255, 255, 0.8)', // Customize border color
//       borderWidth: 1,
//       padding: 5,
//       borderRadius: 5,
//       borderRadius: 5,
//       listeners: {
//         // This event listener is triggered after the labels are drawn
//         render: (args) => {
//           const { ctx, dataIndex, dataset, element, fullData } = args;
//           const meta = dataset._meta[Object.keys(dataset._meta)[0]];
//           const elementModel = meta.data[dataIndex]._model;

//           // Custom arrow drawing logic here
//           const startX = elementModel.x;
//           const startY = elementModel.y;
//           const endX = startX - 50; // Adjust the length of the arrow
//           const endY = startY - 50; // Adjust the length of the arrow

//           // Draw arrow
//           ctx.save();
//           ctx.beginPath();
//           ctx.moveTo(startX, startY);
//           ctx.lineTo(endX, endY);
//           ctx.lineWidth = 2;
//           ctx.strokeStyle = 'white';
//           ctx.stroke();
//           ctx.restore();
//         },
//       },
//     }
//   },

//   };

//   const nestedChartOptions2 = {
//     onHover: (event, elements) => handleBarHover2(event, chartRef.current),

//     layout: {
//       padding: {
//         top: 0,    // Adjust the top padding as needed
//         bottom: 10, // Adjust the bottom padding as needed
//         left: 10,   // Adjust the left padding as needed
//         right: 0,  // Adjust the right padding as needed
//       },
//     },
//     plugins:{
//       legend:{
//           display:true,
//           position: 'right',
//           align: 'center',
//           labels: {
//             boxWidth: 10, // Adjust as needed
//           },
//     },
//     datalabels: {
//       display: true,
//       color: "white",
//     //   formatter: (Math.round(data.map((item) => item.value))),
//     formatter: (value, context) => {
//         const label = context.chart.data.labels[context.dataIndex];
//         let sum = 0;
//                 let dataArr = context.chart.data.datasets[0].data;
//                 dataArr.map(data => {
//                     sum += data;
//                 });
//                 let percentage = (value*100 / sum).toFixed(0);
//                 return value !== 0 ? `${value} \n (${percentage}%)` : null;

//       },


//       align: "start",
//       anchor:'end',
//       offset:0,
//       textAlign: 'center',
//       clip: true,
//       borderRadius: 5,
//       backgroundColor: 'rgba(0, 0, 0, 0.8)', // Customize background color
//       borderColor: 'rgba(255, 255, 255, 0.8)', // Customize border color
//       borderWidth: 1,
//       padding: 5,
//       borderRadius: 5,
//       borderRadius: 5,
//     }
//   },
//   };

//   const nestedChartOptions3 = {
//     onHover: (event, elements) => handleBarHover3(event, chartRef.current),
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
//       chartRef.current.chartInstance.options.plugins.tooltip.onHover = handleBarHover1;
//       chartRef.current.chartInstance.options.plugins.tooltip.callbacks.label = (item) => {
//         const label = data[item.index]?.label;
//         return label;
//       };
//       const labels = chartRef.current.chartInstance.data.labels;
//       const values = chartRef.current.chartInstance.data.datasets[0].data;
//       const formattedLabels = labels.map((label, index) => {
//         const value = values[index];
//         const percentage = ((value * 100) / values.reduce((acc, val) => acc + val, 0)).toFixed(2) + '%';
//         return `${breakLabel(label)}: ${value} (${percentage})`;
//       });

//       // Update state with formatted labels
//       setFormattedLabels(formattedLabels);
//     }
//   }, [handleBarHover1]);


//   useEffect(() => {
//     // Reset hovered label when leaving the component
//     return () => {
//       setHoveredLabel(null);
//     };
//   }, []);

//   return (
//     <div>
//       {/* Add styles for full-screen appearance */}
//       <button onClick={onCloseFullScreen}>Minimize</button>
//       {/* Your full-screen pie chart component here */}
//       <div style={{ marginTop:'5px', textAlign: 'center', width: '100%', overflowX: 'auto', height: '100%', backgroundColor: 'rgba(255, 255, 255, 0.0)', borderRadius: '10px', padding: '15px' }}
//       onClick={handleMouseLeave}>   
//         {showChart ? (
//       <div style={{ display:'flex',flexDirection:'row', marginTop:'5px', textAlign: 'left', width: '98%', overflowX: 'auto', height: '98%', backgroundColor: 'rgba(255, 255, 255, 0.0)', borderRadius: '10px', padding: '15px' }} >  
//       <Pie  id="mychart" style={{height:"100%",width:"100%"}} ref={chartRef} data={chartData} options={nestedChartOptions1} />  

//        </div>
//       ) : (
//         <React.Fragment>

//       {nestedData1 &&(

//         <div style={{ display:'flex',flexDirection:'row', marginTop:'5px', textAlign: 'left', width: '100%', overflowX: 'auto', height: '98%', backgroundColor: 'rgba(255, 255, 255, 0.0)', borderRadius: '10px', padding: '15px' }} >      

//            <div style={{ width:'90%' }}>
//           <Pie id="mychart1" style={{height:"90%",width:"100%"}} data={{
//               labels: nestedData1.map((item) => (item.label)),
//               datasets: [
//                 {
//                   //label: 'Level 2 Chart',
//                   //backgroundColor: 'rgba(0, 0, 255, 0.6)',
//                   backgroundColor: generateColors(data.length),

//                   //backgroundColor: 'linear-gradient(to top,#6B5CD1,#1E58EF)',
//                   // borderColor: 'rgba(255, 0, 255, 1)',
//                   // borderWidth: 1,
//                   data: nestedData1.map((item) => item.value),
//                 },
//               ],
//             }}
//             options={nestedChartOptions2}                
//           />  
//           </div>
//           <div style={{ width:'10%' }}>
//           <button onClick={handleBackButtonClick} style={{ marginBottom: '10px',width:'100%' }}>Back</button>
//           </div>
//         </div>
//       )}
//       </React.Fragment>
//       )}

//       {clickedLabel && (
//         <div style={{ position: 'fixed', top: '80%', left: '50%', transform: 'translate(-50%, -50%)', backgroundColor: 'rgba(255, 255, 255, 0.8)', padding: '20px', borderRadius: '10px', textAlign: 'center' }} onClick={() => setClickedLabel(null)}>
//           {clickedLabel}
//         </div>
//       )}
//     </div>
//     </div>
//   );
// };
const MultiLevelPieChart = ({ data, onCloseChart }) => {
  const [nestedData1, setNestedData1] = useState(null);
  const [nestedData2, setNestedData2] = useState(null);
  const [nestedData3, setNestedData3] = useState(null);
  const chartRef = useRef(null);
  const [showPopup, setShowPopup] = useState(false); //new state for popup visibility
  const [showChart, setShowChart] = useState(true);
  const [hoveredLabel, setHoveredLabel] = useState(null);
  const [clickedLabel, setClickedLabel] = useState(null);
  const [formattedLabels, setFormattedLabels] = useState([]);
  const [isFullScreen, setIsFullScreen] = useState(false);


  console.log("Entered Multilevel chart");
  console.log("Nested data", data);

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
  const breakLabel = (label) => {
    const words = label.split(" ");
    if (words.length > 1) {
      const halfIndex = Math.ceil(words.length / 2);
      const firstLine = words.slice(0, halfIndex).join(" ");
      const secondLine = words.slice(halfIndex).join(" ");
      return [firstLine, secondLine];
    }
    return [label];
  };
  const truncateLabel = (label, maxLength = 15) => {
    const words = label.split(" ");
    if (words.length > 2) {
      const truncatedLabel = `${words[0]} ... ${words[words.length - 1]}`;
      return truncatedLabel.length > maxLength
        ? truncatedLabel.substring(0, maxLength) + "..."
        : truncatedLabel;
    }
    return label;
  };
  const generateColors = (count) => {
    // You can implement your own logic to generate colors
    // This is a simple example, you might want to use a library like 'randomcolor'
    const colors = [];
    for (let i = 0; i < count; i++) {
      colors.push(`rgba(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, 0.7)`);
    }
    return colors;
  };
  const toggleFullScreen = () => {
    const element = document.documentElement;

    if (!isFullScreen) {
      if (element.requestFullscreen) {
        element.requestFullscreen();
      } else if (element.mozRequestFullScreen) {
        element.mozRequestFullScreen();
      } else if (element.webkitRequestFullscreen) {
        element.webkitRequestFullscreen();
      } else if (element.msRequestFullscreen) {
        element.msRequestFullscreen();
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
      } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
      } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
      }
    }

    setIsFullScreen(!isFullScreen);
  };

  // const toggleFullScreen = () => {
  //   setIsFullScreen(!isFullScreen);
  // };

  const onCloseFullScreen = () => {
    setIsFullScreen(false);
  };
  const handleBarHover1 = (event, chart) => {
    if (chart && chart.getElementsAtEventForMode) {
      const activePoints = chart.getElementsAtEventForMode(event, 'nearest', { intersect: true }, false, false);

      if (activePoints.length > 0) {
        const selectedIndex = activePoints[0].index;
        const hoveredData = data[selectedIndex]?.level2;
        // const hoveredData = data[selectedIndex]?.nestedData;
        const hoveredLabel = data[selectedIndex]?.label;
        handleLabelHover(hoveredLabel);
        console.log("hvd1", hoveredData);

        if (hoveredData) {
          setNestedData1(hoveredData);
          setNestedData2(null); // Reset level 2 data
          setNestedData3(null); // Reset level 3 data
          setShowPopup(true); //show popup on hover 
          setShowChart(false);
        }
        else {
          // If there is no level 2 data, reset everything
          setNestedData1(null);
          setNestedData2(null);
          setNestedData3(null);
          setShowPopup(false);
          setShowChart(true);
        }
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
    console.log('chartRef.current:', chartRef.current); // Log chartRef for debugging

    if (chartRef.current && chartRef.current.chartInstance) {
      const activePoints = chartRef.current.chartInstance.getElementsAtEventForMode(event, 'nearest', { intersect: true }, false, false);
      // const activePoints = chart.getElementsAtEventForMode(event, 'nearest', { intersect: true }, false, false);

      if (activePoints.length > 0) {
        const selectedIndex = activePoints[0].index;
        const hoveredData = nestedData1?.[selectedIndex]?.level3;
        // const hoveredData = nestedData1[selectedIndex]?.nestedData;
        const hoveredLabel = nestedData1?.[selectedIndex]?.label;
        handleLabelHover(hoveredLabel);
        console.log("hvd2", hoveredData)

        if (hoveredData) {
          setNestedData2(hoveredData);
          setNestedData3(null); // Reset level 3 data
        }
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
      console.log("hvd3", hoveredData)

      if (hoveredData) {
        setNestedData3(hoveredData);
      }
    }
  };
  console.log('nestedData1', nestedData1)
  console.log('nestedData2', nestedData2)
  console.log('nestedData3', nestedData3)

  const handleBackButtonClick = () => {
    // Reset level 2 data and show the level 1 chart
    setNestedData1(null);
    setShowChart(true);
  };

  const chartData = {
    labels: data.map((item) => (item.label)),
    datasets: [
      {
        // label: 'Main Chart',
        //backgroundColor: 'rgba(0, 0, 255, 0.6)',
        // backgroundColor: 'rgba(30,88, 239, 0.9)',
        // backgroundColor: 'rgba(65, 67, 82, 1)',
        // backgroundColor: 'rgba(135, 116, 255,0.9)',
        // // borderColor: 'rgba(255, 0, 255, 1)',
        // borderWidth: 1,
        backgroundColor: generateColors(data.length),
        position: 'absolute',
        left: '50%',
        top: '50%',
        transform: 'translate(-50%, -50%)',
        width: '100px', // Adjust this value to control arrow length
        height: '20px', // Adjust this value to control arrow width
        background: 'rgba(255, 255, 255, 0.7)', // Same as borderColor in options
        clipPath: 'polygon(50% 0%, 100% 100%, 0% 100%)', // Triangle shape
        zIndex: 10,
        pointerEvents: 'none', // Allow interactions with the chart behind

        data: data.map((item) => item.value),
      },
    ],
  };

  const nestedChartOptions1 = {
    onClick: (event, elements) => handleBarHover1(event, chartRef.current),
    plugins: {

      legend: {
        display: true,
        position: 'right',
        align: 'center',
        labels: {
          boxWidth: 10, // Adjust as needed
          fontColor: "#FFFFFF",
          color: "#FFFFFF",
        },
      },
      datalabels: {
        display: true,
        color: "white",
        //   formatter: (Math.round(data.map((item) => item.value))),
        formatter: (value, context) => {

          const label = context.chart.data.labels[context.dataIndex];
          let sum = 0;
          let dataArr = context.chart.data.datasets[0].data;
          dataArr.map(data => {
            sum += data;
          });
          let percentage = (value * 100 / sum).toFixed(0);
          return value !== 0 ? `${value} \n (${percentage}%)` : null;
          // return `${breakLabel(label)}: ${value} (${percentage}%)`;
          // return `${label}: ${value}%`; // Customize the output as needed
        },

        // formatter: (value, context) => {
        //     const label = context.chart.data.labels[context.dataIndex];
        //     const nestedItem = nestedData1 ? nestedData1.find(item => (item.label) === label) : null;
        //     return nestedItem ? nestedItem.label : '';
        //   },
        align: "start",
        anchor: 'end',
        offset: -60,
        textAlign: 'center',
        clip: true,
        borderRadius: 5,
        backgroundColor: 'rgba(0, 0, 0, 0.8)', // Customize background color
        borderColor: 'rgba(255, 255, 255, 0.8)', // Customize border color
        borderWidth: 1,
        padding: 5,
        cursor: "pointer",
        borderRadius: 5,
        borderRadius: 5,
        listeners: {
          // This event listener is triggered after the labels are drawn
          render: (args) => {
            const { ctx, dataIndex, dataset, element, fullData } = args;
            const meta = dataset._meta[Object.keys(dataset._meta)[0]];
            const elementModel = meta.data[dataIndex]._model;

            // Custom arrow drawing logic here
            const startX = elementModel.x;
            const startY = elementModel.y;
            const endX = startX - 50; // Adjust the length of the arrow
            const endY = startY - 50; // Adjust the length of the arrow

            // Draw arrow
            ctx.save();
            ctx.beginPath();
            ctx.moveTo(startX, startY);
            ctx.lineTo(endX, endY);
            ctx.lineWidth = 2;
            ctx.strokeStyle = 'white';
            ctx.stroke();
            ctx.restore();
          },
        },
      }
    },

  };
  const filteredData = nestedData1 && Array.isArray(nestedData1)
    ? nestedData1.filter(item => item && item.value !== 0)
    : [];

  const filteredLabels = filteredData.map(item => item.label);
  nestedChartOptions1.plugins.legend.labels.labels = filteredLabels;

  const nestedChartOptions2 = {
    onHover: (event, elements) => handleBarHover2(event, chartRef.current),
    // scales: {
    //   x: {
    //     beginAtZero: true,

    //   },
    //   y: {
    //     offset: true,
    //   },
    // },
    layout: {
      padding: {
        top: 0,    // Adjust the top padding as needed
        bottom: 10, // Adjust the bottom padding as needed
        left: 10,   // Adjust the left padding as needed
        right: 0,  // Adjust the right padding as needed
      },
    },
    plugins: {
      legend: {
        display: true,
        position: 'right',
        align: 'center',
        labels: {
          boxWidth: 10, // Adjust as needed
          fontColor: '#FFFFFF',
          color: "#FFFFFF",
        },
      },
      datalabels: {
        display: true,
        color: "white",
        //   formatter: (Math.round(data.map((item) => item.value))),
        formatter: (value, context) => {
          const label = context.chart.data.labels[context.dataIndex];
          let sum = 0;
          let dataArr = context.chart.data.datasets[0].data;
          dataArr.map(data => {
            sum += data;
          });
          let percentage = (value * 100 / sum).toFixed(0);
          return value !== 0 ? `${value} \n (${percentage}%)` : null;
          // return `${breakLabel(label)}: ${value} (${percentage}%)`;
          // return `${label}: ${value}%`; // Customize the output as needed
        },

        // formatter: (value, context) => {
        //     const label = context.chart.data.labels[context.dataIndex];
        //     const nestedItem = nestedData1 ? nestedData1.find(item => (item.label) === label) : null;
        //     return nestedItem ? nestedItem.label : '';
        //   },
        align: "start",
        anchor: 'end',
        offset: 0,
        textAlign: 'center',
        clip: true,
        borderRadius: 5,
        backgroundColor: 'rgba(0, 0, 0, 0.8)', // Customize background color
        borderColor: 'rgba(255, 255, 255, 0.8)', // Customize border color
        borderWidth: 1,
        padding: 5,
        borderRadius: 5,
        borderRadius: 5,
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
        offset: true,
      },
    },
  };




  // useEffect(() => {
  //   if (chartRef.current && chartRef.current.chartInstance) {
  //     chartRef.current.chartInstance.options.hover.onHover = handleBarHover1;
  //   }
  // }, [handleBarHover1]);
  // useEffect(() => {
  //   if (chartRef.current && chartRef.current.chartInstance) {
  //     chartRef.current.chartInstance.options.plugins.tooltip.onHover = handleBarHover1;
  //   }
  // }, [handleBarHover1]);
  useEffect(() => {
    if (chartRef.current && chartRef.current.chartInstance) {
      chartRef.current.chartInstance.options.plugins.tooltip.onHover = handleBarHover1;
      chartRef.current.chartInstance.options.plugins.tooltip.callbacks.label = (item) => {
        const label = data[item.index]?.label;
        return label;
      };
      const labels = chartRef.current.chartInstance.data.labels;
      const values = chartRef.current.chartInstance.data.datasets[0].data;
      const formattedLabels = labels.map((label, index) => {
        const value = values[index];
        const percentage = ((value * 100) / values.reduce((acc, val) => acc + val, 0)).toFixed(2) + '%';
        return `${breakLabel(label)}: ${value} (${percentage})`;
      });

      // Update state with formatted labels
      setFormattedLabels(formattedLabels);
    }
  }, [handleBarHover1]);


  useEffect(() => {
    // Reset hovered label when leaving the component
    return () => {
      setHoveredLabel(null);
    };
  }, []);

  return (
    <div style={{ marginTop: '5px', textAlign: 'center', width: '100%', height: '100%', backgroundColor: 'rgba(255, 255, 255, 0.0)', borderRadius: '10px' }}
      onClick={handleMouseLeave}>
      {showChart ? (
        <div>

          <div style={{ marginTop: '5px', textAlign: 'right', width: '98%', height: '450px', backgroundColor: 'rgba(255, 255, 255, 0.0)', borderRadius: '10px', paddingRight: '10px' }} >
            <p className='b-u-r-ct1-header1'>Ticket Count by Level 1 Business Process</p>
            <div style={{ marginTop: '-20px' }}>
              <button onClick={toggleFullScreen}>
                {isFullScreen ? <img style={{ width: '10px', height: '10px' }} src={minimize} /> : <img style={{ width: '10px', height: '10px' }} src={fullscreen} />}
              </button>
            </div>

            <Pie id="mychart" style={{ height: "420px", width: "480px", display: 'flex', paddingLeft: '50px' }} ref={chartRef} data={chartData} options={nestedChartOptions1} />

          </div>
        </div>
      ) : (
        <React.Fragment>

          {nestedData1 && (
            <div>

              <div style={{ display: 'flex', flexDirection: 'column', marginTop: '5px', textAlign: 'left', width: '100%', height: '450px', backgroundColor: 'rgba(255, 255, 255, 0.0)', borderRadius: '10px', padding: '15px' }} >
                <div style={{ display: 'flex', flexDirection: 'row' }}>
                  <p className='b-u-r-ct1-header1'>Ticket Count by Level 2 Business Process</p>
                  <div style={{ marginLeft: '250px' }}>
                    <button onClick={handleBackButtonClick} style={{ marginBottom: '10px' }}><img style={{ width: '10px', height: '10px' }} src={back} /></button>
                  </div>
                  <div style={{ marginTop: '0px', marginLeft: '2px' }}>
                    <button onClick={toggleFullScreen}>
                      {isFullScreen ? <img style={{ width: '10px', height: '10px' }} src={minimize} /> : <img style={{ width: '10px', height: '10px' }} src={fullscreen} />}
                    </button>
                  </div>
                </div>
                <div style={{ width: '90%' }}>
                  <Pie id="mychart1" style={{ height: "400px", width: "470px", paddingLeft: '50px' }} data={{
                    labels: nestedData1.map((item) => (item.label)),
                    datasets: [
                      {
                        //label: 'Level 2 Chart',
                        //backgroundColor: 'rgba(0, 0, 255, 0.6)',
                        backgroundColor: generateColors(data.length),

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

              </div>
            </div>
          )}
        </React.Fragment>
      )}
      {/* style={{with:'420px',height:'420px'}} */}
      {/* backgroundColor: 'rgba(43, 46, 68, 1)', */}
      {clickedLabel && (
        <div style={{ position: 'fixed', top: '80%', left: '50%', transform: 'translate(-50%, -50%)', backgroundColor: 'rgba(255, 255, 255, 0.8)', padding: '20px', borderRadius: '10px', textAlign: 'center' }} onClick={() => setClickedLabel(null)}>
          {clickedLabel}
        </div>
      )}
    </div>
  );
};

export default MultiLevelPieChart;

//   {/* {nestedData2 && showChart &&(
//     <div style={{ position: 'fixed', top: '25%', left: '30%', transform: 'translate(-50%, -50%)', backgroundColor: 'rgba(255, 255, 255, 0.8)', padding: '20px', borderRadius: '10px',width:'500px' ,height:'230px'}} onCloseChart={handleCloseChart}>
//       <Bar
//         data={{
//           labels: nestedData2.map((item) => abbreviateLabel(item.label)),
//           datasets: [
//             {
//               label: 'Level 3 Chart',
//               backgroundColor: 'rgba(0, 255, 0, 0.6)',
//               borderColor: 'rgba(255, 0, 0, 1)',
//               borderWidth: 1,
//               data: nestedData2.map((item) => item.value),
//             },
//           ],
//         }}
//         options={nestedChartOptions3}
//       />
//     </div>
//   )} */}
//   {/* {nestedData3 && showChart &&(
//     <div style={{ position: 'fixed', top: '40%', left: '30%', transform: 'translate(-50%, -50%)', backgroundColor: 'rgba(255, 255, 255, 0.8)', padding: '20px', borderRadius: '10px' }} onCloseChart={handleCloseChart}>
//       <Bar
//         data={{
//           labels: nestedData3.map((item) => abbreviateLabel(item.label)),
//           datasets: [
//             {
//               label: 'Level 4 Chart',
//               backgroundColor: 'rgba(255, 0, 0, 0.6)',
//               borderColor: 'rgba(0, 0, 255, 1)',
//               borderWidth: 1,
//               data: nestedData3.map((item) => item.value),
//             },
//           ],
//         }}
//       />
//     </div>
//   )} */}
//   {/* {clickedLabel && (
//     <div style={{ position: 'fixed', top: '80%', left: '50%', transform: 'translate(-50%, -50%)', backgroundColor: 'rgba(255, 255, 255, 0.8)', padding: '20px', borderRadius: '10px', textAlign: 'center' }} onClick={() => setClickedLabel(null)}>
//       {clickedLabel}
//     </div>
//   )}
// </div> */}
// <div style={{ marginLeft: '10px', textAlign: 'center', width: '622px', overflowX: 'auto', height: '230px', backgroundColor: 'rgba(255, 255, 255, 0.1)', borderRadius: '10px', padding: '15px' }} */}
//   {/* //   onMouseLeave={() => setHoveredLabel(null)}>
//   //   <Bar
//   //     ref={chartRef}
//   //     data={chartData}
//   //     options={{
//   //       ...nestedChartOptions1,
//   //       plugins: {
//   //         legend: {
//   //           display: true,
//   //           labels: {
//   //             filter: function (legendItem, chartData) {
//   //               return legendItem.datasetIndex === 0;
//   //             },
//   //           },
//   //         },
//   //       },
//   //       onHover: (_, elements) => {
//   //         const hoveredElement = elements[0];
//   //         if (hoveredElement) {
//   //           const index = hoveredElement.index;
//   //           handleLabelHover(data[index]?.label);
//   //         } else {
//   //           handleLabelHover(null);
//   //         }
//   //       },
//   //     }}
//   //   />
//   //   {hoveredLabel && (
//   //     <div
//   //       style={{
//   //         textDecoration: 'underline',
//   //         textDecorationStyle: 'dashed',
//   //         cursor: 'pointer',
//   //       }}
//   //       onClick={() => handleLabelClick(hoveredLabel)}
//   //     >
//   //       {hoveredLabel}
//   //     </div>
//   //   )}
//   //   {clickedLabel && (
//   //     <div
//   //       style={{
//   //         position: 'fixed',
//   //         top: '80%',
//   //         left: '50%',
//   //         transform: 'translate(-50%, -50%)',
//   //         backgroundColor: 'rgba(255, 255, 255, 0.8)',
//   //         padding: '20px',
//   //         borderRadius: '10px',
//   //         textAlign: 'center',
//   //       }}
//   //       onClick={() => setClickedLabel(null)}
//   //     >
//   //       {clickedLabel}
//   //     </div>
//   //   )}
//   // </div>
// //   <div style={{ marginLeft: '10px', textAlign: 'center', width: '622px', overflowX: 'auto', height: '230px', backgroundColor: 'rgba(255, 255, 255, 0.1)', borderRadius: '10px', padding: '15px' }}>
// //   <Bar
// //     ref={chartRef}
// //     data={chartData}
// //     options={{
// //       ...nestedChartOptions1,
// //       plugins: {
// //         legend: {
// //           display: false,
// //         },
// //       },
// //       onHover: (_, elements) => {
// //         const hoveredElement = elements[0];
// //         if (hoveredElement) {
// //           const index = hoveredElement.index;
// //           handleLabelClick(data[index]?.label);
// //         }
// //       },
// //     }}
// //   />
// //   {clickedLabel && (
// //     <div
// //       style={{
// //         textDecoration: 'underline',
// //         textDecorationStyle: 'dashed',
// //         cursor: 'pointer',
// //         marginTop: '10px', // Adjust spacing
// //       }}
// //       onClick={() => setClickedLabel(null)}
// //     >
// //       {clickedLabel}
// //     </div>
// //   )}
// // </div> */}


{/* <button onClick={toggleFullScreen}>
        {isFullScreen ? 'Minimize' : 'Full Screen'}
      </button> */}


{/* {nestedData1 ? (
  <React.Fragment>
    
    {nestedData1 &&(
        
        <div style={{ display:'flex',flexDirection:'row', marginTop:'5px',marginLeft: '100px', textAlign: 'center', width: '665px', overflowX: 'auto', height: '450px', backgroundColor: 'rgba(255, 255, 255, 0.0)', borderRadius: '10px', padding: '15px' }} >      
        
           <div>
          <Pie data={{
              labels: nestedData1.map((item) => (item.label)),
              datasets: [
                {
                  //label: 'Level 2 Chart',
                  //backgroundColor: 'rgba(0, 0, 255, 0.6)',
                  backgroundColor: generateColors(data.length),
                  
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
          <div>
          <button onClick={handleBackButtonClick} style={{ marginBottom: '10px' }}>Back</button>
          </div>
        </div>
      )}
    
  </React.Fragment>
) : (
  <Pie ref={chartRef} data={chartData} options={nestedChartOptions1} />    
)} */}

