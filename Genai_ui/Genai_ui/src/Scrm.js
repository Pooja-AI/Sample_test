import React, { useState, useEffect, useRef } from 'react';
 import {useNavigate} from 'react-router-dom';
import './Scrm.css';
import './ChatVeg.css';
import './ChatbotV.css';
import Chatbot from './Chatbot';
import axios from 'axios';
import Iicon from './images/Group 3440.svg';
import percent from './images/Group 3215.svg';
import pointer from './images/Group 3214.svg';
import heart from './images/Group 3213.svg';
import close from './images/Group 3005.svg';
import sridevi from './images/Group 3001.svg';
import jegan from './images/Group 3002.svg';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Map from './LeafletScrmMap';
import botIcon from './images/Group 3419.svg';
import userIconSrc from './images/Group 3550.svg';
import chatbotIconSrc from './images/Frame 2654.svg';
import send from './images/send_FILL0_wght400_GRAD0_opsz24 1.svg';
import insights from './images/Group 3650.svg';
import Select from 'react-select';
import GenericDropdown from './Generic_Dropdown';
import HistogramChart from './HistogramChart';
import AzureMapsComponent from './AzureMaps';
import like from "./images/Icon-Like.svg";
import dislike from "./images/Icon-DisLike.svg";
import share from "./images/Group 3306.svg";
import copy from "./images/Union.svg";



const Scrm = () => {
  const [showSecondColumn, setShowSecondColumn] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [recommendationValue, setRecommendationValue] = useState('');
  const [showTypingEffect, setShowTypingEffect] = useState(true);
  const [infoModal, setShowInfoModal] = useState(false);
  const [showLoader, setShowLoader] = useState(false);
  const navigate = useNavigate();
  // const [vendorOptions, setVendorOptions] = useState([]);
  const vendorOptions = [
    { value: 'option1', label: 'SPR-001' },
    { value: 'option2', label: 'SPR-002' },
    { value: 'option3', label: 'SPR-003' },
    { value: 'option4', label: 'SPR-004' }
  ];
 

  const [selectedRoute, setSelectedRoute] = useState('');
  const [selectedSupplier, setSelectedSupplier] = useState('');
  const [selectedShipment, setSelectedShipment] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const handlePrevNav = (event) => {
    navigate('/energy'); 
  };
  
  const handleMapBackBtnClick = (event) => {
    setShowSecondColumn(false);
  };

  const handleStartDateChange = (event) => {
    setStartDate(event.target.value);
  };

  const handleEndDateChange = (event) => {
    setEndDate(event.target.value);
  };

  const handleRouteChange = (value) => {
    setSelectedRoute(value);
  };

  const handleSupplierChange = (value) => {
    setSelectedSupplier(value);
  };

  const handleShowSecondColumn = () => {
    setShowSecondColumn(true);
  };


  

  const handleShipmentChange = (value) => {
    setSelectedShipment(value);
  };
  const defaultSelectedOptions = vendorOptions.map(option => ({ value: option.value, label: option.label, isSelected: true }));
  const [selectedOptions, setSelectedOptions] = useState(defaultSelectedOptions);
  
  const handleSelectChange = (selectedValues) => {
    setSelectedOptions(selectedValues);
  };

  
  const TypingEffect = ({ text, onComplete }) => {
    const [displayText, setDisplayText] = useState('');
  
    useEffect(() => {
      let timeout;
      let displayTextArray;
      if(text.answer){
         displayTextArray = text?.answer?.split('');
      }else{
         displayTextArray = text.split('');
      }
      
    //  const displayTextArray = text?.answer?.split('');
  
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

  const SupplierTable = ({ response }) => {
    if(response) {
      const supplierKeys  = Object.keys(response).filter(key => key.startsWith('SPR-'));
    
    return (
      <div style={{ overflowX: 'auto'}}>
        <table border="1" className='scrm-table'>
          <thead>
          <tr>
            {Object.keys(response[supplierKeys[0]]).map((key) => (
              <th key={key}>{key}</th>
            ))}
          </tr>
          </thead>
          <tbody>
          {supplierKeys.map((supplier) => (
            <tr key={supplier}>
              {Object.values(response[supplier]).map((value, index) => (
                <td key={index}>{value}</td>
              ))}
            </tr>
          ))}
        </tbody>
        </table>
      </div>
    );
    }
    
  };


  const handleToggleModal = () => {
    setShowInfoModal(!infoModal);
  };
  const scrollContainerRef = useRef(null);
  const [chatMessages, setChatMessages] = useState([
    { user: false, message: 'Hi! How can I assist you today?', init: false }, // Default chatbot message
  ]);

  const scrollToBottom = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTop =
        scrollContainerRef.current.scrollHeight;
    }
  };

  const handleUserMessage = async (message) => {
    let userInput = '';
    try {
      if (message.trim() === '') {
        //if the message is blank, do not send it to the API
        return;
      }
      // setChatMessages((prevMessages) => [...prevMessages, { user: true, message, recommendation: false, init: true }]);
      setShowTypingEffect(false);
      //setChatMessages((prevMessages) => [...prevMessages, { user: true, message: message, recommendation: false, init: true }]);
      if(recommendationValue === 'WeatherImpact'){
        
        // setChatMessages((prevMessages) => [...prevMessages, { user: true, message: message, recommendation: false, init: true }]);
        setShowLoader(true);
        
        if (message == "I want to check for West Zone with above selected details?"){
          userInput = {"Zone":"West Zone","City":"Mumbai","Start_Date":startDate,"End_Date":endDate, "user_question": ""};
        } else {
          userInput = {"Zone":"West Zone","City":"Mumbai","Start_Date":startDate,"End_Date":endDate, "user_question": message};;
        }
        const response = await axios.post(
          'http://98.64.76.29:5000/calcWeatherImpact',
          userInput
        );
        const chatbotResponse = response.data;
        let recommendationData1 = "";
        if(chatbotResponse.status_code == 201){
          recommendationData1 = chatbotResponse.message;
        } else if(chatbotResponse.response && chatbotResponse.response.Analysis) {
          recommendationData1 = chatbotResponse.response.Analysis;
        } else {
          recommendationData1 = chatbotResponse.response.answer;
        }

      console.log('Chatbot response:', recommendationData1);

      const botMessage = { user: false, message: recommendationData1 };
      setChatMessages((prevMessages) => [
        ...prevMessages,
        { user: true, message },
        botMessage,
      ]);

      } else if (recommendationValue === 'TransitTime') {
        // setChatMessages((prevMessages) => [...prevMessages, { user: true, message: message, recommendation: false, init: true }]);
          setShowLoader(true);
          if (message == "I want to check for West Zone with selected dates"){
            userInput = {"Zone": "West Zone","Start_Date":startDate,"End_Date":endDate, "user_question": ""};
          } else {
            userInput = {"Zone": "West Zone","Start_Date":startDate,"End_Date":endDate, "user_question": message};
          }
          const response = await axios.post(
          'http://98.64.76.29:5000/calcTransitTimeDev',
          userInput
        );
        const chatbotResponse = response.data;
       

        let recommendationData1 = "";
        if(chatbotResponse.status_code == 201){
          recommendationData1 = chatbotResponse.message;
        } else {
          recommendationData1 = chatbotResponse.response;
        }
      

      const botMessage = { user: false, message: recommendationData1 };
      setChatMessages((prevMessages) => [
        ...prevMessages,
        { user: true, message },
        botMessage,
      ]);
        
        
      } else if (recommendationValue === 'calcImpact') {
       
        setShowLoader(true);
        userInput = {"supplier_id":selectedSupplier,"route":"R010"};
        const response = await axios.post(
          'http://98.64.76.29/calcImpact',
          userInput
        );
        const chatbotResponse = response.data;
      const recommendationData1 = chatbotResponse;
      console.log('Chatbot response:', recommendationData1);

      const botMessage = { user: false, message: recommendationData1 };
      setChatMessages((prevMessages) => [
        ...prevMessages,
        { user: true, message },
        botMessage,
      ]);
        
      } else if (recommendationValue === 'VendorReliability') {
       
          setShowLoader(true);
          const labelsArray = selectedOptions.map(option => option.label);
       if (message == "I want to check for above selected suppliers") {
        userInput = {"Zone":"West Zone","Supplier_List":labelsArray,"Start_Date":startDate,"End_Date":endDate, "user_question":""};
       } else {
        userInput = {"Zone":"West Zone","Supplier_List":labelsArray,"Start_Date":startDate,"End_Date":endDate, "user_question":message};
       }
        const response = await axios.post(
          'http://98.64.76.29:5000/calcVendorReliability',
          userInput
        );
        const chatbotResponse = response.data;
        let recommendationData1 = "";
        if(chatbotResponse.status_code == 201){
          recommendationData1 = chatbotResponse.message;
        } else {
          recommendationData1 = chatbotResponse;
        }
       
      console.log('Chatbot response:', recommendationData1);

      const botMessage = { user: false, message: recommendationData1 };
      setChatMessages((prevMessages) => [
        ...prevMessages,
        { user: true, message },
        botMessage,
      ]);
        
      } else if (recommendationValue === 'calcRouteEfficiency') {
       
        setShowLoader(true);
        if (message == "I want to check for West Zone with above selected details?"){
          userInput = {
            "route": selectedRoute,
            "start_date": startDate,
            "end_date": endDate,
            "user_question": ""
        };
        } else {
          userInput = {
            "route": selectedRoute,
            "start_date": startDate,
            "end_date": endDate,
            "user_question": message
          }
        }
      
      const response = await axios.post(
        'http://98.64.76.29:5000/calcRouteEfficiency',
        userInput
      );
      const chatbotResponse = response.data;
      let recommendationData1 = "";
      if(chatbotResponse.status_code == 201){
        recommendationData1 = chatbotResponse.message;
      } else {
        recommendationData1 = chatbotResponse;
      }

    const botMessage = { user: false, message: recommendationData1 };
    setChatMessages((prevMessages) => [
      ...prevMessages,
      { user: true, message },
      botMessage,
    ]);
      
    }
      setShowLoader(false);
      setShowTypingEffect(true);
        scrollToBottom();
    } catch (error) {
      console.error(error);
      const botMessage = {
        user: false,
        message: 'Failed to Get the response.',
        recommendation: false,
        init: true,
      };
      setChatMessages((prevMessages) => [...prevMessages, botMessage]);
    }
  };

  const setLoaderWithDelay = (recommendationType, index) => {
    // scrollToBottom();
    setTimeout(() => {
      handleDefaultQuestion(recommendationType, index);
      
    }, 2000); // 2000 milliseconds = 2 seconds
  };

  const handlerecomendation = (recommendationType) => {
    // console.log("here", corrosionTrendLoading);
     scrollToBottom();
    let usermessage = 'msg';
    console.log(usermessage);
    if (recommendationType === 'TransitTime') {
      setRecommendationValue('TransitTime');
      usermessage = 'Provide insights on transit time variations?';
      console.log(usermessage);
    } else if (recommendationType === 'WeatherImpact') {
      setRecommendationValue('WeatherImpact');
      usermessage = 'Provide insights about weather impact on shipment deliveries?';
    } else if (recommendationType === 'calcImpact') {
      setRecommendationValue('calcImpact');
      usermessage = 'Estimate future shipment risk?';
    } else if (recommendationType === 'VendorReliability') {
      setRecommendationValue('VendorReliability');
      usermessage = 'Provide insights on vendor reliability analysis?';
    } else if (recommendationType === 'calcRouteEfficiency') {
      setRecommendationValue('calcRouteEfficiency');
      usermessage = 'Provide insights on Route Efficiency?';
    } else {
      usermessage = 'Default Message';
    }
    setChatMessages((prevMessages) => [...prevMessages, { user: true, message: usermessage, recommendation: false, init: true }]);
    setShowLoader(true);
    setLoaderWithDelay(recommendationType, 1);
    
    // handleUserMessage(usermessage);
    // console.log(usermessage);
    // setChatMessages((prevMessages) => [
    //   ...prevMessages,
    //   { user: true, message: usermessage, recommendation: false, init: true },
    // ]);
    // const botMessage = {
    //   user: false,
    //   message: recommendationType,
    //   recommendation: true,
    //   init: true,
    // };
    // setChatMessages((prevMessages) => [...prevMessages, botMessage]);
  };

  const handleDefaultQuestion = (recommendationType, index) => {
    // console.log("here", corrosionTrendLoading);
    // scrollToBottom();

    let botmessage = 'msg';
    console.log(botmessage);
    if (recommendationType === 'TransitTime') {
      if(index === 1){
        botmessage =
        'transittesting';
      console.log(botmessage);
      } else if (index === 2) {
        botmessage = "transittesting";
        // scrollToBottom();
      }
      
    } else if (recommendationType === 'WeatherImpact') {
      botmessage = "weathertesting";
        
    }  else if (recommendationType === 'calcRouteEfficiency') {
      botmessage = "calcRouteEfficiencyTesting";
        
    } else if (recommendationType === 'calcImpact') {
      botmessage =
        'fsretesting';
    } else if (recommendationType === 'VendorReliability') {
      if(index === 1){
        botmessage ='vratesting';
      } 
    } else {
      botmessage = 'Default Message';
    }
    const botMessage = {
      user: false,
      message: botmessage,
      recommendation: false,
      init: true,
    };
    setChatMessages((prevMessages) => [...prevMessages, botMessage]);

    setShowLoader(false);
  };

  const handleSendMessage = () => {
    if (inputValue.trim() !== '') {
      handleUserMessage(inputValue);
      setInputValue('');
    }
  };

  const callSendMessage = (mes) => {
    handleUserMessage(mes);
  };
  const handleSendButtonClick = () => {
    handleSendMessage();
    setInputValue('');
  };
  const Loading = () => {
    // scrollToBottom();
    return (
      <div className='loader'>
        <div className='loader-text'></div>
        <div className='dot red'></div>
        <div className='dot green'></div>
        <div className='dot blue'></div>
      </div>
    );
  };
  const renderchatResponse = (message, index, chatMessages) => {
    console.log(message);
    // scrollToBottom();
    if (message.user) {   
      return (
        <div className='user-message-v'>
          <span>{message.message}</span>
        </div>
      );
    } else if (message.message == 'Hi! How can I assist you today?') {   
      return (
        <div className='user-message-v'>
          {showTypingEffect && (index === chatMessages.length - 1) ? <TypingEffect text={message.message} onComplete={() => setShowTypingEffect(false)} /> : <span>{message.message}</span>}
        </div>
      );
    } else { 
      if (message && message.message || message.message.answer) {
        if(message.message.Impact) {        
          return (
            <div className='bot-text-response-d'>
              <div><b>Analysis:</b></div>
              <span>Due to bad weather conditions(heavy rainfall) and high traffic on the assigned route affecting the shipment's risk level  </span>
              <div><b>Impact:</b> {message.message.Impact}</div> <div><b>Risk Score:</b> {message.message["Risk Score"]}</div>
            </div> 
            );
        } else if(message.message.Histogram) {
            return (
              <div className='bot-text-response-d'>
                {/* <span>{message.message}</span> */}
                <div className="shift-right"><button
                            className='insight-left-button insight-left-button-scrm'
                            onClick={() => handleShowSecondColumn()}
                          >
                            Maps to understand the details
                          </button>
               </div>
                <HistogramChart data={message.message.Histogram} />
                {showTypingEffect && (index === chatMessages.length - 1) ? <TypingEffect text={message.message.Histogram.Analysis} onComplete={() => setShowTypingEffect(false)} /> : <span>{message.message.Histogram.Analysis} </span>}
                <div className='message-footer' style={{minWidth:"500px"}}>
            <div className='col-sm-6' style={{ display: "flex", flexDirection: "row" }}>
              Token:<p style={{ marginLeft: "10px", color: "rgba(216, 172, 27, 1)" }}>{message.message.total_tokens}</p>
              <p className='border-score'>Confidence score:</p> <p style={{ marginLeft: "10px", color: "rgba(216, 172, 27, 1)" }}>90%</p></div>
            <div className='col-sm-6'>
              <img className='msg-icon-copy' src={copy} alt='Sample' />
              <img className='msg-icon-share' src={share} alt='Sample' />
              <img className='msg-icon' src={dislike} alt='Sample' />
              <img className='msg-icon' src={like} alt='Sample' />
            </div>
            </div>
                
                
              </div>
            );
          
          
        } else if(message.message.answer){
          return (
            <div className='bot-text-response-d'>
              {/* <span>{message.message}</span> */}
              {showTypingEffect && (index === chatMessages.length - 1) ? <TypingEffect text={message.message.answer} onComplete={() => setShowTypingEffect(false)} /> : <span>{message.message.answer} </span>}
              <div className='message-footer' style={{minWidth:"500px"}}>
            <div className='col-sm-6' style={{ display: "flex", flexDirection: "row" }}>
              Token :<p style={{ marginLeft: "10px", color: "rgba(216, 172, 27, 1)" }}>{message.message.total_tokens}</p>
              <p className='border-score'>Confidence score :</p> <p style={{ marginLeft: "10px", color: "rgba(216, 172, 27, 1)" }}>90%</p></div>
            <div className='col-sm-6'>
              <img className='msg-icon-copy' src={copy} alt='Sample' />
              <img className='msg-icon-share' src={share} alt='Sample' />
              <img className='msg-icon' src={dislike} alt='Sample' />
              <img className='msg-icon' src={like} alt='Sample' />
            </div>
            </div>
            </div>
          );
        }
        else if(message.message.response && message.message.response.answer) {        
          return (
            <div className='bot-text-response-d'>
              {/* <span>{message.message}</span> */}
              {showTypingEffect && (index === chatMessages.length - 1) ? <TypingEffect text={message.message.response.answer} onComplete={() => setShowTypingEffect(false)} /> : <span>{message.message.response.answer} </span>}
              <div className='message-footer-scrm' style={{minWidth:"500px"}}>
            <div className='col-sm-12' style={{ fontSize: "12px" , display: "flex", flexDirection: "row", flexWrap: "wrap" }}>
              Token :<p style={{ color: "rgba(216, 172, 27, 1)" }}>{message.message.response.total_tokens}</p>
              <p className='border-score'>Answer Relevancy Score : </p> <p style={{color: "rgba(216, 172, 27, 1)" }}>{message.message.response.answer_relevancy_score}</p>
              <p className='border-score'>Context Precision Score : </p> <p style={{ color: "rgba(216, 172, 27, 1)" }}>{message.message.response.contextprecision_score}</p>
              <p className='border-score'>Context Relevant Score : </p> <p style={{  color: "rgba(216, 172, 27, 1)" }}>{message.message.response.contextrelevanct_score}</p>
              <p className='border-score'>Faith Score : </p> <p style={{  color: "rgba(216, 172, 27, 1)" }}>{message.message.response.faith_score}</p>
              <p className='border-score'>Hallucination Score : </p> <p style={{  color: "rgba(216, 172, 27, 1)" }}>{message.message.response.hallucination_score}</p>
              <div style={{ marginLeft: "10px"}}>
              <img className='msg-icon-copy' src={copy} alt='Sample' />
              <img className='msg-icon-share' src={share} alt='Sample' />
              <img className='msg-icon' src={dislike} alt='Sample' />
              <img className='msg-icon' src={like} alt='Sample' />
            </div>
              </div>
           
            </div>
            </div>
          );
        } else if(message.message == "vratesting") {
          return (
            <div className='bot-text-response-d'>
              
              <span>You need insights for which supplier? (Dropdown is multi select) </span>
             <div className='scrm-in-center'>
              <Select
              className='recommendation-type-dropdown scrm-dropdown multi-select'
        options={vendorOptions}
        value={selectedOptions}
        isMulti
        onChange={handleSelectChange}
      />
      <input
                      type='date'
                      id='startDate'
                      name='startDate'
                      className='scrm-dropdown'
                      value={startDate}
        onChange={handleStartDateChange}
                    />

                {/* <label htmlFor="endDate">End Date:</label> */}
                <input
                      type='date'
                      id='endDate'
                      name='endDate'
                      className='scrm-dropdown'
                      value={endDate}
        onChange={handleEndDateChange}
                    />
      <img
                      className='send-chart-veg'
                      src={send}
                      alt='Send Button'
                      onClick={() => {
                        callSendMessage('I want to check for above selected suppliers');
                      }}
                    />
            </div>
            </div>
          );
        } 
        // else if(message.message != "transittesting" &&  && recommendationValue == "TransitTime") {
        //   return (
        //     <div className='bot-text-response-d'>
        //       <div><b>Analysis:</b></div>
        //       <span>Due to bad weather conditions(heavy rainfall) and high traffic on the assigned route affecting the shipment's risk level  </span>
        //       <div><b>Impact:</b> {message.message.Impact}</div> <div><b>Risk Score:</b> {message.message["Risk Score"]}</div>
        //     </div>
        //   );
        // } 
        else if(message.message == "transittesting") {
          return (
            <div className='bot-text-response-d'>
              <span>
                To provide you Transit time variations insights, we require the
                following information from you..
              </span>
              <div className='scrm-center-allign'>
                {/* <label htmlFor="dropdown">Select Option:</label> */}
                <select
                  id='dropdown'
                  name='dropdown'
                  className='recommendation-type-dropdown scrm-dropdown'
                >
                  <option value='option1'>West Zone</option>
                  {/* <option value="option2">Option 2</option>
        <option value="option3">Option 3</option> */}
                </select>
              
              
                {/* <label htmlFor="startDate">Start Date:</label> */}
                <input
                      type='date'
                      id='startDate'
                      name='startDate'
                      className='scrm-dropdown'
                      value={startDate}
        onChange={handleStartDateChange}
                    />

                {/* <label htmlFor="endDate">End Date:</label> */}
                <input
                      type='date'
                      id='endDate'
                      name='endDate'
                      className='scrm-dropdown'
                      value={endDate}
        onChange={handleEndDateChange}
                    />
                <img
                      className='send-chart-veg remove-margin'
                      src={send}
                      alt='Send Button'
                      onClick={() => {
                        callSendMessage('I want to check for West Zone with selected dates');
                      }}
                    />
              </div>
            </div>
          );
        } else if(message.message == "fsretesting"){
          return (
            <div className='bot-text-response-d'>
              <span>If you are looking at any specific zone/shipment, kindly provide the following details.</span>
              <div className="scrm-in-center">
                {/* <label htmlFor="dropdown">Select Option:</label> */}
                <select
                  id='dropdown'
                  name='dropdown'
                  className='recommendation-type-dropdown scrm-dropdown'
                >
                  <option value='option1'>West Zone</option>
                  {/* <option value="option2">Option 2</option>
        <option value="option3">Option 3</option> */}
                </select>
                <GenericDropdown
                    apiUrl='http://98.64.76.29:5000/fetchSuppliers'
                    label='Supplier'
                    onChange={handleSupplierChange}
                  />
                
                    <img
                      className='send-chart-veg'
                      src={send}
                      alt='Send Button'
                      onClick={() => {
                        callSendMessage('I want to check for West Zone with shipment id:' + selectedSupplier);
                      }}
                    />
                  
              </div>
            </div>
          );
        }  else if(message.message == "calcRouteEfficiencyTesting"){
            return (
              <div className='bot-text-response-d'>
                <span>
                  If you are looking at any specific route, kindly provide
                  the following details.
                </span>
                <div className='scrm-in-center'>
                  {/* <label htmlFor="dropdown">Select Option:</label> */}
                  <select
                    id='dropdown'
                    name='dropdown'
                    className='recommendation-type-dropdown scrm-dropdown'
                  >
                    <option value='option1'>West Zone</option>
                    {/* <option value="option2">Option 2</option>
          <option value="option3">Option 3</option> */}
                  </select>
                  <GenericDropdown
                      apiUrl='http://98.64.76.29:5000/fetchRoute'
                      label='RouteID'
                      onChange={handleRouteChange}
                    />
                    <input
                      type='date'
                      id='startDate'
                      name='startDate'
                      className='scrm-dropdown'
                      value={startDate}
        onChange={handleStartDateChange}
                    />
                   
                   
                    <input
                      type='date'
                      id='endDate'
                      name='endDate'
                      className='scrm-dropdown'
                      value={endDate}
        onChange={handleEndDateChange}
                    />
                   
                    
                  <img
                    className='send-chart-veg'
                    src={send}
                    alt='Send Button'
                    onClick={() => {
                      callSendMessage(
                        'I want to check for West Zone with above selected details?'
                      );
                    }}
                  />
                  </div>
                
              </div>
            );
          } 
        else if(message.message == "weathertesting"){
          return (
            <div className='bot-text-response-d'>
              <span>
                If you are looking at any specific zone/shipment, kindly provide
                the following details.
              </span>
              <div className='scrm-in-center'>
                {/* <label htmlFor="dropdown">Select Option:</label> */}
                <select
                  id='dropdown'
                  name='dropdown'
                  className='recommendation-type-dropdown scrm-dropdown'
                >
                  <option value='option1'>West Zone</option>
                  {/* <option value="option2">Option 2</option>
        <option value="option3">Option 3</option> */}
                </select>
                <select
                  id='dropdown'
                  name='dropdown'
                  className='recommendation-type-dropdown scrm-dropdown'
                >
                  <option value='option1'>Mumbai</option>
                </select>
                
                <input
                      type='date'
                      id='startDate'
                      name='startDate'
                      className='scrm-dropdown'
                      value={startDate}
        onChange={handleStartDateChange}
                    />
                 
                 <input
                      type='date'
                      id='endDate'
                      name='endDate'
                      className='scrm-dropdown'
                      value={endDate}
        onChange={handleEndDateChange}
                    />

                <img
                  className='send-chart-veg'
                  src={send}
                  alt='Send Button'
                  onClick={() => {
                    callSendMessage(
                      'I want to check for West Zone with above selected details?'
                    );
                  }}
                />
              </div>
            </div>
          );
        } else if(message.message != "vratesting" && recommendationValue == 'VendorReliability' && message.message.response){
          return (
            <div className='bot-text-response-d'>
             
            <SupplierTable response={message.message.response} /> 
    
              {showTypingEffect && (index === chatMessages.length - 1) ? <TypingEffect text={message.message.response.Analysis} onComplete={() => setShowTypingEffect(false)} /> : <span>{message.message.response.Analysis} </span>}
            </div>
          );
        } else if(message.message.response){   
          return (
            <div className='bot-text-response-d'>
             
            <SupplierTable response={message.message.response} /> 
    
              {showTypingEffect && (index === chatMessages.length - 1) ? <TypingEffect text={message.message.response.Analysis} onComplete={() => setShowTypingEffect(false)} /> : <span>{message.message.response.Analysis} </span>}
            </div>
          );
        } else {
          return (
            <div className='bot-text-response-d'>
              {/* <span>{message.message}</span> */}
              {showTypingEffect && (index === chatMessages.length - 1) ? <TypingEffect text={message.message} onComplete={() => setShowTypingEffect(false)} /> : <span>{message.message} </span>}
            </div>
          );
        }
        
      }

    }
    // } else {
    //   if (message && message.message) {
    //     const response_data = message.message.response.response_data;
    //     const response_type = message.message.response.response_type;
    //     console.log(response_data);
    //     console.log(response_type);
    //     if (response_type === 'answer') {
    //       console.log('answer');
    //       return (
    //         <div className='bot-text-response-d'>
    //           <span>{response_data}</span>
    //         </div>
    //       );
    //     } else if (response_type === 'table') {
    //       console.log('table');
    //       return (
    //         <div className='bot-text-response-d'>
    //           <span>Sure. Table is Ready!</span>
    //         </div>
    //       );
    //     } else if (response_type === 'line') {
    //       console.log('line');
    //       return (
    //         <div className='bot-text-response-d'>
    //           <span>Sure. line chart is Ready!</span>
    //         </div>
    //       );
    //     } else if (response_type === 'bar') {
    //       console.log('table');
    //       return (
    //         <div className='bot-text-response-d'>
    //           <span>Sure. bar graph is Ready!</span>
    //         </div>
    //       );
    //     } else {
    //       console.log('null part');
    //       return null;
    //     }
    //   } else {
    //     return null;
    //   }
    // }
  };
  const PopupModal = ({ onClose }) => {
    return (
      <div className='modal'>
        <div className='modal-content'>
          <div className='left-sec'>
            <div className='top-left modal-section'>
              <ul>
                <li className='first-para'>
                  Gen AI can be leveraged to create a reliable corrosion
                  detecting system where Gen AI algorithms will be used to
                  detect, evaluate, and measure corrosion in industrial
                  equipment, structures, and pipelines. ​
                </li>
                <li>
                  With historical remediation methods, Gen AI can improve
                  corrosion detection accuracy, efficiency, and effectiveness,
                  allowing prompt intervention and informed decision-making for
                  best remediation options.
                </li>
              </ul>
            </div>

            <div className='bottom-left modal-section'>
              <div className='business-Heading'>Business Value Proposition</div>
              <ul>
                <li className='business-items'>Corrosion type detection</li>
                <li className='business-items'>Assess corrosion severity</li>
                <li className='business-items'>Generate workorder</li>
                <li className='business-items'>Reduced maintenance costs</li>
                <li className='business-items'>Enhanced asset longevity</li>
                <li className='business-items'>
                  Improved operational efficacy
                </li>
                <li className='business-items'>Workplace safety</li>
              </ul>
            </div>
          </div>
          <div className='top-right modal-section'>
            <div className='top-1'>
              <div className='business-Heading'>
                What problem are we solving?{' '}
              </div>
              <ul>
                <li className='business-items'>
                  Corrosion presents a formidable obstacle to industries,
                  households, and pipelines, triggering operational disruptions,
                  health hazards, and substantial financial setbacks. Equipment
                  Degradation,Reduced Efficiency
                </li>
                <li className='business-items'>
                  Leaks and Spills, Unplanned Shutdowns
                </li>
                <li className='business-items'>
                  Maintenance Costs, Health and Safety Risks
                </li>
                <li className='business-items'>
                  Environmental Impact, Environmental Impact, Operational
                  Disruptions, etc.
                </li>
              </ul>
            </div>
            <div className='top-2'>
              <div className='business-Heading'>How does it work?</div>
              <ul>
                <li className='business-item'>
                  {' '}
                  Data collection (e.g., Historical Formulation Data​/Data from
                  raw material​/Production parameters​)
                </li>
                <li className='business-item'>Data Processing</li>
                <li className='business-item'>
                  Generating Embedding/ Knowledge Graphs
                </li>
                <li className='business-item'>MySQL Database Storage</li>
                <li className='business-item'>
                  Gen AI Model interaction with the user (e.g., Image
                  classification, chat assistant)
                </li>
                <li className='business-item'>
                  Output – Corrosion details, resolution recommendations,
                  Severity check and Workorder Generation.
                </li>
                <li className='business-item'>
                  Visual Representation of the Result
                </li>
              </ul>
            </div>
            <div className='top-3'>
              <div className='business-Heading'>Technology Choices</div>
              <ul>
                <li className='business-items'>
                  {' '}
                  Containerized cloud deployment
                </li>
                <li className='business-items'>Cloud agnostic</li>
                <li className='business-items'>MySQL</li>
              </ul>
            </div>
          </div>
          <div className='bottom-right modal-section'>
            <div className='top-4'>
              <div className='business-Heading'>Value to clients</div>
              <div className='percent-class'>
                <img className='percent-logo' src={percent} />
                <div className='sub-head-1'>
                  <div className='business-Heading-1'>
                    Enhance Asset Longevity & Reduce Maintenance cost
                  </div>
                  <div className='business-items-1'>
                    Total maintenance cost is always an important performance
                    indicator. Timely Identification of corrosion helps reducing
                    it’s impact ,makes it easy and quick to implement
                    remediation and intern reduce maintenance cost .
                  </div>
                </div>
              </div>
              <div className='percent-class'>
                <img className='percent-logo' src={pointer} />
                <div className='sub-head-1'>
                  <div className='business-Heading-2'>Improve Efficiency</div>
                  <div className='business-items-1'>
                    Corrosion leads to various operational challenges and
                    inefficiencies.
                  </div>
                  <div className='business-items-1'>
                    Corrosion detection plays a crucial role in improving
                    efficiency in an energy plant by identifying and addressing
                    corrosion-related issues early.
                  </div>
                </div>
              </div>
              <div className='percent-class'>
                <img className='percent-logo' src={heart} />
                <div className='sub-head-1'>
                  <div className='business-Heading-2'>Workplace Safety</div>
                  <div className='business-items-1'>
                    Timely corrosion detection significantly enhances workplace
                    safety by preventing accidents, reducing health risks, and
                    promoting a culture of safety.
                  </div>
                </div>
              </div>
            </div>
            <div className='top-5'>
              <div className='business-Heading-3'>Contacts</div>
              <div>
                <img className='sri-logo' src={sridevi} />
              </div>
              <div>
                <img className='sri-logo' src={jegan} />
              </div>
            </div>
          </div>

          <img
            className='close-btn'
            src={close}
            alt='Sample'
            onClick={onClose}
          />
        </div>
      </div>
    );
  };
  return (
    <div className='main-container-scrm'>
      <div className='In-main-container'>
        <div className='Heading-v'>
          <span onClick={handlePrevNav} style={{ color: '#AD8BFF' }}>Oil & Gas </span> / Supply Chain
          Risk Management
        </div>
        <img
          className='top-sum chatboticon'
          src={Iicon}
          alt='Sample'
          onClick={handleToggleModal}
        />
      </div>
      <div class='sec-partition' style={{ display: "flex", flexDirection: "row" }}>
        <Container className='chatbot-container-main scrm-container' style={showSecondColumn ? { width: '50%', margin: '0px'} : { }}>
          <Row>
          {!showSecondColumn && (
           <Col className="col-scrm">
           <div className='right-section-chat-box'>
            
             <div className='text'>
               <div>
                 <p className='insights-head'>
                   <img
                     style={{ marginRight: '7px', width: '20px' }}
                     src={insights}
                     alt='Sample'
                   />
                   Insights
                 </p>
                 <div className='insight-button insight-button-scrm'>
                   <div>
                     <div>
                       <button
                         className='insight-left-button insight-left-button-scrm'
                         onClick={() => handlerecomendation('TransitTime')}
                       >
                         Transit Time Deviation Analysis
                       </button>
                     </div>
                     <div
                       // style={{ marginLeft: '-5px' }}
                     >
                       <button
                         className='insight-left-button insight-left-button-scrm'
                         onClick={() => handlerecomendation('WeatherImpact')}
                       >
                         Weather Impact
                       </button>
                     </div>

                   </div>
                   



                   <div>
                     <div>
                       <button
                         className='insight-left-button insight-left-button-scrm'
                         onClick={() => handlerecomendation('calcRouteEfficiency')}
                       >
                         Route Efficiency Analysis
                       </button>
                     </div>
                   </div>

                   <div>
                     <div>
                     <button
                         className='insight-left-button insight-left-button-scrm'
                         onClick={() => handlerecomendation('VendorReliability')}
                       >
                         Vendor Reliability Analysis
                       </button>
                     </div>
                     <div
                       // style={{ marginLeft: '-5px' }}
                     >
                       <button
                         className='insight-left-button insight-left-button-scrm'
                         onClick={() => handlerecomendation('calcImpact')}
                       >
                         Future Shipment Risk Estimate
                       </button>
                     </div>
                   </div>
                 </div>
               </div>
             </div>
           </div>
         </Col>
          )}
           
            {/* <Col>
              <div className='left-section-chat-box'></div>
            </Col> */}
            <Col className={showSecondColumn ? '' : 'col-scrm'} style={showSecondColumn ? { width: 'auto !important'} : { width: '15% !important;'}}>
              <div className='left-section-chat-veg scrm-change'>
                <div className='top-part-chart-veg'>
                  <img className='img-chart-veg' src={botIcon} alt='Sample' />
                  <div className='title-chart-veg'>GenAISight Chatbot</div>
                  {/* <img className='img-chart-doa' src={close} alt='Sample' /> */}
                </div>

                <div
                  className='chat-messages-c-veg'
                  ref={scrollContainerRef}
                  style={{ display: 'flex', flexDirection: 'column' }}
                >
                  {chatMessages.map((message, index) => (
                    <div
                      key={index}
                      className={
                        message.user
                          ? 'chat-message-chart-veg user-c-veg'
                          : 'chat-message-chart-veg bot-c-veg bot-c-veg-scrm'
                      }
                      style={{ display: 'flex' }}
                    >
                      <div className='message-icon-chart-veg'>
                        <img
                          src={message.user ? userIconSrc : chatbotIconSrc}
                          alt='Icon'
                          className={
                            message.user
                              ? 'icon-chat-user-veg'
                              : 'icon-chat-bot-veg'
                          }
                        />
                      </div>
                      <div
                        className={
                          message.user
                            ? 'message-text-chart-veg bg-user-veg'
                            : 'message-text-chart-veg bg-bot-veg'
                        }
                      >
                        {renderchatResponse(message, index, chatMessages)}
                      </div>
                    </div>
                  ))}
                  {showLoader && <Loading />}
                </div>
                <div className='bottom-part-chart-veg scrm-chat-fix'>
                  <div className='chat-input-chart-veg scrm-chat-fix'>
                    <textarea
                      type='text'
                      placeholder='Enter your query'
                      className='text-chart-veg scrm-chat-fix'
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
                  <div className='send-icon-scrm scrm-chat-fix scrm-send-pos'>
                    <img
                      className='send-chart-veg'
                      src={send}
                      alt='Send Button'
                      onClick={handleSendButtonClick}
                    />
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
        {showSecondColumn && (
          <Container className='chatbot-container-main scrm-container' style={showSecondColumn ? { width: '50%'} : { width: 'auto' }}>  
          <div className='left-section-chat-veg scrm-change'>
          <div className='top-part-chart-veg' style={{ minHeight: '40px' }}>
          <div class="image-container">
               <img src={close}  alt="Close Image" onClick={handleMapBackBtnClick} />
          </div>
          </div>
          <AzureMapsComponent/>
          </div>
         
          </Container>
        )}
        
      </div>

      {infoModal && <PopupModal onClose={() => setShowInfoModal(false)} />}
    </div>
  );
};

export default Scrm;
