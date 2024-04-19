import React, { useState, useEffect } from 'react'
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import MultilevelPieChart from './MultilevelPieChart';
import HorizontalBarChart from './HorizontalBarChart';
import HeatmapTable from './HeatmapTable';
import t1 from '../images/calendar_month.svg';
import t2 from '../images/confirmation_number.svg';
import t3 from '../images/settings.svg';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
// import JSONTable from './JSONTable';
import JSONTable from './Insights';
// import JSONTables from './Insights_core.js';
import Piechart from './Piechart';
import Example from './RootCauseAnalysis';
import Chatbot from './BPLAM_Chatbot.js';
// import ChatbotModal from './bplamChatbot.js';

function AnalysisBPLAM(props) {
    const { columns, index, data } = props.heatmapData;
    const dateStr = props.jsonResponse.date_range.end;
    // const dateStr = '23-Oct-23';
    const dateStr2 = props.jsonResponse.date_range.start;
    const dateObject = new Date(dateStr);
    const dateObject2 = new Date(dateStr2);

    const endmonthAbbreviation = dateObject.toLocaleString('default', { month: 'short' });
    // const endmonthAbbreviation = dateObject.toLocaleString('default', { month: 'short' }).toUpperCase();
    const endlastTwoDigitsOfYear = dateObject.getFullYear().toString().slice(-2);
    // const startmonthAbbreviation = dateObject2.toLocaleString('default', { month: 'short' }).toUpperCase();
    const startmonthAbbreviation = dateObject2.toLocaleString('default', { month: 'short' });
    const startlastTwoDigitsOfYear = dateObject2.getFullYear().toString().slice(-2);
    const areYearsSame = endlastTwoDigitsOfYear === startlastTwoDigitsOfYear;
    const [currentActivekey, setcurrentActivekey] = useState('Summary');
    return (
       <> {props.chatshow ? 
    //    <Chatbot closechat={props.closechat} renderchatResponse={props.renderchatResponse} 
    //         renderResponse={props.renderResponse} endpoint={props.endpoint} questions={props.questions} uploadkey={props.uploadkey} /> 
    <Chatbot closechat={props.closechat} renderchatResponse={props.renderchatResponse} 
            renderResponse={props.renderResponse} endpoint={props.endpoint} questions={props.questions} uploadkey={props.uploadkey} /> 
            :
            <Tabs
            // defaultActiveKey="Summary"
            activeKey={currentActivekey}
            onSelect={(k) => setcurrentActivekey(k)}
            id="uncontrolled-tab-example"
            className="mb-3"
            >
            <Tab eventKey="Summary" title="Summary">
                <div style={{ display: "flex", marginLeft: "15px" }}>
                    <Col xs={7}>
                        <div className='bplam-details-box' style={{ "margin": "0px 0px 10px 5px" }}>
                            <p className='bplam-header-barchart' style={{marginTop:"10px"}}>Ticket Analysis Summary</p>
                            <div className='images-t1'>
                                <img className='date-range' src={t1} />
                                {props.jsonResponse && props.jsonResponse.date_range && (
                                    <div style={{ marginLeft: "10px" }}>
                                        {/* <p className='tot-tic-text'>{props.jsonResponse.date_range.start} to {props.jsonResponse.date_range.end}</p>
                                        <p className='tot-tic-text2'>Duration</p> */}
                                        <p className='tot-tic-text'>{startmonthAbbreviation} '{startlastTwoDigitsOfYear} - {endmonthAbbreviation} '{endlastTwoDigitsOfYear}</p>
                                        <p className='tot-tic-text2'>Duration</p>
                                    </div>)}
                                <img className='tot-ticket' src={t2} />
                                <div className='ts'>
                                    <p className='tot-tic-text'>{props.jsonResponse.total_tickets}</p>
                                    <p className='tot-tic-text2'>Total Tickets</p>
                                </div>
                                <img className='tot-apps' src={t3} />
                                <div className='ts'>
                                    <p className='tot-app-text'>{props.jsonResponse.total_apps}</p>
                                    <p className='tot-tic-text2' style={{marginRight:"10px"}}>Total Apps</p>
                                </div>
                            </div>
                        </div>
                        <div className='bplam-details-box' style={{ "margin": "0px 0px 10px 5px" }}>
                            {/* < MultilevelPieChart data={props.jsonResponse.drilldowns} /> */}
                            <Piechart data={props.jsonResponse.drilldowns} />
                        </div>
                    </Col>
                    <Col sm={4.5}>
                        <div className='bplam-details-box' style={{ "margin": "0px 0px 10px 10px", height: "100vh" }}>

                            <HorizontalBarChart count={props.jsonResponse.top_10_contribution} data={props.jsonResponse.top_10_noisy_apps} />
                        </div>
                    </Col>
                </div>
                <div className=''>
                    <div className='b-lower-comp-t1 bplam-details-box' style={{ padding:"10px 10px 10px 15px", width: "92vw", height:"fit-content" }}>
                        <h2 className='hmt-header'>Issue Types by Business Process​</h2>
                        <HeatmapTable columns={columns} index={index} data={data} />
                    </div>
                </div>
            </Tab>
            <Tab eventKey="Insights" title="Insights">
                <div className='bplam-tab2-insights'>
                    <div className='bplam-tab2-insights-header'>Applications to Business Process Mapping</div>
                    <div>
                        <JSONTable jsonData2={props.jsonResponse2} />
                    </div>
                </div>
            </Tab>
            {/* <Tab eventKey="Insights2" title="Insights2">
                <div className='bplam-tab2-insights'>
                    <div className='bplam-tab2-insights-header'>Applications to Business Process Mapping</div>
                    <div>
                        <JSONTables jsonData2={props.jsonResponse2} />
                    </div>
                </div>
            </Tab> */}
            <Tab eventKey="Root Cause Analysis" title="Root Cause Analysis">
                <div className='bplam-root-cause-analysis'>
                    <h6 className='root-cause-bplam'>Root Cause Analysis for major issues</h6>
                    {/* <Example data={props.jsonResponse3} /> */}
                    <Example data={props.jsonResponse3} />
                </div>
            </Tab>
        </Tabs>}
        </>
    )
}

export default AnalysisBPLAM