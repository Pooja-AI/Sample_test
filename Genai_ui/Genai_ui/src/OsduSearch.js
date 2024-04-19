import React, { useState, useEffect, useCallback, useRef } from "react";
import mic from "./images/mic.svg";
import axios from "axios";
import Toast from "react-bootstrap/Toast";
import ToastContainer from "react-bootstrap/ToastContainer";

import userIconSrc from "./images/Group 3550.svg";
import chatbotIconSrc from "./images/Frame 2654.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import question from "./images/Group 3593.svg";
import {
  faChartBar,
  faChartPie,
  faFileAlt,
  faTable,
} from "@fortawesome/free-solid-svg-icons";
import { faQuestionCircle } from "@fortawesome/free-solid-svg-icons";
import logo from "./images/Accenture_logo.svg";
import pdf from "./images/pdf.svg";
// import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import graph from "./images/Barchart.svg";
import pie from "./images/pie.svg";
import doc from "./images/text.svg";
import table from "./images/Table2.svg";
import Multiselect from "multiselect-react-dropdown";
import bell from "./images/notfication.svg";
import checkmark from "./images/tickmark.svg";
import admin from "./images/Admin.svg";
import collapsee from "./images/Vector.svg";
import browse from "./images/browse.svg";
// import map from './map.html';
import drag from "./images/drag_and_drop.svg";
import send from "./images/send_FILL0_wght400_GRAD0_opsz24 1.svg";
// Import Card component for styling the accordion items

import blue from "./images/Admin.svg";
import "./OsduSearch.css";
import Iicon from './images/Group 3440.svg'
import Info from './Info.js';

const OsduSearch = () => {
  // const [selectedCompanies, setSelectedCompanies] = useState('');
  const [responseData, setResponseData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const [data, setData] = useState([]);
  const [htmlContent, setHtmlContent] = useState("");
  const [graphContent, setGraphContent] = useState("");
  const [lines, setLinesdata] = useState([]);
  const [jsonString, setStringify] = useState([]);
  const [selectedIcon, setSelectedIcon] = useState(null);
  const [imageURL, setImageURL] = useState("");
  const [selectedTab, setSelectedTab] = useState("doc");
  const [showQuestionPopup, setShowQuestionPopup] = useState(false);
  const [fetchedQuestions, setFetchedQuestions] = useState([]);
  const [questionsFetched, setQuestionsFetched] = useState(false);
  // const [selectedImage, setSelectedImage] = useState(null);
  const [selectedSchema, setSelectedSchema] = useState("");
  const [enterId, setSelectedID] = useState("");
  const [jsonQueryValue, setJsonQueryValue] = useState(false);
  const [htmlText, setHtmlText] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  const [showResponse, setShowResponse] = useState(false);
  const [showTypingEffect, setShowTypingEffect] = useState(true);
  const [isJsonResponseDelayed, setIsJsonResponseDelayed] = useState(false);
  const [isJsonLoading, setIsJsonLoading] = useState(false);

  const scrollContainerRef = useRef(null);
  // const [detectedCorrosionType, setDetectedCorrosionType] = useState('');

  // const [chatbotOpen, setChatbotOpen] = useState(false);

  // const [chatMessages, setChatMessages] = useState([]);
  const [chatMessages, setChatMessages] = useState([
    { user: false, message: "Hi! How can I assist you today?", init: false },
  ]);

  const [inputValue, setInputValue] = useState("");

  const [selectedFiles, setSelectedFiles] = useState([]);

  const [showLoader, setShowLoader] = useState(false);

  const [showJsonLoader, setJsonShowLoader] = useState(false);

  const [showSuccessPopup, setShowSuccessPopup] = useState(false);

  //   const CompanyOptions = [{ name: 'Aker-BP', id: 1 },

  //   { name: 'Exxomobile', id: 2 },

  //   { name: 'Chevron', id: 3 }

  // ];

  const SchemaType = ["Well", "Wellbore", "Wellbore Trajectory"];
  const handleTabClick = (tab) => {
    setSelectedTab(tab);
  };
  const handleQuestionClick = (question) => {
    setInputValue(question); // Set the selected question as the chat input
    handleSendMessage(question); // Send the question to the chatbot
    setShowQuestionPopup(false); // Close the question popup
  };

  const scrollToBottom = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTop =
        scrollContainerRef.current.scrollHeight;
    }
  };

  const TypingEffect = ({ text, onComplete }) => {
    const [displayText, setDisplayText] = useState("");

    useEffect(() => {
      let timeout;
      const displayTextArray = text.split("");

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
  const loadGraphContent = async () => {
    try {
      const response = await axios.get("http://52.157.248.211:5000/graph-file");
      console.log(response.data);
      setGraphContent(response.data);
    } catch (error) {
      console.log(graphContent);
      console.error("Error loading HTML content:", error);
    }
  };
  const handleSchemaSelect = (selectedList, selectedItem) => {
    setSelectedSchema(selectedList);
  };

  const handleSchemaRemove = (selectedList, removedItem) => {
    setSelectedSchema(selectedList);
  };

  useEffect(() => {
    const showData = () => setIsVisible(true);
    setTimeout(showData, 15000);
  }, []);
  // const handleCategoryCheckboxChange = (event) => {

  //   const category = event.target.value;

  //   setSelectedCategories((prevCategories) =>

  //     prevCategories.includes(category)

  //       ? prevCategories.filter((item) => item !== category)

  //       : [...prevCategories, category]

  //   );

  // };

  const questions = [
    "I want to search for a well with the ID 5813.",
    "Can you provide data for the facility with the name 3970?",
    "Please give me a list of wellbores associated with well ID 9042.",
    "Please provide a list of wellbores with the Current Operator ID Aardwarmte%20Vierpolders.",
    "I would like a list of wellbores located in the country UK.",
    "Please retrieve the list of wellbores for the well with the name 567.",
    "Could you please define what a wellbore is in the context of OSDU?",
    "Would you please provide a list of wellbores whose initial operator ID is NAM?",
    "I need a list of wellbores with the Operating Environment set to Off.",
    "Please give me a list of IDs where the Primary Material ID is Flr.",
    "Can you provide a list of wellbore IDs associated with well 1000?",
    "I would like to see a list of wellbores for well ID 5813.",
    "Please provide a query to retrieve the effective time, Coordinate Quality Check Performed By, and Termination Date Time for the entity with the ID admedev23:master-data--Wellbore:5813.",
    "Could you please provide the well IDs for wells where the vertical measurement ID is greater than 67?",
  ];

 

  const handleJsonMessage= (response, message) => {
    console.log("handleJsonMessage");
    try{
      setJsonShowLoader(true);
      // setShowTypingEffect(true);

      // delayedFunction();
      setIsJsonResponseDelayed(true); // Delay JSON response
      setIsJsonLoading(true);
      setTimeout(() => {
        setIsJsonResponseDelayed(false);
        setIsJsonLoading(false); // Clear loading state after delay
      }, 5000);

      const responseData = response.data;
      console.log(responseData);
      const jsonString = JSON.stringify(responseData.kindquery, null, 2);
      console.log(jsonString);
      const lines = jsonString.split("\\n");

      setResponseData(response.data);
      setStringify(jsonString);
      setLinesdata(lines);
      setHtmlContent(responseData.htmltext);

      const chatbotResponse = jsonString;
      const botMessage = { user: false, message: chatbotResponse };

      setChatMessages((prevMessages) => [
        ...prevMessages,
        botMessage,
      ]);

      scrollToBottom();
      // setShowTypingEffect(true);
    }
    catch (error) {
      console.error(error);
    } finally {
      setShowLoader(false);
      // setShowTypingEffect(false);
      setJsonShowLoader(false); // Set loading to false after handling the response or error
    }
  };

  const handleGenericQuestion= (response, message) => {
    console.log("handleGenericQuestion");
    try{
      console.log("Chatbot API response:", response.data);

      setJsonShowLoader(false);
      // setShowTypingEffect(true);
  
      const chatbotResponse = response.data.kindquery;
  
      console.log("Chatbot response:", chatbotResponse);
  
      const botMessage = { user: false, message: chatbotResponse };
  
      setChatMessages((prevMessages) => [
        ...prevMessages,
        botMessage,
      ]);
  
      scrollToBottom();
      // setShowTypingEffect(true);
    }
    catch (error) {
      console.error(error);
    } finally {
      setShowLoader(false);
      // setShowTypingEffect(false);
      setJsonShowLoader(false); // Set loading to false after handling the response or error
    }
  };

  const handleUserMessage = async (message) => {
    try {
      setShowLoader(true);
      // setShowTypingEffect(false);
      setResponseData("");
      setStringify("");
      setLinesdata("");
      setHtmlContent("");
      setChatMessages((prevMessages) => [...prevMessages, { user: true, message, recommendation: false, init: true }]);
      // const userInput = {
      //   message: message
      // };

      // Convert selectedCategories array to a JSON string to send it in the API request

      // const selectedCategoriesStr = JSON.stringify(selectedCategories);

      const selectedSchemaStr = JSON.stringify(selectedSchema);

      console.log(selectedSchemaStr);

      // console.log(selectedCategoriesStr)

      // Make the API call to your Flask server with selectedCompany and selectedCategories

      const response = await axios.post(
        "http://52.157.248.211:5000/create_kind_query",
        {
          question: message,
          schema_type: selectedSchema,
        }
      );

      console.log(response.data.is_jsonquery);
      console.log(response.data.htmltext);
      const queryValue = response.data.is_jsonquery;
      console.log("queryValue", queryValue);
      setJsonQueryValue(queryValue);
      console.log("jsonQueryValue", jsonQueryValue);
      const idIsPresent = message.includes("id");

      if (queryValue === true) {
        console.log("ID found in the message!"); // Your code for handling ID found in the message
        handleJsonMessage(response, message);

      } else {
        console.log("ID not found in the message."); // Your code for handling ID not found in the message
        handleGenericQuestion(response, message);

      }
    } catch (error) {
      console.error(error);
    } finally {
      setShowLoader(false);
      // setShowTypingEffect(false);
      setJsonShowLoader(false); // Set loading to false after handling the response or error
    }
  };

  // const toggleQuestionPopup = () => {
  //   setShowQuestionPopup(!showQuestionPopup);
  // };
  const handleSendMessage = () => {
    if (inputValue.trim() !== "") {
      handleUserMessage(inputValue);
      setInputValue("");
    }
  };






  const loadHtmlContent = async () => {
    setHtmlText(htmlContent);
  };

  const Loading = () => {
    return (
      // <div className='incident-loader'>
      <div className="loader-f loader-osdu-search">
        <div className="loading-os">Loading</div>
        <div className="dot red"></div>
        <div className="dot green"></div>
        <div className="dot blue"></div>
      </div>
      // </div>
    );
  };
  const JsonLoading = () => {
    return (
      // <div className='incident-loader'>
      <div className="loader-f loader-osdu-search mb-5">
        <div className="loading-os">Json Loading</div>
        <div className="dot red"></div>
        <div className="dot green"></div>
        <div className="dot blue"></div>
      </div>
      // </div>
    );
  };

  const handleSendButtonClick = () => {
    handleSendMessage();
    setInputValue("");
  };

  var show = true;

  function showCheckboxes() {
    var checkboxes = document.getElementById("checkBoxes");

    if (show) {
      checkboxes.style.display = "block";

      show = false;
    } else {
      checkboxes.style.display = "none";

      show = true;
    }
  }

  const [showA, setShowA] = useState(false);
  const toggleShowA = () => setShowA(!showA);

  const [showModal, setShowModal] = useState(false);
  const handleToggleModal = () => {
    setShowModal(!showModal);
  };

  const infocontent = {
    "description": [
      "GenAI can be leveraged to lift-up the dependency on writing the complex OSDU specific queries.",
      "GenAI can directly help in generating search results depending on the provided input."
    ],
    "BusinessValueProposition": [
      "Reduction in Time investment",
      "Resources can be levered for innovative work",
      "Reduction in cost"
    ],
    "problemStatement": [
      "Creating effective OSDU queries requires a deep understanding of complex schema structures, versioning nuances, and the dynamic nature of the OSDU data model.",
      "Designing OSDU search queries involves addressing the challenge of dynamic schema evolution.",
      "Users navigate variations in terminology, evolving patterns, and data relationships to extract meaningful information from the OSDU data repository."
    ],
    "Howdoesitwork": [
      "Data Processing",
       "Embedding input data into the Knowledge Graph Database",
       "GenAI Model interaction with the user (e.g., prompt a query)",
       "Text, Meta data"
      
    ],
    "Technologychoices": [
      "Containerized cloud deployment",
      "Cloud agnostic",
      "LLM: OpenAI models"
    ]
  }

  return (
    <div className="main-so">

      <div className="container-so">
        <div className=" left-section-so">
          <div className="top-container-o">
            <div className="dropdowns-o">
              <select
                value={selectedSchema}
                onChange={(e) => setSelectedSchema(e.target.value)}
                className="Category-select-o"
              >
                <option value="">Select Schema Type</option>
                {SchemaType.map((option, index) => (
                  <option key={index} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
            <img
              className="icon-chatbot-g"
              style={{ width: "30px", marginLeft: "50%", marginRight:"5px" }}
              src={question}
              alt="Sample"
              onClick={toggleShowA}
            />
             <img className="sop-info-icon" src={Iicon} onClick={handleToggleModal} />
              {showModal && (
                <Info onClose={() => setShowModal(false)} infocontent={infocontent} />
              )}
            {/* <Button onClick={toggleShowA} className="mb-2">
                Toggle Toast <strong>with</strong> Animation
              </Button> */}
            <ToastContainer
              className="p-3 search-toast-container"
              position="middle-end"
              style={{ zIndex: 1 }}
            >
              <Toast
                show={showA}
                onClose={toggleShowA}
                style={{ border: "1px solid #8d97dac5" }}
              >
                <Toast.Header
                  style={{
                    backgroundColor: "#6c5cd1af",
                    border: "1px solid #6B5CD1",
                  }}
                >
                  <img
                    src="holder.js/20x20?text=%20"
                    className="rounded me-2"
                    alt=""
                  />
                  <strong className="me-auto">Questions</strong>
                </Toast.Header>
                <Toast.Body
                  style={{
                    backgroundColor: "#1E203D",
                    fontFamily: "Graphik",
                    fontSize: "12px",
                    fontWeight: "300",
                    border: "1px solid #6B5CD1",
                    overflowY: "auto",
                    height: "150px",
                  }}
                >
                  {questions.map((index) => (
                    <ul key={index} className="points">
                      <li>{index}</li>
                    </ul>
                  ))}
                </Toast.Body>
              </Toast>
            </ToastContainer>
          </div>

          <div className="chatbot-container-so">
            <div>
              <div className="Assistant-o">
                <div className="assis-o">OSDU Search Assistant</div>
                {/* <div className="fetch-questions-button-o">
          <FontAwesomeIcon icon={faQuestionCircle  } onClick={handleFetchQuestions}/>
          </div> */}
              </div>
            </div>
            {showSuccessPopup && (
              <div className="popup-message-so">
                json output loaded successfully!
              </div>
            )}
            <div className="chat-messages-so" ref={scrollContainerRef}>
              {chatMessages.map((message, index) => (
                <div
                  key={index}
                  className={
                    message.user
                      ? "chat-message user-so"
                      : "chat-message bot-so"
                  }
                >
                  <div className="message-icon-o">
                    <img
                      src={message.user ? userIconSrc : chatbotIconSrc}
                      alt="Icon"
                    />
                  </div>
                  <div className="message-text-o">
                    {message.message.split("\n").map((mes, indexKey) => (
                      <div key={indexKey}>
                        {showTypingEffect && index === chatMessages.length - 1 ? (
                          <TypingEffect text={mes} onComplete={() => setShowTypingEffect(false)} />
                        ) : (
                          <span>{mes}</span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
              {showLoader && <Loading />}
            </div>

            <div className="chat-input-container-so">
              <input
                type="text"
                placeholder="Enter your query"
                className="chat-input-so"
                value={inputValue}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleSendMessage();
                  }
                }}
                onChange={(e) => setInputValue(e.target.value)}
              />
              {/* { <div className=' micimg'>

              {listening ? <img src={mic} onClick={SpeechRecognition.stopListening}/> : <img src={mic} onClick={startlisting}/>}

              </div> } */}

              <div className="col-sm-1">
                <img
                  className="send-so"
                  src={send}
                  alt="Send Button"
                  onClick={handleSendButtonClick}
                />
              </div>
            </div>
          </div>
        </div>

        <div className=" right-section-so">
          {/* {showQuestionPopup && <QuestionPopup />} */}
          <div className="selected-files-container-so">
            {selectedFiles.map((file, index) => (
              <div key={index} className="selected-file-so">
                <div className="pdf-icon">
                  <img src={pdf} alt="Icon 1" />
                </div>
                <div key={index} className="selected-file-o">
                  <span>{file.name}</span>
                </div>
              </div>
            ))}
          </div>
          {/* <div onClick={handleProcessButtonClick}></div>
            {showIcons && (
              <> */}
          <div className="icon-row-o">
            <div
              className={`icon-o ${selectedTab === "doc" ? "active" : ""}`}
              onClick={() => handleTabClick("doc")}
            >
              <FontAwesomeIcon icon={faFileAlt} size="2x" />
            </div>
            <div
              className={`icon-o ${selectedTab === "table" ? "active" : ""}`}
              onClick={() => handleTabClick("table")}
            >
              <FontAwesomeIcon
                icon={faTable}
                onClick={loadHtmlContent}
                size="2x"
              />
            </div>
          </div>

          <div className="summary-so">
            {selectedTab === "table" ? (
              <div className="data-display-o">
                <div
                  className="html-file"
                  dangerouslySetInnerHTML={{ __html: htmlText }}
                />
              </div>
            ) : (
              <div className="data-display-o">
                {isLoading ? (
                  <p>Loading...</p>
                ) : (
                  
                  <div className="jsonData-o" hidden={!isVisible}>
                     {isJsonLoading &&  <JsonLoading />}
                     {!isJsonResponseDelayed && (
                    <pre className="osduresponse-o">
                      {JSON.stringify(responseData.json, null, 2)}
                    </pre>
                     )}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OsduSearch;
