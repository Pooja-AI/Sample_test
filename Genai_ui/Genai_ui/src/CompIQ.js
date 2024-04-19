import React, { useState, useEffect, useCallback } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom';
import './CompIQ.css';
import Multiselect from 'multiselect-react-dropdown';
import { CSVLink } from 'react-csv';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import axios from 'axios';
import Select from 'react-select';

import topimage from './images/Frame 2622.svg';
import upload from './images/upload.svg';

const App = () => {
    const [file1, setFile1] = useState(null);
    const [file2, setFile2] = useState(null);
    const [selectedOption, setSelectedOption] = useState("All Sections");
    const [selectedSections, setSelectedSections] = useState([]);
    const [filteredCsvData, setFilteredCsvData] = useState([]);
    const [folderStructure, setFolderStructure] = useState([]);
    const [selectedFolder, setSelectedFolder] = useState([]);
    const [file1Options, setFile1Options] = useState([]);
    const [file2Options, setFile2Options] = useState([]);
    const [folderTitle, setFolderTitle] = useState('');
    const [progressState, setProgressState] = useState('inprogress');
    const[reportbutton,setreportbutton] = useState('');
    const[generatebutton, setgeneratebutton] = useState('');
  const [reportText, setReportText] = useState([]);
  const headers = [
    { label: 'ID', key: 'Section_ID' },
    { label: 'Reference Document', key: 'VersionA' },
    { label: 'Amended Document', key: 'VersionB' },
    { label: 'Change', key: 'Change' },
    { label: 'Impact', key: 'Impact' },
  ];
  
    const csvData = filteredCsvData.map((item) => ({
      Section_ID: item.Section_ID,
      VersionA: item.VersionA,
      VersionB: item.VersionB,
      Change: item.Change,
      Impact: item.Impact,
    }));
    const csvReport = {
      
      filename: 'report.csv',
      headers: headers,
      data: csvData,
     
    };
    console.log(csvData)
    console.log(headers)
    console.log(csvReport)
   
    useEffect(() => {
      if (selectedSections.length > 0) {
        const filteredData = reportText.filter(item =>
          selectedSections.some(section => section.value === item.Section_ID)
        );
        setFilteredCsvData(filteredData);
      } else {
        setFilteredCsvData(reportText);
      }
    }, [selectedSections, reportText]);
  const handleExportExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(reportText);
    const excelBuffer = XLSX.write(worksheet, { bookType: 'xlsx', type: 'array' });
  
    const data = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8' });
    saveAs(data, 'report.xlsx');
  };
  const getRowColor = (index) => (index % 2 === 0 ? 'rgba(0, 0, 0, 0.10)' : 'rgba(255, 255, 255, 0.1)');
  function highlightWordsInValue(value) {
    // Use regular expression to find words enclosed in < >
    const regex = /<([^>]*)>/g;
    const highlightedValue = value.replace(regex, '<span style="color: yellow;font-weight: 500;">$1</span>');
    return (
      <span dangerouslySetInnerHTML={{ __html: highlightedValue }} />
    );
  }
  const sectionOptions = folderStructure.map((folder) => ({
    value: folder.section_ID,
    label: folder.section_ID,
  }));
  const navigate = useNavigate();

  // Function to handle "Go back" button click
  const handleGoBackClick = () => {
    setreportbutton(''); // Navigate back to the previous page
  };
  const handleMiningClick = () => {
    navigate(-1);
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
    const fetchFolderStructure = async () => {
      try {
        const response = await axios.get('http://20.31.143.170:5000/folderStructure');
        setFolderStructure(response.data);

        const firstFiles = response.data.map(folder => folder.files[0]);
        const secondFiles = response.data.map(folder => folder.files[1]);
    
        // Update the dropdown options
        setFile1Options(firstFiles);
        setFile2Options(secondFiles);
      } catch (error) {
        // Handle any errors
        console.error('Error fetching folder structure:', error);
      }
    };

    useEffect(() => {
      // Fetch folder structure and update dropdowns when the component mounts
      fetchFolderStructure();
    }, []);
    // Function to handle file upload for the second dropdown
    const handleFile2Upload = (e) => {
      const uploadedFile = e.target.files[0];
      setFile2(uploadedFile);
  
      // Add the uploaded file to the dropdown options if it's not already there
      if (!file2Options.includes(uploadedFile.name)) {
        setFile2Options([...file2Options, uploadedFile.name]);
      }
    };
    const handleFolderTitleChange = (e) => {
        setFolderTitle(e.target.value);
      };
      const handleGenerateClick = () => {
        const formData = new FormData();
        formData.append('folderTitle', folderTitle);
        formData.append('file1', file1);
        formData.append('file2', file2);
        setgeneratebutton('clicked')
        // Send both files and folder title to the backend
        axios.post(' http://20.31.143.170:5000/uploadFiles', formData)
          .then((response) => {
            console.log(response)
          })
          .catch((error) => {
            // Handle any errors if the upload fails
          });
         handleGenerate2Click();
      };
      const handleGenerate2Click = async () =>{
        const formData = new FormData();
      
        // Check if files were selected from the dropdowns
        if (file1Options.includes(file1.name) && file2Options.includes(file2.name)) {
          // User selected files from the dropdowns, pass file names as inputs
          formData.append('file1Name', file1.name);
          formData.append('file2Name', file2.name);
        }
      
        // // Always include folderTitle and uploaded files
        // formData.append('file1', file1);
        // formData.append('file2', file2);
        console.log(formData)
        console.log(file1)
        console.log(file2)
        const userInput = {
          
          file1Name: file1,
          file2Name: file2,
        };
      
        const response = await axios.post('http://20.31.143.170:5000/search_and_fetch_files', userInput);
       
        setReportText(response.data);
        setProgressState("Completed")
      
        console.log(response.data)
      
       
       
      };
      const handleViewReportClick = () => {
        setreportbutton('clicked');
      };
      
        const currentDate = new Date();
        const formattedDate = currentDate.toLocaleDateString('en-US', {
          day: '2-digit',
          month: 'short',
          year: 'numeric',
        });
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
        const getUniqueSections = (reportText) => {
          const sectionSet = new Set();
          reportText.forEach((item) => {
            sectionSet.add(item.Section_ID);
          });
        
          return [...sectionSet].map((section) => ({
            value: section,
            label: section,
          }));
        };
        const handleSectionSelect = (selectedOptions) => {
          setSelectedSections(selectedOptions);
        }
                
       // Filter the reportText based on the selected sections
let filteredReportText = reportText;
if (selectedOption === "Amended Sections") {
  // Filter based on the exclusion criteria
  filteredReportText = filteredReportText.filter((item) => {
    const change = item.Change.toLowerCase();
    const impact = item.Impact.toLowerCase();
    const excludedValues = [
      "no change",
      "no significant change",
      "minor formatting change",
      "no impact",
      "no significant impact",
      "not have any significant impact",
      "change in punctuation",
    ];
    return !excludedValues.some((value) => change.includes(value) || impact.includes(value));
  });
} else if (selectedOption === "Custom") {
  // Filter based on selected sections
  if (selectedSections.length > 0) {
    filteredReportText = filteredReportText.filter((item) => selectedSections.some((section) => section.value === item.Section_ID));
  }
}
const customStyles = {
  control: (styles) => ({
    ...styles,
    maxHeight: 5,
    width: 200, // Set your desired width
  }),
};
// Render the table with the filtered data
// ... (same table rendering code as before)

    return (
      <div className='Main-comp'>
        <div className='Heading-comp'>
          <div className='mining-comp' onClick={handleMiningClick}>Mining</div>
           <div>/ Intelligent Compliance Management</div>
          </div> 
        
        {(reportbutton==='clicked') ? (
          <div className='main-sub-comp'>
          <div className='f2-comp'>{folderTitle}</div>
          <div className='n1-comp'>
          <div className='ref-comp'>Reference Document:</div>
          <div className='file-comp'> {file1}</div>
          <div className='ref-comp'>Amended Document:</div>
          <div className='file-comp'> {file2}</div>
          <button className='b2-c' onClick={handleGoBackClick}>Go back</button>
          </div>
          <div className='n2-comp'>
          <div className='f3-comp'>Results</div>
          <div className='in-comp'>Substitutions: 50   |  Additions: 30 |  Omissions: 06</div>
          {selectedOption === "Custom" && (
          <div className="section-dropdown">
            <Multiselect
              options={getUniqueSections(reportText)}
              selectedValues={selectedSections}
              onSelect={handleSectionSelect}
              onRemove={handleSectionSelect}
              displayValue="label"
              showArrow={true}
              closeIcon="close"
              showCheckbox={true}
              showArrow={false}
              placeholder="Select Sections"
            />

          
          </div>
        )}

           <select className='drop-comp' onChange={(e) => setSelectedOption(e.target.value)}>
          <option value="">All Sections </option>
          <option value="Amended Sections">Amended Sections</option>
          <option value="Custom">Custom</option>
        </select>

        <div className='b3-c'>
        <CSVLink {...csvReport}  style={{color:'white',paddingLeft:'15px',textDecoration:'none'}}>
       Export csv
      </CSVLink>
        </div>
            </div>
            <div className='report-table-container'>
            <table className='report-table'>
            <thead>
              <tr>
                <th>ID</th>
                <th>Reference Document</th>
                <th>Amended Document</th>
                <th>Change</th>
                <th>Impact</th>
              </tr>
            </thead>
            <tbody>
            {filteredReportText.map((item, index) => (
      <tr key={index} style={{ background: getRowColor(index) }}>
        <td>{item.Section_ID} ({item.Clause_ID})</td>
        <td>{highlightWordsInValue(item.VersionA)}</td>
        <td>{highlightWordsInValue(item.VersionB)}</td>
        <td>{highlightWordsInValue(item.Change)}</td>
        <td>{highlightWordsInValue(item.Impact)}</td>
      </tr>
    ))}
            </tbody>
          </table>

          </div>
            </div>
          
        ):(
          <div>
         
        <div className='banner-comp'>
          <p className='banner-heading-comp'>Intelligent Compliance Management</p>
          <p className='banner-text-comp'>A LLM-powered transformative tool designed to streamline the process of document comparison between old and new versions. By harnessing the power of advanced language models, this tool empowers you to effortlessly identify and pinpoint the specific sections that have been updated within your documents, revolutionizing your document management and revision tracking processes.</p>
        </div>
        <div className='bottom-comp'>
          <div className='left-comp'>
            <div className='under-generate-comp'>
              <div className='above-comp'>
            <div className='generate-comp'>Generate Analysis</div>
                <div className='sub-heading-comp'>Title</div>
            <input
              type="text"
              className='title-box-comp'
              value={folderTitle}
              onChange={handleFolderTitleChange}
              placeholder="Enter Folder Title Here"
            />
            <div className='dropdown-comp'>
              {/* First Dropdown */}
              <div className='first-select-comp'>
              <div className='sub-heading-comp'>Reference Document</div>
              <div className='first-input-comp'>
                <select defaultValue={file1 ? file1.name : ''} onChange={(e) => setFile1(e.target.value)}>
                  <option value=''>Select a file</option>
                  {file1Options.map((option, index) => (
                    <option key={index} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
                <label htmlFor="file1Input" className="file-upload-label">
                <img className='img-comp' src={upload} alt="Upload File" />
                </label>
                  <input
                    type="file"
                   
                    id="file1Input"  
                    style={{ display: 'none' }} 
                    
                    onChange={handleFile1Upload}
                  />
              </div>
            </div>
            <div className='first-select-comp'>
              <div className='sub-heading-comp'>Amended Document</div>
              <div className='first-input-comp'>
                <select defaultValue={file2 ? file2.name : ''} onChange={(e) => setFile2(e.target.value)}>
                  <option value=''>Select a file</option>
                  {file2Options.map((option, index) => (
                    <option key={index} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
                <label htmlFor="file2Input" className="file-upload-label">
                <img className='img-comp' src={upload} alt="Upload File" />
                </label>
                  <input
                    type="file"
                   
                    id="file2Input"  
                    style={{ display: 'none' }} 
                    
                    onChange={handleFile2Upload}
                  />
               
              </div>
            </div>

              </div>
              </div>
              <div className='button-comp'>
                <button className='b-c' onClick={handleGenerateClick}>Generate</button>
                </div>
            </div>
          </div>
          <div className='right-comp'>
          <div className='generate1-comp'>Report Analysis</div>
          {(generatebutton==='clicked') && (progressState==='inprogress') && (
            <div className='r1-comp'>
            <div>
            <div className='f-comp'>{folderTitle}</div>
            <div className='r2-comp'>
              <div className='p-comp'>In Progress</div>
            <div className='d-comp'>
            |  Created on {formattedDate} by admin
            </div>
            </div>
          </div>
          <Loading/>
  
          </div>)}
          {progressState==='Completed' && (
           <div className='r1-comp'>
            <div>
            <div className='f-comp'>{folderTitle}</div>
            <div className='r2-comp'>
              <div className='p1-comp'>Completed</div>
            <div className='d-comp'>
            |  Created on {formattedDate} by admin
            </div>
            </div>
          </div>
          <button className='b1-c' onClick={handleViewReportClick} >View Report</button>
          </div>
          )}
          </div>
        </div>
        </div>
        )}
      </div>
    );
  };
  
  export default App;
  
  
  
  
  