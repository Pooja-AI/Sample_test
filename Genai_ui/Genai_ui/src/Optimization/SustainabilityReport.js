import React, { useEffect, useState, useRef } from 'react';
import Table from 'react-bootstrap/Table';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import chatbot from '../images/Group 3439.svg';
import Iicon from '../images/Group 3440.svg';
import { Helmet } from 'react-helmet';
import parse from 'html-react-parser';
import Chart from 'chart.js/auto';
import 'bootstrap/dist/css/bootstrap.min.css';
import Info from '../Info.js';
import Chatbot from '../Generic_Chatbot';
import Barchart from '../Drilling_Operation_Assistant/BarChart.js';
import Linechart from '../Drilling_Operation_Assistant/LineGraph.js';
import Piechart from '../Drilling_Operation_Assistant/PieChart.js';
import EditIcon from '@mui/icons-material/Edit';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

const SustainabilityReport = ({ responseHtml, onEditClick }) => {
  const [showModal, setShowModal] = useState(false);
  const [showChatbotModal, setShowChatbotModal] = useState(false);

  useEffect(() => {
    const scriptContent = extractScriptContent(responseHtml);

    if (scriptContent) {
      if (typeof Chart !== 'undefined') {
        // Delay script execution by 100 milliseconds
        setTimeout(() => {
          try {
            // Execute the script
            new Function(scriptContent)();
          } catch (error) {
            // Handle script execution error
            console.error('Script execution error:', error);
            
          }
        }, 100);
      }
    } else {
      console.log('No script tags found in the HTML content.');
    }
  }, [responseHtml]);

  function extractScriptContent(responseHtml) {
    if (Array.isArray(responseHtml)) {
      // If responseHtml is an array, process each element
      return responseHtml.map((html) => extractScriptContent(html)).join('');
    }
  
    const scriptRegex = /<script>([\s\S]*?)<\/script>/g;
    const matches = responseHtml.match(scriptRegex);
  
    if (matches) {
      const scriptContent = matches[0].replace(/<script>([\s\S]*?)<\/script>/, '$1');
      return scriptContent;
    }
  
    return null; // No script tags found
  }
  
  const renderchatResponse = (message, index, chatMessages) => {
    scrollToBottom();
    console.log(message);
    if (message.user) {
      return (
        <div className="user-message-v">
          {(index === chatMessages.length - 1) ? <TypingEffect text={message.message} /> : <span>{message.message}</span>}
        </div>
      );
    }
    else if (message.message == "Hi! How can I assist you today?") {
      return (
        <div className="user-message-v">
          {(index === chatMessages.length - 1) ? <TypingEffect text={message.message} /> : <span>{message.message}</span>}
        </div>
      );
    }
    else {
      if (message && message.message) {
        const response_data = message.message.response_data;
        const response_type = message.message.response_type;
        console.log(response_data);
        console.log(response_type);
        if (response_type === "answer") {
          console.log("answer");
          return (
            <div className="bot-text-response-d">
              {(index === chatMessages.length - 1) ? <TypingEffect text={response_data} /> : <span>{response_data} </span>}
            </div>
          );
        }
        else if (response_type === "table") {
          console.log("table");
          const columns = response_data.columns;
          const tableRows = response_data.data;
          return (
            <div className="bot-table-response-doa">
              <table className="table-doa1">
                <thead>
                  <tr>
                    {columns.map((column, index) => (
                      <th key={index}>{column}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {tableRows.map((row, rowIndex) => (
                    <tr key={rowIndex} className={rowIndex % 2 === 0 ? 'even-row' : 'odd-row'}>
                      {row.map((cell, cellIndex) => (
                        <td key={cellIndex}>{cell}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
              <div>
              </div>
            </div>
          );
        }
        else if (response_type === "graph") {
          if ('bar' in response_data) {
            const bar_data = response_data.bar;
            const chartData = bar_data.data.map(([name, value]) => ({ name, value }));
            const xAxis = bar_data.columns[0];
            const yAxis = bar_data.columns[1];
            console.log(chartData)
            return (<Barchart barChartData={chartData} xAxis={xAxis} yAxis={yAxis} />)
          }
          else if ('line' in response_data) {
            const data = response_data.line;
            const chartData = data.data.map(([name, value]) => ({ name, value }));
            const xAxis = data.columns[0];
            const yAxis = data.columns[1];
            console.log(chartData)
            return (<Linechart lineChartData={chartData} xAxis={xAxis} yAxis={yAxis} />)
          }
          else if ('pie' in response_data) {
            const data = response_data.pie;
            const chartData = data.data.map(([name, value]) => ({ name, value }));
            console.log(chartData)
            return (<Piechart chartData={chartData} />)
          }
        }
        else {
          console.log("null part");
          return null;
        }
      } else {
        return null;
      }
    }
  };

const renderResponse = (message) => {
    console.log(message);
    if (!message.user) {
      if (message && message.message) {
        const response_data = message.message.response_data;
        const response_type = message.message.response_type;
        console.log(response_data);
        console.log(response_type);
        if (response_type === "table") {
          console.log("table");
          if (response_data && response_data.data) {
            const columns = response_data.columns;
            const tableRows = response_data.data;
            return (
              <div className="bot-table-response-doa">
                <Table responsive hover>
                  <thead style={{ width: "fit-content" }}>
                    <tr style={{ width: "100px", padding: "5px 10px" }}>
                      {columns.map((column, index) => (
                        <th key={index}>{column}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {tableRows.map((row, rowIndex) => (
                      <tr key={rowIndex}>
                        {row.map((cell, cellIndex) => (
                          <td key={cellIndex}>{cell}</td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </Table>
                <div>
                </div>
              </div>
            );
          }
        }
        else {
          console.log("null part");
          // return null;
        }
      } else {
        // return null;
      }
    }
  };
  const scrollContainerRef = useRef(null);

  const scrollToBottom = () => {
      if (scrollContainerRef.current) {
        scrollContainerRef.current.scrollTop = scrollContainerRef.current.scrollHeight;
      }
    };
    const TypingEffect = ({ text, onComplete }) => {
      const [displayText, setDisplayText] = useState('');
  
      useEffect(() => {
        let timeout;
        const displayTextArray = text.split('');
  
        const addCharacter = (index) => {
          setDisplayText((prevText) => prevText + displayTextArray[index]);
          if (index < displayTextArray.length - 1) {
            timeout = setTimeout(() => addCharacter(index + 1), 50); // Adjust the delay as needed
          } else {
            // Call onComplete when typing effect completes
            onComplete && onComplete();
          }
        };
  
        addCharacter(0);
  
        return () => clearTimeout(timeout);
      }, [text, onComplete]);
  
      return <span>{displayText}</span>;
    };
  const questions = ["Provide total depth of different wells.",
    "Provide the drilling report on GCHAR",
    "Provide the drilling report on VIV-12",
    "Plot a bar graph on Mud PPG of different wells", "Can you give me the Drilling report on GCHAR"];
  const handleToggleModal = () => {
    setShowModal(!showModal);
  };
  const handleEdit = () =>{
    console.log('inside eit');
  };

  const handleChatbotToggleModal = () => {
    setShowChatbotModal(!showChatbotModal);
  };

  return (
    <div style={{ width: '115%',display:'flex',flexDirection:'column', height: '1120px', marginLeft: '-43px' }}>
      <div style={{ paddingTop: '15px' }}>
        <div className='info-icon-doa'>
          <img className='doa-icon' src={chatbot} onClick={handleChatbotToggleModal} />
          <EditIcon onClick={onEditClick} className='doa-icon' style={{ border: '1px solid #707070', padding: '4px', borderRadius: '5px', fontSize: '29px' }} ></EditIcon>
          <CloudUploadIcon className='doa-icon' style={{ border: '1px solid #707070', padding: '4px', borderRadius: '5px', fontSize: '29px' }} onClick={handleEdit}></CloudUploadIcon>
          <img className="doa-icon" src={Iicon} onClick={handleToggleModal} />
        </div>
      </div>

      {showModal && (
        <Info onClose={() => setShowModal(false)} />
      )}

      {showChatbotModal && (
        <Chatbot closechat={() => setShowChatbotModal(false)} renderchatResponse={renderchatResponse} renderResponse={renderResponse} endpoint="http://52.157.248.244:5000/chatBot" questions={questions} />
      )}
      <div style={{backgroundColor: 'rgba(255, 255, 255, 0.1)',padding:'30px',borderRadius:'10px',height:'800px',border: '1px solid rgb(255, 255, 255)'}}>
      <Container>
        <Row>
          {responseHtml.map((html, index) => (
            <Col key={index}  md={4}>
              {parse(html)}
            </Col>
          ))}
        </Row>
      </Container>
      </div>
    </div>
  );
};

export default SustainabilityReport;
