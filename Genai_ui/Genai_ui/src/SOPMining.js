
import React, { useState, useEffect, useCallback } from 'react';
import {useNavigate} from 'react-router-dom';
import axios from 'axios';
import logo from './images/log.svg';
import pdf from './images/pdf.svg';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import like from './images/Icon-Like.svg';
import dislike from './images/Icon-DisLike.svg';
import share from './images/Group 3306.svg';
import copy from './images/Union.svg';
import 'bootstrap/dist/css/bootstrap.min.css';
import userIconSrc from './images/Group 3550.svg';
import chatbotIconSrc from './images/Frame 2654.svg';
import graph from './images/Graph1.svg';
import question from './images/Group 3593.svg';
import refresh from './images/Group 3139.svg';
import Iicon from './images/Group 3440.svg'
import percent from './images/Group 3215.svg';
import pointer from './images/Group 3214.svg';
import heart from './images/Group 3213.svg';
import sridevi from './images/Group 3001.svg';
import jegan from './images/Group 3002.svg';
import close from './images/Group 3005.svg';
import pie from './images/pie.svg';
import doc from './images/text.svg';
import mic from './images/mic_FILL0_wght400_GRAD0_opsz24 1.svg';
import table from './images/Table2.svg';
import Multiselect from 'multiselect-react-dropdown';
import bell from './images/notfication.svg';
import checkmark from './images/tickmark.svg';
import admin from './images/Admin.svg';
import collapsee from './images/Vector.svg';
import browse from './images/browse.svg'
// import map from './map.html';
import drag from './images/drag_and_drop.svg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import iconi from './images/Group 3593.svg';
import { faChartBar, faChartPie, faFileAlt, faTable, faQuestionCircle } from '@fortawesome/free-solid-svg-icons';
import send from './images/send_FILL0_wght400_GRAD0_opsz24 1.svg';
import Accordion from 'react-bootstrap/Accordion';
import { Card } from 'react-bootstrap'; // Import Card component for styling the accordion items


import blue from './images/Admin.svg';
import './SOP.css';

const Sustainability = () => {
    const [selectedCompanies, setSelectedCompanies] = useState('');
    const [rightContainerMessage, setRightContainerMessage] = useState('');
    const [rightContainerResponse, setRightContainerResponse] = useState('');
    const navigate = useNavigate();

    const [showIcons, setShowIcons] = useState(false);
    const [responseReceived, setResponseReceived] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);
    const [detectedCorrosionType, setDetectedCorrosionType] = useState('');
    const [showQuestionPopup, setShowQuestionPopup] = useState(false);
    const [fetchedQuestions, setFetchedQuestions] = useState([]);
    const [questionsFetched, setQuestionsFetched] = useState(false);

    const [chatbotOpen, setChatbotOpen] = useState(false);
    const [chatMessages, setChatMessages] = useState([]);
    const [inputValue, setInputValue] = useState('');
    const [selectedFiles, setSelectedFiles] = useState([]);
    const [showLoader, setShowLoader] = useState(false);
    const [showSuccessPopup, setShowSuccessPopup] = useState(false);

    const handlePrevNav = (event) => {
        navigate('/utility'); 
      };

    const CompanyOptions = [{ name: 'Aker-BP', id: 1 },
    { name: 'Exxomobile', id: 2 },
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
    const {

        transcript,

        listening,

        resetTranscript,

        browserSupportsSpeechRecognition



    } = useSpeechRecognition();

    let button;

    const handleFileSelect = (e) => {
        const selectedFilesArray = Array.from(e.target.files);
        console.log(selectedFilesArray);
        setSelectedFiles(selectedFilesArray);
    };
    const handleCompanySelect = (selectedList, selectedItem) => {
        setSelectedCategories(selectedList);
    };

    const handleCompanyRemove = (selectedList, removedItem) => {
        setSelectedCategories(selectedList);
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
    const handleQuestionClick = (question) => {
        setInputValue(question); // Set the selected question as the chat input
        handleSendMessage(question); // Send the question to the chatbot
        setShowQuestionPopup(false); // Close the question popup
    };
    const CorrosionQuest = ({ onClose }) => {
        const questions = ['Provide the MOCs for Paraxylene Plant?',
                          'Which are the details in MOC-PX-2023-08-012?',
                          'Which SOP contains CV-103?',
                          'Can you highlight in this SOP the CV103 valve?',
                          'What is the equipment tag in MOC-PX-2023-08-012 MOC?',
                          'Highlight the sections containing CV-103'
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

    const handleUserMessage = async (message) => {
        try {
            setShowLoader(true);


            // Convert selectedCategories array to a JSON string to send it in the API request
            const selectedCategoriesStr = JSON.stringify(selectedCategories);
            const selectedCompaniesStr = JSON.stringify(selectedCompanies);
            console.log(selectedCompaniesStr)
            console.log(selectedCategoriesStr)

            // Make the API call to your Flask server with selectedCompany and selectedCategories
            const response = await axios.post('http://98.64.76.212:5000/chatBot', {
                message,
                selectedCompanies: selectedCompaniesStr,
                selectedCategories: selectedCategoriesStr,
            });

            console.log('Chatbot API response:', response.data);

            const [chatbotResponse, rightContainerResponse] = response.data; // Destructure the two responses

            console.log('Chatbot response:', chatbotResponse);
            console.log('Right container response:', rightContainerResponse);

            const botMessage = { user: false, message: chatbotResponse };
            setRightContainerResponse(rightContainerResponse);
            const splittedProject = rightContainerResponse.split("Project:");
            splittedProject.shift()
            console.log("split", splittedProject)
            setChatMessages((prevMessages) => [...prevMessages, { user: true, message }, botMessage]);
        } catch (error) {
            console.error(error);
        } finally {
            setResponseReceived(true)
            setShowLoader(false); // Set loading to false after handling the response or error
        }
    };
    const toggleQuestionPopup = () => {
        setShowQuestionPopup(!showQuestionPopup);
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

            fetchedQuestionsData = ['Provide the MOCs for Paraxylene Plant?',
                'Which are the details in MOC-PX-2023-08-012?',
                'Which SOP contains CV-103?',
                'Can you highlight in this SOP the CV103 valve?',
                'What is the equipment tag in MOC-PX-2023-08-012 MOC?',
                'Highlight the sections containing CV-103']

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
            handleFileSelect()
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
            const response = await axios.post('http://98.64.76.212:5000/uploadFiles', formData, {
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
    function settextfield(inputval) {
        resetTranscript();
        setInputValue(inputval)
    }

    function startlisting() {
        console.log("DDDDDDDDDDDDDDDD", transcript)
        setInputValue(transcript); // Update inputValue with the transcript
        SpeechRecognition.startListening();
        console.log(transcript);
    }


    const Loading = () => {
        return (
            <div className="loader">
                <div className='loader-text'>Loading...</div>
                <div className="dot red"></div>
                <div className="dot green"></div>
                <div className="dot blue"></div>

            </div>
        );
        ;
    };

    const handleSendButtonClick = () => {
        handleUserMessage(inputValue);

        setInputValue('');
    };
    const [infoModal, setShowInfoModal] = useState(false);
    const handleToggleModal = () => {
        setShowInfoModal(!infoModal);
    };
    const PopupModal = ({ onClose }) => {
        return (
            <div className="modal">
                <div className="modal-content">
                    <div className="left-sec">
                        <div className="top-left modal-section">
                            <ul>
                                <li className='first-para'>Gen AI can be leveraged to create a reliable corrosion detecting system where Gen AI algorithms will be used to detect, evaluate, and measure corrosion in industrial equipment, structures, and pipelines. ​</li>
                                <li>With historical remediation methods, Gen AI can improve corrosion detection accuracy, efficiency, and effectiveness, allowing prompt intervention and informed decision-making for best remediation options.</li>
                            </ul>
                        </div>

                        <div className="bottom-left modal-section">
                            <div className='business-Heading'>Business Value Proposition</div>
                            <ul>
                                <li className='business-items'>Descriptive & Comparative Analysis on different Maintenance Activities on various equipment​</li>
                                <li className='business-items'>Root Cause analysis on several Equipment Failure​</li>
                                <li className='business-items'>Informed maintenance strategies  based on historic data​</li>

                                <li className='business-items'>Effective Recommendations for improving asset performance and life span.​</li>
                                <li className='business-items'>On-demand calculation of KPIs like MTTR, MTTF, MTBF etc., at an equipment level, FLOC level, asset level.​</li>
                            </ul>
                        </div>
                    </div>
                    <div className="top-right modal-section">
                        <div className="top-1">

                            <div className='business-Heading'>What problem are we solving? </div>
                            <ul>
                                <li className='business-items'>Corrosion presents a formidable obstacle to industries, households, and pipelines, triggering operational disruptions, health hazards, and substantial financial setbacks.
                                    Equipment Degradation,Reduced Efficiency</li>
                                <li className='business-items'>Leaks and Spills, Unplanned Shutdowns</li>
                                <li className='business-items'>Maintenance Costs, Health and Safety Risks</li>
                                <li className='business-items'>Environmental Impact, Environmental Impact, Operational Disruptions, etc.</li>
                            </ul>
                        </div>
                        <div className="top-2">
                            <div className='business-Heading'>How does it work?</div>
                            <ul>

                                <li className='business-item'> Data collection (e.g., Historical Formulation Data​/Data from raw material​/Production parameters​)</li>
                                <li className='business-item'>Data Processing</li>
                                <li className='business-item'>Generating Embedding/ Knowledge Graphs</li>
                                <li className='business-item'>MySQL Database Storage</li>
                                <li className='business-item'>Gen AI Model interaction with the user (e.g., Image classification, chat assistant)</li>
                                <li className='business-item'>Output – Corrosion details, resolution recommendations, Severity check and Workorder Generation.</li>
                                <li className='business-item'>Visual Representation of the Result</li>
                            </ul>
                        </div>
                        <div className="top-3">
                            <div className='business-Heading'>Technology Choices</div>
                            <ul>

                                <li className='business-items'> Containerized cloud deployment</li>
                                <li className='business-items'>Cloud agnostic</li>
                                <li className='business-items'>MySQL</li>

                            </ul>
                        </div>

                    </div>
                    <div className="bottom-right modal-section">
                        <div className='top-4'>
                            <div className='business-Heading'>Value to clients</div>
                            <div className='percent-class'><img className="percent-logo" src={percent} />
                                <div className='sub-head-1'>
                                    <div className='business-Heading-1'>Enhance Asset Longevity & Reduce Maintenance cost</div>
                                    <div className='business-items-1'>Total maintenance cost is always an important performance indicator. Timely Identification of corrosion helps reducing it’s impact ,makes it easy and quick to implement remediation and intern reduce maintenance cost .</div>
                                </div>
                            </div>
                            <div className='percent-class'><img className="percent-logo" src={pointer} />
                                <div className='sub-head-1'>
                                    <div className='business-Heading-2'>Improve Efficiency</div>
                                    <div className='business-items-1'>Corrosion leads to various operational challenges and inefficiencies.</div>
                                    <div className='business-items-1'>Corrosion detection plays a crucial role in improving efficiency in an energy plant by identifying and addressing corrosion-related issues early.</div>
                                </div>
                            </div>
                            <div className='percent-class'><img className="percent-logo" src={heart} />
                                <div className='sub-head-1'>
                                    <div className='business-Heading-2'>Workplace Safety</div>
                                    <div className='business-items-1'>Timely corrosion detection significantly enhances workplace safety by preventing accidents, reducing health risks, and promoting a culture of safety.</div>
                                </div>
                            </div>
                        </div>
                        <div className='top-5'>
                            <div className='business-Heading-3'>Contacts</div>
                            <div><img className="sri-logo" src={sridevi} />
                            </div>
                            <div><img className="sri-logo" src={jegan} />
                            </div>
                        </div>
                    </div>

                    <img className='close-btn' src={close} alt='Sample' onClick={onClose} />
                </div>
            </div>
        );
    };
    const [modalVisible, setModalVisible] = useState(false);

    const handleIconClick = () => {
        setModalVisible(true);
    };
    const closeModal = () => {
        setModalVisible(false);
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
        <div className="main-sop">
            <div className='top-apm' style={{ backgroundColor: 'rgba(32, 35, 66, 1)' }}>
                <div className='Heading-apm'>
                    <div><span onClick={handlePrevNav} style={{ color: '#AD8BFF' }}>Mining </span> / SOP Review Accelerator</div>
                    {/* <div>/ SOP Review Accelerator</div> */}
                </div>
                <>
                    {/* <img className='top-sum chatboticon' src={chatbot} alt='Sample' /> */}
                    <label className="browse-sop" htmlFor="imageUpload"><img className="drag-logo-sop" src={drag} /></label>
                    <input
                        id="imageUpload"
                        type="file"
                        multiple
                        name="file"
                        style={{ display: "none" }}
                        onChange={handleProcessButtonClick}
                    />
                    <img className='top-suma1-sop chatboticon ' src={question} alt='Sample' onClick={handleIconClick} />
                    <img className='top-suma1-sop chatboticon ' src={Iicon} alt='Sample' onClick={handleToggleModal} />
                </>
            </div>
            <div className="container-sop" style={{height:"550px"}}>
                <div className="left-section-sop" style={{marginLeft:"50px", width: "70%"}}>
                    <div className="chatbot-container-sop">
                        <div className='Assistant-sop'>
                            <div style={{color: "white", fontWeight:"500", fontSize: "14px", textAlign:"center", marginLeft: "140px"}}>SOP Review Accelerator</div>
                            <div className="fetch-questions-button-sop">
                            </div>
                        </div>
                        {showSuccessPopup && (
                            <div className="popup-message-sop">
                                File loaded successfully!
                            </div>
                        )}
                        <div className="chat-messages-sop" style={{ display: "flex", flexDirection: "column" }}>
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
                                        <div className="message-text-sop">
                                            {message.message.split("\n").map((mes, index) => (
                                                <div key={index}>{mes}</div>
                                            ))}
                                        </div>
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

                        <div className="chat-input-container-sop">
                            <input
                                type="text"
                                placeholder="Enter your query"
                                className=" chat-input-sop"
                                value={inputValue ? inputValue : transcript}
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter') {
                                        handleSendMessage();
                                    }
                                }}
                                onChange={(e) => { settextfield(e.target.value) }}
                            />
                            {<div>

                                {listening ? <img className='micimg-sop' src={mic} onClick={SpeechRecognition.stopListening} /> : <img className='micimg-sop' src={mic} onClick={startlisting} />}

                            </div>}
                            <img
                                className="send-sop"
                                src={send}
                                alt="Send Button"
                                onClick={handleSendButtonClick}
                            />
                        </div>
                    </div>
                </div>
                <div className='right-section-sop' style={{marginLeft:"20px"}}>
                    {infoModal && (
                        <PopupModal
                            onClose={() => setShowInfoModal(false)}
                        />
                    )}
                    {modalVisible && <CorrosionQuest onClose={closeModal} />}
                    {/* <div className="selected-file-sop"> */}
                    {/* {selectedFiles.map((file, index) => (
                <div key={index} className="selected-file-sop"> */}
                    {/* <div className="pdf-icon-sop"><img src={pdf} alt="Icon 1" /></div>
                 
                 <span style={{ marginTop:'15px',paddingRight:'20px', color:'white' }}>Reliability Centered Maintenance.pdf</span>
                
                </div> */}
                    {/* ))} */}

                    {/* <div onClick={handleProcessButtonClick}></div>
            {showIcons && (
              <> */}

                    <div className="summary-sop">
                        {responseReceived && (
                            <div style={{ color: 'white', fontSize: '15px', fontWeight: '500', fontFamily: 'Graphik', marginTop: '-15px', marginBottom: '10px' }}>Additional Data</div>
                        )}
                        <Accordion className="custom-accordion-sop">
                            {rightContainerResponse.split('\n').map((line, index, array) => {
                                if (line.startsWith('Header: ') && index + 1 < array.length) {
                                    const header = line.substring(8);
                                    const contentArray = [];
                                    let contentIndex = index + 1;

                                    while (contentIndex < array.length && !array[contentIndex].startsWith('Header: ')) {
                                        contentArray.push(array[contentIndex]);
                                        contentIndex++;
                                    }

                                    const content = contentArray.join('\n');

                                    return (
                                        <Accordion.Item
                                            key={index}
                                            eventKey={index.toString()}
                                            className="custom-body-sop"
                                        >
                                            <Accordion.Header className="custom-accordion-header-sop">
                                                {header}
                                            </Accordion.Header>
                                            <Accordion.Body>
                                                <Card.Body className="custom-accordion-body-sop">
                                                    {content.split('\n').map((contentLine, contentIndex) => (
                                                        <div key={contentIndex}>{contentLine}</div>
                                                    ))}
                                                </Card.Body>
                                            </Accordion.Body>
                                        </Accordion.Item>
                                    );
                                }

                                return null; // Ignore non-header lines
                            })}
                        </Accordion>
                    </div>
                    {/* </>
            )} */}
                </div>
            </div>

        </div>
    );
};

export default Sustainability;
