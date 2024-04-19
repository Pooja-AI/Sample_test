import React, { Component, useState } from 'react';
import {
    Player,
    ControlBar,
    ReplayControl,
    ForwardControl,
    CurrentTimeDisplay,
    TimeDivider,
    PlaybackRateMenuButton,
    VolumeMenuButton,
    BigPlayButton,
    PlayToggle,
    ProgressControl,
    FullscreenToggle
} from 'video-react';
import 'video-react/dist/video-react.css';
import SafetyVigilanceSide from './SafetyVigilanceSide';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import frame1 from '../images/frame-sv1.png';
import frame2 from '../images/frame-sv2.png';
import frame3 from '../images/frame-sv3.png';
import frame4 from '../images/frame-sv4.png';
import './SafetyVigilance.css';
import warning from '../images/warning.svg';
import play from '../images/play.svg';
import pause from '../images/pause.svg';
import fullScreen from '../images/fullScreen.svg';
import axios from 'axios';
import './SafetyVigilance.css';
import right_arrow_icon from '../images/right_arrow_icon.svg';
import left_arrow_icon from '../images/left_arrow_icon.svg';
import svg3 from '../images/svg3.png';
import svg4 from '../images/svg4.png';
import svg5 from '../images/svg5.jpg';
import svg6 from '../images/svg6.jpg';
import svg7 from '../images/svg7.jpg';
import close1 from '../images/Group 3206.svg';
import send from '../images/send_FILL0_wght400_GRAD0_opsz24 1.svg';
import regenerate from '../images/regenerate.svg';
import SafetyVigilanceMetadata from './SafetyVigilanceMetadata';
import camera_icon from '../images/camera_icon.svg';
import WebcamComponent from './WebcamComponent1';
import WebcamMetadata from './WebcamMetadata';
import back from '../images/nav-Vector.svg';
import Iicon from '../images/Group 3440.svg';
import Info from '../Info.js';

const sources = {
    video1: 'http://51.105.211.143:5000/get_video',
    sintelTrailer: "http://51.105.211.143:5000/get_vide"
};
const frame = {
    frames: [
        frame1, svg7, frame3, svg6, svg5, svg4, svg3
    ]
}
const responsive = {
    superLargeDesktop: {
        // the naming can be any, depends on you.
        breakpoint: { max: 4000, min: 3000 },
        items: 6
    },
    desktop: {
        breakpoint: { max: 3000, min: 1024 },
        items: 3
    },
    tablet: {
        breakpoint: { max: 1024, min: 464 },
        items: 2
    },
    mobile: {
        breakpoint: { max: 464, min: 0 },
        items: 1
    }
};
class CustomPlayToggle extends React.Component {
    handleClick = () => {
        // Your custom logic here
        console.log('PlayToggle clicked');
    }

    render() {
        return (
            <PlayToggle onClick={this.handleClick} {...this.props} />
        );
    }
}
export default class PlayerControlExample extends Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            source: null,
            isPlaying: false,
            viewEmail: false,
            mailFormData: {},
            viewMetadata: false,
            viewMetadataLoading: true,
            responseDataArray: [],
            imagelist: [],
            viewWebcam: false,
            viewWebcamMetaData: false,
            viewWebcamMetadataLoading: true,
            responseWebcamDataArray: [],
            attachement: [],
            mailLoading: true,
            sendmail: true,
            mailsent: true,
            mailcheck: false,
            isShiftMPressed: false,
            attachedimageview: false,
            showModal: false
        };
        this.player = React.createRef();
        this.play = this.play.bind(this);
        this.pause = this.pause.bind(this);
        this.load = this.load.bind(this);
        this.changeCurrentTime = this.changeCurrentTime.bind(this);
        this.seek = this.seek.bind(this);
        this.changePlaybackRateRate = this.changePlaybackRateRate.bind(this);
        this.changeVolume = this.changeVolume.bind(this);
        this.setMuted = this.setMuted.bind(this);
        this.updatePlayerInfo = this.updatePlayerInfo.bind(this);
        this.carouselRef = React.createRef();
        this.handleCenterClick = this.handleCenterClick.bind(this);
        this.sendApiRequest = this.sendApiRequest.bind(this);
        this.handleStateChange = this.handleStateChange.bind(this);
        // this.handleEmail = this.handleEmail.bind(this);
        // this.handleMailInputChange = this.handleMailInputChange.bind(this);
        // this.handleEmailView = this.handleEmailView.bind(this);
    }

    handlecontrol = () => {
        // Your custom play event logic here
        console.log('Custom play button clicked');
        this.setState({ isControlBarVisible: false }); // Hide the control bar after play
    };
    _isMounted = false;

    componentDidMount() {
        this._isMounted = true;
        // subscribe state change
        this.player.subscribeToStateChange(this.handleStateChange.bind(this));
        window.addEventListener('keydown', this.handleKeyDown);
    }

    componentWillUnmount() {
        this._isMounted = false;
        window.removeEventListener('keydown', this.handleKeyDown);
    }
    setMuted(muted) {
        return () => {
            this.player.muted = muted;
        };
    }

    handleKeyDown = (event) => {
        console.log('Key down:', event.key, event.code);
        if (event.key === 'M' && event.code === 'KeyM') {
            this.setState((prevState) => ({ isShiftMPressed: !prevState.isShiftMPressed }), () => {
                console.log('State updated to true:', this.state.isShiftMPressed);
            });
        }
    };

    handleStateChange = async (state, prevState) => {
        console.log("State change")
        this.setState({
            player: state
        });
        if (this.state.mailcheck || state.paused !== prevState.paused) {
            if (!state.paused) {
                // this.setState({ viewMetadataLoading: true });
                await this.sendApiRequest();
                this.setState({ viewMetadataLoading: false });
            }
        }
    };

    play() {
        this.player.play();
    }

    pause() {
        this.player.pause();
    }

    load() {
        if (this.player) {
            this.player.load();
        }
    }

    changeCurrentTime(seconds) {
        return () => {
            const { player } = this.player.getState();
            this.player.seek(player.currentTime + seconds);
        };
    }

    seek(seconds) {
        return () => {
            this.player.seek(seconds);
        };
    }

    changePlaybackRateRate(steps) {
        return () => {
            const { player } = this.player.getState();
            this.player.playbackRate = player.playbackRate + steps;
        };
    }

    changeVolume(steps) {
        return () => {
            const { player } = this.player.getState();
            this.player.volume = player.volume + steps;
        };
    }

    changeSource(name) {
        return () => {
            this.setState({
                source: name
            });
            this.player.load();
        };
    }
    handlePlay = () => {
        console.log('Custom play button clicked');
        this.state.isPlaying ? this.pause() : this.play();
        this.setState({ isPlaying: !(this.state.isPlaying) });
    };
    handleVideoSource = (source) => {
        console.log("here")
        this.changeSource('sintelTrailer')
    }
    updatePlayerInfo(inputVideoUrl) {
        console.log("Updating video source", this.state.isShiftMPressed);
        if (this.state.source !== inputVideoUrl) {
            console.log("here")
            this.setState(
                {
                    sourcelink: "http://51.105.211.143:5000/get_video/" + inputVideoUrl,
                    source: inputVideoUrl,
                },
                () => {
                    this.player.load();
                }
            );
            console.log("**********here***********")
            this.setState({ imagelist: [] });
            this.setState({ responseDataArray: [] });
        }
    }

    handleMoveCarousel = (direction) => {
        const { current: carousel } = this.carouselRef;
        const currentSlide = carousel.state.currentSlide;

        if (direction === 'next') {
            carousel.goToSlide(currentSlide + 1);
        } else if (direction === 'prev') {
            carousel.goToSlide(currentSlide - 1);
        }
    };

    handleCenterClick() {
        console.log("Add your custom logic here");
    }
    handleEmail = async () => {
        console.log("handleEmail");
        this.setState({ viewEmail: true, mailcheck: true });
        await this.callGenerateEmailapi()
    }
    handleRegenerateEmail = async () => {
        console.log("handleEmail");
        this.setState({ viewEmail: true });
        this.setState({ mailLoading: true });
        await this.callGenerateEmailapi()
    }
    handleMailInputChange = (e) => {
        const { name, value } = e.target;
        this.setState((prevState) => ({
            mailFormData: {
                ...prevState.mailFormData,
                [name]: value,
            },
        }));
    };
    handleMailSend = async () => {
        setTimeout(() => {
            this.setState({ mailsent: false });
        }, 2000);
        setTimeout(() => {
            this.setState({ sendmail: false, viewEmail: false });
        }, 1000);
    }
    callGenerateEmailapi = async () => {
        try {
            console.log("Handle email...")
            const frames = this.state.imagelist;
            console.log(frames);
            const responsearray = this.state.responseDataArray;
            console.log(responsearray);
            const indexOfCriticalSeverity = responsearray.findIndex((item) => item.data.Severity === "Critical");
            console.log(indexOfCriticalSeverity);
            const indexofresponse = indexOfCriticalSeverity === -1
                ? responsearray.findIndex((item) => item.data.Severity === "High")
                : indexOfCriticalSeverity;
            console.log(indexofresponse);
            const frame = indexofresponse !== -1 ? responsearray[indexofresponse].data.Image_Name : null;
            console.log(frame);
            const sevirityResponse = indexofresponse !== -1 ? responsearray[indexofresponse].data : null;
            console.log(sevirityResponse);
            const attachedimage = indexofresponse !== -1 ? responsearray[indexofresponse].image : null;
            const apiresponse = await axios.post('http://51.105.211.143:5000/emailgenerate', {
                "video_name": this.state.source,
                "image_name": sevirityResponse.Image_Name,
                "Severity": sevirityResponse.Severity,
                "Issue": sevirityResponse.Issue,
                "Summary": sevirityResponse.Summary,
                "Safety_Issue_Sign": sevirityResponse.Safety_Issue_Sign
            }, {
                headers: {
                    'Content-Type': 'application/json',
                }
            });
            console.log(apiresponse);
            this.setState({
                mailFormData: {
                    subject: apiresponse.data.Subject,
                    content: apiresponse.data.Body,
                    attachment: frame,
                    sender: "supervisor@company.com",
                    attachedimage: attachedimage
                }
            });
            this.setState({ mailLoading: false });
        } catch (error) {
            console.error('Error loading PDF:', error);
        }
    };
    Loading = () => {
        return (
            <div className="loader-sv">
                <div className="dot-cq-sv red-c-sv"></div>
                <div className="dot-cq-sv green-c-sv"></div>
                <div className="dot-cq-sv blue-c-sv"></div>
            </div>
        );
        ;
    };
    Mail = () => {
        return (
            <div>
                <div className="modal-mail-sv">
                    <div className='modal-sv-mail'>
                        <div className='analysis-backdrop-sv' style={{ position: "relative" }}>
                            <p className='analysis-head-sv'>Email Viewer  </p>
                            <img src={close1} variant="primary" onClick={() => this.setState({ viewEmail: false })} style={{ position: "absolute", left: "93%", bottom: "20%", width: "20px", cursor: "pointer" }} />
                        </div>
                        {this.state.attachedimageview ?
                            <div>
                                <div style={{ borderBottom: "1px solid white" }}>
                                    <p style={{ fontFamily: "Graphik", fontSize: "13px", color: "#FFFFFF", marginLeft: "20px" }}>{this.state.mailFormData.attachment}</p> <img className='icon-back-doa' src={back} onClick={() => { this.setState({ attachedimageview: false }) }} style={{ left: "71%", position: "absolute", cursor: "pointer", bottom: "82%" }} /></div>
                                <img src={this.state.mailFormData.attachedimage} style={{ width: "40vw", height: "60vh", margin: "50px" }} /> </div>
                            : (this.state.mailLoading ? <this.Loading /> : (!this.state.sendmail ?
                                (this.state.mailsent ?
                                    <div class="spinner-border spinner-border-sm" role="status"></div> : <div><p className='analysis-head-sv' style={{ marginLeft: "50px" }}></p>Mail Sent<div class="tick-circle"></div></div>) :
                                <div className='mail-content-sv'>
                                    <div className='container-row-mail-sv'>
                                        <label className='col-sm-2'>Sender:</label>
                                        <input type="text" className='container-data col-sm-10' value={this.state.mailFormData.sender}
                                            name="sender" onChange={this.handleMailInputChange} />
                                    </div>
                                    <div className='container-row-mail-sv'>
                                        <label className='col-sm-2'>Subject:</label>
                                        <input type="text" className='container-data col-sm-10' value={this.state.mailFormData.subject}
                                            name="subject" onChange={this.handleMailInputChange} />
                                    </div>
                                    <div className='container-row-mail-sv'>
                                        <label className='col-sm-2'>Attachment:</label>
                                        {/* <input type="text" className='container-data col-sm-10' value={this.state.mailFormData.attachment}
                                    name="attachment" onChange={this.handleMailInputChange} /> */}
                                        <div className='container-data col-sm-10'> <button className="mail-image-sv" onClick={() => { this.setState({ attachedimageview: true }) }}> {this.state.mailFormData.attachment} <img className="mail-close-sv" src={close1} /> </button></div>
                                    </div>
                                    <div className='container-row-mail-sv'>
                                        <label className='col-sm-2'>Mail content:</label>
                                        <textarea type="text" className='container-data-mail-sv col-sm-10' value={this.state.mailFormData.content}
                                            name="content" onChange={this.handleMailInputChange} />
                                    </div>
                                    <button type="submit" className="processe-sv-button" variant="primary" style={{ backgroundColor: "#6B5CD1" }} onClick={this.handleMailSend}>Send<img className="sv-send-icon" src={send} /></button>
                                    <button type="submit" className="processe-sv-button" variant="primary" style={{ backgroundColor: "#5957FE" }} onClick={this.handleRegenerateEmail}><img className="sv-pdf-icon" src={regenerate} />Regenerate</button>
                                </div>))}
                    </div>
                </div>
            </div>
        )
    }
    sendApiRequest = async () => {
        console.log('Sending API request...');
        try {
            console.log(this.state.imagelist)
            this.setState({ viewMetadata: true });
            this.setState({ viewMetadataLoading: true });
            const model = this.state.isShiftMPressed ? 1 : 2;
            if (this.state.playedVideo && this.state.source && this.state.playedVideo != this.state.source) {
                console.log("Other video has played previosuly")
                const response = await axios.post('http://51.105.211.143:5000/imageslist', { "video_name": this.state.source }, {
                    headers: {
                        'Content-Type': 'application/json',
                    }
                });
                console.log('API response:', response.data);
                if (response.data.Image_list && Array.isArray(response.data.Image_list) && response.data.Image_list.length !== 0) {
                    for (let i = 0; i < response.data.Image_list.length; i++) {
                        try {
                            console.log("1")
                            this.setState({ playedVideo: this.state.source });
                            const item = response.data.Image_list[i];
                            const response1 = await fetch('http://51.105.211.143:5000/predicttext', {
                                method: 'POST',
                                headers: {
                                    'Content-Type': 'application/json'
                                },
                                body: JSON.stringify({ image_name: item, swap_number: model, video_name: this.state.source }),
                            });
                            console.log("*************************")
                            const blob = await response1.blob();
                            const url = URL.createObjectURL(blob);
                            console.log(response1);
                            // TODO : metdata null handling. key's value if it is null need not show in UI. condition to add only severity as MAJOR and CRITICAL.
                            console.log(response1.headers.get('Metadata'));
                            const metdata = response1.headers.get('Metadata')
                            // const jsonString = metdata.replace(/'/g, '"');
                            const parseddata = JSON.parse(metdata)
                            if (parseddata && parseddata.Summary && parseddata.Severity && parseddata.Safety_Issue_Sign) {
                                const updatedMetadata = {
                                    data: parseddata,
                                    image: url,
                                };
                                console.log(updatedMetadata);
                                console.log(this.state.imagelist)
                                this.setState((prevState) => ({
                                    responseDataArray: prevState.responseDataArray.length === 0
                                        ? [updatedMetadata]
                                        : [...prevState.responseDataArray, updatedMetadata],
                                    imagelist: prevState.imagelist.length === 0
                                        ? [url]
                                        : [...prevState.imagelist, url]
                                }));
                                console.log(this.state.imagelist)
                                this.setState({ playedVideo: this.state.source });
                            }
                        } catch (error) {
                            console.log(error);
                        }
                    }
                    this.setState({ viewMetadataLoading: false });
                }
            }
            else if (!this.state.playedVideo) {
                console.log("no video played previosuly")

                const response = await axios.post('http://51.105.211.143:5000/imageslist', { "video_name": this.state.source }, {
                    headers: {
                        'Content-Type': 'application/json',
                    }
                });
                console.log('API response:', response.data);
                if (response.data.Image_list && Array.isArray(response.data.Image_list) && response.data.Image_list.length !== 0) {
                    for (let i = 0; i < response.data.Image_list.length; i++) {
                        try {
                            console.log("1")
                            this.setState({ playedVideo: this.state.source });
                            const item = response.data.Image_list[i];
                            const response1 = await fetch('http://51.105.211.143:5000/predicttext', {
                                method: 'POST',
                                headers: {
                                    'Content-Type': 'application/json'
                                },
                                body: JSON.stringify({ image_name: item, swap_number: model, video_name: this.state.source }),
                            });
                            console.log("*************************")
                            const blob = await response1.blob();
                            const url = URL.createObjectURL(blob);
                            console.log(response1);
                            // TODO : metdata null handling. key's value if it is null need not show in UI. condition to add only severity as MAJOR and CRITICAL.
                            console.log(response1.headers.get('Metadata'));
                            const metdata = response1.headers.get('Metadata')
                            // const jsonString = metdata.replace(/'/g, '"');
                            const parseddata = JSON.parse(metdata)
                            if (parseddata && parseddata.Summary && parseddata.Severity) {
                                const updatedMetadata = {
                                    data: parseddata,
                                    image: url,
                                };
                                console.log(updatedMetadata);
                                console.log(this.state.imagelist);
                                this.setState((prevState) => ({
                                    responseDataArray: prevState.responseDataArray.length === 0
                                        ? [updatedMetadata]
                                        : [...prevState.responseDataArray, updatedMetadata],
                                    imagelist: prevState.imagelist.length === 0
                                        ? [url]
                                        : [...prevState.imagelist, url]
                                }));
                                console.log(this.state.imagelist);
                                // console.log(this.state.responseDataArray)
                                this.setState({ playedVideo: this.state.source });
                            }
                        } catch (error) {
                            console.log(error);
                        }
                    }
                    this.setState({ viewMetadataLoading: false });
                }

            }
            // else if (this.state.imagelist.length == 0) {
            //     console.log("same video played but after clearing the data", this.state.imagelist.length);
            //     const response = await axios.post('http://51.105.211.143:5000/imageslist', { "video_name": this.state.source }, {
            //         headers: {
            //             'Content-Type': 'application/json',
            //         }
            //     });
            //     console.log('API response:', response.data);
            //     if (response.data.Image_list && Array.isArray(response.data.Image_list) && response.data.Image_list.length !== 0) {
            //         for (let i = 0; i < response.data.Image_list.length; i++) {
            //             try {
            //                 console.log("1")
            //                 this.setState({ playedVideo: this.state.source });
            //                 const item = response.data.Image_list[i];
            //                 const response1 = await fetch('http://51.105.211.143:5000/predicttext', {
            //                     method: 'POST',
            //                     headers: {
            //                         'Content-Type': 'application/json'
            //                     },
            //                     body: JSON.stringify({ image_name: item }),
            //                 });
            //                 console.log("*************************")
            //                 const blob = await response1.blob();
            //                 const url = URL.createObjectURL(blob);
            //                 console.log(response1);
            //                 // TODO : metdata null handling. key's value if it is null need not show in UI. condition to add only severity as MAJOR and CRITICAL.
            //                 console.log(response1.headers.get('Metadata'));
            //                 const metdata = response1.headers.get('Metadata')
            //                 // const jsonString = metdata.replace(/'/g, '"');
            //                 const parseddata = JSON.parse(metdata)
            //                 if (parseddata && parseddata.Summary && parseddata.Summary != "" && parseddata.Time != "" && parseddata.Severity != "" && parseddata.Severity && parseddata.Severity != "LOW" && parseddata.Severity != "MODERATE") {
            //                     const updatedMetadata = {
            //                         data: parseddata,
            //                         image: url,
            //                     };
            //                     console.log(updatedMetadata);
            //                     console.log(this.state.imagelist)
            //                     this.setState((prevState) => ({
            //                         responseDataArray: prevState.responseDataArray.length === 0
            //                             ? [updatedMetadata]
            //                             : [...prevState.responseDataArray, updatedMetadata],
            //                         imagelist: prevState.imagelist.length === 0
            //                             ? [url]
            //                             : [...prevState.imagelist, url]
            //                     }));
            //                     console.log(this.state.imagelist)
            //                     this.setState({ playedVideo: this.state.source });
            //                 }
            //             } catch (error) {
            //                 console.log(error);
            //             }
            //         }
            //     }

            //     this.setState({ viewMetadataLoading: false });
            // }
            // this.setState({ viewMetadataLoading: false });
        } catch (error) {
            console.log(error);

        }

    };

    render() {
        const infocontent = {
            "description": [
                "Utilizing Gen AI involves establishing an automated central monitoring system that employs Gen AI algorithms to identify, process, and proactively address workplace risks, accidents, or damages for timely prevention.",
                "This AI model examines images, comprehends context, extracts pertinent actions or incident data, and calculates severity based on the extracted information. Additionally, it can be tailored to align with your specific policies and preferences."
            ],
            "BusinessValueProposition": [
                "Automated central monitoring system for better accuracy",
                "Prompt response, saving time and effort",
                "Effective Co-ordination and Seamless Communication"
            ],
            "problemStatement": [
                "Extended and demanding working hours contribute to fatigue, hindering timely responses to incidents.",
                "Deficiencies in multitasking, coordination, and communication heighten the likelihood of incidents.",
                "The above factors collectively impede the overall effectiveness of managing real-time situations."

            ],
            "Howdoesitwork": [
                "Process starts by extracting image data from CCTV videos or webcam.",
                 "These images are processed by the GenAI model, which analyze and predict the context and severity for each image along with associated metadata.",
                 "The user interacts with the system through a user interface (UI) to receive the predicted context and metadata from the GenAI model.",
                 "Based on the severity of the predicted issue, the user has the ability to trigger alerts to relevant individuals through the UI. ",
                 "This ensures timely communication and appropriate response to potential incidents."
            ],
            "Technologychoices": [
                "Kubernetes cluster",
                "Docker",
                "React JS",
                "Python",
                "Generative AI LLM Model",
                "MySQL DB",
                "Flask API"
            ]
        }
        return (
            <div>
                <img className="sop-info-icon" src={Iicon} onClick={() => this.setState({ showModal: true })} style={{marginLeft:"112%", marginTop:"10px"}} />
                {this.state.showModal && (
                    <Info onClose={() => this.setState({ showModal: false })} infocontent={infocontent} />
                )}
                <div style={{ margin: "20px", width: "78vw", height: "83vh", display: "flex" }}>
                    <div className='col-sm-9' style={{ display: "flex", flexDirection: "column" }}>
                        <div className='row-sm-11' style={{ width: "95%", height: "100%", position: "relative", border: "1px solid #747BA9", borderRadius: "15px" }} >
                            {(
                                this.state.viewEmail ? (<this.Mail />) : (
                                    this.state.viewWebcam ?
                                        <WebcamComponent setresponse={(res) => {
                                            console.log(res)
                                            this.setState((prevState) => ({
                                                responseWebcamDataArray: prevState.responseWebcamDataArray.length === 0
                                                    ? [res]
                                                    : [...prevState.responseWebcamDataArray, res]
                                            }));
                                        }} setinitprocess={() => {
                                            this.setState({ viewWebcamMetaData: true });
                                            //this.setState({ viewWebcamMetadataLoading: true });
                                        }}
                                            setdfinalprocess={() => {
                                                console.log("webcam load set final")
                                                this.setState({ viewWebcamMetadataLoading: false });
                                            }}
                                            setdstartprocess={() => {
                                                this.setState({ viewWebcamMetadataLoading: true });
                                            }}
                                            model={this.state.isShiftMPressed}
                                        /> :
                                        <>
                                            {!this.state.source && <div>
                                                <p className='novideo-sv'>No video selected</p>
                                            </div>}
                                            <p style={{ position: "absolute", left: "89%", top: "94%", width: "fit-content", color: "white", fontSize: "10px" }}>model swap: {this.state.isShiftMPressed ? 1 : 2}</p>
                                            {!this.state.source && <img src={camera_icon} style={{ position: "absolute", left: "85%", top: "93%", width: "25px", border: "2px solid #7701BF", borderRadius: "5px" }} onClick={() => { this.setState({ viewWebcam: true }); }} />}
                                            {/* { null)} */}
                                            <div style={{ position: "absolute", left: "3%", top: "0%", width: "100%" }} >
                                                <div style={{ width: "100%", height: "70vh", borderRadius: "10px", position: "relative", left: "2%" }}>
                                                    <Player
                                                        ref={player => {
                                                            this.player = player;
                                                        }}
                                                        onStateChange={this.handleStateChange}
                                                        className="player-sv player-size-sv"
                                                        autoHide={false}
                                                        autoHideTime={0}
                                                    >
                                                        <source src={this.state.sourcelink} />
                                                        <ControlBar disableDefaultControls={true} autoPlay={false} className="always-visible-control-bar">
                                                            <PlayToggle />
                                                            <ReplayControl seconds={10} order={1.1} />
                                                            <ForwardControl seconds={30} order={1.2} />
                                                            <CurrentTimeDisplay order={4.1} />
                                                            <TimeDivider order={4.2} />
                                                            <PlaybackRateMenuButton rates={[5, 2, 1, 0.5, 0.1]} order={7.1} />
                                                            <VolumeMenuButton />
                                                            <ProgressControl order={8.1} />
                                                            <FullscreenToggle order={10.1} />
                                                            <img src={warning} style={{ width: "20px" }} order={9.1} onClick={this.handleEmail} />
                                                        </ControlBar>
                                                    </Player>
                                                </div>
                                                {this.state.source && <div style={{ width: "44vw", position: "relative", display: "flex", flexDirection: "row", left: "4%" }}>
                                                    <img src={left_arrow_icon} style={{ width: "25px", marginBottom: "4%" }} onClick={() => this.handleMoveCarousel('prev')} />
                                                    <div style={{ width: "100%", height: "74%" }}>
                                                        <Carousel
                                                            swipeable={false}
                                                            draggable={false}
                                                            centerMode={true}
                                                            focusOnSelect={true}
                                                            responsive={responsive}
                                                            ssr={true}
                                                            infinite={true}
                                                            autoPlay={false}
                                                            autoPlaySpeed={1000}
                                                            keyBoardControl={true}
                                                            customTransition="all .5"
                                                            transitionDuration={500}
                                                            containerClass="carousel-container"
                                                            removeArrowOnDeviceType={["tablet", "mobile"]}
                                                            deviceType={this.props.deviceType}
                                                            ref={this.carouselRef}
                                                            arrows={false}
                                                        >
                                                            {this.state.imagelist && Array.isArray(this.state.imagelist) && this.state.imagelist.length !== 0 && (this.state.imagelist.map(item => (
                                                                <img src={item} style={{ width: "95%", height: "75%" }} onClick={() => { this.setState({ viewMetadata: true }); }} />
                                                            )))}
                                                        </Carousel>
                                                    </div>
                                                    <img src={right_arrow_icon} style={{ width: "25px", marginBottom: "4%" }} onClick={() => this.handleMoveCarousel('next')} />
                                                </div>}
                                            </div>
                                        </>
                                )
                            )}
                        </div>

                        <div className='col-sm-4' style={{ position: "absolute", left: "64%", width: "30%" }}>
                            {this.state.viewWebcam ? this.state.viewWebcamMetaData ?
                                <WebcamMetadata
                                    viewMetadatafunc={() => {
                                        this.setState({ viewWebcam: false, responseWebcamDataArray: [], viewWebcamMetaData: false, viewMetadata: false });
                                        this.setState({ source: null, playedVideo: null, sourcelink: "http://51.105.211.143:5000/get_video/hello", responseDataArray: [], image_name: [] },
                                            () => {
                                                this.player.load();
                                            });
                                    }}
                                    responseDataArray={this.state.responseWebcamDataArray} handlemail={this.handleEmail}
                                    viewMetadataLoading={this.state.viewWebcamMetadataLoading} /> :
                                <></> :
                                this.state.viewMetadata ? <SafetyVigilanceMetadata viewMetadatafunc={() => {
                                    console.log("refresh")
                                    this.setState(
                                        { viewMetadata: false }); this.setState({ source: null, playedVideo: null, sourcelink: "http://51.105.211.143:5000/get_video/hello", responseDataArray: [], image_name: [] },
                                            () => {
                                                this.player.load();
                                            });
                                }}
                                    responseDataArray={this.state.responseDataArray} handlemail={this.handleEmail}
                                    viewMetadataLoading={this.state.viewMetadataLoading} />
                                    : <SafetyVigilanceSide updatePlayerInfo={this.updatePlayerInfo} />}
                        </div>
                    </div>
                </div></div>
        );
    }
}