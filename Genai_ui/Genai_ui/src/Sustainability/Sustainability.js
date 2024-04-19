import React, { useState, useEffect, useRef } from 'react';
import {useNavigate} from 'react-router-dom';
import { Viewer } from '@react-pdf-viewer/core';
import '@react-pdf-viewer/core/lib/styles/index.css';
import chatbotIconSrc from '../images/Frame 2654.svg';
import userIconSrc from '../images/Group 3550.svg';
import { Worker } from '@react-pdf-viewer/core';
import '@react-pdf-viewer/core/lib/styles/index.css';
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';
import Chatbot from './SustainabilityReport';
import close1 from '../images/Group 3206.svg';
import doaFrame from "../images/sustainability_banner.png";
import './Sustainability.css';
import Iicon from '../images/Group 3440.svg'
import plus from '../images/Group 3205.svg';
import filter from '../images/XMLID_6_.svg';
import downarrow from '../images/Business_sale_drop_loss.svg';
import search from '../images/XMLID_223_.svg';
import calender from '../images/Vector.svg';
import Button from 'react-bootstrap/Button';
import upload from '../images/Group 3296.svg';
import report from '../images/Report.svg';
import Rig from './SustainabilityReport.js';
import axios from 'axios';
import chatbot from '../images/Group 3439.svg';
import Htmlchart from './htmlchart';
import Info from '../Info.js';
import Barchart from './BarChart.js';
import Linechart from './LineGraph.js';
import { Helmet } from 'react-helmet';
import Piechart from './PieChart.js';
import Table from 'react-bootstrap/Table';


function Doa(props) {
  const [value, setValue] = React.useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [showSecondColumn, setShowSecondColumn] = useState(false);
  const [pdfData, setPdfData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showLoader, setShowLoader] = useState(true);
  const navigate = useNavigate();
  const [recentAnalysisDocsData, setrecentAnalysisDocsData] = useState([]);
  const [showTypingEffect, setShowTypingEffect] = useState(true);
  const [rigShow, setRigShow] = useState(false);
  const [rigAnalysisDocsData, setRigAnalysisDocsDataData] = useState([]);
  const [calenderValue, setCalenderValue] = React.useState('');
  const [showModal, setShowModal] = useState(false);
  const [showChatbotModal, setShowChatbotModal] = useState(false);
  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [title, setTitle] = useState("");
  const [mainCompany, setReportType] = useState("");
  const [ReferCompany, setReferCompany] = useState("");
  const [pdf_analysis_response, setPdfAnalysisResponse] = useState("Failure");
  const [uploadresponse, seUploadresponse] = useState({});
  const [fileuploaded, setfileuploaded] = useState(false);
  const [fileuploading, setfileuploading] = useState(false);
  const [rigSeverity, seRigSeverity] = useState({});
  const handleButtonClick1 = async (path) => {
    try {
      console.log(props.getpdf_endpoint)
      console.log(path)
      await fetch(props.getpdf_endpoint, {
        
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ filepath: path }),
      })
        .then(res => res.blob())
        .then(blob => {
          const reader = new FileReader();
          reader.onload = () => {
            setPdfData(reader.result);
            setLoading(false);
          };
          reader.readAsDataURL(blob);
          setShowSecondColumn(true);
        });
    } catch (error) {
      console.error('Error loading PDF:', error);
    }
  };
      const loadhandle=()=>{
      // Simulate 5-second delay
      setIsLoading(false)
      const delay = setTimeout(() => {
        setShowLoader(false); // Hide loader after 5 seconds
      }, 5000);
      setIsLoading(true)
      return () => clearTimeout(delay); // Clear timeout on component unmount
    }
 
  const renderchatResponse = (message) => {
    scrollToBottom();
    console.log(message);
    if (message.user) {
      return (
        <div className={message.user ? 'message-text-chart-chatbot bg-user-chatbot' : 'message-text-chart-chatbot bg-bot-chatbot'} >
        <div className="user-message-v">
          <span>{message.message}</span>
        </div>
        </div>
      );
    }
    else if (message.message == "Hi! How can I assist you today?") {
      return (
        <div className={message.user ? 'message-text-chart-chatbot bg-user-chatbot' : 'message-text-chart-chatbot bg-bot-chatbot'} >
        <div className="user-message-v">
          <span>{message.message}</span>
        </div>
        </div>
      );
    }
    else {
      if (message && message.message) {
        const response_data = message.message;
       
        console.log("aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",response_data);
        const pdfTitle = ["pdf1", "pdf2"]
        console.log("answer");
        return (
          <div>
            
            
              <div className={message.user ? 'message-text-chart-chatbot bg-user-chatbot' : 'message-text-chart-chatbot bg-bot-chatbot'} >
          <div className="bot-text-response-d">
            <span onClick={loadhandle()}>{response_data.response}</span>
            {response_data.summary && response_data.summary.pdflist && response_data.summary.pdflist && <div style={{ display: "flex", flexWrap: "wrap", marginTop: "5px" }}>
              <p style={{ fontWeight: "450" }}> {`Citations \u00A0: \u00A0`}</p>
              {response_data.summary && response_data.summary.pdflist && response_data.summary.pdflist.map(
                (pdf, index) => (
                  <p key={index} onClick={() => handleButtonClick1(pdf.filepath)}
                    style={{ backgroundColor: "#6B5CD1", border: "none", borderRadius: "5px", width: "fitContent", padding: "3px", marginRight: "5px", cursor: "pointer" }}>
                    {pdf.filename}
                  </p>
               
                 
                )
                
              )}
               </div>
            }
           </div>
           </div>
           <div className="message-icon-chart-chatbot">
                  <img src={message.user ? userIconSrc : chatbotIconSrc} alt="Icon" className={message.user ? 'icon-chat-user-chatbot' : 'icon-chat-bot-chatbot'} />
                </div>
           <div style={{marginTop:'20px'}} className={message.user ? 'message-text-chart-chatbot bg-user-chatbot' : 'message-text-chart-chatbot bg-bot-chatbot'} >
                 
                  <div className="chart-suss" >
                  
               {response_data.charts && response_data.charts.map((chart, index) => (
                  
              
                <div style={{display:'flex',flexDirection:'row',margin:'20px'}}>
                 <Helmet>
           <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
              </Helmet>
            <Htmlchart responseHtml={chart}></Htmlchart>
                
        
                    </div>
                   
                  ))}
                   </div>
                
                 <div className="chart-suss">
                  {/* Rendering HTML from response_data.tables */}
                  {response_data.tables && response_data.tables.map((table, index) => (
                      
                    <div>
                     <Helmet>
           <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
              </Helmet>
            <Htmlchart responseHtml={table}></Htmlchart>
                
        
                    </div>
                  ))}
                  </div>
                  </div>
                  </div>
                 
            
           
          
        
        );
      } else {
        return null;
      }
    }
  };

 

  const isModal = false;
  const isSOP = true;
  const initialScale = 40;
  const newPlugin = defaultLayoutPlugin()
  const handleChange = (event) => {
    setValue(event.target.value);
  };

  const handlePrevNav = (event) => {
    navigate('/energy'); 
  };
 
  const handleCalenderChange = (event) => {
    setCalenderValue(event.target.value);
  };
  const handleToggleModal = () => {
    setShowModal(!showModal);
  };
  const handleChatbotToggleModal = () => {
    setShowChatbotModal(!showChatbotModal);
  };

  const handleFileChange = async (e) => {
    const selectedFiles_var = Array.from(e.target.files);
    console.log(selectedFiles_var);
    setSelectedFiles(selectedFiles_var);
    await handleUpload(selectedFiles_var);
    setfileuploaded(true);
  };

  const handleTitleChange = (e) => {
    e.stopPropagation();
    setTitle(e.target.value);
  };

  const handleReportTypeChange = (e) => {
    e.stopPropagation();
    setReportType(e.target.value);
  };
  const handleRefereChange = (e) => {
    e.stopPropagation();
    setReferCompany(e.target.value);
  };
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
  const handleUpload = async (selectedFiles_var) => {
    if (selectedFiles_var && title) {
      try {
        const formData = new FormData();
        selectedFiles_var.forEach((file, index) => {
          console.log(index)
          formData.append(`file`, file);
        });
        console.log(selectedFiles_var);
        setfileuploading(true);
        const response = await axios.post('http://52.157.248.214:5000/uploadFiles', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        console.log('API response:', response.data);
        const upload_response = response.data;
        seUploadresponse(upload_response);
        setfileuploading(false);
        if (response.data.status_code === 200) {

          (response.data.status_code === 200 && response.data.message === "Files uploaded successfully") ? console.log('File uploaded successfully!') : alert("File already exists..");
        } else {
          console.error('File upload failed.');
          alert('File upload failed.');
        }

        //   {
        //     "message": "File already exists, please ask questions.",
        //     "response": {},
        //     "status_code": 200
        // }


      }
      catch (error) {
        console.log(error)
      }
    } else {
      alert('Please select a file to upload.');
    }
  };
  const generate_pdf = async () => {
    try {
      const currentDate = new Date();
      const day = String(currentDate.getDate()).padStart(2, '0');
      const month = String(currentDate.getMonth() + 1).padStart(2, '0');
      const year = currentDate.getFullYear();
      const time = `${day}${month}${year}`
      console.log(time);
      const progressdata = { "CurrentTimestamp": time, "Title": title, "CreatedBy": "Admin", "Status": "In Progress" };
      const newArray = [progressdata, ...recentAnalysisDocsData];
      setrecentAnalysisDocsData(newArray);
      setShow(false);
      setTitle("");
      setReportType("");
      setReferCompany("");
      console.log(recentAnalysisDocsData);
     
      const generate_pdf_request = {
       
        title: title,
        mainCompany: mainCompany,
        referCompany:ReferCompany,
        created_by: "Admin"
      }
      console.log(generate_pdf_request);

      const generate_pdf_response = await axios.post('http://52.157.248.214:5000/generate_pdfanalysis', generate_pdf_request, {
        headers: {
          'Content-Type': 'application/json',
        }
      });
      setfileuploaded(false)
      const docId = generate_pdf_response.data.data.docId;
      // const currentDoc = [...recentAnalysisDocsData];
      newArray[0].DocID = docId;
      newArray[0].Status = "Completed";
      console.log(newArray);
      console.log(newArray[0]);
      setrecentAnalysisDocsData(newArray);
      console.log(recentAnalysisDocsData);
      console.log('API response:', generate_pdf_response.data);
      setPdfAnalysisResponse("Success");
    } catch (error) {
      console.error('Error generating PDF analysis:', error);
      // Handle the error here, such as displaying an error message or setting state to handle the error condition.
      setPdfAnalysisResponse("Failure");
      // Additional error handling as needed.
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
    // Close the modal after processing
    // onClose();
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

  return (
    <div style={{display:'flex',flexDirection:'column',width:'150%'}}>
       <div className='Heading-sust'>
            <span onClick={handlePrevNav} style={{ color: '#AD8BFF', marginLeft: "5px" }}>Oil & Gas</span> /  Sustainability Benchmarking
            <div className='info-icon-doa'>
              <img className='doa-icon' src={chatbot} onClick={handleChatbotToggleModal} />
              <img className="doa-icon" src={Iicon} onClick={handleToggleModal} />
            </div></div>
            <div className='doa-container-sust'>
  

      <div className='doa-hide-scroll-sust'>
        <div>
       

          {showModal && (
            <Info onClose={() => setShowModal(false)} />
          )}
        </div>
        {
          rigShow ? <Chatbot  renderchatResponse={renderchatResponse} endpoint={props.chatbot_endpoint} isModal={isModal} questions={props.questions} isSOP={isSOP} showSecondColumn={showSecondColumn}/>
           
              :(isLoading ? (<Fetching />) :
                <div>
                  <img src={doaFrame} className='doa-board-sust' />
                  
                  <div className='main-doa-container-sust'>
                    <div className='feature'>
                      <img src={plus} className='plus-button'
                        variant="primary" onClick={handleShow}
                        style={{ cursor: "pointer" }} />
                      {show && (
                        // <GenerateModal close={() => setShow(false)} />
                        <div className="modal-overlay-doa">
                          <div className='modal-doa'>
                            <div className='analysis-backdrop'>
                              <p className='analysis-head2'>Generate Analysis  <img src={close1} className="close-icon-doa" variant="primary" onClick={() => setShow(false)} /></p>
                            </div>
                            <div className='modal-content-doa'>
                              <div className="describe">provide details below to generate analysis on drilling operations using GEN AI</div>
                              <label className="generate-label-doa">Title</label>
                             
                              <input type="text" className='form-data-doa' placeholder="Enter Title" value={title} onChange={handleTitleChange} />
                              <label className="generate-label-doa">Title</label>
                              <div className='drop-sus'>
                              <select value={mainCompany} className='form-data-doa' placeholder="Main Company" onChange={handleReportTypeChange}>
                              <option value="" disabled hidden className="generate-label-doa">
                                Select Main Company
                              </option>
                              <option value="bp">BP</option>
                              <option value="chevron">Chevron</option>
                              <option value="conocoPhilips">Conoco Philips</option>
                              <option value="Shell">Shell</option>
                              </select>
                              <select value={ReferCompany} className='form-data-doa' placeholder="Select Reference Company" onChange={handleRefereChange}>
                              <option value="" disabled hidden className="generate-label-doa">
                                Select Reference Company
                              </option>
                              <option value="bp">BP</option>
                              <option value="chevron">Chevron</option>
                              <option value="conocoPhilips">Conoco Philips</option>
                              <option value="equinor">Equinor</option>
                              </select>
                              </div>
                              <div className='rig-details-box' style={{ margin: "35px 10px 0px 0px", display: "flex", padding: "10px" }}>
                                <p className='upload-text'>Drag and Drop files here <br />Limit 200 MB per file - PDF/XML</p>
                                <label className="custom-file-upload">
                                  <input type="file" onChange={handleFileChange} multiple accept=".pdf, .xml" />
                                 
                                  {/* <span>Upload {fileuploaded ? <div class="tick-circle"></div> : <img src={upload} className='uploadicon' />}</span> */}
                                  <span>Upload {fileuploaded ? <div class="tick-circle"></div> : (!fileuploading ? <img src={upload} className='uploadicon' /> : <div class="spinner-border spinner-border-sm" role="status">
                                  </div>)}</span>
                                </label>
                              </div>
                            </div>
                            <button type="submit" className="processe-doa-button" variant="primary" onClick={generate_pdf}>Process</button>
                          </div>
                        </div>
                      )}
                      <p className='analysis-head'> Generate Analysis</p>

                      <img src={filter} className='filter-button' />

                      <div>
                        <select value={value} onChange={handleChange} className='status-dd'>
                          <option>Status</option>
                          <option value="In Progress">In Progress</option>
                          <option value="Completed">Completed</option>
                        </select>
                        <select value={calenderValue} onChange={handleCalenderChange} className='status-dd'>
                          <option value="In Progress">Period</option>
                        </select>
                      </div>
                    </div>
                    <div className='drillanalysis-report'>{recentAnalysisDocsData.map(item => (
                      <div className='drill-card'>
                        <div className='drill-card-body' key={item.DocID}>
                          <p className='drill-header'> {item.Title}</p>
                          <p className='drill-body'>Created by {item.CreatedBy}</p>
                          <p className='status-drill'> {item.Status ? item.Status : "Completed"} </p>
                          {item.Status === "In Progress" ? <Loading /> : <button className='view-report' onClick={() => getRig(item.DocID)}> <img src={report} className='report-icon' onClick={getRig} /> VIEW REPORT</button>}
                        </div>
                      </div>))}
                    </div>
                  </div>
                </div>)
        }

    
    </div>
    <div style={{ display: "flex", flexDirection: "column" }}>
      <div style={showSecondColumn ? { display: 'flex', height: '90vh', marginLeft: "5px", gap: "20px", margin: "auto" } : { height: '90vh', marginLeft: "13%" }}>
        <div style={{ marginBottom: "10px" }}>
      {showSecondColumn && (
          <div style={{ backgroundColor: "#1E203D", border: "1px solid #6B5CD1", borderRadius: "8px", marginTop: "8px", height: "85vh", marginBottom: "10px" }}>
            <div className='top-part-chart-chatbot'>
              <div className='title-chart-chatbot'>PDF Viewer</div>
              <img src={close1} style={{ width: "20px", marginLeft: "80%", marginTop: "2px" }} variant="primary" onClick={() => setShowSecondColumn(false)} />
            </div>
            {(!loading && <div style={{ width: '45vw', marginBottom: "10px", padding: "5px 5px", height: "78vh" }}>
              <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js">
                <Viewer fileUrl={pdfData} plugins={[newPlugin]} scale={initialScale} />
              </Worker>
            </div>)}
          </div>
        )}
        </div>
</div>
        </div>
  </div>
  </div>
  )
}

export default Doa