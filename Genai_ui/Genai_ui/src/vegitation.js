import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import MapComponent from "./MapComponent";
import ChatVeg from "./ChatVeg";
import Generic_Chatbot from "./Generic_Chatbot";
import "./Vegitation.css";
import towerpic from "./images/image 23.svg";
import mapshot from "./images/mapshot.png";
import smallpop from "./images/smallpop.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faSync} from '@fortawesome/free-solid-svg-icons';
import refreshicon from "./images/refreshicon.png";
import { Bar } from "react-chartjs-2";
import { Line } from "react-chartjs-2";
import Chart from 'chart.js/auto';
import Iicon from './images/Group 3000.svg'
import Info from './Info.js';
import ChatbotV from './ChatbotV.js';
import Modal from "react-modal";
import Container from "react-bootstrap/esm/Container.js";
Modal.setAppElement("#root");
const Vegitation = () => {
  const [activeTab, setActiveTab] = useState("recommendations");
  const [showLoader, setShowLoader] = useState(false);
  const [chatMessages, setChatMessages] = useState([]);
  const [recommendationData, setRecommendationData] = useState(null); // State to store the fetched data
  const [generateButtonVisible, setGenerateButtonVisible] = useState(true); // State to control button visibility
  const [recommendationType, setRecommendationType] = useState(""); //State for recommendation type
  const [pointsData, setPointsData] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const handleToggleModal = () => {
    setShowModal(!showModal);
  }
  
  
  const PriorityModal = ({ isOpen, onClose, circuitDetails, lat, long }) => {
useEffect(() => {
      // Add the class to the body when the modal is open
      document.body.classList.add('body-no-scroll');
  
      // Cleanup function to remove the class when the component unmounts
      return () => {
        document.body.classList.remove('body-no-scroll');
      };
    }, [isOpen]);
    return (
      <Modal
        isOpen={isOpen}container-
        onRequestClose={onClose}
        contentLabel="Priority Modal"
        className="popup-modal"
        style={{
          overlay: {
            backgroundColor: 'rgba(30, 30, 30, 0.8)'
          }
        }}
      >
        {circuitDetails && recommendationData && (
          <div className="priority-modal-content">
            <div className="priority-modal-header">
              <div>Recommendations</div>
              <button className="popup-close-button" onClick={onClose}>
                X
              </button>
            </div>
            <div className="popup-main-container">
              <div className="popup-leftside">
                <div className="container-1">
                  <div className="container-1-content-v">
                    <div className="container-1-image-v">
                      <img
                        className="image-towerpic-v"
                        src={towerpic}
                        alt="towerpic/"
                      />
                    </div>
                    <div className="H1">
                      <div style={{ fontWeight: "bold" }}>Clear Vegetation</div>
                      <div>
                            {" "}
                            <span className="division-name">
                              {circuitDetails[1]}
                            </span>
                            <span className="space"> </span>
                            |{" "}
                            <span className="substation-name">
                              {circuitDetails[2]}
                            </span>{" "}
                            |{" "}
                            <span className="circuit-name">
                              {circuitDetails[0]}
                            </span>{" "}
                      </div>

                    </div>
                    <div className="I1">
                      <button 
                         className={` ${
                           circuitDetails[10] === 1
                            ? "very-high-priority"
                            :  circuitDetails[10] === 2
                            ?  "medium-priority"
                            :  "low-priority"
                         }`}
                         >
                          {circuitDetails[10] === 1
                            ? "VERY-HIGH"
                            :  circuitDetails[10] ===2
                            ?  "MEDIUM"
                            :  "LOW"} 

                      </button>

                    </div>

                  </div>
                </div>
                <div className="container-2">
                  <div className="container-2-content">
                    <p className="underline-text">Recommendations</p>
                    <div className="mid-pop">
                      <div className="A1">
                        <div>HOSPITALS </div>
                        <div style={{ fontWeight: "600", fontSize: "12px" }}>
                          {circuitDetails[3]}
                        </div>
                        <div class="gap-row-popup">TOTAL CUST. SERVED </div>
                        <div style={{ fontWeight: "600", fontSize: "12px" }}>
                          {circuitDetails[4]}
                        </div>
                      </div>
                      <div className="B1">
                        <div>VEGITATION TYPE</div>
                        <div style={{ fontWeight: "600", fontSize: "12px" }}>Sparse</div>
                        <div class="gap-row-popup">CORRIDOR CLEARENCE YEARLY</div>
                        <div style={{ fontWeight: "600", fontSize: "12px" }}>
                          {circuitDetails[6]}
                        </div>
                      </div>
                      <div className="C1">
                        <div>VEGITATION CLEARENCE DATE</div>
                        <div style={{ fontWeight: "600", fontSize: "12px" }}>
                          {circuitDetails[5]}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="container-3">
                  <div className="container-3-content">
                    <p className="underline-text">
                      Circuit - Vegetation Details
                    </p>
                    <div className="end-pop">
                      <div className="D1">
                        <div>Circuit Name</div>
                        <div style={{ fontWeight: "600", fontSize: "12px" }}>
                          {circuitDetails[0]}
                        </div>
                        <div class="gap-row-popup">Division</div>
                        <div style={{ fontWeight: "600", fontSize: "12px" }}>
                          {circuitDetails[1]}
                        </div>
                      </div>
                      <div className="E1">
                        <div>Substation</div>
                        <div style={{ fontWeight: "600", fontSize: "12px" }}>
                          {circuitDetails[2]}
                        </div>
                        <div class="gap-row-popup">LAT</div>
                        <div style={{ fontWeight: "600", fontSize: "12px" }}>
                          {circuitDetails[8]}
                        </div>
                      </div>
                      <div className="F1">
                        <div>LONG</div>
                        <div style={{ fontWeight: "600", fontSize: "12px" }}>
                          {circuitDetails[9]}
                        </div>
                        <div class="gap-row-popup">Corridor Clearence HYI</div>
                        <div style={{ fontWeight: "600", fontSize: "12px" }}>
                          {circuitDetails[7]}
                        </div>
                      </div>
                      <div className="G1">
                        <div>Trees Density</div>
                        <div style={{ fontWeight: "600", fontSize: "12px" }}>ABC</div>
                        <div class="gap-row-popup">Hospitals</div>
                        <div style={{ fontWeight: "600", fontSize: "12px" }}>
                          {circuitDetails[3]}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="popup-rightside">
                <MapComponent
                  long={long}
                  lat={lat}
                  recommendationData={recommendationData}
                />  
              </div>
            </div>
          </div>
        )}
      </Modal>
    );
  };

  // Define the RecommendationsTab component
  const RecommendationsTab = ({ setShowLoader, setPointsData, }) => {
    const [priorityFilter, setPriorityFilter] = useState("");
    const [selectedCircuitDetails, setSelectedCircuitDetails] = useState(null);
    const [selectedPriorityFilter, setSelectedPriorityFilter] = useState("");
    const [selectedDivisionFilter, setSelectedDivisionFilter] = useState("");
    const [selectedPriorityFilter2, setSelectedPriorityFilter2] = useState("");
    const [selectedSubstationFilter, setSelectedSubstationFilter] = useState("");
    // const [showLoader, setShowLoader] = useState(false); //state to control the laoding component
     
    const handleUserMessage = async (message) => {
      try {
        setShowLoader(true);
        setRecommendationData(null);
        

        const response1 = await axios.post("https://industrygenai.accenture.com/vm/chatBot", {
          message,
          priorityFilter: selectedPriorityFilter,
          divisionFilter: selectedDivisionFilter,
          substationFilter: selectedSubstationFilter,
          priorityFilter2: selectedPriorityFilter2,
          
          request_type: 'recommendation', //set request type for recommendation
          
          
        });

        console.log("Chatbot API response:", response1.data);

        const chatbotResponse = response1.data;
        console.log("Chatbot response:", chatbotResponse);

        if (
          chatbotResponse &&
          chatbotResponse.response &&
          chatbotResponse.response.response_data
        ) {
          const recommendationData = chatbotResponse.response.response_data;
          setRecommendationData(recommendationData);
          // setShowLoader(false);

          console.log("Recommendation Data:", recommendationData);
        } else {
          console.error("Invalid response format: Data is missing");
        }

        const recommendationData = chatbotResponse.response.response_data;
        setRecommendationData(recommendationData);
        console.log("hhhhhhhh", recommendationData);
        console.log("xxxxxxxxxxxxxx", recommendationData.data[0]);
      } catch (error) {
        console.error(error);
      } finally {
        setShowLoader(false);
        
      }
    };
 


    const [isModelOpen, setIsModelOpen] = useState(false);

    const handlePriorityButtonClick = (circuitDetails) => {
      setSelectedCircuitDetails(circuitDetails);
      setIsModelOpen(true);
      //document.body.classList.add('body-no-scroll');
    };

    const handleGenerateButtonClick = async () => {
      // Trigger the handleUserMessage function when the "Generate" button is clicked
      // setShowLoader(true);
      

      try{

       await handleUserMessage(
        "Can you suggest circuits that need trimming along with priority?"
        
        
      );
      setPointsData(recommendationData);
    }finally{
      // setShowLoader(false); //hide the loader after data is fetched 
    }
    };
   
    const Loading = () => {
      return (
          <div className='incident-loader-v'>
              <div className="loader-v">
                  <div className='loader-text-v'>Fetching the data from LLM</div>
                  <div className="dot red"></div>
                  <div className="dot green"></div>
                  <div className="dot blue"></div>
              </div>
          </div>
      );
      ;
  };

   
  
    
        
    

    return (
      <div className={`main-class-v ${isModelOpen ? "blur-background" : ""}`}>

        <div className="main-vegi-container">
        <div className="left-side" >
          <div className="box">
            <div className="left-side-section1">
              
              <div className="recommend-button-v">
                <div className="recommend-text-v">Recommendations Type</div>
                <div className="recommendation-type-container">
                  <select
                    className="recommendation-type-dropdown"
                    value={recommendationType}
                    onChange={(e) => setRecommendationType(e.target.value)}
                  >
                    <option value="" disabled>
                      All Types
                    </option>
                    {/* <option value="type1">Inspect Vegetation</option> */}
                    <option value="type2">Clear Vegetation</option>
                    {/* <option value="type3">Remove Dead Vegetation</option> */}
                    {/* <option value="type4">All Type</option> */}
                  </select>
                </div>
                <button
                className="generate-button-v"
                onClick={handleGenerateButtonClick}
                
              >
                GENERATE
              </button>

            

              </div>
            
            </div>
          </div>
          <div className="left-side-section2">
            {showLoader && <Loading />}
            {recommendationData && (
              <div className="recommend-container">
              <div className="recommend-a1-container">
                <div className="sort-by-button-v">Sort by</div>
                <select
                  className="sort-by-dropdown-v"
                  value={selectedPriorityFilter}
                  onChange={(e) => setSelectedPriorityFilter(e.target.value)}
                >  
                  <option value="">Priority</option>
                  <option value="1">High to Low</option>
                  <option value="2">Low to High</option>
                  {/* <option value="3">Low</option> */}
                </select>

                <div className="filter-by-button-v">Filter by </div>
                <select 
                    className="sort-by-dropdown-v"
                    value={selectedDivisionFilter}
                    onChange={(e) => setSelectedDivisionFilter(e.target.value)}
                >
                  <option value="">Division</option>
                  <option value="Central">Central</option>
                  <option value="Metro">Metro</option>
                  {/* <option value="Central">Southern</option>
                  <option value="Central">ABC</option> */}
                </select>

                <div className="substation-button">
                  <select 
                     className="sort-by-dropdown-v"
                     value={selectedSubstationFilter}
                     onChange={(e) => setSelectedSubstationFilter(e.target.value)}
                     >
                    <option value="">Substation</option>
                    <option value="Aldene">Aldene</option>
                    <option value="Cook Rd">Cook Rd</option>
                    {/* <option value="Aldene">Levittown</option>
                    <option value="Aldene">Kauser Road</option> */}
                  </select>
                </div>
                <div className="priority-filter2-v">
                <select
                  className="sort-by-dropdown-v"
                  value={selectedPriorityFilter2}
                  onChange={(e) => setSelectedPriorityFilter2(e.target.value)}
                >  
                  <option value="">Priority</option>
                  <option value="1">Very-High</option>
                  <option value="2">Medium</option>
                  <option value="3">Low</option>
                </select>
                    
                </div>
                
              </div>
              
                <div className="scrollable-content">
                  {recommendationData.data
                      .sort((a, b) => {
                        // Assuming recommendation[9] is a numeric value
                        if(selectedPriorityFilter === "") return true;
                        if(selectedPriorityFilter === "1") return a[10] - b[10];
                        if(selectedPriorityFilter === "2") return b[10] - a[10];
                      })
                      .filter((recommendation) => {
                        if (selectedDivisionFilter === "") return true;
                        return recommendation[1] === selectedDivisionFilter;
                      })
                      .filter((recommendation) => {
                        if (selectedSubstationFilter === "") return true;
                        return recommendation[2] === selectedSubstationFilter;
                      })
                      .filter((recommendation) => {
                        if (selectedPriorityFilter2 === "") return true;
                        return recommendation[10]  === parseInt(selectedPriorityFilter2);
                      })
                       
                      .map((recommendation, index) => (
                    <div
                      className={`recommendation-column ${
                        index % 2 === 0 ? "even" : "odd"
                      }`}
                      key={index}
                    >
                    
                      <div className="a1">
                        <div className="towerpic-content">
                          <img
                            className="towerpic-v"
                            src={towerpic}
                            alt="towerpic/"
                          />
                        </div>
                        <div className="recommmendation-cloumm-content">
                          <p className="recommmendation-cloumm-content">
                            Clear Vegetation
                          </p>

                          <p className="recommmendation-cloumm-content2">
                            {" "}
                            <span className="division-name">
                              {recommendation[1]}
                            </span>
                            <span className="space"> </span>
                            |{" "}
                            <span className="substation-name division-name">
                              {recommendation[2]}
                            </span>{" "}
                            |{" "}
                            <span className="circuit-name division-name">
                              {recommendation[0]}
                            </span>{" "}
                          </p>

                          <button
                            className={`priority-button ${
                              recommendation[10] === 1
                                ? "very-high-priority"
                                : recommendation[10] === 2
                                ? "medium-priority"
                                : "low-priority"
                            }`}
                            onClick={() =>
                              handlePriorityButtonClick(recommendation)
                            }
                          >
                            {recommendation[10] === 1
                              ? "VERY-HIGH"
                              : recommendation[10] === 2
                              ? "MEDIUM"
                              : "LOW"}
                          </button>
                          <div className="refreshicon1">
                            {/* <img 
                               className="refreshicon-v"
                               src={refreshicon}
                               alt="refreshicon/"
                            >

                              </img> */}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              
              </div>
            )}
          </div>
          {/* <button
                className="generate-button-v"
                onClick={handleGenerateButtonClick}
                
              >
                GENERATE
              </button>  */}
        </div>

        {
          <div className="right-side">
            <MapComponent recommendationData={recommendationData} />
          </div>
        }

        {isModelOpen && (
          <PriorityModal
            isOpen={isModelOpen}
            onClose={() => setIsModelOpen(false)}
            circuitDetails={selectedCircuitDetails}
            lat={selectedCircuitDetails[8]}
            long={selectedCircuitDetails[9]}
            
            
          />
        )}
        </div>
      </div>
    );
  };

  // Define the ChatAssistantTab component
  const ChatAssistantTab = () => {
    // Add functionality for the Chat Assistant tab here
    return (
      <div>
        <ChatVeg></ChatVeg>
        {/* <ChatbotV></ChatbotV> */}
      </div>
    );
  };

  const scrollContainerRef = useRef(null);

  const scrollToBottom = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTop = scrollContainerRef.current.scrollHeight;
    }
  };

 

  return (
    <div>
     <div className="Heading-v">
        <span style={{ color: '#AD8BFF' }}>Utilities</span> / Vegetation Management
        <div className='info-icon-v'><img className="i-icon-v" src={Iicon} onClick={handleToggleModal} /></div>

              {showModal && (
                <Info
                  onClose={() => setShowModal(false)}
                />
              )}
      </div>


      <div className="headingtabs-v">
        {/* Buttons to switch between tabs */}
        <div
          className={`Subtabs-v ${
            activeTab === "recommendations" ? "active" : ""
          }`}
          onClick={() => setActiveTab("recommendations")}
        >
          Recommendations
        </div>
        <div
          className={`Subtabs-v ${
            activeTab === "chatAssistant" ? "active" : ""
          }`}
          onClick={() => setActiveTab("chatAssistant")}
        >
          Chat Assistant
        </div>
      </div>


      <div
        className="main-container-vegitation"
      >
        <div className="left-section-vegitation">
          {/* Conditionally render the tab based on the activeTab state */}
          {activeTab === "recommendations" && <RecommendationsTab  setShowLoader={setShowLoader} setPointsData ={setPointsData}/>}
          {activeTab === "chatAssistant" && <ChatAssistantTab />}
        </div>
        <div className="right-section-vegitation">
          <MapComponent recommendationData={recommendationData} />
        </div>
      </div>
    </div>
  );
  
};



export default Vegitation;
