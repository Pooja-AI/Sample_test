import React, { useState, useEffect, useCallback } from 'react';

import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom';
import './bplam.css';
import Multiselect from 'multiselect-react-dropdown';
import { CSVLink } from 'react-csv';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import axios from 'axios';
import Select from 'react-select';
import PopupButton from './PopupButton';
// import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import TabsScreen from './TabsScreen';
// import TabsScreen from './TabsScreen'; 
import pheader from '../images/Primary Header.svg';
import topimage from '../images/Group 3000.svg';
import upload from '../images/Group 3007.svg';
import bplamsc from '../images/Frame 2622_bplam.svg';
import report from '../images/Report.svg';
import search from '../images/search_bplam.svg';
import PopupForm from './PopupForm';
import Tabs from './Tabs';
import Info from './Infobplam';





const App = () => {
  const [file1, setFile1] = useState(null);
  const [file2, setFile2] = useState(null);
  const [showTabs, setShowTabs] = useState(false);
  const [selectedOption, setSelectedOption] = useState("All Sections");
  const [selectedSections, setSelectedSections] = useState([]);
  const [filteredCsvData, setFilteredCsvData] = useState([]);
  const [folderStructure, setFolderStructure] = useState([]);
  const [selectedFolder, setSelectedFolder] = useState([]);
  const [file1Options, setFile1Options] = useState([]);
  const [file2Options, setFile2Options] = useState([]);
  const [folderTitle, setFolderTitle] = useState('');
  const [progressState, setProgressState] = useState('inprogress');
  const [reportbutton, setreportbutton] = useState('');
  const [generatebutton, setgeneratebutton] = useState('');
  const [reportText, setReportText] = useState([]);

  const navigate = useNavigate(); // Add useNavigate hook
  const [showLoader, setShowLoader] = useState(false);
  const [jsonResponse, setJsonResponse] = useState(null);
  const [jsonResponse2, setJsonResponse2] = useState(null);
  const [jsonResponse3, setJsonResponse3] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadedFile, setUploadedFile] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [filterMode, setFilterMode] = useState(false);
  const [recentAnalysisDocsData, setrecentAnalysisDocsData] = useState([]);
  const [filteredAnalysisDocsData, setFilteredAnalysisDocsData] = useState([]);
  const [filterText, setFilterText] = useState('');

  const handleToggleModal = () => {
    setShowModal(!showModal);
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
  const handleFilterTextChange = event => {
    console.log(event.target.value)
    setFilterText(event.target.value);
    handleFiterChange(event.target.value, "Text");
    setFilterMode(true);
  };
  // Callback function to receive the selected file from PopupForm
  const handleFileSelect = (file) => {
    setSelectedFile(file);
  };
  // const [jsonResponse, setJsonResponse] = useState(hardcodedJsonResponse);
  const handleFileUpload = (file) => {
    // Do something with the file data (e.g., set it to state)
    setUploadedFile(file);
    console.log("bplam App file");
    console.log(file);
  };
  // console.log("uploadedFile:",uploadedFile);

  // const headers = [
  //   { label: 'ID', key: 'Section_ID' },
  //   { label: 'Reference Document', key: 'VersionA' },
  //   { label: 'Amended Document', key: 'VersionB' },
  //   { label: 'Change', key: 'Change' },
  //   { label: 'Impact', key: 'Impact' },
  // ];
  // const handleuploadClick = async (uploadedFile) => {

  //   try {

  //     setShowLoader(true);
  //     console.log("Upload Files started")
  //     setShowLoader(true);

  //     const formData = new FormData();

  //     console.log(uploadedFile)
  //     formData.append(`file`, uploadedFile);


  //     // Append each selected file to the formData object

  //     // selectedFiles.forEach((file, index) => {

  //     //   console.log(index)

  //     //   formData.append(`file`, file);

  //     // });

  //     console.log(formData)


  //     // Make the API call to your Flask server
  //     const response = await axios.post('http://127.0.0.1:3005/first_screen', formData, {
  //       headers: {
  //         'Content-Type': 'multipart/form-data',
  //       },
  //     });

  //     // Handle the API response here if needed
  //     console.log('API response:', response.data);

  //     // Clear the selected files after successful upload
  //     console.log("File uploaded successfully")
  //     //showPopupMessage();
  //   } catch (error) {
  //     console.error('Error occurred while uploading files:', error);
  //   } finally {
  //     setShowLoader(false); // Set loading to false after handling the response or error
  //   }
  // };

  // useEffect(() => {
  //   const fetchData = async () => {

  //       try {
  //         const formData = new FormData();
  //         formData.append('file', uploadedFile);
  //         console.log("fetchdata file",uploadedFile)

  //       // const response = await fetch('http://127.0.0.1:3005/first_screen', {
  //       //   method: 'POST',
  //       //   body: formData,
  //       // });
  //         const response = await axios.post('http://127.0.0.1:3005/first_screen', formData, {
  //             headers: {
  //               'Content-Type': 'multipart/form-data',
  //             },
  //           });

  //       // if (!response.ok) {
  //       //   throw new Error(`HTTP error! Status: ${response.status}`);
  //       // }

  //       // Assuming the backend responds with JSON, use the following line to parse the JSON
  //         console.log("API Response:",response);
  //         if (response.status === 200) {

  //           (response.status === 200 && response.ok === "true") ? console.log('File uploaded successfully!') : alert("File already exists..");
  //         } else {
  //           console.error('File upload failed.');
  //           alert('File upload failed.');
  //         }

  //         // Assuming the backend responds with JSON, use the following line to parse the JSON
  //         const jsonResponse = await response.json();

  //         // Now you can use jsonResponse as the parsed JSON data
  //         console.log('JSON Response:', jsonResponse);
  //         const extractedData = jsonResponse.response;

  //         // If needed, you can set the jsonResponse to state
  //         setJsonResponse(extractedData);
  //         // const jsonResponse =response;
  //         // // const jsonResponse = await response.json();

  //         // // Now you can use jsonResponse as the parsed JSON data
  //         // console.log('JSON Response:', jsonResponse);

  //         // // If needed, you can set the jsonResponse to state
  //         // setJsonResponse(jsonResponse);
  //       } catch (error) {
  //         console.error('Error fetching data:', error);
  //       }

  //   };


  //   fetchData();
  // }, []);

  //   try {
  //     const formData = new FormData();
  //     formData.append('file', file);

  //     const response = await fetch('your-backend-api-url', {
  //       method: 'POST',
  //       body: formData,
  //     });

  //     if (response.ok) {
  //       // File successfully uploaded to the backend
  //       console.log('File uploaded successfully');
  //     } else {
  //       // Handle errors
  //       console.error('Failed to upload file to the backend');
  //     }
  //   } catch (error) {
  //     console.error('Error uploading file:', error);
  //   }
  // };

  useEffect(() => {
    const fetchData = async () => {
      try {
        //   const response2 = await axios.post('https://industrygenai.accenture.com/bplam/second_screen',  {

        //   });
        //   console.log('API response:', response2);
        //    const data={
        //     "message": "success",
        //     "response": {
        //         "date_range": {
        //             "end": "27-May-21",
        //             "start": "22-Dec-20"
        //         },
        //         "drilldowns": "[\n  {\n    \"label\": \"Plan & Manage the Enterprise\",\n    \"value\": 0,\n    \"pid\": \"1\",\n    \"level2\": [\n      {\n        \"label\": \"Enterprise Strategy  & Performance Management\",\n        \"value\": 0,\n        \"pid\": \"1.1\",\n        \"level3\": [\n          {\n            \"label\": \"Enterprise Strategy Management\",\n            \"value\": 0,\n            \"pid\": \"1.1.1\"\n          },\n          {\n            \"label\": \"Enterprise Performance Management\",\n            \"value\": 0,\n            \"pid\": \"1.1.2\"\n          },\n          {\n            \"label\": \"Enterprise EH&S Strategy Management\",\n            \"value\": 0,\n            \"pid\": \"1.1.3\"\n          }\n        ]\n      },\n      {\n        \"label\": \"Portfolio Management\",\n        \"value\": 0,\n        \"pid\": \"1.2\",\n        \"level3\": [\n          {\n            \"label\": \"Portfolio Strategy Management\",\n            \"value\": 0,\n            \"pid\": \"1.2.1\"\n          },\n          {\n            \"label\": \"Portfolio Assessment & Controlling\",\n            \"value\": 0,\n            \"pid\": \"1.2.2\"\n          },\n          {\n            \"label\": \"Opportunity Identification & Management\",\n            \"value\": 0,\n            \"pid\": \"1.2.3\"\n          }\n        ]\n      },\n      {\n        \"label\": \"Enterprise Risk Management\",\n        \"value\": 0,\n        \"pid\": \"1.3\",\n        \"level3\": [\n          {\n            \"label\": \"Financial Risk Management\",\n            \"value\": 0,\n            \"pid\": \"1.3.1\"\n          },\n          {\n            \"label\": \"Non-Financial Risk Management\",\n            \"value\": 0,\n            \"pid\": \"1.3.2\"\n          },\n          {\n            \"label\": \"Insurance Management\",\n            \"value\": 0,\n            \"pid\": \"1.3.3\"\n          },\n          {\n            \"label\": \"EH&S Governance\",\n            \"value\": 0,\n            \"pid\": \"1.3.4\"\n          }\n        ]\n      },\n      {\n        \"label\": \"Stakeholder Relationship Management\",\n        \"value\": 0,\n        \"pid\": \"1.4\",\n        \"level3\": [\n          {\n            \"label\": \"Stakeholder Identification\",\n            \"value\": 0,\n            \"pid\": \"1.4.1\"\n          },\n          {\n            \"label\": \"Stakeholder Interaction\",\n            \"value\": 0,\n            \"pid\": \"1.4.2\"\n          }\n        ]\n      },\n      {\n        \"label\": \"Business & Competitive Intelligence\",\n        \"value\": 0,\n        \"pid\": \"1.5\",\n        \"level3\": [\n          {\n            \"label\": \"Business Intelligence\",\n            \"value\": 0,\n            \"pid\": \"1.5.1\"\n          },\n          {\n            \"label\": \"Competitive Intelligence\",\n            \"value\": 0,\n            \"pid\": \"1.5.2\"\n          }\n        ]\n      }\n    ]\n  },\n  {\n    \"label\": \"Upstream Core Operations\",\n    \"value\": 1,\n    \"pid\": \"2\",\n    \"level2\": [\n      {\n        \"label\": \"Exploration Management\",\n        \"value\": 0,\n        \"pid\": \"2.1\",\n        \"level3\": [\n          {\n            \"label\": \"Basin Evaluation\",\n            \"value\": 0,\n            \"pid\": \"2.1.1\"\n          },\n          {\n            \"label\": \"Seismic Acquisition & Processing\",\n            \"value\": 0,\n            \"pid\": \"2.1.2\"\n          },\n          {\n            \"label\": \"Exploration Data Interpretation\",\n            \"value\": 0,\n            \"pid\": \"2.1.3\"\n          },\n          {\n            \"label\": \"Geological Interpretation\",\n            \"value\": 0,\n            \"pid\": \"2.1.4\"\n          }\n        ]\n      },\n      {\n        \"label\": \"Wells & Field Development\",\n        \"value\": 0,\n        \"pid\": \"2.2\",\n        \"level3\": [\n          {\n            \"label\": \"Well Design\",\n            \"value\": 0,\n            \"pid\": \"2.2.1\"\n          },\n          {\n            \"label\": \"Well Planning & Performance Mgmt\",\n            \"value\": 0,\n            \"pid\": \"2.2.2\"\n          },\n          {\n            \"label\": \"Well Operations\",\n            \"value\": 0,\n            \"pid\": \"2.2.3\"\n          }\n        ]\n      },\n      {\n        \"label\": \"Production Operations\",\n        \"value\": 1,\n        \"pid\": \"2.3\",\n        \"level3\": [\n          {\n            \"label\": \"Production Ops. Activities\",\n            \"value\": 0,\n            \"pid\": \"2.3.1\"\n          },\n          {\n            \"label\": \"Production Ops. Engineering\",\n            \"value\": 0,\n            \"pid\": \"2.3.2\"\n          },\n          {\n            \"label\": \"Production Ops. Management\",\n            \"value\": 0,\n            \"pid\": \"2.3.3\"\n          },\n          {\n            \"label\": \"Reservoir Engineering\",\n            \"value\": 0,\n            \"pid\": \"2.3.4\"\n          },\n          {\n            \"label\": \"Integrated Gas Operations\",\n            \"value\": 1,\n            \"pid\": \"2.3.5\"\n          }\n        ]\n      },\n      {\n        \"label\": \"Technology & Engineering\",\n        \"value\": 0,\n        \"pid\": \"2.4\",\n        \"level3\": [\n          {\n            \"label\": \"Research & Development\",\n            \"value\": 0,\n            \"pid\": \"2.4.1\"\n          },\n          {\n            \"label\": \"Engineering Management\",\n            \"value\": 0,\n            \"pid\": \"2.4.2\"\n          },\n          {\n            \"label\": \"Process Engineering\",\n            \"value\": 0,\n            \"pid\": \"2.4.3\"\n          },\n          {\n            \"label\": \"Project Engineering\",\n            \"value\": 0,\n            \"pid\": \"2.4.4\"\n          },\n          {\n            \"label\": \"Process Automation\",\n            \"value\": 0,\n            \"pid\": \"2.4.5\"\n          },\n          {\n            \"label\": \"Technical Knowledge Management\",\n            \"value\": 0,\n            \"pid\": \"2.4.6\"\n          }\n        ]\n      },\n      {\n        \"label\": \"Decommissioning\",\n        \"value\": 0,\n        \"pid\": \"2.5\",\n        \"level3\": [\n          {\n            \"label\": \"Late Life and Decom Planning\",\n            \"value\": 0,\n            \"pid\": \"2.5.1\"\n          },\n          {\n            \"label\": \"Decom Preparation\",\n            \"value\": 0,\n            \"pid\": \"2.5.2\"\n          },\n          {\n            \"label\": \"Removal & Disposal\",\n            \"value\": 0,\n            \"pid\": \"2.5.3\"\n          },\n          {\n            \"label\": \"Continuing Liability\",\n            \"value\": 0,\n            \"pid\": \"2.5.4\"\n          }\n        ]\n      },\n      {\n        \"label\": \"Hydrocarbon & Commercial Management\",\n        \"value\": 0,\n        \"pid\": \"2.6\",\n        \"level3\": [\n          {\n            \"label\": \"Integrated Business Planning\",\n            \"value\": 0,\n            \"pid\": \"2.6.1\"\n          }\n        ]\n      }\n    ]\n  }\n]",
        //         "heat_map_table": "{\"columns\":[\"Enterprise Functions\",\"Upstream Core Operations\",\"Total tickets\"],\"index\":[\"Infrastructure\",\"Performance\",\"Total tickets\"],\"data\":[[1.0,0.0,1.0],[0.0,1.0,1.0],[1.0,1.0,2.0]]}",
        //         "top_10_noisy_apps": {
        //             "Application Lifecycle Management (ALM)": 1,
        //             "Pegasys2000": 1
        //         },
        //         "total_apps": 2,
        //         "total_tickets": 2
        //     },
        //     "status_code": 200
        // };
        //     const data= {"message": "success",
        //     "response": {
        //         "date_range": {
        //             "end": "04-Dec-20",
        //             "start": "01-Dec-20"
        //         },
        //         "drilldowns": "[\n  {\n    \"label\": \"Plan & Manage the Enterprise\",\n    \"value\": 10,\n    \"pid\": \"1\",\n    \"level2\": [\n      {\n        \"label\": \"Enterprise Strategy  & Performance Management\",\n        \"value\": 10,\n        \"pid\": \"1.1\",\n        \"level3\": [\n          {\n            \"label\": \"Enterprise Strategy Management\",\n            \"value\": 0,\n            \"pid\": \"1.1.1\"\n          },\n          {\n            \"label\": \"Enterprise Performance Management\",\n            \"value\": 10,\n            \"pid\": \"1.1.2\"\n          },\n          {\n            \"label\": \"Enterprise EH&S Strategy Management\",\n            \"value\": 0,\n            \"pid\": \"1.1.3\"\n          }\n        ]\n      },\n      {\n        \"label\": \"Portfolio Management\",\n        \"value\": 0,\n        \"pid\": \"1.2\",\n        \"level3\": [\n          {\n            \"label\": \"Portfolio Strategy Management\",\n            \"value\": 0,\n            \"pid\": \"1.2.1\"\n          },\n          {\n            \"label\": \"Portfolio Assessment & Controlling\",\n            \"value\": 0,\n            \"pid\": \"1.2.2\"\n          },\n          {\n            \"label\": \"Opportunity Identification & Management\",\n            \"value\": 0,\n            \"pid\": \"1.2.3\"\n          }\n        ]\n      },\n      {\n        \"label\": \"Enterprise Risk Management\",\n        \"value\": 0,\n        \"pid\": \"1.3\",\n        \"level3\": [\n          {\n            \"label\": \"Financial Risk Management\",\n            \"value\": 0,\n            \"pid\": \"1.3.1\"\n          },\n          {\n            \"label\": \"Non-Financial Risk Management\",\n            \"value\": 0,\n            \"pid\": \"1.3.2\"\n          },\n          {\n            \"label\": \"Insurance Management\",\n            \"value\": 0,\n            \"pid\": \"1.3.3\"\n          },\n          {\n            \"label\": \"EH&S Governance\",\n            \"value\": 0,\n            \"pid\": \"1.3.4\"\n          }\n        ]\n      },\n      {\n        \"label\": \"Stakeholder Relationship Management\",\n        \"value\": 0,\n        \"pid\": \"1.4\",\n        \"level3\": [\n          {\n            \"label\": \"Stakeholder Identification\",\n            \"value\": 0,\n            \"pid\": \"1.4.1\"\n          },\n          {\n            \"label\": \"Stakeholder Interaction\",\n            \"value\": 0,\n            \"pid\": \"1.4.2\"\n          }\n        ]\n      },\n      {\n        \"label\": \"Business & Competitive Intelligence\",\n        \"value\": 0,\n        \"pid\": \"1.5\",\n        \"level3\": [\n          {\n            \"label\": \"Business Intelligence\",\n            \"value\": 0,\n            \"pid\": \"1.5.1\"\n          },\n          {\n            \"label\": \"Competitive Intelligence\",\n            \"value\": 0,\n            \"pid\": \"1.5.2\"\n          }\n        ]\n      }\n    ]\n  },\n  {\n    \"label\": \"Upstream Core Operations\",\n    \"value\": 23,\n    \"pid\": \"2\",\n    \"level2\": [\n      {\n        \"label\": \"Exploration Management\",\n        \"value\": 6,\n        \"pid\": \"2.1\",\n        \"level3\": [\n          {\n            \"label\": \"Basin Evaluation\",\n            \"value\": 0,\n            \"pid\": \"2.1.1\"\n          },\n          {\n            \"label\": \"Seismic Acquisition & Processing\",\n            \"value\": 0,\n            \"pid\": \"2.1.2\"\n          },\n          {\n            \"label\": \"Exploration Data Interpretation\",\n            \"value\": 6,\n            \"pid\": \"2.1.3\"\n          },\n          {\n            \"label\": \"Geological Interpretation\",\n            \"value\": 0,\n            \"pid\": \"2.1.4\"\n          }\n        ]\n      },\n      {\n        \"label\": \"Wells & Field Development\",\n        \"value\": 0,\n        \"pid\": \"2.2\",\n        \"level3\": [\n          {\n            \"label\": \"Well Design\",\n            \"value\": 0,\n            \"pid\": \"2.2.1\"\n          },\n          {\n            \"label\": \"Well Planning & Performance Mgmt\",\n            \"value\": 0,\n            \"pid\": \"2.2.2\"\n          },\n          {\n            \"label\": \"Well Operations\",\n            \"value\": 0,\n            \"pid\": \"2.2.3\"\n          }\n        ]\n      },\n      {\n        \"label\": \"Production Operations\",\n        \"value\": 11,\n        \"pid\": \"2.3\",\n        \"level3\": [\n          {\n            \"label\": \"Production Ops. Activities\",\n            \"value\": 0,\n            \"pid\": \"2.3.1\"\n          },\n          {\n            \"label\": \"Production Ops. Engineering\",\n            \"value\": 1,\n            \"pid\": \"2.3.2\"\n          },\n          {\n            \"label\": \"Production Ops. Management\",\n            \"value\": 3,\n            \"pid\": \"2.3.3\"\n          },\n          {\n            \"label\": \"Reservoir Engineering\",\n            \"value\": 1,\n            \"pid\": \"2.3.4\"\n          },\n          {\n            \"label\": \"Integrated Gas Operations\",\n            \"value\": 6,\n            \"pid\": \"2.3.5\"\n          }\n        ]\n      },\n      {\n        \"label\": \"Technology & Engineering\",\n        \"value\": 1,\n        \"pid\": \"2.4\",\n        \"level3\": [\n          {\n            \"label\": \"Research & Development\",\n            \"value\": 0,\n            \"pid\": \"2.4.1\"\n          },\n          {\n            \"label\": \"Engineering Management\",\n            \"value\": 0,\n            \"pid\": \"2.4.2\"\n          },\n          {\n            \"label\": \"Process Engineering\",\n            \"value\": 1,\n            \"pid\": \"2.4.3\"\n          },\n          {\n            \"label\": \"Project Engineering\",\n            \"value\": 0,\n            \"pid\": \"2.4.4\"\n          },\n          {\n            \"label\": \"Process Automation\",\n            \"value\": 0,\n            \"pid\": \"2.4.5\"\n          },\n          {\n            \"label\": \"Technical Knowledge Management\",\n            \"value\": 0,\n            \"pid\": \"2.4.6\"\n          }\n        ]\n      },\n      {\n        \"label\": \"Decommissioning\",\n        \"value\": 0,\n        \"pid\": \"2.5\",\n        \"level3\": [\n          {\n            \"label\": \"Late Life and Decom Planning\",\n            \"value\": 0,\n            \"pid\": \"2.5.1\"\n          },\n          {\n            \"label\": \"Decom Preparation\",\n            \"value\": 0,\n            \"pid\": \"2.5.2\"\n          },\n          {\n            \"label\": \"Removal & Disposal\",\n            \"value\": 0,\n            \"pid\": \"2.5.3\"\n          },\n          {\n            \"label\": \"Continuing Liability\",\n            \"value\": 0,\n            \"pid\": \"2.5.4\"\n          }\n        ]\n      },\n      {\n        \"label\": \"Hydrocarbon & Commercial Management\",\n        \"value\": 2,\n        \"pid\": \"2.6\",\n        \"level3\": [\n          {\n            \"label\": \"Integrated Business Planning\",\n            \"value\": 0,\n            \"pid\": \"2.6.1\"\n          }\n        ]\n      }\n    ]\n  }\n]",
        //         "drilldowns2": [{"pid": "1", "label": "Plan & Manage the Enterprise", "value": 3, "level2": [{"pid": "1.1", "label": "Enterprise Strategy  & Performance Management", "value": 3, "level3": [{"pid": "1.1.1", "label": "Enterprise Strategy Management", "value": 0}, {"pid": "1.1.2", "label": "Enterprise Performance Management", "value": 3}, {"pid": "1.1.3", "label": "Enterprise EH&S Strategy Management", "value": 0}]}, {"pid": "1.2", "label": "Portfolio Management", "value": 0, "level3": [{"pid": "1.2.1", "label": "Portfolio Strategy Management", "value": 0}, {"pid": "1.2.2", "label": "Portfolio Assessment & Controlling", "value": 0}, {"pid": "1.2.3", "label": "Opportunity Identification & Management", "value": 0}]}, {"pid": "1.3", "label": "Enterprise Risk Management", "value": 0, "level3": [{"pid": "1.3.1", "label": "Financial Risk Management", "value": 0}, {"pid": "1.3.2", "label": "Non-Financial Risk Management", "value": 0}, {"pid": "1.3.3", "label": "Insurance Management", "value": 0}, {"pid": "1.3.4", "label": "EH&S Governance", "value": 0}]}, {"pid": "1.4", "label": "Stakeholder Relationship Management", "value": 0, "level3": [{"pid": "1.4.1", "label": "Stakeholder Identification", "value": 0}, {"pid": "1.4.2", "label": "Stakeholder Interaction", "value": 0}]}, {"pid": "1.5", "label": "Business & Competitive Intelligence", "value": 0, "level3": [{"pid": "1.5.1", "label": "Business Intelligence", "value": 0}, {"pid": "1.5.2", "label": "Competitive Intelligence", "value": 0}]}]}, {"pid": "2", "label": "Upstream Core Operations", "value": 2, "level2": [{"pid": "2.1", "label": "Exploration Management", "value": 0, "level3": [{"pid": "2.1.1", "label": "Basin Evaluation", "value": 0}, {"pid": "2.1.2", "label": "Seismic Acquisition & Processing", "value": 0}, {"pid": "2.1.3", "label": "Exploration Data Interpretation", "value": 0}, {"pid": "2.1.4", "label": "Geological Interpretation", "value": 0}]}, {"pid": "2.2", "label": "Wells & Field Development", "value": 0, "level3": [{"pid": "2.2.1", "label": "Well Design", "value": 0}, {"pid": "2.2.2", "label": "Well Planning & Performance Mgmt", "value": 0}, {"pid": "2.2.3", "label": "Well Operations", "value": 0}]}, {"pid": "2.3", "label": "Production Operations", "value": 1, "level3": [{"pid": "2.3.1", "label": "Production Ops. Activities", "value": 0}, {"pid": "2.3.2", "label": "Production Ops. Engineering", "value": 0}, {"pid": "2.3.3", "label": "Production Ops. Management", "value": 1}, {"pid": "2.3.4", "label": "Reservoir Engineering", "value": 0}, {"pid": "2.3.5", "label": "Integrated Gas Operations", "value": 0}]}, {"pid": "2.4", "label": "Technology & Engineering", "value": 0, "level3": [{"pid": "2.4.1", "label": "Research & Development", "value": 0}, {"pid": "2.4.2", "label": "Engineering Management", "value": 0}, {"pid": "2.4.3", "label": "Process Engineering", "value": 0}, {"pid": "2.4.4", "label": "Project Engineering", "value": 0}, {"pid": "2.4.5", "label": "Process Automation", "value": 0}, {"pid": "2.4.6", "label": "Technical Knowledge Management", "value": 0}]}, {"pid": "2.5", "label": "Decommissioning", "value": 0, "level3": [{"pid": "2.5.1", "label": "Late Life and Decom Planning", "value": 0}, {"pid": "2.5.2", "label": "Decom Preparation", "value": 0}, {"pid": "2.5.3", "label": "Removal & Disposal", "value": 0}, {"pid": "2.5.4", "label": "Continuing Liability", "value": 0}]}, {"pid": "2.6", "label": "Hydrocarbon & Commercial Management", "value": 0, "level3": [{"pid": "2.6.1", "label": "Integrated Business Planning", "value": 0}, {"pid": "2.6.2", "label": "Production Forecasting & Planning", "value": 0}, {"pid": "2.6.3", "label": "Production Accounting", "value": 0}, {"pid": "2.6.4", "label": "Ownership", "value": 0}, {"pid": "2.6.5", "label": "Revenue Accounting Management", "value": 0}]}, {"pid": "2.7", "label": "Asset & Integrity Management", "value": 1, "level3": [{"pid": "2.7.1", "label": "Maintenance Strategy Definition", "value": 0}, {"pid": "2.7.2", "label": "Maintenance Sourcing and Contractor Management", "value": 0}, {"pid": "2.7.3", "label": "Equipment Strategy Development", "value": 0}, {"pid": "2.7.4", "label": "Maintenance Planning & Scheduling", "value": 0}, {"pid": "2.7.5", "label": "Maintenance Execution", "value": 0}, {"pid": "2.7.6", "label": "Work & Asset Performance Monitoring", "value": 1}, {"pid": "2.7.7", "label": "Turnaround & Shutdown Management", "value": 0}]}, {"pid": "2.8", "label": "Health, Safety, Security and Environment (HSSE)", "value": 0, "level3": [{"pid": "2.8.1", "label": "HSSE Compliance Management", "value": 0}, {"pid": "2.8.2", "label": "Industrial Health and Occupational Safety Management", "value": 0}, {"pid": "2.8.3", "label": "Process Safety Management", "value": 0}, {"pid": "2.8.4", "label": "Personnel Safety Management", "value": 0}, {"pid": "2.8.5", "label": "Product Stewardship Management", "value": 0}, {"pid": "2.8.6", "label": "Environmental Management", "value": 0}, {"pid": "2.8.7", "label": "HSSE Risk Management", "value": 0}, {"pid": "2.8.8", "label": "HSSE Strategy and Planning", "value": 0}, {"pid": "2.8.9", "label": "Security Management", "value": 0}]}]}, {"pid": "4", "label": "Commercial Management", "value": 0, "level2": [{"pid": "4.1", "label": "Trading and Contract Management", "value": 0, "level3": [{"pid": "4.1.1", "label": "Market Analysis", "value": 0}, {"pid": "4.1.2", "label": "Trade Capture & Execution", "value": 0}, {"pid": "4.1.3", "label": "Position Management", "value": 0}, {"pid": "4.1.4", "label": "Portfolio Management", "value": 0}, {"pid": "4.1.5", "label": "Contract & Customer Management", "value": 0}]}, {"pid": "4.2", "label": "Commodity Risk Management", "value": 0, "level3": [{"pid": "4.2.1", "label": "Business Control", "value": 0}, {"pid": "4.2.2", "label": "Delegation of Authority", "value": 0}, {"pid": "4.2.3", "label": "Market Risk Management", "value": 0}, {"pid": "4.2.4", "label": "Credit Risk Management", "value": 0}, {"pid": "4.2.5", "label": "Regulatory Reporting", "value": 0}]}, {"pid": "4.3", "label": "Scheduling and Logistics Contract Management \u2013 Pipelines", "value": 0, "level3": [{"pid": "4.3.1", "label": "Schedule & Confirm nomination", "value": 0}, {"pid": "4.3.2", "label": "Transport Agreement Management", "value": 0}, {"pid": "4.3.3", "label": "Imbalance Management", "value": 0}, {"pid": "4.3.4", "label": "Secondary Cost / Rates & Fees", "value": 0}, {"pid": "4.3.5", "label": "Pipeline Position Management", "value": 0}]}, {"pid": "4.4", "label": "Scheduling and Logistics Contract Management \u2013 Bulk Movement", "value": 0, "level3": [{"pid": "4.4.1", "label": "Schedule & Confirm nomination", "value": 0}, {"pid": "4.4.2", "label": "Transport Agreement Management", "value": 0}, {"pid": "4.4.3", "label": "Freight Management", "value": 0}, {"pid": "4.4.4", "label": "Claim Management/ Demurrage", "value": 0}]}, {"pid": "4.5", "label": "Settlement & Accounting", "value": 0, "level3": [{"pid": "4.5.1", "label": "Settlement", "value": 0}, {"pid": "4.5.2", "label": "Accounting", "value": 0}, {"pid": "4.5.3", "label": "Confirmation", "value": 0}]}]}, {"pid": "5", "label": "Hydrocarbon Supply Chain Management", "value": 0, "level2": [{"pid": "5.1", "label": "Storage Operations Management", "value": 0, "level3": [{"pid": "5.1.1", "label": "Planning & Scheduling", "value": 0}, {"pid": "5.1.2", "label": "Storage/ Transportion", "value": 0}]}, {"pid": "5.2", "label": "Loading Operations Management", "value": 0, "level3": [{"pid": "5.2.1", "label": "Custody transfer", "value": 0}, {"pid": "5.2.2", "label": "Measurement & Quality Management", "value": 0}]}]}, {"pid": "8", "label": "Non-Hydrocarbon Supply Chain Management", "value": 0, "level2": [{"pid": "8.1", "label": "Supply Chain Strategy", "value": 0, "level3": [{"pid": "8.1.1", "label": "Strategy Development & Deployment", "value": 0}, {"pid": "8.1.2", "label": "Monitoring & Improvement of End to End Execution", "value": 0}]}, {"pid": "8.2", "label": "Requirements Planning", "value": 0, "level3": [{"pid": "8.2.1", "label": "Planning Master Data Management", "value": 0}, {"pid": "8.2.2", "label": "Capital Project Requirements Planning", "value": 0}, {"pid": "8.2.3", "label": "MRO / Spare Parts Requirements Planning", "value": 0}, {"pid": "8.2.4", "label": "Inventory & Transportation Planning", "value": 0}, {"pid": "8.2.5", "label": "Integrate Demand & Supply Plans", "value": 0}, {"pid": "8.2.6", "label": "Repairs & Disposition Planning", "value": 0}]}, {"pid": "8.3", "label": "Sourcing & Procurement", "value": 0, "level3": [{"pid": "8.3.1", "label": "Develop & Maintain Procurement Strategy", "value": 0}, {"pid": "8.3.2", "label": "Source & Manage Categories", "value": 0}, {"pid": "8.3.3", "label": "Capital Project Sourcing", "value": 0}, {"pid": "8.3.4", "label": "Manage Supplier Contracts", "value": 0}, {"pid": "8.3.5", "label": "Manage Supplier Relationships", "value": 0}, {"pid": "8.3.6", "label": "Manage Procurement Master Data", "value": 0}]}, {"pid": "8.4", "label": "Warehousing & logistics", "value": 0, "level3": [{"pid": "8.4.1", "label": "Fulfillment Strategy", "value": 0}, {"pid": "8.4.2", "label": "Inventory Management", "value": 0}, {"pid": "8.4.3", "label": "Transportation Management", "value": 0}, {"pid": "8.4.4", "label": "Warehousing & Distribution Operations Management", "value": 0}, {"pid": "8.4.5", "label": "Network Optimization", "value": 0}]}, {"pid": "8.5", "label": "Requisition to Pay", "value": 0, "level3": [{"pid": "8.5.1", "label": "Requisition Creation", "value": 0}, {"pid": "8.5.2", "label": "Tactical Sourcing", "value": 0}, {"pid": "8.5.3", "label": "Order Execution", "value": 0}, {"pid": "8.5.4", "label": "Receipt Processing", "value": 0}, {"pid": "8.5.5", "label": "Procurement Card Processing", "value": 0}, {"pid": "8.5.6", "label": "Invoice Processing", "value": 0}]}, {"pid": "8.6", "label": "Contractor Management", "value": 0, "level3": [{"pid": "8.6.1", "label": "Contractor Sourcing & Procurement Management", "value": 0}, {"pid": "8.6.2", "label": "Pre-Onboard Management", "value": 0}, {"pid": "8.6.3", "label": "Onboard Contractor Management", "value": 0}, {"pid": "8.6.4", "label": "Contractor Travel & Accomodation Management", "value": 0}, {"pid": "8.6.5", "label": "Work and Performance Management", "value": 0}, {"pid": "8.6.6", "label": "Demobilization & Contract Closeout", "value": 0}]}]}, {"pid": "16", "label": "Enterprise Functions", "value": 0, "level2": [{"pid": "16.1", "label": "Business Process Lifecycle Management", "value": 0, "level3": [{"pid": "16.1.1", "label": "Process Strategy Management", "value": 0}, {"pid": "16.1.2", "label": "Process Lifecycle Management", "value": 0}, {"pid": "16.1.3", "label": "Process IT Management", "value": 0}, {"pid": "16.1.4", "label": "Process Change Management", "value": 0}, {"pid": "16.1.5", "label": "BPM Delivery", "value": 0}, {"pid": "16.1.6", "label": "BPM Methods and Tools", "value": 0}, {"pid": "16.1.7", "label": "BPM Operations", "value": 0}, {"pid": "16.1.8", "label": "BPM Support", "value": 0}, {"pid": "16.1.9", "label": "BPM Transformation", "value": 0}]}, {"pid": "16.2", "label": "Information Technology", "value": 0, "level3": [{"pid": "16.2.1", "label": "Service Strategy", "value": 0}, {"pid": "16.2.2", "label": "Service Development", "value": 0}, {"pid": "16.2.3", "label": "Service Management & Operations", "value": 0}, {"pid": "16.2.4", "label": "IT Management", "value": 0}, {"pid": "16.2.5", "label": "Business/Customer Relationship Management", "value": 0}, {"pid": "16.2.6", "label": "Service Transition", "value": 0}, {"pid": "16.2.7", "label": "Supplier Relationship Management", "value": 0}]}, {"pid": "16.3", "label": "Cybersecurity", "value": 0, "level3": [{"pid": "16.3.1", "label": "Security Governance", "value": 0}, {"pid": "16.3.2", "label": "Security Architecture", "value": 0}, {"pid": "16.3.3", "label": "Security Operations", "value": 0}]}, {"pid": "16.4", "label": "Human Resources & Knowledge Management", "value": 0, "level3": [{"pid": "16.4.1", "label": "Organization Management", "value": 0}, {"pid": "16.4.2", "label": "Talent Management", "value": 0}, {"pid": "16.4.3", "label": "HR Service & Administration", "value": 0}, {"pid": "16.4.4", "label": "HR Operations & Support", "value": 0}]}, {"pid": "16.5", "label": "Finance & Accounts", "value": 0, "level3": [{"pid": "16.5.1", "label": "General Accounting & Reporting (Record to Report)", "value": 0}, {"pid": "16.5.2", "label": "Fixed Asset Accounting", "value": 0}, {"pid": "16.5.3", "label": "Purchase to Pay", "value": 0}, {"pid": "16.5.4", "label": "Travel & Expenses Reimbursements (T&E)", "value": 0}, {"pid": "16.5.5", "label": "Order to Cash", "value": 0}, {"pid": "16.5.6", "label": "Product Costing & Inventory Accounting", "value": 0}, {"pid": "16.5.7", "label": "Payroll (See HP Model)", "value": 0}, {"pid": "16.5.8", "label": "Maintain Finance System & Data Structures", "value": 0}]}, {"pid": "16.6", "label": "Data & Information Management", "value": 0, "level3": [{"pid": "16.6.1", "label": "Data Governance Management", "value": 0}, {"pid": "16.6.2", "label": "Data Structure Management", "value": 0}, {"pid": "16.6.3", "label": "Data Architecture Management", "value": 0}, {"pid": "16.6.4", "label": "Master Data & Meta Data Management", "value": 0}, {"pid": "16.6.5", "label": "Data Quality Management", "value": 0}, {"pid": "16.6.6", "label": "Data Security Management", "value": 0}]}, {"pid": "16.7", "label": "Physical Infrastructure Management", "value": 0, "level3": [{"pid": "16.7.1", "label": "Physical Infrastructure Strategy Management", "value": 0}, {"pid": "16.7.2", "label": "Physical Infrastructure Operations", "value": 0}]}, {"pid": "16.8", "label": "Compliance Management & Support", "value": 0, "level3": [{"pid": "16.8.1", "label": "Legal Services & Administration", "value": 0}, {"pid": "16.8.2", "label": "Legal Operations & Support", "value": 0}, {"pid": "16.8.3", "label": "EH&S Support Services", "value": 0}]}]}, {"pid": "0", "label": "Others", "value": 0}],
        //         "heat_map_table": "{\"columns\":[\"Commercial Management\",\"Enterprise Functions\",\"Hydrocarbon Supply Chain Management\",\"Non-Hydrocarbon Supply Chain Management\",\"Others\",\"Plan & Manage the Enterprise\",\"Upstream Core Operations\",\"Total tickets\"],\"index\":[\"Access\",\"Content\",\"Data\",\"Documentation\",\"Infrastructure\",\"Performance\",\"UI\",\"Workflow\",\"ent\\n\\nWorkflow\",\"Total tickets\"],\"data\":[[0.0,1.0,1.0,0.0,1.0,2.0,11.0,16.0],[0.0,0.0,1.0,0.0,0.0,0.0,0.0,1.0],[0.0,1.0,1.0,0.0,0.0,2.0,2.0,6.0],[0.0,0.0,1.0,0.0,0.0,0.0,0.0,1.0],[1.0,1.0,1.0,1.0,1.0,3.0,5.0,13.0],[0.0,1.0,0.0,0.0,0.0,0.0,1.0,2.0],[0.0,0.0,0.0,0.0,0.0,0.0,1.0,1.0],[1.0,1.0,1.0,0.0,0.0,3.0,3.0,9.0],[1.0,0.0,0.0,0.0,0.0,0.0,0.0,1.0],[3.0,5.0,6.0,1.0,2.0,10.0,23.0,50.0]]}",
        //         "top_10_noisy_apps": {
        //             "Appian - EWR-PARF (Engineering Work Request-Project Activity Request Form)": 1,
        //             "Appian - RTD (Request to Drill)": 2,
        //             "CRT (Controlled Revision Tracking)": 2,
        //             "Geographix": 2,
        //             "HDMS - OpenText": 4,
        //             "Management System Documents Portal (MSDP)": 4,
        //             "PARCView": 2,
        //             "SAP SuccessFactors HR Suite": 9,
        //             "Spotfire": 6,
        //             "ZetaWare Trinity": 1
        //         },
        //         "total_apps": 27,
        //         "total_tickets": 50
        //     },
        //     "status_code": 200
        // };


        const data = {
          "message": "success",
          "response": {
            "date_range":
            {
              "end": "31-Oct-21",
              "start": "01-Apr-21"
            },
            "drilldowns": [
              { "label": "Plan & Manage the Enterprise", "level2": [{ "label": "Enterprise Strategy  & Performance Management", "level3": [{ "label": "Enterprise Strategy Management", "pid": "1.1.1", "value": 0 }, { "label": "Enterprise Performance Management", "pid": "1.1.2", "value": 15 }, { "label": "Enterprise EH&S Strategy Management", "pid": "1.1.3", "value": 0 }], "pid": "1.1", "value": 15 }, { "label": "Portfolio Management", "level3": [{ "label": "Portfolio Strategy Management", "pid": "1.2.1", "value": 0 }, { "label": "Portfolio Assessment & Controlling", "pid": "1.2.2", "value": 0 }, { "label": "Opportunity Identification & Management", "pid": "1.2.3", "value": 0 }], "pid": "1.2", "value": 0 }, { "label": "Enterprise Risk Management", "level3": [{ "label": "Financial Risk Management", "pid": "1.3.1", "value": 0 }, { "label": "Non-Financial Risk Management", "pid": "1.3.2", "value": 0 }, { "label": "Insurance Management", "pid": "1.3.3", "value": 0 }, { "label": "EH&S Governance", "pid": "1.3.4", "value": 0 }], "pid": "1.3", "value": 0 }, { "label": "Stakeholder Relationship Management", "level3": [{ "label": "Stakeholder Identification", "pid": "1.4.1", "value": 0 }, { "label": "Stakeholder Interaction", "pid": "1.4.2", "value": 0 }], "pid": "1.4", "value": 0 }, { "label": "Business & Competitive Intelligence", "level3": [{ "label": "Business Intelligence", "pid": "1.5.1", "value": 50 }, { "label": "Competitive Intelligence", "pid": "1.5.2", "value": 0 }], "pid": "1.5", "value": 50 }], "pid": "1", "value": 65 }, { "label": "Upstream Core Operations", "level2": [{ "label": "Exploration Management", "level3": [{ "label": "Basin Evaluation", "pid": "2.1.1", "value": 0 }, { "label": "Seismic Acquisition & Processing", "pid": "2.1.2", "value": 0 }, { "label": "Exploration Data Interpretation", "pid": "2.1.3", "value": 0 }, { "label": "Geological Interpretation", "pid": "2.1.4", "value": 0 }], "pid": "2.1", "value": 0 }, { "label": "Wells & Field Development", "level3": [{ "label": "Well Design", "pid": "2.2.1", "value": 0 }, { "label": "Well Planning & Performance Mgmt", "pid": "2.2.2", "value": 0 }, { "label": "Well Operations", "pid": "2.2.3", "value": 0 }], "pid": "2.2", "value": 0 }, { "label": "Production Operations", "level3": [{ "label": "Production Ops. Activities", "pid": "2.3.1", "value": 0 }, { "label": "Production Ops. Engineering", "pid": "2.3.2", "value": 0 }, { "label": "Production Ops. Management", "pid": "2.3.3", "value": 261 }, { "label": "Reservoir Engineering", "pid": "2.3.4", "value": 0 }, { "label": "Integrated Gas Operations", "pid": "2.3.5", "value": 0 }], "pid": "2.3", "value": 261 }, { "label": "Technology & Engineering", "level3": [{ "label": "Research & Development", "pid": "2.4.1", "value": 0 }, { "label": "Engineering Management", "pid": "2.4.2", "value": 0 }, { "label": "Process Engineering", "pid": "2.4.3", "value": 56 }, { "label": "Project Engineering", "pid": "2.4.4", "value": 0 }, { "label": "Process Automation", "pid": "2.4.5", "value": 0 }, { "label": "Technical Knowledge Management", "pid": "2.4.6", "value": 0 }], "pid": "2.4", "value": 56 }, { "label": "Decommissioning", "level3": [{ "label": "Late Life and Decom Planning", "pid": "2.5.1", "value": 0 }, { "label": "Decom Preparation", "pid": "2.5.2", "value": 0 }, { "label": "Removal & Disposal", "pid": "2.5.3", "value": 0 }, { "label": "Continuing Liability", "pid": "2.5.4", "value": 0 }], "pid": "2.5", "value": 0 }, { "label": "Hydrocarbon & Commercial Management", "level3": [{ "label": "Integrated Business Planning", "pid": "2.6.1", "value": 0 }, { "label": "Production Forecasting & Planning", "pid": "2.6.2", "value": 47 }, { "label": "Production Accounting", "pid": "2.6.3", "value": 3 }, { "label": "Ownership", "pid": "2.6.4", "value": 0 }, { "label": "Revenue Accounting Management", "pid": "2.6.5", "value": 0 }], "pid": "2.6", "value": 50 }, { "label": "Asset & Integrity Management", "level3": [{ "label": "Maintenance Strategy Definition", "pid": "2.7.1", "value": 0 }, { "label": "Maintenance Sourcing and Contractor Management", "pid": "2.7.2", "value": 76 }, { "label": "Equipment Strategy Development", "pid": "2.7.3", "value": 0 }, { "label": "Maintenance Planning & Scheduling", "pid": "2.7.4", "value": 0 }, { "label": "Maintenance Execution", "pid": "2.7.5", "value": 0 }, { "label": "Work & Asset Performance Monitoring", "pid": "2.7.6", "value": 0 }, { "label": "Turnaround & Shutdown Management", "pid": "2.7.7", "value": 0 }], "pid": "2.7", "value": 76 }, { "label": "Health, Safety, Security and Environment (HSSE)", "level3": [{ "label": "HSSE Compliance Management", "pid": "2.8.1", "value": 0 }, { "label": "Industrial Health and Occupational Safety Management", "pid": "2.8.2", "value": 0 }, { "label": "Process Safety Management", "pid": "2.8.3", "value": 0 }, { "label": "Personnel Safety Management", "pid": "2.8.4", "value": 0 }, { "label": "Product Stewardship Management", "pid": "2.8.5", "value": 0 }, { "label": "Environmental Management", "pid": "2.8.6", "value": 0 }, { "label": "HSSE Risk Management", "pid": "2.8.7", "value": 0 }, { "label": "HSSE Strategy and Planning", "pid": "2.8.8", "value": 0 }, { "label": "Security Management", "pid": "2.8.9", "value": 0 }], "pid": "2.8", "value": 0 }], "pid": "2", "value": 443 }, { "label": "Commercial Management", "level2": [{ "label": "Trading and Contract Management", "level3": [{ "label": "Market Analysis", "pid": "4.1.1", "value": 0 }, { "label": "Trade Capture & Execution", "pid": "4.1.2", "value": 0 }, { "label": "Position Management", "pid": "4.1.3", "value": 0 }, { "label": "Portfolio Management", "pid": "4.1.4", "value": 0 }, { "label": "Contract & Customer Management", "pid": "4.1.5", "value": 0 }], "pid": "4.1", "value": 0 }, { "label": "Commodity Risk Management", "level3": [{ "label": "Business Control", "pid": "4.2.1", "value": 0 }, { "label": "Delegation of Authority", "pid": "4.2.2", "value": 0 }, { "label": "Market Risk Management", "pid": "4.2.3", "value": 0 }, { "label": "Credit Risk Management", "pid": "4.2.4", "value": 0 }, { "label": "Regulatory Reporting", "pid": "4.2.5", "value": 0 }], "pid": "4.2", "value": 0 }, { "label": "Scheduling and Logistics Contract Management \u2013 Pipelines", "level3": [{ "label": "Schedule & Confirm nomination", "pid": "4.3.1", "value": 0 }, { "label": "Transport Agreement Management", "pid": "4.3.2", "value": 0 }, { "label": "Imbalance Management", "pid": "4.3.3", "value": 0 }, { "label": "Secondary Cost / Rates & Fees", "pid": "4.3.4", "value": 0 }, { "label": "Pipeline Position Management", "pid": "4.3.5", "value": 0 }], "pid": "4.3", "value": 0 }, { "label": "Scheduling and Logistics Contract Management \u2013 Bulk Movement", "level3": [{ "label": "Schedule & Confirm nomination", "pid": "4.4.1", "value": 0 }, { "label": "Transport Agreement Management", "pid": "4.4.2", "value": 0 }, { "label": "Freight Management", "pid": "4.4.3", "value": 0 }, { "label": "Claim Management/ Demurrage", "pid": "4.4.4", "value": 0 }], "pid": "4.4", "value": 0 }, { "label": "Settlement & Accounting", "level3": [{ "label": "Settlement", "pid": "4.5.1", "value": 0 }, { "label": "Accounting", "pid": "4.5.2", "value": 0 }, { "label": "Confirmation", "pid": "4.5.3", "value": 0 }], "pid": "4.5", "value": 0 }], "pid": "4", "value": 0 }, { "label": "Hydrocarbon Supply Chain Management", "level2": [{ "label": "Storage Operations Management", "level3": [{ "label": "Planning & Scheduling", "pid": "5.1.1", "value": 0 }, { "label": "Storage/ Transportion", "pid": "5.1.2", "value": 0 }], "pid": "5.1", "value": 0 }, { "label": "Loading Operations Management", "level3": [{ "label": "Custody transfer", "pid": "5.2.1", "value": 0 }, { "label": "Measurement & Quality Management", "pid": "5.2.2", "value": 17 }], "pid": "5.2", "value": 17 }], "pid": "5", "value": 17 }, { "label": "Non-Hydrocarbon Supply Chain Management", "level2": [{ "label": "Supply Chain Strategy", "level3": [{ "label": "Strategy Development & Deployment", "pid": "8.1.1", "value": 0 }, { "label": "Monitoring & Improvement of End to End Execution", "pid": "8.1.2", "value": 0 }], "pid": "8.1", "value": 0 }, { "label": "Requirements Planning", "level3": [{ "label": "Planning Master Data Management", "pid": "8.2.1", "value": 0 }, { "label": "Capital Project Requirements Planning", "pid": "8.2.2", "value": 0 }, { "label": "MRO / Spare Parts Requirements Planning", "pid": "8.2.3", "value": 0 }, { "label": "Inventory & Transportation Planning", "pid": "8.2.4", "value": 0 }, { "label": "Integrate Demand & Supply Plans", "pid": "8.2.5", "value": 0 }, { "label": "Repairs & Disposition Planning", "pid": "8.2.6", "value": 0 }], "pid": "8.2", "value": 0 }, { "label": "Sourcing & Procurement", "level3": [{ "label": "Develop & Maintain Procurement Strategy", "pid": "8.3.1", "value": 0 }, { "label": "Source & Manage Categories", "pid": "8.3.2", "value": 0 }, { "label": "Capital Project Sourcing", "pid": "8.3.3", "value": 0 }, { "label": "Manage Supplier Contracts", "pid": "8.3.4", "value": 0 }, { "label": "Manage Supplier Relationships", "pid": "8.3.5", "value": 0 }, { "label": "Manage Procurement Master Data", "pid": "8.3.6", "value": 0 }], "pid": "8.3", "value": 0 }, { "label": "Warehousing & logistics", "level3": [{ "label": "Fulfillment Strategy", "pid": "8.4.1", "value": 0 }, { "label": "Inventory Management", "pid": "8.4.2", "value": 0 }, { "label": "Transportation Management", "pid": "8.4.3", "value": 0 }, { "label": "Warehousing & Distribution Operations Management", "pid": "8.4.4", "value": 0 }, { "label": "Network Optimization", "pid": "8.4.5", "value": 0 }], "pid": "8.4", "value": 0 }, { "label": "Requisition to Pay", "level3": [{ "label": "Requisition Creation", "pid": "8.5.1", "value": 0 }, { "label": "Tactical Sourcing", "pid": "8.5.2", "value": 0 }, { "label": "Order Execution", "pid": "8.5.3", "value": 0 }, { "label": "Receipt Processing", "pid": "8.5.4", "value": 0 }, { "label": "Procurement Card Processing", "pid": "8.5.5", "value": 0 }, { "label": "Invoice Processing", "pid": "8.5.6", "value": 19 }], "pid": "8.5", "value": 19 }, { "label": "Contractor Management", "level3": [{ "label": "Contractor Sourcing & Procurement Management", "pid": "8.6.1", "value": 0 }, { "label": "Pre-Onboard Management", "pid": "8.6.2", "value": 0 }, { "label": "Onboard Contractor Management", "pid": "8.6.3", "value": 0 }, { "label": "Contractor Travel & Accomodation Management", "pid": "8.6.4", "value": 0 }, { "label": "Work and Performance Management", "pid": "8.6.5", "value": 0 }, { "label": "Demobilization & Contract Closeout", "pid": "8.6.6", "value": 0 }], "pid": "8.6", "value": 0 }], "pid": "8", "value": 19 }, { "label": "Enterprise Functions", "level2": [{ "label": "Business Process Lifecycle Management", "level3": [{ "label": "Process Strategy Management", "pid": "16.1.1", "value": 0 }, { "label": "Process Lifecycle Management", "pid": "16.1.2", "value": 0 }, { "label": "Process IT Management", "pid": "16.1.3", "value": 0 }, { "label": "Process Change Management", "pid": "16.1.4", "value": 0 }, { "label": "BPM Delivery", "pid": "16.1.5", "value": 0 }, { "label": "BPM Methods and Tools", "pid": "16.1.6", "value": 0 }, { "label": "BPM Operations", "pid": "16.1.7", "value": 0 }, { "label": "BPM Support", "pid": "16.1.8", "value": 0 }, { "label": "BPM Transformation", "pid": "16.1.9", "value": 0 }], "pid": "16.1", "value": 0 }, { "label": "Information Technology", "level3": [{ "label": "Service Strategy", "pid": "16.2.1", "value": 0 }, { "label": "Service Development", "pid": "16.2.2", "value": 0 }, { "label": "Service Management & Operations", "pid": "16.2.3", "value": 0 }, { "label": "IT Management", "pid": "16.2.4", "value": 0 }, { "label": "Business/Customer Relationship Management", "pid": "16.2.5", "value": 0 }, { "label": "Service Transition", "pid": "16.2.6", "value": 0 }, { "label": "Supplier Relationship Management", "pid": "16.2.7", "value": 0 }], "pid": "16.2", "value": 0 }, { "label": "Cybersecurity", "level3": [{ "label": "Security Governance", "pid": "16.3.1", "value": 0 }, { "label": "Security Architecture", "pid": "16.3.2", "value": 0 }, { "label": "Security Operations", "pid": "16.3.3", "value": 0 }], "pid": "16.3", "value": 0 }, { "label": "Human Resources & Knowledge Management", "level3": [{ "label": "Organization Management", "pid": "16.4.1", "value": 0 }, { "label": "Talent Management", "pid": "16.4.2", "value": 0 }, { "label": "HR Service & Administration", "pid": "16.4.3", "value": 0 }, { "label": "HR Operations & Support", "pid": "16.4.4", "value": 0 }], "pid": "16.4", "value": 0 }, { "label": "Finance & Accounts", "level3": [{ "label": "General Accounting & Reporting (Record to Report)", "pid": "16.5.1", "value": 0 }, { "label": "Fixed Asset Accounting", "pid": "16.5.2", "value": 0 }, { "label": "Purchase to Pay", "pid": "16.5.3", "value": 0 }, { "label": "Travel & Expenses Reimbursements (T&E)", "pid": "16.5.4", "value": 0 }, { "label": "Order to Cash", "pid": "16.5.5", "value": 0 }, { "label": "Product Costing & Inventory Accounting", "pid": "16.5.6", "value": 0 }, { "label": "Payroll (See HP Model)", "pid": "16.5.7", "value": 0 }, { "label": "Maintain Finance System & Data Structures", "pid": "16.5.8", "value": 0 }], "pid": "16.5", "value": 0 }, { "label": "Data & Information Management", "level3": [{ "label": "Data Governance Management", "pid": "16.6.1", "value": 0 }, { "label": "Data Structure Management", "pid": "16.6.2", "value": 0 }, { "label": "Data Architecture Management", "pid": "16.6.3", "value": 0 }, { "label": "Master Data & Meta Data Management", "pid": "16.6.4", "value": 0 }, { "label": "Data Quality Management", "pid": "16.6.5", "value": 0 }, { "label": "Data Security Management", "pid": "16.6.6", "value": 0 }], "pid": "16.6", "value": 0 }, { "label": "Physical Infrastructure Management", "level3": [{ "label": "Physical Infrastructure Strategy Management", "pid": "16.7.1", "value": 0 }, { "label": "Physical Infrastructure Operations", "pid": "16.7.2", "value": 0 }], "pid": "16.7", "value": 0 }, { "label": "Compliance Management & Support", "level3": [{ "label": "Legal Services & Administration", "pid": "16.8.1", "value": 0 }, { "label": "Legal Operations & Support", "pid": "16.8.2", "value": 0 }, { "label": "EH&S Support Services", "pid": "16.8.3", "value": 0 }], "pid": "16.8", "value": 0 }], "pid": "16", "value": 0 }, { "label": "Others", "pid": 0, "value": 0 }
            ],
            "heat_map_table": "{\"columns\":[\"Hydrocarbon Supply Chain Management\",\"Non-Hydrocarbon Supply Chain Management\",\"Plan & Manage the Enterprise\",\"Upstream Core Operations\",\"Total tickets\"],\"index\":[\"Access\",\"Configuration\",\"Connectivity\",\"Data\",\"Documentation\",\"Functionality\",\"Infrastructure\",\"Installation\",\"Integration\",\"others\",\"Performance\",\"Reporting\",\"UI\",\"Workflow\",\"Total tickets\"],\"data\":[[4.0,10.0,43.0,156.0,213.0],[0.0,0.0,0.0,1.0,1.0],[0.0,0.0,0.0,1.0,1.0],[0.0,0.0,3.0,37.0,40.0],[0.0,0.0,0.0,1.0,1.0],[0.0,1.0,0.0,2.0,3.0],[4.0,6.0,17.0,157.0,184.0],[0.0,0.0,0.0,6.0,6.0],[0.0,0.0,0.0,1.0,1.0],[0.0,0.0,0.0,2.0,2.0],[8.0,0.0,0.0,40.0,48.0],[0.0,0.0,0.0,1.0,1.0],[1.0,1.0,0.0,3.0,5.0],[0.0,1.0,2.0,35.0,38.0],[17.0,19.0,65.0,443.0,544.0]]}",
            "top_10_noisy_apps":
            {
              "Adobe Sign": 19,
              "Appian - EWR-PARF (Engineering Work Request-Project Activity Request Form)": 56,
              "DigitCore": 4,
              "Enterprise Connect": 15,
              "HANA": 49,
              "PARCView": 257,
              "PCARD": 3,
              "Petrel": 17,
              "Power BI": 48,
              "Primavera P6": 76
            },
            "total_apps": 10,
            "total_tickets": 544
          },
          "status_code": 200
        };
        // const data = await response.json();
        setJsonResponse(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchData2 = async () => {
      try {
        //   const response2 = await axios.post('https://industrygenai.accenture.com/bplam/second_screen',  {

        //   });
        //   console.log('API response:', response2);
        //    const data2={
        //     "message": "success",
        //     "response": {
        //         "impact_df": "{\"columns\":[\"BPL1\",\"BPL2\",\"BPL3\",\"Tool\",\"Ticket Count\",\"Key Issues Identified\",\"Business Impact\",\"Recommendations\"],\"index\":[0,1,2,3,4],\"data\":[[\"Hydrocarbon Supply Chain Management\",\"Loading Operations Management\",\"Measurement & Quality Management\",\"Energy Components - Conventional\",1,[\"Infrastructure\"],\"['Productivity Loss']\",\"['Update VDI with latest .NET version to prevent future issues.']\"],[\"Hydrocarbon Supply Chain Management\",\"Loading Operations Management\",\"Measurement & Quality Management\",\"SampleManager\",1,[\"Data\"],\"['Data Inaccuracy', 'Workflow Disruption']\",\"['Investigate the root cause of the issue and fix it to ensure data accuracy', 'Implement a process to ensure timely and accurate uploading of lab reports to LIMS', 'Provide training to users on the importance of timely and accurate data entry']\"],[\"Others\",\"Others\",\"Others\",\"SEDAR\",1,[\"Access\"],\"['User Management', 'Access Control']\",\"['Create individual user IDs for the 3 users', 'Implement proper access control measures']\"],[\"Upstream Core Operations\",\"Production Operations\",\"Integrated Gas Operations\",\"INNfinity\",1,[\"Infrastructure\"],\"['Productivity Loss', 'Installation Delay']\",\"['Provide alternative installation method', 'Improve software center functionality']\"],[\"Upstream Core Operations\",\"Production Operations\",\"Integrated Gas Operations\",\"SharePoint 2013\",1,[\"Infrastructure\"],\"['Productivity Loss']\",\"['Investigate and fix the issue causing the page to not work, and ensure proper testing before deployment.']\"]]}"
        //     },
        //     "status_code": 200
        // };

        const data2 = {
          "message": "success",
          "response": {
            "impact_analysis_df2":
              "{\"columns\":[\"BPL1\",\"BPL2\",\"BPL3\",\"Tool\",\"Ticket Count\",\"Key Issues Identified\",\"Business Impact\",\"Recommendations\"],\"index\":[9,5,10,3,7,1,0,4,8,6,2],\"data\":[[\"Upstream Core Operations\",\"Production Operations\",\"Production Ops. Management\",\"PARCView\",257,\"['Configuration','Installation','Performance','Integration','Infrastructure','Workflow','Data','UI','Access']\",\"['Access Issues', 'Installation Problems', 'Performance Issues', 'Data Collection Issues', 'Security Concerns']\",\"['Review and update user access permissions', 'Ensure proper installation and configuration', 'Optimize system performance', 'Address data collection and storage concerns', 'Implement appropriate security measures']\"],[\"Upstream Core Operations\",\"Asset & Integrity Management\",\"Maintenance Sourcing and Contractor Management\",\"Primavera P6\",76,[\"Performance\",\"Infrastructure\",\"Workflow\",\"Data\",\"Functionality\",\"UI\",\"Access\"],\"['Productivity Loss', 'Workflow Disruption', 'Data Inaccuracy', 'Security Risk']\",\"['Regular maintenance and updates', 'Provide training to users', 'Implement multi-factor authentication', 'Backup data regularly', 'Improve system performance', 'Resolve database connection issues', 'Investigate and fix software bugs', 'Ensure proper user access management', 'Provide technical support for users']\"],[\"Upstream Core Operations\",\"Technology & Engineering\",\"Process Engineering\",\"Appian - EWR-PARF (Engineering Work Request-Project Activity Request Form)\",56,[\"Documentation\",\"Infrastructure\",\"others\",\"Workflow\",\"Data\",\"Functionality\",\"Access\"],\"['Workflow Disruption', 'Productivity Loss', 'Data Inaccuracy', 'Quality Control']\",\"['Provide training on Appian usage', 'Improve Appian user support', 'Implement automated AFE pushing', 'Improve Appian report generation', 'Ensure timely closure of EWR\\/PARF modules', 'Improve Appian error handling and resolution', 'Ensure proper access control in Appian']\"],[\"Plan & Manage the Enterprise\",\"Business & Competitive Intelligence\",\"Business Intelligence\",\"Power BI\",48,[\"Data\",\"Access\",\"Infrastructure\"],\"['Workflow Disruption', 'Installation Issues', 'Data Inaccuracy', 'Access Issues']\",\"['Provide clear instructions for installation', 'Ensure proper access permissions are granted', 'Address data accuracy issues', 'Provide training and support for Power BI usage']\"],[\"Upstream Core Operations\",\"Hydrocarbon & Commercial Management\",\"Production Forecasting & Planning\",\"HANA\",47,[\"Connectivity\",\"Performance\",\"Infrastructure\",\"Reporting\",\"Workflow\",\"Data\",\"Access\"],\"['Workflow Disruption', 'Data Inaccuracy', 'Productivity Loss', 'Report Issues', 'System Downtime', 'Authentication Failure', 'Data Correction Required', 'ODBC Driver Issues', 'Out of Memory Error', 'Replication Delay', 'Table Errors', 'Connection Problems']\",\"['Investigate root cause of HANA Index Server crash and implement preventive measures', 'Resolve authentication issues for Test Domain access to HANA', 'Troubleshoot and fix errors accessing HANA_PRD_32', 'Install HDODBC client and resolve ODBC driver issues', 'Investigate and resolve Costpick errors in Consolidated CAD report', 'Perform data correction in HANA', 'Investigate and resolve internal error in SAP DBTech JDBC', 'Create views in production for HANA', 'Resolve ODBC system error for PowerBI dashboards', 'Remove user from IT email list', 'Investigate and resolve login issues for Spotfire connection to HANA_PRD_64', 'Investigate and resolve HANA downtime and restart issues', 'Resolve ODBC driver issues for HANA', 'Investigate and resolve HANA_PRD system downtime', 'Troubleshoot and fix HANA connection issues', 'Investigate and resolve HANA out of synch issues for Maximo', 'Investigate and resolve PowerBI report issues caused by HANA column data type change', 'Resolve SRS replication issues for EC Oilsands', 'Investigate and resolve data inaccuracy in Costpick data from HANA', 'Investigate and resolve Maxitrak table errors', 'Investigate and resolve network connectivity issues for cgyut56765', 'Provide SQL access to SRC_HANA tables', 'Investigate and resolve HANAPRD.SRC_JDE_CONFIDENTIAL2 connection trigger issue', 'Resolve HANA ODBC driver connectivity issues']\"],[\"Non-Hydrocarbon Supply Chain Management\",\"Requisition to Pay\",\"Invoice Processing\",\"Adobe Sign\",19,[\"Infrastructure\",\"Workflow\",\"Functionality\",\"UI\",\"Access\"],\"['Workflow Disruption', 'Productivity Loss', 'Quality Control', 'Data Inaccuracy']\",\"['Investigate and resolve account deactivation issue', 'Address random Access Documented notices', 'Resolve Adobe Acrobat freezing and signature issues', 'Increase document page limit for Adobe Sign', 'Address PDF issues', 'Investigate and resolve Access Documented screen issue', 'Resolve Adobe Acrobat Pro signature and save as issues', 'Investigate and resolve Adobe Sign access issues', 'Address password prompt for digital signature', 'Investigate and resolve Adobe Sign and Software Center issues', 'Resolve Adobe Acrobat DC Save As issue', 'Provide Adobe Sign training and support', 'Investigate and resolve Adobe crashes and other issues']\"],[\"Hydrocarbon Supply Chain Management\",\"Loading Operations Management\",\"Measurement & Quality Management\",\"Petrel\",17,[\"UI\",\"Infrastructure\",\"Access\",\"Performance\"],\"['Productivity Loss', 'Workflow Disruption', 'Access Issues', 'Data Loss', 'License Management', 'Compatibility Issues', 'Performance Issues', 'Graphical Issues', 'Server Downtime']\",\"['Investigate and resolve freezing and crashing issues', 'Address file location and access issues', 'Ensure proper application access is granted', 'Resolve project saving issues', 'Optimize VDI performance', 'Address login and disconnection issues', 'Investigate and resolve frequent crashing', 'Resolve NVIDIA OpenGL Driver error', 'Ensure proper license management', 'Upgrade server to support Petrel 2019', 'Optimize remote Petrel response', 'Investigate and resolve Petrel 2019 crashing', 'Address slow performance issues', 'Resolve graphical issues', 'Restore Petrel server functionality']\"],[\"Plan & Manage the Enterprise\",\"Enterprise Strategy  & Performance Management\",\"Enterprise Performance Management\",\"Enterprise Connect\",15,[\"Workflow\",\"Access\",\"Infrastructure\"],\"['Productivity Loss', 'Workflow Disruption', 'Installation Error', 'Missing Feature', 'Data Inaccuracy']\",\"['Provide Outlook integration for Enterprise Connect', 'Investigate and resolve drag and drop issues', 'Troubleshoot installation errors', 'Ensure Enterprise Connect is available on all devices', 'Investigate and resolve email copying\\/moving issues', 'Provide training on using Enterprise Connect', 'Investigate and resolve editing issues in Content Server', 'Ensure Enterprise Connect icon is visible in Outlook', 'Investigate and resolve folder copying\\/moving issues', 'Provide support for email copying\\/moving within Enterprise Connect', 'Troubleshoot loading issues in Outlook', 'Investigate and resolve email moving issues into Content Server', 'Troubleshoot Enterprise Connect activation issues', 'Investigate and resolve folder moving issues from Outlook to Content Server']\"],[\"Upstream Core Operations\",\"Production Operations\",\"Production Ops. Management\",\"DigitCore\",4,[\"Access\",\"Infrastructure\"],\"\",\"\"],[\"Upstream Core Operations\",\"Hydrocarbon & Commercial Management\",\"Production Accounting\",\"PCARD\",3,[\"Access\"],\"['Productivity Loss', 'Workflow Disruption']\",\"['Provide immediate assistance to unlock the account and reset the password', 'Implement measures to prevent frequent account lockouts']\"],[\"Plan & Manage the Enterprise\",\"Business & Competitive Intelligence\",\"Business Intelligence\",\"HANA\",2,[\"Workflow\",\"Infrastructure\"],\"['Data Inaccuracy', 'Workflow Delay']\",\"['Investigate missing table and ensure proper replication', 'Optimize time addition process in Wellview HANA']\"]]}",
            "impact_analysis_df": "{\"columns\":[\"BPL1\",\"BPL2\",\"BPL3\",\"Tool\",\"Ticket Count\",\"Key Issues Identified\",\"Business Impact\",\"Recommendations\"],\"index\":[7,9,1,4,10,3,5,8,0,2,6],\"data\":[[\"Upstream Core Operations\",\"Hydrocarbon & Commercial Management\",\"Production Forecasting & Planning\",\"HANA\",11,\"['Access', 'Workflow', 'Data', 'Infrastructure']\",\"['Workflow Disruption', 'Authentication Failure', 'Report Generation Issue', 'Data Inaccuracy', 'System Error', 'Production Delay', 'Data Refresh Issue', 'Communication Breakdown', 'Authentication Failure', 'Report Generation Issue', 'System Error', 'System Downtime']\",\"['Investigate and resolve HANA Index Server crash', 'Investigate and resolve authentication issue', 'Investigate and resolve Costpick error', 'Perform data correction in HANA', 'Investigate and resolve JDBC internal error', 'Create views in production as required', 'Investigate and resolve PowerBI dashboard refresh issue', 'Ensure proper communication channels for IT email list removal', 'Investigate and resolve Spotfire login issue', 'Investigate and resolve Costpick error', 'Investigate and resolve HANA downtime']\"],[\"Upstream Core Operations\",\"Production Operations\",\"Production Ops. Management\",\"PARCView\",10,\"['Access', 'Performance', 'Data', 'Infrastructure']\",\"['User Access Issue', 'Security Breach', 'Process Disruption', 'Site Configuration Error', 'Application Failure', 'Data Trending Issue', 'Application Update Issue', 'Database Connectivity Issue', 'Installation Failure', 'Data Inaccuracy']\",\"['Check user access permissions', 'Investigate and resolve security breach', 'Troubleshoot and fix application issue', 'Check site configuration', 'Resolve application failure', 'Investigate and fix data trending issue', 'Reinstall Parcview application', 'Check database connectivity', 'Reinstall Parcview application', 'Investigate and fix data inaccuracy issue']\"],[\"Non-Hydrocarbon Supply Chain Management\",\"Requisition to Pay\",\"Invoice Processing\",\"Adobe Sign\",8,\"['Access', 'Other']\",\"['Workflow Disruption', 'Productivity Loss', 'Workflow Disruption', 'Workflow Disruption', 'Workflow Disruption', 'Workflow Disruption', 'Workflow Disruption']\",\"['Check and reactivate user accounts', 'Investigate and resolve Access Documented notice', 'Investigate and resolve Access Documented notice', 'Investigate and resolve Adobe Acrobat issues', 'Investigate and resolve Adobe Acrobat signature and save issues', 'Check and reactivate user accounts', 'Investigate and resolve access warnings']\"],[\"Plan & Manage the Enterprise\",\"Enterprise Strategy  & Performance Management\",\"Enterprise Performance Management\",\"Enterprise Connect\",7,\"['Access']\",\"['Productivity Loss', 'Workflow Disruption', 'Data Inaccuracy']\",\"['Provide training on Enterprise Connect usage', 'Ensure Enterprise Connect is installed on all devices', 'Investigate and resolve issues with copying to folders in Enterprise Connect', 'Ensure compatibility of Enterprise Connect with Outlook and Livelink']\"],[\"Upstream Core Operations\",\"Technology & Engineering\",\"Process Engineering\",\"Appian - EWR-PARF (Engineering Work Request-Project Activity Request Form)\",5,\"['Other', 'Access', 'Functionality', 'Workflow', 'Data']\",\"['Workflow Disruption', 'Report Generation Issue', 'Functionality Issue', 'Search Issue', 'Report Generation Issue']\",\"['Investigate and resolve log-in error', 'Provide training on report generation', 'Fix line number and export functionality', 'Investigate and resolve search issue', 'Fix report generation issue for EWR\\/PARF list']\"],[\"Plan & Manage the Enterprise\",\"Business & Competitive Intelligence\",\"Business Intelligence\",\"Power BI\",2,\"['Access']\",\"['Data Inaccuracy', 'Workflow Disruption']\",\"['Check data sources for accuracy', 'Provide clear installation instructions for tablet application']\"],[\"Upstream Core Operations\",\"Asset & Integrity Management\",\"Maintenance Sourcing and Contractor Management\",\"Primavera P6\",2,\"['Access', 'Infrastructure']\",\"['Workflow Disruption', 'Productivity Loss']\",\"['Investigate root cause of P6 downtime and implement measures to prevent future occurrences', 'Ensure timely resolution of access credential issues to minimize impact on project timelines']\"],[\"Upstream Core Operations\",\"Production Operations\",\"Production Ops. Management\",\"DigitCore\",2,\"['Access', 'Infrastructure']\",\"['Workflow Disruption', 'Productivity Loss']\",\"['Investigate and resolve the issue with GeoLogic (CoreSearch) not showing up in Software Center', 'Ensure proper communication and training for users on the new version of Geo Logic Imaging Core Data']\"],[\"Hydrocarbon Supply Chain Management\",\"Loading Operations Management\",\"Measurement & Quality Management\",\"Petrel\",1,\"['Performance']\",\"['Productivity Loss', 'Workflow Disruption']\",\"['Restart Petrel', 'Check for updates', 'Contact support team']\"],[\"Plan & Manage the Enterprise\",\"Business & Competitive Intelligence\",\"Business Intelligence\",\"HANA\",1,\"['Infrastructure']\",\"['Workflow Disruption']\",\"['Investigate root cause of app039 restart issue and implement measures to prevent future occurrences.']\"],[\"Upstream Core Operations\",\"Hydrocarbon & Commercial Management\",\"Production Accounting\",\"PCARD\",1,\"['Access']\",\"['Productivity Loss']\",\"['Implement a self-service password reset option to reduce dependency on IT support for password resets.']\"]]}",
          },
          "status_code": 200
        };

        // const data = await response.json();
        setJsonResponse2(data2);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData2();
  }, []);


  useEffect(() => {
    const fetchData3 = async () => {
      try {
        //   const response2 = await axios.post('https://industrygenai.accenture.com/bplam/second_screen',  {

        //   });
        //   console.log('API response:', response2);
        //    const data3=
        //     {
        //       "message": "success",
        //       "response": {
        //           "rca_performed_tickets": 94,
        //           "rca_resp": [
        //               {
        //                   "Count": 46,
        //                   "Issue_Type": "Access",
        //                   "Reasons": [
        //                       "1. Access management issues across multiple tools.",
        //                       "2. Password reset and login issues in various tools.",
        //                       "3. License and server issues in Autodesk AutoCAD and CMG.",
        //                       "4. SharePoint Office 365 file access and folder creation issues.",
        //                       "5. HDMS login and access issues in multiple tools."
        //                   ]
        //               },
        //               {
        //                   "Count": 29,
        //                   "Issue_Type": "Infrastructure",
        //                   "Reasons": [
        //                       "1. Software installation and compatibility issues.",
        //                       "2. Server and network connectivity problems.",
        //                       "3. Hardware malfunction and camera issues.",
        //                       "4. User error and training deficiencies.",
        //                       "5. System integration and data replication errors."
        //                   ]
        //               },
        //               {
        //                   "Count": 11,
        //                   "Issue_Type": "Workflow",
        //                   "Reasons": [
        //                       "1. Workflow configuration issues in multiple tools.",
        //                       "2. Technical glitches causing job failures and submission errors.",
        //                       "3. Inability to create or modify certain types of documents.",
        //                       "4. User errors leading to incorrect data input and system errors.",
        //                       "5. Lack of proper training and documentation for tool usage."
        //                   ]
        //               },
        //               {
        //                   "Count": 7,
        //                   "Issue_Type": "Data",
        //                   "Reasons": [
        //                       "1. Outdated data causing discrepancies",
        //                       "2. Technical glitches in data transfer",
        //                       "3. Missing information in critical files",
        //                       "4. Inadequate system maintenance and updates",
        //                       "5. Internal errors in data processing tools"
        //                   ]
        //               },
        //               {
        //                   "Count": 1,
        //                   "Issue_Type": "Network",
        //                   "Reasons": [
        //                       "1. Integration failure between SAP and HDMS",
        //                       "2. Incomplete data transfer from SAP to HDMS",
        //                       "3. Search functionality issue in HDMS",
        //                       "4. Data indexing problem in HDMS",
        //                       "5. Lack of data validation checks during integration"
        //                   ]
        //               }
        //           ],
        //           "total_tickets": 100
        //       },
        //       "status_code": 200

        // };
        const data3 =
        {
          "message": "success",
          "response": {
            "rca_performed_tickets": 523, "rca_resp": [{ "Count": 213, "Issue_Type": "Access", "Reasons": ["1. Adobe Sign account deactivation causing access issues.", "2. Appian EWR/PARF Excel export and log-in errors.", "3. Enterprise Connect missing from devices and email transfer issues.", "4. HANA database connection errors and login issues.", "5. ParcView access and installation problems, including missing folders and connection errors."] }, { "Count": 184, "Issue_Type": "Infrastructure", "Reasons": ["1. Adobe Sign causing various issues with PDFs.", "2. Appian EWR-PARF forms encountering errors.", "3. HANA database experiencing connectivity and performance issues.", "4. PARCView installation and connection problems.", "5. Primavera P6 facing login and configuration issues."] }, { "Count": 48, "Issue_Type": "Performance", "Reasons": ["1. Insufficient system resources causing HANA and PARCView issues.", "2. Replication delays causing EC ORAPRD25 issues.", "3. Parcview 7.0 upgrade causing performance and trend issues.", "4. Petrel and Primavera P6 experiencing slow performance and frequent crashing.", "5. Possible network or connectivity issues affecting tool performance."] }, { "Count": 40, "Issue_Type": "Data", "Reasons": ["1. Appian EWR/PARF report generation issues", "2. HANA data source inconsistencies and errors", "3. ParcView data collection and reporting limitations", "4. Power BI data source and refresh issues", "5. Primavera P6 data loss and deletion errors"] }, { "Count": 38, "Issue_Type": "Workflow", "Reasons": ["1. Signature issues in Adobe Sign", "2. Manual data entry required in Appian", "3. Delay in AFE processing causing urgent requests", "4. Issues with PARF closure in Appian", "5. Functionality issues with PARCView and HANA"] }], "total_tickets": 544
          },
          "status_code": 200

        };
        setJsonResponse3(data3);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData3();
  }, []);


  const handleViewReportClick = () => {
    // Navigate to a new screen with tabs
    console.log("Entering handle view report")
    console.log('jsonResponse', jsonResponse)
    console.log('jsonResponse2', jsonResponse2)
    console.log('jsonResponse3', jsonResponse3)
    navigate('/tabs-screen', { state: { jsonResponse, jsonResponse2, jsonResponse3 } });  // Replace '/tabs-screen' with your desired route
    //,{ state: { jsonResponse } }
  };
  // const navigate = useNavigate();

  // Function to handle "Go back" button click
  const handleGoBackClick = () => {
    setreportbutton(''); // Navigate back to the previous page
  };
  // Function to handle file upload for the first dropdown
  const handleFile1Upload = (e) => {
    const uploadedFile = e.target.files[0];
    setFile1(uploadedFile);

    // Add the uploaded file to the dropdown options if it's not already there
    if (!file1Options.includes(uploadedFile.name)) {
      setFile1Options([...file1Options, uploadedFile.name]);
    }
  };
  // const fetchFolderStructure = async () => {
  //   try {
  //     // const response = await axios.get('https://industrygenai.accenture.com/cq/folderStructure');
  //     // setFolderStructure(response.data);

  //     // const firstFiles = response.data.map(folder => folder.files[0]);
  //     // const secondFiles = response.data.map(folder => folder.files[1]);

  //     // Update the dropdown options
  //     // setFile1Options(secondFiles);
  //     // setFile2Options(firstFiles);
  //   } catch (error) {
  //     // Handle any errors
  //     console.error('Error fetching folder structure:', error);
  //   }
  // };

  // useEffect(() => {
  //   // Fetch folder structure and update dropdowns when the component mounts
  //   fetchFolderStructure();
  // }, []);
  // Function to handle file upload for the second dropdown
  const [value, setValue] = React.useState('');

  const handleChange = (event) => {
    setValue(event.target.value);
  };
  const [calenderValue, setCalenderValue] = React.useState('');

  const handleCalenderChange = (event) => {
    setCalenderValue(event.target.value);
  };

  const handlePrevButtonClick1 = (event) => {
    navigate('/energy');
  };
  const handleButtonClick = () => {
    // handleuploadClick(uploadedFile);
    setShowTabs(true);
  };
  const placeholderStyle = {
    color: selectedOption ? '#AD8BFF' : 'white',
    fontSize: '12px',
  };
  //     const handleFile2Upload = (e) => {
  //       const uploadedFile = e.target.files[0];
  //       setFile2(uploadedFile);

  //       // Add the uploaded file to the dropdown options if it's not already there
  //       if (!file2Options.includes(uploadedFile.name)) {
  //         setFile2Options([...file2Options, uploadedFile.name]);
  //       }
  //     };
  //     const handleFolderTitleChange = (e) => {
  //         setFolderTitle(e.target.value);
  //       };
  //       const handleGenerateClick = () => {
  //         const formData = new FormData();
  //         formData.append('folderTitle', folderTitle);
  //         formData.append('file1', file1);
  //         formData.append('file2', file2);
  //         setgeneratebutton('clicked')
  //         // Send both files and folder title to the backend
  //         // axios.post(' https://industrygenai.accenture.com/cq/uploadFiles', formData)
  //           // .then((response) => {
  //           //   console.log(response)
  //           // })
  //           .catch((error) => {
  //             // Handle any errors if the upload fails
  //           });
  //          handleGenerate2Click();
  //       };
  //       const handleGenerate2Click = async () =>{
  //         const formData = new FormData();

  //         // Check if files were selected from the dropdowns
  //         if (file1Options.includes(file1.name) && file2Options.includes(file2.name)) {
  //           // User selected files from the dropdowns, pass file names as inputs
  //           formData.append('file1Name', file1.name);
  //           formData.append('file2Name', file2.name);
  //         }

  //         // // Always include folderTitle and uploaded files
  //         // formData.append('file1', file1);
  //         // formData.append('file2', file2);
  //         console.log(formData)
  //         console.log(file1)
  //         console.log(file2)
  //         const userInput = {

  //           file1Name: file1,
  //           file2Name: file2,
  //         };

  //         // const response = await axios.post('https://industrygenai.accenture.com/cq/search_and_fetch_files', userInput);

  //         // setReportText(response.data);
  //         // setProgressState("Completed")

  //         // console.log(response.data)



  //       };
  //       // const handleViewReportClick = () => {
  //       //   setreportbutton('clicked');
  //       // };

  //         const currentDate = new Date();
  //         const formattedDate = currentDate.toLocaleDateString('en-US', {
  //           day: '2-digit',
  //           month: 'short',
  //           year: 'numeric',
  //         });
  //         const Loading = () => {
  //           return (

  //             <div className="loader-c">

  //               <div className="dot-cq red-c"></div>
  //               <div className="dot-cq green-c"></div>
  //               <div className="dot-cq blue-c"></div>
  //             </div>

  //           );
  //         ;
  //         };
  //         const getUniqueSections = (reportText) => {
  //           const sectionSet = new Set();
  //           reportText.forEach((item) => {
  //             sectionSet.add(item.Section_ID);
  //           });

  //           return [...sectionSet].map((section) => ({
  //             value: section,
  //             label: section,
  //           }));
  //         };
  //         const handleSectionSelect = (selectedOptions) => {
  //           setSelectedSections(selectedOptions);
  //         }

  //        // Filter the reportText based on the selected sections
  // let filteredReportText = reportText;
  // if (selectedOption === "Amended Sections") {
  //   // Filter based on the exclusion criteria
  //   filteredReportText = filteredReportText.filter((item) => {
  //     const change = item.Change.toLowerCase();
  //     const impact = item.Impact.toLowerCase();
  //     const excludedValues = [
  //       "no change",
  //       "no significant change",
  //       "minor formatting change",
  //       "no impact",
  //       "no significant impact",
  //       "not have any significant impact",
  //       "change in punctuation",
  //     ];
  //     return !excludedValues.some((value) => change.includes(value) || impact.includes(value));
  //   });
  // } else if (selectedOption === "Custom") {
  //   // Filter based on selected sections
  //   if (selectedSections.length > 0) {
  //     filteredReportText = filteredReportText.filter((item) => selectedSections.some((section) => section.value === item.Section_ID));
  //   }
  // }
  // const customStyles = {
  //   control: (styles) => ({
  //     ...styles,
  //     maxHeight: 5,
  //     width: 200, // Set your desired width
  //   }),
  // };

  // Your other logic for generating content
  const handleRefreshButtonClick2 = () => {
    window.location.reload(); // This will refresh the page
  };
  // Render the table with the filtered data
  // ... (same table rendering code as before)

  return (
    <div className='bplam-Main-comp'>
      {/* <img className='header-comp' src={pheader} /> */}
      <div className='Heading-comp-bplam'>
        <div className='screen-change1-bplam1' onClick={handlePrevButtonClick1}>Internal</div>
        <div className='bplam-comp1' >/BPLAM</div>
        <img className='img-class-comp-bplam' src={topimage} alt="primary header" onClick={handleToggleModal} />
        {/* <div className='info-icon'><img className="i-icon" src={topimage} onClick={handleToggleModal} /></div> */}

        {showModal && (
          <Info
            onClose={() => setShowModal(false)}
          />
        )}

        <div className='bplam-refresh' onClick={handleRefreshButtonClick2}></div>
      </div>

      <div>
        <div className='bplam-screen-container'>
          <img className='bplam-screen' src={bplamsc} />

        </div>

        <div className='bplam-bottom-comp'>
          <div className='bplam-bottom-cont'>
            <div className='bplam-Bottom2'>
              {/* <div className='generate-comp'>Generate Analysis</div> */}
              <div>
                <PopupButton jsonResponse={jsonResponse} jsonResponse2={jsonResponse2} jsonResponse3={jsonResponse3} onClick={handleButtonClick} onFileUpload={handleFileUpload} />
              </div>
              <p className='bplam-filter-button1'>|</p>
              <p className='bplam-filter-button'>Filter By</p>

              <div className='bplam-status-dd-container'>

                {/* <label htmlFor="bplam-status-dd">STATUS</label> */}
                <select value={value} onChange={handleChange} className='bplam-status-dd' style={placeholderStyle} placeholder='STATUS'>
                  {/* <option value="bplam-status-value-first" disabled>STATUS</option> */}
                  {/* <option className='bplam-status-value-dis' >STATUS</option> */}
                  <option value="" style={{ color: '#AD8BFF', display: 'none' }} >STATUS</option>
                  <option className='bplam-status-value' value="In Progress">In Progress</option>
                  <option className='bplam-status-value' value="Completed">Completed</option>
                  <option className='bplam-status-value' value="Not Started">Not Started</option>
                </select>
                <select value={calenderValue} onChange={handleCalenderChange} className='bplam-status-dd' style={placeholderStyle}>
                  <option value="In Progress">PERIOD</option>
                </select>
              </div>
              <div className='search-bar' style={{
                display: 'flex',
                flexDirection: 'row',
                padding: '8px',
                marginTop: '5px',
                marginLeft: '200px',
                // border: '1px solid #ccc',
                marginRight: '8px',
                backgroundColor: 'rgba(255,255,255,0.1)',
                border: '1px solid #747BA9',
                borderRadius: '10px',
                width: '220px',  // Adjust the width as needed
                height: '20px',
              }}>
                <input
                  type='text'
                  placeholder='Type here to search...'
                  style={{
                    // padding: '1px',
                    height: '18px',
                    backgroundColor: 'rgba(255,255,255,0.0)',
                    border: '1px solid rgba(255,255,255,0.0)',
                    width: '180px',  // Adjust the width as needed
                    marginTop: '-9px',
                    fontFamily: 'Graphik',
                    fontSize: '12px',
                  }}
                  value={filterText}
                  onChange={handleFilterTextChange}
                />
                <span style={{ cursor: 'pointer' }}>
                  <img
                    src={search}  // Replace with your search icon URL
                    alt='Search Icon'
                    style={{ width: '20px', height: '20px', marginTop: '-22px' }}
                  />
                </span>
              </div>
            </div>
            <div className='bplam-drillanalysis-report'>
              <div className='bplam-drill-card'>
                <div className='bplam-drill-card-body' key="myName">
                  <p className='bplam-drill-header'><strong>Shell Ticket Analysis</strong></p>
                  <p className='bplam-drill-header'>2022</p>
                  <p className='bplam-drill-body'>Created on 05 Oct 2023 by ABC</p>
                  <p className='bplam-status-drill'> Completed</p>
                  <button className='bplam-view-report' onClick={handleViewReportClick}> <img src={report} className='report-icon' /> VIEW REPORT</button>
                </div>
                {/* <img src={report} className='view-report' onClick={getRig} /> */}
              </div>
              <div className='bplam-drill-card'>
                <div className='bplam-drill-card-body' key="myName">
                  <p className='bplam-drill-header'><strong>Equinor Ticket Analysis</strong></p>
                  <p className='bplam-drill-header'>2022</p>
                  <p className='bplam-drill-body'>Created on 04 Oct 2023 by ABC</p>
                  <p className='bplam-status-drill'> Completed</p>
                  <button className='bplam-view-report' onClick={handleViewReportClick}> <img src={report} className='report-icon' /> VIEW REPORT</button>
                </div>
                {/* <img src={report} className='view-report' onClick={getRig} /> */}
              </div>
            </div>
          </div>
        </div>
      </div>


      {/* <div className='footer-bplam'>
        <p>©2023 Accenture. All Rights Reserved.</p>
      </div> */}
    </div>



  );
};

export default App;





