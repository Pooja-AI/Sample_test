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
import close from '../images/close_bplam.svg';
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
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import ToggleButton from 'react-bootstrap/ToggleButton';
import Form from 'react-bootstrap/Form';


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
    console.log('message', message);
    if (message.user) {
      console.log('message user', message.user)
      return (
        <div className="user-message-v">
          <span>{message.message}</span>
        </div>
      );
    }
    else if (message.message == "Hi! How can I assist you today?") {
      console.log('def mes', message.user)
      return (
        <div className="user-message-v">
          <span>{message.message}</span>
        </div>
      );
    }
    else {
      if (message && message.message) {
        console.log('mes', message.message)
        const response_data = message.message.response_data;
        const response_type = message.message.response_type;
        console.log('response data', response_data);
        console.log('response type', response_type);
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
        console.log('resp data1', response_data);
        console.log('resp type1', response_type);
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
        message: message,
        key: props.uploadkey,
        tag: isChecked ? 1 : 2
      };

      const response = await axios.post(props.endpoint, userInput);
      console.log('Chatbot API response:', response.data);
      setShowLoader(false);


      const chatbotResponse = response.data.status_code != 200
        ? {

          response_data: "Unable to answer your query. Please try again..",
          response_type: "answer"

        }
        : response.data.response;
      console.log('Chatbot response:', chatbotResponse);
      const botMessage = { user: false, message: chatbotResponse };
      console.log('bot', botMessage);
      setChatMessages((prevMessages) => [...prevMessages, botMessage]);
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
      <div style={{ marginLeft: "10px" }}>
        <img src={chatbotIconSrc} alt="Icon" style={{ width: "25px", position: "relative" }} />
        <div className='load-chatbot'>
          <div className="dot-loader red-loader" style={{ backgroundColor: '#5858FF' }}></div>
          <div className="dot-loader green-loader" style={{ backgroundColor: '#00ADEB' }}></div>
          <div className="dot-loader blue-loader" style={{ backgroundColor: '#00F2C2' }}></div>
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

  const [checked, setChecked] = useState(false);
  const [radioValue, setRadioValue] = useState('2');

  const radios = [
    { name: 'On', value: '1' },
    { name: 'Off', value: '2' }
  ];

  const [isChecked, setIsChecked] = useState(false);

  const handleChange = () => {
    console.log(isChecked);
    setIsChecked(!isChecked);
  };
  return (
    <div className="modal-overlay-chatbot">
      {/* <div className='modal-chatbot'> */}
      <div className='chatbot-chatbot-container'>
        <div className='left-section-chat-chatbot'>
          <div className='top-part-chart-chatbot'>
            <img className='img-chart-chatbot' src={botIcon} alt='Sample' />
            <div className='title-chart-chatbot'>GenAISight Chatbot</div>
            <div style={{ float: "inline-end", "marginLeft": "56%", display: "flex" }}>
              <span style={{ width: "130px", display: "flex", marginTop: "2px" }}>
                <p style={{ fontSize: "12px", fontFamily: "Graphik", fontWeight: "355", marginRight: "10px", marginTop: "4px" }}>Search Web : </p>
                {/* <ButtonGroup>
              {radios.map((radio, idx) => (
                <ToggleButton
                  key={idx}
                  id={`radio-${idx}`}
                  type="radio"
                  variant={idx % 2 ? 'outline-success' : 'outline-danger'}
                  name="radio"
                  value={radio.value}
                  checked={radioValue === radio.value}
                  onChange={(e) => {console.log(e.currentTarget.value); setRadioValue(e.currentTarget.value)}}
                  style={{height:"25px", fontSize:"12px", fontFamily:"Graphik", fontWeight:"355"}}
                >
                  <p >{radio.name}</p>
                </ToggleButton>
              ))}
            </ButtonGroup> */}
                <Form>
                  <Form.Check
                    type="switch"
                    id="custom-switch"
                    checked={isChecked}
                    onChange={handleChange}
                    style={{  marginTop: "4px" }}
                  />
                </Form>
              </span>
              <img className='icon-chatbot-g' style={{ width: "30px", marginRight: "20px" }} src={question} alt='Sample' onClick={toggleShowA} />
              <ToastContainer
                className="p-3"
                position="middle-end"
                onMouseLeave={toggleclose}
                style={{ zIndex: 1, marginRight: "175px", marginTop: "-100px" }}>
                <Toast show={showA} onClose={toggleShowA} style={{ "border": "1px solid #8d97dac5" }}>
                  <Toast.Header style={{ backgroundColor: "#6c5cd1af", border: "1px solid #6B5CD1" }}>
                    <img
                      src="holder.js/20x20?text=%20"
                      className="rounded me-2"
                      alt=""
                    />
                    <strong className="me-auto" style={{ color: "#FFFFFF" }}>Questions</strong>
                  </Toast.Header>
                  <Toast.Body style={{ backgroundColor: "#1E203D", fontFamily: "Graphik", fontSize: "12px", fontWeight: "300", border: "1px solid #6B5CD1", overflowY: "auto", height: "150px" }}>
                    {props.questions.map((index) => (
                      <ul key={index} className='points'>
                        <li>{index}</li></ul>))}
                  </Toast.Body>
                </Toast></ToastContainer>
              <img className='icon-chatbot-g' style={{ "float": "right", "width": "20px", "marginTop": "5px", cursor: "pointer" }} src={close} alt='Sample' onClick={props.closechat} />

            </div>
          </div>

          <div className="chat-messages-c-chatbot" ref={scrollContainerRef} style={{ display: "flex", flexDirection: "column" }}>
            {chatMessages.map((message, index) => (
              <div key={index} className={message.user ? 'chat-message-chart-chatbot user-c-chatbot' : 'chat-message-chart-chatbot bot-c-chatbot'} style={{ display: "flex" }}>
                <div className="message-icon-chart-chatbot">
                  <img src={message.user ? userIconSrc : chatbotIconSrc} alt="Icon" className={message.user ? 'icon-chat-user-chatbot' : 'icon-chat-bot-chatbot'} />
                </div>
                <div className={message.user ? 'message-text-chart-chatbot bg-user-chatbot' : 'message-text-chart-chatbot bg-bot-chatbot'} >
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
            {/* <div style={{width:"450px", display:"flex", marginTop:"10px"}}>
              <p  style={{fontSize:"12px", fontFamily:"Graphik", fontWeight:"355", marginRight:"10px"}}>Search Web : </p>
            <ButtonGroup>
              {radios.map((radio, idx) => (
                <ToggleButton
                  key={idx}
                  id={`radio-${idx}`}
                  type="radio"
                  variant={idx % 2 ? 'outline-success' : 'outline-danger'}
                  name="radio"
                  value={radio.value}
                  checked={radioValue === radio.value}
                  onChange={(e) => {console.log(e.currentTarget.value); setRadioValue(e.currentTarget.value)}}
                  style={{height:"25px", fontSize:"12px", fontFamily:"Graphik", fontWeight:"355"}}
                >
                  <p style={{paddingBottom:"15px"}}>{radio.name}</p>
                </ToggleButton>
              ))}
            </ButtonGroup>
            </div> */}

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
              <img
                className="send-chart-chatbot"
                src={send}
                alt="Send Button"
                onClick={handleSendButtonClick}
              />
            </div>

          </div>
        </div>
      </div>
    </div >
  )
}

export default Chatbot