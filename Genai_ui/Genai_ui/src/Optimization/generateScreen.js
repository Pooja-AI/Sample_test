import React, { useState } from "react";
import "react-step-progress-bar/styles.css";
import { ProgressBar, Step } from "react-step-progress-bar";
import DynamicTable from './DynamixTable';
import AutocompleteTextarea from './AutoCompleteTextarea';
import VisualizationTable from "./VisualizationTable";
import SustainabilityReport from './SustainabilityReport';
import axios from "axios";
import SaveIcon from '@mui/icons-material/Save';
import PopupForm from './PopupForm';
import { Helmet } from 'react-helmet';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import OutputVarTable from "./OutputVarTable";
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';

const StepProgressBar = () => {
  const [progress, setProgress] = useState(0);
  const [inputValue, setInputValue] = useState('');
  const [selectedOption, setSelectedOption] = useState('');
  const [selectedOption1, setSelectedOption1] = useState('');
  const [ fileUploading,setfileuploading]=useState(false);
  const [Response1,setResponse]=useState({})
  const [showModalResScrn, setShowModalResScrn] = useState(false);
  const [uploadresp,setUploadresponse]=useState('');
  const [csv2,setcsv2]=useState('')
  const [popupIsOpen, setPopupIsOpen] = useState(false);
  const initialListData = [
    ['Value 1', 'Value 2', 'Value 3', 'Clickable Value 1', 'Value 5'],
    ['Value 1', 'Value 2', 'Value 3', 'Clickable Value 2', 'Value 5'],
    ['Value 1', 'Value 2', 'Value 3', 'Clickable Value 3', 'Value 5'],
    ['Value 1', 'Value 2', 'Value 3', 'Clickable Value 4', 'Value 5'],
  ];
  const [clickedCellIndex, setClickedCellIndex] = useState(null);
  const [listData, setListData] = useState([]);
  const [listData1, setListData1] = useState(initialListData);
  const [currentKPIList, setCurrentKPIList] = useState([]);
  const [html, setHtml]=useState([])
  const [loading, setLoading] = useState(false);
  const [loading1, setLoading1] = useState(false);
  const [loading2, setLoading2] = useState(false);
  const [loading3, setLoading3] = useState(false);
  const [issueStatus, setIssueStatus] = useState(false);
  const [objective,setObjective] = useState({})
  const [selectedFiles,setSelectedFiles]= useState([]);
  const [selectedOptionR, setSelectedOptionR] = useState('');
  const [selectedOption2, setSelectedOption2] = useState('');
  const [inputValue1, setInputValue1] = useState('');
  const [showDashboard, setShowDashboard] = useState(false);
 
  const handleChange = (event) => {
    setInputValue(event.target.value);
  };
  const showPopup=() => {
    // Show the popup for 5 seconds when the component mounts
    setIssueStatus(true);
    const popupTimer = setTimeout(() => {
      setIssueStatus(false);
    }, 5000);

    // Clear the timer when the component unmounts
    return () => clearTimeout(popupTimer);
  }
  const handleRadioChange = (event) => {
    setSelectedOptionR(event.target.value);
  };
  const handleSelectChange = (event) => {
    setSelectedOption(event.target.value);
  };
  const handleSelectChange1 = (event) => {
    setSelectedOption1(event.target.value);
  };
  const handleSelectChange2 = (event) => {
    setSelectedOption2(event.target.value);
  };
  const handleChange1 = (event) => {
    setInputValue1(event.target.value);
  };
  const handleStep = () => {
    console.log('Progress value:', progress);
    if (progress < 100) {
      setProgress((prevProgress) => prevProgress + 20); // Adjust based on the number of steps
    }

    if(progress === 100){
      setShowDashboard(true);
    }
    else{
      setShowDashboard(false);
    }

  };
  const OnSaveClick4 = async (jsonDataa)=>{
    console.log("json",jsonDataa)
    setLoading3(true)
    const response = await axios.post('http://98.64.76.199:5000/visualize', jsonDataa);
    setHtml(response.data.response)
    setLoading3(false)
    console.log("-------------------------------",response.data.response)
  }
  const handlePrevStep = () => {
    if (progress > 0) {
      setProgress((prevProgress) => prevProgress - 20); // Adjust based on the number of steps
    }
  };
  const saveDataToBackend2= async (objectives) => {
    console.log("wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww",csv2)
    const blob = new Blob([csv2], { type: 'text/csv' });
    const jsonBlob = new Blob([objectives], { type: 'text/csv' });
    
    
      try {
        console.log("mmmmmmmmmmmmmmmm",selectedFiles)
        const formData = new FormData();
        
        formData.append('tfile', blob, 'filename.csv');
        formData.append('jsonData', jsonBlob, 'data.csv');
        setLoading2(true); 
      const response = await axios.post('http://98.64.76.199:5000/optimizers', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        
      });
      setLoading2(false); 
      
      setResponse(response)
      setShowModalResScrn(true);
      if (response.ok) {
        const responseData = await response.json();
        console.log(responseData);
      } else {
        console.error('Error:', response.statusText);
      }
    } catch (error) {
      console.error('Error sending data to the backend:', error);
    }
  };
    
  const saveDataToBackend = async (csvData) => {
    console.log("wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww",csvData)
    const blob = new Blob([csvData], { type: 'text/csv' });
    
      try {
        console.log("mmmmmmmmmmmmmmmm",selectedFiles)
        const formData = new FormData();
        selectedFiles.forEach((file, index) => {
          console.log(index)
          formData.append(`ofile`, file);
        });
        formData.append('tfile', blob, 'filename.csv');
        setLoading1(true)
      const response = await axios.post('http://98.64.76.199:5000/transformations', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        
      });
      setLoading1(false)
      showPopup()
      if (response.ok) {
        const responseData = await response.json();
        console.log(responseData);
      } else {
        console.error('Error:', response.statusText);
      }
    } catch (error) {
      console.error('Error sending data to the backend:', error);
    }
  };
    
  const handlePopupOpen = (cellIndex) => {
    setClickedCellIndex(cellIndex);
    console.log("QQQQQQQQ",uploadresp)
    if (Array.isArray(uploadresp) && uploadresp.length > 0) {
      const newDataArray = uploadresp.map(item => {
       console.log("WWWWW",item['Key Performance Indicators (KPIs)'])
        const kpis = item['Key Performance Indicators (KPIs)'];
        setCurrentKPIList(kpis)
        return kpis;
      });
      
    }
    console.log("aaaaaaaaaaaaaaaaaaaaaa",currentKPIList)
    setPopupIsOpen(true);
  };
  const identifiedKPIs = ['KPI 1', 'KPI 2', 'KPI 3', 'KPI 4'];
  const handlePopupClose = () => {
    setPopupIsOpen(false);
  };
  const handleFileSelect = (e) => {
    const selectedFilesArray = Array.from(e.target.files);
    console.log("ccccccc",selectedFilesArray);
    setSelectedFiles(selectedFilesArray);
  };
  const handleUpload = async (e) => {
    //handleFileSelect(e)
    const selectedFilesArray = Array.from(e.target.files);
    setSelectedFiles(selectedFilesArray)
    if (selectedFilesArray) {
      try {
        console.log("mmmmmmmmmmmmmmmm",selectedFilesArray)
        const formData = new FormData();
        selectedFilesArray.forEach((file, index) => {
          console.log(index)
          formData.append(`file`, file);
        });
        setLoading(true); 
        setfileuploading(true);
        const response = await axios.post('http://98.64.76.199:5000/basicDetails', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        setLoading(false); 
        console.log('API response:', response.data.response);
        const upload_response = response.data.response;
        if (Array.isArray(upload_response) && upload_response.length > 0) {
          const newDataArray = upload_response.map(item => {
            const filename = item['Filename'];
            const fileType = filename.split('.').pop(); // Extracting file extension
            const filenameWithoutExtension = filename.slice(0, -(fileType.length + 1)); 
           
            const dataFrequency = item['Data Frequency'];
            const timeline = item['Timeline'];
            const metadata = (
              <span style={{display:'flex',flexDirection:'column'}}>
                <span>
                <span style={{ color: 'yellow' }}>Data Frequency:</span> {dataFrequency}, {' '}</span>
                <span><span style={{ color: 'yellow' }}>Timeline:</span> {timeline}</span>
              </span>
            );
            const kpis = (
              <span style={{ color: 'blue' }}>View</span>
            );
            return [filenameWithoutExtension, fileType, metadata,'view'];
          });
          setListData((prevListData) => [...prevListData, ...newDataArray]);
        }
       
        setUploadresponse(upload_response);
        setfileuploading(false);
       

      }
      catch (error) {
        console.log(error)
      }
    } else {
      alert('Please select a file to upload.');
    }
  };
  console.log("jhhhhhhhhhhhhh",listData)
  const handlePopupSave = (data) => {
    setListData1([...listData1, data]);
    setPopupIsOpen(false);
  };
  const saveClick = () =>{

  };
  const Issuestate = () => {
    return (
      <div class="overlay-container-op" style={{display:'flex',flexDirection:'row', padding:'30px',background:'#464B7A',border:'1px solid gray', borderRadius:'10px'}} >
        
    <div style={{color:'white',marginLeft:'20px'}}>No Issue Found</div>
  </div>
    );
    ;
  };
  const Loading = () => {
    return (
      <div class="overlay-container-op" style={{display:'flex',flexDirection:'row', padding:'30px',background:'#464B7A',border:'1px solid gray', borderRadius:'10px'}} >
        <div >
    <div class="dot-loader-op red-loader-op"></div>
    <div class="dot-loader-op green-loader-op"></div>
    <div class="dot-loader-op blue-loader-op"></div>
    </div>
    <div style={{color:'white',marginLeft:'20px'}}>genai is analysing the files</div>
  </div>
    );
    ;
  };
  const Loading3 = () => {
    return (
      <div class="overlay-container-op" style={{display:'flex',flexDirection:'row', padding:'30px',background:'#464B7A',border:'1px solid gray', borderRadius:'10px'}} >
        <div >
    <div class="dot-loader-op red-loader-op"></div>
    <div class="dot-loader-op green-loader-op"></div>
    <div class="dot-loader-op blue-loader-op"></div>
    </div>
    <div style={{color:'white',marginLeft:'20px'}}>genai is Visualizing the data</div>
  </div>
    );
    ;
  };
  const Loading1 = () => {
    return (
      <div class="overlay-container-op" style={{display:'flex',flexDirection:'row', padding:'30px',background:'#464B7A',border:'1px solid gray', borderRadius:'10px'}} >
        <div >
    <div class="dot-loader-op red-loader-op"></div>
    <div class="dot-loader-op green-loader-op"></div>
    <div class="dot-loader-op blue-loader-op"></div>
    </div>
    <div style={{color:'white',marginLeft:'20px'}}>Genai is Validating the rows</div>
  </div>
    );
    ;
  };
  const Loading2 = () => {
    return (
      <div class="overlay-container-op" style={{display:'flex',flexDirection:'row', padding:'30px',background:'#464B7A',border:'1px solid gray', borderRadius:'10px'}} >
        <div >
    <div class="dot-loader-op red-loader-op"></div>
    <div class="dot-loader-op green-loader-op"></div>
    <div class="dot-loader-op blue-loader-op"></div>
    </div>
    <div style={{color:'white',marginLeft:'20px'}}>Genai is Running the Model</div>
  </div>
    );
    ;
  };
  const minimizecall = (objectives) => {
    console.log("aaaaaaaaaaaaaaaaa",objectives)
    setObjective(objectives)
    saveDataToBackend2(objectives)
   
  };
  const handleSaveClick2 = (csvData) => {
    // Call the backend API with the CSV data
   
    setcsv2(csvData);
   
  };
  const handleSaveClick = (csvData) => {
    // Call the backend API with the CSV data
    saveDataToBackend(csvData);
  };
  const handleProgressBarColor = () => {
    switch (progress) {
        case 0:
            return "#50C878";
      case 20:
        return "#50C878"; // Color for step 2 progress
      case 40:
        return "#50C878"; // Color for step 3 progress
      case 60:
        return "#50C878"; // Color for step 4 progress
      case 80:
        return "#50C878"; // Color for step 5 progress
      case 100:
        return "#50C878"; // Color for step 5 progress
      default:
        return "#50C878"; // Default background color
    }
  };

  const exampleResponseHtml = html;

  // useEffect(() => {
  //   // Execute scripts after the component is mounted
  //   const script = document.createElement('script');
  //   script.src = 'https://cdn.jsdelivr.net/npm/chart.js';
  //   script.async = true;
  //   document.head.appendChild(script);

  //   // Cleanup script tag on component unmount
  //   return () => {
  //     document.head.removeChild(script);
  //   };
  // }, []);

  const handleStepChange = (step) => {
    console.log('inside callback')
    setShowDashboard(false);
    setProgress(step);
  };

  return (
    <div className="progress-container">
       {loading ? <Loading/> : null}
       {loading1 ? <Loading1/> : null}
       {loading2 ? <Loading2/> : null}
       {loading3 ? <Loading3/> : null}
       {issueStatus?<Issuestate/>:null}
         {showDashboard === true ? (
          <>
            <Helmet>
           <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
              </Helmet>
            <SustainabilityReport responseHtml={exampleResponseHtml} onEditClick={() => handleStepChange(100)}></SustainabilityReport>
                
          </>
         
        ) : (
          <>
               <ProgressBar
          percent={progress}
          filledBackground={handleProgressBarColor()}
        >
          <Step transition="scale">
            {({ accomplished }) => (
              <div className={`step${accomplished ? "accomplished" : ""}`}>
                <div className="step-number" 
                style={{
                  backgroundColor: progress === 0 ? '#3498db': undefined,
                border:progress === 0 ? '2px solid white' :'1px solid black'}}>1</div>
                <div style={{ color: progress < 0  ? '#787878' : 'white', fontSize:'12px', fontFamily:'Graphik',height:'0px',marginTop:'5px'}}>Details</div>
              </div>
            )}
          </Step>
          <Step transition="scale">
            {({ accomplished }) => (
              <div className={`step${accomplished ? "accomplished" : ""}`}>
                <div className="step-number"
                 style={{
                  backgroundColor: progress === 20 ? '#3498db': undefined,
                 border:progress === 20 ? '2px solid white' :'1px solid black'}}>2</div>
                 <div style={{ color: progress < 20  ? '#787878' : 'white', fontSize:'12px', fontFamily:'Graphik',height:'0px',marginTop:'5px'}}>Data Inputs</div>
              </div>
            )}
          </Step>
          <Step transition="scale" style={{}}>
            {({ accomplished }) => (
              <div className={`step${accomplished ? "accomplished" : ""}`}>
                <div className="step-number"
                 style={{backgroundColor: progress === 40 ? '#3498db': undefined,
                 border:progress === 40 ? '2px solid white' :'1px solid black', marginTop:'10px'}}>3</div>
                 <div style={{ color: progress < 40  ? '#787878' : 'white', fontSize:'12px', fontFamily:'Graphik',textAlign: 'center',
      marginLeft: '-24px',height:'10px',marginTop:'5px'}}>Data <br />Preprocessing</div>
              </div>
            )}
          </Step>
          <Step transition="scale">
            {({ accomplished }) => (
              <div className={`step${accomplished ? "accomplished" : ""}`}>
                <div className="step-number"
                 style={{backgroundColor: progress === 60 ?  '#3498db': undefined,
                 border:progress === 60 ? '2px solid white' :'1px solid black',marginTop:'10px'}}>4</div>
                  <div style={{ color: progress < 60  ? '#787878' : 'white', fontSize:'12px', fontFamily:'Graphik',textAlign: 'center',
      marginLeft: '-10px',height:'10px',marginTop:'5px'}}>Output <br /> Variables</div>
              </div>
            )}
          </Step>
          <Step transition="scale">
            {({ accomplished }) => (
              <div className={`step${accomplished ? "accomplished" : ""}`}>
                <div className="step-number"
                 style={{backgroundColor: progress === 80 ?  '#3498db': undefined,
                border:progress === 80 ? '2px solid white' :'1px solid black',marginTop:'10px'}}>5</div>             
                 <div style={{ color: progress < 80  ? '#787878' : 'white', fontSize:'12px', fontFamily:'Graphik',textAlign: 'center',
      marginLeft: '-24px',height:'10px',marginTop:'5px'}}>
                Optimization <br />Objective</div>
              </div>
            )}
          </Step>
          <Step transition="scale">
            {({ accomplished }) => (
              <div className={`step${accomplished ? "accomplished" : ""}`}>
                <div className="step-number"
                 style={{
                 border:progress === 100 ? '2px solid white' :'1px solid black',marginTop:'10px'}}>6</div>
                 <div style={{ color: progress < 100  ? '#787878' : 'white', fontSize:'12px', fontFamily:'Graphik',textAlign: 'center',
      marginLeft: '-24px',height:'10px',marginTop:'5px'}}>Data  <br />Visualization</div>
              </div>
            )}
          </Step>
        </ProgressBar>
        <div className="col-sm-12 content-container">
          {progress === 0 && 
          <div className="column-opt">
               <div style={{border:'1px solid #747BA9',backgroundColor:'#2A2D4E',paddingLeft:'20px',paddingTop:'20px', borderRadius:'20px',marginTop:'10px'}}>
          <div className="row-opt">
          <div 
          style={{marginRight:'160px',color: 'aliceblue',fontFamily: 'Graphik', fontWeight: '500',fontSize: '14px' ,marginTop:'10px',placeholder:{color:'white'}}} 
          className='label-steps'>Title</div>
          <div>
          <textarea
              style={{backgroundColor: '#747BA9',borderStyle: 'solid',borderWidth: '1px',borderRadius: '5px', borderColor: '#b0b8ebc5', textAlign: 'left', padding: '5px', marginTop: '8px', fontWeight: '300',fontSize: '14px',fontStyle: 'italic',width: '390px',height: '35px',color: 'white'}}
              //style={{width:"350px", backgroundColor: 'rgb(70, 75, 122)', border:'solid 1px white', color:'white'}}
              placeholder="Enter Title"
              type="text"
              value={inputValue} // Controlled component: value is controlled by state
              onChange={handleChange} // Calls handleChange when input changes
              rows='1'
              className="label-steps-2"
          />
          </div>
          </div>
          <div className="row-opt">
          <div style={{marginRight:'110px',color: 'aliceblue',fontFamily: 'Graphik', fontWeight: '500',fontSize: '14px',marginTop:'10px' }}>Description</div>
          <div>
          <textarea
          style={{backgroundColor: '#747BA9',borderStyle: 'solid',borderWidth: '1px',borderRadius: '5px', borderColor: '#b0b8ebc5', textAlign: 'left', padding: '5px', marginTop: '8px', fontWeight: '300',fontSize: '14px',fontStyle: 'italic',width: '390px',height: '35px',color: 'white'}}
          //  style={{width:"350px",backgroundColor: 'rgb(70, 75, 122)', border:'solid 1px white', color:'white'}}
              type="text"
              value={inputValue1} // Controlled component: value is controlled by state
              onChange={handleChange1} // Calls handleChange when input changes  
          />
          </div>
          </div>
          <div className="row-opt">
          <div style={{marginRight:'55px',color: 'aliceblue',fontFamily: 'Graphik', fontWeight: '500',fontSize: '14px' ,marginTop:'10px'}}>Optimization Model</div>
              <div>
          <select
          style={{backgroundColor: '#747BA9',borderStyle: 'solid',borderWidth: '1px',borderRadius: '5px', borderColor: '#b0b8ebc5', textAlign: 'left', padding: '5px', marginTop: '8px', fontWeight: '300',fontSize: '14px',fontStyle: 'italic',width: '390px',height: '35px',color: 'white'}} 
          // style={{width:"350px",backgroundColor: 'rgb(70, 75, 122)', border:'solid 1px white', color:'white'}} 
          value={selectedOption} onChange={handleSelectChange}>
              <option value="">Select an option</option>
              <option value="option1">Option 1</option>
              <option value="option2">Option 2</option>
              <option value="option3">Option 3</option>
          </select>
          </div>
          </div> 
          <div className="row-opt">
          <div style={{marginRight:'65px',color: 'aliceblue',fontFamily: 'Graphik', fontWeight: '500',fontSize: '14px' ,marginTop:'10px'}}>Optimization Type</div>
              <div >
          <select 
          style={{backgroundColor: '#747BA9',borderStyle: 'solid',borderWidth: '1px',borderRadius: '5px', borderColor: '#b0b8ebc5', textAlign: 'left', padding: '5px', marginTop: '8px', fontWeight: '300',fontSize: '14px',fontStyle: 'italic',width: '390px',height: '35px',color: 'white'}}
          // style={{width:"350px",backgroundColor: 'rgb(70, 75, 122)', border:'solid 1px white', color:'white'}} 
          value={selectedOption1} onChange={handleSelectChange1}>
              <option value="">Select an option</option>
              <option value="option1">Option 1</option>
              <option value="option2">Option 2</option>
              <option value="option3">Option 3</option>
          </select>
          </div>
          </div>  
          <div className="row-opt">
          <div style={{marginRight:'145px',color: 'aliceblue',fontFamily: 'Graphik', fontWeight: '500',fontSize: '14px' ,marginTop:'10px'}}>Solver</div>
              <div  >
          <select 
          style={{backgroundColor: '#747BA9',borderStyle: 'solid',borderWidth: '1px',borderRadius: '5px', borderColor: '#b0b8ebc5', textAlign: 'left', padding: '5px', marginTop: '8px', fontWeight: '300',fontSize: '14px',fontStyle: 'italic',width: '390px',height: '35px',color: 'white'}}
          // style={{width:"350px",backgroundColor: 'rgb(70, 75, 122)', border:'solid 1px white', color:'white'}} 
          value={selectedOption2} onChange={handleSelectChange2}>
              <option value="">Select an option</option>
              <option value="option1">Option 1</option>
              <option value="option2">Option 2</option>
              <option value="option3">Option 3</option>
          </select>
          </div>
          </div>  
          <div className="row-opt1">
          <div style={{marginRight:'110px',color: 'aliceblue',fontFamily: 'Graphik', fontWeight: '500',fontSize: '14px' ,marginTop:'10px'}}>Availability</div>
          <div >
              <label style={{marginTop:'10px' }}>
              <input 
                type="radio"
                name="options"
                value="option1"
                checked={selectedOptionR === 'option1'}
                onChange={handleRadioChange}
              />
              <span style={{marginLeft:'5px',marginTop:'10px',color: 'aliceblue',fontFamily: 'Graphik', fontWeight: '400',fontSize: '14px' ,marginTop:'-3px'}}>Public </span>
            </label>
            <label style={{marginLeft:'30px' ,marginTop:'10px' }}>
                <input 
                  type="radio"
                  name="options"
                  value="option2"
                  checked={selectedOptionR === 'option2'}
                  onChange={handleRadioChange}
                />
                <span style={{marginLeft:'5px',marginTop:'10px',color: 'aliceblue',fontFamily: 'Graphik', fontWeight: '400',fontSize: '14px' ,marginTop:'-3px'}}>Private </span>
                
            </label>
          </div>
      
          </div>  
          </div>  
          <button className='button-addRow' onClick={handlePrevStep} style={{marginLeft:'0px', marginTop:'20px',fontSize:'14px',fontFamily:'Graphik', fontWeight:'500',paddingTop:'5px'}}><SaveIcon sx={{marginRight:'10px', fontSize:'18px',marginTop:'-3px'}}/>SAVE</button>
          </div>}
          {progress === 20 && <div style={{marginTop:'50px'}}>
          <table style={{border:'solid 1px white',marginBottom:'292px', width:'100%',marginLeft:'-50px'}}>
      <thead style={{ border: 'solid 1px white', background: '#464B7A' }}>
        <tr style={{textAlign:'center', background: '#464B7A', padding:'3px' }}>
          <th style={{ border: 'solid 1px white', minWidth: '138px', maxWidth: '500px', fontSize:'12px' }}>File Name</th>
          <th style={{ border: 'solid 1px white', minWidth: '100px', maxWidth: '500px',fontSize:'12px' }}>File type</th>
          <th style={{ border: 'solid 1px white', minWidth: '300px', maxWidth: '500px',fontSize:'12px' }}>Metadata
            
          </th>
          <th style={{ border: 'solid 1px white', minWidth: '100px', maxWidth: '200px',fontSize:'12px' }}>KPIs</th>
        
          <th style={{ border: 'solid 1px white', minWidth: '400px', maxWidth: '500px',fontSize:'12px' }}>Data Description</th>
        </tr>
      </thead>
      <tbody style={{ border: 'solid 1px white', minWidth: '100px', maxWidth: '500px', fontSize:'12px' }}>
        {listData.map((rowData, rowIndex) => (
          <tr key={rowIndex}>
            {rowData.map((cellData, cellIndex) => (
              <td
                key={cellIndex}
                style={{
                  border: 'solid 1px white',
                  minWidth: '100px',
                  maxWidth: '500px',

                  cursor: cellIndex === 3 ? 'pointer' : 'auto',
                color: cellIndex === 3 ? 'lightBlue' : cellIndex === 2 ? 'white' : 'white',
                }
              }
              
                onClick={() => (cellIndex === 3 ? handlePopupOpen(rowIndex) : null)}
              >
                
                {cellData}
                {/* Add textboxes for description cells */}
                {cellIndex === 5 && (
                  <textarea
                    style={{ width: "100%", minHeight: "50px", background: '#464B7A', border: 'solid 1px white', color: 'white' }}
                    placeholder="Enter description..."
                    // You can handle the value and onChange as needed
                  />
                )}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
      {popupIsOpen && (
        <PopupForm isOpen={popupIsOpen} onClose={handlePopupClose} onSave={handlePopupSave} identifiedKPIs={currentKPIList} />
      )}
    </table>
    <label htmlFor="imageUpload" style={{marginLeft:'-50px',position:'relative', borderRadius: '10px',marginTop: '10%',border: '2px solid #0AAAE0',padding:'9px', background: 'transparent',
    // background: 'linear-gradient(131.99deg, #0AAAE0 6.23%, rgba(10, 170, 224, 0.5) 85.46%)',
    color:'white', borderRadius:'20px', fontSize:'14px',fontSize:'14px',fontFamily:'Graphik', fontWeight:'500',padding:'8px'}}><CloudUploadIcon sx={{marginRight:'10px', fontSize:'18px',marginTop:'-3px'}}/>BROWSE FILES</label>
                <input
                  id="imageUpload"
                  type="file"
                  multiple
                  name="file"
                  style={{ display: "none"}}
                  onChange={handleUpload}
                /></div>}
          {progress === 40 && <div>
            <DynamicTable
            headers={['Curated Parameter Name', 'UOM', 'Formula Details', 'Level', 'Data Type']}
            onSaveClick={handleSaveClick}
            cellWidths={['200px', '40px', '330px', '50px', '50px']}
          />
          </div>}
          {progress === 60 &&  <OutputVarTable 
          onSaveClick2={handleSaveClick2}
          headers={['Variable Name', 'UOM', 'Formula Details','Level', 'Upbound', 'Lower bound', 'Domain']}
           cellWidths={['140px', '80px','380px' ,'100px', '120px', '120px','100px']}
           />}
          {progress === 80 &&  <AutocompleteTextarea onSaveClick3={minimizecall} setShowModal={showModalResScrn} autoResponse={Response1}/>
          } 
          {progress === 100 &&  <VisualizationTable 
          headers={['S.No.','Visual Type', 'Data', 'Visual Title']} 
          cellWidths={['70px', '190px','400px' ,'250px']}
          screenData={OnSaveClick4}/>
          }
       
        </div>
        <div className="col-sm-6 button-container" style={{textAlign: 'right',paddingRight: '138px', right:'0px'}}>
          {progress !== 0 ? (
            <span style={{marginTop:'-10px',display:'flex',flexDirection:'row', marginLeft:'700px',width:'180%'}}>
              <button className='button-addRow' style={{width:'50%',fontSize:'14px',fontFamily:'Graphik', fontWeight:'500',paddingTop:'5px'}} onClick={handlePrevStep}><KeyboardDoubleArrowLeftIcon sx={{marginRight:'10px', fontSize:'18px',marginTop:'-2px',color:'#0AAAE0'}}/>  PREVIOUS</button>
         
              <button className='button-addRow' style={{width:'50%',fontSize:'14px',fontFamily:'Graphik', fontWeight:'500',paddingTop:'5px'}} onClick={handleStep}>NEXT<KeyboardDoubleArrowRightIcon sx={{marginRight:'10px', fontSize:'18px',marginTop:'-2px',color:'#0AAAE0'}}/>    </button>
            </span>
          ) : (
            <button className='button-addRow' style={{width:'80%',fontSize:'14px',fontFamily:'Graphik', fontWeight:'500',paddingTop:'5px',marginLeft: '820px'}} onClick={handleStep}>NEXT <KeyboardDoubleArrowRightIcon sx={{marginRight:'10px', fontSize:'18px',marginTop:'-2px',color:'#0AAAE0'}}/>    </button>
          )
          }
             
        </div>
          </>
     
        )}
    
    </div>
  );
};

export default StepProgressBar;
