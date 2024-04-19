import React, { useState, useEffect } from 'react';
import './Doa.css';
import back from './images/nav-Vector.svg';
import share from './images/share-nobg.svg';
import copy from './images/copy-nobg.svg';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function RigDetails({onClose}) {
    return (
        <div className='rig-details-panel'>
            <div className='rig-details-panel-top'>
                <p className='analysis-header'>Drilling Report <div className='icon-doa'>
                <img className='icon-back-doa' src={back} alt='Sample'  onClick={onClose}/>
                <img className='icon-copy-doa' src={share} alt='Sample' />
                <img className='icon-copy-doa' src={copy} alt='Sample' />
            </div></p>
            
            </div>
            <div className='rig-details'>
                <Container>
                    <Row xl>
                        <Col sm={7}>
                            <Row className='rig-details-box' style={{ "margin": "0px 10px 10px 5px" }}>
                                <div>
                                    <div className='rig-details-header'>
                                        Rig and Well info
                                    </div>
                                    <div className='flex-cont'>
                                        <div className='col-sm-4'>
                                            <p className='rig-body'>{`Rig ID \u00A0 \u00A0 : \u00A0 S/GAU1`}</p>
                                            <p className='rig-body'>{`Well ID \u00A0 : \u00A0 SAZ#1`}</p>
                                        </div>
                                        <div className='col-sm-8'>
                                            <p className='rig-body'>{`Work Status \u00A0 : \u00A0 Work Over Job`}</p>
                                            <p className='rig-body'>{`Location \u00A0 \u00A0 \u00A0 \u00A0: \u00A0 05`}</p>
                                        </div>
                                    </div>
                                    <p className='rig-body'>{`POB \u00A0 \u00A0 \u00A0 : \u00A0 43+44= 87, FSBB: GREATSHIP DHRITI. = R.CHIMNAN G.SHANKAR S.KARAN`}</p>
                                </div>
                            </Row>
                            <Row className='rig-details-box' style={{ "margin": "0px 10px 10px 5px" }}>
                                <div className='col-sm-12'>
                                    <div className='rig-details-header'>Rig Operations </div>
                                    <div className='flex-cont-row'>
                                        <p className='rig-body'>{`0600-0700 \u00A0 \u00A0: \u00A0 P\O,B\OFF & L\DN 12 SINGLES OF 5 D\P & 3 SINGLES OF 5 HWDP`}</p>
                                        <p className='rig-body'>{`0600-0700 \u00A0 \u00A0: \u00A0 P\O,B\OFF & L\DN 12 SINGLES OF 5 D\P & 3 SINGLES OF 5 HWDP`}</p>
                                        <p className='rig-body'>{`0600-0700 \u00A0 \u00A0: \u00A0 P\O,B\OFF & L\DN 12 SINGLES OF 5 D\P & 3 SINGLES OF 5 HWDP`}</p>
                                        <p className='rig-body'>{`0600-0700 \u00A0 \u00A0: \u00A0 P\O,B\OFF & L\DN 12 SINGLES OF 5 D\P & 3 SINGLES OF 5 HWDP`}</p>
                                        <p className='rig-body'>{`0600-0700 \u00A0 \u00A0: \u00A0 P\O,B\OFF & L\DN 12 SINGLES OF 5 D\P & 3 SINGLES OF 5 HWDP`}</p>
                                        <p className='rig-body'>{`0600-0700 \u00A0 \u00A0: \u00A0 P\O,B\OFF & L\DN 12 SINGLES OF 5 D\P & 3 SINGLES OF 5 HWDP`}</p>

                                    </div>
                                </div>
                            </Row>
                            <Row>
                                <Col className='rig-details-box' style={{ "margin": "0px 10px 10px 13px" }}>

                                    <div className='col-sm-12'>
                                        <div className='rig-details-header'>Drilling Parameters </div>
                                        <div className='flex-cont-row'>
                                            <div>
                                                <p className='rig-body'>{`WOB \u00A0 \u00A0 : \u00A0 S/GAU1`}</p>
                                                <p className='rig-body'>{`RPM \u00A0 : \u00A0 SAZ#1`}</p>
                                                <p className='rig-body'>{`GPM \u00A0 : \u00A0 Work Over Job`}</p>
                                                <p className='rig-body'>{`PR \u00A0 \u00A0 \u00A0 \u00A0: \u00A0 05`}</p>
                                                <p className='rig-body'>{`TQ \u00A0 : \u00A0 Work Over Job`}</p>
                                                <p>Bit Details :</p>
                                                <p className='rig-body'>{`size \u00A0 \u00A0 \u00A0 \u00A0: \u00A0 05`}</p>
                                            </div>

                                        </div>
                                    </div>
                                </Col>
                                <Col className='rig-details-box' style={{ "margin": "0px 19px 10px 0px" }}>
                                    <div className='col-sm-12'>
                                        <div className='rig-details-header'>Mud Parameters </div>
                                        <div className='flex-cont-row'>
                                            <div>
                                                <p className='rig-body'>{`Mud Type \u00A0 \u00A0 : \u00A0 S/GAU1`}</p>
                                                <p className='rig-body'>{`MW \u00A0 : \u00A0 SAZ#1`}</p>
                                                <p className='rig-body'>{`VIS \u00A0 : \u00A0 Work Over Job`}</p>
                                                <p className='rig-body'>{`GEL \u00A0 \u00A0 \u00A0 \u00A0: \u00A0 05`}</p>
                                                <p className='rig-body'>{`PV/YP \u00A0 : \u00A0 Work Over Job`}</p>
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
                                                <p className='rig-body'>{`Wind \u00A0 \u00A0 : \u00A0 S/GAU1`}</p>
                                                <p className='rig-body'>{`Swell \u00A0 : \u00A0 SAZ#1`}</p>
                                                <p className='rig-body'>{`PR \u00A0 : \u00A0 Work Over Job`}</p>
                                                <p className='rig-body'>{`Visibility \u00A0 \u00A0 \u00A0 \u00A0: \u00A0 05`}</p>
                                                <p className='rig-body'>{`TQ \u00A0 : \u00A0 Work Over Job`}</p>
                                            </div>

                                        </div>
                                    </div>
                                </Col>
                                <Col className='rig-details-box' style={{ "margin": "0px 19px 10px 0px" }}>
                                    <div className='col-sm-12'>
                                        <div className='rig-details-header'>Logistics </div>
                                        <div className='flex-cont-row'>
                                            <div>
                                                <p className='rig-details-body'>{`1 \u00A0 : \u00A0 P\O,B\OFF & L\DN 12 SINGLES`}</p>
                                                <p className='rig-details-body'>{`1 \u00A0 : \u00A0 P\O,B\OFF & L\DN 12 SINGLES`}</p>
                                                <p className='rig-details-body'>{`1 \u00A0 : \u00A0 P\O,B\OFF & L\DN 12`}</p>
                                                <p className='rig-details-body'>{`1 \u00A0 : \u00A0 P\O,B\OFF & L\DN 12 `}</p>
                                                <p className='rig-details-body'>{`1 \u00A0 : \u00A0 P\O,B\OFF & L\DN 12`}</p>
                                                <p className='rig-details-body'>{`1 \u00A0 : \u00A0 P\O,B\OFF & L\DN 12 SINGLES `}</p>
                                            </div>

                                        </div>
                                    </div>
                                </Col>
                            </Row>
                            <Row className='rig-details-box' style={{ "margin": "0px 10px 10px 5px" }}>
                                <div className='col-sm-12'>
                                    <div className='rig-details-header'>HSE </div>
                                    <div className='flex-cont-row'>
                                        <p className='rig-body'>{`0600-0700 \u00A0 \u00A0: \u00A0 P\O,B\OFF & L\DN 12 SINGLES OF 5 D\P & 3 SINGLES OF 5 HWDP`}</p>
                                        <p className='rig-body'>{`0600-0700 \u00A0 \u00A0: \u00A0 P\O,B\OFF & L\DN 12 SINGLES OF 5 D\P & 3 SINGLES OF 5 HWDP`}</p>

                                    </div>
                                </div>
                            </Row>
                        </Col>
                        <Col sm={5}>
                            <Row className='rig-details-box' style={{ marginBottom: "10px" }}>
                                <div className='col-sm-12'>
                                    <div className='rig-details-header'>Issues </div>
                                    <div className='flex-cont-row'>
                                        <p className='rig-body'>{`0600-0700 \u00A0 \u00A0: \u00A0 P\O,B\OFF & L\DN 12 SINGLES OF 5 D\P & 3 SINGLES OF 5 HWDP`}</p>
                                        <p className='rig-body'>{`0600-0700 \u00A0 \u00A0: \u00A0 P\O,B\OFF & L\DN 12 SINGLES OF 5 D\P & 3 SINGLES OF 5 HWDP`}</p>

                                    </div>
                                </div>
                            </Row>
                            <Row className='rig-details-box' style={{ marginBottom: "10px" }}>
                                <div className='col-sm-12'>
                                    <div className='rig-details-header'>Requirements </div>
                                    <div className='flex-cont-row'>
                                        <p className='rig-body'>{`0600-0700 \u00A0 \u00A0: \u00A0 P\O,B\OFF & L\DN 12 SINGLES OF 5 D\P & 3 SINGLES OF 5 HWDP`}</p>
                                        <p className='rig-body'>{`0600-0700 \u00A0 \u00A0: \u00A0 P\O,B\OFF & L\DN 12 SINGLES OF 5 D\P & 3 SINGLES OF 5 HWDP`}</p>

                                    </div>
                                </div>
                            </Row>
                            <Row className='rig-details-box' style={{ marginBottom: "10px" }}>
                                <div className='col-sm-12'>
                                    <div className='rig-details-header'>Inventory </div>
                                    <div className='flex-cont-row'>
                                        <p className='rig-body'>{`0600-0700 \u00A0 \u00A0: \u00A0 P\O,B\OFF & L\DN 12 SINGLES OF 5 D\P & 3 SINGLES OF 5 HWDP`}</p>
                                        <p className='rig-body'>{`0600-0700 \u00A0 \u00A0: \u00A0 P\O,B\OFF & L\DN 12 SINGLES OF 5 D\P & 3 SINGLES OF 5 HWDP`}</p>

                                    </div>
                                </div>
                            </Row>
                            <Row className='rig-details-box' style={{ marginBottom: "10px" }}>
                                <div className='col-sm-12'>
                                    <div className='rig-details-header'>Other Info </div>
                                    <div className='flex-cont-row'>
                                        <p className='rig-body'>{`0600-0700 \u00A0 \u00A0: \u00A0 P\O,B\OFF & L\DN 12 SINGLES OF 5 D\P & 3 SINGLES OF 5 HWDP`}</p>
                                        <p className='rig-body'>{`0600-0700 \u00A0 \u00A0: \u00A0 P\O,B\OFF & L\DN 12 SINGLES OF 5 D\P & 3 SINGLES OF 5 HWDP`}</p>

                                    </div>
                                </div>
                            </Row>
                        </Col>
                    </Row>
                </Container>
            </div></div>
    )
}

export default RigDetails