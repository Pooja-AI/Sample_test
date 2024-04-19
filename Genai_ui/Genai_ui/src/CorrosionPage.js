import { Outlet, useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import './CorrosionPage.css';
import close from './images/Group 3005.svg';
import axios from 'axios';
import percent from './images/Group 3215.svg';
import pointer from './images/Group 3214.svg';
import heart from './images/Group 3213.svg';
import sridevi from './images/Group 3001.svg';
import jegan from './images/Group 3002.svg';
import browser from './images/upload_FILL0_wght400_GRAD0_opsz24 1.svg'
import DetectionTabs from './DetectionTabs';
import Iicon from './images/Group 3000.svg'
import Info from './Info.js';

const App = () => {
  const [dropdown1Value, setDropdown1Value] = useState('');
  const [dropdown2Value, setDropdown2Value] = useState('');
  const [dropdown2Options, setDropdown2Options] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [fileUploaded, setFileUploaded] = useState(false);
  const navigate = useNavigate();
  const [uploadSuccessMessage, setUploadSuccessMessage] = useState('');
  const [detectedCorrosionType, setDetectedCorrosionType] = useState('');
  const [activeTab, setActiveTab] = useState('Summary');
  const [showLoader, setShowLoader] = useState(false);
  const [showSegmentedView, setShowSegmentedView] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const handlePrevNav = (event) => {
    navigate('/energy'); 
  };

  const handleToggleModal = () => {
    setShowModal(!showModal);
  };
  const handleTabClick = (tabName) => {
    setActiveTab(tabName);
  };
  const handleFileChange = (event) => {
    const files = event.target.files;
    setSelectedFiles(Array.from(files));
  };

  const assetsByPlant = {
    'Plant A': ['AS0001', 'AS0002', 'AS0003', 'AS0010', 'AS0011', 'AS0012', 'AS0013', 'AS0021', 'AS0022', 'AS0023', 'AS0024', 'AS0031', 'AS0032', 'AS0037', 'AS0038', 'AS0043', 'AS0044', 'AS0049', 'AS0050', 'AS0055', 'AS0056', 'AS0061', 'AS0062', 'AS0067', 'AS0068', 'AS0073', 'AS0074', 'AS0079', 'AS0080', 'AS0085', 'AS0086', 'AS0091', 'AS0092', 'AS0097', 'AS0098', 'AS0103', 'AS0104', 'AS0109', 'AS0110', 'AS0115', 'AS0116', 'AS121', 'AS122'],
    'Plant B': ['AS0004', 'AS0005', 'AS0006', 'AS0014', 'AS0015', 'AS0016', 'AS0025', 'AS0033', 'AS0034', 'AS0039', 'AS0040', 'AS0045', 'AS0046', 'AS0051', 'AS0052', 'AS0057', 'AS0058', 'AS0063', 'AS0064', 'AS0069', 'AS0070', 'AS0075', 'AS0076', 'AS0081', 'AS0082', 'AS0087', 'AS0088', 'AS0093', 'AS0094', 'AS0099', 'AS0100', 'AS0105', 'AS0106', 'AS0111', 'AS0112', 'AS0117', 'AS0118', 'AS123', 'AS124'],
    'Plant C': ['AS0007', 'AS0008', 'AS0009', 'AS0017', 'AS0018', 'AS0019', 'AS0020', 'AS0026', 'AS0027', 'AS0028', 'AS0029', 'AS0030', 'AS0035', 'AS0036', 'AS0041', 'AS0042', 'AS0047', 'AS0048', 'AS0053', 'AS0054', 'AS0059', 'AS0060', 'AS0065', 'AS0066', 'AS0071', 'AS0072', 'AS0077', 'AS0078', 'AS0083', 'AS0084', 'AS0089', 'AS0090', 'AS0095', 'AS0096', 'AS0101', 'AS0102', 'AS0107', 'AS0108', 'AS0113', 'AS0114', 'AS0119', 'AS0120', 'AS125', 'AS126'],
    // Add assets for other plants if needed
  };
  const handleDropdown1Change = (event) => {
    const selectedPlant = event.target.value;
    setDropdown1Value(selectedPlant);
    setDropdown2Value('');
    setDropdown2Options(assetsByPlant[selectedPlant]);
  };

  const handleDropdown2Change = (event) => {
    setDropdown2Value(event.target.value);
  };
  const [modalVisible, setModalVisible] = useState(false);

  const handleIconClick = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };
  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    const fileExtension = file.name.split('.').pop().toLowerCase();

    if (fileExtension === 'png' || fileExtension === 'jpeg' || fileExtension === 'jpg') {
      const formData = new FormData();
      formData.append('image', file);
      const reader = new FileReader();

      reader.onload = function () {
        const base64Image = reader.result; // This is a Base64-encoded image string
        localStorage.setItem('uploadedImage', base64Image);
        console.log("AAA", base64Image)
      };

      reader.readAsDataURL(file);

      try {
        const response = await fetch('http://52.157.248.197:5000/imageGen', {
          method: 'POST',
          body: formData,
        });

        if (response.ok) {
          const result = await response.text();
          setDetectedCorrosionType(result);
          setModalVisible(true);
          // setUploadSuccessMessage('File uploaded successfully.......');
          setFileUploaded(true);

          // Hide the success message after 3 seconds
          setTimeout(() => {
            setFileUploaded(false);
            // setUploadSuccessMessage('');
            setModalVisible(false);
          }, 2000);
        } else {
          throw new Error('Image processing failed');
        }

      } catch (error) {
        console.error(error);
      }

      setSelectedImage(URL.createObjectURL(file));


    } else {
      alert('Please upload a PNG, JPEG, or JPG file.');
    }
  };

  const handleButtonClick = () => {
    // Perform the first operation

    handleShowSegmentedView();
    localStorage.setItem('detectedCorrosionType', detectedCorrosionType);
    localStorage.setItem('plantId', dropdown1Value);
    sessionStorage.setItem('assetId', dropdown2Value);
    sessionStorage.setItem('selectedImage', selectedImage);
  };
  const showPopupMessage = () => {

    setShowSuccessPopup(true);

    // Set the pop-up message to disappear after a certain time (e.g., 3 seconds)

    setTimeout(() => {

      setShowSuccessPopup(false);

    }, 3000);

  };


  const handleShowSegmentedView = () => {
    setShowSegmentedView(true);
  };
  useEffect(() => {
    console.log('Component mounted');
    if (showSegmentedView) {
      console.log('showSegmentedView changed to true');
    }
  }, [showSegmentedView]);

  return (
    <div>
      {showSegmentedView ? (
        <div className='detection-results'>
          {/* <div className= "Heading5"> <h1><strong>Corrosion detection MainPage</strong></h1></div> */}
          <DetectionTabs selectedImage={selectedImage} />
          {/* <Link to="/detectionresult"onClick={() => handleColorInput("Summary")}>Summary </Link> */}
          <Outlet />
        </div>
      ) :
        <div>
          <div className="main-container">
            <div className='In-main-container'>
              <div className='Heading-v' style={{width:"400px"}}><span onClick={handlePrevNav} style={{ color: '#AD8BFF', cursor:"pointer" }}>Oil & Gas </span> / Corrosion Assistant</div>

              <div className='info-icon'><img className="i-icon" src={Iicon} onClick={handleToggleModal} /></div>

              {showModal && (
                <Info
                  onClose={() => setShowModal(false)}
                />
              )}
            </div>


            <div className="post-main-container">
              <div className='Heading2'>Input for Corrosion Analysis</div>
              {/* {fileUploaded && (
              <div  className="upload-success-message">{uploadSuccessMessage}</div>
            )} */}
              {modalVisible && <div className="modal-overlay-quest">
                <div className="modal-doa-quest"><div className='analysis-head2-file'>File uploaded successfully!</div></div> </div>}
              <div className="pre-subcontainer">
                <div className="left-sub-container">
                  <div className='plant-id-container'>
                    <div className='label-c'>Plant ID  </div>
                    <select value={dropdown1Value} onChange={handleDropdown1Change} className='corrosion-select'>
                      <option value="">Select a Plant </option>
                      <option value="Plant A">Plant A</option>
                      <option value="Plant B">Plant B</option>
                      <option value="Plant C">Plant C</option>
                    </select>
                    <br />
                  </div>
                  <div className='asset-id-container'>
                    <div className='label-c'>Asset ID  </div>
                    {dropdown2Options && dropdown2Options.length > 0 ? (
                      <select className='corrosion-select' value={dropdown2Value} onChange={handleDropdown2Change}>
                        <option value="">Select an Asset</option>
                        {dropdown2Options.map((asset, index) => (
                          <option key={index} value={asset}>
                            {asset}
                          </option>
                        ))}
                      </select>
                    ) : (
                      <select disabled className='corrosion-select'>
                        <option value="">Select a Plant First</option>
                      </select>
                    )}


                  </div>

                </div>

                <div className="right-sub-container">
                  <div className='upload-file-container'>
                    <p className='upload-image'>Upload Images</p>
                    <div className='upload-image-header'>
                      <div className='drag-n-drop-files-containers'>
                        <div><img className="browse-logo" src={browser} /></div>
                        <div className='placeholders'>
                          <div className='Placeholder1'> Drag and Drop files here</div>

                        </div>

                      </div>
                      <div className='or-option'>OR</div>
                      <div className='browse-files-containers'>
                        {/* <div><img className="browse-logo" src={browse}/></div> */}
                        <div className='placeholders'>
                          <div className='Placeholder4'> Choose Files<br /> from your System </div>
                        </div>

                        <label htmlFor="imageUpload" className="upload-file-button">
                          <p className='browse-text'>Browse Files</p> </label>
                        <input className="file-class-c"
                          type="file"
                          id="imageUpload"
                          accept=".png, .jpeg, .jpg"
                          onChange={handleImageUpload}
                        />


                      </div>

                      <br />
                      <br />

                    </div>
                  </div>
                </div>

              </div>
              <button className="processbutton" onClick={handleButtonClick}>PROCESS</button>

            </div>

          </div>



        </div>

      }
    </div>
  );
};

export default App;

