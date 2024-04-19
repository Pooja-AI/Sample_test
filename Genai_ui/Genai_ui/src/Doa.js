import React, { useState, useEffect } from 'react';
import {useNavigate} from 'react-router-dom';
import doaFrame from './images/Frame 2622.png'
import './Doa.css';
import Iicon from './images/Group 3440.svg'
import percent from './images/Group 3215.svg';
import pointer from './images/Group 3214.svg';
import heart from './images/Group 3213.svg';
import sridevi from './images/Group 3001.svg';
import jegan from './images/Group 3002.svg';
import close from './images/Group 3005.svg';
import plus from './images/Group 3205.svg';
import filter from './images/XMLID_6_.svg';
import downarrow from './images/Business_sale_drop_loss.svg';
import search from './images/XMLID_223_.svg';
import calender from './images/Vector.svg';
import Button from 'react-bootstrap/Button';
import upload from './images/Group 3296.svg';
import close1 from './images/Group 3206.svg';
import completedStatus from './images/Group 3202.svg';
import report from './images/View Report Button.svg';
import Rig from './Rig';

function Doa() {
  const [modalVisible, setModalVisible] = useState(false);
  const navigate = useNavigate();

  const handleIconClick = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  const [value, setValue] = React.useState('');

  const handleChange = (event) => {
    setValue(event.target.value);
  };
  const [calenderValue, setCalenderValue] = React.useState('');

  const handleCalenderChange = (event) => {
    setCalenderValue(event.target.value);
  };

  const handlePrevNav = (event) => {
    navigate('/energy'); 
  };
  const [showModal, setShowModal] = useState(false);
  const handleToggleModal = () => {
    setShowModal(!showModal);
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
                <li className='business-items'>Corrosion type detection</li>
                <li className='business-items'>Assess corrosion severity</li>
                <li className='business-items'>Generate workorder</li>
                <li className='business-items'>Reduced maintenance costs</li>
                <li className='business-items'>Enhanced asset longevity</li>
                <li className='business-items'>Improved operational efficacy</li>
                <li className='business-items'>Workplace safety</li>
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
  // const [showGenerateModal, setShowGenerateModal] = useState(false);
  // const handleGenerateModal = () => {
  //   setShowModal(!showGenerateModal);
  // };
  // const GenerateModal = ({ onClose }) => {
  //   <div>
  //     <p className='analysis-head'> Generate Analysis</p>
  //     <img className='close-btn' src={close} alt='Sample' onClick={onClose} />
  //   </div>


  // };
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleGenerateToggleModal = () => {
    setShow(!show);
  };

  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
  };

  const handleUpload = () => {
    if (selectedFile) {
      // Perform the upload logic here
      // You can use libraries like axios for making API requests to upload the file
      // For simplicity, let's just log the file details to the console
      console.log('File selected:', selectedFile);
    } else {
      alert('Please select a file to upload.');
    }
  };

  const GenerateModal = ({ close }) => {
    return (
      <div className="modal-overlay-doa">
        <div className='modal-doa'>
          <div className='analysis-backdrop'>
            <p className='analysis-head2'>Generate Analysis  <img src={close1} className="close-icon-doa" variant="primary" onClick={close} /></p>
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
              <p className='upload-text'>Drag and Drop files here Limit 200 MB per file - ZIP</p>
              {/* <button className='upload-button'>Upload <img src={upload} className='uploadicon'/></button>
                <input className="file-class-c"
                          type="file"
                          id="imageUpload"
                          accept=".png, .jpeg, .jpg"
                          onChange={handleImageUpload}
                        /> */}
              {/* <button className='upload-button' onClick={handleFileChange}>Upload 
              <input type="file" onChange={handleFileChange} accept=".zip" /><img src={upload} className='uploadicon' /></button> */}

              {/* <label htmlFor="imageUpload" className="upload-file-button"> 
                        <p className='browse-text'>Browse Files</p> </label>
                        <input className="file-class-c"
                          type="file"
                          id="imageUpload"
                          accept=".png, .jpeg, .jpg"
                          onChange={handleFileChange}
                        /> */}
              <label className="custom-file-upload">
                <input type="file" onChange={handleFileChange} accept=".zip" />
                <span>Upload <img src={upload} className='uploadicon' /></span>
              </label>
            </div>
          </div>
          <button type="submit" className="processe-doa-button" variant="primary" onClick={handleUpload}>Process</button>
        </div>
      </div>
    );
  }

  const [title, setTitle] = useState("");
  const [reportType, setReportType] = useState("");

  const handleTitleChange = (e) => {
    e.stopPropagation();
    setTitle(e.target.value);
  };

  const handleReportTypeChange = (e) => {
    e.stopPropagation();
    setReportType(e.target.value);
  };

  const [rigShow, setRigShow] = useState(false);
  const getRig = () => {
    // ToDo: backend call to getrig details
    setRigShow(true);
  }

  const handleProcessClick = () => {
    // Handle processing logic here
    console.log("Title:", title);
    console.log("Report Type:", reportType);
    // Close the modal after processing
    // onClose();
  };
  return (
    <div className='doa-container'>
      <div className='doa-hide-scroll'>
        <div>
          <div className='Heading-Doa'><span onClick={handlePrevNav} style={{ color: '#AD8BFF' }}>Oil & Gas </span> / Drilling Operations Assistant</div>
          <div className='info-icon-doa'><img className="doa-icon" src={Iicon} onClick={handleToggleModal} /></div>
          {showModal && (
            <PopupModal onClose={() => setShowModal(false)} />
          )}
        </div>
        {
          rigShow ? <Rig /> :
            <div>
              <img src={doaFrame} className='doa-board' />
              <div className='main-doa-container'>
                <div className='feature'>
                  <img src={plus} className='plus-button'
                    variant="primary" onClick={handleShow}
                    style={{ cursor: "pointer" }} />
                  {show && (
                    <GenerateModal close={() => setShow(false)} />
                  )}
                  <p className='analysis-head'> Generate Analysis</p>

                  <img src={filter} className='filter-button' />

                  <div>
                    <select value={value} onChange={handleChange} className='status-dd'>
                      <option>Status</option>
                      <option value="In Progress">In Progress</option>
                      <option value="Completed">Completed</option>
                      <option value="Not Started">Not Started</option>
                    </select>
                    <select value={calenderValue} onChange={handleCalenderChange} className='status-dd'>
                      <option value="In Progress">Period</option>
                    </select>
                  </div>
                </div>
                <div className='drillanalysis-report'>
                  <div className='drill-card'>
                    <div className='drill-card-body'>
                      <p className='drill-header'>12289736 - Drilling Analysis 1</p>
                      <p className='drill-body'>Created by ABC</p>
                      <img src={completedStatus} className='status-drill' />
                    </div>
                    <img src={report} className='view-report' onClick={getRig} />
                  </div>
                </div>
              </div>
            </div>
        }

      </div>

    </div>
  )
}

export default Doa