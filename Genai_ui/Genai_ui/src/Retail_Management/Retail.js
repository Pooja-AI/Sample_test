import React, { useState, useRef } from 'react';
import { Viewer } from '@react-pdf-viewer/core';
import '@react-pdf-viewer/core/lib/styles/index.css';
import { Worker } from '@react-pdf-viewer/core';
import '@react-pdf-viewer/core/lib/styles/index.css';
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';
import Chatbot from './Chatbot';
import close1 from '../images/Group 3206.svg';
// import './SOP_NewUI/SOP_New.css';
import { Bar } from "react-chartjs-2";
import { Line } from "react-chartjs-2";
import like from "../images/Icon-Like.svg";
import dislike from "../images/Icon-DisLike.svg";
import share from "../images/Group 3306.svg";
import copy from "../images/Union.svg";
import { PieChart, Pie, Tooltip, Legend, Cell } from "recharts";

function Retail(props) {
  const [showSecondColumn, setShowSecondColumn] = useState(false);
  const [pdfData, setPdfData] = useState(null);
  const [loading, setLoading] = useState(true);

  const handleButtonClick1 = async (path) => {
    try {
      await fetch(props.getpdf_endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ filepath: path }),
      })
        .then(res => res.blob())
        .then(blob => {
          const reader = new FileReader();
          reader.onload = () => {
            setPdfData(reader.result);
            setLoading(false);
          };
          reader.readAsDataURL(blob);
          setShowSecondColumn(true);
        });
    } catch (error) {
      console.error('Error loading PDF:', error);
    }
  };

  const renderchatResponse = (message) => {
    scrollToBottom();
    console.log(message);
    if (message.user) {
      return (
        <div className="user-message-v">
          <span>{message.message}</span>
        </div>
      );
    }
    else if (message.message == "Hi! How can I assist you today?") {
      return (
        <div className="user-message-v">
          <span>{message.message}</span>
        </div>
      );
    }
    else if (message.message && message.message[0].Exception) {
      return (
        <div className="bot-text-response-d">
          <span>{message.message[0].Exception}</span>
        </div>
      );
    }
    else {
      if (message && message.message && !message.message.Exception) {

        const response1 = message.message;
        const response = JSON.parse(response1)
        console.log(response)
        if (response && response.table && response.table.data) {
          const columns = response.table.columns;
          const tableRows = response.table.data;
          return (

            <div className="bot-table-response-d">
              <div className="bot-text-response-d">
                <span>{response.analysis}</span>
              </div>
              <table className="mytable-d">
                <thead>
                  <tr>
                    {columns.map((column, index) => (
                      <th key={index}>{column}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {tableRows.map((row, rowIndex) => (
                    <tr key={rowIndex}>
                      {row.map((cell, cellIndex) => (
                        <td key={cellIndex}>{cell}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          );
        }
        else if (response && response.answer) {
          return (
            <div className="bot-text-response-d">
              <span>{response.answer}</span>
            </div>
          );
        }
        else if ("bar" in response && response.bar.data) {
          const barData = response.bar;
          // scrollToBottom();
          if (barData && barData.data) {
            const labels = barData.data.map((item) => item[0]);
            const data = barData.data.map((item) => item[1]);
            const dataset = {
              labels: labels,
              datasets: [
                {
                  label: barData.columns[1],
                  data: data,
                  fill: false,
                  // backgroundColor: 'rgba(75, 192, 192, 0.2)', // Bar color
                  // borderColor: 'rgba(75, 192, 192, 1)',
                  // backgroundColor: 'rgba(253,198,35,0.5)', // Bar color
                  backgroundColor: "rgb(135, 116, 255)",
                  // borderColor: "rgba(0,42,255,1)",
                  borderWidth: 2,
                  barPercentage: 0.5,
                },
              ],
            };
            // Chart options
            // <CartesianGrid stroke="rgba(65, 67, 82, 1)" />
            const options = {
              scales: {
                x: {
                  beginAtZero: true,
                  strokeDasharray: "rgba(65, 67, 82, 1)",
                  ticks: {
                    color: "white",
                    fontSize: 10,
                    fontWeight: 100,
                  },
                  type: "category", // For horizontal bar charts, use 'category' scale for x-axis
                  title: {
                    display: true,
                    text: barData.columns[0], // X-axis label
                    font: {
                      weight: "bold", // Make the text bold
                    },
                  },
                  grid: {
                    display: true,
                    color: "rgba(65, 67, 82, 1)", // Remove grid lines on the x-axis
                  },
                },
                y: {
                  beginAtZero: true,
                  strokeDasharray: "rgba(65, 67, 82, 1)",
                  ticks: {
                    color: "white",
                    fontSize: 10,
                    fontWeight: 100,
                  },
                  type: "linear", // Use 'linear' scale for y-axis
                  title: {
                    display: true,
                    text: barData.columns[1], // X-axis label
                    font: {
                      weight: "bold", // Make the text bold
                    },
                  },
                  grid: {
                    display: true,
                    color: "rgba(65, 67, 82, 1)", // Remove grid lines on the x-axis
                  },
                },
              },
            };
            const chartContainerStyle = {
              backgroundColor: "rgba(45, 50, 90, 1)",
              padding: "10px",
              borderRadius: 10,
              width: "450px", // Set the width of the chart
              height: "230px", // Set the height of the chart // Add padding to the chart container
            };
            // Render the bar chart as you did before
            return (
              <>
                <div
                  className="bot-chart-response-d"
                  style={chartContainerStyle}
                >
                <div className="bot-text-response-d">
                  <span>{response.analysis}</span>
                </div>
                  
                  <div>
                    {/* <h2>Bar Chart:</h2> */}
                    <Bar data={dataset} options={options} />
                  </div>
                </div>
                <div className='message-footer' style={{ minWidth: "500px" }}>
                  <div className='col-sm-6' style={{ display: "flex", flexDirection: "row" }}>
                    Token :<p style={{ marginLeft: "10px", color: "rgba(216, 172, 27, 1)" }}>55</p>
                    <p className='border-score'>Confidence score :</p> <p style={{ marginLeft: "10px", color: "rgba(216, 172, 27, 1)" }}>90%</p></div>
                  <div className='col-sm-6'>
                    <img className='msg-icon-copy' src={copy} alt='Sample' />
                    <img className='msg-icon-share' src={share} alt='Sample' />
                    <img className='msg-icon' src={dislike} alt='Sample' />
                    <img className='msg-icon' src={like} alt='Sample' />
                  </div>
                </div>
              </>
            );
          }
        }
        else if ("line" in response && response.line.data) {
          const lineData = response.line;
          scrollToBottom();
          if (lineData && lineData.data) {
            const labels2 = lineData.data.map((item) => item[0]);
            const data2 = lineData.data.map((item) => item[1]);
            const dataset = {
              labels: labels2,
              datasets: [
                {
                  label: lineData.columns[1],
                  data: data2,
                  fill: false,
                  borderColor: "rgb(135, 116, 255)",
                  borderWidth: 3,
                },
              ],
            };
            // Chart options
            const options = {
              scales: {
                x: {
                  beginAtZero: true,
                  strokeDasharray: "rgba(65, 67, 82, 1)",
                  ticks: {
                    color: "white",
                    fontSize: 10,
                    fontWeight: 100,
                  },
                  type: "category", // For horizontal bar charts, use 'category' scale for x-axis
                  title: {
                    display: true,
                    text: lineData.columns[0], // X-axis label
                    font: {
                      weight: "bold", // Make the text bold
                    },
                  },
                },
                y: {
                  beginAtZero: true,
                  strokeDasharray: "rgba(65, 67, 82, 1)",
                  ticks: {
                    color: "white",
                    fontSize: 10,
                    fontWeight: 100,
                  },
                  type: "linear", // Use 'linear' scale for y-axis
                  title: {
                    display: true,
                    text: lineData.columns[1], // X-axis label
                    font: {
                      weight: "bold", // Make the text bold
                    },
                  },
                  grid: {
                    display: true,
                    color: "rgba(65, 67, 82, 1)", // Remove grid lines on the x-axis
                  },
                },
              },
            };
            const chartContainerStyle = {
              backgroundColor: "rgba(45, 50, 90, 1)",
              padding: "10px",
              borderRadius: 10,
              width: "400px", // Set the width of the chart
              height: "200px", // Set the height of the chart// Add padding to the chart container
            };
            // Render the line chart as you did before
            return (
              <>
                <div
                  className="bot-chart-response-d"
                  style={chartContainerStyle}
                >
                  <div>
                    {/* <h2>Line Chart:</h2> */}
                    <Line data={dataset} options={options} />
                  </div>
                </div>
                <div className='message-footer' style={{ minWidth: "500px" }}>
                  <div className='col-sm-6' style={{ display: "flex", flexDirection: "row" }}>
                    Token :<p style={{ marginLeft: "10px", color: "rgba(216, 172, 27, 1)" }}>55</p>
                    <p className='border-score'>Confidence score :</p> <p style={{ marginLeft: "10px", color: "rgba(216, 172, 27, 1)" }}>90%</p></div>
                  <div className='col-sm-6'>
                    <img className='msg-icon-copy' src={copy} alt='Sample' />
                    <img className='msg-icon-share' src={share} alt='Sample' />
                    <img className='msg-icon' src={dislike} alt='Sample' />
                    <img className='msg-icon' src={like} alt='Sample' />
                  </div>
                </div>

              </>
            );
          }
        }

        else if ("pie" in response && response.pie.data) {
          const pieData = response.pie;
          if (pieData && pieData.data) {
            const chartData = pieData.data.map((item) => ({
              name: item[0],
              value: item[1],

            }));
            console.log(chartData);

            const colors = [
              "#8884d8",
              "rgba(99, 31, 225, 0.826)",
              "#ffc658",
              "#82ca9d",
              "rgba(51, 184, 237, 0.712)",
              "green",
              "yellow",
            ];
            return (
              <>
                <div className="bot-chart-response-d">
                <div className="bot-text-response-d">
                  <span>{response.analysis}</span>
                </div>
                  <PieChart width={350} height={250}>
                    <Pie
                      dataKey="value"
                      fontSize={"10px"}
                      isAnimationActive={false}
                      data={chartData}
                      cx={150}
                      cy={100}
                      outerRadius={70}
                      innerRadius={30}
                      labels
                    >
                      {chartData.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={colors[index % colors.length]}
                        />
                      ))}
                    </Pie>
                    <Legend
                      wrapperStyle={{
                        marginLeft: "20px",
                        backgroundColor: "transparent",
                        fontSize: "10px",
                        borderRadius: 3,
                        lineHeight: "20px",
                      }}
                    />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "#f5f5f5",
                        fontSize: "10px",
                        borderRadius: 10,
                        padding: "10px",
                      }}
                    />
                  </PieChart>
                </div>
                <div className='message-footer' style={{ minWidth: "500px" }}>
                  <div className='col-sm-6' style={{ display: "flex", flexDirection: "row" }}>
                    Token :<p style={{ marginLeft: "10px", color: "rgba(216, 172, 27, 1)" }}>55</p>
                    <p className='border-score'>Confidence score :</p> <p style={{ marginLeft: "10px", color: "rgba(216, 172, 27, 1)" }}>90%</p></div>
                  <div className='col-sm-6'>
                    <img className='msg-icon-copy' src={copy} alt='Sample' />
                    <img className='msg-icon-share' src={share} alt='Sample' />
                    <img className='msg-icon' src={dislike} alt='Sample' />
                    <img className='msg-icon' src={like} alt='Sample' />
                  </div>
                </div>
              </>
            );
          }
        }
        else {
          const response_data = message.message;
          return (
            <div className="bot-text-response-d">
              <span>{response_data}</span>
            </div>
          );
        }
      } else {
        return null;
      }
    }
  };

  const scrollContainerRef = useRef(null);

  const scrollToBottom = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTop = scrollContainerRef.current.scrollHeight;
    }
  };
  const question = [
    "Provide sales performance that vary between different salespersons and store locations?",
    "Which products should I put on sale to reduce my inventory loss?",
    "What percentage of transactions involve the use of loyalty cards?",
    "Provide barchart for the distribution of sales by salesperson"
  ]
  const isModal = false;
  const isSOP = true;
  const initialScale = 40;
  const newPlugin = defaultLayoutPlugin()
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <div style={showSecondColumn ? { display: 'flex', height: '90vh', marginLeft: "5px", gap: "20px", margin: "auto" } : { height: '90vh', marginLeft: "13%" }}>
        <div style={{ marginBottom: "10px" }}>
          <Chatbot renderchatResponse={renderchatResponse} endpoint="http://98.64.169.5:5000/chatbot" questions={question} isSOP={isSOP} showSecondColumn={showSecondColumn} />
        </div>
      </div>
    </div>
  )
}

export default Retail