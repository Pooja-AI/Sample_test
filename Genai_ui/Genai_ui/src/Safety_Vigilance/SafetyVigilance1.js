import React, { Component, useState } from 'react';
import { Player, ControlBar } from 'video-react';
import 'video-react/dist/video-react.css';
import SafetyVigilanceSide from './SafetyVigilanceSide';
// import Carousel from 'react-bootstrap/Carousel';
import "react-multi-carousel/lib/styles.css";
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import frame1 from '../images/frame-sv1.png';
import frame2 from '../images/frame-sv2.png';
import frame3 from '../images/frame-sv3.png';
import frame4 from '../images/frame-sv4.png';
import './SafetyVigilance.css';
import warning from '../images/warning.svg';
import play from '../images/play.svg';
import fullScreen from '../images/fullScreen.svg';

const sources = {
    sintelTrailer: 'http://localhost:5000/get_video',
    bunnyTrailer: 'http://localhost:5000/get_video',
    video1: 'http://localhost:5000/get_video',
    test: 'http://localhost:5000/get_video'
};
const frame = {
    frames: [
        frame1, frame2, frame3, frame4, frame2, frame3, frame4
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
export default class PlayerControlExample extends Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            source: sources.video1
        };

        this.play = this.play.bind(this);
        this.pause = this.pause.bind(this);
        this.load = this.load.bind(this);
        this.changeCurrentTime = this.changeCurrentTime.bind(this);
        this.seek = this.seek.bind(this);
        this.changePlaybackRateRate = this.changePlaybackRateRate.bind(this);
        this.changeVolume = this.changeVolume.bind(this);
        this.setMuted = this.setMuted.bind(this);
    }

    componentDidMount() {
        // subscribe state change
        this.player.subscribeToStateChange(this.handleStateChange.bind(this));
    }

    setMuted(muted) {
        return () => {
            this.player.muted = muted;
        };
    }

    handleStateChange(state) {
        // copy player state to this component's state
        this.setState({
            player: state
        });
    }

    play() {
        this.player.play();
    }

    pause() {
        this.player.pause();
    }

    load() {
        this.player.load();
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
                source: sources[name]
            });
            this.player.load();
        };
    }

    render() {
        return (
            <div style={{ margin: "20px", width: "78vw", height: "84vh", display: "flex" }}>
                {/* <Row xxl> */}
                <div className='col-sm-9' style={{ display: "flex", flexDirection: "column" }}>

                    <div className='row-sm-11' style={{ width: "100%", height:"100%", position: "relative" }} >
                        <div style={{ position: "absolute", left: "5%", top: "0%", width: "100%" }} >
                            <div style={{ border: "1px solid #8d97dac5", height: "10%", width:"95%" }}>
                                <Player
                                    ref={player => {
                                        this.player = player;
                                    }}
                                    className="player-sv player-size-sv"
                                >
                                    <source src={this.state.source} />
                                    <ControlBar autoHide={true} className="my-class" />
                                    {/* <ControlBar autoHide={false} /> */}
                                </Player>
                                <div style={{ display: "flex", flexDirection: "row" }}>
                                    <img src={play} style={{ width: "10px" }} />
                                    <img src={warning} style={{ width: "20px" }} />
                                    <img src={fullScreen} style={{ width: "18px" }} />
                                </div>
                            </div>
                            <div style={{ marginTop: "5%", width:"50vw" }}>
                                <Carousel
                                    swipeable={false}
                                    draggable={false}
                                    centerMode={true}
                                    focusOnSelect={true}
                                    responsive={responsive}
                                    ssr={true}
                                    infinite={true}
                                    autoPlay={this.props.deviceType !== "mobile" ? true : false}
                                    autoPlaySpeed={1000}
                                    keyBoardControl={true}
                                    customTransition="all .5"
                                    transitionDuration={500}
                                    containerClass="carousel-container"
                                    removeArrowOnDeviceType={["tablet", "mobile"]}
                                    deviceType={this.props.deviceType}
                                    itemClass="carousel-item-padding-0-px">
                                    {(frame.frames.map(item => (
                                        <>
                                            <img src={item} style={{ width: "95%", height: "70%" }} />
                                        </>
                                    )))}
                                </Carousel>
                            </div>
                        </div>
                    </div>
                    <div className='row-sm-1' style={{ position: "absolute", left: "9%", top: "83%", color: "white", fontFamily: "Graphik", fontSize: "12px", lineHeight: "5px" }}>
                        {/* <SafetyVigilanceSide /> */}
                        <p><b>Location:</b> AHM-GGS-Equipment Inventory Unit– Camera 0015</p>
                        <p><b>Severity :</b> Moderate </p>
                        <p><b>Issue :</b> Equipment Handling – Near Miss</p>
                        <p><b>Description :</b> Truck driver is identified without a hard hat during material unloading and damaged the equipment due to improper handling the forklift.</p>

                    </div>
                </div>
                <div className='col-sm-5'>
                    <SafetyVigilanceSide />
                </div>
                {/* </Row> */}
                {/* <div className="pb-3">
          <Button onClick={this.changeSource('sintelTrailer')} className="mr-3">
            Sintel teaser
          </Button>
          <Button onClick={this.changeSource('bunnyTrailer')} className="mr-3">
            Bunny trailer
          </Button>
          <Button onClick={this.changeSource('bunnyMovie')} className="mr-3">
            Bunny movie
          </Button>
          <Button onClick={this.changeSource('test')} className="mr-3">
            Test movie
          </Button>
        </div> */}
            </div>
        );
    }
}