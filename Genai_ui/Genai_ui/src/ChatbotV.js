import React, { useState, useEffect } from "react";
import axios from "axios";
import "./ChatbotV.css";
import botIcon from "./images/Group 3419.svg";
import send from "./images/send_FILL0_wght400_GRAD0_opsz24 1.svg";
import mic from "./images/mic_FILL0_wght400_GRAD0_opsz24 1.svg";
import chatbotIconSrc from "./images/Frame 2654.svg";
import userIconSrc from "./images/Group 3550.svg";
import MapComponent from "./MapComponent";
import "./Vegitation.css";
import { Bar } from "react-chartjs-2";
import { Line } from "react-chartjs-2";
import TableComponent from "./TableComponent";
import Chart from 'chart.js/auto';

function ChatbotV() {
  const [inputValue, setInputValue] = useState("");
  const [showLoader, setShowLoader] = useState(false);
  const [chatMessages, setChatMessages] = useState([
    { user: false, message: "Hi! How can I assist you today?", init: false }, // Default chatbot message
  ]);

  const [recommendationData, setRecommendationData] = useState("");
  const [recommendationType, setRecommendationType] = useState("");
  const [isLoading, setLoading] = useState(true);

  const renderResponse = (message) => {
    if (message.user) {
      // Render user messages as they are
      return (
        <div className="user-message-v">
          <span>{message.message}</span>
        </div>
      );
    } else if(message.message == "Hi! How can I assist you today?"){
      return (
        <div className="user-message-v">
          <span>{message.message}</span>
        </div>
      );
    } else {
      // Check the type of response based on the key in message.message
      const responseType = Object.keys(message.message)[0];
      const response1 = message.message.response;

      if (response1 && response1.response_type) {
        console.log("responses", response1);

        if (response1.response_type === "answer") {
          // Render text response
          return (
            <div className="bot-text-response-d">
              <span>{response1.response_data}</span>
            </div>
          );
        } else if (response1.response_type === "table") {
          // Render table response
          const response_dict3 = message.message;
          const tableData = message.message.response;

          if(tableData && tableData.response_data && tableData.response_data.data){
          const columns = tableData.response_data.columns;
          const tableRows = tableData.response_data.data;

          // const tableContainerStyle = {
          //   maxWidth: '100%',
          //   overflowX: 'auto',
          // };
          return (
            <div className="bot-table-response-d">
              <table className="mytable-d">
                <thead>
                  <tr>
                    {columns.map((column, index) => (
                      <th  key={index}>{column}</th>
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
              {/* ... (table rendering logic) */}

              {/* <span><img src={botIcon} alt="Bot Icon" /></span> */}
              {/* {response_dict3.table && ( 
            <div>
              <h2>Table:</h2>
              <p>Columns: {response_dict3.table.columns.join(", ")}</p>
              <p>Data:</p>
              <ul>
                {response_dict3.table.data.map((item, index) => (
                  <li key={index}>{item.join(", ")}</li>
                ))}
              </ul>
            </div>
          )}
            </span> */}

              <div>{/* <h2>Table:</h2> */}</div>
              {/* Render the table component */}
              {/* <TableComponent
                className="mytable-d"
                columns={columns}
                data={tableData.response_data.data}
              /> */}
            </div>
          );
          }
        } else if (response1.response_type === "bar") {
          // Render bar chart response
          const response_dict1 = message.message;
          // const barData = message.message.bar;
          const barData = message.message.response;
          // const labels1 = barData.columns;
          if(barData && barData.response_data && barData.response_data.data){
          const labels = barData.response_data.data.map((item) => item[0]);
          const data = barData.response_data.data.map((item) => item[1]);
          const dataset = {
            labels: labels,
            datasets: [
              {
                label: "COVID PPE KIT",
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
                strokeDasharray:"rgba(65, 67, 82, 1)",
                ticks:{
                  color: 'white',
                  fontSize: 10,
                  fontWeight: 100

                },
                type: "category", // For horizontal bar charts, use 'category' scale for x-axis
                title: {
                  display: true,
                  text: barData.response_data.columns[0], // X-axis label
                  font: {
                    weight: "bold", // Make the text bold
                  },
                },
                grid: {
                  display: true,
                  color: "rgba(65, 67, 82, 1)" // Remove grid lines on the x-axis
                },
              },
              y: {
                beginAtZero: true,
                strokeDasharray:"rgba(65, 67, 82, 1)",
                ticks:{
                  color: 'white',
                  fontSize: 10,
                  fontWeight: 100

                },
                type: "linear", // Use 'linear' scale for y-axis
                title: {
                  display: true,
                  text: barData.response_data.columns[1], // X-axis label
                  font: {
                    weight: "bold", // Make the text bold
                  },
                },
                grid: {
                  display: true,
                  color: "rgba(65, 67, 82, 1)" // Remove grid lines on the x-axis
                },
              },
            },
          };
          const chartContainerStyle = {
            backgroundColor: "rgba(45, 50, 90, 1)",
            padding: "10px",
            borderRadius: 10, // Add padding to the chart container
          };
          // Render the bar chart as you did before
          return (
            <div className="bot-chart-response-d" style={chartContainerStyle}>
              {/* ... (bar chart rendering logic) */}
              {/* <span><img src={botIcon} alt="Bot Icon" /></span> */}
              {/* IMPORTANT DONT' DELETE THE NEXT COMMENTED PART */}
              {/* {response_dict1.bar && (
            <div>
              <h2>Bar Chart:</h2>
              <p>Columns: {response_dict1.bar.columns.join(", ")}</p>
              <p>Data:</p>
              <ul>
                {response_dict1.bar.data.map((item, index) => (
                  <li key={index}>{item.join(", ")}</li>
                ))}
              </ul>
            </div>
          )} */}
              <div>
                {/* <h2>Bar Chart:</h2> */}
                <Bar data={dataset} options={options} />
              </div>
            </div>
          );
        }
        } else if (response1.response_type === "line") {
          // Render line chart response
          const response_dict1 = message.message;
          const lineData = message.message.response;
          const labels2 = lineData.response_data.data.map((item) => item[0]);
          const data2 = lineData.response_data.data.map((item) => item[1]);
          const dataset = {
            labels: labels2,
            datasets: [
              {
                label: "COVID PPE KIT",
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
                strokeDasharray:"rgba(65, 67, 82, 1)",
                ticks:{
                  color: 'white',
                  fontSize: 10,
                  fontWeight: 100

                },
                type: "category", // For horizontal bar charts, use 'category' scale for x-axis
                title: {
                  display: true,
                  text: lineData.response_data.columns[0], // X-axis label
                  font: {
                    weight: "bold", // Make the text bold
                  },
                },
              },
              y: {
                beginAtZero: true,
                strokeDasharray:"rgba(65, 67, 82, 1)",
                ticks:{
                  color: 'white',
                  fontSize: 10,
                  fontWeight: 100

                },
                type: "linear", // Use 'linear' scale for y-axis
                title: {
                  display: true,
                  text: lineData.response_data.columns[1], // X-axis label
                  font: {
                    weight: "bold", // Make the text bold
                  },
                },
                grid: {
                  display: true,
                  color: "rgba(65, 67, 82, 1)" // Remove grid lines on the x-axis
                },
              },
            },
          };
          const chartContainerStyle = {
            backgroundColor: "rgba(45, 50, 90, 1)",
            padding: "10px",
            borderRadius: 10, // Add padding to the chart container
          };
          // Render the line chart as you did before
          return (
            <div className="bot-chart-response-d" style={chartContainerStyle}>
              {/* ... (line chart rendering logic) */}
              {/* <span><img src={botIcon} alt="Bot Icon" /></span> */}
              {/* IMPORTANT DONT' DELETE THE NEXT COMMENTED PART */}
              {/* {response_dict1.line && (
            <div>
              <h2>Line Chart:</h2>
              <p>Columns: {response_dict1.line.columns.join(", ")}</p>
              <p>Data:</p>
              <ul>
                {response_dict1.line.data.map((item, index) => (
                  <li key={index}>{item.join(", ")}</li>
                ))}
              </ul>
              //testing
            </div>
          )} */}
              <div>
                {/* <h2>Line Chart:</h2> */}
                <Line data={dataset} options={options} />
              </div>
            </div>
          );
        } else {
          // Unknown response type
          return null;
        }
      } else {
        //handle the case when response1.response_type is undefined
        return null;
      }
    }
  };

  const handleSendMessage = () => {
    if (inputValue.trim() !== "") {
      handleUserMessage(inputValue);
      setInputValue("");
    }
  };

  const handleSendButtonClick = () => {
    handleSendMessage();
    setInputValue("");
  };

  const handleUserMessage = async (message) => {
    try {
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

      const chatbotResponse = response.data;
      const recommendationData1 = chatbotResponse;
      setRecommendationData(recommendationData1);
      console.log("Chatbot response:", recommendationData1);

      const botMessage = { user: false, message: recommendationData1 };
      setChatMessages((prevMessages) => [
        ...prevMessages,
        { user: true, message },
        botMessage,
      ]);
    } catch (error) {
      console.error(error);
      const botMessage = {
        user: false,
        message: "Failed to Get the response.",
      };
      setChatMessages((prevMessages) => [...prevMessages, botMessage]);
    } finally {
      setShowLoader(false);
    }
  };
  const Loading = () => {
    return (
      <div className="loader-v">
        <div className="loader-text-v">Loading</div>
        <div className="dot red"></div>
        <div className="dot green"></div>
        <div className="dot blue"></div>
      </div>
    );
  };

  return (
    <div className='main-chat-v'>
      <div className='left-section-chat-v'>
        <div className='top-part-chart-v'>
          <img className='img-chart-v' src={botIcon} alt='Sample /'></img>
          <div className='title-chart-v'>GenAISight BOT</div>
        </div>
        <div>
          <div className='chat-message-v'>
            {chatMessages.map((message, index) => (
              <div
                key={index}
                className={
                  message.user
                    ? 'chat-message user-c-v'
                    : 'chat-message bot-c-v'
                }
              >
                <div className='message-icon-chart-v'>
                  <img
                    src={message.user ? userIconSrc : chatbotIconSrc}
                    alt='Icon'
                    className={
                      message.user ? 'icon-chat-user-v' : 'icon-chat-bot-v'
                    }
                  />
                </div>

                <div className='message-text-chart-v'>
                  {renderResponse(message)}
                </div>
              </div>
            ))}
            {showLoader && <Loading />}
          </div>
        </div>
        <div className='bottom-part-chart-v'>
          <div className='chat-input-container-chart-v'>
            <div className='chat-input-chart-v'>
              <textarea
                type='text'
                placeholder='Enter your query'
                className='text-chart-v'
                value={inputValue}
                style={{ whiteSpace: 'pre-wrap' }}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    handleSendMessage();
                  }
                }}
                onChange={(e) => setInputValue(e.target.value)}
              />

              <img className='mic-chart-v' src={mic} alt='mic' />
            </div>
            <div className='send-back-chart-v'>
              <img
                className='send-chart-v'
                src={send}
                alt='Send Button'
                onClick={handleSendButtonClick}
              />
            </div>
          </div>
        </div>
      </div>
      {/* <div className="right-section-chat-v">
        <MapComponent />
      </div> */}
    </div>
  );
}

export default ChatbotV;