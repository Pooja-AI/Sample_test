import React, { useState, useEffect, props } from 'react';
import filter from '../images/XMLID_6_.svg';
import RigDetails from './RigDetails';
import './Doa.css';
import back from '../images/nav-Vector.svg';
import Chatbot from '../Generic_Chatbot';
import search from '../images/XMLID_223_.svg';
import calender from '../images/Calender.svg';
import filter1 from '../images/Vector-doa.svg';

function Rig(props) {
    const severityColors = {
        Low: '#FFC000',
        Medium: '#0066FF',
        High: '#DC1D00',
    };
    const [value, setValue] = React.useState('');

    const handleChange = (event) => {
        setValue(event.target.value);
    };
    const [calenderValue, setCalenderValue] = React.useState('');

    const handleCalenderChange = (event) => {
        setCalenderValue(event.target.value);
    };
    const [rigDetailsShow, setRigDetailsShow] = useState(false);
    const [rigAnalysisData, setRigAnalysisDataData] = useState([]);
    const getRig = (RigID) => {
        const rigdetails = props.data.filter(item => item.RigID === RigID)
        console.log(rigdetails[0].RigAnalysis.RigOperations.Operations);
        setRigAnalysisDataData(rigdetails);
        setRigDetailsShow(!rigDetailsShow);
    }
    const getBackgroundColor = (value) => {
        if (props.rigSeverity.highSeverity.includes(value)) {
            return severityColors.High;
        }
        else if (props.rigSeverity.mediumSeverity.includes(value)) {
            return severityColors.Medium;
        } else if (props.rigSeverity.lowSeverity.includes(value)) {
            return severityColors.Low;
        }
        return 'white';
    };
    const [filterText, setFilterText] = useState('');
    const [filterMode, setFilterMode] = useState(false);
    const [filteredRigData, setFilteredRigData] = useState([]);
    const handleFilterTextChange = event => {
        setFilterText(event.target.value);
        console.log(event.target.value)
        handleFiterChange(event.target.value, "Text");
        setFilterMode(true);
    };
    const handleFiterChange = async (value, type) => {
        if (type === "Text") {
            const filteredResult = props.data.filter(item => {
                return value ? item.RigID.toLowerCase().includes(value.toLowerCase()) : item;
            });
            setFilteredRigData(filteredResult);
        }
        else {
            setFilterMode(false);
        }
    };
    return (
        <>
            {rigDetailsShow ? <RigDetails onClose={() => setRigDetailsShow(false)} data={rigAnalysisData} chatshow={props.chatshow} closechat={props.closechat} renderchatResponse={props.renderchatResponse} renderResponse={props.renderResponse} endpoint={props.endpoint} questions={props.questions} /> : (props.chatshow ? <Chatbot closechat={props.closechat} renderchatResponse={props.renderchatResponse} renderResponse={props.renderResponse} endpoint={props.endpoint} questions={props.questions} /> :
                <div className='rig-panel'>
                    <div className='rig-panel-top'>
                        <div className='analysis-header-rig col-sm-5'>Drilling Operations - Evening Report</div>
                        <div className='icon-doa-rig col-sm-7'>
                            <div class="icon-input">
                                <span class="icon12-rig">
                                    <img src={search} style={{ width: "17px" }} />
                                </span>
                                <input className='search-rig'
                                    type="text"
                                    value={filterText}
                                    onChange={handleFilterTextChange}
                                    placeholder="Search here" />
                            </div>
                            <img src={filter1} className='icon-drilling-button' />
                            <img src={filter} className='icon-drilling-button' />
                            <img src={calender} className='icon-drilling-button' />
                            <p className='date-rig'>10/19/2023 12:00:00 AM​</p>
                            <img className='icon-back-doa' src={back} onClick={props.close} />
                        </div>
                    </div>
                    <div className='rig-company'>
                        <p className='rig-top-header'> Company Rigs</p>
                        <div className='rig-box'>{
                            filterMode ? filteredRigData.map(item => (
                                <div className='rig' onClick={() => getRig(item.RigID)}>
                                    <div style={{ "padding": "6% 6% 0% 6%" }}><p className='rig-header'>Rig ID : {item.RigID}</p>
                                        <p className='rig-body' style={{ "texWrap": "wrap" }}>{`Well ID \u00A0: \u00A0`}{item.RigAnalysis && item.RigAnalysis.WellRigInformation && item.RigAnalysis.WellRigInformation.WellID ? item.RigAnalysis.WellRigInformation.WellID : <p className='rig-body'>Not Reported</p>}</p>
                                        <p className='rig-body'>{`Status \u00A0 : Work Over Job`}</p>
                                        <p className='rig-body'>{`Issue \u00A0  \u00A0 :  `} {item.RigAnalysis && item.RigAnalysis.Issues ? item.RigAnalysis.Issues.length : 0}</p>
                                        <p className='rig-body'>{`Req \u00A0  \u00A0 \u00A0 :  `} {item.RigAnalysis && item.RigAnalysis.Requirements ? item.RigAnalysis.Requirements.length : 0}</p>
                                    </div>
                                    <div className='rig-severity' style={{ backgroundColor: getBackgroundColor(item.RigAnalysis.Issues.length) }}>
                                    </div>
                                </div>
                            )) :
                                props.data.map(item => (
                                    <div className='rig' onClick={() => getRig(item.RigID)}>
                                        <div style={{ "padding": "6% 6% 0% 6%" }}><p className='rig-header'>Rig ID : {item.RigID}</p>
                                            <p className='rig-body' style={{ "texWrap": "wrap" }}>{`Well ID \u00A0: \u00A0`}{item.RigAnalysis && item.RigAnalysis.WellRigInformation && item.RigAnalysis.WellRigInformation.WellID ? item.RigAnalysis.WellRigInformation.WellID : <p className='rig-body'>Not Reported</p>}</p>
                                            <p className='rig-body'>{`Status \u00A0 : Work Over Job`}</p>
                                            <p className='rig-body'>{`Issue \u00A0  \u00A0 :  `} {item.RigAnalysis && item.RigAnalysis.Issues ? item.RigAnalysis.Issues.length : 0}</p>
                                            <p className='rig-body'>{`Req \u00A0  \u00A0 \u00A0 :  `} {item.RigAnalysis && item.RigAnalysis.Requirements ? item.RigAnalysis.Requirements.length : 0}</p>
                                        </div>
                                        <div className='rig-severity' style={{ backgroundColor: getBackgroundColor(item.RigAnalysis.Issues.length) }}>
                                        </div>
                                    </div>
                                ))
                        }
                        </div>
                    </div>
                </div>)
            }
        </>
    )
}

export default Rig