import React, { useState, useRef, useEffect, props } from 'react';
import Webcam from 'react-webcam';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import right_arrow_icon from '../images/right_arrow_icon.svg';
import left_arrow_icon from '../images/left_arrow_icon.svg';
import play from '../images/play.svg';
import pause from '../images/pause.svg';


function WebcamComponent(props) {
    const webcamRef = useRef(null);
    const [capturing, setCapturing] = useState(false);
    const [frames, setFrames] = useState([]);
    const carouselRef = React.createRef()
    const captureInterval = 5000;
    let captureIntervalId;
    const [backendResponse, setBackendResponse] = useState([]);
    const [processingQueue, setProcessingQueue] = useState([]);
    const [start, setstart] = useState(false);
    const [input, setinput] = useState(null);
    // const isInitialRender = useRef(true);
    const [isShiftMPressed, setIsShiftMPressed] = useState(false);
    const posts = React.useRef(null);
    useEffect(() => {
        posts.current = 'values';
        console.log(posts.current)
    }, [])

    useEffect(() => {
        const handleKeyDown = (event) => {
            if (event.key === 'M' && event.code === 'KeyM') {
                setIsShiftMPressed(!isShiftMPressed);
            }
        };
        window.addEventListener('keydown', handleKeyDown);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, []);

    const capture = () => {
        if (webcamRef.current && capturing && webcamRef.current.getScreenshot) {
            const imageSrc = webcamRef.current.getScreenshot();
            setFrames((prevFrames) => [...prevFrames, imageSrc]);
            setProcessingQueue((prevQueue) => [...prevQueue, imageSrc]);
            // setProcessingQueue((prevQueue) => {
            //     const newQueue = [...prevQueue, imageSrc];
            //     console.log("Processing Queue in capture:", newQueue);
            //     return newQueue;
            // });
            // setProcessingQueue((prevQueue) => {
            //     const newQueue = [...prevQueue, imageSrc];
            //     console.log("Processing Queue in capture:", newQueue);
            //     return newQueue;
            // }, () => {
            //     console.log(processingQueue); 
            // });
            // setProcessingQueue(prevQueue => {
            //     const newQueue = [...prevQueue, imageSrc];
            //     console.log("Processing Queue in capture:", newQueue);
            //     return newQueue;
            //   });
        }
    };

    useEffect(() => {
        if (capturing) {
            captureIntervalId = setInterval(() => {
                capture();
                console.log(processingQueue);
            }, captureInterval);
        } else {
            clearInterval(captureIntervalId);
        }
        return () => {
            clearInterval(captureIntervalId);
        };
    }, [capturing, captureInterval, processingQueue, input]);

    useEffect(() => {
        console.log(backendResponse);
        if (processingQueue.length > 0) {
            console.log("Hello**********", processingQueue.length)
            processingqueue();
        }
    }, [backendResponse]);


    useEffect(() => {
        console.log(processingQueue);
        if (start) {
            console.log("start capture")
            processingqueue();
        }
    }, [processingQueue]);
    
    const processingqueue = async () => {
        console.log("process function****", processingQueue.length);
        console.log(processingQueue)
        if (processingQueue.length > 0) {
            setstart(false);
            console.log()
            try {
                console.log("sending frames to backend function")
                const response = await sendFramesToBackendApi(processingQueue[0]);
                setProcessingQueue((prevQueue) => prevQueue.slice(1));
                console.log("recieved response");
                setBackendResponse((prevresponse) => [...prevresponse, response]);
            } catch (error) {
                console.error('Error sending frames to the backend:', error);
            }

        }
        else {
            // if(start){
            //     console.log("no queue bypass");
            //     setBackendResponse(['']);
            // }
            console.log("no queue");
        }

    };

    const sendFramesToBackendApi = async (newFrames) => {
        console.log("response1", newFrames);
        props.setinitprocess();
        try {
            if (input) {
                const item = newFrames;
                const user_input = input;
                const model = isShiftMPressed ? 1 : 2;
                const swap_number = model;
                const requestData = {
                    image_file: item,
                    user_input: user_input,
                    swap_number: swap_number
                };
                const response1 = await fetch('http://51.105.211.143:5000/webcam', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(requestData),
                });
                console.log("*************************")
                const blob = await response1.blob();
                const url = URL.createObjectURL(blob);
                console.log(response1);
                console.log(response1.headers.get('Metadata'));
                const metdata = response1.headers.get('Metadata')
                const parseddata = JSON.parse(metdata)
                if (parseddata) {
                    const updatedMetadata = {
                        data: parseddata,
                        image: url,
                    };
                    console.log(updatedMetadata);
                    await props.setresponse(updatedMetadata);
                    return metdata;
                }
                props.setdfinalprocess();
            }
            else {
                alert("Please provide the object to proceed...");
            }
        } catch (error) {
            console.log(error);
        }
    };

    const startCapture = async () => {
        if (input) {
            const value = true;
            setCapturing(value);
            setstart(true);
            props.setdstartprocess();
            setTimeout(async () => {
                console.log("start capture")
                await processingqueue();
            }, 5050);
            // try {
            //     console.log("start capture")
            //     await processingqueue();
            // } catch (error) {
            //     console.error('Error in startCapture:', error);
            // }
        }
        else {
            alert("Please provide the object to proceed...");
        }
    };

    const stopCapture = () => {
        setCapturing(false);
    };

    const responsive = {
        superLargeDesktop: {
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

    const handleMoveCarousel = (direction) => {
        const { current: carousel } = carouselRef;
        const currentSlide = carousel.state.currentSlide;

        if (direction === 'next') {
            carousel.goToSlide(currentSlide + 1);
        } else if (direction === 'prev') {
            carousel.goToSlide(currentSlide - 1);
        }
    };
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setinput(value);
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
                        left: "32%",
                        top: "73%",
                        width: capturing ? "fit-content" : "32px",
                        height: capturing ? "auto" : "29px",
                        backgroundColor: "#6B5CD1",
                        borderRadius: "5px",
                        border: "none",
                        color: "#FFFFFF",
                        transition: "width 0.4s, height 0.3s"
                    } : {
                        color: "#FFFFFF",
                        position: "absolute", left: "32%", top: "73%", width: "35px", height: "29px", backgroundColor: "#6B5CD1", borderRadius: "5px", border: "none", color: "#FFFFFF", paddingBottom: "4px",
                        transition: "width 0.3s, height 0.3s"
                    }}
                >
                    <img src={capturing ? pause : play} alt={capturing ? "Pause" : "Play"} />
                </button>
                <input type="text" className='container-data-webcam-sv' name="object" placeholder="Enter an object to find" onChange={handleInputChange} value={input} />
            </div>
            <div style={{ width: "50vw", position: "relative", display: "flex", flexDirection: "row", left: "2%", marginTop: "4%" }}>
                <img src={left_arrow_icon} style={{ width: "25px", marginBottom: "2%" }} onClick={() => handleMoveCarousel('prev')} />
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
                        {frames && Array.isArray(frames) && frames.length !== 0 && (frames.map((item, index) => (
                            <img src={item} style={{ width: "95%", height: "95%" }} />
                        )))}
                    </Carousel>
                </div>
                <img src={right_arrow_icon} style={{ width: "25px", marginBottom: "2%" }} onClick={() => handleMoveCarousel('next')} />
            </div>
        </div>
    );
};

export default WebcamComponent;


