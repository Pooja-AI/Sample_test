//import React, { useState, useEffect } from 'react';
import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import userIconSrc from './images/Profile3.svg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faQuestionCircle   } from '@fortawesome/free-solid-svg-icons';
import chatbotIconSrc from './images/chatboat2.svg';
import logo from './images/Accenture.svg';
import Multiselect from 'multiselect-react-dropdown';
import bell from './images/notfication.svg';
import mic from './images/mic.svg';
import checkmark from './images/tickmark.svg';
import admin from './images/Admin.svg';
import collapsee from './images/Vector.svg';
import browse from './images/browse.svg'
// import map from './map.html';
import drag from './images/drag_and_drop.svg';
import send from './images/sent message.svg';
import blue from './images/Admin.svg';



const Sustainability = () => {
  const [selectedCompanies, setSelectedCompanies] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);
  const [detectedCorrosionType, setDetectedCorrosionType] = useState('');
  const [chatbotOpen, setChatbotOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState([]);
  const [questionsFetched, setQuestionsFetched] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [showQuestionPopup, setShowQuestionPopup] = useState(false);
  const [fetchedQuestions, setFetchedQuestions] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [showLoader, setShowLoader] = useState(false);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const CompanyOptions = [{ name: 'Aker-BP', id: 1 },
  { name: 'Exxonmobil', id: 2 },
  { name: 'Chevron', id: 3 }
];

  // New code for the multi-select dropdown
  const [selectedCategories, setSelectedCategories] = useState([]);
  const categoryOptions = [
    { name: 'Climate change and Energy', id: 1 },
    { name: 'Environmental Data', id: 2 },
    { name: 'Health, Safety and Security', id: 3 },
    { name: 'Human Capital', id: 4 },
    { name: 'Governance and Business Ethics', id: 4 },
    { name: 'Social and community relations', id: 4 },
    { name: 'Financial', id: 4 },
    { name: 'Stakeholder Engagement', id: 4 },
    { name: 'Operational Information', id: 4 },
  ];
  // Inside the App component, add the following state and function


const showPopupMessage = () => {
  setShowSuccessPopup(true);
  // Set the pop-up message to disappear after a certain time (e.g., 3 seconds)
  setTimeout(() => {
    setShowSuccessPopup(false);
  }, 3000);
};
const handleQuestionClick = (question) => {
  setInputValue(question); // Set the selected question as the chat input
  handleSendMessage(question); // Send the question to the chatbot
  setShowQuestionPopup(false); // Close the question popup
};
const toggleQuestionPopup = () => {
  setShowQuestionPopup(!showQuestionPopup);
};
  const handleFileSelect = (e) => {
    const selectedFilesArray = Array.from(e.target.files);
    console.log(selectedFilesArray);
    setSelectedFiles(selectedFilesArray);
  };
  const handleCompanySelect = (selectedList, selectedItem) => {
    setSelectedCompanies(selectedList);
  };

  const handleCompanyRemove = (selectedList, removedItem) => {
    setSelectedCompanies(selectedList);
  };
  
  const handleCompanyCheckboxChange = (event) => {
    const company = event.target.value;
    setSelectedCompanies((prevCompanies) =>
      prevCompanies.includes(company)
        ? prevCompanies.filter((item) => item !== company)
        : [...prevCompanies, company]
    );
  };
  const handleCategorySelect = (selectedList, selectedItem) => {
    setSelectedCategories(selectedList);
  };

  const handleCategoryRemove = (selectedList, removedItem) => {
    setSelectedCategories(selectedList);
  };
  
  const handleCategoryCheckboxChange = (event) => {
    const category = event.target.value;
    setSelectedCategories((prevCategories) =>
      prevCategories.includes(category)
        ? prevCategories.filter((item) => item !== category)
        : [...prevCategories, category]
    );
  };
  const handleUserMessage = async (message) => {
    try {
      setShowLoader(true);

  
      // Convert selectedCategories array to a JSON string to send it in the API request
      const selectedCategoriesStr = JSON.stringify(selectedCategories);
      const selectedCompaniesStr = JSON.stringify(selectedCompanies);
      console.log(selectedCompaniesStr)
      console.log(selectedCategoriesStr)

      // Make the API call to your Flask server with selectedCompany and selectedCategories
      const response = await axios.post('https://industrygenai.accenture.com/srg/chatBot', {
        message,
        selectedCompanies:selectedCompaniesStr,
        selectedCategories: selectedCategoriesStr,
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
  
  const handleSendMessage = () => {
    if (inputValue.trim() !== '') {
      handleUserMessage(inputValue);
      setInputValue('');
    }
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
  
      fetchedQuestionsData=['what is the ghg emission intensity of Akerbp and ExxonMobil for FY22? ',
        'what are the Scope 3 emission categories AkerBP and ExxonMobil report on?',
        'What are the various waste management strategies undertaken by Akerbp and ExxonMobil?',
        'What environmental certifications have Akerbp and ExxonMobil obtained?',
        'What is the %of emission associated with refining for Akerbp compared to ExxonMobil?',
        'What is the total fresh water withdrawn by AkerBP and ExxonMobil in 2020 to 2022?',
        'What are the climate related risks identified by AkerBP and ExxonMobil?',
        'What is the total CSR expenditure of Akerbp and ExxonMobil for FY2022?',
        'What is the number of ISO 14001 nonconformities of Akerbp and ExxonMobil for FY2022?',
        'Percentage of employees from underrepresented groups for AkerBP and ExxonMobil as per FY 2022',
        'What is the percentage of independent directors on the board for Akerbp and ExxonMobil?',
        'What is the percentage of percentage of LGBTQ+ employees in leadership positions for AkerBP and ExxonMobil as per FY 2022?']
      
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
  const handleProcessButtonClick = async () => {
    try {
      setShowLoader(true);
      const formData = new FormData();
      console.log(selectedFiles)
  
      // Append each selected file to the formData object
      selectedFiles.forEach((file, index) => {
        console.log(index)
        formData.append(`file`, file);
      });
      console.log("fff",formData)
  
      // Make the API call to your Flask server
      const response = await axios.post('https://industrygenai.accenture.com/srg/uploadFiles', formData, {
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
    }finally {
      setShowLoader(false); // Set loading to false after handling the response or error
    }
  };
  

  const Loading = () => {
    return <div className="loading">Loading...</div>;
  };

  const handleSendButtonClick = () => {
    handleSendMessage();

    
    setInputValue('');
  };

var show = true;
  
        function showCheckboxes() {
            var checkboxes = 
                document.getElementById("checkBoxes");
  
            if (show) {
                checkboxes.style.display = "block";
                show = false;
            } else {
                checkboxes.style.display = "none";
                show = true;
            }
        }
  
  return (

    <div className=" main-s">
      <div className='energy-header-s'>Sustainability Report Generator</div>
      {/* <div className="col-sm-12 header">
      <div className='col-sm-6 logo-header'>
      <div><img className="logo-class" src={logo}/> </div>
      <div className= "Heading"> GenAISight</div>
      </div>

      <div className="col-sm-6 Admin" >
        <div><img  src={bell}/></div>
        <div className='admin-text'>Admin</div>
        <div><img className='admin-img' src={admin}/> </div>
        <img className="collapse-class" src={collapsee}/>
      </div>

      </div> */}
      
      <div className=" second-container-s">
        <div className=' left-section-s'>
        <div className=' select-dropdown-s'>
            <div className=" dropdown-label-s" >Select Company</div>
              <div className=''>
                <Multiselect
                  options={CompanyOptions} 
                  selectedValues={selectedCompanies}
                  onSelect={handleCompanySelect}
                  onRemove={handleCompanyRemove}
                  hidePlaceholder={true}
                  showCheckbox={true}
                
                  displayValue="name"
                  showArrow customArrow ={true} // If you want to show the arrow to open/close the dropdown
                  closeOnSelect={false} // Set this to true if you want to close the dropdown after selectio
                  placeholder="Select Company"
                  className=' Category-select-s'      
                />
             
            </div>
        </div>
          <div className=" select-dropdown-s">
            <div className=" dropdown-label-s" >Select Category</div>
              <div className=''>
                <Multiselect
                  options={categoryOptions} 
                  selectedValues={selectedCategories}
                  onSelect={handleCategorySelect}
                  hidePlaceholder={true}
                  showCheckbox={true}
                  displayValue="name"
                  showArrow customArrow ={true} // If you want to show the arrow to open/close the dropdown
                  closeOnSelect={false} // Set this to true if you want to close the dropdown after selectio
                  placeholder="Select Category"
                  className=' Category-select-s'      
                />
              </div>
            </div>
           
          <div className="upload-container-s">
            <div className='check_mark-s'><img className="check-image-s" src={drag}/></div>
            <div className='placeholder-s'>Upload sustainability Reports and press the process</div>
            <div className='image-s'>
          <div className='browse-container-s'>
                {/* Update the input element to accept multiple files */}
                <div><img className="drag-logo-s" src={browse}/></div>
                <label className="browse-s" htmlFor="imageUpload">Browse here</label>
                <input
                  id="imageUpload"
                  type="file"
                  multiple
                  name="file"
                  style={{ display: "none"}}
                  onChange={handleFileSelect}
                />
              </div>
           </div>
          </div>
           <button className='button-s'  onClick={handleProcessButtonClick}>Process</button>
           <div className="selected-files-container-s">
              {selectedFiles.map((file, index) => (
                <div key={index} className="selected-file-s">
                 <span>{file.name}</span>
                </div>
              ))}
            </div>
        </div>
        <div className=' right-section-s'>
        {showQuestionPopup && <QuestionPopup />}
        <div className="chatbot-container-s">
          <div className='assistant-headingsss'>
        <div className='Assist-header-s'>Assistant</div>
        <div className="fetch-questions-button-s">
          <FontAwesomeIcon icon={faQuestionCircle  } onClick={handleFetchQuestions}/>
          </div>
        </div>
          {showSuccessPopup && (
                <div className="popup-message-s">
                  File loaded successfully!
                </div>
              )}
          {/* <div className='top-chat-container'>
          <div><img className='collapse-img' src={collapsee}/> </div>
          </div> */}
            <div className="chat-messages-s">
              {chatMessages.map((message, index) => (
                <div key={index} className={message.user ? 'chat-message user-s' : 'chat-message bot-s'}>
                  <div className="message-icon-s">
                    <img src={message.user ? userIconSrc : chatbotIconSrc} alt="Icon" />
                  </div>
                  <div className="message-text-s">
                    {message.message.split("\n").map((mes, index) => (
                      <div key={index}>{mes}</div>
                    ))}
                  </div>
                </div>
              ))}
              {showLoader && <Loading />}
            </div>
           

            <div className="chat-input-container-s">
                <input
                  type="text"
                  placeholder="Enter your query"
                  className="chat-input-s"
                  value={inputValue}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        handleSendMessage();
                      }
                    }}
                    onChange={(e) => setInputValue(e.target.value)}
                />
                   <img src={mic} alt='mic'/>
              <img
                  className="send-s"
                  src={send}
                  alt="Send Button"
                  onClick={handleSendButtonClick}
                />
                </div>
          </div>
        </div>
      </div>
       </div>
     
  )
  }
  
export default Sustainability;
