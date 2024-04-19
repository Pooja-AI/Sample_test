import React, { useState, useRef } from 'react';
import { Viewer } from '@react-pdf-viewer/core';
import '@react-pdf-viewer/core/lib/styles/index.css';
import { Worker } from '@react-pdf-viewer/core';
import '@react-pdf-viewer/core/lib/styles/index.css';
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';
import Chatbot from './Chatbot';
import close1 from '../images/Group 3206.svg';
import './SOP_New.css';

function SOP(props) {
  const [showSecondColumn, setShowSecondColumn] = useState(false);
  const [pdfData, setPdfData] = useState(null);
  const [loading, setLoading] = useState(true);

  const handleButtonClick1 = async (path) => {
    try {
      await fetch(props.getpdf_endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ filepath: path }),
      })
        .then(res => res.blob())
        .then(blob => {
          const reader = new FileReader();
          reader.onload = () => {
            setPdfData(reader.result);
            setLoading(false);
          };
          reader.readAsDataURL(blob);
          setShowSecondColumn(true);
        });
    } catch (error) {
      console.error('Error loading PDF:', error);
    }
  };

  const renderchatResponse = (message) => {
    scrollToBottom();
    console.log(message);
    if (message.user) {
      return (
        <div className="user-message-v">
          <span>{message.message}</span>
        </div>
      );
    }
    else if (message.message == "Hi! How can I assist you today?") {
      return (
        <div className="user-message-v">
          <span>{message.message}</span>
        </div>
      );
    }
    else {
      if (message && message.message) {
        const response_data = message.message;
        console.log(response_data);
        const pdfTitle = ["pdf1", "pdf2"]
        console.log("answer");
        return (
          <div className="bot-text-response-d">
            <span>{response_data.response.answer}</span>
            {response_data.response && response_data.response.source && response_data.response.source && <div style={{ display: "flex", flexWrap: "wrap", marginTop: "5px" }}>
              <p style={{ fontWeight: "450" }}> {`Citations \u00A0: \u00A0`}</p>
              {response_data.response && response_data.response.source && response_data.response.source.map(
                (pdf, index) => (
                  <p key={index} onClick={() => handleButtonClick1(pdf.filepath)}
                    style={{ backgroundColor: "#6B5CD1", border: "none", borderRadius: "5px", width: "fitContent", padding: "3px", marginRight: "5px", cursor: "pointer" }}>
                    {pdf.filename}
                  </p>
                )
              )}
            </div>}
          </div>
        );
      } else {
        return null;
      }
    }
  };

  const scrollContainerRef = useRef(null);

  const scrollToBottom = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTop = scrollContainerRef.current.scrollHeight;
    }
  };

  const isModal = false;
  const isSOP = true;
  const initialScale = 40;
  const newPlugin = defaultLayoutPlugin()
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <div style={showSecondColumn ? { display: 'flex', height: '90vh', marginLeft: "5px", gap: "20px", margin: "auto" } : { height: '90vh', marginLeft: "13%" }}>
        <div style={{ marginBottom: "10px" }}>
          <Chatbot renderchatResponse={renderchatResponse} endpoint={props.chatbot_endpoint} isModal={isModal} questions={props.questions} isSOP={isSOP} showSecondColumn={showSecondColumn} />
          {/* <button onClick={handleButtonClick1}>Toggle Second Column</button> */}
        </div>
        {showSecondColumn && (
          <div style={{ backgroundColor: "#1E203D", border: "1px solid #6B5CD1", borderRadius: "8px", marginTop: "8px", height: "85vh", marginBottom: "10px" }}>
            <div className='top-part-chart-chatbot'>
              <div className='title-chart-chatbot'>PDF Viewer</div>
              <img src={close1} style={{ width: "20px", marginLeft: "80%", marginTop: "2px" }} variant="primary" onClick={() => setShowSecondColumn(false)} />
            </div>
            {(!loading && <div style={{ width: '45vw', marginBottom: "10px", padding: "5px 5px", height: "78vh" }}>
              <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js">
                <Viewer fileUrl={pdfData} plugins={[newPlugin]} scale={initialScale} />
              </Worker>
            </div>)}
          </div>
        )}
      </div>
    </div>
  )
}

export default SOP