import React, { useState, useRef } from 'react';
import Webcam from 'react-webcam';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import right_arrow_icon from '../images/right_arrow_icon.svg';
import left_arrow_icon from '../images/left_arrow_icon.svg';
import play from '../images/play.svg';
import pause from '../images/pause.svg';

function WebcamComponent() {
    const webcamRef = useRef(null);
    const [capturing, setCapturing] = useState(false);
    const [frames, setFrames] = useState([]);
    const carouselRef = React.createRef()

    const startCapture = () => {
        console.log("Started");
        setCapturing(true);
        captureFrames();
    };

    const Capture = (value) => {
        console.log("Started");
        setCapturing(value);
        if(capturing){
        captureFrames();}
    };

    const stopCapture = () => {
        console.log("Stopped");
        setCapturing(false);
    };

    const captureFrames = () => {
        console.log("capture frames");
        console.log(capturing)
        if (webcamRef.current) {
            const video = webcamRef.current.video;

            const captureFrame = () => {
                const canvas = document.createElement('canvas');
                canvas.width = video.videoWidth;
                canvas.height = video.videoHeight;
                const ctx = canvas.getContext('2d');
                ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

                const frameData = canvas.toDataURL('image/png');
                console.log(frames)
                setFrames((prevFrames) => [...prevFrames, frameData]);

                if (capturing) {
                    requestAnimationFrame(captureFrame);
                }
            };

            captureFrame();
        }
    };
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

    const sendFramesToBackend = () => {
        // Implement the code to send frames to the backend (e.g., using fetch)
        // frames array contains base64-encoded image data
        console.log('Sending frames to backend:', frames);
    };
    const handleMoveCarousel = (direction) => {
        const { current: carousel } = carouselRef;
        const currentSlide = carousel.state.currentSlide;

        if (direction === 'next') {
            carousel.goToSlide(currentSlide + 1);
        } else if (direction === 'prev') {
            carousel.goToSlide(currentSlide - 1);
        }
    };
    return (
        <div>
            <Webcam
                audio={false}
                ref={webcamRef}
                screenshotFormat="image/jpeg"
                videoConstraints={{ width: 665, height: 320, facingMode: 'user' }}
                style={{ margin: "23px" }}
            />
            <div>
                <button
                    onClick={capturing ? stopCapture : startCapture}
                    style={capturing ? {
                        position: "absolute",
                        left: "5%",
                        top: "73%",
                        width: capturing ? "fit-content" : "32px",
                        height: capturing ? "auto" : "28px",
                        backgroundColor: "#6B5CD1",
                        borderRadius: "5px",
                        border: "none",
                        color: "#FFFFFF",
                        transition: "width 0.4s, height 0.3s"
                    } : {
                        color: "#FFFFFF",
                        position: "absolute", left: "5%", top: "73%", width: "35px", height: "28px", backgroundColor: "#6B5CD1", borderRadius: "5px", border: "none", color: "#FFFFFF", paddingBottom: "4px",
                        transition: "width 0.3s, height 0.3s"
                    }}
                >
                    <img src={capturing ? pause : play} alt={capturing ? "Pause" : "Play"} />
                </button>
                {/* {capturing ? (
                    <button onClick={stopCapture} style={{ position: "absolute", left: "5%", top: "73%", width: "fit-content", backgroundColor: "#6B5CD1", borderRadius: "5px", border: "none", color: "#FFFFFF" }}><img src={pause}/></button>
                ) : (
                    <button onClick={startCapture} style={{ position: "absolute", left: "5%", top: "73%", width: "32px", height:"28px", backgroundColor: "#6B5CD1", borderRadius: "5px", border: "none", color: "#FFFFFF", paddingBottom: "4px" }}><img src={play}/></button>
                )} */}
                {/* <button onClick={sendFramesToBackend} style={{ position: "absolute", left: "21%", top: "73%", width: "fit-content", backgroundColor: "#6B5CD1", borderRadius: "5px", border: "none", color: "#FFFFFF" }}>Send Frames to Backend</button> */}
            </div>
            <div style={{ width: "48vw", position: "relative", display: "flex", flexDirection: "row", left: "4%", marginTop: "7%" }}>
                <img src={left_arrow_icon} style={{ width: "25px", marginBottom: "4%" }} onClick={() => handleMoveCarousel('prev')} />
                <div style={{ width: "100%", height: "78%" }}>
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
                        deviceType="desktop"
                        ref={carouselRef}
                        arrows={false}
                    >
                        {frames && Array.isArray(frames) && frames.length !== 0 && (frames.map(item => (
                            <img src={item} style={{ width: "95%", height: "75%" }} />
                        )))}
                    </Carousel>
                </div>
                <img src={right_arrow_icon} style={{ width: "25px", marginBottom: "4%" }} onClick={() => handleMoveCarousel('next')} />
            </div>
        </div>
    );
};

export default WebcamComponent;
