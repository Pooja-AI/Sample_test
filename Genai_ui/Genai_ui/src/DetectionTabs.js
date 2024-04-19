import './detectionTabs.css';
import './CorrosionPage.css';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate, Outlet } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import Chatbot from './Chatbot';
import Incidents from './Incidents';
import Insights from './Insights';
import Summary from './Summary';
import axios from 'axios';
import chatbot from './images/Group 3439.svg';
import question from './images/Group 3593.svg';
import refresh from './images/Group 3139.svg';
import Iicon from './images/Group 3440.svg'
import percent from './images/Group 3215.svg';
import pointer from './images/Group 3214.svg';
import heart from './images/Group 3213.svg';
import sridevi from './images/Group 3001.svg';
import jegan from './images/Group 3002.svg';
import close from './images/Group 3005.svg';
import CorrosionQuest from "./CorrosionQuest";


const App = () => {
  const plantId = localStorage.getItem('plantId');
  const assetId = sessionStorage.getItem('assetId');
  const detectedCorrosionType = localStorage.getItem('detectedCorrosionType');
  const defaultTab = { borderColor: "#202342" };
  const [summaryActive, setSummaryActive] = useState(defaultTab);
  const [insightsActive, setInsightsActive] = useState(defaultTab);
  const [incidentsActive, setIncidentsActive] = useState(defaultTab);
  const [chatbotActive, setChatbotActive] = useState({ borderColor: "blueviolet", color: "white" });
  const handleColorInput = (navname) => {
    const activeTab = { color: "aliceblue", borderColor: "blueviolet" };
    const nonActiveTab = { color: "#738395", borderColor: "#202342" };
    navname == "Summary" ? setSummaryActive(activeTab) : setSummaryActive(nonActiveTab);
    navname == "Insights" ? setInsightsActive(activeTab) : setInsightsActive(nonActiveTab);
    navname == "Incidents" ? setIncidentsActive(activeTab) : setIncidentsActive(nonActiveTab);
    navname == "Chatbot" ? setChatbotActive(activeTab) : setChatbotActive(nonActiveTab);
  };
  // const [iconLoading, seticonLoading] = useState(false);
  const [workorderTable, setWorkorderTable] = useState({});
  const [workorderLoading, setWorkorderLoading] = useState(true);
  const handleWorkorderTable = async () => {
    handleColorInput("Incidents");
    const generateRequest = {
      plantId: plantId,
      assetId: assetId,
      detectedCorrosionType: detectedCorrosionType
    }
    try {
      if (Object.keys(workorderTable).length === 0 && workorderTable.constructor === Object) {
        const response = await axios.post('http://52.157.248.197:5000/WOHistory', generateRequest);
        console.log('API response:', response.data);
        // const response = {"data": {
        //   "WorkOrderDetails": [
        //     {
        //       "ActionsTaken": "No action taken.",
        //       "ApprovalBy": "Jane Doe",
        //       "CorrosionType": "N/A",
        //       "Cost": 0.0,
        //       "Description": "Routine inspection indicates no immediate corrosion concerns. Continual vigilance in monitoring is crucial.",
        //       "Downtime": "0 days",
        //       "IncidentDate": "2023-09-01",
        //       "InspectionReport": "Inspection Report #2197",
        //       "MaintenanceTeam": "John Smith",
        //       "MaterialsUsed": "N/A",
        //       "PreventiveMeasures": "Regular inspection",
        //       "RootCauseAnalysis": "No corrosion observed.",
        //       "Severity": "N/A",
        //       "Status": "Completed",
        //       "WorkOrderNumber": "WO20230102"
        //     },
        //     {
        //       "ActionsTaken": "Applied corrosion-resistant patching to affected areas and increased inspection frequency.",
        //       "ApprovalBy": "Lisa Smith",
        //       "CorrosionType": "Pitting Corrosion",
        //       "Cost": 1300.0,
        //       "Description": "Insufficient protective coatings or maintenance procedures may have contributed to localized corrosion. The specific area may be exposed to corrosive substances or conditions. Enhanced inspection techniques are warranted to detect issues that were previously overlooked.",
        //       "Downtime": "1 day",
        //       "IncidentDate": "2023-03-20",
        //       "InspectionReport": "Inspection Report #2196",
        //       "MaintenanceTeam": "Mark Wilson",
        //       "MaterialsUsed": "Corrosion-resistant patching, ultrasonic thickness measurement",
        //       "PreventiveMeasures": "Enhanced drainage, Increased inspection frequency",
        //       "RootCauseAnalysis": "Attributed the pitting corrosion to exposure to environmental moisture. Improved drainage and implemented regular visual inspections.",
        //       "Severity": "Moderate",
        //       "Status": "Completed",
        //       "WorkOrderNumber": "WO20230104"
        //     },
        //     {
        //       "ActionsTaken": "Conducted cleaning and treated affected areas with anti-corrosion coating. Implemented a more frequent maintenance schedule for inspection and surface treatment.",
        //       "ApprovalBy": "Lisa Smith",
        //       "CorrosionType": "Atmospheric Corrosion",
        //       "Cost": 600.0,
        //       "Description": "Extended exposure to atmospheric conditions has caused surface rust. Adjustments in maintenance strategies are required to address atmospheric corrosion effectively. Consideration should be given to improved protective coatings to prevent future rusting.",
        //       "Downtime": "1 day",
        //       "IncidentDate": "2023-02-10",
        //       "InspectionReport": "Inspection Report #2195",
        //       "MaintenanceTeam": "Kevin Adams",
        //       "MaterialsUsed": "Anti-corrosion coating, rust cleaning materials",
        //       "PreventiveMeasures": "Humidity control measures, Regular inspection",
        //       "RootCauseAnalysis": "Attributed the surface rust to exposure to high humidity in the production area.",
        //       "Severity": "Low",
        //       "Status": "Completed",
        //       "WorkOrderNumber": "WO20230103"
        //     },
        //     {
        //       "ActionsTaken": "No action required.",
        //       "ApprovalBy": "Jane Doe",
        //       "CorrosionType": "N/A",
        //       "Cost": 0.0,
        //       "Description": "Routine inspection results do not reveal immediate corrosion issues. Continuous monitoring is essential for long-term integrity.",
        //       "Downtime": "0 days",
        //       "IncidentDate": "2023-01-15",
        //       "InspectionReport": "Inspection Report #2194",
        //       "MaintenanceTeam": "John Smith",
        //       "MaterialsUsed": "N/A",
        //       "PreventiveMeasures": "Regular inspection",
        //       "RootCauseAnalysis": "No corrosion observed.",
        //       "Severity": "N/A",
        //       "Status": "Completed",
        //       "WorkOrderNumber": "WO20230101"
        //     },
        //     {
        //       "ActionsTaken": "Replaced the corroded section with erosion-resistant alloy and conducted a comprehensive evaluation of erosion-prone areas in the piping system.",
        //       "ApprovalBy": "Sarah Brown",
        //       "CorrosionType": "Erosion Corrosion",
        //       "Cost": 3500.0,
        //       "Description": "Erosion corrosion may result from the properties of the transported materials or operational factors. Thorough analysis is required to pinpoint the exact cause. Enhancing inspection methods is essential to identify and address erosion corrosion promptly.",
        //       "Downtime": "2 days",
        //       "IncidentDate": "2021-10-25",
        //       "InspectionReport": "Inspection Report #2188",
        //       "MaintenanceTeam": "Robert Johnson",
        //       "MaterialsUsed": "Erosion-resistant alloy, erosion-resistant liners, flow rate monitoring equipment",
        //       "PreventiveMeasures": "Flow rate monitoring, Erosion-resistant liners",
        //       "RootCauseAnalysis": "Identified high flow rate and abrasive particles in the fluid as the root cause. Adjusted flow rate and installed erosion-resistant liners.",
        //       "Severity": "Moderate",
        //       "Status": "Completed",
        //       "WorkOrderNumber": "WO20210110"
        //     }
        //   ]
        // }
        // }
        setWorkorderTable(response.data);
      //   setTimeout(() => {
      //     setWorkorderLoading(false);
      // }, 3000);
        setWorkorderLoading(false);
      }
    }
    catch (error) {
      console.log(error)
    }
  };
  const [insightsTable, setInsightsTable] = useState({});
  const [insightsLoading, setInsightsLoading] = useState(true);
  const [rootCauseAnalysis, setrootCauseAnalysis] = useState([]);
  const [preventiveMeasures, setpreventiveMeasures] = useState([]);
  const [scatterAnalysis, setscatterAnalysis] = useState([]);
  const [linechartdata, setlinechartdata] = useState([]);
  const [lineAnalysis, setlineAnalysis] = useState([]);
  const [convertedData, setconvertedData] = useState();
  const handleInsightsTable = async () => {
    handleColorInput("Insights");
    const generateRequest = {
      plantId: plantId,
      assetId: assetId,
      detectedCorrosionType: ""
    }
    try {
      // if(Object.keys(insightsTable).length === 0 && insightsTable.constructor === Object){
      // const response = await axios.post('http://52.157.248.197:5000/insights', generateRequest); 
        const response = {
            "data": {
                "analysis": {
                    "Remedial Measures": [
                        "Enhanced inspection techniques and maintenance procedures are imperative to address the severe corrosion.",
                        "In-depth analysis is required to identify the source of cyclic stresses. Stress monitoring and reduced cyclic loads may be necessary.",
                        "A detailed assessment of environmental factors and materials is necessary to understand why pitting corrosion occurred. Enhanced chemical containment and regular inspection may be necessary."
                    ],
                    "Root Cause Analysis": [
                        "The identification of stress corrosion on a critical 8-inch steel pipe section highlights the need for immediate attention and repair. The source of these stresses needs to be thoroughly analyzed. Enhanced inspection techniques and maintenance procedures are imperative to address the severe corrosion.",
                        "Fatigue corrosion indicates cyclic stresses that the pipeline may have experienced. In-depth analysis is required to identify the source of these stresses. The inspection underscores the need for enhanced testing methods to detect fatigue corrosion early.",
                        "The presence of localized pitting corrosion suggests that protective measures may be inadequate. A detailed assessment of environmental factors and materials is necessary to understand why pitting corrosion occurred. This underscores the importance of ongoing monitoring and potential revisions to maintenance protocols."
                    ]
          },
                "lineChartData": {
                    "analysis": [
                        "The highest downtime due to corrosion was observed in the year 2015, with a total of 7 days.",
                        "The most common type of corrosion observed was Erosion Corrosion, with a total downtime of 22 days over the years.",
                        "The least common type of corrosion observed was Stress Corrosion, with a total downtime of only 4 days over the years.",
                        "There seems to be a correlation between the occurrence of Pitting Corrosion and an increase in downtime, with a peak in 2014.",
                        "The occurrence of Atmospheric Corrosion seems to have decreased over the years, with a peak in 2012.",
                        "The occurrence of Erosion Corrosion seems to have increased over the years, with a peak in 2020.",
                        "Further statistical analysis could be performed to determine if there is a significant correlation between the type of corrosion and the downtime observed."
                    ],
                    "lineChartData": [
                        {
                "Atmospheric Corrosion": 0.0,
                            "Erosion Corrosion": 0.0,
                            "Fatigue Corrosion": 0.0,
                            "Pitting Corrosion": 1.0,
                            "Stress Corrosion": 0.0,
                            "Year": 2007
                        },
                        {
                "Atmospheric Corrosion": 0.0,
                            "Erosion Corrosion": 2.0,
                            "Fatigue Corrosion": 1.0,
                            "Pitting Corrosion": 0.0,
                            "Stress Corrosion": 2.0,
                            "Year": 2008
                        },
                        {
                "Atmospheric Corrosion": 1.0,
                            "Erosion Corrosion": 1.0,
                            "Fatigue Corrosion": 4.0,
                            "Pitting Corrosion": 0.0,
                            "Stress Corrosion": 0.0,
                            "Year": 2009
                        },
                        {
                "Atmospheric Corrosion": 0.0,
                            "Erosion Corrosion": 2.0,
                            "Fatigue Corrosion": 0.0,
                            "Pitting Corrosion": 2.0,
                            "Stress Corrosion": 1.0,
                            "Year": 2010
                        },
                        {
                "Atmospheric Corrosion": 0.0,
                            "Erosion Corrosion": 2.0,
                            "Fatigue Corrosion": 0.0,
                            "Pitting Corrosion": 2.0,
                            "Stress Corrosion": 0.0,
                            "Year": 2011
                        },
                        {
                "Atmospheric Corrosion": 4.0,
                            "Erosion Corrosion": 0.0,
                            "Fatigue Corrosion": 0.0,
                            "Pitting Corrosion": 2.0,
                            "Stress Corrosion": 0.0,
                            "Year": 2012
                        },
                        {
                "Atmospheric Corrosion": 2.0,
                            "Erosion Corrosion": 0.0,
                            "Fatigue Corrosion": 1.0,
                            "Pitting Corrosion": 0.0,
                            "Stress Corrosion": 1.0,
                            "Year": 2013
                        },
                        {
                "Atmospheric Corrosion": 1.0,
                            "Erosion Corrosion": 0.0,
                            "Fatigue Corrosion": 1.0,
                            "Pitting Corrosion": 3.0,
                            "Stress Corrosion": 0.0,
                            "Year": 2014
                        },
                        {
                "Atmospheric Corrosion": 1.0,
                            "Erosion Corrosion": 5.0,
                            "Fatigue Corrosion": 0.0,
                            "Pitting Corrosion": 1.0,
                            "Stress Corrosion": 0.0,
                            "Year": 2015
                        },
                        {
                "Atmospheric Corrosion": 0.0,
                            "Erosion Corrosion": 1.0,
                            "Fatigue Corrosion": 1.0,
                            "Pitting Corrosion": 0.0,
                            "Stress Corrosion": 0.0,
                            "Year": 2016
                        },
                        {
                "Atmospheric Corrosion": 1.0,
                            "Erosion Corrosion": 2.0,
                            "Fatigue Corrosion": 0.0,
                            "Pitting Corrosion": 2.0,
                            "Stress Corrosion": 0.0,
                            "Year": 2017
                        },
                        {
                "Atmospheric Corrosion": 1.0,
                            "Erosion Corrosion": 2.0,
                            "Fatigue Corrosion": 0.0,
                            "Pitting Corrosion": 0.0,
                            "Stress Corrosion": 0.0,
                            "Year": 2018
                        },
                        {
                "Atmospheric Corrosion": 1.0,
                            "Erosion Corrosion": 2.0,
                            "Fatigue Corrosion": 3.0,
                            "Pitting Corrosion": 2.0,
                            "Stress Corrosion": 0.0,
                            "Year": 2019
                        },
                        {
                "Atmospheric Corrosion": 0.0,
                            "Erosion Corrosion": 4.0,
                            "Fatigue Corrosion": 3.0,
                            "Pitting Corrosion": 2.0,
                            "Stress Corrosion": 0.0,
                            "Year": 2020
                        },
                        {
                "Atmospheric Corrosion": 2.0,
                            "Erosion Corrosion": 4.0,
                            "Fatigue Corrosion": 1.0,
                            "Pitting Corrosion": 1.0,
                            "Stress Corrosion": 0.0,
                            "Year": 2021
                        },
                        {
                "Atmospheric Corrosion": 0.0,
                            "Erosion Corrosion": 1.0,
                            "Fatigue Corrosion": 1.0,
                            "Pitting Corrosion": 1.0,
                            "Stress Corrosion": 0.0,
                            "Year": 2022
                        },
                        {
                "Atmospheric Corrosion": 1.0,
                            "Erosion Corrosion": 0.0,
                            "Fatigue Corrosion": 0.0,
                            "Pitting Corrosion": 1.0,
                            "Stress Corrosion": 0.0,
                            "Year": 2023
              }
            ]
          },
          "scatterChartData": {
                    "Analysis": [
                        "Erosion Corrosion and Pitting Corrosion have the highest total cost and total downtime.",
                        "Fatigue Corrosion has a high total cost but a moderate total downtime.",
                        "Stress Corrosion has a low total cost but a low total downtime.",
                        "Atmospheric Corrosion has a low total cost and a moderate total downtime.",
                        "There is no data for corrosion types with no severity.",
                        "The severity of corrosion varies greatly, with some types having high severity and others having no severity.",
                        "There is no clear correlation between the type of corrosion and the cost or downtime over the years."
                    ],
                    "Scatter Chart Data": [
                        {
                "Corrosion Type": "Erosion Corrosion",
                            "Severity": "Moderate",
                            "Total Cost": "44600.00",
                            "Total Downtime": 21.0
                        },
                        {
                "Corrosion Type": "Pitting Corrosion",
                            "Severity": "Moderate",
                            "Total Cost": "22300.00",
                            "Total Downtime": 10.0
                        },
                        {
                "Corrosion Type": "Fatigue Corrosion",
                            "Severity": "High",
                            "Total Cost": "21500.00",
                            "Total Downtime": 8.0
                        },
                        {
                "Corrosion Type": "Fatigue Corrosion",
                            "Severity": "Moderate",
                            "Total Cost": "17700.00",
                            "Total Downtime": 8.0
                        },
                        {
                "Corrosion Type": "Erosion Corrosion",
                            "Severity": "High",
                            "Total Cost": "13500.00",
                            "Total Downtime": 7.0
                        },
                        {
                "Corrosion Type": "Pitting Corrosion",
                            "Severity": "Low",
                            "Total Cost": "10900.00",
                            "Total Downtime": 10.0
                        },
                        {
                "Corrosion Type": "Atmospheric Corrosion",
                            "Severity": "Low",
                            "Total Cost": "9800.00",
                            "Total Downtime": 14.0
                        },
                        {
                "Corrosion Type": "Stress Corrosion",
                            "Severity": "High",
                            "Total Cost": "5000.00",
                            "Total Downtime": 2.0
                        },
                        {
                "Corrosion Type": "Stress Corrosion",
                            "Severity": "Moderate",
                            "Total Cost": "2500.00",
                            "Total Downtime": 1.0
                        },
                        {
                "Corrosion Type": "Atmospheric Corrosion",
                            "Severity": "Moderate",
                            "Total Cost": "1200.00",
                            "Total Downtime": 1.0
                        },
                        {
                "Corrosion Type": "Stress Corrosion",
                            "Severity": "Low",
                            "Total Cost": "1000.00",
                            "Total Downtime": 1.0
                        },
                        {
                "Corrosion Type": null,
                            "Severity": "No Severity",
                            "Total Cost": "0.00",
                            "Total Downtime": 0.0
                        }
            ]
          }
        }
      }
    //   setTimeout(() => {
    //     setInsightsLoading(false);
    // }, 3000);
      console.log('API response:', response.data);
      setInsightsTable(response.data);
      const measures = response.data.analysis["Remedial Measures"] || response.data.analysis["Preventive Measures"];
      console.log(measures);
      setrootCauseAnalysis(response.data.analysis["Root Cause Analysis"]);
      setpreventiveMeasures(measures);
      setscatterAnalysis(response.data.scatterChartData.Analysis);

      setlineAnalysis(response.data.lineChartData.analysis);
      const currentYear = new Date().getFullYear();
      const last5YearsData = response.data.lineChartData.lineChartData.filter(item => item.Year >= currentYear - 4 && item.Year <= currentYear);
      console.log(last5YearsData)
      setlinechartdata(last5YearsData)
      const filteredData = response.data.scatterChartData["Scatter Chart Data"].filter(item => {
        return item["Corrosion Type"] !== "No Severity" &&
               item["Corrosion Type"] !== "none" &&
               item["Corrosion Type"] !== null;
      })
      setconvertedData(filteredData);
      setInsightsLoading(false);
      // }
    }
    catch (error) {
      console.log(error)
    }
  };
  const [infoModal, setShowInfoModal] = useState(false);

  const handleToggleModal = () => {
    setShowInfoModal(!infoModal);
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
  const [modalVisible, setModalVisible] = useState(false);

  const handleIconClick = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };
 const navigate = useNavigate();
 const handlePrevNav = (event) => {
  navigate('/energy'); 
};

  useEffect(() => {
    navigate('/detectionresult/chatbot');
  }, []);
  return (
    <div className="App">
      <div className='Heading-corrosion' style={{width:"400px"}}><span onClick={handlePrevNav} style={{ color: '#AD8BFF', cursor:"pointer" }}>Oil & Gas </span> / Corrosion Assistant</div>
      <div className='tab'>
        <div>
          <Link to="/detectionresult/chatbot" className="cd-nav" style={chatbotActive} onClick={() => handleColorInput("Chatbot")}> Chatbot </Link>
          <Link to="/detectionresult/incidents" className="cd-nav" style={incidentsActive} onClick={() => handleWorkorderTable()}> Incidents </Link>
          {/* <Link to="/detectionresult/insights" className="cd-nav" style={insightsActive} onClick={() => handleInsightsTable()}> Insights </Link>
          <Link to="/detectionresult/summary" className="cd-nav" style={summaryActive} onClick={() => handleColorInput("Summary")}> Summary </Link> */}
          <>
          {/* <img className='top-sum chatboticon' src={chatbot} alt='Sample' /> */}
          <Link to='/CorrosionPage'>
          <img className='top-sum chatboticon' src={refresh} alt='Sample' title="refresh" />
          </Link>
          <img className='top-sum chatboticon' src={Iicon} alt='Sample' onClick={handleToggleModal} title="Info" />
          <img className='top-sum chatboticon' src={question} alt='Sample'  onClick={handleIconClick} title="Recommended Questions"/>
          </>

          {infoModal && (
            <PopupModal
              onClose={() => setShowInfoModal(false)}
            />
          )}
          
          {modalVisible && <CorrosionQuest onClose={closeModal} />}
          {/* {quesModal && (
            <QuesPopupModal
              onClose={() => setShowQuesModal(false)}
            />
          )} */}
          <br />
        </div>
      </div>
      <Outlet />
      <Routes>
        {/* <Route path="/detectionresult" > */}
        {/* <Route index element={<Summary />} />  */}
        <Route path="/summary" element={<Summary />} />
        <Route path="/insights" element={<Insights data={insightsTable} loading={insightsLoading} rootCauseAnalysis={rootCauseAnalysis} preventiveMeasures={preventiveMeasures} scatterAnalysis={scatterAnalysis} lineAnalysis={lineAnalysis} convertedData={convertedData} linechartdata={linechartdata} />} />
        <Route path="/incidents" element={<Incidents data={workorderTable} loading={workorderLoading} />} />
        <Route path="/chatbot" element={<Chatbot />} />
        {/* </Route> */}
      </Routes>
    </div>
  );
}

export default App;