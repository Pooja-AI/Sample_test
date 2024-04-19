import React, { props } from 'react';
import percent from './images/Group 3215.svg';
import pointer from './images/Group 3214.svg';
import heart from './images/Group 3213.svg';
import sridevi from './images/Shridevi.svg';
import jegan from './images/JEgan.svg';
import close from './images/Group 3005.svg';
import './Info.css';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function Info(props) {
  const infocontent = {
    "description": [
      "Gen AI can analyze historical performance data of assets and generate predictive models that anticipate potential failures or performance degradation. These models can help optimize maintenance schedules, reduce downtime, and enhance asset reliability by predicting when maintenance is most needed.",
      "By integrating Gen AI capabilities into Asset Performance Management, organizations can improve the efficiency, reliability, and overall lifecycle management of their assets."
    ],
    "BusinessValueProposition": [
      "Descriptive & Comparative Analysis",
      "Equipment Failure Root Cause analysis ",
      "Informed maintenance strategies",
      "Improve Data-Driven Decision Making",
      "Effective Recommendations ",
      "On-demand calculation of KPIs like MTTR, MTTF, MTBF etc., at an equipment level, FLOC level, asset level."
    ],
    "problemStatement": [
      "In asset-intensive industries, efficient management of equipment performance and maintenance is crucial for maximizing operational efficiency and reducing downtime.",
      "However, manual data analysis and disparate information sources make it challenging for maintenance teams to derive meaningful insights and take proactive actions."
    ],
    "Howdoesitwork": [
      "Data collection (e.g., Historical Formulation Data/Data from raw material/Production parameters)",
      "Data Processing",
      "Embedding input data into the Knowledge Graph Database",
      "GenAI Model interaction with the user (e.g., upload an Image, prompt a query)",
      "Output – Corrosion type and recommendations.",
      "Visual Representation of the Result"
    ],
    "Technologychoices": [
      "Containerized cloud",
      "deployment",
      "Cloud agnostic",
      "LLM: OpenAI models",
      "MySQL"
    ]
  }
  return (
    <div className="modal-info-main">
      <div className='modal-info'>
        <Container className="modal-content-info">
        <img className='close-btn-info' src={close} alt='Sample' onClick={props.onClose} />
          <Row xl style={{padding:"15px"}}>
            
            <Col xl>
              <Row>
                <Col style={{borderRight:"1px solid rgba(255, 255, 255, 0.1)"}}>
                <h1 className='info-header'>Description</h1>
                <ul>
                  {
                    props.infocontent.description.map(item => (
                      <li className='para'>{item}</li>
                    ))
                  }
                </ul>
                </Col>
                <Col><h1 className='info-header'>What problem are we solving?</h1>
                  <ul>
                    {
                      props.infocontent.problemStatement.map(item => (
                        <li className='para'>{item}</li>
                      ))
                    }
                  </ul>
                </Col>
                <Col><h1 className='info-header'>How does it work?</h1>
                  <ul>
                    {
                      props.infocontent.Howdoesitwork.map(item => (
                        <li className='para'>{item}</li>
                      ))
                    }
                  </ul>
                </Col>
                <Col>
                  <h1 className='info-header'>Technology Choices</h1>
                  <ul>
                    {
                      props.infocontent.BusinessValueProposition.map(item => (
                        <li className='para'>{item}</li>
                      ))
                    }
                  </ul>
                </Col>
              </Row>
              <Row style={{borderTop:"1px solid rgba(255, 255, 255, 0.1)", paddingTop:"25px"}}>
                <Col xs={3} style={{borderRight:"1px solid rgba(255, 255, 255, 0.1)"}}>
                <h1 className='info-header'>Business Value Proposition</h1>
                <ul>
                  {
                    props.infocontent.BusinessValueProposition.map(item => (
                      <li className='para'>{item}</li>
                    ))
                  }
                </ul>
                </Col>
               <Col xs={9}  > <h1 className='info-header'>Contacts</h1>
               <div style={{display:"flex", marginTop:"10px"}}>
                <Col xs={6}  style={{display:"flex", marginTop:"10px"}}>
                <img className="shri-pic" src={sridevi} />
                <div style={{marginLeft:"20px"}}><h1 className='info-header'>Shridevi Bale</h1>
                <p className='para'>Lead Resources and Energy Industry, <br/> Advanced Technology Center India</p>
                </div>
                </Col>
                <Col xs={6} style={{display:"flex", marginTop:"10px"}}>
                <img className="jegan-pic" src={jegan}/>
                <div style={{marginLeft:"20px"}}><h1 className='info-header'>Jegan Baskaran</h1>
                <p className='para'>Sr Manager, <br/> RES Energy Advanced Technology Center India</p>
                </div>
                </Col>
                </div>
                </Col>
              </Row>
            </Col>
          </Row>
        </Container>

       
      </div>

    </div>
  )
}

export default Info