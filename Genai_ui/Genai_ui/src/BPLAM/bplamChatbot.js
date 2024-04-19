import "./bplam.css";
import close from "../images/close.svg";
import React, { useState, useEffect, useRef } from "react";
import botIcon from "../images/Group 3419.svg";
import send from "../images/send_FILL0_wght400_GRAD0_opsz24 1.svg";
import axios from "axios";
import mic from "../images/mic_FILL0_wght400_GRAD0_opsz24 1.svg";
import Popupchart from "../images/Group 3068.svg";
import chatbotIconSrc from "../images/Frame 2654.svg";
import userIconSrc from "../images/Group 3550.svg";
import like from "../images/Icon-Like.svg";
import dislike from "../images/Icon-DisLike.svg";
import share from "../images/Group 3306.svg";
import copy from "../images/Union.svg";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import TableResponse from "./TableResponsebplam";
import { Bar, Pie } from "react-chartjs-2";
import { Line } from "react-chartjs-2";
import '../ChatVeg.css';
// import { Cell, PieChart,Pie, Tooltip,Legend } from "recharts";


const ChatbotModal = ({ onClose }) => {
  const scrollContainerRef = useRef(null);
  const [showLoader, setShowLoader] = useState(false);
  const [showTypingEffect, setShowTypingEffect] = useState(true);
  const [inputValue, setInputValue] = useState("");
  const [chatMessages, setChatMessages] = useState([
    { user: false, message: "Hi! How can I assist you today?", init: false }, // Default chatbot message
  ]);

  // const generateColors = (count) => {
  //   // You can implement your own logic to generate colors
  //   // This is a simple example, you might want to use a library like 'randomcolor'
  //   const colors = [];
  //   for (let i = 0; i < count; i++) {
  //     colors.push(`rgba(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, 0.7)`);
  //   }
  //   return colors;
  // };
  const getBackgroundColor = (index) => {
    const colors = [
      "#8884d8",
      "rgba(99, 31, 225, 0.826)",
      "#ffc658",
      "#82ca9d",
      "rgba(51, 184, 237, 0.712)",
      "green",
      "yellow",
    ];
  
    // Use modulo operator to cycle through colors if there are more data points than colors
    return colors[index % colors.length];
  };

  const scrollToBottom = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTop =
        scrollContainerRef.current.scrollHeight;
    }
  };

  const renderchatResponse = (message, index, chatMessages) => {
    console.log(message.message);
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
          {showTypingEffect && index === chatMessages.length - 1 ? (
            <TypingEffect
              text={message.message}
              onComplete={() => setShowTypingEffect(false)}
            />
          ) : (
            <span>{message.message}</span>
          )}
        </div>
      );
    } else {
      if (message.message) {
        if (message.message.response_type === "table") {
          
          return (
            <div className="table-response-bplam">
              <TableResponse data={message.message.response_data} />
            </div>
          );
        } else if (message.message.response_type === "answer") {
          return (
            <div className="answer-response-bplam">
              <span>{message.message.response_data}</span>
            </div>
          );
        } else if (message.message.response_type === "graph") {
          const graphData = message.message.response_data;
          if (graphData.bar) {
            scrollToBottom();
            const analysisMessage = graphData.analysis;
            const barData = graphData.bar.data;
            const labels = barData.map((item) => item[0]);
            const data = barData.map((item) => item[1]);
            const dataset = {
              labels: labels,
              datasets: [
                {
                  label: graphData.bar.columns[1],
                  data: data,
                  fill: false,
                  backgroundColor: "rgb(135, 116, 255)",
                  borderWidth: 2,
                  barPercentage: 0.5,
                },
              ],
            };
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
                    text: graphData.bar.columns[0], // X-axis label
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
                    text: graphData.bar.columns[1], // X-axis label
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
              height: "230px",
            };

            
            return (
              <>
                <div className="analysis-message-bplam">
                  {showTypingEffect && index === chatMessages.length -1 ? (
                    <TypingEffect
                    text={analysisMessage}
                    onComplete={() => setShowTypingEffect(false)}
                    />
                  ) : (
                    <span>{analysisMessage}</span>
                  )}
                  </div>
                <div
                  className="bar-chart-response-bplam"
                  style={chartContainerStyle}
                >
                  <div>
                    <Bar data={dataset} options={options} />
                  </div>
                </div>
                
              </>
            );
          } else if (graphData.line) {
            scrollToBottom();
            const analysisMessage = graphData.analysis;
            const lineData = graphData.line.data;
            const columns = graphData.line.columns;
            // const labels = lineData.map((item) => item[0]);
            // const data = lineData.map((item) => item[1]);
            //  const dataset = {
            //   label: labels,
              const datasets = [
                {
                  label: columns[1], // Assuming the second column is the Y-axis data
                  data: lineData.map((item) => item[1]),
                  fill: false,
                  backgroundColor: "rgb(135, 116, 255)",
                  borderWidth: 2,
                  barPercentage: 0.5,
                },
              ];
              const lineDataset = {
                labels: lineData.map((item) => item[0]),
                datasets: datasets,
              };

            
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
                    text: columns[0], // X-axis label
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
                    text: columns[1], // Y-axis label
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
              height: "230px",
            };
            return (
              <>
                <div className="analysis-message-bplam">
                {showTypingEffect && index === chatMessages.length -1 ? (
                    <TypingEffect
                    text={analysisMessage}
                    onComplete={() => setShowTypingEffect(false)}
                    />
                  ) : (
                    <span>{analysisMessage}</span>
                  )}
                  </div>
                <div
                  className="bar-chart-response-bplam"
                  style={chartContainerStyle}
                >
                  <div>
                    <Line data={lineDataset} options={options} />
                  </div>
                </div>
              </>
            );
          }else if (graphData.pie) {
            scrollToBottom();
            const analysisMessage = graphData.analysis;
            const pieData = graphData.pie.data;
            const labels = graphData.pie.columns;
            console.log(pieData);
            const chartData = pieData.map((item, index) => ({
              name: item[0],
              value: item[1],
              // fill: colors[index % colors.length], 
            }));
            console.log(chartData);
            const dataset = {
              labels: labels,
              datasets: [
                {
                  label: graphData.pie.columns[1],
                  data: pieData,
                  fill: false,
                  backgroundColor: "rgb(135, 116, 255)",
                  borderWidth: 2,
                  barPercentage: 0.5,
                 
                  backgroundColor: pieData.map((_, index) => getBackgroundColor(index)),
                },
              ],
            };
            const options = {
              plugins:{
 
                legend:{
                    display:true,
                    position: 'right',
                    align: 'center',
                    labels: {
                      boxWidth: 10, // Adjust as needed
                      fontColor:"#FFFFFF",
                      color:"#FFFFFF",
                    },
              },
            },
              datalabels: {
                display: true,
                color: "white",
          }
        }
         
              
           
            //   const colors = [
            //   "#8884d8",
            //   "rgba(99, 31, 225, 0.826)",
            //   "#ffc658",
            //   "#82ca9d",
            //   "rgba(51, 184, 237, 0.712)",
            //   "green",
            //   "yellow",
            // ];
            return(
              <>
              <div className="analysis-message-bplam">
              {showTypingEffect && index === chatMessages.length - 1 ? (
                <TypingEffect
                  text={analysisMessage}
                  onComplete={() => setShowTypingEffect(false)}
                />
              ) : (
                <span>{analysisMessage}</span>
              )}
            </div>
            
              <div className="bot-chart-response-d-bplam">
                {/* <PieChart width={350} height={250}>
                  <Pie
                     dataKey="value"
                     data={chartData}
                     fontSize={"10px"}
                     isAnimationActive={false}
                     cx={150}
                     cy={100}
                     outerRadius={70}
                     innerRadius={30}
                     fill="#8884d8"
                     labels
                     >
                      {pieData.map((entry, index) => (
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
                </PieChart> */}
                <Pie data={dataset} options={options}  />


              </div>
              
              </>
            )


          }
        }
        
        
        }else if (message.user === false) {
        return <span>{message.message}</span>;
      }
    }
  };

  const TypingEffect = ({ text, onComplete }) => {
    const [displayText, setDisplayText] = useState("");

    useEffect(() => {
      let timeout;
      const displayTextArray = String(text).split("");

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

  const handleUserMessage = async (message) => {
    try {
      setChatMessages((prevMessages) => [
        ...prevMessages,
        { user: true, message, recommendation: false, init: true },
      ]);
      setShowTypingEffect(false);
      setShowLoader(true);

      const userInput = { message };

      const response = await axios.post(
        // "https://industrygenai.accenture.com/bplam/chat",
        "http://98.64.75.151:5000/chat",
        userInput
      );
      console.log("Chatbot API response:", response.data);

      const chatbotResponse = response.data.response;
      //   const recommendationData1 = chatbotResponse;
      //   console.log("Chatbot response:", chatbotResponse);
      if(chatbotResponse.response_type === "graph") {
        //handle grap[h response
        const graphMessage = {
          user: false,
          message: chatbotResponse,
        };
        setChatMessages((prevMessages) => [...prevMessages, graphMessage]);
      } else{
         // Handle other response types (table, answer, etc.)
         const botMessage = {user: false, message: chatbotResponse};
         console.log(botMessage);
         setChatMessages((prevMessages) => [...prevMessages, botMessage]);
      }

      // const botMessage = { user: false, message: chatbotResponse };
      // console.log(botMessage);
      // setChatMessages((prevMessages) => [...prevMessages, botMessage]);

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

  return (
    <Container className="chatbot-modal-container-bplam">
      <Row>
        <Col>
          <div>
            <div className="modal-backdrop-bplam" onClick={onClose}></div>
            <div className="chatbot-modal-bplam">
              <div className="top-part-chart-bplam"></div>
              <img className="img-chart-bplam" src={botIcon} alt="Sample" />
              <div className="title-chart-bplam">GenAISight Chatbot</div>
              <img
                className="ChatbotModal-bplam-close-bttn"
                style={{ width: "20px", float: "right", marginTop: "-30px" }}
                src={close}
                alt="Sample"
                onClick={onClose}
              />
              <div
                className="chat-messages-c-bplam"
                ref={scrollContainerRef}
                style={{ display: "flex", flexDirection: "column" }}
              >
                {chatMessages.map((message, index) => (
                  <div
                    key={index}
                    className={
                      message.user
                        ? "chat-message-chart-bplam user-c-bplam"
                        : "chat-message-chart-bplam bot-c-bplam"
                    }
                    style={{ display: "flex" }}
                  >
                    <div className="message-icon-chart-bplam">
                      <img
                        src={message.user ? userIconSrc : chatbotIconSrc}
                        alt="Icon"
                        className={
                          message.user
                            ? "icon-chat-user-bplam"
                            : "icon-chat-bot-bplam"
                        }
                      />
                    </div>
                    <div
                      className={
                        message.user
                          ? "message-text-chart-bplam bg-user-bplam"
                          : "message-text-chart-bplam bg-bot-bplam"
                      }
                    >
                      {index === chatMessages.length - 1 ? (
                        showLoader ? (
                          <Loading />
                        ) : (
                          <>
                            {renderchatResponse(message, index, chatMessages)}
                          </>
                        )
                      ) : (
                        <>{renderchatResponse(message, index, chatMessages)}</>
                      )}
                    </div>
                  </div>
                ))}
              </div>
              <div className="bottom-part-chart-bplam">
                <div className="chat-input-chart-bplam">
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
                <div className="send-icon-bplam">
                  <img
                    className="send-chart-bplam"
                    src={send}
                    alt="Send Button"
                    onClick={handleSendButtonClick}
                  />
                </div>
              </div>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default ChatbotModal;
