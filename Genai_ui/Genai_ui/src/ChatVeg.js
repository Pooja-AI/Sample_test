// import { useState, React, useEffect } from 'react'
import React, { useState, useEffect, useRef } from "react";
import "./ChatVeg.css";
import "./ChatbotV.css";
import botIcon from "./images/Group 3419.svg";
import send from "./images/send_FILL0_wght400_GRAD0_opsz24 1.svg";
import axios from "axios";
import { PieChart, Pie, Tooltip, Legend, Cell } from "recharts";
import mic from "./images/mic_FILL0_wght400_GRAD0_opsz24 1.svg";
import Popupchart from "./images/Group 3068.svg";
import chatbotIconSrc from "./images/Frame 2654.svg";
import userIconSrc from "./images/Group 3550.svg";
import question from "./images/Group 3593.svg";
import close from "./images/Group 3061.svg";
import like from "./images/Icon-Like.svg";
import dislike from "./images/Icon-DisLike.svg";
import share from "./images/Group 3306.svg";
import copy from "./images/Union.svg";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Bar } from "react-chartjs-2";
import { Line } from "react-chartjs-2";
import Chart from "chart.js/auto";
import VegetationQuest from "./VegetationQuest";
import './SOP.css';

function ChatVeg(props) {
  const [inputValue, setInputValue] = useState("");
  const [showTypingEffect, setShowTypingEffect] = useState(true);
  const [showLoader, setShowLoader] = useState(false);
  const [chatMessages, setChatMessages] = useState([
    { user: false, message: "Hi! How can I assist you today?", init: false }, // Default chatbot message
  ]);

  const scrollContainerRef = useRef(null);

  const TypingEffect = ({ text, onComplete }) => {
    const [displayText, setDisplayText] = useState('');
  
    useEffect(() => {
      let timeout;
      const displayTextArray = text.split('');
  
      const addCharacter = (index) => {
        setDisplayText((prevText) => prevText + displayTextArray[index]);
        if (index < displayTextArray.length - 1) {
          timeout = setTimeout(() => addCharacter(index + 1), 50); // Adjust the delay as needed
        } else {
          // Call onComplete when typing effect completes
          onComplete && onComplete();
        }
      };
  
      addCharacter(0);
  
      return () => clearTimeout(timeout);
    }, [text, onComplete]);
  
    return <span>{displayText}</span>;
  };

  const scrollToBottom = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTop =
        scrollContainerRef.current.scrollHeight;
    }
  };

  const handleSendMessage = () => {
    if (inputValue.trim() !== "") {
      handleUserMessage(inputValue);
      setInputValue("");
    }
  };
  const handleSendButtonClick = () => {
    // setShowTypingEffect(true);
    handleSendMessage();
    setInputValue("");
    
  };

  const renderchatResponse = (message, index, chatMessages) => {
    console.log(message);
    if (message.user) {
      return (
        <div className="user-message-v">
          <span>{message.message}</span>
        </div>
      );
    } else if (message.message == "Hi! How can I assist you today?") {
      return (
        <div className="user-message-v">
          {/* <span>{message.message}</span> */}
          {showTypingEffect && (index === chatMessages.length - 1) ? <TypingEffect text={message.message} onComplete={() => setShowTypingEffect(false)} /> : <span>{message.message}</span>}
        </div>
      );
    } else {
      if (message && message.message && message.message.response) {
        const response_data = message.message.response.response_data;
        const response_type = message.message.response.response_type;
        console.log(response_data);
        console.log(response_type);
        if (response_type === "answer") {
          console.log("answer");
          scrollToBottom();
          return (
            <>
            <div className="bot-text-response-d" style={{ marginBottom: "10px" }}>
              {/* <span>{response_data} </span> */}
              {/* <TypingEffect text={response_data} /> */}
              {showTypingEffect && (index === chatMessages.length - 1) ? <TypingEffect text={response_data} onComplete={() => setShowTypingEffect(false)} /> : <span>{response_data} </span>}
            </div>
            
            <div className='message-footer' style={{minWidth:"500px"}}>
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
        } else if (response_type === "table") {
          console.log("table");
          scrollToBottom();
          return (
            <div className="bot-text-response-d">
              {/* <span>Sure. Table is Ready!</span> */}
              <div>
              {showTypingEffect && (index === chatMessages.length - 1) ? <TypingEffect text={message.message.response.response_data.analysis} onComplete={() => setShowTypingEffect(false)} /> : <span>{message.message.response.response_data.analysis} </span>}
              </div>
            </div>
          );
        } else if (response_type === "graph") {
          if ("bar" in message.message.response.response_data) {
            console.log("bar");
            scrollToBottom();
            return (
              <div className="bot-text-response-d">
                {/* <span>Sure. bar graph is Ready!</span> */}
                <div>
                {showTypingEffect && (index === chatMessages.length - 1) ? <TypingEffect text={message.message.response.response_data.analysis} onComplete={() => setShowTypingEffect(false)} /> : <span>{message.message.response.response_data.analysis} </span>}
                </div>
              </div>
            );
          }

          if ("line" in message.message.response.response_data) {
            console.log("line");
            scrollToBottom();
            return (
              <div className="bot-text-response-d">
                {/* <span>Sure. line chart is Ready!</span> */}
                <div>
                {showTypingEffect && (index === chatMessages.length - 1) ? <TypingEffect text={message.message.response.response_data.analysis} onComplete={() => setShowTypingEffect(false)} /> : <span>{message.message.response.response_data.analysis} </span>}
                </div>
              </div>
            );
          }

          if ("pie" in message.message.response.response_data) {
            console.log("pie");
            scrollToBottom();
            return (
              <div className="bot-text-response-d">
                {/* <span>Sure. Pie chart is Ready!</span> */}
                <div>
                  {/* {message.message.response.response_data.analysis} */}
                  {showTypingEffect && (index === chatMessages.length - 1) ? <TypingEffect text={message.message.response.response_data.analysis} onComplete={() => setShowTypingEffect(false)} /> : <span>{message.message.response.response_data.analysis} </span>}
                </div>
              </div>
            );
          }

          // setShowTypingEffect(false);
        }

        //   else if (response_type === "graph") {
        //     if('line' in message.message.response.response_data){
        //     console.log("line");
        //       return (
        //         <div className="bot-text-response-d">
        //         <span>Sure. line chart is Ready!</span>
        //       </div>
        //       );
        //   }
        // }
        //   else if (response_type === "graph") {
        //     if('pie' in message.message.response.response_data){
        //     console.log("pie");
        //       return (
        //         <div className="bot-text-response-d">
        //         <span>Sure. Pie chart is Ready!</span>
        //       </div>
        //       );
        //   }
        // }
        else {
          console.log("null part");
          return null;
        }
      } else  {
        if (message && message.user=== false){
        return message.message;
        }
      };
    
    }
  };

  const renderResponse = (message) => {
    console.log(message);
    scrollToBottom();
    if (!message.user)
      if (message && message.message) {
        const responseType = Object.keys(message.message)[0];
        const response1 = message.message.response;
        
       


        if (response1 && response1.response_type) {
          console.log("responses", response1);

          // if (response1.response_type === "answer") {
          //   // Render text response
          //   return (
          //     <div className="bot-text-response-d">
          //       <span>{response1.response_data}</span>
          //     </div>
          //   );

          //   }else
          if (response1.response_type === "table") {
            // Render table response
            const response_dict3 = message.message;
            const tableData = message.message.response;

            const tableData2 = response1.response_data.table;

            if (
              // tableData &&
              // tableData.response_data &&
              // tableData.response_data.data
              tableData2 
              
            ) {
              // const columns = tableData.response_data.columns;
              // const tableRows = tableData.response_data.data;
              const columns = tableData2.columns;
              const tableRows = tableData2.data;

              // const tableContainerStyle = {
              //   maxWidth: '100%',
              //   overflowX: 'auto',
              // };
              return (
                <>
                <div className="bot-table-response-d" style={{marginBottom: "10px"}}>

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
                <div className='message-footer' style={{minWidth:"500px"}}>
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
          // else if (response1.response_type === "bar") {
          //   // Render bar chart response
          //   const response_dict1 = message.message;
          //   // const barData = message.message.bar;
          //   const barData = message.message.response;
          //   // const labels1 = barData.columns;
          //   if(barData && barData.response_data && barData.response_data.data){
          //   const labels = barData.response_data.data.map((item) => item[0]);
          //   const data = barData.response_data.data.map((item) => item[1]);
          //   const dataset = {
          //     labels: labels,
          //     datasets: [
          //       {
          //         label: barData.response_data.columns[1],
          //         data: data,
          //         fill: false,

          //         backgroundColor: "rgb(135, 116, 255)",

          //         borderWidth: 2,
          //         barPercentage: 0.5,
          //       },
          //     ],
          //   };

          //   const options = {
          //     scales: {
          //       x: {
          //         beginAtZero: true,
          //         strokeDasharray:"rgba(65, 67, 82, 1)",
          //         ticks:{
          //           color: 'white',
          //           fontSize: 10,
          //           fontWeight: 100

          //         },
          //         type: "category", // For horizontal bar charts, use 'category' scale for x-axis
          //         title: {
          //           display: true,
          //           text: barData.response_data.columns[0], // X-axis label
          //           font: {
          //             weight: "bold", // Make the text bold
          //           },
          //         },
          //         grid: {
          //           display: true,
          //           color: "rgba(65, 67, 82, 1)" // Remove grid lines on the x-axis
          //         },
          //       },
          //       y: {
          //         beginAtZero: true,
          //         strokeDasharray:"rgba(65, 67, 82, 1)",
          //         ticks:{
          //           color: 'white',
          //           fontSize: 10,
          //           fontWeight: 100

          //         },
          //         type: "linear", // Use 'linear' scale for y-axis
          //         title: {
          //           display: true,
          //           text: barData.response_data.columns[1], // X-axis label
          //           font: {
          //             weight: "bold", // Make the text bold
          //           },
          //         },
          //         grid: {
          //           display: true,
          //           color: "rgba(65, 67, 82, 1)" // Remove grid lines on the x-axis
          //         },
          //       },
          //     },
          //   };
          //   const chartContainerStyle = {
          //     backgroundColor: "rgba(45, 50, 90, 1)",
          //     padding: "10px",
          //     borderRadius: 10,
          //     width: "450px", // Set the width of the chart
          //     height: "250px", // Set the height of the chart // Add padding to the chart container
          //   };
          //   // Render the bar chart as you did before
          //   return (
          //     <div className="bot-chart-response-d" style={chartContainerStyle}>

          //       <div>
          //         {/* <h2>Bar Chart:</h2> */}
          //         <Bar data={dataset} options={options} />
          //       </div>
          //     </div>
          //   );
          // }
          // else if (response1.response_type === "line") {
          //   // Render line chart response
          //   const response_dict1 = message.message;
          //   const lineData = message.message.response;
          //   const labels2 = lineData.response_data.data.map((item) => item[0]);
          //   const data2 = lineData.response_data.data.map((item) => item[1]);
          //   const dataset = {
          //     labels: labels2,
          //     datasets: [
          //       {
          //         label: lineData.response_data.columns[1],
          //         data: data2,
          //         fill: false,
          //         borderColor: "rgb(135, 116, 255)",
          //         borderWidth: 3,
          //       },
          //     ],
          //   };
          //   // Chart options
          //   const options = {
          //     scales: {
          //       x: {
          //         beginAtZero: true,
          //         strokeDasharray:"rgba(65, 67, 82, 1)",
          //         ticks:{
          //           color: 'white',
          //           fontSize: 10,
          //           fontWeight: 100

          //         },
          //         type: "category", // For horizontal bar charts, use 'category' scale for x-axis
          //         title: {
          //           display: true,
          //           text: lineData.response_data.columns[0], // X-axis label
          //           font: {
          //             weight: "bold", // Make the text bold
          //           },
          //         },
          //       },
          //       y: {
          //         beginAtZero: true,
          //         strokeDasharray:"rgba(65, 67, 82, 1)",
          //         ticks:{
          //           color: 'white',
          //           fontSize: 10,
          //           fontWeight: 100

          //         },
          //         type: "linear", // Use 'linear' scale for y-axis
          //         title: {
          //           display: true,
          //           text: lineData.response_data.columns[1], // X-axis label
          //           font: {
          //             weight: "bold", // Make the text bold
          //           },
          //         },
          //         grid: {
          //           display: true,
          //           color: "rgba(65, 67, 82, 1)" // Remove grid lines on the x-axis
          //         },
          //       },
          //     },
          //   };
          //   const chartContainerStyle = {
          //     backgroundColor: "rgba(45, 50, 90, 1)",
          //     padding: "10px",
          //     borderRadius: 10,
          //     width: "400px", // Set the width of the chart
          //     height: "200px", // Set the height of the chart// Add padding to the chart container
          //   };
          //   // Render the line chart as you did before
          //   return (
          //     <div className="bot-chart-response-d" style={chartContainerStyle}>

          //       <div>
          //         {/* <h2>Line Chart:</h2> */}
          //         <Line data={dataset} options={options} />
          //       </div>
          //     </div>
          //   );
          // }
          else if (response1.response_type === "graph") {
            if ("bar" in response1.response_data) {
              // Render bar chart response
              const response_dict1 = message.message;
              // const barData = message.message.bar;
              const barData = message.message.response.response_data.bar;
              scrollToBottom();
              // const labels1 = barData.columns;
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
                    <div>
                      {/* <h2>Bar Chart:</h2> */}
                      <Bar data={dataset} options={options} />
                    </div>
                  </div>
                  <div className='message-footer' style={{minWidth:"500px"}}>
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
              if ("line" in response1.response_data) {
                const response_dict1 = message.message;
                const lineData = message.message.response.response_data.line;
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
                    <div className='message-footer' style={{minWidth:"500px"}}>
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
              
              if ("pie" in response1.response_data) {
                const response_dict1 = message.message;
                const pieData = message.message.response.response_data.pie;
                console.log(pieData);
                scrollToBottom();
                // setShowTypingEffect(false);
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
                    <div className='message-footer' style={{minWidth:"500px"}}>
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
            
          } else {
            // Unknown response type
            // return null;
          }
        } else {

          return(
           <></>
          )
          //handle the case when response1.response_type is undefined
          // return null;
        }
      }
  };

  const handleUserMessage = async (message) => {
    try {
      setChatMessages((prevMessages) => [
        ...prevMessages,
        { user: true, message, recommendation: false, init: true },
      ]);
      setShowTypingEffect(false);
      setShowLoader(true);

      const userInput = {
        message: message,
        request_type: "chat",
      };

      const response = await axios.post(
        "https://industrygenai.accenture.com/vm/chatBot",
        userInput
      );
      console.log("Chatbot API response:", response.data);

      let chatbotResponse = "";
      
      if(response.data.status_code == 201){
        chatbotResponse = response.data.message;
        
      } else {
        chatbotResponse = response.data;
        
      }
      console.log("Chatbot response:", chatbotResponse);

      const botMessage = { user: false, message: chatbotResponse };
      console.log(botMessage);
      setChatMessages((prevMessages) => [...prevMessages, botMessage]);

      setShowLoader(false);
       setShowTypingEffect(true);
    } catch (error) {
      console.error(error);
      const botMessage = {
        user: false,
        message: "Failed to Get the response.",
        recommendation: false,
        init: true,
      };
      setChatMessages((prevMessages) => [...prevMessages, botMessage]);
      scrollToBottom();
      setShowTypingEffect(false);
    }
    // showLoader(false);
  };
  const Loading = () => {
    return (
      <div className="loader">
        <div className="loader-text"></div>
        <div className="dot red"></div>
        <div className="dot green"></div>
        <div className="dot blue"></div>
      </div>
    );
  };
  const Fetching = () => {
    return (
      // <div className='incident-loader'>
      <div className="loader-f">
        <div className="loader-text">Fetching from LLM</div>
        <div className="dot red"></div>
        <div className="dot green"></div>
        <div className="dot blue"></div>
      </div>
      // </div>
    );
  };

  const [modalVisible, setModalVisible] = useState(false);

  const handleIconClick = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  return (
    <Container className="chatbot-container-veg">
      <Row>
        {/* <Col>
          <div className="right-section-chat-veg">
            <div className="top-part-chart-veg">
              <p className="title-chart-veg">Additional Data</p>
            </div>
            <div className="add-data-veg">
              {chatMessages
              .filter((message) => message.message !== undefined && message.message !== "")
              .map((message, index) =>
                !message.user &&
                message.message != "Hi! How can I assist you today?" ? (
                 
                  <div
                  key={index}
                    className={
                      message.user
                        ? "message-text-chart-veg bg-user-veg"
                        : "message-text-chart-veg bg-bot-veg"
                    }
                    style={{ marginBottom: "10px" }}
                  >
                    {renderResponse(message)}
                  </div>
                ) : null
              )}
            </div>
          </div>
        </Col> */}
        <Col>
          <div className="left-section-chat-veg">
            <div className="top-part-chart-veg">
              <img className="img-chart-veg" src={botIcon} alt="Sample" />
              <div className="title-chart-veg">GenAISight Chatbot</div>
              {/* <img className='img-chart-doa' src={close} alt='Sample' /> */}
              {/* <div className='info-icon'><img className="i-icon" src={Iicon} onClick={handleToggleModal} /></div> */}
              <img
                className="top-sum-v chatboticon-v"
                src={question}
                alt="Sample"
                onClick={handleIconClick}
              />
            </div>

            <div
              className="chat-messages-c-veg"
              ref={scrollContainerRef}
              style={{ display: "flex", flexDirection: "column" }}
            >
              {chatMessages.map((message, index) => (
                <div
                  key={index}
                  className={
                    message.user
                      ? "chat-message-chart-veg user-c-veg"
                      : "chat-message-chart-veg bot-c-veg"
                  }
                  style={{ display: "flex" }}
                  
                >
                  <div className="message-icon-chart-veg">
                    <img
                      src={message.user ? userIconSrc : chatbotIconSrc}
                      alt="Icon"
                      className={
                        message.user
                          ? "icon-chat-user-veg"
                          : "icon-chat-bot-veg"
                      }
                    />
                  </div>
                  <div
                    className={
                      message.user
                        ? "message-text-chart-veg bg-user-veg"
                        : "message-text-chart-veg bg-bot-veg"
                    }
                  >
                    {index === chatMessages.length - 1 ? (
                      showLoader ? (
                        <Loading />
                      ) : (
                        <>{renderchatResponse(message, index, chatMessages)}
                          {renderResponse(message)}
                          
                        </>
                        
                      )
                    ) : (
                       <>{renderchatResponse(message, index, chatMessages)}
                        {renderResponse(message)}
                      </>
                    )}

                 
                  </div>
                </div>
              ))}
            </div>
            {modalVisible && <VegetationQuest onClose={closeModal} />}
            {/* {quesModal && (
            <QuesPopupModal
              onClose={() => setShowQuesModal(false)}
            />
          )} */}

            <div className="bottom-part-chart-veg">
              <div className="chat-input-chart-veg">
                <textarea
                  type="text"
                  placeholder="Enter your query"
                  className="text-chart-veg"
                  value={inputValue}
                  style={{ whiteSpace: "pre-wrap" }}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      handleSendMessage();
                      // setShowTypingEffect(true);

                    }
                  }}
                  onChange={(e) => setInputValue(e.target.value)}
                />
              </div>
              <div className="send-icon-veg">
                <img
                  className="send-chart-veg"
                  src={send}
                  alt="Send Button"
                  onClick={handleSendButtonClick}
                />
              </div>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default ChatVeg;
