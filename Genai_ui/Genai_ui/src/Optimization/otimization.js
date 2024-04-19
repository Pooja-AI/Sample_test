import React, { useState, useEffect, useRef } from 'react';
import doaFrame from "../images/sustainability_banner.png";
import optigenius from "../images/optigenius.png"
import './optimization.css';
import Generatescreen from './generateScreen.js';
import Iicon from '../images/Group 3440.svg'
import plus from '../images/Group 3205.svg';
import filter from '../images/XMLID_6_.svg';
import downarrow from '../images/Business_sale_drop_loss.svg'
import search from '../images/XMLID_223_.svg';
import calender from '../images/Vector.svg';
import Button from 'react-bootstrap/Button';
import upload from '../images/Group 3296.svg';
import close1 from '../images/Group 3206.svg';
import report from '../images/Report.svg';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import chatbot from '../images/Group 3439.svg';
import Chatbot from '../Generic_Chatbot';
import Info from '../Info.js';
import Table from 'react-bootstrap/Table';
import EditIcon from '@mui/icons-material/Edit';
import SearchIcon from '@mui/icons-material/Search';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import AddIcon from '@mui/icons-material/Add';
import { set_cptable } from 'xlsx';

const cardData =
[
 {
   "CreatedBy": "Admin",
   "Name": "Pump Optimizer",
   "Date": "20-Nov-2023",
   "id": "1"
 },
 {
   "CreatedBy": "Admin",
   "Name": "Maintenance Window Optimizer",
   "Date": "20-Nov-2023",
   "id": "2"
 },
 {
   "CreatedBy": "Admin",
   "Name": "Talent Aquisition Optimizer",
   "Date": "01-Nov-2023",
   "id": "3"
 }
]

function Doa() {

  const [showNewScreen, setShowNewScreen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [recentAnalysisDocsData, setrecentAnalysisDocsData] = useState([]);
  const [showTypingEffect, setShowTypingEffect] = useState(true);
  const [rigShow, setRigShow] = useState(false);
  const [rigAnalysisDocsData, setRigAnalysisDocsDataData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showChatbotModal, setShowChatbotModal] = useState(false);
  const [title, setTitle] = useState("");
  const [mainCompany, setReportType] = useState("");
  const [searchKeyword, setSearchKeyword] = useState('');
  const [cardDataOrignal, setCardDataOrignal] = useState(cardData);

  // const handleToggleModal = () => {
  //   setShowModal(!showModal);
  // };
  // const handleChatbotToggleModal = () => {
  //   setShowChatbotModal(!showChatbotModal);
  // };

  const scrollContainerRef = useRef(null);

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

  const scrollToBottom = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTop =
        scrollContainerRef.current.scrollHeight;
    }
  };
 
  const questions = ['what is the ghg emission intensity of shell and chevron for FY22? ',
  'what are the Scope 3 emission categories shell and chevron report on?',
  'What are the various waste management strategies undertaken by shell and chevron?',
  'What environmental certifications have shell and chevron obtained?',
  'What is the %of emission associated with refining for shell compared to chevron?',
  'What is the total fresh water withdrawn by shell and chevron in 2020 to 2022?',
  'What are the climate related risks identified by shell and chevron?',
  'Percentage of employees from underrepresented groups for shell and chevron as per FY 2022',
  'What is the percentage of percentage of LGBTQ+ employees in leadership positions for shell and chevron as per FY 2022?'];
  const Loading = () => {
    return (
      <div className="loader-c">
        <div className="dot-cq red-c"></div>
        <div className="dot-cq green-c"></div>
        <div className="dot-cq blue-c"></div>
      </div>
    );
    ;
  };
  const recentAnalysisDocs = async () => {
    try {
      // if (Array.isArray(recentAnalysisDocsData) && recentAnalysisDocsData.length === 0) {
      const response = await axios.get('http://52.157.248.214:5000/get_recent_analysisdocs');
      const result = response.data.data;
      setrecentAnalysisDocsData(result);
      console.log('recentAnalysisDocs response', result)
      console.log(isLoading);
      // }
    } catch (error) {
      console.error('Error fetching data from recentAnalysisDocs API', error);
    }
  };
  useEffect(() => {

    Promise.all([recentAnalysisDocs()])
      .then(() => {
        setIsLoading(false);
        console.log(isLoading);
        console.log(isLoading);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        setIsLoading(false);
      });
  }, []);

  const getRig = async (docId) => {
    try {
      // if (Array.isArray(rigAnalysisDocsData) && rigAnalysisDocsData.length === 0) {
      const response = await axios.get('http://52.157.248.214:5000/get_analysis', {
        params: {
          docId: docId
        }
      });
      const result = response.data;
      setRigAnalysisDocsDataData(response.data);
      console.log('rigAnalysisDocs response', result)
      
     
      setRigShow(true);
    } catch (error) {
      console.error('Error fetching data from recentAnalysisDocs API', error);
    }
  }

  const handleProcessClick = () => {
    // Handle processing logic here
    console.log("Title:", title);
    console.log("Report Type:", mainCompany);
    
    setShowNewScreen(true);
  };
  const Fetching = () => {
    return (
      <div className="loader-f">
        <div className='loader-text'>Fetching from LLM</div>
        <div className="dot red"></div>
        <div className="dot green"></div>
        <div className="dot blue"></div>
      </div>
    );

  };

  const renderchatResponse = (message, index, chatMessages) => {
    scrollToBottom();
    
    console.log(message);
    if (message.user) {
      return (
        <div className="user-message-v">
           { (index === chatMessages.length - 1) ? <TypingEffect text={message.message}  /> : <span>{message.message}</span>}
        </div>
      );
    }
    else if (message.message == "Hi! How can I assist you today?" ) {
      
      return (
        <div className="user-message-v">
          { (index === chatMessages.length - 1) ? <TypingEffect text={message.message}  /> : <span>{message.message}</span>}
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
          scrollToBottom();
          
          return (
            <div className="bot-text-response-d">
              { (index === chatMessages.length - 1) ? <TypingEffect text={response_data} /> : <span>{response_data} </span>}
            </div>
          );
        }
        else if (response_type === "table") {
          console.log("table");
          scrollToBottom();
          const columns = response_data.columns;
          const tableRows = response_data.data;
          return (
            <div className="bot-table-response-doa">
              <table className="table-doa1">
                <thead>
                  <tr>
                    {columns.map((column, index) => (
                      <th key={index}>{column}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {tableRows.map((row, rowIndex) => (
                    <tr key={rowIndex} className={rowIndex % 2 === 0 ? 'even-row' : 'odd-row'}>
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
              <div className="bot-table-response-doa">
                <Table responsive hover>
                  <thead style={{width: "fit-content"}}>
                    <tr style={{width: "100px", padding: "5px 10px"}}>
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
                </Table>
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

  const handleFilterTextChange = event => {
    setSearchKeyword(event.target.value);    
  };

  
const displayCards = (data) => {
  return data.map(item => (
    <div className='drill-card' key={item.id}>
      <div className='drill-card-body'>
        <p className='drill-header'> {item.Name}</p>
        <p className='drill-body' style={{ marginTop: '54px' }}>Created by {item.CreatedBy}</p>
        <p className='drill-body'>{item.Date} <EditIcon sx={{ fontSize: '15px', marginLeft: '147px' }}></EditIcon>  </p>
      </div>
    </div>
  ));
};

useEffect(() => {
  if (!searchKeyword) {
    setCardDataOrignal(cardData);
  } else {
    const keyword = searchKeyword.toLowerCase();
    const filteredResult = cardData.filter(item =>
      item.Name.toLowerCase().includes(keyword)
    );
    setCardDataOrignal(filteredResult);
  }
}, [searchKeyword, cardData]);


  return (
    <div className='doa-container'>
      <div className='doa-hide-scroll'>
        <div>
          <div className='Heading-Doa'>
            <span style={{ color: '#AD8BFF', marginLeft: "5px" }}>Oil & Gas</span> /  OptiGenius
            {/* <div className='info-icon-doa'>
              <img className='doa-icon' src={chatbot} onClick={handleChatbotToggleModal} />
              <img className="doa-icon" src={Iicon} onClick={handleToggleModal} />
            </div> */}
            </div>

          {showModal && (
            <Info onClose={() => setShowModal(false)} />
          )}
        </div>
        {showNewScreen ? <Generatescreen/> : (
                <div>
                    
                  <div class="containerImg">
                    <img src={optigenius} className='img-style' />

                      <div class="text-overlay" style={{}}>
                        <div className='col-sm-12' style={{fontWeight:'700',color:'white',textAlign:'center',marginBottom:'15px',fontSize:'37px', fontFamily:'Graphik'}}>OptiGenius</div>
                        <div className='col-sm-12' style={{fontSize:'12px', fontFamily:'Graphik'}}>Unleash the full potential of your data with
                        OptiGenius - a cutting-edge app made on Gen AI, which transforms your optimization aspirations into code effortlessly. Simply 
                        guide this tool with your unique instructions on parameters, sets, variables, formulas, and constraints, and watch as it 
                        crafts tailored code to breathe life into your data. With seamless data uploads, secure processing, and captivating
                        visulaizations, OptiGenius isn't just an optimizer - it's your ticket to a world where data dreams materialize into
                        unparalleled success. Revolutionize your approach to optimization and let OptiGenius be your guiding force in the realm of 
                        data empowerment</div>
                      </div>
                  </div>
                 
                  
                  <div className='main-doa-container'>
                    <div className='feature'>
                      {/* <img src={plus} className='plus-button'
                        variant="primary" onClick={handleProcessClick}
                        style={{ cursor: "pointer" }} /> */}
                      <AddIcon style={{fontSize:'15px',background: 'white',color: 'black', borderRadius: '10px',marginTop: '25px', cursor:'pointer'}} onClick={handleProcessClick}></AddIcon>
                    
                      <p className='analysis-head' style={{border:'none'}}> Generate New Model</p>

                    
                    
                      <div class="icon-input">
                          <span class="icon-opt">
                          <img src={search} style={{ width: "17px" }} />
                          </span>
                          <input className='search-opt'                         
                            type="text"
                            // value={filterText}
                            onChange={handleFilterTextChange}
                            placeholder="Please enter to search" />
                      </div>

                    
                    </div>
                    {/* <div className='drillanalysis-report'>{recentAnalysisDocsData.map(item => (
                      <div className='drill-card'>
                        <div className='drill-card-body' key={item.DocID}>
                          <p className='drill-header'> {item.Title}</p>
                          <p className='drill-body'>Created by {item.CreatedBy}</p>
                          <p className='status-drill'> {item.Status ? item.Status : "Completed"} </p>
                          {item.Status === "In Progress" ? <Loading /> : <button className='view-report' onClick={() => getRig(item.DocID)}> <img src={report} className='report-icon' onClick={getRig} /> VIEW REPORT</button>}
                        </div>
                      </div>))}
                    </div> */}
                       <div className='drillanalysis-report'>
                        {displayCards(cardDataOrignal)}
                      </div>
                    {/* <div className='drillanalysis-report'>{cardDataOrignal.map(item => (
                      <div className='drill-card'>
                        <div className='drill-card-body' key={item.id}>
                          <p className='drill-header'> {item.Name}</p>
                          <p className='drill-body' style={{marginTop:'54px'}}>Created by {item.CreatedBy}</p>          
                          <p className='drill-body'>{item.Date} <EditIcon sx={{fontSize:'15px', marginLeft:'147px'}}></EditIcon>  </p>     
                                 
                        </div>
                      </div>))}
                    </div> */}
                  </div>
                </div>
       )}
      </div>
      
    </div>
  )
}

export default Doa