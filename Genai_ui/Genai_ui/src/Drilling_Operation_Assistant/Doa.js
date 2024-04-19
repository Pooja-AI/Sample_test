import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import doaFrame from '../images/Frame 2622.png'
import './Doa.css';
import Iicon from '../images/Group 3440.svg'
import plus from '../images/Group 3205.svg';
import filter from '../images/XMLID_6_.svg';
import downarrow from '../images/Business_sale_drop_loss.svg';
import search from '../images/XMLID_223_.svg';
import calender from '../images/Calender.svg';
import upload from '../images/Group 3296.svg';
import close1 from '../images/Group 3206.svg';
import report from '../images/Report.svg';
import Rig from './Rig';
import axios from 'axios';
import chatbot from '../images/Group 3439.svg';
import Chatbot from '../Generic_Chatbot';
import Info from '../Info.js';
import Barchart from './BarChart.js';
import Linechart from './LineGraph.js';
import Piechart from './PieChart.js';
import Table from 'react-bootstrap/Table';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

function Doa() {
  const [value, setValue] = React.useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [recentAnalysisDocsData, setrecentAnalysisDocsData] = useState([]);
  const [rigShow, setRigShow] = useState(false);
  const [rigAnalysisDocsData, setRigAnalysisDocsDataData] = useState([]);
  const [calenderValue, setCalenderValue] = React.useState('');
  const [showTypingEffect, setShowTypingEffect] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [showChatbotModal, setShowChatbotModal] = useState(false);
  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [title, setTitle] = useState("");
  const [reportType, setReportType] = useState("");
  const [pdf_analysis_response, setPdfAnalysisResponse] = useState("Failure");
  const [uploadresponse, seUploadresponse] = useState({});
  const [fileuploaded, setfileuploaded] = useState(false);
  const [fileuploading, setfileuploading] = useState(false);
  const [rigSeverity, seRigSeverity] = useState({});
  const [filterMode, setFilterMode] = useState(false);
  const [filteredAnalysisDocsData, setFilteredAnalysisDocsData] = useState([]);
  const [filterText, setFilterText] = useState('');
  const navigate = useNavigate();

  const handleStatusChange = (event) => {
    setValue(event.target.value);
    handleFiterChange(event.target.value, "Status");
  };

  const handleCalenderChange = (date) => {
    console.log(date);
    setCalenderValue(date);
    handleFiterChange(date, "Period");
    setFilterMode(true);
  };

  const handlePrevNav = (event) => {
    navigate('/energy');
  };

  const handleClearDate = () => {
    setCalenderValue(null);
    setFilterMode(false);
  };
  const handleFilterTextChange = event => {
    console.log(event.target.value)
    setFilterText(event.target.value);
    handleFiterChange(event.target.value, "Text");
    setFilterMode(true);
  };
  const handleFiterChange = async (value, type) => {
    if (type === "Status" && value == "Clear") {
      // No action required
      setFilterMode(false);
    }
    else if (type === "Status" && value) {
      console.log("Status");
      console.log(value);
      // if (value === null) {
      //   console.log("status check")
      //   value = "Completed"
      // }
      const filteredResult = recentAnalysisDocsData.filter(item => {
        console.log(item)
        return value == "In Progress" ? item.Status == value : (item.Status ? item.Status == value : item.Status == null);
      });
      setFilteredAnalysisDocsData(filteredResult);
      setFilterMode(true);
    }
    else if (type === "Period" && value) {
      console.log("period")
      const formattedDate =
        value.getDate().toString().padStart(2, '0') +
        (value.getMonth() + 1).toString().padStart(2, '0') +
        value.getFullYear().toString().slice(2);
      console.log(formattedDate);
      const filteredResult = recentAnalysisDocsData.filter(item => {
        return item.CurrentTimestamp === formattedDate;
      });
      console.log(filteredResult);
      setFilteredAnalysisDocsData(filteredResult);
    }
    else if (type === "Text") {
      const filteredResult = recentAnalysisDocsData.filter(item => {
        return value ? item.Title.toLowerCase().includes(value.toLowerCase()) : item;
      });
      setFilteredAnalysisDocsData(filteredResult);
    }
    else {
      setFilterMode(false);
    }
  };

  const handleToggleModal = () => {
    setShowModal(!showModal);
  };
  const handleChatbotToggleModal = () => {
    setShowChatbotModal(!showChatbotModal);
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
        const response = await axios.post('http://52.157.248.244:5000/uploadFiles', formData, {
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
      console.log(recentAnalysisDocsData);
      console.log(uploadresponse);
      const upload_config = uploadresponse.response;
      const generate_pdf_request = {
        file_path: upload_config.filepath,
        file_name: upload_config.filename,
        title: title,
        report_type: reportType,
        created_by: "Admin"
      }
      console.log(generate_pdf_request);

      const generate_pdf_response = await axios.post('http://52.157.248.244:5000/generate_pdfanalysis', generate_pdf_request, {
        headers: {
          'Content-Type': 'application/json',
        }
      });
      setfileuploaded(false)
      const docId = generate_pdf_response.data.data.docId;
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
      setPdfAnalysisResponse("Failure");
    }
  };

  const Loading = () => {
    return (
      <div className="loader-c" style={{ marginTop: "-25px" }}>
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
      const response = await axios.get('http://52.157.248.244:5000/get_recent_analysisdocs');
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
      const response = await axios.get('http://52.157.248.244:5000/get_analysis', {
        params: {
          docId: docId
        }
      });
      const result = response.data.data;
      setRigAnalysisDocsDataData(response.data.data);
      console.log('rigAnalysisDocs response', result)
      const issue_data = result.map(entry => entry.RigAnalysis.Issues.length);
      const uniqueLengthsSet = new Set(issue_data);
      const values = [...uniqueLengthsSet];
      console.log(values);

      const sortedValues = values.sort((a, b) => a - b);
      let lowSeverity, mediumSeverity, highSeverity;

      if (sortedValues.length < 3) {
        console.log("here")
        const largestValue = Math.max(...sortedValues);
        highSeverity = [largestValue];
        const remainingValues = sortedValues.filter(value => value !== largestValue);
        const setSize = Math.ceil(remainingValues.length / 2);
        lowSeverity = remainingValues.slice(0, setSize);
        mediumSeverity = remainingValues.slice(setSize);
      } else {
        const setSize = Math.ceil(sortedValues.length / 3);
        lowSeverity = sortedValues.slice(0, setSize);
        const valuesNotInLow = sortedValues.filter(value => !lowSeverity.includes(value));
        mediumSeverity = valuesNotInLow.slice(0, setSize);
        // const valuesNotInMedium = valuesNotInLow.filter(value => !mediumSeverity.includes(value));
        const maxValueNotInMedium = Math.max(...valuesNotInLow);
        highSeverity = [maxValueNotInMedium];
      }
      const severity = {
        "lowSeverity": lowSeverity,
        "mediumSeverity": mediumSeverity,
        "highSeverity": highSeverity
      }
      seRigSeverity(severity);
      console.log("Low Severity:", lowSeverity);
      console.log("Medium Severity:", mediumSeverity);
      console.log("High Severity:", highSeverity);
      // }
      setRigShow(true);
    } catch (error) {
      console.error('Error fetching data from recentAnalysisDocs API', error);
    }
  }

  const handleProcessClick = () => {
    console.log("Title:", title);
    console.log("Report Type:", reportType);
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
  const questions = ["Provide total depth of different wells.",
    "Provide the drilling report on GCHAR",
    "Provide the drilling report on VIV-12",
    "Plot a bar graph on Mud PPG of different wells", "Can you give me the Drilling report on GCHAR"];
  const scrollContainerRef = useRef(null);

  const scrollToBottom = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTop = scrollContainerRef.current.scrollHeight;
    }
  };
  const renderchatResponse = (message, index, chatMessages) => {
    scrollToBottom();
    console.log(message);
    if (message.user) {
      return (
        <div className="user-message-v">
          {(index === chatMessages.length - 1) ? <TypingEffect text={message.message} /> : <span>{message.message}</span>}
        </div>
      );
    }
    else if (message.message == "Hi! How can I assist you today?") {
      return (
        <div className="user-message-v">
          {(index === chatMessages.length - 1) ? <TypingEffect text={message.message} /> : <span>{message.message}</span>}
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
          return (
            <div className="bot-text-response-d">
              {(index === chatMessages.length - 1) ? <TypingEffect text={response_data} /> : <span>{response_data} </span>}
            </div>
          );
        }
        else if (response_type === "table") {
          console.log("table");
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
        else if (response_type === "graph") {
          if ('bar' in response_data) {
            const bar_data = response_data.bar;
            const chartData = bar_data.data.map(([name, value]) => ({ name, value }));
            const xAxis = bar_data.columns[0];
            const yAxis = bar_data.columns[1];
            console.log(chartData)
            return (<Barchart barChartData={chartData} xAxis={xAxis} yAxis={yAxis} />)
          }
          else if ('line' in response_data) {
            const data = response_data.line;
            const chartData = data.data.map(([name, value]) => ({ name, value }));
            const xAxis = data.columns[0];
            const yAxis = data.columns[1];
            console.log(chartData)
            return (<Linechart lineChartData={chartData} xAxis={xAxis} yAxis={yAxis} />)
          }
          else if ('pie' in response_data) {
            const data = response_data.pie;
            const chartData = data.data.map(([name, value]) => ({ name, value }));
            console.log(chartData)
            return (<Piechart chartData={chartData} />)
          }
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
                  <thead style={{ width: "fit-content" }}>
                    <tr style={{ width: "100px", padding: "5px 10px" }}>
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
  const infocontent = {
    "description": [
      "GenAI simplifies the process of handover between shifts and to have a Quick glance of summary with region wise information",
      "Business can focus more on critical operational task for prompt decision making on high priority drilling jobs.",
      "Based on the Live Streaming Data (WITSML) or DDR (Daily Drilling Reports), GenAI can be leveraged to quickly glance over the summary of the operational wells/rigs with region wise information."
    ],
    "BusinessValueProposition": [
      "Simplified Shift Handover Process",
      "Quick Access to Region-Wise Operational Summaries",
      "Enhanced Focus on Critical Operational Tasks",
      "Improved Decision-Making for High-Priority Drilling Jobs",
      "Mitigation of Communication Gaps and Documentation Issues"
    ],
    "problemStatement": [
      "Effective handover is the key for successful execution of next phase. GenAI simplifies this handover process",
      "This will avoid issues due to communication Gaps, Lack of documentation, incomplete information, language Barrier, Shift overlap, lack of standardization, Training Gaps"
    ],
    "Howdoesitwork": [
      " Data collection (e.g., Live Streaming Data (WITSML) or DR (Daily Drilling Reports))",
      "Data Processing",
      "Embedding input data into the Vector Database",
      "GenAI Model interaction with the user (e.g., upload a report, prompt a query)",
      "Text retrieval, graph visualization etc."
    ],
    "Technologychoices": [
      "Containerized cloud",
      "deployment",
      "Cloud agnostic",
      "LLM: OpenAI models",
      "Embedding",
      "Vector DB"
    ]
  }
  return (
    <div className='doa-container'>
      <div className='doa-hide-scroll'>
        <div>
          <div className='Heading-Doa'>
            <span onClick={handlePrevNav} style={{ color: '#AD8BFF', marginLeft: "5px" }}>Oil & Gas</span> /  Drilling Operations Assistant
            <div className='info-icon-doa'>
              <img className='doa-icon' src={chatbot} onClick={handleChatbotToggleModal} />
              <img className="doa-icon" src={Iicon} onClick={handleToggleModal} />
            </div></div>

          {showModal && (
            <Info onClose={() => setShowModal(false)} infocontent={infocontent} />
          )}
        </div>
        {
          rigShow ? <Rig data={rigAnalysisDocsData} rigSeverity={rigSeverity} close={() => setRigShow(false)} chatshow={showChatbotModal} closechat={() => setShowChatbotModal(false)}
            renderchatResponse={renderchatResponse} renderResponse={renderResponse} endpoint="http://52.157.248.244:5000/chatBot"
            questions={questions}
          />
            : (showChatbotModal ? <Chatbot closechat={() => setShowChatbotModal(false)} renderchatResponse={renderchatResponse} renderResponse={renderResponse} endpoint="http://52.157.248.244:5000/chatBot" questions={questions} /> :
              (isLoading ? (<Fetching />) :
                <div>
                  <img src={doaFrame} className='doa-board' />
                  <div className='main-doa-container'>
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
                              <label className="generate-label-doa">Report Type</label>
                              <select value={reportType} className='form-data-doa' placeholder="Select Morning Report / Evening Report" onChange={handleReportTypeChange}>
                                <option value="" disabled hidden className="generate-label-doa">
                                  Select Morning / Evening Report
                                </option>
                                <option value="morning">Morning Report</option>
                                <option value="evening">Evening Report</option>
                              </select>
                              <div className='rig-details-box' style={{ margin: "35px 10px 0px 0px", display: "flex", padding: "10px" }}>
                                <p className='upload-text'>Drag and Drop files here <br />Limit 200 MB per file - PDF/XML</p>
                                <label className="custom-file-upload">
                                  <input type="file" onChange={handleFileChange} accept=".pdf, .xml" />
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

                      <div style={{ display: "flex" }}>
                        <select value={value} onChange={handleStatusChange} className='status-dd'>
                          <option value="" disabled selected>Status</option>
                          <option value="In Progress">In Progress</option>
                          <option value="Completed">Completed</option>
                          <option value="Clear">Clear</option>
                        </select>
                        {/* <input
                          className='status-dd'
                          type="text"
                          value={filterText}
                          onChange={handleFilterTextChange}
                          placeholder="Search here"
                        /> */}
                        <div class="icon-input">
                          <span class="icon12">
                            <img src={calender} style={{ width: "17px" }} /></span>
                          <DatePicker
                            className="status-dd datepicker"
                            selected={calenderValue}
                            onChange={handleCalenderChange}
                            dateFormat="dd/MM/yyyy"
                            isClearable
                            placeholderText="Period"
                            onBlur={handleClearDate}
                          /></div>
                        <div class="icon-input">
                          <span class="icon123">
                            <img src={search} style={{ width: "17px" }} />
                          </span>
                          <input className='search-dd'
                            type="text"
                            value={filterText}
                            onChange={handleFilterTextChange}
                            placeholder="Search here" />
                        </div>
                      </div>
                    </div>
                    <div className='drillanalysis-report'>
                      {
                        filterMode ? (filteredAnalysisDocsData.map(item => (
                          <div className='drill-card'>
                            <div className='drill-card-body' key={item.DocID}>
                              <p className='drill-header'>{item.CurrentTimestamp} - {item.Title}</p>
                              <p className='drill-body'>Created by {item.CreatedBy}</p>
                              <p className='status-drill'> {item.Status ? item.Status : "Completed"} </p>
                              {item.Status === "In Progress" ? <Loading /> : <button className='view-report' onClick={() => getRig(item.DocID)}> <img src={report} className='report-icon' onClick={getRig} /> VIEW REPORT</button>}
                            </div>
                          </div>))) :
                          (recentAnalysisDocsData.map(item => (
                            <div className='drill-card'>
                              <div className='drill-card-body' key={item.DocID}>
                                <p className='drill-header'>{item.CurrentTimestamp} - {item.Title}</p>
                                <p className='drill-body'>Created by {item.CreatedBy}</p>
                                <p className='status-drill'> {item.Status ? item.Status : "Completed"} </p>
                                {item.Status === "In Progress" ? <Loading /> : <button className='view-report' onClick={() => getRig(item.DocID)}> <img src={report} className='report-icon' onClick={getRig} /> VIEW REPORT</button>}
                              </div>
                            </div>)))}
                    </div>
                  </div>
                </div>))
        }
      </div>
    </div>
  )
}

export default Doa