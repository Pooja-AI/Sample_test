import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faQuestionCircle } from '@fortawesome/free-solid-svg-icons';
// import { Bar } from 'react-chartjs-2';
import { Bar } from 'react-chartjs-2';
import { Line } from 'react-chartjs-2';
// import 'chartjs-adapter-react-16';

import { Chart as ChartJS, LinearScale, CategoryScale, PointElement, LineElement, BarElement } from 'chart.js';
import TableComponent from './TableComponent'; 



import browse from './images/browse-d.svg'

// import Table from './Table';
import zip from './images/File.svg';

import drag from './images/drag_and_drop-d.svg';

import send from './images/sent message.svg';
import botIcon from './images/Group 2781.svg';
import userIcon from './images/Group 2757.svg';
import refreshIcon from './images/Group 2815.svg';





 
// Register scales
ChartJS.register(LinearScale, CategoryScale,PointElement,LineElement,BarElement);
 

const App = () => {

 

  const [selectedImage, setSelectedImage] = useState(null);

  const [chatbotOpen, setChatbotOpen] = useState(false);
  const [selectedTab, setSelectedTab] = useState('doc');
  const [showQuestionPopup, setShowQuestionPopup] = useState(false);
  const [fetchedQuestions, setFetchedQuestions] = useState([]);
  const [questionsFetched, setQuestionsFetched] = useState(false);
  const [chatMessages, setChatMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
 
  const [selectedFiles, setSelectedFiles] = useState([]);

  const [showLoader, setShowLoader] = useState(false);
  const [userSentMessage, setUserSentMessage] = useState(false);
  const [operationCount, setOperationCount] = useState(0);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [showSegmentedView, setShowSegmentedView] = useState(false);
  const [botGreetingShown, setBotGreetingShown] = useState(false);
  const [suggestedQuestions, setSuggestedQuestions] = useState([
    // Initialize your suggested questions here
    "How many bottles of SANITIZER 500ML was available on SSV LOUISIANA?",
    "What is the update on well JT Angel?",
    "What is the country in XML?",
  ]);

  const handleQuestionClick = (question) => {
    setInputValue(question); // Set the selected question as the chat input
    handleSendMessage(question); // Send the question to the chatbot
    setShowQuestionPopup(false); // Close the question popup
  };
  const toggleQuestionPopup = () => {
    setShowQuestionPopup(!showQuestionPopup);
  };
  // New code for the multi-select dropdown
  const handleSuggestedQuestion = async (question) => {
    try {
      setShowLoader(true);
  
      // Send the user's question to the server
      const response = await axios.post('https://industrygenai.accenture.com/doa/chatBot', {
        message: question,
      });
  
      const chatbotResponse = response.data;
  
      // Display the user's question and the bot's response
      setChatMessages((prevMessages) => [
        ...prevMessages,
        { user: true, message: question },
        { user: false, message: chatbotResponse },
      ]);
      setSuggestedQuestions([]);
    } catch (error) {
      console.error(error);
    } finally {
      setShowLoader(false);
    }
  };
  

const showPopupMessage = () => {

  setShowSuccessPopup(true);

  // Set the pop-up message to disappear after a certain time (e.g., 3 seconds)

  setTimeout(() => {

    setShowSuccessPopup(false);

  }, 3000);

};

 

  const handleFileSelect = (e) => {

    const selectedFilesArray = Array.from(e.target.files);

    console.log(selectedFilesArray);

    setSelectedFiles(selectedFilesArray);

  };


  

  const handleUserMessage = async (message) => {

    try {

      setShowLoader(true);
      // Convert selectedCategories array to a JSON string to send it in the API request 

      // Make the API call to your Flask server with selectedCompany and selectedCategories

      const response = await axios.post('https://industrygenai.accenture.com/doa/chatBot', {

        message,
      });

 

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

 

 

  const handleProcessButtonClick = async () => {

    try {

      setShowLoader(true);
      console.log("Upload Files started")
      setShowLoader(true);

      const formData = new FormData();

      console.log(selectedFiles)

 

      // Append each selected file to the formData object

      selectedFiles.forEach((file, index) => {

        console.log(index)

        formData.append(`file`, file);

      });

      console.log(formData)

 
      // Make the API call to your Flask server
      const response = await axios.post('https://industrygenai.accenture.com/doa/uploadFiles', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
  
      // Handle the API response here if needed
      console.log('API response:', response.data);
  
      // Clear the selected files after successful upload
      showPopupMessage();
    } catch (error) {
      console.error('Error occurred while uploading files:', error);
    } finally {
      setShowLoader(false); // Set loading to false after handling the response or error
    }
  };
  const handleButtonClick = () => {
    // Perform the first operation
    handleProcessButtonClick();
    handleShowSegmentedView();
    };

  const handleShowSegmentedView = () => {
    setShowSegmentedView(true);
  };
  const handleRemoveFile = (index) => {
    const updatedSelectedFiles = [...selectedFiles];
    updatedSelectedFiles.splice(index, 1);
    setSelectedFiles(updatedSelectedFiles);
  };
  function formatFileSize(bytes) {
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    if (bytes === 0) return '0 Byte';
    const i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
    return Math.round(bytes / Math.pow(1024, i), 2) + ' ' + sizes[i];
  };
  const handleRefresh = () => {
    // Reset all relevant state variables to their initial values
    setSelectedFiles([]);
    setShowSegmentedView(false);
    // Reset other state variables if needed
  };
  const Loading = () => {

    return <div className="loading-d">Loading...</div>;

  };

  const renderResponse = (message) => {
    if (message.user) {
      // Render user messages as they are
      return (
        <div className="user-message=d">
          <span><img src={userIcon} alt="User Icon-d" /> {message.message}</span>
        </div>
      );
    } else {
      // Check the type of response based on the key in message.message
      const responseType = Object.keys(message.message)[0];
      const response1=message.message.response;
      console.log("responses",response1)

      if (response1.response_type === 'answer') {
        // Render text response
        return (
          <div className="bot-text-response-d">
            <span><img src={botIcon} alt="Bot Icon" />{response1.response_data}</span>
          </div>
        );
      } else if (response1.response_type === 'table') {
        // Render table response
        const response_dict3= message.message;
        const tableData = message.message.response;
        const columns = tableData.response_data.columns;
        return (
          <div className="bot-table-response-d">
            {/* ... (table rendering logic) */}
            
             <span><img src={botIcon} alt="Bot Icon" /></span>
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
            
            <div>
            {/* <h2>Table:</h2> */}
          </div>
          {/* Render the table component */}
          <TableComponent className="mytable-d" columns={columns} data={tableData.response_data.data} />
          </div>
        );
      } else if (response1.response_type === 'bar') {
        // Render bar chart response
        const response_dict1= message.message;
        // const barData = message.message.bar;
        const barData=message.message.response;
        // const labels1 = barData.columns;
        const labels = barData.response_data.data.map((item) => item[0]);
        const data = barData.response_data.data.map((item) => item[1]);
        const dataset = {
          labels: labels,
          datasets: [
            {
              label: 'COVID PPE KIT',
              data: data,
              fill: false,
              // backgroundColor: 'rgba(75, 192, 192, 0.2)', // Bar color
              // borderColor: 'rgba(75, 192, 192, 1)',
              // backgroundColor: 'rgba(253,198,35,0.5)', // Bar color
              backgroundColor: 'rgba(92,161,230,1)',
              borderColor: 'rgba(0,42,255,1)',
              borderWidth: 2,
              barPercentage: 0.5,
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
                text: barData.response_data.columns[0], // X-axis label
                font: {
                  weight: 'bold', // Make the text bold
                },
              },
              grid: {
                display: false, // Remove grid lines on the x-axis
              },
            },
            y: {
              beginAtZero: true,
              type: 'linear', // Use 'linear' scale for y-axis
              title: {
                display: true,
                text: barData.response_data.columns[1], // X-axis label
                font: {
                  weight: 'bold', // Make the text bold
                },
              },
            },
          },
        };
        const chartContainerStyle = {
          backgroundColor: 'white',
          padding: '15px', // Add padding to the chart container
        };
        // Render the bar chart as you did before
        return (
          <div className="bot-chart-response-d" style={chartContainerStyle}>
            {/* ... (bar chart rendering logic) */}
            <span><img src={botIcon} alt="Bot Icon" /></span>
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
      } else if (response1.response_type === 'line') {
        // Render line chart response
        const response_dict1= message.message;
        const lineData = message.message.response;
        const labels2 = lineData.response_data.data.map((item) => item[0]);
        const data2 = lineData.response_data.data.map((item) => item[1]);
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
                text: lineData.response_data.columns[0], // X-axis label
                font: {
                  weight: 'bold', // Make the text bold
                },
              },
            },
            y: {
              beginAtZero: true,
              type: 'linear', // Use 'linear' scale for y-axis
              title: {
                display: true,
                text: lineData.response_data.columns[1], // X-axis label
                font: {
                  weight: 'bold', // Make the text bold
                },
              },
              // grid: {
              //   display: false, // Remove grid lines on the y-axis
              // },
            },
          },
        };
        const chartContainerStyle = {
          backgroundColor: 'white',
          padding: '15px', // Add padding to the chart container
        };
        // Render the line chart as you did before
        return (
          <div className="bot-chart-response-d" style={chartContainerStyle}>
            {/* ... (line chart rendering logic) */}
            <span><img src={botIcon} alt="Bot Icon" /></span>
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
    }
  };

  useEffect(() => {
    if (showSegmentedView && !botGreetingShown) {
      const botGreeting = {"message":"Success","response":{"response_type":"answer","response_data":"Hello! What can I help you with?"},"status_code":"200"};
      setChatMessages((prevMessages) => [
        ...prevMessages,
        { user: false, message: botGreeting },
      ]);
      setBotGreetingShown(true);
    }
  }, [showSegmentedView, botGreetingShown]);
 

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
  
      fetchedQuestionsData=['Provide total depth of different wells.',
                        'Provide the drilling report on GCHAR?',
                        'Can you provide the drilling report on VIV-12 in tabular form?',
                        'Plot a bar graph on Mud PPG of different wells?',
                        'Provide a drilling report on different wells',
                      'Provide a drilling operations update on different wells']
                              
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
  const ChatQuestionContainer = ({ question, onClick }) => {
    return (
      <div className="chat-messages questions-container">
        <div className='chat-question-container'>{question}</div>
      {/* {fetchedQuestions.map((question, index) => (
        <ChatQuestionContainer
          key={index}
          question={` ${question}`}
          onClick={() => handleUserMessage(question)} // Send the question to the chatbot when clicked
        />
      ))} */}
    </div>
  
    );
  };
  // Check if fetchedQuestions is an array before mapping over it
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
 

  const handleSendButtonClick = () => {

    handleUserMessage(inputValue);
    setInputValue('');
    setUserSentMessage(true);

  };
  
  const handleSendMessage = () => {
    if (inputValue.trim() !== '') {
      handleUserMessage(inputValue);
      setInputValue('');
    }
  };
 

var show = true;



  return (

 

    <div className="main-d">

      <div>
      
      {showSegmentedView ? (
      <div className='second-container-prev-d'>
      <div className= "Heading5-d"> Drilling Operations Assistant</div>
      <div className="second-container-d">
        
        <div className=' left-section-d'>
        <button className="refresh-button-d" onClick={handleRefresh}>
          <img className='refresh-button-img-d' src={refreshIcon} alt="Refresh" />
        </button>
        <div className= "Heading4-d"> <p>Upload Zip File (pdf,xml)</p></div>
          <div className="upload-container2-d">

           
            <div className='placeholders-d'>
            
            <div className='Placeholder3-d'>Drag and Drop Files here</div>
            <div className='Placeholder4-d'>Limit 200 MB per file -zip</div>
            </div>

          <div className='browse-container2-d'>

                {/* Update the input element to accept multiple files */}

                <div><img className="drag-logo-d" src={browse}/></div>

                <label className="browse-d" htmlFor="imageUpload">Browse Files:</label>
             
              </div>

          </div>
          <div className="selected-files-container2-d">

          {selectedFiles.map((file, index) => (

            <div key={index} className="selected-file-d">

            <span><img  src={zip}></img>  {file.name}</span>
            <span className="file-size-d">{formatFileSize(file.size)}</span>
            <button
            className="remove-file-button2-d"
            onClick={() => handleRemoveFile(index)}
          >
            &#10005;
          </button>

            </div>

          ))}

          </div>

        </div>

        <div className='right-section-d'>
        <div className="fetch-questions-button-o">
          <FontAwesomeIcon icon={faQuestionCircle  } onClick={handleFetchQuestions}/>
          {showQuestionPopup && <QuestionPopup />}
          </div>
        <div className="chatbot-container-d">

          {showSuccessPopup && (

                <div className="popup-message-d">

                  File loaded successfully!

                </div>

              )}

         
<div className="chat-messages-d">
        {chatMessages.map((message, index) => (
          <div key={index} className={message.user ? 'chat-message-d user-d' : 'chat-message bot-d'}>
            {message.user ? (
              renderResponse(message) // Render user messages using the renderResponse function
            ) : (
              <div className="bot-message-d">
                {/* Render bot icon */}
                {renderResponse(message)} {/* Render bot responses using the renderResponse function */}
              </div>
            )}
          </div>
        ))}
        {showLoader && <Loading />}
      </div>

            
            <div className="chat-input-container-d">

           

            <input
                  type="text"
                  placeholder="Enter your query"
                  className="chat-input-d"
                  value={inputValue}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        handleSendMessage();
                      }
                    }}
                    onChange={(e) => setInputValue(e.target.value)}
                />

              <img

              className="send-d"

              src={send}

              alt="Send Button"

              onClick={handleSendButtonClick}

            />

            </div>
            
           

          </div>

        </div>

      </div>
      </div>
      ) :
      <div className='browse-screen-container-d'>
        <div className= "Heading3-d"> <h1><strong>Drilling Operations Assistant</strong></h1></div>
      <div className= "Heading6-d"> <p>Upload Zip File (pdf,xml)</p></div>

     
        <div className="upload-container-d">
        <div className='check_mark-d'><img className="drag-logo" src={drag}/></div>
        <div className='placeholders-d'>
        <div className='Placeholder-d'>Drag and Drop Files here</div>
        <div className='Placeholder2-d'>Limit 200 MB per file -zip</div>
        </div>

        <div className='browse-container-d'>

          {/* Update the input element to accept multiple files */}

          <div><img className="drag-logo-d" src={browse}/></div>

          <label className="browse-d" htmlFor="imageUpload">Browse Files:</label>

          <input

            id="imageUpload"

            type="file"

            multiple

            name="file"

            style={{ display: "none"}}

            onChange={handleFileSelect}

          />

        </div>

        {/* </div> */}

        </div>
        <div className="selected-files-container-d">

          {selectedFiles.map((file, index) => (

            <div key={index} className="selected-file-d">

            <span ><img  src={zip}></img>  {file.name}</span>
            <span className="file-size-d">{formatFileSize(file.size)}</span>
            <button
            className="remove-file-button-d"
            onClick={() => handleRemoveFile(index)}
          >
            &#10005;
          </button>

            </div>

          ))}

          </div>
                 <div>
      <button className='processbutton-d' onClick={handleButtonClick}>Process</button>
    </div>
      </div>
      }
      </div>
       
  </div>

     

  )

  }

 

export default App;