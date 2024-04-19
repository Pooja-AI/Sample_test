import React, { useState, useEffect, props } from 'react';
import './Doa.css';
import back from '../images/nav-Vector.svg';
import share from '../images/share-nobg.svg';
import copy from '../images/copy-nobg.svg';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Chatbot from '../Generic_Chatbot';

function RigDetails(props) {
    const [isCopied, setIsCopied] = useState(false);

    const handleCopyClick = async () => {
      try {
        await navigator.clipboard.writeText(JSON.stringify(props.data[0]));
        setIsCopied(true);
      } catch (error) {
        console.error('Error copying to clipboard:', error.message);
      }
    };
    return (
        <> {props.chatshow ? <Chatbot closechat={props.closechat} renderchatResponse={props.renderchatResponse} renderResponse={props.renderResponse} endpoint={props.endpoint} questions={props.questions} /> :
            <div className='rig-details-panel'>
                <div className='rig-details-panel-top'>
                    <p className='analysis-header'>Drilling Report <div className='icon-doa1'>
                        <img className='icon-back-doa1' src={back} alt='Sample' onClick={props.onClose} />
                        <img className='icon-share-doa' src={share} alt='Sample' />
                        <img className='icon-copy-doa' onClick={handleCopyClick} src={copy} alt='Sample' />
                    </div></p>
                </div>
                <div className='rig-details'>
                    <Container>
                        <Row xl>
                            <Col sm={7}>
                                <Row className='rig-details-box' style={{ "margin": "0px 0px 10px 5px" }}>
                                    <div>
                                        <div className='rig-details-header'>
                                            Rig and Well info
                                        </div>
                                        <div className='flex-cont'>
                                            <div className='col-sm-4'>
                                                <p className='rig-body'><span style={{ fontWeight: "500" }}>{`Rig ID \u00A0 \u00A0 : \u00A0`}</span> {props.data[0].RigID}</p>
                                                <p className='rig-body'><span style={{ fontWeight: "500" }}>{`Well ID \u00A0 : \u00A0`}</span> {props.data[0].RigAnalysis && props.data[0].RigAnalysis.WellRigInformation ? props.data[0].RigAnalysis.WellRigInformation.WellID : <p className='rig-body'>Not Reported</p>}</p>
                                            </div>
                                            <div className='col-sm-8'>
                                                {
                                                    props.data[0].RigAnalysis.WellRigInformation ?
                                                        <>
                                                            <p className='rig-body'><span style={{ fontWeight: "500" }}>{`Work Status \u00A0 : \u00A0 `}</span>{props.data[0].RigAnalysis.WellRigInformation.WorkStatus}</p>
                                                            <p className='rig-body'><span style={{ fontWeight: "500" }}>{`Location \u00A0 \u00A0 \u00A0 \u00A0: \u00A0 `}</span>{props.data[0].RigAnalysis.WellRigInformation.Location}</p></> :
                                                        null
                                                }
                                            </div>
                                        </div>
                                        <p className='rig-body'><span style={{ fontWeight: "500" }}>{`POB \u00A0 \u00A0 \u00A0 : \u00A0 `}</span>{props.data[0].RigAnalysis && props.data[0].RigAnalysis.WellRigInformation && props.data[0].RigAnalysis.WellRigInformation["Personnel Onboarded"] ? props.data[0].RigAnalysis.WellRigInformation["Personnel Onboarded"].EmployeeCount : <p className='rig-body'>Not Reported</p>}</p>
                                    </div>
                                </Row>
                                <Row className='rig-details-box' style={{ "margin": "0px 0px 10px 5px", height: "180px", overflowY: "auto" }}>
                                    <div className='col-sm-12'>
                                        <div className='rig-details-header'>Rig Operations </div>
                                        <div className='flex-cont-row'>

                                            {
                                                props.data[0].RigAnalysis &&  props.data[0].RigAnalysis.RigOperations && props.data[0].RigAnalysis.RigOperations.Operations  && Array.isArray(props.data[0].RigAnalysis.RigOperations.Operations) ? (

                                                    <ul className='rig-body'>
                                                        {props.data[0].RigAnalysis.RigOperations.Operations.map((item, index) => (
                                                            <li key={index}>{item}</li>
                                                        ))}
                                                    </ul>
                                                ) : (

                                                    <div className='rig-body'>
                                                        {props.data[0].RigAnalysis.RigOperations.Operations}
                                                    </div>
                                                )
                                            }
                                        </div>
                                    </div>
                                </Row>
                                <Row>
                                    <Col className='rig-details-box' style={{ "margin": "0px 10px 10px 13px", height: "200px", overflowY: "auto" }}>

                                        <div className='col-sm-12'>
                                            <div className='rig-details-header'>Drilling Parameters </div>
                                            <div className='flex-cont-row'>
                                                <div>
                                                    {
                                                       props.data[0].RigAnalysis &&  props.data[0].RigAnalysis.DrillingParameters ? <>
                                                            <p className='rig-body'><span style={{ fontWeight: "500" }}>{`WOB \u00A0 \u00A0: \u00A0`}</span>{props.data[0].RigAnalysis.DrillingParameters.WOB}</p>
                                                            <p className='rig-body'><span style={{ fontWeight: "500" }}>{`RPM \u00A0 \u00A0 :\u00A0 `}</span>{props.data[0].RigAnalysis.DrillingParameters.RPM}</p>
                                                            <p className='rig-body'><span style={{ fontWeight: "500" }}>{`GPM \u00A0 \u00A0: \u00A0`}</span>{props.data[0].RigAnalysis.DrillingParameters.GPM}</p>
                                                            <p className='rig-body'><span style={{ fontWeight: "500" }}>{`PR \u00A0 \u00A0 \u00A0 \u00A0:\u00A0 `}</span>{props.data[0].RigAnalysis.DrillingParameters.SPP}</p>
                                                            <p className='rig-body'><span style={{ fontWeight: "500" }}>{`TQ \u00A0 \u00A0 \u00A0 \u00A0:\u00A0 `}</span>{props.data[0].RigAnalysis.DrillingParameters.TORQU}</p>
                                                            <p className='rig-header1'>Bit Details :</p>
                                                            <p className='rig-body'><span style={{ fontWeight: "500" }}>{`size \u00A0 \u00A0 \u00A0: \u00A0 `}</span>{props.data[0].RigAnalysis.DrillingParameters.BitDetails.size}</p>
                                                        </>
                                                            : <p className='rig-body'>Not Reported</p>
                                                    }
                                                </div>

                                            </div>
                                        </div>
                                    </Col>
                                    <Col className='rig-details-box' style={{ "margin": "0px 13px 10px 0px", height: "200px", overflowY: "auto" }}>
                                        <div className='col-sm-12'>
                                            <div className='rig-details-header'>Mud Parameters </div>
                                            <div className='flex-cont-row'>
                                                <div>
                                                    {
                                                        props.data[0].RigAnalysis && props.data[0].RigAnalysis.MudParameters ? <>
                                                            <p className='rig-body'><span style={{ fontWeight: "500" }}>{`Mud Type \u00A0 \u00A0: \u00A0 `}</span>{props.data[0].RigAnalysis.MudParameters.MudType}</p>
                                                            <p className='rig-body'><span style={{ fontWeight: "500" }}>{`MW \u00A0 \u00A0 \u00A0 \u00A0 \u00A0 \u00A0 \u00A0 : \u00A0 `}</span>{props.data[0].RigAnalysis.MudParameters.MW}</p>
                                                            <p className='rig-body'><span style={{ fontWeight: "500" }}>{`VIS \u00A0 \u00A0 \u00A0 \u00A0 \u00A0 \u00A0 \u00A0 \u00A0: \u00A0 `}</span>{props.data[0].RigAnalysis.MudParameters.VIS}</p>
                                                            <p className='rig-body'><span style={{ fontWeight: "500" }}>{`GEL \u00A0 \u00A0 \u00A0 \u00A0 \u00A0 \u00A0 \u00A0 : \u00A0`}</span>{props.data[0].RigAnalysis.MudParameters.GEL}</p>
                                                            <p className='rig-body'><span style={{ fontWeight: "500" }}>{`PV/YP \u00A0 \u00A0 \u00A0 \u00A0 \u00A0 : \u00A0`}</span>{props.data[0].RigAnalysis.MudParameters["PV/YP"]}</p>
                                                        </>
                                                            : <p className='rig-body'>Not Reported</p>
                                                    }
                                                </div>
                                            </div>
                                        </div>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col className='rig-details-box' style={{ "margin": "0px 10px 10px 13px" }}>
                                        <div className='col-sm-12'>
                                            <div className='rig-details-header'>Weather </div>
                                            <div className='flex-cont-row'>
                                                <div>
                                                    {
                                                        props.data[0].RigAnalysis && props.data[0].RigAnalysis.Weather ? <>
                                                            <p className='rig-body'><span style={{ fontWeight: "500" }}>{`Wind \u00A0 \u00A0 \u00A0 \u00A0 : \u00A0 `}</span>{props.data[0].RigAnalysis.Weather.Wind}</p>
                                                            <p className='rig-body'><span style={{ fontWeight: "500" }}>{`Swell \u00A0 \u00A0 \u00A0 \u00A0 : \u00A0 `}</span>{props.data[0].RigAnalysis.Weather.Swell}</p>
                                                            <p className='rig-body'><span style={{ fontWeight: "500" }}>{`PR \u00A0 \u00A0 \u00A0 \u00A0 \u00A0 \u00A0 \u00A0: \u00A0 `}</span>{props.data[0].RigAnalysis.Weather.PR}</p>
                                                            <p className='rig-body'><span style={{ fontWeight: "500" }}>{`Visibility \u00A0 : \u00A0 `}</span>{props.data[0].RigAnalysis.Weather.Visibility}</p>
                                                            <p className='rig-body'><span style={{ fontWeight: "500" }}>{`TQ \u00A0 \u00A0 \u00A0 \u00A0 \u00A0 \u00A0 \u00A0: \u00A0 `}</span>{props.data[0].RigAnalysis.Weather.TQ}</p>
                                                        </>
                                                            : <p className='rig-body'>Not Reported</p>
                                                    }
                                                </div>

                                            </div>
                                        </div>
                                    </Col>
                                    <Col className='rig-details-box' style={{ "margin": "0px 13px 10px 0px", overflowY: "auto", height: "180px" }}>
                                        <div className='col-sm-12'>
                                            <div className='rig-details-header'>Logistics </div>
                                            <div className='flex-cont-row'>
                                                {/* {props.data[0].RigAnalysis.Logistics.map((index) => (
                                                    <ul key={index} className='rig-body'>
                                                        <li>{index}</li></ul>))} */}
                                                {
                                                   props.data[0].RigAnalysis &&  props.data[0].RigAnalysis.Logistics &&   Array.isArray(props.data[0].RigAnalysis.Logistics) ? (

                                                        <ul className='rig-body'>
                                                            {props.data[0].RigAnalysis.Logistics.map((item, index) => (
                                                                <li key={index}>{item}</li>
                                                            ))}
                                                        </ul>
                                                    ) : (

                                                        <div className='rig-body'>
                                                            {props.data[0].RigAnalysis.Logistics}
                                                        </div>
                                                    )
                                                }

                                            </div>
                                        </div>
                                    </Col>
                                </Row>
                                <Row className='rig-details-box' style={{ "margin": "0px 0px 10px 0px", height: "130px" }}>
                                    <div className='col-sm-12'>
                                        <div className='rig-details-header'>HSE </div>
                                        <div className='flex-cont-row'>
                                            {/* {props.data[0].RigAnalysis.HSE.map((index) => (
                                                <ul key={index} className='rig-body'>
                                                    <li>{index}</li></ul>))} */}
                                            {
                                                props.data[0].RigAnalysis && props.data[0].RigAnalysis.HSE && Array.isArray(props.data[0].RigAnalysis.HSE) ? (

                                                    <ul className='rig-body'>
                                                        {props.data[0].RigAnalysis.HSE.map((item, index) => (
                                                            <li key={index}>{item}</li>
                                                        ))}
                                                    </ul>
                                                ) : (

                                                    <div className='rig-body'>
                                                        {props.data[0].RigAnalysis.HSE}
                                                    </div>
                                                )
                                            }

                                        </div>
                                    </div>
                                </Row>
                            </Col>
                            <Col sm={5}>
                                <Row sm={4} className='rig-details-box' style={{ marginBottom: "10px", height: "225px", overflowY: "auto" }}>
                                    <div className='col-sm-12'>
                                        <div className='rig-details-header'>Issues </div>
                                        <div className='flex-cont-row'>
                                            {/* {props.data[0].RigAnalysis.Issues.map((index) => (
                                                <ul key={index} className='rig-body'>
                                                    <li>{index}</li></ul>))} */}
                                            {
                                                props.data[0].RigAnalysis && props.data[0].RigAnalysis.Issues && Array.isArray(props.data[0].RigAnalysis.Issues) ? (

                                                    <ul className='rig-body'>
                                                        {props.data[0].RigAnalysis.Issues.map((item, index) => (
                                                            <li key={index}>{item}</li>
                                                        ))}
                                                    </ul>
                                                ) : (

                                                    <div className='rig-body'>
                                                        {props.data[0].RigAnalysis.Issues}
                                                    </div>
                                                )
                                            }
                                        </div>
                                    </div>
                                </Row>
                                <Row sm={4} className='rig-details-box' style={{ marginBottom: "10px", height: "225px", overflowY: "auto" }}>
                                    <div className='col-sm-12'>
                                        <div className='rig-details-header'>Requirements </div>
                                        <div className='flex-cont-row'>
                                            {/* {props.data[0].RigAnalysis.Requirements.map((index) => (
                                                <ul key={index} className='rig-body'>
                                                    <li>{index}</li></ul>))} */}
                                            {
                                                props.data[0].RigAnalysis && props.data[0].RigAnalysis.Requirements && Array.isArray(props.data[0].RigAnalysis.Requirements) ? (

                                                    <ul className='rig-body'>
                                                        {props.data[0].RigAnalysis.Requirements.map((item, index) => (
                                                            <li key={index}>{item}</li>
                                                        ))}
                                                    </ul>
                                                ) : (

                                                    <div className='rig-body'>
                                                        {props.data[0].RigAnalysis.Requirements}
                                                    </div>
                                                )
                                            }
                                        </div>
                                    </div>
                                </Row>
                                <Row sm={4} className='rig-details-box' style={{ marginBottom: "10px", height: "225px", overflowY: "auto" }}>
                                    <div className='col-sm-12'>
                                        <div className='rig-details-header'>Inventory </div>
                                        <div className='flex-cont-row'>
                                            {props.data[0].RigAnalysis && props.data[0].RigAnalysis.Inventory ? (Object.entries(props.data[0].RigAnalysis.Inventory).map(([item, quantity]) => (
                                                <ul className='rig-body' style={{ lineHeight: "15px" }}> <li key={item}>
                                                    <span style={{ fontWeight: "500" }}>{item}:</span> {quantity}
                                                </li>
                                                </ul>
                                            ))) : (
                                                <p className='rig-body'>Not Reported</p>
                                            )}
                                        </div>
                                    </div>
                                </Row>
                                <Row sm={4} className='rig-details-box' style={{ marginBottom: "10px", height: "130px" }}>
                                    <div className='col-sm-12'>
                                        <div className='rig-details-header'>Other Info </div>
                                        <div className='flex-cont-row'>
                                            {props.data[0].RigAnalysis && props.data[0].RigAnalysis.OtherInfo ? <><p className='rig-body'><span style={{ fontWeight: "500" }}>{`COVID Marshall \u00A0 \u00A0: \u00A0 `}</span>{props.data[0].RigAnalysis.OtherInfo.COVIDMarshall}</p>
                                                <p className='rig-body'><span style={{ fontWeight: "500" }}>{`Personnel Details \u00A0 \u00A0: \u00A0`}</span>{props.data[0].RigAnalysis.OtherInfo.PersonnelDetails}</p>
                                            </> : <p className='rig-body'>Not Reported</p>}
                                        </div>
                                    </div>
                                </Row>
                            </Col>
                        </Row>
                    </Container>
                </div></div>
        }</>
    )
}

export default RigDetails