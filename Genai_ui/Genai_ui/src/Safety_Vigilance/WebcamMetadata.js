import React, { useRef, useEffect } from 'react';
import Stack from 'react-bootstrap/Stack';
import 'react-datepicker/dist/react-datepicker.css';
import './SafetyVigilance.css';
import back from '../images/nav-Vector.svg';
import warning from '../images/warning.svg';

function WebcamMetadata(props) {

    const severityColors = {
        MODERATE: '#FFC000',
        MAJOR: '#0066FF',
        CRITICAL: '#DC1D00',
        LOW: '#03D9FF'
    };
    const getBackgroundColor = (severity) => {
        if (severity == "Critical") {
            return severityColors.CRITICAL;
        }
        else if (severity == "High") {
            return severityColors.MAJOR;
        }
        if (severity == "Moderate") {
            return severityColors.MODERATE;
        }
        else if (severity == "Low") {
            return severityColors.LOW;
        }
        return 'white';
    };
    const ref1 = useRef(null);
    useEffect(() => {
        ref1.current?.scrollIntoView({ behavior: 'smooth' });
    }, [props.responseDataArray]);
    return (
        <div className='stack-sv' >
            <Stack gap={3}>
                <div className="p-1" style={{ display: "flex", borderBottom: "1px solid rgb(6, 214, 160)", backgroundColor: "rgb(54, 54, 89)", borderTopRightRadius: "15px", borderTopLeftRadius: "15px", position: "relative" }}>
                    <span className='metadata-heading-sv' style={{ margin: "5px 0px 10px 5px" }}>Metadata</span>
                    {/* <img src={warning} style={{ width: "20px", left: "65%", position: "relative", cursor: "pointer" }} onClick={props.handlemail} /> */}
                    <img className='icon-back-doa' src={back} onClick={props.viewMetadatafunc} style={{ left: "72%", position: "relative", cursor: "pointer" }} />
                </div>
                <div style={{ overflowY: "auto", height: "72vh" }}>
                    {(props.responseDataArray.map(item => (
                        <div style={{ borderBottom: "1px solid #8d97dac5", marginBottom: "5px" }} className="p-6">
                            <div className="metadataList-sv">
                                {/* {item.image} */}
                                <div className='col-sm-4' style={{ padding: "15px" }} >
                                    <img src={item.image} style={{ width: "9vw", height: "15vh" }} />
                                </div>
                                <div className='col-sm-8' style={{ padding: "10px 4px 0px 5px" }} >
                                    <p className='metadata-text-sv'><b className="metadata-key-sv1"> {`Person Tag : \u00A0`} </b> {item.data.PERSONTAG}</p>
                                    <p className='metadata-text-sv'><b className="metadata-key-sv1"> {`Object Tag : \u00A0`} </b> {item.data.OBJECTTAG}</p>
                                    {/* <p className='status-sv' style={{ backgroundColor: getBackgroundColor(item.data.Severity) }}><b> {`Severity :\u00A0`} </b> {item.data.Severity}</p> */}
                                    <p className='metadata-text-sv' style={{ marginTop: "8px", marginLeft: "2px" }} ><b className="metadata-key-sv1"> {`SafetyIssue : \u00A0`} </b> {item.data.SafetyIssue == "" ? <>No Safety issue detected</> : <>{item.data.SafetyIssue}</>}</p>
                                </div>
                            </div>
                            {!item.data.Context == "" && <div>
                                <p className='metadata-text-sv' style={{ padding: "0px 10px 0px 10px" }}> <b className="metadata-key-sv1"> {`Issues Description : \u00A0`}</b> {item.data.Context}</p>
                            </div>}
                        </div>
                    )))}
                    {props.viewMetadataLoading && <div className="loader-sv" ref={ref1}>
                        <div className="dot-cq-sv red-c-sv"></div>
                        <div className="dot-cq-sv green-c-sv"></div>
                        <div className="dot-cq-sv blue-c-sv"></div>
                    </div>}
                </div>


            </Stack>
        </div>
    )
}

export default WebcamMetadata