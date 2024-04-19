//import React, { useState, useEffect } from 'react';

import React, { useState, useEffect, Link, useCallback, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import like from './images/Icon-Like.svg';
import dislike from './images/Icon-DisLike.svg';
import share from './images/Group 3306.svg';
import copy from './images/Union.svg';
import Sop from './SOP';
import accbot from './images/Group 3419.svg';
import { faThumbsUp, faThumbsDown, faQuestionCircle } from '@fortawesome/free-solid-svg-icons';
import { Bar } from 'react-chartjs-2';
import { Line } from 'react-chartjs-2';
import cal from './images/cal.svg';
import { Pie } from 'react-chartjs-2';
// import 'chartjs-adapter-react-16';
import { Chart as ChartJS, LinearScale, CategoryScale, PointElement, LineElement, BarElement } from 'chart.js';
import TableComponent from './TableComponent';
import axios from 'axios';
import apmMain from './images/apmMain.svg';
import asset from './images/Group 3759.svg';
import userIconSrc from './images/Group 3550.svg';
import chatbotIconSrc from './images/Frame 2654.svg';
import mic from './images/mic_FILL0_wght400_GRAD0_opsz24 1.svg';
import logo from './images/Accenture.svg';
import Multiselect from 'multiselect-react-dropdown';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
//import Slider from 'rc-slider';
//import 'rc-slider/assets/index.css';

import question from './images/Group 3593.svg';
import refresh from './images/Group 3139.svg';
import Iicon from './images/Group 3440.svg'
import close from './images/Group 3005.svg';
import bell from './images/notfication.svg';
import checkmark from './images/tickmark.svg';
import './CorrosionQuest.css';
import admin from './images/Admin.svg';
import collapsee from './images/Vector.svg';
import browse from './images/browse.svg'
// import map from './map.html';
import drag from './images/drag_and_drop.svg';
import send from './images/send_FILL0_wght400_GRAD0_opsz24 1.svg';
import blue from './images/Admin.svg';
import './Apm.css';
import Info from './Info.js';


const Apm = () => {
  const [showAssetPerformanceContent, setShowAssetPerformanceContent] = useState('');
  const [showAssetPerformancebenchContent, setShowAssetPerformancebenchContent] = useState(true);
  const siteOptions = ['LDPE', 'Butanol'];
  const [apiResponse, setApiResponse] = useState('');
  const navigate = useNavigate(); // Add useNavigate hook
  const [showTypingEffect, setShowTypingEffect] = useState(true);
  const [selectedSite, setSelectedSite] = useState('');
  const [selectedEquipmentTpe, setSelectedEquipmentsType] = useState('');
  const [showQuestionPopup, setShowQuestionPopup] = useState(false);
  const [typingEffectText, setTypingEffectText] = useState('');
  const [fetchedQuestions, setFetchedQuestions] = useState([]);
  const [chatMessages, setChatMessages] = useState([]);
  const [questionsFetched, setQuestionsFetched] = useState(false);
  const [showRegenerateButton, setShowRegenerateButton] = useState(false);
  const [previousQuestion, setPreviousQuestion] = useState('');
  const [inputValue, setInputValue] = useState('');
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [showLoader, setShowLoader] = useState(false);
  const [dateRange, setDateRange] = useState([new Date(), new Date()]);
  const startYear = dateRange[0] ? dateRange[0].getFullYear() : null;
  const endYear = dateRange[1] ? dateRange[1].getFullYear() : null;
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);


  const [selectedEquipmentID, setSelectedEquipmentID] = useState('');
  const [selectedkpi, setSelectedkpi] = useState('');
  const handlePrevButtonClick1 = (event) => {
    navigate('/energy');
  };
  const handlePrevButtonClick2 = (event) => {
    setShowAssetPerformancebenchContent(true)
    setShowAssetPerformanceContent('')
  };
  const handleRegenerate = () => {
    // Reset chat state and trigger a new request with the same question
    setChatMessages([]);
    setShowRegenerateButton(false);
    // Initiate a new request with the same question
    initiateNewRequest(previousQuestion);
  };
  const scrollContainerRef = useRef(null);
  useEffect(() => {
    // Logic to determine when to show the "Regenerate" button
    setShowRegenerateButton(!showLoader && chatMessages.length > 0);
  }, [showLoader, chatMessages]);
  const initiateNewRequest = (question) => {
    handleUserMessage(question);
  };
  const EquipmenttypeOptions = ['Pump', 'Compressor', 'Heat Exchanger'];
  const idOptions = ['Centrifugal', 'Mixed Flow', 'Centrifugal (mixed flow)', 'Axial', 'Shell & Tube'];
  const kpiOptions = ['MTBF', 'MTTF', 'MTTR', 'ALL'];
  const site1Options = {
    LDPE: {
      categories: ['Pump', 'Compressor'],
      types: ['Centrifugal', 'Mixed Flow'],
    },
    Butanol: {
      categories: ['Pump', 'Compressor', 'Heat Exchanger'],
      types: ['Centrifugal (mixed flow)', 'Axial', 'Shell & Tube'],
    },
  };
  const CorrosionQuest = ({ onClose }) => {
    const questions = ["Which equipment has highest MTTR compared to other equipments? Generate the probable reasons of its high MTTR.",
      "Which equipment has highest MTTF comparing to other equipment? Generate the probable reasons of its high MTTF.",
      "Which equipment has highest MTBF compared to others? Generate the probable reasons of its high MTBF.",
      "What are the 3 reasons for Centrifugal pump failure in all these years?",
      "Compare the Maintenance cost of centrifugal pump between 2003 and 2022. Generate the probable reasons.",
      "What are top 3 equipment which are costlier to repair?",
      "What are top 3 equipments which are failing more frequently?",
      "Rank all equipments based on MTTF from 2015 to 2022. Generate the result yearwise.",

      "Which equipment is efficiently working in all these years as per the available data? Provide your analysis behind its efficiency.",
      "How corrosion of equipment is impacting the equipment failure count and MTTF from year to year?"
    ]


    return (
      <div className="modal-overlay-quest">
        <div className="modal-doa-quest">

          <div className="modal-content-quest">
            <div className='analysis-head2-quest'> Recommended Questions
              <img className="close-icon-quest" onClick={onClose} src={close} /></div>
            {questions.map((index) => (
              <ul key={index} className='points'>
                <li>{index}</li></ul>))}

          </div>
        </div>
      </div>
    );
  };


  const showPopupMessage = () => {
    setShowSuccessPopup(true);
    // Set the pop-up message to disappear after a certain time (e.g., 3 seconds)
    setTimeout(() => {
      setShowSuccessPopup(false);
    }, 3000);
  };
  const handleSendMessage = () => {
    if (inputValue.trim() !== '') {
      handleUserMessage(inputValue);
      setInputValue('');
    }
  };
  const scrollToBottom = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTop =
        scrollContainerRef.current.scrollHeight;
    }
  };
  const toggleQuestionPopup = () => {
    setShowQuestionPopup(!showQuestionPopup);
  };
  const handleQuestionClick = (question) => {
    setInputValue(question); // Set the selected question as the chat input
    handleSendMessage(question); // Send the question to the chatbot
    setShowQuestionPopup(false); // Close the question popup
  };
  const handleUserMessage = async (message) => {
    try {
      setShowLoader(true);

      // Make the API call to your Flask server with selectedCompany and selectedCategories
      const response = await axios.post('http://52.157.248.208:5000/chatBot', {
        message

      });
      setShowTypingEffect(true)
      console.log('Chatbot API response:', response.data);

      const chatbotResponse = response.data;
      console.log('Chatbot response:', chatbotResponse);

      const botMessage = { user: false, message: chatbotResponse };
      setChatMessages((prevMessages) => [...prevMessages, { user: true, message }, botMessage]);
    } catch (error) {
      console.error(error);
    } finally {
      setShowLoader(false); // Set loading to false after handling the response or error
    }
  };
  const handleSelectQuestion = (question) => {
    setInputValue(question); // Set the selected question as the chat input
    toggleQuestionPopup(); // Close the pop-up container
    handleSendMessage(question); // Send the question to the chatbot
  };
  const handleFetchQuestions = async () => {
    try {
      setShowLoader(true);
      console.log("hi")
      // // Call an API to fetch questions based on the selected number
      // const response = await axios.post('http://52.143.3.85:5000/fetch_questions',{
      //   selectedCategories: selectedCategories
      // });
      // console.log("hiiiiiiii")
      // console.log(selectedCategories)
      // // Handle the API response here and set the fetched questions
      // const fetchedQuestionsData = response.data; // Adjust this based on your API response structure
      let fetchedQuestionsData;

      if (selectedkpi === "MTTF") {
        fetchedQuestionsData = ['Compare the Maintenance cost of centrifugal pump between 2022 and 2003. Generate the probable reasons?',
          'Which equipment has highest MTTF comparing to other equipment ? Generate the probable reasons of its high MTTF?',
          'Which Equipment ID is efficiently working in all these years as per the available data? Analyze the efficiency based on the KPIs MTTR, MTTF and MTBF?',
          'What are top 3 equipment which are costlier to repair?',
          'What are top 3 equipment which are more frequently going to failure? ',
          'Generate the ranking order of all equipment based on MTTF from 2015 to 2022. Generate the results as per yearwise?',
          'What are the top 3 reasons for Centrifugal pump failure in all these years ? ',
          'How corrosion of equipment is impacting the equipment failure count, MTTF from year to year?',
          'How corrosion of equipment is impacting MTTF of the equipments from year to year?'];
      } else if (selectedkpi === "MTBF") {
        fetchedQuestionsData = ['Compare the Maintenance cost of centrifugal pump between 2022 and 2003. Generate the probable reasons?',
          'Which Equipment ID has highest MTBF comparing to others ? Generate the probable reasons of its high MTBF ?',
          'Which Equipment ID is efficiently working in all these years as per the available data? Analyze the efficiency based on the KPIs MTTR, MTTF and MTBF?',
          'What are top 3 equipment which are costlier to repair?',
          'What are top 3 equipment which are more frequently going to failure? ',
          'What are the top 3 reasons for Centrifugal pump failure in all these years ? ',
          'How corrosion of equipment is impacting the equipment failure count, MTBF from year to year?',
          'How corrosion of equipment is impacting MTBF of the equipments from year to year?'

        ];
      } else if (selectedkpi === "MTTR") {
        fetchedQuestionsData = ['Compare the Maintenance cost of centrifugal pump between 2022 and 2003. Generate the probable reasons?',
          'Which equipment has highest MTTR comparing to other equipment ? Generate the probable reasons of its high MTTR ?',
          'Which Equipment ID is efficiently working in all these years as per the available data? Analyze the efficiency based on the KPIs MTTR, MTTF and MTBF?',
          'What are top 3 equipment which are costlier to repair?',
          'What are top 3 equipment which are more frequently going to failure? ',
          'What are the top 3 reasons for Centrifugal pump failure in all these years ? ',
          'How corrosion of equipment is impacting the equipment failure count, MTTR from year to year?',
          'How corrosion of equipment is impacting MTTR of the equipments from year to year?'
        ];
      } else {
        fetchedQuestionsData = ['Compare the Maintenance cost of centrifugal pump between 2022 and 2003. Generate the probable reasons?',
          'Which equipment has highest MTTR comparing to other equipment ? Generate the probable reasons of its high MTTR ?',
          'Which equipment has highest MTTF comparing to other equipment ? Generate the probable reasons of its high MTTF?',
          'Which Equipment ID has highest MTBF comparing to others ? Generate the probable reasons of its high MTBF ?',
          'Which Equipment ID is efficiently working in all these years as per the available data? Analyze the efficiency based on the KPIs MTTR, MTTF and MTBF?',
          'What are top 3 equipment which are costlier to repair?',
          'What are top 3 equipment which are more frequently going to failure? ',
          'Generate the ranking order of all equipment based on MTTF from 2015 to 2022. Generate the results as per yearwise?',
          'What are the top 3 reasons for Centrifugal pump failure in all these years ? ',
          'How corrosion of equipment is impacting the equipment failure count, MTTF?',
          'How corrosion of equipment is impacting MTTF of the equipments?'

        ]
      }

      setFetchedQuestions(fetchedQuestionsData);
      console.log(fetchedQuestionsData)
      setShowQuestionPopup(true);
      // // Append the fetched questions to the chat
      // const questionComponents = fetchedQuestionsData.map((question, index) => (
      //   <ChatQuestionContainer key={index} question={` ${question}`} />
      // ));
    } catch (error) {
      console.error('Error occurred while fetching questions:', error);
    } finally {
      setShowLoader(false);
      setQuestionsFetched(true);
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
  const handleCompanySelect = (selectedCompany) => {
    setSelectedSite(selectedCompany)
    //setSelectedCategories(selectedCompany);

    // Reset selected categories and equipment types

    setSelectedEquipmentsType('');
    setSelectedEquipmentID('');
  };
  const handleGetStartedClick = () => {
    setShowAssetPerformanceContent('clicked');
    // Add any other logic you want to perform when "Let’s get started!" is clicked
  };
  const handleGetStartedbenchClick = () => {
    setShowAssetPerformancebenchContent(false);
    // Add any other logic you want to perform when "Let’s get started!" is clicked
  };
  const handleSendButtonClick = () => {
    handleSendMessage();


    setInputValue('');
  };
  const createFormattedQuestion = () => {
    const formattedQuestion = `{ 
    
        Site: ${selectedSite} , 
        
        Category: ${selectedEquipmentID},
        
        Type: ${selectedEquipmentTpe},
        
        KPI: ${selectedkpi},
        
        Start year:${startYear},
        End year:${endYear}
        
        }`
    //const formattedQuestion = `You selected ${selectedCompanies}, ${selectedEquipments}, ${selectedtype}, and ${selectedCategories}. What would you like to calculate?`;
    return formattedQuestion;
  };
  const Loading = () => {
    return (
      <div className="loader">

        <div className="dot red"></div>
        <div className="dot green"></div>
        <div className="dot blue"></div>

      </div>
    );
    ;
  };
  const renderResponse = (message, index, chatMessages) => {

    if (message.user) {
      // Render user messages as they are
      return (
        <div className="user-message">
          {/* <span> {message.message}</span> */}
          {showTypingEffect && (index === chatMessages.length - 1) ? <TypingEffect text={message.message} onComplete={() => setShowTypingEffect(false)} /> : <span>{message.message}</span>}
        </div>
      );
    } else {
      // Check the type of response based on the key in message.message

      const responseType = message.message.response.response_type;
      console.log("wwwwwwwwwwwwwwwwww", responseType)
      console.log("aaaaaaaaaaaa", message.message.response.response_type)
      console.log("bbbbbbbbbb", message.message.response.response_data)

      if (responseType === 'answer') {
        // Render text response
        return (
          <div className="bot-text-response-d">
            {/* <span>{message.message.response.response_data}</span> */}
            {showTypingEffect && (index === chatMessages.length - 1) ? <TypingEffect text={message.message.response.response_data} onComplete={() => setShowTypingEffect(false)} /> : <span>{message.message.response.response_data} </span>}
          </div>
        );
      } else if (responseType === 'table') {
        const tableData = message.message.response.response_data

        const columns = tableData.columns.map((column) => ({
          Header: column,
          accessor: column.toLowerCase(),
          Cell: ({ value }) => <span>{value}</span>,
        }));

        const data = tableData.data.map((row) => {
          const rowData = {};
          tableData.columns.forEach((column, index) => {
            rowData[column.toLowerCase()] = row[index];
          });
          return rowData;

        });

        console.log("rrrr", data)
        return (
          <div>
            <div className="bot-table-response" style={{ backgroundColor: "#252843" }}>
              {/* Render the table component */}
              <TableComponent className="mytable" columns={columns} data={data} />
            </div>
            {message.message.response.response_type2 == 'analysis' ? (


              <div className="analysis-response" >
                <p style={{ color: "#D8AC1B", fontSize: "14px", fontWeight: "500" }}>Analysis:</p>
                <p>{message.message.response.response_data2.Analysis}</p>
              </div>

            ) : null}

          </div>
        );
      } else if (responseType === 'bar') {
        // Render bar chart response
        // const response_dict1= message.message;
        const barData = message.message.response.response_data;
        console.log("qqqqqqqqqqqqq", barData)
        const labels1 = barData.columns;
        const labels = barData.data.map((item) => item[0]);
        const data = barData.data.map((item) => item[1]);
        const dataset = {
          labels: labels,
          datasets: [
            {
              label: 'data',
              data: data,
              fill: false,
              // backgroundColor: 'rgba(75, 192, 192, 0.2)', // Bar color
              // borderColor: 'rgba(75, 192, 192, 1)',
              backgroundColor: '#6B5CD1', // Bar color
              borderColor: '#6B5CD1',
              borderWidth: 2,
              color: 'white'
            },

          ],
        };
        // Chart options
        const options = {
          scales: {
            x: {
              beginAtZero: true,
              type: 'category', // For horizontal bar charts, use 'category' scale for x-axis
              title: {
                display: true,
                text: 'Year', // X-axis label
                color: 'white'
              },
              ticks: {
                autoSkip: false, // Prevent automatic label skipping
                maxRotation: 45, // Rotate labels by 45 degrees
                color: 'white'
              },
            },
            y: {
              beginAtZero: true,
              type: 'linear', // Use 'linear' scale for y-axis
              title: {
                display: true,
                text: 'total maintenance cost', // X-axis label
                color: 'white'
              },
              ticks: {
                autoSkip: false, // Prevent automatic label skipping
                maxRotation: 45, // Rotate labels by 45 degrees
                color: 'white'
              },
            },
          },
        };
        // Render the bar chart as you did before
        return (
          <div className="bot-chart-response">
            {/* ... (bar chart rendering logic) */}

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

              <Bar data={dataset} options={options} className="chart-bar" />
            </div>
          </div>
        );
      } else if (responseType === 'line') {
        // Render line chart response
        const response_dict1 = message.message;
        const lineData = message.message.line;
        const labels2 = response_dict1.line.data.map((item) => item[0]);
        const data2 = response_dict1.line.data.map((item) => item[1]);
        const dataset = {
          labels: labels2,
          datasets: [
            {
              label: 'COVID PPE KIT',
              data: data2,
              fill: false,
              borderColor: 'rgba(70,0,114, 1)',
              borderWidth: 3,
            },
          ],
        };
        // Chart options
        const options = {
          scales: {
            x: {
              beginAtZero: true,
              type: 'category', // For horizontal bar charts, use 'category' scale for x-axis
              title: {
                display: true,
                text: 'year', // X-axis label
              },
            },
            y: {
              beginAtZero: true,
              type: 'linear', // Use 'linear' scale for y-axis
              title: {
                display: true,
                text: 'total maintenance cost', // X-axis label
              },
              ticks: {
                autoSkip: false, // Prevent automatic label skipping
                maxRotation: 45, // Rotate labels by 45 degrees
              },
            },
          },
        };

        // Render the line chart as you did before
        return (
          <div className="bot-chart-response">

            {/* ... (line chart rendering logic) */}

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
              </div>
            )} */}
            <div className='bar-box'>
              <h2>Line Chart:</h2>
              <Line data={dataset} options={options} className="chart-bar" />
            </div>
          </div>
        );
      } else {
        // Unknown response type
        return null;
      }
    }
  };
  const QuestionPopup = () => {
    return (
      <div className={`question-popup ${showQuestionPopup ? 'open' : ''}`}>
        <div className="question-popup-content">
          <h2>Recommended Questions</h2>
          <ul>
            {Array.isArray(fetchedQuestions) ? (
              fetchedQuestions.map((question, index) => (
                <li key={index} onClick={() => handleQuestionClick(question)}>
                  {question}
                </li>

              ))
            ) : (
              <p>No questions available</p>
            )}
          </ul>
          <button className='close' onClick={toggleQuestionPopup} >Close</button>
        </div>
      </div>
    );
  };


  const handleFeedback = async (isLiked) => {
    if (!isLiked) { // Check if dislike icon is clicked
      try {
        setShowLoader(true);

        const response = await axios.post('http://52.157.248.208:5000/saveQuery', {
          response: chatMessages[chatMessages.length - 1].message, // Last user query
          query: chatMessages[chatMessages.length - 2].message, // Last bot response
        });

        // Handle the API response here if needed
        console.log('Dislike feedback saved:', response.data);
      } catch (error) {
        console.error('Error occurred while saving dislike feedback:', error);
      } finally {
        setShowLoader(false);
      }
    }
  };
  const disabledButtonStyle = {
    backgroundColor: '#6B5CD1',
    border: '1px solid #6B5CD1',
    width: '80px',
    marginTop: '20px',
    borderRadius: '10px',
    marginLeft: '150px',
    marginRight: '50px',
    cursor: 'not-allowed',
  };
  const enabledButtonStyle = {
    backgroundColor: '#6B5CD1',
    border: '1px solid #6B5CD1',
    width: '80px',
    marginTop: '20px',
    borderRadius: '10px',
    marginLeft: '150px',
    marginRight: '50px',
    color: '#fff'
  };
  const handleProcessButtonClick = async () => {
    try {
      setShowLoader(true);

      const formattedQuestion = createFormattedQuestion();
      setChatMessages(prevMessages => [
        ...prevMessages,
        { user: true, message: formattedQuestion },
      ]);

      const response = await axios.post('http://52.157.248.208:5000/apm_calculator', {
        selectedSite: selectedSite,
        selectedMetric: selectedkpi,
        selectedEquipment: selectedEquipmentTpe,
        selectedType: selectedEquipmentID,
        startYear: startYear,
        endYear: endYear,

      });

      // Handle the API response here if needed
      console.log('API response:', response.data);
      // Update the chat messages with the API response
      setApiResponse(response.data);
      setChatMessages(prevMessages => [
        ...prevMessages,
        { user: false, message: response.data },
      ]);

      // Clear the selected files after successful upload
      showPopupMessage();
    } catch (error) {
      console.error('Error occurred while calling API:', error);
    } finally {
      setShowLoader(false);
    }
  };
  const [infoModal, setShowInfoModal] = useState(false);
  const handleToggleModal = () => {
    setShowInfoModal(true);
  };

  const [modalVisible, setModalVisible] = useState(false);

  const handleIconClick = () => {
    setModalVisible(true);
  };
  const closeModal = () => {
    setModalVisible(false);
  };
  const infocontent = {
    "description": [
      "Gen AI can analyze historical performance data of assets and generate predictive models that anticipate potential failures or performance degradation. These models can help optimize maintenance schedules, reduce downtime, and enhance asset reliability by predicting when maintenance is most needed.",
      "By integrating Gen AI capabilities into Asset Performance Management, organizations can improve the efficiency, reliability, and overall lifecycle management of their assets."
    ],
    "BusinessValueProposition": [
      "Descriptive & Comparative Analysis",
      "Equipment Failure Root Cause analysis ",
      "Informed maintenance strategies",
      "Improve Data-Driven Decision Making",
      "Effective Recommendations ",
      "On-demand calculation of KPIs like MTTR, MTTF, MTBF etc., at an equipment level, FLOC level, asset level."
    ],
    "problemStatement": [
      "In asset-intensive industries, efficient management of equipment performance and maintenance is crucial for maximizing operational efficiency and reducing downtime.",
      "However, manual data analysis and disparate information sources make it challenging for maintenance teams to derive meaningful insights and take proactive actions."
    ],
    "Howdoesitwork": [
      "Data collection (e.g., Historical Formulation Data/Data from raw material/Production parameters)",
      "Data Processing",
      "Embedding input data into the Knowledge Graph Database",
      "GenAI Model interaction with the user (e.g., upload an Image, prompt a query)",
      "Output – Corrosion type and recommendations.",
      "Visual Representation of the Result"
    ],
    "Technologychoices": [
      "Containerized cloud",
      "deployment",
      "Cloud agnostic",
      "LLM: OpenAI models",
      "MySQL"
    ]
  }
  return (
    < div className='apm'>



      {showAssetPerformancebenchContent && showAssetPerformanceContent == '' ? (
        <div>
          <div className='top-apm'>
            <div className='Heading-apm'>
              <div onClick={handlePrevButtonClick1} style={{ color: '#AD8BFF' }}>Oil & Gas </div>
              <div onClick={handlePrevButtonClick2}>/ Asset Performance Management</div>
            </div>
            <>
              {/* <img className='top-sum chatboticon' src={chatbot} alt='Sample' /> */}
              <img className='top-suma1 chatboticon ' src={question} alt='Sample' onClick={handleIconClick} />

              <img className='top-suma chatboticon ' src={Iicon} alt='Sample' onClick={handleToggleModal} />
            </>
          </div>
          <div><img className='apm-img' src={apmMain} alt='apm' /></div>
          {/* {infoModal && (
            <PopupModal
              onClose={() => setShowInfoModal(false)}
            />
          )} */}
          {infoModal && (
            <Info onClose={() => setShowInfoModal(false)} infocontent={infocontent}/>
          )}
          {modalVisible && <CorrosionQuest onClose={closeModal} />}
          <div className='bottom-apm'>
            <div className='feature-apm'>Features</div>
            <div className='bottom2-apm'>
              <div className='bottom1-apm'>
                <div className='heading1-apm'>Asset Performance</div>
                <div className='text1-apm'>Unlock the true potential of your equipment. Analyze essential KPIs such as MTTR, MTTF, MTBF, OEE, and more. Our comprehensive insights provide a deeper understanding of your assets' health, enabling data-driven decisions to minimize downtime and optimize reliability.</div>
                <div className='let-apm' onClick={handleGetStartedClick}>Let’s get started! ➜​  </div>
              </div>
              <div className='bottom1-apm'>
                <div className='heading1-apm'>Asset BenchMarking</div>
                <div className='text1-apm'>Compare your assets not just within your plants but against industry standards. Get a clear view of where you stand, identify areas for improvement, and set new performance benchmarks...</div>
                <div className='let-apm' >Let’s get started! ➜​  </div>
              </div>
              <div className='bottom1-apm'>
                <div className='heading1-apm'>Asset Documentation</div>
                <div className='text1-apm'>Harness the power of AI to get instant insights, answers, and guidance from extensive database of Maintenance SOPs, expert strategies, and other valuable documents. Unlock the knowledge you need to keep your assets running at their best.</div>
                <div className='let-apm' onClick={handleGetStartedbenchClick}>Let’s get started! ➜​  </div>
              </div>
            </div>
          </div>
        </div>
      ) : null}

      {!showAssetPerformancebenchContent && showAssetPerformanceContent == '' ? (
        <div>
          <Sop />
        </div>
      ) : null}

      {showAssetPerformancebenchContent && showAssetPerformanceContent == 'clicked' ? (
        <div className='performance-apm'>

          <div className='top-apm1'>
            <div className='Heading-apm'>
              <div onClick={handlePrevButtonClick1} style={{ color: '#AD8BFF' }}>Oil & Gas </div>
              <div onClick={handlePrevButtonClick2}>/ Asset Performance Management</div>
            </div>
            <>
              {/* <img className='top-sum chatboticon' src={chatbot} alt='Sample' /> */}
              <img className='top-suma2 chatboticon ' src={question} alt='Sample' onClick={handleIconClick} />

              <img className='top-suma chatboticon ' src={Iicon} alt='Sample' onClick={handleToggleModal} />
            </>
          </div>
          <div className='performance1-apm'>
            <div className='left-apm'>
              <div className='top-left-apm'>Asset Performance</div>
              {/* {infoModal && (
                <PopupModal
                  onClose={() => setShowInfoModal(false)}
                />
              )} */}
              {infoModal && (
                <Info onClose={() => setShowInfoModal(false)} />
              )}
              {modalVisible && <CorrosionQuest onClose={closeModal} />}
              <div className='bottom-left-apm'>
                <div className='bottom-top-apm'>
                  <img className='accb-img' src={accbot} alt='apm' />
                  <div style={{ marginTop: '10px', marginLeft: '250px', color: 'white', fontSize: '15px', fontWeight: '400' }}>GenAISight BOT</div>

                </div>
                <div className='bottom-b-apm'>
                  {showQuestionPopup && <QuestionPopup />}

                  <div className="chat-messages-apm" ref={scrollContainerRef} style={{ display: "flex", flexDirection: "column" }}>


                    {chatMessages.map((message, index) => (
                      <div
                        key={index}
                        className={message.user ? 'chat-message-apm user' : 'chat-message-apm bot'}
                        style={{ display: "flex" }}
                      >
                        <div className="message-icon-s">

                          <img src={message.user ? userIconSrc : chatbotIconSrc} alt="Icon" className={message.user ? 'icon-chat-user-apm' : 'icon-chat-bot-apm'} />

                        </div>
                        <div className={message.user ? 'message-text-chart-apm bg-user-apm' : 'message-text-chart-apm bg-bot-apm'} >
                          {index === chatMessages.length - 1 ? (
                            (
                              <>{renderResponse(message, index, chatMessages)}


                              </>

                            )
                          ) : (
                            <>{renderResponse(message, index, chatMessages)}

                            </>
                          )}
                          {message.user ? null : ( // Check if the message is from the bot
                            <div className='message-footer-apm'>
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

                          )}
                        </div>

                      </div>
                    ))}
                    {showLoader && <div className="loading"><Loading /></div>}
                  </div>



                </div>
              </div>
            </div>
            <div className='right-apm'>
              <div className='img-apm-s'>
                <img className='asset-img' src={asset} alt='apm' />
                <div style={{ marginTop: '20px', marginLeft: '20px', fontSize: '15px', fontWeight: '500' }}>Asset Heirarchy Selection</div>

              </div>
              <div className='right-t-apm'>
                <div className='side-apm'>
                  <div className='key-apm' style={{ marginRight: '110px' }}>Site</div>
                  <select
                    value={selectedSite}
                    onChange={(e) => handleCompanySelect(e.target.value)}
                    className=" Category-select"
                  >
                    <option value="">Select Site</option>
                    {siteOptions.map((option, index) => (
                      <option key={index} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </div>

                {selectedSite && (
                  <div className='side-apm'>
                    <div className='key-apm' style={{ marginRight: '27px' }}>Eqipment Category</div>
                    <select
                      value={selectedEquipmentTpe}
                      onChange={(e) => setSelectedEquipmentsType(e.target.value)}
                      className="Category-select"
                    >
                      <option value="">Select Equipment Category</option>
                      {site1Options[selectedSite].categories.map((option, index) => (
                        <option key={index} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  </div>
                )}
                {selectedSite && (
                  <div className='side-apm' >
                    <div className='key-apm' style={{ marginRight: '43px' }}>Equipment Type</div>
                    <select
                      value={selectedEquipmentID}
                      onChange={(e) => setSelectedEquipmentID(e.target.value)}
                      className=" Category-select"
                    >
                      <option value="">Select Equipment Type</option>
                      {site1Options[selectedSite].types.map((option, index) => (
                        <option key={index} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  </div>
                )}
                <div className='side-apm'>
                  <div className='key-apm' style={{ marginRight: '113px' }}>KPI</div>
                  <select
                    value={selectedkpi}
                    onChange={(e) => setSelectedkpi(e.target.value)}
                    className="Category-select"
                  >
                    <option value="">Select metric Type</option>
                    {kpiOptions.map((option, index) => (
                      <option key={index} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </div>
                <div className='side-apm'>
                  <div className='key-apm' style={{ marginRight: '70px' }}>Duration</div>
                  <img className='cal-img' src={cal} alt='apm' />
                  <DatePicker
                    className='date-pick'
                    selected={dateRange[0]}
                    onChange={(date) => setDateRange([date, dateRange[1]])}
                    dateFormat="yyyy"
                    showYearPicker
                    isClearable
                    yearDropdownItemNumber={100}
                  />
                  <DatePicker
                    className='date-pick'
                    selected={dateRange[1]}
                    onChange={(date) => {
                      if (dateRange[0] && date && date <= dateRange[0]) {
                        // Prevent setting the end year if it's not greater than the start year
                        alert("End year must be greater than the start year. Please select again.");
                        setDateRange([dateRange[0], null]); // Reset the end year to null or handle as needed
                        return;
                      }
                      setDateRange([dateRange[0], date]);
                    }}
                    dateFormat="yyyy"
                    showYearPicker
                    isClearable
                    yearDropdownItemNumber={100}
                  />
                </div>

                <button className="button-apm" onClick={handleProcessButtonClick} style={selectedEquipmentTpe && selectedkpi ? enabledButtonStyle : disabledButtonStyle} disabled={!selectedkpi || !selectedSite} >
                  Calculate
                </button>
              </div>
              <div className="chat-input-apm">
                <textarea
                  type="text"
                  placeholder="Enter your query"
                  className="chat-input1-apm"
                  value={inputValue}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      handleSendMessage();
                    }
                  }}
                  onChange={(e) => setInputValue(e.target.value)}
                />
                <div className='mic1-apm'>
                  <img className="send-apm" src={mic} alt='mic' />
                  <img
                    className="send-apm"
                    src={send}
                    alt="Send Button"
                    onClick={handleSendButtonClick}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </div>


  )
}
export default Apm;
