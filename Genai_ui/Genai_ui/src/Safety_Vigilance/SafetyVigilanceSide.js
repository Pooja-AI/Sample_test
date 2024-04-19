import React, { useState } from 'react';
import Stack from 'react-bootstrap/Stack';
import ListGroup from 'react-bootstrap/ListGroup';
import BPLAM from '../images/image 21.svg';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import search from '../images/XMLID_223_.svg';
import calender from '../images/Calender.svg';
import filter from '../images/XMLID_6_.svg';
import './SafetyVigilance.css';
import svg1 from '../images/sv1.png';
import svg2 from '../images/svg2.png';
import svg3 from '../images/svg3.png';
import svg4 from '../images/svg4.png';
import svg5 from '../images/svg5.jpg';
import svg6 from '../images/svg6.jpg';
import svg7 from '../images/svg7.jpg';
import WebcamComponent from './WebcamComponent';

function SafetyVigilanceSide(props) {

    const [value, setValue] = React.useState('');
    const [calenderValue, setCalenderValue] = React.useState('');
    const [show, setShow] = useState(false);
    const [filterMode, setFilterMode] = useState(false);
    const [filteredAnalysisDocsData, setFilteredAnalysisDocsData] = useState([]);
    const [filterText, setFilterText] = useState('');

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
        }
        else if (type === "Status" && value) {
            console.log("Status");
            console.log(value);
        }
        else if (type === "Period" && value) {
            console.log("period")
        }
        else if (type === "Text") {
        }
        else {
            setFilterMode(false);
        }
    };
    const videodata = {
        data: [
            {
                camera: "AHM-GGS-Equipment Inventory Unit",
                issuefound: "02",
                image: svg1,
                video: "AHM_GGS_Inventory_Camera_001.mp4"
            },
            {
                camera: "Offshore Drilling Rig- VIJAY-1",
                issuefound: "03",
                image: svg2,
                video: "Offshore_Rig_StarQuest_Camera_0011.mp4"
            },
            {
                camera: "Offshore Drilling Rig- TSTAR-11",
                issuefound: "02",
                image: svg3,
                video: "Offshore_Rig_TSTARCamera_0017.mp4"
            },
            {
                camera: "AHM GGS – Maintenance Yard",
                issuefound: "04",
                image: svg4,
                video: "Offshore_Rig_StarQuest_Camera_0011.mp4"
            },
            {
                camera: "AHM-GGS-Maintenance Workshop",
                issuefound: "01",
                image: svg5,
                video: "http://localhost:3011/get_video"
            },
            {
                camera: "AHM-GGS-Chemical Inventory Unit",
                issuefound: "01",
                image: svg6,
                video: "http://localhost:3011/get_video"
            },
            {
                camera: "AHM-GGS-Compressor Unit",
                issuefound: "01",
                image: svg7,
                video: "http://localhost:3011/get_video"
            }
        ]
    }
    return (
        <div className='stack-sv'>
            <Stack gap={3} style={{margin:"5px"}}>
            <div className="p-2" style={{ display: "flex" }}>
                <div style={{ display: "flex" }}>
                    <select value={value} onChange={handleStatusChange} className='status-dd-sv'>
                        <option value="" disabled selected>Issue Type</option>
                        <option value="In Progress">In Progress</option>
                        <option value="Completed">Completed</option>
                        <option value="Clear">Clear</option>
                    </select></div>

                <div style={{ display: "flex" }}>
                    <select value={value} onChange={handleStatusChange} className='status-dd-sv'>
                        <option value="" disabled selected>Area</option>
                        <option value="In Progress">In Progress</option>
                        <option value="Completed">Completed</option>
                        <option value="Clear">Clear</option>
                    </select></div>
                <div class="icon-input-sv">
                    <span class="icon12">
                        <img src={calender} style={{ width: "14px", paddingTop: "23px", marginBottom: "17px", marginLeft:"-10px" }} /></span>
                    <DatePicker
                        className="status-dd-sv datepicker-sv"
                        selected={calenderValue}
                        onChange={handleCalenderChange}
                        dateFormat="dd/MM/yyyy"
                        isClearable
                        placeholderText="From date"
                        onBlur={handleClearDate}
                    /></div>
                <div class="icon-input-sv">
                    <span class="icon12-sv">
                        <img src={calender} style={{ width: "14px", paddingTop: "23px", marginBottom: "17px", marginLeft:"-8px"  }} /></span>
                    <DatePicker
                        className="status-dd-sv datepicker-sv"
                        selected={calenderValue}
                        onChange={handleCalenderChange}
                        dateFormat="dd/MM/yyyy"
                        isClearable
                        placeholderText="To Date"
                        onBlur={handleClearDate}
                    /></div>                    
            </div>
            <div style={{ overflowY: "auto", height:"70vh" }}>
            {(videodata.data.map(item => (
                <div className="p-6 videoList-sv">
                    <div className='col-sm-8' style={{padding:"10px" }} onClick={() => props.updatePlayerInfo(item.video)}>
                        <p className='drill-body'>{item.camera}</p>
                        <p className='status-drill'> Issues found: {item.issuefound}</p>
                    </div>
                    <div className='col-sm-4' style={{padding:"3px" }} >
                        <img src={item.image} style={{ width: "85%", height: "97%" }} /></div>
                </div>)))}
                </div>

        </Stack></div>
    )
}

export default SafetyVigilanceSide