import React, { useState, useEffect, useRef } from 'react';
import { BrowserRouter as Router, Link } from 'react-router-dom';
import bplamFrame from '../images/image 41-bplam.svg'
import '../Drilling_Operation_Assistant/Doa.css';
import './bplam.css';
import Iicon from '../images/Group 3440.svg'
import plus from '../images/Group 3205.svg';
import filter from '../images/XMLID_6_.svg';
import downarrow from '../images/Business_sale_drop_loss.svg';
import search from '../images/XMLID_223_.svg';
import calender from '../images/Calender.svg';
import calender_tile from '../images/Calender_bplam_in_tile.svg';
import upload from '../images/Group 3296.svg';
import close1 from '../images/Group 3206.svg';
import report from '../images/Report.svg';
import Rig from '../Drilling_Operation_Assistant/Rig';
import axios from 'axios';
import chatbot from '../images/Group 3439.svg';
import Chatbot from './BPLAM_Chatbot.js';
import Info from '../Info.js';
import Barchart from '../Drilling_Operation_Assistant/BarChart.js';
import Linechart from '../Drilling_Operation_Assistant/LineGraph.js';
import Piechart from '../Drilling_Operation_Assistant/PieChart.js';
import Table from 'react-bootstrap/Table';
import users from '../images/account_circle_white.svg';
// import users from '../images/Username copy.svg';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import AnalysisBPLAM from './AnalysisBPLAM.js';
import refresh from '../images/Group 3139.svg';
// import Company_name from '../images/industry_bplam.svg';
import Company_name from '../images/Industry_factory_icon_bplam.svg';
import TableResponse from "./TableResponsebplam";
import { Bar, Pie } from "react-chartjs-2";
import { Line } from "react-chartjs-2";
import Form from 'react-bootstrap/Form';


function Bplam1() {
    const [value, setValue] = React.useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [recentAnalysisDocsData, setrecentAnalysisDocsData] = useState([]);
    const [tabsShow, setTabsShow] = useState(false);
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
    const [uploadKey, setUploadKey] = useState('');
    const [options, setOptions] = useState([]);


    const getBackgroundColor = (index) => {
        const colors = [
            "#8884d8",
            "rgba(99, 31, 225, 0.826)",
            "#ffc658",
            "#82ca9d",
            "rgba(51, 184, 237, 0.712)",
            "green",
            "yellow",
        ];

        // Use modulo operator to cycle through colors if there are more data points than colors
        return colors[index % colors.length];
    };

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
                return value == "In-Progress" ? item.status == value : (item.status ? item.status == value : item.status == null);
            });
            setFilteredAnalysisDocsData(filteredResult);
            setFilterMode(true);
        }
        // else if (type === "Period" && value) {
        //     console.log("period")
        //     const formattedDate =
        //         value.getDate().toString().padStart(2, '0') +
        //         (value.getMonth() + 1).toString().padStart(2, '0') +
        //         value.getFullYear().toString().slice(2);
        //     console.log(formattedDate);
        //     const filteredResult = recentAnalysisDocsData.filter(item => {
        //         return item.creation_date === formattedDate;
        //     });
        //     console.log(filteredResult);
        //     setFilteredAnalysisDocsData(filteredResult);
        // }
        else if (type === "Period" && value) {
            console.log("period")
            // const formattedDate =
            //     value.getDate().toString().padStart(2, '0') +
            //     (value.getMonth() + 1).toString().padStart(2, '0') +
            //     value.getFullYear().toString().slice(2);
            const originalDate = new Date(value);
            const day = originalDate.getDate();
            const month = originalDate.toLocaleString('default', { month: 'short' });
            const year = originalDate.getFullYear();
            const formattedDateString = `${day} ${month} ${year}`;
            console.log(formattedDateString);
            const filteredResult = recentAnalysisDocsData.filter(item => {
                console.log(item.creation_date)
                return item.creation_date === formattedDateString;
            });
            console.log(filteredResult);
            setFilteredAnalysisDocsData(filteredResult);
        }
        else if (type === "Text") {
            const filteredResult = recentAnalysisDocsData.filter(item => {
                return value ? item.title.toLowerCase().includes(value.toLowerCase()) : item;
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
        setSelectedFiles(e.target.files[0]);
        // const selectedFiles_var = Array.from(e.target.files);
        // console.log(selectedFiles_var);
        // setSelectedFiles(selectedFiles_var);
        await handleUpload(e.target.files[0]);
        setfileuploaded(true);
    };

    const handleTitleChange = (e) => {
        e.stopPropagation();
        setTitle(e.target.value.slice(0, 40));
    };

    const handleReportTypeChange = (e) => {
        e.stopPropagation();
        setReportType(e.target.value);
    };
    const handleUpload = async (selectedFiles_var) => {
        if (selectedFiles_var && title) {
            try {
                const formData = new FormData();
                // selectedFiles_var.forEach((file, index) => {
                //     console.log(index)
                //     formData.append(`file`, file);
                // });
                formData.append(`file`, selectedFiles_var);
                formData.append(`title`, title);
                formData.append(`company`, reportType);
                console.log(selectedFiles_var);
                setfileuploading(true);
                const response = await axios.post('http://98.64.75.151:5000/upload_file', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });
                console.log('API response:', response.data);
                const upload_response = response.data;
                seUploadresponse(upload_response);
                setfileuploading(false);
                if (response.data.message === "Success") {

                    console.log('File uploaded successfully!')
                    console.log(upload_response);
                    const unique_key = upload_response.response.find(item => item.unique_key)?.unique_key;
                    console.log(unique_key)
                    setUploadKey(unique_key)
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
        if (title === '' && reportType === '') {
            alert('Either Title or Company is blank')
        }
        else if (fileuploaded === false) {
            alert('File is not uploaded')
        }
        else {
            try {
                console.log(uploadKey);
                const currentDate = new Date();
                const day = String(currentDate.getDate()).padStart(2, '0');
                const month = String(currentDate.getMonth() + 1).padStart(2, '0');
                const year = currentDate.getFullYear();
                const time = `${day}${month}${year}`
                console.log(time);
                // const progressdata = { "creation_date": time, "title": title, "company": "Chevron", "status": "In-Progress", unique_key: uploadKey };
                const progressdata = { "creation_date": time, "title": title, "company": reportType, "status": "In-Progress", unique_key: uploadKey };
                const newArray = [progressdata, ...recentAnalysisDocsData];
                setrecentAnalysisDocsData(newArray);
                setShow(false);
                setTitle("");
                setReportType("");
                console.log(recentAnalysisDocsData);
                console.log(uploadresponse);
                const generate_pdf_request = {
                    key: uploadKey
                }
                console.log(generate_pdf_request);

                const generate_pdf_response = await axios.post('http://98.64.75.151:5000/start_analysis', generate_pdf_request, {
                    headers: {
                        'Content-Type': 'application/json',
                    }
                });
                setfileuploaded(false)
                newArray[0].status = "Completed";
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
        }
    };

    const Loading = () => {
        return (
            <div className="loader-bplam" style={{ marginTop: "-40px" }}>
                <div className="dot-cq-bplam red-c-bplam" style={{ backgroundColor: '#5858FF' }}></div>
                <div className="dot-cq-bplam green-c-bplam" style={{ backgroundColor: '#00ADEB' }}></div>
                <div className="dot-cq-bplam blue-c-bplam" style={{ backgroundColor: '#00F2C2' }}></div>
            </div>
        );
        ;
    };
    const recentAnalysisDocs = async () => {
        try {
            // if (Array.isArray(recentAnalysisDocsData) && recentAnalysisDocsData.length === 0) {
            const response = await axios.get('http://98.64.75.151:5000/get_recent_docids');
            // const response = {"data": {
            //     "data": [
            //         {
            //             "CreatedBy": "Admin",
            //             "CurrentTimestamp": "301123",
            //             "DocID": "b8073828-f2ec-410a-8cdf-ead101019103",
            //             "FileName": "Evening_Drilling_Report_2.pdf",
            //             "ReportDatetime": null,
            //             "ReportType": "evening",
            //             "Title": "Drilling_report_1130"
            //         },
            //         {
            //             "CreatedBy": "ABC Ltd.",
            //             "CurrentTimestamp": "291123",
            //             "DocID": "aa4a1ba0-e747-4ea4-8b7b-ade9388d97b2",
            //             "FileName": "Evening_Drilling_Report_2.pdf",
            //             "ReportDatetime": null,
            //             "ReportType": "Evening Report",
            //             "Title": "Evening_Drilling_Report 2nd Jan"
            //         }
            //     ],
            //     "message": "Success",
            //     "status_code": 200
            // }}
            console.log(response);
            const result = response.data.doclist;
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


    const [jsonResponse, setJsonResponse] = useState(null);
    const [jsonResponse2, setJsonResponse2] = useState(null);
    const [jsonResponse3, setJsonResponse3] = useState(null);
    const [heatmapData, setHeatmapData] = useState(null);

    const getAnalysis = async (docId) => {
        try {
            setUploadKey(docId);
            console.log(uploadKey)
            const apiresponse = await axios.post('http://98.64.75.151:5000/get_analysis', {
                key: docId
            }, {
                headers: {
                    'Content-Type': 'application/json',
                }
            });
            const response = apiresponse.data;
            // const response =
            // {
            //     "message": "Success",
            //     "response": [
            //         {
            //             "content": {
            //                 "date_range": {
            //                     "end": "24-Sep-21",
            //                     "start": "01-Oct-21"
            //                 },
            //                 "drilldowns": [
            //                     {
            //                         "label": "Plan & Manage the Enterprise",
            //                         "level2": [
            //                             {
            //                                 "label": "Enterprise Strategy  & Performance Management",
            //                                 "level3": [
            //                                     {
            //                                         "label": "Enterprise Strategy Management",
            //                                         "pid": "1.1.1",
            //                                         "value": 0
            //                                     },
            //                                     {
            //                                         "label": "Enterprise Performance Management",
            //                                         "pid": "1.1.2",
            //                                         "value": 0
            //                                     },
            //                                     {
            //                                         "label": "Enterprise EH&S Strategy Management",
            //                                         "pid": "1.1.3",
            //                                         "value": 0
            //                                     }
            //                                 ],
            //                                 "pid": "1.1",
            //                                 "value": 0
            //                             },
            //                             {
            //                                 "label": "Portfolio Management",
            //                                 "level3": [
            //                                     {
            //                                         "label": "Portfolio Strategy Management",
            //                                         "pid": "1.2.1",
            //                                         "value": 0
            //                                     },
            //                                     {
            //                                         "label": "Portfolio Assessment & Controlling",
            //                                         "pid": "1.2.2",
            //                                         "value": 0
            //                                     },
            //                                     {
            //                                         "label": "Opportunity Identification & Management",
            //                                         "pid": "1.2.3",
            //                                         "value": 0
            //                                     }
            //                                 ],
            //                                 "pid": "1.2",
            //                                 "value": 0
            //                             },
            //                             {
            //                                 "label": "Enterprise Risk Management",
            //                                 "level3": [
            //                                     {
            //                                         "label": "Financial Risk Management",
            //                                         "pid": "1.3.1",
            //                                         "value": 0
            //                                     },
            //                                     {
            //                                         "label": "Non-Financial Risk Management",
            //                                         "pid": "1.3.2",
            //                                         "value": 0
            //                                     },
            //                                     {
            //                                         "label": "Insurance Management",
            //                                         "pid": "1.3.3",
            //                                         "value": 0
            //                                     },
            //                                     {
            //                                         "label": "EH&S Governance",
            //                                         "pid": "1.3.4",
            //                                         "value": 0
            //                                     }
            //                                 ],
            //                                 "pid": "1.3",
            //                                 "value": 0
            //                             },
            //                             {
            //                                 "label": "Stakeholder Relationship Management",
            //                                 "level3": [
            //                                     {
            //                                         "label": "Stakeholder Identification",
            //                                         "pid": "1.4.1",
            //                                         "value": 0
            //                                     },
            //                                     {
            //                                         "label": "Stakeholder Interaction",
            //                                         "pid": "1.4.2",
            //                                         "value": 0
            //                                     }
            //                                 ],
            //                                 "pid": "1.4",
            //                                 "value": 0
            //                             },
            //                             {
            //                                 "label": "Business & Competitive Intelligence",
            //                                 "level3": [
            //                                     {
            //                                         "label": "Business Intelligence",
            //                                         "pid": "1.5.1",
            //                                         "value": 0
            //                                     },
            //                                     {
            //                                         "label": "Competitive Intelligence",
            //                                         "pid": "1.5.2",
            //                                         "value": 0
            //                                     }
            //                                 ],
            //                                 "pid": "1.5",
            //                                 "value": 0
            //                             }
            //                         ],
            //                         "pid": "1",
            //                         "value": 0
            //                     },
            //                     {
            //                         "label": "Upstream Core Operations",
            //                         "level2": [
            //                             {
            //                                 "label": "Exploration Management",
            //                                 "level3": [
            //                                     {
            //                                         "label": "Basin Evaluation",
            //                                         "pid": "2.1.1",
            //                                         "value": 0
            //                                     },
            //                                     {
            //                                         "label": "Seismic Acquisition & Processing",
            //                                         "pid": "2.1.2",
            //                                         "value": 0
            //                                     },
            //                                     {
            //                                         "label": "Exploration Data Interpretation",
            //                                         "pid": "2.1.3",
            //                                         "value": 0
            //                                     },
            //                                     {
            //                                         "label": "Geological Interpretation",
            //                                         "pid": "2.1.4",
            //                                         "value": 0
            //                                     }
            //                                 ],
            //                                 "pid": "2.1",
            //                                 "value": 0
            //                             },
            //                             {
            //                                 "label": "Wells & Field Development",
            //                                 "level3": [
            //                                     {
            //                                         "label": "Well Design",
            //                                         "pid": "2.2.1",
            //                                         "value": 0
            //                                     },
            //                                     {
            //                                         "label": "Well Planning & Performance Mgmt",
            //                                         "pid": "2.2.2",
            //                                         "value": 0
            //                                     },
            //                                     {
            //                                         "label": "Well Operations",
            //                                         "pid": "2.2.3",
            //                                         "value": 0
            //                                     }
            //                                 ],
            //                                 "pid": "2.2",
            //                                 "value": 0
            //                             },
            //                             {
            //                                 "label": "Production Operations",
            //                                 "level3": [
            //                                     {
            //                                         "label": "Production Ops. Activities",
            //                                         "pid": "2.3.1",
            //                                         "value": 0
            //                                     },
            //                                     {
            //                                         "label": "Production Ops. Engineering",
            //                                         "pid": "2.3.2",
            //                                         "value": 0
            //                                     },
            //                                     {
            //                                         "label": "Production Ops. Management",
            //                                         "pid": "2.3.3",
            //                                         "value": 0
            //                                     },
            //                                     {
            //                                         "label": "Reservoir Engineering",
            //                                         "pid": "2.3.4",
            //                                         "value": 0
            //                                     },
            //                                     {
            //                                         "label": "Integrated Gas Operations",
            //                                         "pid": "2.3.5",
            //                                         "value": 0
            //                                     }
            //                                 ],
            //                                 "pid": "2.3",
            //                                 "value": 0
            //                             },
            //                             {
            //                                 "label": "Technology & Engineering",
            //                                 "level3": [
            //                                     {
            //                                         "label": "Research & Development",
            //                                         "pid": "2.4.1",
            //                                         "value": 0
            //                                     },
            //                                     {
            //                                         "label": "Engineering Management",
            //                                         "pid": "2.4.2",
            //                                         "value": 0
            //                                     },
            //                                     {
            //                                         "label": "Process Engineering",
            //                                         "pid": "2.4.3",
            //                                         "value": 0
            //                                     },
            //                                     {
            //                                         "label": "Project Engineering",
            //                                         "pid": "2.4.4",
            //                                         "value": 0
            //                                     },
            //                                     {
            //                                         "label": "Process Automation",
            //                                         "pid": "2.4.5",
            //                                         "value": 0
            //                                     },
            //                                     {
            //                                         "label": "Technical Knowledge Management",
            //                                         "pid": "2.4.6",
            //                                         "value": 0
            //                                     }
            //                                 ],
            //                                 "pid": "2.4",
            //                                 "value": 0
            //                             },
            //                             {
            //                                 "label": "Decommissioning",
            //                                 "level3": [
            //                                     {
            //                                         "label": "Late Life and Decom Planning",
            //                                         "pid": "2.5.1",
            //                                         "value": 0
            //                                     },
            //                                     {
            //                                         "label": "Decom Preparation",
            //                                         "pid": "2.5.2",
            //                                         "value": 0
            //                                     },
            //                                     {
            //                                         "label": "Removal & Disposal",
            //                                         "pid": "2.5.3",
            //                                         "value": 0
            //                                     },
            //                                     {
            //                                         "label": "Continuing Liability",
            //                                         "pid": "2.5.4",
            //                                         "value": 0
            //                                     }
            //                                 ],
            //                                 "pid": "2.5",
            //                                 "value": 0
            //                             },
            //                             {
            //                                 "label": "Hydrocarbon & Commercial Management",
            //                                 "level3": [
            //                                     {
            //                                         "label": "Integrated Business Planning",
            //                                         "pid": "2.6.1",
            //                                         "value": 0
            //                                     },
            //                                     {
            //                                         "label": "Production Forecasting & Planning",
            //                                         "pid": "2.6.2",
            //                                         "value": 0
            //                                     },
            //                                     {
            //                                         "label": "Production Accounting",
            //                                         "pid": "2.6.3",
            //                                         "value": 0
            //                                     },
            //                                     {
            //                                         "label": "Ownership",
            //                                         "pid": "2.6.4",
            //                                         "value": 0
            //                                     },
            //                                     {
            //                                         "label": "Revenue Accounting Management",
            //                                         "pid": "2.6.5",
            //                                         "value": 0
            //                                     }
            //                                 ],
            //                                 "pid": "2.6",
            //                                 "value": 0
            //                             },
            //                             {
            //                                 "label": "Asset & Integrity Management",
            //                                 "level3": [
            //                                     {
            //                                         "label": "Maintenance Strategy Definition",
            //                                         "pid": "2.7.1",
            //                                         "value": 0
            //                                     },
            //                                     {
            //                                         "label": "Maintenance Sourcing and Contractor Management",
            //                                         "pid": "2.7.2",
            //                                         "value": 0
            //                                     },
            //                                     {
            //                                         "label": "Equipment Strategy Development",
            //                                         "pid": "2.7.3",
            //                                         "value": 0
            //                                     },
            //                                     {
            //                                         "label": "Maintenance Planning & Scheduling",
            //                                         "pid": "2.7.4",
            //                                         "value": 0
            //                                     },
            //                                     {
            //                                         "label": "Maintenance Execution",
            //                                         "pid": "2.7.5",
            //                                         "value": 0
            //                                     },
            //                                     {
            //                                         "label": "Work & Asset Performance Monitoring",
            //                                         "pid": "2.7.6",
            //                                         "value": 0
            //                                     },
            //                                     {
            //                                         "label": "Turnaround & Shutdown Management",
            //                                         "pid": "2.7.7",
            //                                         "value": 0
            //                                     }
            //                                 ],
            //                                 "pid": "2.7",
            //                                 "value": 0
            //                             },
            //                             {
            //                                 "label": "Health, Safety, Security and Environment (HSSE)",
            //                                 "level3": [
            //                                     {
            //                                         "label": "HSSE Compliance Management",
            //                                         "pid": "2.8.1",
            //                                         "value": 0
            //                                     },
            //                                     {
            //                                         "label": "Industrial Health and Occupational Safety Management",
            //                                         "pid": "2.8.2",
            //                                         "value": 0
            //                                     },
            //                                     {
            //                                         "label": "Process Safety Management",
            //                                         "pid": "2.8.3",
            //                                         "value": 0
            //                                     },
            //                                     {
            //                                         "label": "Personnel Safety Management",
            //                                         "pid": "2.8.4",
            //                                         "value": 0
            //                                     },
            //                                     {
            //                                         "label": "Product Stewardship Management",
            //                                         "pid": "2.8.5",
            //                                         "value": 0
            //                                     },
            //                                     {
            //                                         "label": "Environmental Management",
            //                                         "pid": "2.8.6",
            //                                         "value": 0
            //                                     },
            //                                     {
            //                                         "label": "HSSE Risk Management",
            //                                         "pid": "2.8.7",
            //                                         "value": 0
            //                                     },
            //                                     {
            //                                         "label": "HSSE Strategy and Planning",
            //                                         "pid": "2.8.8",
            //                                         "value": 0
            //                                     },
            //                                     {
            //                                         "label": "Security Management",
            //                                         "pid": "2.8.9",
            //                                         "value": 0
            //                                     }
            //                                 ],
            //                                 "pid": "2.8",
            //                                 "value": 0
            //                             }
            //                         ],
            //                         "pid": "2",
            //                         "value": 0
            //                     },
            //                     {
            //                         "label": "Commercial Management",
            //                         "level2": [
            //                             {
            //                                 "label": "Trading and Contract Management",
            //                                 "level3": [
            //                                     {
            //                                         "label": "Market Analysis",
            //                                         "pid": "4.1.1",
            //                                         "value": 0
            //                                     },
            //                                     {
            //                                         "label": "Trade Capture & Execution",
            //                                         "pid": "4.1.2",
            //                                         "value": 0
            //                                     },
            //                                     {
            //                                         "label": "Position Management",
            //                                         "pid": "4.1.3",
            //                                         "value": 0
            //                                     },
            //                                     {
            //                                         "label": "Portfolio Management",
            //                                         "pid": "4.1.4",
            //                                         "value": 0
            //                                     },
            //                                     {
            //                                         "label": "Contract & Customer Management",
            //                                         "pid": "4.1.5",
            //                                         "value": 0
            //                                     }
            //                                 ],
            //                                 "pid": "4.1",
            //                                 "value": 0
            //                             },
            //                             {
            //                                 "label": "Commodity Risk Management",
            //                                 "level3": [
            //                                     {
            //                                         "label": "Business Control",
            //                                         "pid": "4.2.1",
            //                                         "value": 0
            //                                     },
            //                                     {
            //                                         "label": "Delegation of Authority",
            //                                         "pid": "4.2.2",
            //                                         "value": 0
            //                                     },
            //                                     {
            //                                         "label": "Market Risk Management",
            //                                         "pid": "4.2.3",
            //                                         "value": 0
            //                                     },
            //                                     {
            //                                         "label": "Credit Risk Management",
            //                                         "pid": "4.2.4",
            //                                         "value": 0
            //                                     },
            //                                     {
            //                                         "label": "Regulatory Reporting",
            //                                         "pid": "4.2.5",
            //                                         "value": 0
            //                                     }
            //                                 ],
            //                                 "pid": "4.2",
            //                                 "value": 0
            //                             },
            //                             {
            //                                 "label": "Scheduling and Logistics Contract Management – Pipelines",
            //                                 "level3": [
            //                                     {
            //                                         "label": "Schedule & Confirm nomination",
            //                                         "pid": "4.3.1",
            //                                         "value": 0
            //                                     },
            //                                     {
            //                                         "label": "Transport Agreement Management",
            //                                         "pid": "4.3.2",
            //                                         "value": 0
            //                                     },
            //                                     {
            //                                         "label": "Imbalance Management",
            //                                         "pid": "4.3.3",
            //                                         "value": 0
            //                                     },
            //                                     {
            //                                         "label": "Secondary Cost / Rates & Fees",
            //                                         "pid": "4.3.4",
            //                                         "value": 0
            //                                     },
            //                                     {
            //                                         "label": "Pipeline Position Management",
            //                                         "pid": "4.3.5",
            //                                         "value": 0
            //                                     }
            //                                 ],
            //                                 "pid": "4.3",
            //                                 "value": 0
            //                             },
            //                             {
            //                                 "label": "Scheduling and Logistics Contract Management – Bulk Movement",
            //                                 "level3": [
            //                                     {
            //                                         "label": "Schedule & Confirm nomination",
            //                                         "pid": "4.4.1",
            //                                         "value": 0
            //                                     },
            //                                     {
            //                                         "label": "Transport Agreement Management",
            //                                         "pid": "4.4.2",
            //                                         "value": 0
            //                                     },
            //                                     {
            //                                         "label": "Freight Management",
            //                                         "pid": "4.4.3",
            //                                         "value": 0
            //                                     },
            //                                     {
            //                                         "label": "Claim Management/ Demurrage",
            //                                         "pid": "4.4.4",
            //                                         "value": 0
            //                                     }
            //                                 ],
            //                                 "pid": "4.4",
            //                                 "value": 0
            //                             },
            //                             {
            //                                 "label": "Settlement & Accounting",
            //                                 "level3": [
            //                                     {
            //                                         "label": "Settlement",
            //                                         "pid": "4.5.1",
            //                                         "value": 0
            //                                     },
            //                                     {
            //                                         "label": "Accounting",
            //                                         "pid": "4.5.2",
            //                                         "value": 0
            //                                     },
            //                                     {
            //                                         "label": "Confirmation",
            //                                         "pid": "4.5.3",
            //                                         "value": 0
            //                                     }
            //                                 ],
            //                                 "pid": "4.5",
            //                                 "value": 0
            //                             }
            //                         ],
            //                         "pid": "4",
            //                         "value": 0
            //                     },
            //                     {
            //                         "label": "Hydrocarbon Supply Chain Management",
            //                         "level2": [
            //                             {
            //                                 "label": "Storage Operations Management",
            //                                 "level3": [
            //                                     {
            //                                         "label": "Planning & Scheduling",
            //                                         "pid": "5.1.1",
            //                                         "value": 0
            //                                     },
            //                                     {
            //                                         "label": "Storage/ Transportion",
            //                                         "pid": "5.1.2",
            //                                         "value": 0
            //                                     }
            //                                 ],
            //                                 "pid": "5.1",
            //                                 "value": 0
            //                             },
            //                             {
            //                                 "label": "Loading Operations Management",
            //                                 "level3": [
            //                                     {
            //                                         "label": "Custody transfer",
            //                                         "pid": "5.2.1",
            //                                         "value": 0
            //                                     },
            //                                     {
            //                                         "label": "Measurement & Quality Management",
            //                                         "pid": "5.2.2",
            //                                         "value": 0
            //                                     }
            //                                 ],
            //                                 "pid": "5.2",
            //                                 "value": 0
            //                             }
            //                         ],
            //                         "pid": "5",
            //                         "value": 0
            //                     },
            //                     {
            //                         "label": "Non-Hydrocarbon Supply Chain Management",
            //                         "level2": [
            //                             {
            //                                 "label": "Supply Chain Strategy",
            //                                 "level3": [
            //                                     {
            //                                         "label": "Strategy Development & Deployment",
            //                                         "pid": "8.1.1",
            //                                         "value": 0
            //                                     },
            //                                     {
            //                                         "label": "Monitoring & Improvement of End to End Execution",
            //                                         "pid": "8.1.2",
            //                                         "value": 0
            //                                     }
            //                                 ],
            //                                 "pid": "8.1",
            //                                 "value": 0
            //                             },
            //                             {
            //                                 "label": "Requirements Planning",
            //                                 "level3": [
            //                                     {
            //                                         "label": "Planning Master Data Management",
            //                                         "pid": "8.2.1",
            //                                         "value": 0
            //                                     },
            //                                     {
            //                                         "label": "Capital Project Requirements Planning",
            //                                         "pid": "8.2.2",
            //                                         "value": 0
            //                                     },
            //                                     {
            //                                         "label": "MRO / Spare Parts Requirements Planning",
            //                                         "pid": "8.2.3",
            //                                         "value": 0
            //                                     },
            //                                     {
            //                                         "label": "Inventory & Transportation Planning",
            //                                         "pid": "8.2.4",
            //                                         "value": 0
            //                                     },
            //                                     {
            //                                         "label": "Integrate Demand & Supply Plans",
            //                                         "pid": "8.2.5",
            //                                         "value": 0
            //                                     },
            //                                     {
            //                                         "label": "Repairs & Disposition Planning",
            //                                         "pid": "8.2.6",
            //                                         "value": 0
            //                                     }
            //                                 ],
            //                                 "pid": "8.2",
            //                                 "value": 0
            //                             },
            //                             {
            //                                 "label": "Sourcing & Procurement",
            //                                 "level3": [
            //                                     {
            //                                         "label": "Develop & Maintain Procurement Strategy",
            //                                         "pid": "8.3.1",
            //                                         "value": 0
            //                                     },
            //                                     {
            //                                         "label": "Source & Manage Categories",
            //                                         "pid": "8.3.2",
            //                                         "value": 0
            //                                     },
            //                                     {
            //                                         "label": "Capital Project Sourcing",
            //                                         "pid": "8.3.3",
            //                                         "value": 0
            //                                     },
            //                                     {
            //                                         "label": "Manage Supplier Contracts",
            //                                         "pid": "8.3.4",
            //                                         "value": 0
            //                                     },
            //                                     {
            //                                         "label": "Manage Supplier Relationships",
            //                                         "pid": "8.3.5",
            //                                         "value": 0
            //                                     },
            //                                     {
            //                                         "label": "Manage Procurement Master Data",
            //                                         "pid": "8.3.6",
            //                                         "value": 0
            //                                     }
            //                                 ],
            //                                 "pid": "8.3",
            //                                 "value": 0
            //                             },
            //                             {
            //                                 "label": "Warehousing & logistics",
            //                                 "level3": [
            //                                     {
            //                                         "label": "Fulfillment Strategy",
            //                                         "pid": "8.4.1",
            //                                         "value": 0
            //                                     },
            //                                     {
            //                                         "label": "Inventory Management",
            //                                         "pid": "8.4.2",
            //                                         "value": 0
            //                                     },
            //                                     {
            //                                         "label": "Transportation Management",
            //                                         "pid": "8.4.3",
            //                                         "value": 0
            //                                     },
            //                                     {
            //                                         "label": "Warehousing & Distribution Operations Management",
            //                                         "pid": "8.4.4",
            //                                         "value": 0
            //                                     },
            //                                     {
            //                                         "label": "Network Optimization",
            //                                         "pid": "8.4.5",
            //                                         "value": 0
            //                                     }
            //                                 ],
            //                                 "pid": "8.4",
            //                                 "value": 0
            //                             },
            //                             {
            //                                 "label": "Requisition to Pay",
            //                                 "level3": [
            //                                     {
            //                                         "label": "Requisition Creation",
            //                                         "pid": "8.5.1",
            //                                         "value": 0
            //                                     },
            //                                     {
            //                                         "label": "Tactical Sourcing",
            //                                         "pid": "8.5.2",
            //                                         "value": 0
            //                                     },
            //                                     {
            //                                         "label": "Order Execution",
            //                                         "pid": "8.5.3",
            //                                         "value": 0
            //                                     },
            //                                     {
            //                                         "label": "Receipt Processing",
            //                                         "pid": "8.5.4",
            //                                         "value": 0
            //                                     },
            //                                     {
            //                                         "label": "Procurement Card Processing",
            //                                         "pid": "8.5.5",
            //                                         "value": 0
            //                                     },
            //                                     {
            //                                         "label": "Invoice Processing",
            //                                         "pid": "8.5.6",
            //                                         "value": 4
            //                                     }
            //                                 ],
            //                                 "pid": "8.5",
            //                                 "value": 4
            //                             },
            //                             {
            //                                 "label": "Contractor Management",
            //                                 "level3": [
            //                                     {
            //                                         "label": "Contractor Sourcing & Procurement Management",
            //                                         "pid": "8.6.1",
            //                                         "value": 0
            //                                     },
            //                                     {
            //                                         "label": "Pre-Onboard Management",
            //                                         "pid": "8.6.2",
            //                                         "value": 0
            //                                     },
            //                                     {
            //                                         "label": "Onboard Contractor Management",
            //                                         "pid": "8.6.3",
            //                                         "value": 0
            //                                     },
            //                                     {
            //                                         "label": "Contractor Travel & Accomodation Management",
            //                                         "pid": "8.6.4",
            //                                         "value": 0
            //                                     },
            //                                     {
            //                                         "label": "Work and Performance Management",
            //                                         "pid": "8.6.5",
            //                                         "value": 0
            //                                     },
            //                                     {
            //                                         "label": "Demobilization & Contract Closeout",
            //                                         "pid": "8.6.6",
            //                                         "value": 0
            //                                     }
            //                                 ],
            //                                 "pid": "8.6",
            //                                 "value": 0
            //                             }
            //                         ],
            //                         "pid": "8",
            //                         "value": 4
            //                     },
            //                     {
            //                         "label": "Enterprise Functions",
            //                         "level2": [
            //                             {
            //                                 "label": "Business Process Lifecycle Management",
            //                                 "level3": [
            //                                     {
            //                                         "label": "Process Strategy Management",
            //                                         "pid": "16.1.1",
            //                                         "value": 0
            //                                     },
            //                                     {
            //                                         "label": "Process Lifecycle Management",
            //                                         "pid": "16.1.2",
            //                                         "value": 0
            //                                     },
            //                                     {
            //                                         "label": "Process IT Management",
            //                                         "pid": "16.1.3",
            //                                         "value": 0
            //                                     },
            //                                     {
            //                                         "label": "Process Change Management",
            //                                         "pid": "16.1.4",
            //                                         "value": 0
            //                                     },
            //                                     {
            //                                         "label": "BPM Delivery",
            //                                         "pid": "16.1.5",
            //                                         "value": 0
            //                                     },
            //                                     {
            //                                         "label": "BPM Methods and Tools",
            //                                         "pid": "16.1.6",
            //                                         "value": 0
            //                                     },
            //                                     {
            //                                         "label": "BPM Operations",
            //                                         "pid": "16.1.7",
            //                                         "value": 0
            //                                     },
            //                                     {
            //                                         "label": "BPM Support",
            //                                         "pid": "16.1.8",
            //                                         "value": 0
            //                                     },
            //                                     {
            //                                         "label": "BPM Transformation",
            //                                         "pid": "16.1.9",
            //                                         "value": 0
            //                                     }
            //                                 ],
            //                                 "pid": "16.1",
            //                                 "value": 0
            //                             },
            //                             {
            //                                 "label": "Information Technology",
            //                                 "level3": [
            //                                     {
            //                                         "label": "Service Strategy",
            //                                         "pid": "16.2.1",
            //                                         "value": 0
            //                                     },
            //                                     {
            //                                         "label": "Service Development",
            //                                         "pid": "16.2.2",
            //                                         "value": 0
            //                                     },
            //                                     {
            //                                         "label": "Service Management & Operations",
            //                                         "pid": "16.2.3",
            //                                         "value": 0
            //                                     },
            //                                     {
            //                                         "label": "IT Management",
            //                                         "pid": "16.2.4",
            //                                         "value": 0
            //                                     },
            //                                     {
            //                                         "label": "Business/Customer Relationship Management",
            //                                         "pid": "16.2.5",
            //                                         "value": 0
            //                                     },
            //                                     {
            //                                         "label": "Service Transition",
            //                                         "pid": "16.2.6",
            //                                         "value": 0
            //                                     },
            //                                     {
            //                                         "label": "Supplier Relationship Management",
            //                                         "pid": "16.2.7",
            //                                         "value": 0
            //                                     }
            //                                 ],
            //                                 "pid": "16.2",
            //                                 "value": 0
            //                             },
            //                             {
            //                                 "label": "Cybersecurity",
            //                                 "level3": [
            //                                     {
            //                                         "label": "Security Governance",
            //                                         "pid": "16.3.1",
            //                                         "value": 0
            //                                     },
            //                                     {
            //                                         "label": "Security Architecture",
            //                                         "pid": "16.3.2",
            //                                         "value": 0
            //                                     },
            //                                     {
            //                                         "label": "Security Operations",
            //                                         "pid": "16.3.3",
            //                                         "value": 0
            //                                     }
            //                                 ],
            //                                 "pid": "16.3",
            //                                 "value": 0
            //                             },
            //                             {
            //                                 "label": "Human Resources & Knowledge Management",
            //                                 "level3": [
            //                                     {
            //                                         "label": "Organization Management",
            //                                         "pid": "16.4.1",
            //                                         "value": 0
            //                                     },
            //                                     {
            //                                         "label": "Talent Management",
            //                                         "pid": "16.4.2",
            //                                         "value": 0
            //                                     },
            //                                     {
            //                                         "label": "HR Service & Administration",
            //                                         "pid": "16.4.3",
            //                                         "value": 0
            //                                     },
            //                                     {
            //                                         "label": "HR Operations & Support",
            //                                         "pid": "16.4.4",
            //                                         "value": 0
            //                                     }
            //                                 ],
            //                                 "pid": "16.4",
            //                                 "value": 0
            //                             },
            //                             {
            //                                 "label": "Finance & Accounts",
            //                                 "level3": [
            //                                     {
            //                                         "label": "General Accounting & Reporting (Record to Report)",
            //                                         "pid": "16.5.1",
            //                                         "value": 0
            //                                     },
            //                                     {
            //                                         "label": "Fixed Asset Accounting",
            //                                         "pid": "16.5.2",
            //                                         "value": 0
            //                                     },
            //                                     {
            //                                         "label": "Purchase to Pay",
            //                                         "pid": "16.5.3",
            //                                         "value": 0
            //                                     },
            //                                     {
            //                                         "label": "Travel & Expenses Reimbursements (T&E)",
            //                                         "pid": "16.5.4",
            //                                         "value": 0
            //                                     },
            //                                     {
            //                                         "label": "Order to Cash",
            //                                         "pid": "16.5.5",
            //                                         "value": 0
            //                                     },
            //                                     {
            //                                         "label": "Product Costing & Inventory Accounting",
            //                                         "pid": "16.5.6",
            //                                         "value": 0
            //                                     },
            //                                     {
            //                                         "label": "Payroll (See HP Model)",
            //                                         "pid": "16.5.7",
            //                                         "value": 0
            //                                     },
            //                                     {
            //                                         "label": "Maintain Finance System & Data Structures",
            //                                         "pid": "16.5.8",
            //                                         "value": 0
            //                                     }
            //                                 ],
            //                                 "pid": "16.5",
            //                                 "value": 0
            //                             },
            //                             {
            //                                 "label": "Data & Information Management",
            //                                 "level3": [
            //                                     {
            //                                         "label": "Data Governance Management",
            //                                         "pid": "16.6.1",
            //                                         "value": 0
            //                                     },
            //                                     {
            //                                         "label": "Data Structure Management",
            //                                         "pid": "16.6.2",
            //                                         "value": 0
            //                                     },
            //                                     {
            //                                         "label": "Data Architecture Management",
            //                                         "pid": "16.6.3",
            //                                         "value": 0
            //                                     },
            //                                     {
            //                                         "label": "Master Data & Meta Data Management",
            //                                         "pid": "16.6.4",
            //                                         "value": 0
            //                                     },
            //                                     {
            //                                         "label": "Data Quality Management",
            //                                         "pid": "16.6.5",
            //                                         "value": 0
            //                                     },
            //                                     {
            //                                         "label": "Data Security Management",
            //                                         "pid": "16.6.6",
            //                                         "value": 0
            //                                     }
            //                                 ],
            //                                 "pid": "16.6",
            //                                 "value": 0
            //                             },
            //                             {
            //                                 "label": "Physical Infrastructure Management",
            //                                 "level3": [
            //                                     {
            //                                         "label": "Physical Infrastructure Strategy Management",
            //                                         "pid": "16.7.1",
            //                                         "value": 0
            //                                     },
            //                                     {
            //                                         "label": "Physical Infrastructure Operations",
            //                                         "pid": "16.7.2",
            //                                         "value": 0
            //                                     }
            //                                 ],
            //                                 "pid": "16.7",
            //                                 "value": 0
            //                             },
            //                             {
            //                                 "label": "Compliance Management & Support",
            //                                 "level3": [
            //                                     {
            //                                         "label": "Legal Services & Administration",
            //                                         "pid": "16.8.1",
            //                                         "value": 0
            //                                     },
            //                                     {
            //                                         "label": "Legal Operations & Support",
            //                                         "pid": "16.8.2",
            //                                         "value": 0
            //                                     },
            //                                     {
            //                                         "label": "EH&S Support Services",
            //                                         "pid": "16.8.3",
            //                                         "value": 0
            //                                     }
            //                                 ],
            //                                 "pid": "16.8",
            //                                 "value": 0
            //                             }
            //                         ],
            //                         "pid": "16",
            //                         "value": 0
            //                     },
            //                     {
            //                         "label": "Others",
            //                         "pid": 0,
            //                         "value": 0
            //                     }
            //                 ],
            //                 "heat_map_table": "{\"columns\":[\"Non-Hydrocarbon Supply Chain Management\",\"Total tickets\"],\"index\":[\"Access\",\"Other\",\"Total tickets\"],\"data\":[[2.0,2.0],[2.0,2.0],[4.0,4.0]]}",
            //                 "top_10_noisy_apps": {
            //                     "Adobe Sign": 19,
            //                     "Appian - EWR-PARF (Engineering Work Request-Project Activity Request Form)": 56,
            //                     "DigitCore": 4,
            //                     "Enterprise Connect": 15,
            //                     "HANA": 49,
            //                     "PARCView": 257,
            //                     "PCARD": 3,
            //                     "Petrel": 17,
            //                     "Power BI": 48,
            //                     "Primavera P6": 76
            //                 },
            //                 "total_apps": 1,
            //                 "total_tickets": 4
            //             },
            //             "filename": "screen1.json"
            //         },
            //         {
            //             "content": {
            //                 "impact_analysis_df": "{\"columns\":[\"BPL1\",\"BPL2\",\"BPL3\",\"Tool\",\"Ticket Count\",\"Key Issues Identified\",\"Business Impact\",\"Recommendations\"],\"index\":[0],\"data\":[[\"Non-Hydrocarbon Supply Chain Management\",\"Requisition to Pay\",\"Invoice Processing\",\"Adobe Sign\",4,\"['Other', 'Access']\",\"['Workflow Disruption', 'Productivity Loss', 'Quality Control', 'Data Inaccuracy']\",\"['Investigate and resolve account deactivation issue', 'Address Access Documented notice', 'Troubleshoot and fix Adobe Acrobat freezing', 'Resolve Adobe Sign signature issues', 'Provide training on Adobe Sign tool usage']\"]]}"
            //             },
            //             "filename": "screen2.json"
            //         },
            //         {
            //             "content": {
            //                 "rca_performed_tickets": 4,
            //                 "rca_resp": [
            //                     {
            //                         "Count": 2,
            //                         "Issue_Type": "Access",
            //                         "Reasons": [
            //                             "1. Account deactivation causing Adobe Sign access issue",
            //                             "2. IMS0057273 error preventing Adobe Sign access",
            //                             "3. Random Access Documented notice causing disruption",
            //                             "4. Possible system glitch causing access issues",
            //                             "5. Need for admin intervention to resolve access issues"
            //                         ]
            //                     },
            //                     {
            //                         "Count": 2,
            //                         "Issue_Type": "Other",
            //                         "Reasons": [
            //                             "1. Compatibility issues with Adobe Acrobat",
            //                             "2. Insufficient system resources causing freezing",
            //                             "3. Inadequate training on Adobe Sign usage",
            //                             "4. Inconsistent signature validation process",
            //                             "5. Lack of technical support for issue resolution"
            //                         ]
            //                     },
            //                     {
            //                         "Count": 2,
            //                         "Issue_Type": "Other",
            //                         "Reasons": [
            //                             "1. Compatibility issues with Adobe Acrobat",
            //                             "2. Insufficient system resources causing freezing",
            //                             "3. Inadequate training on Adobe Sign usage",
            //                             "4. Inconsistent signature validation process",
            //                             "5. Lack of technical support for issue resolution"
            //                         ]
            //                     },
            //                     {
            //                         "Count": 2,
            //                         "Issue_Type": "Other",
            //                         "Reasons": [
            //                             "1. Compatibility issues with Adobe Acrobat",
            //                             "2. Insufficient system resources causing freezing",
            //                             "3. Inadequate training on Adobe Sign usage",
            //                             "4. Inconsistent signature validation process",
            //                             "5. Lack of technical support for issue resolution"
            //                         ]
            //                     },
            //                     {
            //                         "Count": 2,
            //                         "Issue_Type": "Other",
            //                         "Reasons": [
            //                             "1. Compatibility issues with Adobe Acrobat",
            //                             "2. Insufficient system resources causing freezing",
            //                             "3. Inadequate training on Adobe Sign usage",
            //                             "4. Inconsistent signature validation process",
            //                             "5. Lack of technical support for issue resolution"
            //                         ]
            //                     }
            //                 ],
            //                 "total_tickets": 4
            //             },
            //             "filename": "screen3.json"
            //         }
            //     ],
            //     "status_code": 200
            // }
            console.log(response);
            // const result = response.data;
            // setRigAnalysisDocsDataData(response.data.data);
            // console.log('rigAnalysisDocs response', result)
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
            const json_response = response.response.find(item => item.filename === "screen1.json");
            setJsonResponse(json_response.content);
            if (json_response && json_response.content && json_response.content.heat_map_table) {
                const heatmapDataString = JSON.parse(json_response.content.heat_map_table);
                console.log(heatmapDataString)
                // const parsedHeatmapData = JSON.parse(heatmapDataString);
                setHeatmapData(heatmapDataString)
            } else {
                console.log("Heatmap data not found for screen1.json");
            }
            // const heatmapDataString = heatmap_response.heat_map_table
            // console.log(heatmapDataString)
            const data2 = {
                "message": "success",
                "response": {
                    "impact_analysis_df2":
                        "{\"columns\":[\"BPL1\",\"BPL2\",\"BPL3\",\"Tool\",\"Ticket Count\",\"Key Issues Identified\",\"Business Impact\",\"Recommendations\"],\"index\":[9,5,10,3,7,1,0,4,8,6,2],\"data\":[[\"Upstream Core Operations\",\"Production Operations\",\"Production Ops. Management\",\"PARCView\",257,\"['Configuration','Installation','Performance','Integration','Infrastructure','Workflow','Data','UI','Access']\",\"['Access Issues', 'Installation Problems', 'Performance Issues', 'Data Collection Issues', 'Security Concerns']\",\"['Review and update user access permissions', 'Ensure proper installation and configuration', 'Optimize system performance', 'Address data collection and storage concerns', 'Implement appropriate security measures']\"],[\"Upstream Core Operations\",\"Asset & Integrity Management\",\"Maintenance Sourcing and Contractor Management\",\"Primavera P6\",76,[\"Performance\",\"Infrastructure\",\"Workflow\",\"Data\",\"Functionality\",\"UI\",\"Access\"],\"['Productivity Loss', 'Workflow Disruption', 'Data Inaccuracy', 'Security Risk']\",\"['Regular maintenance and updates', 'Provide training to users', 'Implement multi-factor authentication', 'Backup data regularly', 'Improve system performance', 'Resolve database connection issues', 'Investigate and fix software bugs', 'Ensure proper user access management', 'Provide technical support for users']\"],[\"Upstream Core Operations\",\"Technology & Engineering\",\"Process Engineering\",\"Appian - EWR-PARF (Engineering Work Request-Project Activity Request Form)\",56,[\"Documentation\",\"Infrastructure\",\"others\",\"Workflow\",\"Data\",\"Functionality\",\"Access\"],\"['Workflow Disruption', 'Productivity Loss', 'Data Inaccuracy', 'Quality Control']\",\"['Provide training on Appian usage', 'Improve Appian user support', 'Implement automated AFE pushing', 'Improve Appian report generation', 'Ensure timely closure of EWR\\/PARF modules', 'Improve Appian error handling and resolution', 'Ensure proper access control in Appian']\"],[\"Plan & Manage the Enterprise\",\"Business & Competitive Intelligence\",\"Business Intelligence\",\"Power BI\",48,[\"Data\",\"Access\",\"Infrastructure\"],\"['Workflow Disruption', 'Installation Issues', 'Data Inaccuracy', 'Access Issues']\",\"['Provide clear instructions for installation', 'Ensure proper access permissions are granted', 'Address data accuracy issues', 'Provide training and support for Power BI usage']\"],[\"Upstream Core Operations\",\"Hydrocarbon & Commercial Management\",\"Production Forecasting & Planning\",\"HANA\",47,[\"Connectivity\",\"Performance\",\"Infrastructure\",\"Reporting\",\"Workflow\",\"Data\",\"Access\"],\"['Workflow Disruption', 'Data Inaccuracy', 'Productivity Loss', 'Report Issues', 'System Downtime', 'Authentication Failure', 'Data Correction Required', 'ODBC Driver Issues', 'Out of Memory Error', 'Replication Delay', 'Table Errors', 'Connection Problems']\",\"['Investigate root cause of HANA Index Server crash and implement preventive measures', 'Resolve authentication issues for Test Domain access to HANA', 'Troubleshoot and fix errors accessing HANA_PRD_32', 'Install HDODBC client and resolve ODBC driver issues', 'Investigate and resolve Costpick errors in Consolidated CAD report', 'Perform data correction in HANA', 'Investigate and resolve internal error in SAP DBTech JDBC', 'Create views in production for HANA', 'Resolve ODBC system error for PowerBI dashboards', 'Remove user from IT email list', 'Investigate and resolve login issues for Spotfire connection to HANA_PRD_64', 'Investigate and resolve HANA downtime and restart issues', 'Resolve ODBC driver issues for HANA', 'Investigate and resolve HANA_PRD system downtime', 'Troubleshoot and fix HANA connection issues', 'Investigate and resolve HANA out of synch issues for Maximo', 'Investigate and resolve PowerBI report issues caused by HANA column data type change', 'Resolve SRS replication issues for EC Oilsands', 'Investigate and resolve data inaccuracy in Costpick data from HANA', 'Investigate and resolve Maxitrak table errors', 'Investigate and resolve network connectivity issues for cgyut56765', 'Provide SQL access to SRC_HANA tables', 'Investigate and resolve HANAPRD.SRC_JDE_CONFIDENTIAL2 connection trigger issue', 'Resolve HANA ODBC driver connectivity issues']\"],[\"Non-Hydrocarbon Supply Chain Management\",\"Requisition to Pay\",\"Invoice Processing\",\"Adobe Sign\",19,[\"Infrastructure\",\"Workflow\",\"Functionality\",\"UI\",\"Access\"],\"['Workflow Disruption', 'Productivity Loss', 'Quality Control', 'Data Inaccuracy']\",\"['Investigate and resolve account deactivation issue', 'Address random Access Documented notices', 'Resolve Adobe Acrobat freezing and signature issues', 'Increase document page limit for Adobe Sign', 'Address PDF issues', 'Investigate and resolve Access Documented screen issue', 'Resolve Adobe Acrobat Pro signature and save as issues', 'Investigate and resolve Adobe Sign access issues', 'Address password prompt for digital signature', 'Investigate and resolve Adobe Sign and Software Center issues', 'Resolve Adobe Acrobat DC Save As issue', 'Provide Adobe Sign training and support', 'Investigate and resolve Adobe crashes and other issues']\"],[\"Hydrocarbon Supply Chain Management\",\"Loading Operations Management\",\"Measurement & Quality Management\",\"Petrel\",17,[\"UI\",\"Infrastructure\",\"Access\",\"Performance\"],\"['Productivity Loss', 'Workflow Disruption', 'Access Issues', 'Data Loss', 'License Management', 'Compatibility Issues', 'Performance Issues', 'Graphical Issues', 'Server Downtime']\",\"['Investigate and resolve freezing and crashing issues', 'Address file location and access issues', 'Ensure proper application access is granted', 'Resolve project saving issues', 'Optimize VDI performance', 'Address login and disconnection issues', 'Investigate and resolve frequent crashing', 'Resolve NVIDIA OpenGL Driver error', 'Ensure proper license management', 'Upgrade server to support Petrel 2019', 'Optimize remote Petrel response', 'Investigate and resolve Petrel 2019 crashing', 'Address slow performance issues', 'Resolve graphical issues', 'Restore Petrel server functionality']\"],[\"Plan & Manage the Enterprise\",\"Enterprise Strategy  & Performance Management\",\"Enterprise Performance Management\",\"Enterprise Connect\",15,[\"Workflow\",\"Access\",\"Infrastructure\"],\"['Productivity Loss', 'Workflow Disruption', 'Installation Error', 'Missing Feature', 'Data Inaccuracy']\",\"['Provide Outlook integration for Enterprise Connect', 'Investigate and resolve drag and drop issues', 'Troubleshoot installation errors', 'Ensure Enterprise Connect is available on all devices', 'Investigate and resolve email copying\\/moving issues', 'Provide training on using Enterprise Connect', 'Investigate and resolve editing issues in Content Server', 'Ensure Enterprise Connect icon is visible in Outlook', 'Investigate and resolve folder copying\\/moving issues', 'Provide support for email copying\\/moving within Enterprise Connect', 'Troubleshoot loading issues in Outlook', 'Investigate and resolve email moving issues into Content Server', 'Troubleshoot Enterprise Connect activation issues', 'Investigate and resolve folder moving issues from Outlook to Content Server']\"],[\"Upstream Core Operations\",\"Production Operations\",\"Production Ops. Management\",\"DigitCore\",4,[\"Access\",\"Infrastructure\"],\"\",\"\"],[\"Upstream Core Operations\",\"Hydrocarbon & Commercial Management\",\"Production Accounting\",\"PCARD\",3,[\"Access\"],\"['Productivity Loss', 'Workflow Disruption']\",\"['Provide immediate assistance to unlock the account and reset the password', 'Implement measures to prevent frequent account lockouts']\"],[\"Plan & Manage the Enterprise\",\"Business & Competitive Intelligence\",\"Business Intelligence\",\"HANA\",2,[\"Workflow\",\"Infrastructure\"],\"['Data Inaccuracy', 'Workflow Delay']\",\"['Investigate missing table and ensure proper replication', 'Optimize time addition process in Wellview HANA']\"]]}",
                    "impact_analysis_df": "{\"columns\":[\"BPL1\",\"BPL2\",\"BPL3\",\"Tool\",\"Ticket Count\",\"Key Issues Identified\",\"Business Impact\",\"Recommendations\"],\"index\":[7,9,1,4,10,3,5,8,0,2,6],\"data\":[[\"Upstream Core Operations\",\"Hydrocarbon & Commercial Management\",\"Production Forecasting & Planning\",\"HANA\",11,\"['Access', 'Workflow', 'Data', 'Infrastructure']\",\"['Workflow Disruption', 'Authentication Failure', 'Report Generation Issue', 'Data Inaccuracy', 'System Error', 'Production Delay', 'Data Refresh Issue', 'Communication Breakdown', 'Authentication Failure', 'Report Generation Issue', 'System Error', 'System Downtime']\",\"['Investigate and resolve HANA Index Server crash', 'Investigate and resolve authentication issue', 'Investigate and resolve Costpick error', 'Perform data correction in HANA', 'Investigate and resolve JDBC internal error', 'Create views in production as required', 'Investigate and resolve PowerBI dashboard refresh issue', 'Ensure proper communication channels for IT email list removal', 'Investigate and resolve Spotfire login issue', 'Investigate and resolve Costpick error', 'Investigate and resolve HANA downtime']\"],[\"Upstream Core Operations\",\"Production Operations\",\"Production Ops. Management\",\"PARCView\",10,\"['Access', 'Performance', 'Data', 'Infrastructure']\",\"['User Access Issue', 'Security Breach', 'Process Disruption', 'Site Configuration Error', 'Application Failure', 'Data Trending Issue', 'Application Update Issue', 'Database Connectivity Issue', 'Installation Failure', 'Data Inaccuracy']\",\"['Check user access permissions', 'Investigate and resolve security breach', 'Troubleshoot and fix application issue', 'Check site configuration', 'Resolve application failure', 'Investigate and fix data trending issue', 'Reinstall Parcview application', 'Check database connectivity', 'Reinstall Parcview application', 'Investigate and fix data inaccuracy issue']\"],[\"Non-Hydrocarbon Supply Chain Management\",\"Requisition to Pay\",\"Invoice Processing\",\"Adobe Sign\",8,\"['Access', 'Other']\",\"['Workflow Disruption', 'Productivity Loss', 'Workflow Disruption', 'Workflow Disruption', 'Workflow Disruption', 'Workflow Disruption', 'Workflow Disruption']\",\"['Check and reactivate user accounts', 'Investigate and resolve Access Documented notice', 'Investigate and resolve Access Documented notice', 'Investigate and resolve Adobe Acrobat issues', 'Investigate and resolve Adobe Acrobat signature and save issues', 'Check and reactivate user accounts', 'Investigate and resolve access warnings']\"],[\"Plan & Manage the Enterprise\",\"Enterprise Strategy  & Performance Management\",\"Enterprise Performance Management\",\"Enterprise Connect\",7,\"['Access']\",\"['Productivity Loss', 'Workflow Disruption', 'Data Inaccuracy']\",\"['Provide training on Enterprise Connect usage', 'Ensure Enterprise Connect is installed on all devices', 'Investigate and resolve issues with copying to folders in Enterprise Connect', 'Ensure compatibility of Enterprise Connect with Outlook and Livelink']\"],[\"Upstream Core Operations\",\"Technology & Engineering\",\"Process Engineering\",\"Appian - EWR-PARF (Engineering Work Request-Project Activity Request Form)\",5,\"['Other', 'Access', 'Functionality', 'Workflow', 'Data']\",\"['Workflow Disruption', 'Report Generation Issue', 'Functionality Issue', 'Search Issue', 'Report Generation Issue']\",\"['Investigate and resolve log-in error', 'Provide training on report generation', 'Fix line number and export functionality', 'Investigate and resolve search issue', 'Fix report generation issue for EWR\\/PARF list']\"],[\"Plan & Manage the Enterprise\",\"Business & Competitive Intelligence\",\"Business Intelligence\",\"Power BI\",2,\"['Access']\",\"['Data Inaccuracy', 'Workflow Disruption']\",\"['Check data sources for accuracy', 'Provide clear installation instructions for tablet application']\"],[\"Upstream Core Operations\",\"Asset & Integrity Management\",\"Maintenance Sourcing and Contractor Management\",\"Primavera P6\",2,\"['Access', 'Infrastructure']\",\"['Workflow Disruption', 'Productivity Loss']\",\"['Investigate root cause of P6 downtime and implement measures to prevent future occurrences', 'Ensure timely resolution of access credential issues to minimize impact on project timelines']\"],[\"Upstream Core Operations\",\"Production Operations\",\"Production Ops. Management\",\"DigitCore\",2,\"['Access', 'Infrastructure']\",\"['Workflow Disruption', 'Productivity Loss']\",\"['Investigate and resolve the issue with GeoLogic (CoreSearch) not showing up in Software Center', 'Ensure proper communication and training for users on the new version of Geo Logic Imaging Core Data']\"],[\"Hydrocarbon Supply Chain Management\",\"Loading Operations Management\",\"Measurement & Quality Management\",\"Petrel\",1,\"['Performance']\",\"['Productivity Loss', 'Workflow Disruption']\",\"['Restart Petrel', 'Check for updates', 'Contact support team']\"],[\"Plan & Manage the Enterprise\",\"Business & Competitive Intelligence\",\"Business Intelligence\",\"HANA\",1,\"['Infrastructure']\",\"['Workflow Disruption']\",\"['Investigate root cause of app039 restart issue and implement measures to prevent future occurrences.']\"],[\"Upstream Core Operations\",\"Hydrocarbon & Commercial Management\",\"Production Accounting\",\"PCARD\",1,\"['Access']\",\"['Productivity Loss']\",\"['Implement a self-service password reset option to reduce dependency on IT support for password resets.']\"]]}",
                },
                "status_code": 200
            };
            // setJsonResponse2(data2);
            const json_response2 = response.response.find(item => item.filename === "screen2.json");
            setJsonResponse2(json_response2.content);
            const data3 =
            {
                "message": "success",
                "response": {
                    "rca_performed_tickets": 523,
                    "rca_resp": [{ "Count": 213, "Issue_Type": "Access", "Reasons": ["1. Adobe Sign account deactivation causing access issues.", "2. Appian EWR/PARF Excel export and log-in errors.", "3. Enterprise Connect missing from devices and email transfer issues.", "4. HANA database connection errors and login issues.", "5. ParcView access and installation problems, including missing folders and connection errors."] },
                    { "Count": 184, "Issue_Type": "Infrastructure", "Reasons": ["1. Adobe Sign causing various issues with PDFs.", "2. Appian EWR-PARF forms encountering errors.", "3. HANA database experiencing connectivity and performance issues.", "4. PARCView installation and connection problems.", "5. Primavera P6 facing login and configuration issues."] },
                    { "Count": 48, "Issue_Type": "Performance", "Reasons": ["1. Insufficient system resources causing HANA and PARCView issues.", "2. Replication delays causing EC ORAPRD25 issues.", "3. Parcview 7.0 upgrade causing performance and trend issues.", "4. Petrel and Primavera P6 experiencing slow performance and frequent crashing.", "5. Possible network or connectivity issues affecting tool performance."] },
                    { "Count": 40, "Issue_Type": "Data", "Reasons": ["1. Appian EWR/PARF report generation issues", "2. HANA data source inconsistencies and errors", "3. ParcView data collection and reporting limitations", "4. Power BI data source and refresh issues", "5. Primavera P6 data loss and deletion errors"] },
                    { "Count": 38, "Issue_Type": "Workflow", "Reasons": ["1. Signature issues in Adobe Sign", "2. Manual data entry required in Appian", "3. Delay in AFE processing causing urgent requests", "4. Issues with PARF closure in Appian", "5. Functionality issues with PARCView and HANA"] }
                    ], "total_tickets": 544
                },
                "status_code": 200

            };
            const json_response3 = response.response.find(item => item.filename === "screen3.json");
            console.log(json_response3)
            setJsonResponse3(json_response3.content);
            setTabsShow(true);
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
    // const questions = ["What are Level 1 process ?Also provide a table number of tickets",
    //     "Which are level 1 process has most tickets ?",
    //     "What level 2 processes come under 'Plan & Manage the Enterprise ? Also create a table with number of tickets",
    //     "What are top issues identified and what are the recommendations on the same ?",
    //     "What are the top 3 tools that are affected the most ?",
    //     "Generate detailed RCA on 'Access' Issue",
    //     "Plot a line graph of number of tickets for each Level 1 business process?",
    //     "How many applications are there under 'Plan and Manage' business process ?",
    //     "How many tickets belongs to PARCView application ?",
    //     "What is the number of total tickets ?",
    //     "What is the count of total tickets ? Also mention the data source of tickets",
    //     "What are the top tools that are affected the most?"]
    const questions = ["What is the number of total tickets ?",
        "What are Level 1 process ?Also provide a table number of tickets",
        "Which are level 1 process has most tickets ?",
        "What level 2 processes come under 'Plan & Manage the Enterprise ? Also provide bar chart with number of tickets.",
        "How many applications are there under 'Plan and Manage' business process ?",
        "what are the top 5 noisy applications ? Provide pie chart.",
        "What are 2 top issue types identified ? what are the top 2 business impacts and recommendations for the same.",
        "What are the top 3 tools that are affected the most ?",
        "What are the top 3 business impacts of 'JDE' based tickets ?",
        "Plot a line graph of number of tickets for each Level 1 business process?"];
    const scrollContainerRef = useRef(null);

    const scrollToBottom = () => {
        if (scrollContainerRef.current) {
            scrollContainerRef.current.scrollTop = scrollContainerRef.current.scrollHeight;
        }
    };
    const renderchatResponse = (message, index, chatMessages) => {
        console.log(message.message);
        if (message.user) {
            return (
                <div className="user-message-v">
                    <span>{message.message}</span>
                </div>
            );
        } else if (message.message == "Hi! How can I assist you today?") {
            return (
                <div className="user-message-v">
                    {/* <span>{message.message}</span> */}
                    {showTypingEffect && index === chatMessages.length - 1 ? (
                        <TypingEffect
                            text={message.message}
                            onComplete={() => setShowTypingEffect(false)}
                        />
                    ) : (
                        <span>{message.message}</span>
                    )}
                </div>
            );
        } else {
            if (message.message) {
                if (message.message.response_type === "table") {

                    return (
                        // <div className="table-response-bplam">
                        //     <span>{message.message.response_data.table.analysis}</span>
                        //     <TableResponse data={message.message.response_data} />
                        // </div>
                        <div className="table-response-bplam">
                            <div className="analysis-message-bplam">
                                {/* {showTypingEffect && index === chatMessages.length - 1 ? (
                                        <TypingEffect
                                            text={message.message.response_data.table.analysis}
                                            onComplete={() => setShowTypingEffect(false)}
                                        />
                                    ) : ( */}
                                <span>{message.message.response_data.table.analysis}</span>
                                {/* )} */}
                            </div>
                            <TableResponse data={message.message.response_data} />
                        </div>
                    );
                } else if (message.message.response_type === "answer") {
                    return (
                        <div className="answer-response-bplam">
                            <span>{message.message.response_data}</span>
                        </div>
                    );
                } else if (message.message.response_type === "graph") {
                    const graphData = message.message.response_data;
                    if (graphData.bar) {
                        scrollToBottom();
                        const analysisMessage = graphData.analysis;
                        const barData = graphData.bar.data;
                        const labels = barData.map((item) => item[0]);
                        const data = barData.map((item) => item[1]);
                        const dataset = {
                            labels: labels,
                            datasets: [
                                {
                                    label: graphData.bar.columns[1],
                                    data: data,
                                    fill: false,
                                    backgroundColor: "rgb(135, 116, 255)",
                                    borderWidth: 2,
                                    barPercentage: 0.5,
                                },
                            ],
                        };
                        const options = {
                            scales: {
                                x: {
                                    beginAtZero: true,
                                    strokeDasharray: "rgba(65, 67, 82, 1)",
                                    ticks: {
                                        color: "white",
                                        fontSize: 10,
                                        fontWeight: 100,
                                    },
                                    type: "category", // For horizontal bar charts, use 'category' scale for x-axis
                                    title: {
                                        display: true,
                                        text: graphData.bar.columns[0], // X-axis label
                                        color: "white",
                                        font: {
                                            weight: "bold", // Make the text bold
                                        },
                                    },
                                    grid: {
                                        display: true,
                                        color: "rgba(65, 67, 82, 1)", // Remove grid lines on the x-axis
                                    },
                                },
                                y: {
                                    beginAtZero: true,
                                    strokeDasharray: "rgba(65, 67, 82, 1)",
                                    ticks: {
                                        color: "white",
                                        fontSize: 10,
                                        fontWeight: 100,
                                    },
                                    type: "linear", // Use 'linear' scale for y-axis
                                    title: {
                                        display: true,
                                        text: graphData.bar.columns[1], // X-axis label
                                        color: 'white',
                                        font: {
                                            weight: "bold", // Make the text bold
                                        },
                                    },
                                    grid: {
                                        display: true,
                                        color: "rgba(65, 67, 82, 1)", // Remove grid lines on the x-axis
                                    },
                                },


                            },
                            plugins: {
                                legend: {
                                    display: false,
                                },
                                datalabels: {
                                    color: "white",
                                    anchor: "end",
                                    align: "end",

                                    //   offset: 4,
                                    //   formatter: (value, context) => {
                                    //     return value;
                                    //   },
                                },
                            },
                        };
                        const chartContainerStyle = {
                            backgroundColor: "rgba(45, 50, 90, 1)",
                            padding: "10px",
                            borderRadius: 10,
                            width: "450px", // Set the width of the chart
                            height: "230px",
                        };


                        return (
                            <>
                                <div className="analysis-message-bplam">
                                    {showTypingEffect && index === chatMessages.length - 1 ? (
                                        <TypingEffect
                                            text={analysisMessage}
                                            onComplete={() => setShowTypingEffect(false)}
                                        />
                                    ) : (
                                        <span>{analysisMessage}</span>
                                    )}
                                </div>
                                <div
                                    className="bar-chart-response-bplam"
                                    style={chartContainerStyle}
                                >
                                    <div>
                                        <Bar data={dataset} options={options} />
                                    </div>
                                </div>

                            </>
                        );
                    } else if (graphData.line) {
                        scrollToBottom();
                        const analysisMessage = graphData.analysis;
                        const lineData = graphData.line.data;
                        const columns = graphData.line.columns;
                        // const labels = lineData.map((item) => item[0]);
                        // const data = lineData.map((item) => item[1]);
                        //  const dataset = {
                        //   label: labels,
                        const datasets = [
                            {
                                label: columns[1], // Assuming the second column is the Y-axis data
                                data: lineData.map((item) => item[1]),
                                fill: false,
                                backgroundColor: "rgb(135, 116, 255)",
                                // backgroundColor:'#FFFFFF',
                                borderWidth: 2,
                                borderColor: 'white',
                                barPercentage: 0.5,
                            },
                        ];
                        const lineDataset = {
                            labels: lineData.map((item) => item[0]),
                            datasets: datasets,
                        };


                        const options = {
                            scales: {
                                x: {
                                    beginAtZero: true,
                                    strokeDasharray: "rgba(65, 67, 82, 1)",
                                    ticks: {
                                        color: "white",
                                        fontSize: 10,
                                        fontWeight: 100,
                                    },
                                    type: "category", // For horizontal bar charts, use 'category' scale for x-axis
                                    title: {
                                        display: true,
                                        text: columns[0], // X-axis label
                                        color: "white",
                                        font: {
                                            weight: "bold", // Make the text bold
                                        },
                                    },
                                    grid: {
                                        display: true,
                                        color: "rgba(65, 67, 82, 1)", // Remove grid lines on the x-axis
                                    },
                                },
                                y: {
                                    beginAtZero: true,
                                    strokeDasharray: "rgba(65, 67, 82, 1)",
                                    // strokeDasharray: "white",
                                    ticks: {
                                        color: "white",
                                        fontSize: 10,
                                        fontWeight: 100,
                                    },
                                    type: "linear", // Use 'linear' scale for y-axis
                                    title: {
                                        display: true,
                                        text: columns[1], // Y-axis label
                                        color: "white",
                                        font: {
                                            weight: "bold", // Make the text bold
                                        },
                                    },
                                    grid: {
                                        display: true,
                                        color: "rgba(65, 67, 82, 1)", // Remove grid lines on the x-axis
                                    },
                                },
                            },
                            plugins: {
                                legend: {
                                    display: false,
                                },
                                datalabels: {
                                    color: "white",
                                    anchor: "end",
                                    align: "end",

                                    //   offset: 4,
                                    //   formatter: (value, context) => {
                                    //     return value;
                                    //   },
                                },
                            },
                            layout: {
                                padding: {
                                    left: 10,
                                    right: 10,
                                    top: 20,
                                    bottom: 5,
                                },
                            },
                        };
                        const chartContainerStyle = {
                            backgroundColor: "rgba(45, 50, 90, 1)",
                            padding: "10px",
                            borderRadius: 10,
                            width: "450px", // Set the width of the chart
                            height: "230px",
                        };
                        return (
                            <>
                                <div className="analysis-message-bplam">
                                    {showTypingEffect && index === chatMessages.length - 1 ? (
                                        <TypingEffect
                                            text={analysisMessage}
                                            onComplete={() => setShowTypingEffect(false)}
                                        />
                                    ) : (
                                        <span>{analysisMessage}</span>
                                    )}
                                </div>
                                <div
                                    className="bar-chart-response-bplam"
                                    style={chartContainerStyle}
                                >
                                    <div>
                                        <Line data={lineDataset} options={options} />
                                    </div>
                                </div>
                            </>
                        );
                    } else if (graphData.pie) {
                        scrollToBottom();
                        const analysisMessage = graphData.analysis;
                        const pieData = graphData.pie.data;
                        const labels = graphData.pie.columns;
                        console.log(pieData);
                        const chartData = pieData.map((item, index) => ({
                            name: item[0],
                            value: item[1],
                            // fill: colors[index % colors.length], 
                        }));
                        console.log(chartData);
                        const dataset = {
                            labels: labels,
                            // labels: pieData,
                            // labels:graphData.pie.data.map(item => item[0]),
                            datasets: [
                                {
                                    // label: graphData.pie.columns[1],
                                    // label:chartData.map((item) => item.label),
                                    // label:graphData.pie.data.map(item => item[0]),
                                    data: pieData,
                                    // data:chartData,
                                    // data:graphData.pie.data.map(item => item[1]),
                                    fill: false,
                                    backgroundColor: "rgb(135, 116, 255)",
                                    borderWidth: 2,
                                    barPercentage: 0.5,
                                    color: '#FFFFFF',
                                    backgroundColor: pieData.map((_, index) => getBackgroundColor(index)),
                                },
                            ],
                        };
                        const options = {
                            height: '100px',
                            width: '100px',
                            plugins: {
                                // padding:{
                                //     right:50,
                                // },
                                legend: {
                                    display: true,
                                    position: 'right',
                                    align: 'center',

                                    labels: {
                                        boxWidth: 10, // Adjust as needed
                                        fontColor: "#FFFFFF",
                                        color: "#FFFFFF",
                                    },
                                },
                                datalabels: {
                                    display: true,
                                    color: "white",
                                    anchor: 'center',
                                    align: 'end',
                                    // backgroundColor:'rgba(0,0,0,0.2)',
                                    // padding:'15px',
                                    // border :'1px solid #FFFFFF',
                                    // borderRadius:'2px',
                                },
                            },

                            datalabels: {
                                display: true,
                                color: "white",
                            },
                            layout: {
                                padding: {
                                    right: 20,
                                }
                            }
                        }



                        //   const colors = [
                        //   "#8884d8",
                        //   "rgba(99, 31, 225, 0.826)",
                        //   "#ffc658",
                        //   "#82ca9d",
                        //   "rgba(51, 184, 237, 0.712)",
                        //   "green",
                        //   "yellow",
                        // ];
                        return (
                            <>
                                <div className="analysis-message-bplam">
                                    {showTypingEffect && index === chatMessages.length - 1 ? (
                                        <TypingEffect
                                            text={analysisMessage}
                                            onComplete={() => setShowTypingEffect(false)}
                                        />
                                    ) : (
                                        <span>{analysisMessage}</span>
                                    )}
                                </div>

                                <div className="bot-chart-response-d-bplam">
                                    {/* <PieChart width={350} height={250}>
                      <Pie
                         dataKey="value"
                         data={chartData}
                         fontSize={"10px"}
                         isAnimationActive={false}
                         cx={150}
                         cy={100}
                         outerRadius={70}
                         innerRadius={30}
                         fill="#8884d8"
                         labels
                         >
                          {pieData.map((entry, index) => (
                            <Cell 
                              key={`cell-${index}`}
                              fill={colors[index % colors.length]}
                              />
                          ))}
                         </Pie>
                         <Legend
                            wrapperStyle={{
                              marginLeft: "20px",
                              backgroundColor: "transparent",
                              fontSize: "10px",
                              borderRadius: 3,
                              lineHeight: "20px",
                            }}
                          />
                          <Tooltip
                            contentStyle={{
                              backgroundColor: "#f5f5f5",
                              fontSize: "10px",
                              borderRadius: 10,
                              padding: "10px",
                            }}
                          />
                    </PieChart> */}
                                    <Pie data={dataset} options={options} />


                                </div>

                            </>
                        )


                    }
                }


            } else if (message.user === false) {
                return <span>{message.message}</span>;
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
    // const handlePrevButtonClick = (event) => {
    //     navigate('/Bplam');
    //   };
    //   const handlePrevButtonClick1 = (event) => {
    //     navigate('/internal');
    //   };
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

    const [isChecked, setIsChecked] = useState(false);

  const handleCheckChange = () => {
    setIsChecked(!isChecked);
  };
    return (
        <div className='doa-container'>
            <div className='doa-hide-scroll'>
                <div>
                    <div className='Heading-Doa'>
                        <Link to='/internal' style={{ textDecoration: "none" }}><span style={{ color: '#AD8BFF', marginLeft: "5px", fontSize: "12px", fontFamily: "Graphik", fontWeight: "355", marginTop: "5px" }}>Internal</span></Link><span style={{ color: '#FFFFF', marginLeft: "5px", fontSize: "12px", fontFamily: "Graphik", fontWeight: "355", cursor: "pointer" }} onClick={() => { setTabsShow(false) }}>/  BPLAM</span>
                        <div className='info-icon-doa'>
                            <img className='doa-icon' src={chatbot} onClick={tabsShow ? handleChatbotToggleModal : null} style={{ display: tabsShow ? 'inline-block' : 'none', cursor: tabsShow ? 'pointer' : 'not-allowed' }} />
                            <img className="doa-icon" src={Iicon} onClick={handleToggleModal} />
                            <img className='doa-icon' src={refresh} alt='Sample' onClick={() => { setTabsShow(false) }} title='Back to previous page' style={{ display: tabsShow ? 'inline-block' : 'none' }} />
                        </div></div>

                    {showModal && (
                        <Info onClose={() => setShowModal(false)} infocontent={infocontent} />
                    )}
                </div>
                {
                    tabsShow ? <AnalysisBPLAM heatmapData={heatmapData} jsonResponse={jsonResponse} jsonResponse2={jsonResponse2} jsonResponse3={jsonResponse3}
                        close={() => setTabsShow(false)} chatshow={showChatbotModal} closechat={() => setShowChatbotModal(false)}
                        renderchatResponse={renderchatResponse} renderResponse={renderResponse} endpoint="http://98.64.75.151:5000/chat"
                        questions={questions} uploadkey={uploadKey}
                    />
                        : (showChatbotModal ? <Chatbot closechat={() => setShowChatbotModal(false)} renderchatResponse={renderchatResponse}
                            renderResponse={renderResponse} endpoint="http://98.64.75.151:5000/chat" questions={questions} uploadkey={uploadKey} /> :
                            (isLoading ? (<Fetching />) :
                                <div>
                                    <div className='bplam-board' style={{ color: "#FFFFF", fontFamily: "Graphik" }}>
                                        <p style={{ position: "relative", fontSize: "28px", left: "3%", fontWeight: "550", top: "6%" }}>BPLAM</p>
                                        <p style={{ position: "relative", fontSize: "12px", left: "3%", width: "490px", fontWeight: "400" }}><b>Business Performance led Application Management </b> is aimed at <b>bringing about business performance improvements and innovation </b>through application management spend.</p>
                                        <p style={{ position: "relative", fontSize: "12px", left: "3%", width: "490px", fontWeight: "400" }}>The innovative approach takes the application management services to the next level, <b>helping clients address the key business challenges </b>around IT cost, seamless stakeholder’s transaction, revenue growth, regulatory compliance, faster decision making and driving greater business outcomes.</p>
                                    </div>
                                    <div className='main-bplam-container'>
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
                                                            <div className="describe">Enter details below to generate application ticket analysis using GEN AI</div>
                                                            <label className="generate-label-doa">Title</label>
                                                            <input type="text" className='form-data-doa' placeholder="Enter Title (Max 40 Characters)" value={title} onChange={handleTitleChange} maxLength={40} required />
                                                            <label className="generate-label-doa">Reference Company</label>
                                                            <input type="text" className='form-data-doa' placeholder="Enter Company Name" value={reportType} onChange={handleReportTypeChange} required />
                                                            {/* <div style={{display:"flex"}}><label className="generate-label-doa">Client</label>
                                                            <Form.Check
                                                            style={{marginLeft:"10px"}}
                                                                className="generate-label-doa"
                                                                type="checkbox"
                                                                id={`default-checkbox`}
                                                                label={`ADNOC`}
                                                                onChange={handleCheckChange}
                                                            /></div> */}
                                                            {/* <select value={reportType} className='form-data-doa' placeholder="Select Morning Report / Evening Report" onChange={handleReportTypeChange}>
                                                                <option value="" disabled hidden className="generate-label-doa">
                                                                    Select a Company
                                                                </option>
                                                                <option value="Chevron">Chevron</option>
                                                                 <option value="evening">Evening Report</option> 
                                                            </select> */}
                                                            <label className="generate-label-doa">Ticket Data</label>
                                                            <div className='rig-details-box' style={{ margin: "15px 10px 0px 0px", display: "flex", padding: "10px" }}>
                                                                <p className='upload-text'>Drag and Drop files here <br />Limit 200 MB per file - .CSV </p>
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
                                                    <option value="" disabled selected style={{ display: 'none' }}>Status</option>
                                                    <option value="In-Progress">In-Progress</option>
                                                    <option value="Completed">Completed</option>
                                                    <option value="Failed">Failed</option>
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
                                                    //onBlur={handleClearDate}
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
                                                    <div className='bplam-drill-card'>
                                                        {item.display === "True" ? (
                                                            <div className='bplam-drill-card-body' key={item.unique_key}>
                                                                <p className='drill-header'> {item.title}</p>
                                                                <p style={{ fontSize: '12px', marginTop: '-10px' }}><img className="doa-icon2" src={Company_name} style={{ width: '15px' }} /> {item.company}</p>
                                                                <p style={{ fontSize: '12px', marginTop: '-10px' }} className='drill-body'><img className="doa-icon2" src={calender_tile} style={{ width: '15px' }} /> Created on {item.creation_date}</p>
                                                                <p style={{ fontSize: '12px', marginTop: '-10px' }} className='drill-body'><img className="doa-icon2" src={users} style={{ width: '18px' }} /> By User </p>
                                                                <p className='status-drill' style={{ backgroundColor: item.status === 'Failed' ? 'red' : 'rgba(36, 182, 0, 1)' }}> {item.status ? item.status : "Completed"} </p>
                                                                {item.status === "In-Progress" ? <Loading style={{ marginTop: '-40px' }} /> : <button className='bplam-view-report' onClick={item.status === 'Completed' ? () => getAnalysis(item.unique_key) : null} disabled={item.status === 'Failed'} style={{ backgroundColor: item.status === 'Failed' ? 'grey' : 'rgba(107, 92, 209, 1)' }}> <img src={report} className='report-icon' /> VIEW</button>}
                                                            </div>) : null}
                                                    </div>))) :
                                                    (recentAnalysisDocsData.map(item => (
                                                        <div className='bplam-drill-card'>
                                                            {item.display === "True" ? (
                                                                <div className='bplam-drill-card-body' key={item.unique_key}>
                                                                    <p className='drill-header'>{item.title}</p>
                                                                    <p style={{ fontSize: '12px', marginTop: '-10px' }}><img className="doa-icon2" src={Company_name} style={{ width: '15px' }} /> {item.company}</p>
                                                                    <p style={{ fontSize: '12px', marginTop: '-10px' }} className='drill-body'><img className="doa-icon2" src={calender_tile} style={{ width: '15px' }} /> Created on {item.creation_date}  </p>
                                                                    <p style={{ fontSize: '12px', marginTop: '-10px' }} className='drill-body'><img className="doa-icon2" src={users} style={{ width: '15px' }} /> By User </p>
                                                                    <p className='status-drill' style={{ backgroundColor: item.status === 'Failed' ? 'red' : 'rgba(36, 182, 0, 1)' }}> {item.status ? item.status : "Completed"} </p>
                                                                    {item.status === "In-Progress" ? <Loading style={{ marginTop: '-40px' }} /> : <button className='bplam-view-report' onClick={item.status === 'Completed' ? () => getAnalysis(item.unique_key) : null} disabled={item.status === 'Failed'} style={{ backgroundColor: item.status === 'Failed' ? 'grey' : 'rgba(107, 92, 209, 1)' }}> <img src={report} className='report-icon' /> VIEW</button>}
                                                                </div>) : null}
                                                        </div>)))}
                                        </div>
                                    </div>
                                </div>))
                }
            </div>
        </div>
    )
}

export default Bplam1