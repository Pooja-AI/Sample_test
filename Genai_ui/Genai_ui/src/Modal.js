import React, { useState } from "react";
import "./Modal.css";
import close from './images/Group 3296.svg';

const Modal = ({ onClose }) => {
  const [title, setTitle] = useState("");
  const [reportType, setReportType] = useState("");

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleReportTypeChange = (e) => {
    setReportType(e.target.value);
  };

  const handleProcessClick = () => {
    // Handle processing logic here
    console.log("Title:", title);
    console.log("Report Type:", reportType);
    // Close the modal after processing
    onClose();
  };

  return (
    <div className="modal-overlay-doa">
      <div className="modal-doa">
        <div className="modal-content-doa">
          <div className='analysis-head2 analysis-backdrop'> Generate Analysis
            <img src={close} className="close-icon-doa" onClick={onClose} />
          </div>
          <div className="describe">provide details below to generate analysis on drilling operations using GEN AI</div>
          <label className="generate-label-doa">Title</label>
          <input type="text" className='form-data-doa' placeholder="Enter Title" value={title} onChange={handleTitleChange} />
          <label className="generate-label-doa">Select Report</label>
          <select value={reportType} className='form-data' placeholder="Select Morning Report / Evening Report" onChange={handleReportTypeChange}>
            <option value="" disabled hidden className="generate-label-doa">
              Select Morning / Evening Report
            </option>
            <option value="morning">Morning Report</option>
            <option value="evening">Evening Report</option>
          </select>
          {/* <div className="uploadbox-doa">
          </div> */}
          <button type="submit" className="processe-doa-button" onClick={handleProcessClick}>Process</button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
