// PopupForm.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// import Tabs from './Tabs';

  // Event handler for form submission
  
const PopupForm = ({onFileUpload, jsonResponse, jsonResponse2,jsonResponse3, onClose }) => {
    const [selectedOption, setSelectedOption] = useState('option1');

  // State for the selected file in the file input
  const [selectedFile, setSelectedFile] = useState(null);
  const [showTabs, setShowTabs] = useState(false);
  const navigate = useNavigate();

//   const handleButtonClick = () => {
//     setShowTabs(true);
//   };
  // Event handler for dropdown change
  const handleDropdownChange = (event) => {
    setSelectedOption(event.target.value);
  };
  
  // Event handler for file input change
  const handleFileChange = (event) => {
    // Access the selected file from event.target.files
    const file = event.target.files[0];
    setSelectedFile(file);
  };
  console.log("Popup form file:",selectedFile);
   // Initialize showTabs state

//   const handleButtonClick = () => {
//     setShowTabs(true); // Set showTabs to true when the button is clicked
//   };
  const handleSubmit = (e) => {
    // Handle form submission logic
    e.preventDefault();
    onFileUpload(selectedFile);
    console.log('Selected Option:', selectedOption);
    console.log('Selected File:', selectedFile);
    console.log("popupform");
    console.log(jsonResponse)
    console.log('jsonResponse2',jsonResponse2)
    console.log('jsonResponse3',jsonResponse3)

    navigate('/tabs-screen', { state: { jsonResponse,jsonResponse2,jsonResponse3 } }); 
    // ,{ state: { jsonResponse } }
    // setShowTabs(true);
    onClose(); // Close the pop-up after form submission
     
  };

  return (
    
    <div className="popup-bplam">
      <div className="popup-content-bplam">
      <div className='headers-bplam'>
        <p className='analyse-bplam'>Generate Analysis</p>
        
        {/* <button className="close-btn" onClick={onClose}>
          &times;
        </button>*/}
    </div>​ 
        <button className="bplam-close-btn" onClick={onClose}>
          &times;
        </button>
        <p className='p-gen-bplam'>Enter details below to generate application ticket analysis using<strong> GEN AI</strong></p>
        <form onSubmit={handleSubmit}>
          {/* Add your form fields here */}
          <div className='div-container-bplam'>
          <div className='title-bplam'>
          <label>
            TITLE:
            </label>
          </div>
          <input className='text-bplam' type="text" />
          <div className='company-bplam'>
          <label>
          REFERENCE COMPANY:
          </label>
          </div>
        <div className='dropdown-bplam'>
        <select className='drop-down-sel-bplam' value={selectedOption} onChange={handleDropdownChange}>
        <option value="option1">Select a Company</option>
          <option value="option2">-----Choose from Existing-----</option>
          <option value="option3">Chevron</option>
          <option value="option4">Lorem Ipsum</option>
        </select>
        </div>

      {/* File Upload */}
      <div className='t-data-bplam'>
        <label>
          TICKET DATA:
          </label>
        </div>
        {/* <div className='browse'>
          <input type="file" onChange={handleFileChange} />
        
        </div> */}
        <div className='drag-select-container-bplam'>
              <div className='drags-bplam'>Drag and Drop Files Here<br></br>Limit 200 MB per File -.CSV</div> 
              <div>
            <label className="browses-bplam" htmlFor="imageUpload">Browse Files</label>
            </div>
            <input

              id="imageUpload"

              type="file"

              multiple

              name="file"

              style={{ display: "none"}}

              onChange={handleFileChange}

            />
            </div>
          {/* <div>
          <label>
            REFERENCE COMPANY:
            <input type="email" />
          </label>
          </div>
          <div>
          <label>
            TICKET DATA:
            <input type="email" />
          </label>
          </div> */}
          </div>
          <div>
          <button className="submit1-bplam" type="submit">Generate Analysis</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PopupForm;
