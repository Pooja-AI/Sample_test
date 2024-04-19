// import { useState, React, useEffect } from 'react'
import React, { useState, useEffect, useRef } from 'react';
import '../Generic_Chatbot.css';
import botIcon from '../images/Group 3419.svg';
import send from '../images/send_FILL0_wght400_GRAD0_opsz24 1.svg';
import axios from 'axios';
import mic from '../images/mic_FILL0_wght400_GRAD0_opsz24 1.svg';
import Popupchart from '../images/Group 3068.svg';
import chatbotIconSrc from '../images/Frame 2654.svg';
import userIconSrc from '../images/Group 3550.svg';
import close from '../images/close.svg';
import like from '../images/Icon-Like.svg';
import dislike from '../images/Icon-DisLike.svg';
import share from '../images/Group 3306.svg';
import copy from '../images/Union.svg';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import question from '../images/Group 3593.svg';
import Toast from 'react-bootstrap/Toast';
import ToastContainer from 'react-bootstrap/ToastContainer';
import upload from '../images/Group 3296.svg';
import Iicon from '../images/Group 3440.svg'
import Info from '../Info.js';
// import AudioRecorder from '../AudioRecorder';

function Chatbot(props) {
  const [inputValue, setInputValue] = useState('');
  const [showLoader, setShowLoader] = useState(false);
  const [chatMessages, setChatMessages] = useState([
    { user: false, message: "Hi! How can I assist you today?", init: false },
  ]);

  const scrollContainerRef = useRef(null);

  const scrollToBottom = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTop = scrollContainerRef.current.scrollHeight;
    }
  };


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



  const handleSendMessage = () => {
    if (inputValue.trim() !== '') {
      handleUserMessage(inputValue);
      setInputValue('');
    }
  };
  const handleSendButtonClick = () => {
    handleSendMessage();
    setInputValue('');
  };

  const renderchatResponse = (message) => {
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
    else {
      if (message && message.message) {
        const response_data = message.message.response_data;
        const response_type = message.message.response_type;
        console.log(response_data);
        console.log(response_type);
        if (response_type === "answer") {
          console.log("answer");
          return (
            <div className="bot-text-response-d">
              <span>{response_data}</span>
            </div>
          );
        }
        else if (response_type === "table") {
          console.log("table");
          return (
            <div className="bot-text-response-d">
              <span>Sure. Table is Ready!</span>
            </div>
          );
        }
        else {
          console.log("null part");
          return null;
        }
      } else {
        return null;
      }
    }
  };
  const renderResponse = (message) => {
    console.log(message);
    if (!message.user) {
      if (message && message.message) {
        const response_data = message.message.response_data;
        const response_type = message.message.response_type;
        console.log(response_data);
        console.log(response_type);
        if (response_type === "table") {
          console.log("table");
          if (response_data && response_data.data) {
            const columns = response_data.columns;
            const tableRows = response_data.data;
            return (
              <div className="bot-table-response-chatbot">
                <table className="table-chatbot">
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
                <div>
                </div>
              </div>
            );
          }
        }
        else {
          console.log("null part");
          // return null;
        }
      } else {
        // return null;
      }
    }
  };
  const handleUserMessage = async (message) => {
    try {
      setChatMessages((prevMessages) => [...prevMessages, { user: true, message, recommendation: false, init: true }]);
      setShowLoader(true);
      const userInput = {
        message: message
      };

      const response = await axios.post(props.endpoint, userInput);
      console.log('Chatbot API response:', response.data);
      setShowLoader(false);
      if (props.isSOP) {
        const chatbotResponse = response.data.response ? response.data : {
          "message": {
            response_data: "Unable to answer your query. Please try again..",
            response_type: "answer"
          }
        };
        console.log('Chatbot response:', chatbotResponse);
        const botMessage = { user: false, message: chatbotResponse };
        console.log(botMessage);
        setChatMessages((prevMessages) => [...prevMessages, botMessage]);
      }
      else {
        const chatbotResponse = response.data.status_code != 200
          ? {
            "message": {
              response_data: "Unable to answer your query. Please try again..",
              response_type: "answer"
            }
          }
          : response.data.response;
        console.log('Chatbot response:', chatbotResponse);
        const botMessage = { user: false, message: chatbotResponse };
        console.log(botMessage);
        setChatMessages((prevMessages) => [...prevMessages, botMessage]);
      }

      setShowLoader(false);

    } catch (error) {
      console.error(error);
      const botMessage = {
        user: false, message: {
          response_data: "Unable to answer your query. Please try again..",
          response_type: "answer"
        }, recommendation: false, init: true
      };
      setChatMessages((prevMessages) => [...prevMessages, botMessage]);
      setShowLoader(false);
    }
  };
  const Loading = () => {
    return (
      <div style={{ marginLeft: "10px", marginTop: "10px" }}>
        <img src={chatbotIconSrc} alt="Icon" style={{ width: "25px", position: "relative" }} />
        <div className='load-chatbot'>
          <div className="dot-loader red-loader"></div>
          <div className="dot-loader green-loader"></div>
          <div className="dot-loader blue-loader"></div>
        </div>
      </div>
    );
    ;
  };
  const [modalVisible, setModalVisible] = useState(false);

  const handleIconClick = () => {
    setModalVisible(true);
  };
  const [showA, setShowA] = useState(false);
  const toggleShowA = () => setShowA(!showA);
  const toggleclose = () => setShowA(false);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [fileuploaded, setfileuploaded] = useState(false);
  const [fileuploading, setfileuploading] = useState(false);
  const handleFileChange = async (e) => {
    const selectedFiles_var = Array.from(e.target.files);
    console.log(selectedFiles_var);
    setSelectedFiles(selectedFiles_var);
    await handleUpload(selectedFiles_var);
    // setfileuploaded(true);
  };
  const handleUpload = async (selectedFiles_var) => {
    if (selectedFiles_var) {
      try {
        const formData = new FormData();
        selectedFiles_var.forEach((file, index) => {
          console.log(index)
          formData.append(`file`, file);
        });
        console.log(selectedFiles_var);
        setfileuploading(true);
        const response = await axios.post('http://4.175.0.137:5000/uploadFiles', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        console.log('API response:', response.data);
        // const upload_response = response.data;
        // seUploadresponse(upload_response);
        setfileuploading(false);
        if (response.data === "file loaded successfully") {
          console.log('File uploaded successfully!')
          setfileuploaded(true);
          setTimeout(() => {
            setfileuploaded(false);
          }, 2000);
        } else {
          console.error('File upload failed.');
          alert('File upload failed.');
        }
      }
      catch (error) {
        console.log(error)
      }
    } else {
      alert('Please select a file to upload.');
    }
  };
  const [showModal, setShowModal] = useState(false);
  const handleToggleModal = () => {
    setShowModal(!showModal);
  };

  const infocontent = {
    "description": [
      "GenAI can make it easy for the user to refer and search across multiple SOP and MOC documents",
      "Ease of maintenance for SOP and MOC details",
      "Purpose is to reduce manual effort and error while referring to multiple SOP & MOC documents during conduct of daily processes."
    ],
    "BusinessValueProposition": [
      "Reduction in Time investment",
      "Resources can be levered for innovative work",
      "Reduction in effort and cost",
      "Minimize the Risk due to lack of information"
    ],
    "problemStatement": [
      "It is crucial to adhere to SOP & MOC during daily task to avoid risk and meet expected result.",
      "Processing and scanning large amount of data with accuracy is a challenging and time-consuming activity"
    ],
    "Howdoesitwork": [
      "Data Processing",
      "Embedding input data into the Knowledge Graph Database",
      "GenAI Model interaction with the user (e.g., prompt a query)",
      "Text, Meta data"
    ],
    "Technologychoices": [
      "Containerized cloud",
      "deployment",
      "Cloud agnostic",
      "LLM: OpenAI models"
    ]
  }

  return (
    <div className={props.isModal ? "modal-overlay-chatbot" : "overlay-chatbot"}>
      {/* <div className='modal-chatbot'> */}
      <div className={props.isModal ? 'chatbot-chatbot-container' : props.showSecondColumn ? 'modal-chatbot-container' : 'modal-chatbot-container2'}>
        <div className='left-section-chat-chatbot'>
          <div className='top-part-chart-chatbot'>
            <img className='img-chart-chatbot' src={botIcon} alt='Sample' />
            <div className='title-chart-chatbot'>GenAISight Chatbot - <span style={{ color: "#06D6A0", fontWeight: "450" }}> SOP Accelerator </span></div>
            <div style={props.isModal ? { float: "inline-end", "marginLeft": "71%" } : props.showSecondColumn ? { float: "inline-end", "marginLeft": "30%" } : { float: "inline-end", "marginLeft": "57%" }}>
              <img style={props.isModal ? { width: "30px", marginRight: "20px", cursor: "pointer" } : { width: "30px", cursor: "pointer", "float": "right" }} src={question} alt='Sample' onClick={toggleShowA} />
              <img className="sop-info-icon" src={Iicon} onClick={handleToggleModal} />
              {showModal && (
                <Info onClose={() => setShowModal(false)} infocontent={infocontent} />
              )}
              <label className="sop-file-upload">
                <input type="file" multiple onChange={handleFileChange} accept=".pdf" />
                <span>{fileuploaded ? <div class="tick-circle"></div> : (!fileuploading ? <img src={upload} className='uploadicon' /> : <div class="spinner-border spinner-border-sm" role="status">
                </div>)}</span>
              </label>
              {/* <Button onClick={toggleShowA} className="mb-2">
                Toggle Toast <strong>with</strong> Animation
              </Button> */}
              <ToastContainer
                className="p-3"
                position="middle-end"
                onMouseLeave={toggleclose}
                style={props.isModal ? { zIndex: 1, marginRight: "200px", marginTop: "-105px" } : props.showSecondColumn ? { zIndex: 1, marginRight: "47%", marginTop: "-89px" } : { zIndex: 1, marginRight: "9%", marginTop: "-92px" }}>
                <Toast show={showA} onClose={toggleShowA} style={props.showSecondColumn ? { "border": "1px solid #8d97dac5" } : { "border": "1px solid #8d97dac5", width: "600px" }}>
                  <Toast.Header style={{ backgroundColor: "#6c5cd1af", border: "1px solid #6B5CD1" }} >
                    <img
                      src="holder.js/20x20?text=%20"
                      className="rounded me-2"
                      alt=""
                    />
                    <strong className="me-auto">Recommended Questions</strong>
                  </Toast.Header>
                  <Toast.Body style={{ backgroundColor: "#1E203D", fontFamily: "Graphik", fontSize: "12px", fontWeight: "300", border: "1px solid #6B5CD1", overflowY: "auto", height: "155px" }}>
                    {props.questions && props.questions.map((index) => (
                      <ul key={index} className='points'>
                        <li>{index}</li></ul>))}
                  </Toast.Body>
                </Toast></ToastContainer>
              {props.isModal ? <img style={{ "float": "right", "width": "20px", "marginTop": "5px", cursor: "pointer" }} src={close} alt='Sample' onClick={props.closechat} />
                : null}

            </div>
          </div>

          <div className="chat-messages-c-chatbot" ref={scrollContainerRef} style={{ display: "flex", flexDirection: "column" }}>
            {chatMessages.map((message, index) => (
              <div key={index} className={message.user ? 'chat-message-chart-chatbot user-c-chatbot-sop' : 'chat-message-chart-chatbot bot-c-chatbot-sop'} style={{ display: "flex" }}>
                <div className="message-icon-chart-chatbot">
                  <img src={message.user ? userIconSrc : chatbotIconSrc} alt="Icon" className={message.user ? 'icon-chat-user-chatbot' : 'icon-chat-bot-chatbot'} />
                </div>
                <div className={message.user ? 'message-text-chart-chatbot bg-user-chatbot' : 'message-text-chart-chatbot bg-bot-chatbot'} >
                  {/* {index === chatMessages.length - 1 ? (
                      showLoader ? <Loading />
                        : <>{props.renderchatResponse(message)}</>
                    ) : (
                      <>{props.renderchatResponse(message)}</>
                    )} */}

                  {index === chatMessages.length - 1 ? (
                    (
                      <>{props.renderchatResponse(message, index, chatMessages)}


                      </>

                    )
                  ) : (
                    <>{props.renderchatResponse(message, index, chatMessages)}

                    </>
                  )}

                </div>
              </div>
            ))}
            {showLoader ? <Loading /> : null}
          </div>
          <div className='bottom-part-chart-chatbot'>
            <div className="chat-input-chart-chatbot">
              <textarea
                type="text"
                placeholder="Enter your query"
                className='text-chart-chatbot'
                value={inputValue}
                style={{ whiteSpace: 'pre-wrap' }}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    handleSendMessage();
                  }
                }}
                onChange={(e) => setInputValue(e.target.value)}
              />
            </div>
            <div className="send-icon-chatbot">
              {/* <AudioRecorder /> */}
              <img
                className="send-chart-chatbot"
                src={send}
                alt="Send Button"
                onClick={handleSendButtonClick}
              />
            </div>

          </div>

        </div>
        {/* </Col> */}
        {/* </Row> */}
      </div>
      {/* </div> */}
    </div >
  )
}

export default Chatbot