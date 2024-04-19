// import { useState, React, useEffect } from 'react'
import React, { useState, useEffect, useRef } from 'react';
import './Chatbot.css';
import botIcon from './images/Group 3419.svg';
import send from './images/send_FILL0_wght400_GRAD0_opsz24 1.svg';
import axios from 'axios';
import mic from './images/mic_FILL0_wght400_GRAD0_opsz24 1.svg';
import Popupchart from './images/Group 3068.svg';
import chatbotIconSrc from './images/Frame 2654.svg';
import userIconSrc from './images/Group 3550.svg';
import insights from './images/Group 3650.svg';
import BarChart from './BarChart';
import PieChart from './Piechart2';
import Botanalysis from './Botanalysis';
import CorrosionTrendChart from './CorrosionTrendChart';
import CorrosionSeverityChart from './CorrosionSeverityChart'
import like from './images/Icon-Like.svg';
import dislike from './images/Icon-DisLike.svg';
import share from './images/Group 3306.svg';
import copy from './images/Union.svg';
import fullScreen from './images/fullScreen.svg';
import close1 from './images/Group 3206.svg';

function Chatbot(props) {
  const detectedCorrosionType = localStorage.getItem('detectedCorrosionType');
  const plantId = localStorage.getItem('plantId');
  const assetId = sessionStorage.getItem('assetId');
  const selectedImage = localStorage.getItem('uploadedImage');
  const [inputValue, setInputValue] = useState('');
  const [showLoader, setShowLoader] = useState(false);

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


  const [chatMessages, setChatMessages] = useState([
    { user: false, message: "Hi! How can I assist you today?", init: false }, // Default chatbot message
  ]);
  const [isLoading, setIsLoading] = useState(true);
  const [keyValueData, setKeyValueData] = useState([]);
  const [data, setData] = useState([]);
  const [Bardata, setBardata] = useState({});
  const [insightsTable, setInsightsTable] = useState({});
  const [rootCauseAnalysis, setrootCauseAnalysis] = useState([]);
  const [preventiveMeasures, setpreventiveMeasures] = useState([]);
  const [scatterAnalysis, setscatterAnalysis] = useState([]);
  const [linechartdata, setlinechartdata] = useState([]);
  const [lineAnalysis, setlineAnalysis] = useState([]);
  const [convertedData, setconvertedData] = useState({});
  const [corrosionImpactLoading, setCorrosionImpactloading] = useState(true);
  const [fetchTwoLoading, setFetchTwoloading] = useState(true);
  const [fetchThreeLoading, setFetchThreeloading] = useState(true);
  const [corrosionTrendLoading, setCorrosionTrendloading] = useState(true);
  const [severityLoading, setSeverityLoading] = useState(true);
  const [analysisLoading, setAnalysisLoading] = useState(true);
  const [onimgview, setonimgview] = useState(false);
  const [showTypingEffect, setShowTypingEffect] = useState(true);
  // Confidence Score

  const corrosionImpact = async () => {
    try {
      const userInput = {
        plantId: plantId || '',
        assetId: assetId || '',
        detectedCorrosionType: detectedCorrosionType || '',
      };
      if (Array.isArray(data) && data.length === 0) {
        const response = await axios.post('http://52.157.248.197:5000/pieOne', userInput);
        const result = response.data;
        setData(result);
        setCorrosionImpactloading(false)
      }
    } catch (error) {
      console.error('Error fetching data from API 1', error);
    }
  };
  const fetchData2 = async () => {
    try {
      const userInput = {
        plantId: plantId || '',
        assetId: assetId || '',
        detectedCorrosionType: detectedCorrosionType || '',
      };

      const response = await axios.post('http://52.157.248.197:5000/barOne', userInput);
      const result = response.data["Bar Chart"];

      const currentYear = new Date().getFullYear();
      const last5YearsData = result.filter(item => item.Year >= currentYear - 4 && item.Year <= currentYear);
      console.log(last5YearsData)

      console.log("bar", result)
      setBardata(last5YearsData);
      setFetchTwoloading(false);
    } catch (error) {
      console.error('Error fetching data from API 2', error);
    }
  };
  const fetchData3 = async () => {
    try {
      const userInput = {
        plantId: plantId || '',
        assetId: assetId || '',
        detectedCorrosionType: detectedCorrosionType || '',
      };

      const response = await axios.post('http://52.157.248.197:5000/tableOne', userInput);
      const result = response.data;
      console.log('respose-table', result)
      localStorage.setItem('metadata', result);
      const convertedArray = Object.entries(result).map(([key, value]) => ({
        key: key,
        value: value
      }));
      setKeyValueData(convertedArray);
      setIsLoading(false)
    } catch (error) {
      console.error('Error fetching data from API 3', error);
    }
  };
  const fetchData4 = async () => {
    const generateRequest = {
      plantId: plantId,
      assetId: assetId,
      detectedCorrosionType: ""
    }
    try {
      console.log("here1");
      if (Object.keys(insightsTable).length === 0 && insightsTable.constructor === Object) {
        const response = await axios.post('http://52.157.248.197:5000/insights', generateRequest);
        console.log('API response:', response.data);
        setInsightsTable(response.data);
        const measures = response.data.analysis["Remedial Measures"] || response.data.analysis["Preventive Measures"];
        console.log(measures);
        setrootCauseAnalysis(response.data.analysis["Root Cause Analysis"]);
        setpreventiveMeasures(measures);
        setscatterAnalysis(response.data.scatterChartData.Analysis);

        setlineAnalysis(response.data.lineChartData.analysis);
        const currentYear = new Date().getFullYear();
        const last5YearsData = response.data.lineChartData.lineChartData.filter(item => item.Year >= currentYear - 4 && item.Year <= currentYear);
        console.log(last5YearsData)
        setlinechartdata(last5YearsData)
        const filteredData = response.data.scatterChartData["Scatter Chart Data"].filter(item => {
          return item["Corrosion Type"] !== "No Severity" &&
            item["Corrosion Type"] !== "none" &&
            item["Corrosion Type"] !== null;
        })
        setconvertedData(filteredData);
        setFetchThreeloading(false);
      }
    }
    catch (error) {
      console.log(error)
    }
  };
  const analysis = async () => {
    const generateRequest = {
      plantId: plantId || '',
      assetId: assetId || '',
      detectedCorrosionType: detectedCorrosionType || ''
    }
    try {
      console.log("here1");
      if (Array.isArray(rootCauseAnalysis) && rootCauseAnalysis.length === 0) {
        const response = await axios.post('http://52.157.248.197:5000/rootCause', generateRequest);
        const measures = response.data["Remedial Measures"] || response.data["Preventive Measures"];
        console.log(measures);
        setrootCauseAnalysis(response.data["Root Cause Analysis"]);
        setpreventiveMeasures(measures);
        setAnalysisLoading(false);
      }
    }
    catch (error) {
      console.log(error)
    }
  };
  const severity = async () => {
    const generateRequest = {
      plantId: plantId || '',
      assetId: assetId || '',
      detectedCorrosionType: detectedCorrosionType || ''
    }
    try {
      if (Object.keys(convertedData).length === 0 && convertedData.constructor === Object) {
        const response = await axios.post('http://52.157.248.197:5000/ScatterOne', generateRequest);
        console.log('API response:', response.data);
        setscatterAnalysis(response.data.Analysis);
        const filteredData = response.data["Scatter Chart Data"].filter(item => {
          return item["Corrosion Type"] !== "No Severity" &&
            item["Corrosion Type"] !== "none" &&
            item["Corrosion Type"] !== null;
        })
        setconvertedData(filteredData);
        setSeverityLoading(false);
      }
    }
    catch (error) {
      console.log(error)
    }
  };



  const corrosiontrend = async () => {
    const generateRequest = {
      plantId: plantId || '',
      assetId: assetId || '',
      detectedCorrosionType: detectedCorrosionType || ''
    }
    try {
      if (Array.isArray(linechartdata) && linechartdata.length === 0) {
        const response = await axios.post('http://52.157.248.197:5000/barTwo', generateRequest);
        console.log('API response:', response.data);
        setlineAnalysis(response.data.analysis);
        const currentYear = new Date().getFullYear();
        const last5YearsData = response.data.lineChartData.filter(item => item.Year >= currentYear - 4 && item.Year <= currentYear);
        console.log(last5YearsData)
        setlinechartdata(last5YearsData)
        setCorrosionTrendloading(false);
      }
    }
    catch (error) {
      console.log(error)
    }
  };

  const scrollContainerRef = useRef(null);

  const scrollToBottom = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTop = scrollContainerRef.current.scrollHeight;
    }
  };
  useEffect(() => {

    Promise.all([fetchData3()])
      .then(() => {
        // setIsLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        setIsLoading(false);
      });
  }, []);

  const [failureLoading, setFailureLoading] = useState(true);
  const handleFormSubmit = () => {
    // e.preventDefault();
    const jsonData = JSON.stringify(formData);
    setTimeout(() => {
      setFailureLoading(false);
      // const botMessage = { user: false, message: "failure", recommendation: true, init: true };
      // setChatMessages((prevMessages) => [...prevMessages, botMessage]);
    }, 3000);
  };

  const handlerecomendation = (recommendationType) => {
    console.log("here", corrosionTrendLoading);
    scrollToBottom();
    let usermessage = "msg";
    console.log(usermessage);
    if (recommendationType === "CostTrend") {
      usermessage = "Inspection Cost Trend?";
      console.log(usermessage);
    }
    else if (recommendationType === "CorrosionImapct") { usermessage = "Historical Corrosion Impact?" }
    else if (recommendationType === "CorrosionTrend") { usermessage = "Corrosion Trend?" }
    else if (recommendationType === "RootAnalysis") { usermessage = "Root Cause Analysis?" }
    else if (recommendationType === "Sop") { usermessage = "SOP and Documentation?" }
    else if (recommendationType === "SeverityImpact") { usermessage = "Corrosion Severity Impact?" }
    else if (recommendationType === "failure") { usermessage = "Expected Time To Loss of process containment?" }
    else if (recommendationType === "RemedialMeasure") { usermessage = "Remedial Measures?" }
    else {
      usermessage = "Default Message";
    }
    console.log(usermessage);
    setChatMessages((prevMessages) => [...prevMessages, { user: true, message: usermessage, recommendation: false, init: true }]);
    if (recommendationType === "CorrosionTrend") { corrosiontrend(); }
    if (recommendationType === "CorrosionImapct") { corrosionImpact() }
    if (recommendationType === "CostTrend" && Object.keys(Bardata).length === 0 && Bardata.constructor === Object) { fetchData2() }
    if (recommendationType === "SeverityImpact") { severity() }
    if (recommendationType === "RootAnalysis") { analysis() }
    if (recommendationType === "RemedialMeasure") { analysis() }
    if (recommendationType === "failure") { handleFormSubmit() }
    const botMessage = { user: false, message: recommendationType, recommendation: true, init: true };
    setChatMessages((prevMessages) => [...prevMessages, botMessage]);
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
  const handleUserMessage = async (message) => {
    try {
      setChatMessages((prevMessages) => [...prevMessages, { user: true, message, recommendation: false, init: true }]);
      setShowLoader(true);
      const userInput = {
        userInput: message,
        plantId: plantId || '',
        assetId: assetId || '',
        detectedCorrosionType: detectedCorrosionType || '',
        //chatMessages: chatMessages || ',',
      };

      const response = await axios.post('http://52.157.248.197:5000/chatBot', userInput);
      console.log('Chatbot API response:', response.data);
      const chatbotResponse = response.data.response === null
        ? "Unable to answer your query. Please try again.."
        : response.data.response;
      console.log('Chatbot response:', chatbotResponse);

      const botMessage = { user: false, message: chatbotResponse };
      setChatMessages((prevMessages) => [...prevMessages, botMessage]);
      setShowLoader(false);
      // setChatMessages((prevMessages) => [...prevMessages, { user: true, message }, botMessage]);

    } catch (error) {
      console.error(error);
      const botMessage = { user: false, message: 'Failed to Get the response.', recommendation: false, init: true };
      setChatMessages((prevMessages) => [...prevMessages, botMessage]);
    }
    // finally {
    //   setShowLoader(false); // Set loading to false after handling the response or error

    // }
  };
  const Loading = () => {
    return (
      <div className="loader">
        <div className='loader-text'></div>
        <div className="dot red-c-sv"></div>
        <div className="dot green-c-sv"></div>
        <div className="dot blue-c-sv"></div>

      </div>
    );
    ;
  };
  const Fetching = () => {
    return (
      // <div className='incident-loader'>
      <div className="loader-f">
        <div className='loader-text'>Fetching from LLM</div>
        <div className="dot red-c-sv"></div>
        <div className="dot green-c-sv"></div>
        <div className="dot blue-c-sv"></div>
      </div>
      // </div>
    );

  };
  const [formData, setFormData] = useState({
    pipelinematerial: 'Carbon Steel',
    pipelineage: '15',
    Operatingpressure: '10',
    OperatingTemp: '80',
    corrosionRate: '0.5',
    stressrange: '20'
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    console.log(name);
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };


  // const CalculateFailure = () => {
  //   return (
  //     <div>
  //       <p>I would be happy to calculate the ETTF for your pipeline. To get started, I will need some information from you. Please provide the following details</p>
  //       <form className="cal-data">
  //       <div className='cal-one col-sm-6'>
  //         <div className='cal-row'>
  //           <label className='col-sm-6'>Pipeline Material :</label>
  //           <input type="text" className='container-cal-data col-sm-6' value={formData.pipelinematerial}
  //             name="pipelinematerial"
  //             autoComplete="off"
  //             id="id1"
  //             onInput={handleInputChange} />
  //         </div>

  //         <div className='cal-row'>
  //           <label className='col-sm-6'>Operating Pressure(MPa) :</label>
  //           <input type="text" className='container-cal-data col-sm-6' value={formData.Operatingpressure}
  //             name="Operatingpressure"
  //             onChange={handleInputChange} />
  //         </div>
  //         <div className='cal-row'>
  //           <label className='col-sm-6'>Corrosion Rate (mm/yr) :</label>
  //           <input type="text" className='container-cal-data col-sm-6' value={formData.corrosionRate}
  //             name="corrosionRate"
  //             onChange={handleInputChange} />
  //         </div>
  //         </div>
  //       <div className='cal-two col-sm-6'>
  //         <div className='cal-row'>
  //           <label className='col-sm-6'>Pipeline Age (yrs) :</label>
  //           <input type="text" className='container-cal-data col-sm-6' value={formData.pipelineage}
  //             name="pipelineage"
  //             onChange={handleInputChange} />
  //         </div>

  //         <div className='cal-row'>
  //           <label className='col-sm-6'>Operating Temperature (Celcius)) :</label>
  //           <input type="text" className='container-cal-data col-sm-6' value={formData.OperatingTemp}
  //             name="OperatingTemp"
  //             onChange={handleInputChange} />
  //         </div>
  //         <div className='cal-row'>
  //           <label className='col-sm-6'>Stress Range (MPa) :</label>
  //           <input type="text" className='container-cal-data col-sm-6' value={formData.stressrange}
  //             name="stressrange"
  //             onChange={handleInputChange} />
  //         </div>
  //         <button type="submit" className="processebutton-calculate" onClick={handleFormSubmit}>Process</button>
  //         </div>
  //         </form>
  //     </div>
  //   )
  // }

  return (
    <div className='main-chat'>
      <div className='left-section-chat'>
        <div className='top-part-chart'>
          <img className='img-chart' src={botIcon} alt='Sample' />
          <div className='title-chart'>GenAISight Chatbot</div>
          {/* <img className='img1-chart' src={Popupchart} alt='Sample' /> */}
        </div>
        <div className='middile-part-chart'>
          <div className="chat-messages-c" ref={scrollContainerRef} style={{ display: "flex", flexDirection: "column" }}>
            {chatMessages.map((message, index) => (
              <div key={index} className={message.user ? 'chat-message-chart user-c' : 'chat-message-chart bot-c'} style={{ display: "flex" }}>
                <div className="message-icon-chart">
                  <img src={message.user ? userIconSrc : chatbotIconSrc} alt="Icon" className={message.user ? 'icon-chat-user' : 'icon-chat-bot'} />
                </div>
                <div className={message.user ? 'message-text-chart bg-user' : 'message-text-chart bg-bot'} >
                  {!message.recommendation ? (<div>
                    {/* {showLoader ? <Loading/> : message.message} */}
                    {message.message}
                    {/* {showTypingEffect && (index === chatMessages.length - 1) ? 
                    <TypingEffect text={message.message} onComplete={() => setShowTypingEffect(false)} /> : <span>{message.message}</span>} */}
                    {message.user ? <></> : (
                      message.init ? <div className='message-footer'>
                        <div className='col-sm-6' style={{ display: "flex", flexDirection: "row" }}>
                          Token :<p style={{ marginLeft: "10px", color: "rgba(216, 172, 27, 1)" }}>55</p>
                          <p className='border-score'>Confidence score :</p> <p style={{ marginLeft: "10px", color: "rgba(216, 172, 27, 1)" }}>90%</p></div>
                        <div className='col-sm-6'>
                          <img className='msg-icon-copy' src={copy} alt='Sample' />
                          <img className='msg-icon-share' src={share} alt='Sample' />
                          <img className='msg-icon' src={dislike} alt='Sample' />
                          <img className='msg-icon' src={like} alt='Sample' />
                        </div>
                      </div> : <></>)}
                  </div>) : null}
                  {(message.recommendation && message.message === "CorrosionTrend") ?
                    (corrosionTrendLoading ? <Loading /> : <div><CorrosionTrendChart data={linechartdata} analysis={lineAnalysis} corrosionTrendLoading={corrosionTrendLoading} />
                      {message.user ? <></> : (
                        message.init ? <div className='message-footer'>
                          <div className='col-sm-6' style={{ display: "flex", flexDirection: "row" }}>
                            Token :<p style={{ marginLeft: "10px", color: "rgba(216, 172, 27, 1)" }}>55</p>
                            <p className='border-score'>Confidence score :</p> <p style={{ marginLeft: "10px", color: "rgba(216, 172, 27, 1)" }}>90%</p></div>
                          <div className='col-sm-6'>
                            <img className='msg-icon-copy' src={copy} alt='Sample' />
                            <img className='msg-icon-share' src={share} alt='Sample' />
                            <img className='msg-icon' src={dislike} alt='Sample' />
                            <img className='msg-icon' src={like} alt='Sample' />
                          </div>
                        </div> : <></>)}
                    </div>) :
                    null
                  }
                  {(message.recommendation && message.message === "CostTrend") ?
                    (fetchTwoLoading ? <Loading /> : (<div><p>Corrosion-based inspection/maintenance cost for this asset is given below:</p><BarChart barChartData={Bardata} />
                      {message.user ? <></> : (
                        message.init ? <div className='message-footer'>
                          <div className='col-sm-6' style={{ display: "flex", flexDirection: "row" }}>
                            Token :<p style={{ marginLeft: "10px", color: "rgba(216, 172, 27, 1)" }}>55</p>
                            <p className='border-score'>Confidence score :</p> <p style={{ marginLeft: "10px", color: "rgba(216, 172, 27, 1)" }}>90%</p></div>
                          <div className='col-sm-6'>
                            <img className='msg-icon-copy' src={copy} alt='Sample' />
                            <img className='msg-icon-share' src={share} alt='Sample' />
                            <img className='msg-icon' src={dislike} alt='Sample' />
                            <img className='msg-icon' src={like} alt='Sample' />
                          </div>
                        </div> : <></>)}</div>)) :
                    null
                  }
                  {(message.recommendation && message.message === "CorrosionImapct") ?
                    (corrosionImpactLoading ? <Loading /> : (<div><p>The historical impact of various corrosion types that have affected this asset is given below:</p><PieChart data={data} />
                      {message.user ? <></> : (
                        message.init ? <div className='message-footer'>
                          <div className='col-sm-6' style={{ display: "flex", flexDirection: "row" }}>
                            Token :<p style={{ marginLeft: "10px", color: "rgba(216, 172, 27, 1)" }}>55</p>
                            <p className='border-score'>Confidence score :</p> <p style={{ marginLeft: "10px", color: "rgba(216, 172, 27, 1)" }}>90%</p></div>
                          <div className='col-sm-6'>
                            <img className='msg-icon-copy' src={copy} alt='Sample' />
                            <img className='msg-icon-share' src={share} alt='Sample' />
                            <img className='msg-icon' src={dislike} alt='Sample' />
                            <img className='msg-icon' src={like} alt='Sample' />
                          </div>
                        </div> : <></>)}</div>)) :
                    null
                  }
                  {(message.recommendation && message.message === "SeverityImpact") ?
                    (severityLoading ? <Loading /> : <div><CorrosionSeverityChart data={convertedData} analysis={scatterAnalysis} />
                      {message.user ? <></> : (
                        message.init ? <div className='message-footer'>
                          <div className='col-sm-6' style={{ display: "flex", flexDirection: "row" }}>
                            Token :<p style={{ marginLeft: "10px", color: "rgba(216, 172, 27, 1)" }}>55</p>
                            <p className='border-score'>Confidence score :</p> <p style={{ marginLeft: "10px", color: "rgba(216, 172, 27, 1)" }}>90%</p></div>
                          <div className='col-sm-6'>
                            <img className='msg-icon-copy' src={copy} alt='Sample' />
                            <img className='msg-icon-share' src={share} alt='Sample' />
                            <img className='msg-icon' src={dislike} alt='Sample' />
                            <img className='msg-icon' src={like} alt='Sample' />
                          </div>
                        </div> : <></>)}
                    </div>) :
                    null
                  }
                  {(message.recommendation && message.message === "RootAnalysis") ?
                    (analysisLoading ? <Loading /> : <div><Botanalysis data={rootCauseAnalysis} heading="Root Cause Analysis" />
                      {message.user ? <></> : (
                        message.init ? <div className='message-footer'>
                          <div className='col-sm-6' style={{ display: "flex", flexDirection: "row" }}>
                            Token :<p style={{ marginLeft: "10px", color: "rgba(216, 172, 27, 1)" }}>55</p>
                            <p className='border-score'>Confidence score :</p> <p style={{ marginLeft: "10px", color: "rgba(216, 172, 27, 1)" }}>90%</p></div>
                          <div className='col-sm-6'>
                            <img className='msg-icon-copy' src={copy} alt='Sample' />
                            <img className='msg-icon-share' src={share} alt='Sample' />
                            <img className='msg-icon' src={dislike} alt='Sample' />
                            <img className='msg-icon' src={like} alt='Sample' />
                          </div>
                        </div> : <></>)}
                    </div>) :
                    null
                  }
                  {(message.recommendation && message.message === "RemedialMeasure") ?
                    (analysisLoading ? <Loading /> : <div><Botanalysis data={preventiveMeasures} heading="Remedial Measures" />
                      {message.user ? <></> : (
                        message.init ? <div className='message-footer'>
                          <div className='col-sm-6' style={{ display: "flex", flexDirection: "row" }}>
                            Token :<p style={{ marginLeft: "10px", color: "rgba(216, 172, 27, 1)" }}>55</p>
                            <p className='border-score'>Confidence score :</p> <p style={{ marginLeft: "10px", color: "rgba(216, 172, 27, 1)" }}>90%</p></div>
                          <div className='col-sm-6'>
                            <img className='msg-icon-copy' src={copy} alt='Sample' />
                            <img className='msg-icon-share' src={share} alt='Sample' />
                            <img className='msg-icon' src={dislike} alt='Sample' />
                            <img className='msg-icon' src={like} alt='Sample' />
                          </div>
                        </div> : <></>)}
                    </div>) :
                    null
                  }
                  {/* {(message.recommendation && message.message === "failure") ?
                    (<div>
                      <p>I would be happy to calculate the ETTF for your pipeline.</p>
                      <form className="cal-data">
                      <div className='cal-one col-sm-6'>
                        <div className='cal-row'>
                          <label className='col-sm-6'>Pipeline Material :</label>
                          <input type="text" className='container-cal-data col-sm-6' value={formData.pipelinematerial}
                            name="pipelinematerial"
                            onInput={handleInputChange} />
                        </div>
              
                        <div className='cal-row'>
                          <label className='col-sm-6'>Operating Pressure(MPa) :</label>
                          <input type="text" className='container-cal-data col-sm-6' value={formData.Operatingpressure}
                            name="Operatingpressure"
                            onChange={handleInputChange} />
                        </div>
                        <div className='cal-row'>
                          <label className='col-sm-6'>Corrosion Rate (mm/yr) :</label>
                          <input type="text" className='container-cal-data col-sm-6' value={formData.corrosionRate}
                            name="corrosionRate"
                            onChange={handleInputChange} />
                        </div>
                        </div>
                      <div className='cal-two col-sm-6'>
                        <div className='cal-row'>
                          <label className='col-sm-6'>Pipeline Age (yrs) :</label>
                          <input type="text" className='container-cal-data col-sm-6' value={formData.pipelineage}
                            name="pipelineage"
                            onChange={handleInputChange} />
                        </div>
              
                        <div className='cal-row'>
                          <label className='col-sm-6'>Operating Temperature (Celcius)) :</label>
                          <input type="text" className='container-cal-data col-sm-6' value={formData.OperatingTemp}
                            name="OperatingTemp"
                            onChange={handleInputChange} />
                        </div>
                        <div className='cal-row'>
                          <label className='col-sm-6'>Stress Range (MPa) :</label>
                          <input type="text" className='container-cal-data col-sm-6' value={formData.stressrange}
                            name="stressrange"
                            onChange={handleInputChange} />
                        </div>
                        <button type="submit" className="processebutton-calculate" onClick={handleFormSubmit}>Process</button>
                        </div>
                        </form>
                    </div>) :
                    null
                  } */}
                  {(message.recommendation && message.message === "failure") ?
                    (failureLoading ? <Loading /> : <div>
                      <div >The estimated ETTF for your pipeline is approximately 10 years.
                        This means that, considering the cyclic stress loads, corrosion rate, and maintenance actions, you can expect your pipeline to operate for an additional
                        10 years before a significant probability of failure due to {detectedCorrosionType}. <br />
                        Here's a brief analysis:
                        <ul>
                          <li>The pipeline has been in service for {formData.pipelineage} years and has undergone regular inspections and occasional repairs. This proactive maintenance has helped extend its operational life</li><br />
                          <li>with a corrosion rate of {formData.corrosionRate} mm/year and stress range of {formData.stressrange} MPa, the pipeline can continue to operate safely for an extended period.</li>
                        </ul></div>
                      {message.user ? <></> : (
                        message.init ? <div className='message-footer'>
                          <div className='col-sm-6' style={{ display: "flex", flexDirection: "row" }}>
                            Token :<p style={{ marginLeft: "10px", color: "rgba(216, 172, 27, 1)" }}>55</p>
                            <p className='border-score'>Confidence score :</p> <p style={{ marginLeft: "10px", color: "rgba(216, 172, 27, 1)" }}>90%</p></div>
                          <div className='col-sm-6'>
                            <img className='msg-icon-copy' src={copy} alt='Sample' />
                            <img className='msg-icon-share' src={share} alt='Sample' />
                            <img className='msg-icon' src={dislike} alt='Sample' />
                            <img className='msg-icon' src={like} alt='Sample' />
                          </div>
                        </div> : <></>)}
                    </div>) :
                    null
                  }
                  {(message.recommendation && message.message === "Sop") ?
                    (analysisLoading ? <Loading /> : <div>Work in progress...
                      {/* {message.user ? <></> : (
                        message.init ? <div className='message-footer'>
                          <div className='col-sm-6' style={{ display: "flex", flexDirection: "row" }}>
                            Token :<p style={{ marginLeft: "10px", color: "rgba(216, 172, 27, 1)" }}>55</p>
                            <p className='border-score'>Confidence score :</p> <p style={{ marginLeft: "10px", color: "rgba(216, 172, 27, 1)" }}>90%</p></div>
                          <div className='col-sm-6'>
                            <img className='msg-icon-copy' src={copy} alt='Sample' />
                            <img className='msg-icon-share' src={share} alt='Sample' />
                            <img className='msg-icon' src={dislike} alt='Sample' />
                            <img className='msg-icon' src={like} alt='Sample' />
                          </div>
                        </div> : <></>)} */}
                    </div>) :
                    null
                  }
                  {/* {message.user ? <></>:(
                   message.init ? <div className='message-footer'>
                    <div className='col-sm-6' style={{display:"flex", flexDirection:"row"}}>
                    Token :<p style={{marginLeft: "10px", color: "rgba(216, 172, 27, 1)"}}>55</p>
                    <p className='border-score'>Confidence score :</p> <p style={{marginLeft: "10px", color: "rgba(216, 172, 27, 1)"}}>90%</p></div>
                    <div className='col-sm-6'>
                    <img className='msg-icon-copy' src={copy} alt='Sample' />
                    <img className='msg-icon-share' src={share} alt='Sample' />
                    <img className='msg-icon' src={dislike} alt='Sample' />
                    <img className='msg-icon' src={like} alt='Sample' />
                    </div>
                  </div>: <></>)} */}
                </div>
              </div>
            ))}
            {/* {showLoader && <Loading />} */}
          </div>
        </div>

      </div>
      <div className='right-section-chat'><div>
        <div className='topside'>
          {isLoading ? (
            <Fetching />
          ) : (
            <div className='topside-table'>
              <table className='key-table-cb'>
                <tbody>
                  <tr>
                    <td>{`Plant ID \u00A0 \u00A0 :\u00A0 \u00A0 \u00A0 \u00A0`}{plantId}</td>
                  </tr>
                  <tr >
                    <td>{`Asset ID \u00A0 \u00A0 :\u00A0 \u00A0 \u00A0 \u00A0`}{assetId}</td>
                  </tr>

                  {keyValueData.map((item, index) => (
                    (item.key === 'Asset') && (
                      <tr key={index}>
                        <td>{`Asset \u00A0 \u00A0 \u00A0 \u00A0 :\u00A0 \u00A0 \u00A0 \u00A0${item.value}`}</td>
                      </tr>
                    )
                  ))}
                  {/* {keyValueData.map((item, index) => (
                    (item.key === 'LastInspectionDate') && (
                      <tr key={index} style={{lineHeight:"30px", marginTop:"15px"}} >
                        <td>{`\u00A0 \u00A0 \u00A0  Last Inspection date \u00A0 \u00A0 \u00A0 \u00A0  \u00A0 \u00A0 \u00A0 \u00A0 \u00A0 \u00A0 ${item.value}`}</td>
                      </tr>
                    )
                  ))} */}
                  {/* <tr>
                        <td>Detected Degradation Mechanism :</td>
                      </tr> */}
                </tbody>
              </table>
            </div>)}
          <div style={{ position: "relative" }}>
            <img src={fullScreen} style={{ position: "absolute", left: "90%", marginTop: "15px", cursor: "pointer" }} onClick={() => { setonimgview(true) }} title="Full Screen" />
            <img className='chatbot-img' src={selectedImage} alt='Sample' />
          </div>
          {
            onimgview && <div className="modal-img-corrosion">
              <div className='modal-corrosion-img'>
                <div>
                  <img src={close1} className="close-img-corrosion" variant="primary" onClick={() => setonimgview(false)} />
                  <img className='chatbot-img-full' src={selectedImage} alt='Sample' /> </div></div></div>
          }
        </div>
        <div className="detected-ct">
          <div className='detected-ct-below'>
            <p className='heading-dt'>Detected Degradation Mechanism</p>
          </div>
          <div><p className='heading-dt1'>{detectedCorrosionType}</p></div>
        </div>
      </div>
        <div className='midside'>
          <p className='insights-head'><img style={{ marginRight: "7px", width: "20px" }} src={insights} alt='Sample' />
            Recommended Insights</p>
          <div className='insight-button'>
            <div style={{ display: "flex" }}>
              <div className='col-sm-6'>
                <button className='insight-left-button' onClick={() => handlerecomendation("CorrosionTrend")}>Corrosion Trend</button>
              </div>
              <div className='col-sm-6' style={{ marginLeft: "-5px" }}>
                <button className='insight-left-button' onClick={() => handlerecomendation("SeverityImpact")}>Corrosion Severity Impact</button>
              </div>
            </div>

            <div>
              <button className='insight-left-button-l' onClick={() => handlerecomendation("failure")}>Expected Time To Loss of process containment</button>
            </div>
            <div style={{ display: "flex" }}>
              <div className='col-sm-6'>
                <button className='insight-left-button' onClick={() => handlerecomendation("RootAnalysis")}>Root Cause Analysis</button>
                <button className='insight-left-button' onClick={() => handlerecomendation("CorrosionImapct")}>Historical Corrosion Impact</button>
                {/* <button className='insight-left-button' onClick={() => handlerecomendation("Sop")}>SOP & Documentation</button> */}
              </div>
              <div className='col-sm-6' style={{ marginLeft: "-5px" }}>
                <button className='insight-left-button' onClick={() => handlerecomendation("RemedialMeasure")}>Remedial Measures</button>
                <button className='insight-left-button' onClick={() => handlerecomendation("CostTrend")}>Inspection Cost Trend</button>
              </div>
            </div>
          </div>
        </div>
        <div className='bottom-part-chart'>
          <div className="chat-input-container-chart">
            <div className="chat-input-chart ">
              <textarea
                type="text"
                placeholder="Enter your query"
                className='text-chart'
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
            <div className="send-icon ">
              {/* <img className='mic-chart' src={mic} alt='mic' /> */}
              <img
                className="send-chart"
                src={send}
                alt="Send Button"
                onClick={handleSendButtonClick}
              />
            </div>
            {/* <div className='send-back-chart'>
              <img
                className="send-chart"
                src={send}
                alt="Send Button"
                onClick={handleSendButtonClick}
              />
            </div> */}
          </div>

        </div>
      </div>
    </div>
  )
}

export default Chatbot