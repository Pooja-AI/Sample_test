import './detectionTabs.css';
import './CorrosionPage.css';
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import Icon from './images/Group 3061.svg';
import WorkorderIcon from './images/Group 3171.svg';
import pdfIcon from './images/pdf_icon.svg';
import mailIcon from './images/email_icon.svg';
import regenerate from './images/regenerate.svg';
import { Viewer } from '@react-pdf-viewer/core';
import '@react-pdf-viewer/core/lib/styles/index.css';
import { Worker } from '@react-pdf-viewer/core';
import '@react-pdf-viewer/core/lib/styles/index.css';
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';
import close1 from './images/Group 3206.svg';
import send from './images/send_FILL0_wght400_GRAD0_opsz24 1.svg';

function Incidents(props) {
    const plantId = localStorage.getItem('plantId');
    const assetId = sessionStorage.getItem('assetId');
    const detectedCorrosionType = localStorage.getItem('detectedCorrosionType');
    const [generateData, setGenerateData] = useState({});
    const [generateLoading, setGenerateLoading] = useState(true);
    const [generateTableLoading, setGenerateTableLoading] = useState(false);
    const [formData, setFormData] = useState({
        assetid: '',
        assestHeirarchy: '',
        assetHead: '',
        name: '',
        equipementId: '',
        failureProbability: '',
        lastMaintainanceDate: '',
        lastInspectionDate: '',
        problem: '',
        solution: '',
        productionLoss: '',
        productionLossAv: '',
        replacement: '',
        workOrderRasiedDate: ''
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleFormSubmit = (e) => {
        e.preventDefault();
        const jsonData = JSON.stringify(formData);
        setShowGenerateView(false);
        setShowGenerateTableView(true);
        setGenerateTableLoading(true);
        setTimeout(() => {
            setGenerateTableLoading(false);
        }, 3000);
    };
    const handleGenerate = async () => {
        const generateRequest = {
            plantId: plantId,
            assetId: assetId,
            detectedCorrosionType: detectedCorrosionType
        }
        try {
            handleShowGenerateView();
            if (Object.keys(generateData).length === 0 && generateData.constructor === Object) {
                // const response = await axios.post('http://52.157.248.197:5000/generateWorkOrder', generateRequest);
                const response = {
                    "data": {
                        "assetID": "AS0003",
                        "assetType": "4 inch pipe",
                        "authorisedBy": "Shruthi Chinnaswamy",
                        "equipmentInstallationDate": "2001-07-14",
                        "failureProbability": "",
                        "history": "",
                        "lastInspectionComment": "Erosion corrosion was found with 0 degradation of  4 inch pipe on 0 of surface area",
                        "lastInspectionDate": "2017-11-18",
                        "lastMaintainanceDate": "",
                        "name": "admin",
                        "plant": "Plant-A",
                        "productionLoss": "0",
                        "productionLossAv": "",
                        "resolutionComment": "",
                        "typeofWorkOrder": "Replacement",
                        "workOrderComment": "NA",
                        "workOrderRasiedDate": "2020-01-06"
                    }
                }
                console.log('API response:', response.data);
                setGenerateData(response.data);
                setFormData({
                    assetid: response.data.assetID,
                    assestHeirarchy: response.data.assetID,
                    assetHead: response.data.assetID,
                    name: response.data.name,
                    equipementId: response.data.plant,
                    failureProbability: response.data.failureProbability,
                    lastMaintainanceDate: response.data.lastMaintainanceDate,
                    lastInspectionDate: response.data.lastInspectionDate,
                    problem: "",
                    solution: response.data.solution,
                    productionLoss: response.data.productionLoss,
                    productionLossAv: response.data.productionLossAv,
                    replacement: "",
                    workOrderRasiedDate: response.data.workOrderRasiedDate
                });
                setGenerateLoading(false);
            }
            console.log(generateData)
        }
        catch (error) {
            console.log(error)
        }
    };
    const [showGenerateView, setShowGenerateView] = useState(false);
    const handleShowGenerateView = () => {
        setShowGenerateView(true);
    };
    const handleCloseGenerateView = () => {
        setShowGenerateView(false)
    };
    const [showGenerateTableView, setShowGenerateTableView] = useState(false);
    const tabledata = props.data.WorkOrderDetails;
    const Loading = () => {
        return (
            <div className='incident-loader'>
                <div className="loader">
                    <div className='loader-text'>Fetching the data from LLM</div>
                    <div className="dot red-c-sv"></div>
                    <div className="dot green-c-sv"></div>
                    <div className="dot blue-c-sv"></div>
                </div>
            </div>
        );
        ;
    };
    const Processing = () => {
        return (
            <div className='process-loader'>
                <div className='loader'>
                    <div className='process-text'>Processing</div>
                    <div className="dot red-c-sv"></div>
                    <div className="dot green-c-sv"></div>
                    <div className="dot blue-c-sv"></div>
                </div>
            </div>
        );
        ;
    };
    // const Processing = () => {
    //     return (
    //         <div className='process-loader'>
    //             <div className='loader'>
    //                 {/* <div className='process-text'>Processing</div> */}
    //                 <div className="dot-cq-sv red-c-sv"></div>
    //                 <div className="dot-cq-sv green-c-sv"></div>
    //                 <div className="dot-cq-sv blue-c-sv"></div>
    //             </div>
    //         </div>
    //     );
    //     ;
    // };
    const Loading_new = () => {
        return (
            <div className="loader-sv">
                <div className="dot-cq-sv red-c-sv"></div>
                <div className="dot-cq-sv green-c-sv"></div>
                <div className="dot-cq-sv blue-c-sv"></div>
            </div>
        );
        ;
    };
    const [viewEmail, setViewEmail] = useState(false);
    const [emailLoading, setEmailLoading] = useState(true);
    const [mailFormData, setMailFormData] = useState({
        subject: '',
        content: ''
    });

    const handleMailInputChange = (e) => {
        const { name, value } = e.target;
        setMailFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };
    const handleEmailView = async () => {
        try {
            // 52.157.248.197
            const metadata = localStorage.getItem('metadata');
            setViewEmail(true);
            setEmailLoading(true);
            const apiresponse = await axios.post('http://52.157.248.197:5000/generate_email', {
                "asset_name": formData.assetid,
                "asset_type": metadata.Asset || "Gas pipeline",
                "location": formData.equipementId,
                "area_of_corrosion": "External piping",
                "incident_type": "surface corrosion identification",
                "impact_on_operations": "Minimal at the moment, but potential safety and integrity concerns",
                "recommended_actions": "Welding and Coating"
            }, {
                headers: {
                    'Content-Type': 'application/json',
                }
            });
            console.log(apiresponse);
            setMailFormData({
                subject: apiresponse.data.subject,
                content: apiresponse.data.body,
            });
            setEmailLoading(false)
        } catch (error) {
            console.error('Error loading PDF:', error);
        }
    };
    const [viewPDF, setViewPDF] = useState(false);
    const [PDFLoading, setPDFLoading] = useState(true);
    const [pdfData, setPdfData] = useState(null);
    const newPlugin = defaultLayoutPlugin()
    const handlePDFView = async () => {
        const metadata = localStorage.getItem('metadata');
        try {
            setViewPDF(true);
            setPDFLoading(true);
            const postData = {
                "plant": formData.equipementId,
                "asset_id": formData.assetid,
                "asset_type": metadata.Asset || "Gas Pipeline",
                "location": "Mumbai",
                "incident_type": "Corrosion Incident",
                "urgency": "High",
                "date_and_time": "2024-01-23 10:00 AM",
                "date": "2024-01-23",
                "position": "Maintenance Engineer",
                "contact_number": "1234567890",
                "email": "admin@accenture.com",
                "impact_on_operations": "Significant impact",
                "safety_concerns": "Yes",
                "recommended_actions": "Replace corroded parts",
                "approval_supervisor": "John",
                "date_of_approval": "2024-01-24"
            }
            await fetch('http://52.157.248.197:5000/generate_pdf', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(postData),
            })
                .then(res => res.blob())
                .then(blob => {
                    const reader = new FileReader();
                    reader.onload = () => {
                        setPdfData(reader.result);
                        setPDFLoading(false);
                    };
                    reader.readAsDataURL(blob);
                });
        } catch (error) {
            console.error('Error loading PDF:', error);
        }
    };
    return (
        <>
            {showGenerateView ?
                ((generateLoading ? (<Loading />) : <div>
                    <div className='incident'>
                        <div className='gts'>
                            <div className='generateTitle'>Company Unit
                                <img className="closeicon" src={Icon} onClick={handleCloseGenerateView} /></div>
                        </div>
                        <form className="generate-data">
                            <div className='generatecol-one col-sm-6'>
                                <div className='container-row'>
                                    <label className='col-sm-6'>Asset ID:</label>
                                    <input type="text" className='container-data col-sm-6' value={formData.assetid}
                                        name="assetid" onChange={handleInputChange} />
                                </div>
                                <div className='container-row'>
                                    <label className='col-sm-6'>Asset Heirarchy:</label>
                                    <input type="text" className='container-data col-sm-6' value={formData.assestHeirarchy}
                                        name="assestHeirarchy"
                                        onChange={handleInputChange} />
                                </div>
                                <div className='container-row'>
                                    <label className='col-sm-6'>Asset Head:</label>
                                    <input type="text" className='container-data col-sm-6' value={formData.assetHead}
                                        name="assetHead"
                                        onChange={handleInputChange} />
                                </div>
                                <div className='generate-header'> Problem Reported By:</div>
                                <div className='container-row'>
                                    <label className='col-sm-6'>Name:</label>
                                    <input type="text" className='container-data col-sm-6' value={formData.name}
                                        name="name"
                                        onChange={handleInputChange} />
                                </div>
                                <div className='container-row'>
                                    <label className='col-sm-6'>Equipement ID:</label>
                                    <input type="text" className='container-data col-sm-6' value={formData.equipementId}
                                        name="equipementId"
                                        onChange={handleInputChange} />
                                </div>
                                <div className='container-row'>
                                    <label className='col-sm-6'>Failure Probability in (%) percent:</label>
                                    <input type="text" className='container-data col-sm-6' value={formData.failureProbability}
                                        name="failureProbability"
                                        onChange={handleInputChange} />
                                </div>
                                <div className='container-row'>
                                    <label className='col-sm-6'>Last Maintenance Date:</label>
                                    <input type="text" className='container-data col-sm-6' value={formData.lastMaintainanceDate}
                                        name="lastMaintainanceDate"
                                        onChange={handleInputChange} />
                                </div>
                                <div className='container-row'>
                                    <label className='col-sm-6'>Last Inspection Date:</label>
                                    <input type="text" className='container-data col-sm-6' value={formData.lastInspectionDate}
                                        name="lastInspectionDate"
                                        onChange={handleInputChange} />
                                </div>
                                <div className='container-row'>
                                    <label className='col-sm-6'>Problem Description:</label>
                                    <input type="text" className='container-data col-sm-6' value={formData.problem}
                                        name="problem"
                                        onChange={handleInputChange} />
                                </div>
                            </div>
                            <div className='generatecol-two col-sm-6'>
                                <div className='container-row'>
                                    <label className='col-sm-6'>Solution:</label>
                                    <input type="text" className='container-data col-sm-6' value={formData.solution}
                                        name="solution"
                                        onChange={handleInputChange} />
                                </div>

                                <div className='container-row'>
                                    <label className='col-sm-6'>Probable Production Loss(Lt):</label>
                                    <input type="text" className='container-data col-sm-6' value={formData.productionLoss}
                                        name="productionLoss"
                                        onChange={handleInputChange} />
                                </div>
                                <div className='container-row'>
                                    <label className='col-sm-6'>Probable Production Loss Avoided:</label>
                                    <input type="text" className='container-data col-sm-6' value={formData.productionLossAv}
                                        name="productionLossAv"
                                        onChange={handleInputChange} />
                                </div>
                                <div className='container-row'>
                                    <label className='col-sm-6'>Replacement Required:</label>
                                    <div className='col-sm-6'><div className="form-check ">
                                        <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1" />
                                        <label className="form-check-label" for="flexRadioDefault1">
                                            yes
                                        </label>
                                    </div>
                                        <div className="form-check">
                                            <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault2" checked />
                                            <label className="form-check-label" for="flexRadioDefault2">
                                                no
                                            </label>
                                        </div></div>

                                </div>
                                <div className='generate-header'>Replacement Inventory Availability and Location in Warehouse</div>

                                <div className='container-row'>
                                    <label className='col-sm-6'>Work Order Date:</label>
                                    <input type="text" className='container-data col-sm-6' value={formData.workOrderRasiedDate} />
                                </div>
                                <button type="submit" className="processebutton-incidents" onClick={handleFormSubmit}>Process</button>
                            </div>
                        </form>
                    </div>
                </div>)
                ) :
                (props.loading ? (<Loading />) : <div className='incident'>
                    {!showGenerateTableView ?
                        (<div className='planned-workorder'>
                            <div className="workorder">
                                <p>Planned Workorder</p>
                                <p> <img className="workordericon" src={WorkorderIcon} /> No work orders planned</p>
                            </div>
                            <div className="generatesection">
                                <div><p className="generatetext"> Generate new work order for </p>
                                    <p className="generatetextbelow"> this asset ID?
                                    </p></div>
                                <button className="generatebutton" onClick={handleGenerate}>Generate</button>
                            </div>
                        </div>) :
                        (generateTableLoading ? (<Processing />) : <div>
                            <p className='workorder-planned-title'>Workorder Planned:</p>
                            <div className='workorder-planned'>
                                <div className='workorder-hide-scroll'>
                                    <table className='planned-table'>
                                        <thead> <tr >
                                            <th>Features</th>
                                            <th>Asset ID</th>
                                            <th>Asset Heirarchy</th>
                                            <th>Asset Head</th>
                                            <th>Problem Reported By</th>
                                            <th>Equipement ID</th>
                                            <th>Failure Probability in (%) percent</th>
                                            <th>Last Maintenance Date</th>
                                            <th>Last Inspection Date</th>
                                            <th>Problem Description</th>
                                            <th>Solution</th>
                                            <th>Probable Production Loss(Lt)</th>
                                            <th>Probable Production Loss Avoided</th>
                                            <th>Replacement Required</th>
                                            <th>Work Order Date</th>
                                        </tr></thead>
                                        <tbody>
                                            <tr>
                                                <td style={{ minWidth: "100px" }}><img className="corrosion-pdf-icon" src={pdfIcon} onClick={handlePDFView} title="PDF viewer"/> <img className="corrosion-mail-icon" src={mailIcon} onClick={handleEmailView} title="Email viewer"/></td>
                                                <td style={{ minWidth: "100px" }}>{formData.assetid}</td>
                                                <td style={{ minWidth: "100px" }}>{formData.assestHeirarchy}</td>
                                                <td style={{ minWidth: "100px" }}>{formData.assetHead}</td>
                                                <td style={{ minWidth: "150px" }}>{formData.name}</td>
                                                <td style={{ minWidth: "100px" }}>{formData.equipementId}</td>
                                                <td style={{ minWidth: "200px" }}>{formData.failureProbability}</td>
                                                <td style={{ minWidth: "150px" }}>{formData.lastMaintainanceDate}</td>
                                                <td style={{ minWidth: "150px" }}>{formData.lastInspectionDate}</td>
                                                <td style={{ minWidth: "200px" }}>{formData.problem}</td>
                                                <td style={{ minWidth: "200px" }}>{formData.solution}</td>
                                                <td style={{ minWidth: "200px" }}>{formData.productionLoss}</td>
                                                <td style={{ minWidth: "500px" }}>{formData.productionLossAv}</td>
                                                <td style={{ minWidth: "200px" }}>yes</td>
                                                <td style={{ minWidth: "200px" }}>{formData.workOrderRasiedDate}</td>
                                            </tr>
                                        </tbody>
                                    </table></div>
                            </div></div>)
                    }
                    {(
                        viewPDF && (<div>
                            <div className="modal-overlay-corrosion">
                                <div className='modal-corrosion' style={{width: '45vw', height:"90vh"}}>
                                    <div className='analysis-backdrop-corrosion'>
                                        <p className='analysis-head-corrosion'>PDF Viewer  <img src={close1} className="close-icon-corrosion" variant="primary" onClick={() => setViewPDF(false)} /></p>
                                    </div>
                                    {PDFLoading ? <Loading_new /> : <div style={{ width: '45vw', height:"79vh" }}>
                                        <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js">
                                            <Viewer fileUrl={pdfData} plugins={[newPlugin]} />
                                        </Worker>
                                    </div>}
                                </div>
                            </div>
                        </div>)
                    )}
                    {(
                        viewEmail && (<div>
                            <div className="modal-mail-corrosion">
                                <div className='modal-corrosion-mail'>
                                    <div className='analysis-backdrop-corrosion'>
                                        <p className='analysis-head-corrosion'>Email Viewer  <img src={close1} className="close-icon-corrosion" variant="primary" onClick={() => setViewEmail(false)} /></p>
                                    </div>
                                    {emailLoading ? <Loading_new /> : <div className='mail-content-corrosion'>
                                        <div className='container-row-mail'>
                                            <label className='col-sm-2'>Subject:</label>
                                            <input type="text" className='container-data col-sm-10' value={mailFormData.subject}
                                                name="subject" onChange={handleMailInputChange} />
                                        </div>
                                        <div className='container-row-mail'>
                                            <label className='col-sm-2'>Mail content:</label>
                                            <textarea type="text" className='container-data-mail col-sm-10' value={mailFormData.content}
                                                name="content" onChange={handleMailInputChange} />
                                        </div>
                                        <button type="submit" className="processe-corrosion-button" variant="primary" style={{ backgroundColor: "#6B5CD1", right: "26%" }} onClick={() => { setViewEmail(false) }}>Send<img className="corrosion-send-icon" src={send} /></button>
                                        <button type="submit" className="processe-corrosion-button" variant="primary" style={{ backgroundColor: "#5957FE", right: "33%" }} onClick={handleEmailView}><img className="corrosion-regenrate-icon" src={regenerate} />Regenerate</button>
                                    </div>}
                                </div>
                            </div>
                        </div>)
                    )}
                    <hr className='line'></hr>
                    <p className='workorder-history-title'>Workorder History</p>
                    <div className='workorder-history'>
                        {/* <p>{props.data}</p> */}
                        <div className='workorder-history-table'>
                            <table className='planned-table'>
                                <thead> <tr>
                                    <th>Work Order Number</th>
                                    <th>Incident Date</th>
                                    <th>Corrosion Type</th>
                                    <th>Severity</th>
                                    <th>Description</th>
                                    <th>Actions Taken</th>
                                    <th>Cost</th>
                                    <th>Downtime</th>
                                    <th>Root Cause Analysis</th>
                                    <th>Maintenance Team</th>
                                    <th>Materials Used</th>
                                    <th>Inspection Report</th>
                                    <th>Approval by</th>
                                    <th>Preventive Measures</th>
                                    <th>Status</th>
                                </tr></thead>
                                <tbody>
                                    {tabledata.map((item, index) => (
                                        <tr key={index}>
                                            <td style={{ minWidth: "150px" }}>{item.WorkOrderNumber}</td>
                                            <td style={{ minWidth: "100px" }}>{item.IncidentDate}</td>
                                            <td style={{ minWidth: "100px" }}>{item.CorrosionType}</td>
                                            <td style={{ minWidth: "100px" }}>{item.Severity}</td>
                                            <td style={{ minWidth: "620px" }}>{item.Description}</td>
                                            <td style={{ minWidth: "300px" }}>{item.ActionsTaken}</td>
                                            <td style={{ minWidth: "50px" }}>{item.Cost}</td>
                                            <td style={{ minWidth: "90px" }}>{item.Downtime}</td>
                                            <td style={{ minWidth: "400px" }}>{item.RootCauseAnalysis}</td>
                                            <td style={{ minWidth: "200px" }}>{item.MaintenanceTeam}</td>
                                            <td style={{ minWidth: "300px" }}>{item.MaterialsUsed}</td>
                                            <td style={{ minWidth: "200px" }}>{item.InspectionReport}</td>
                                            <td style={{ minWidth: "100px" }}>{item.ApprovalBy}</td>
                                            <td style={{ minWidth: "200px" }}>{item.PreventiveMeasures}</td>
                                            <td style={{ minWidth: "100px" }}>{item.Status}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table></div>
                    </div>
                </div>)}
        </>


    )
}

export default Incidents