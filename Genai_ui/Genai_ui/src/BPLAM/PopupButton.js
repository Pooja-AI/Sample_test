// PopupButton.js
import React, { useState } from 'react';
import PopupForm from './PopupForm'; // Import the PopupForm component
import circle from '../images/add_circle.svg';

const PopupButton = ({ jsonResponse ,jsonResponse2,jsonResponse3, onFileUpload }) => {
  const [isPopupOpen, setPopupOpen] = useState(false);
  console.log("Popup Button")
  console.log(jsonResponse)
  const handleFileUploadInPopup = (file) => {
    // Call the callback function from App with the file data
    onFileUpload(file);
    console.log("Popup button File",file);
  };

  const openPopup = () => {
    setPopupOpen(true);
  };

  return (
    <div>
        <div className='button-comp-bplam'>
                <button className='b-c-bplam' onClick={openPopup}><img style={{width:"15px",marginRight:"5px"}} src={circle}/>GENERATE ANALYSIS</button>
                </div>
      {/* <button onClick={openPopup}>Open Popup</button> */}
      {isPopupOpen && <PopupForm jsonResponse={jsonResponse} jsonResponse2={jsonResponse2} jsonResponse3={jsonResponse3} onClose={() => setPopupOpen(false)} onFileUpload={handleFileUploadInPopup} />}
    </div>
  );
};

export default PopupButton;
