import React, { useState, useEffect } from 'react';
import './Summary.css';
import PieChart from './Piechart2';
import BarChart from './BarChart';
import chatbot from './images/Group 3009.svg';
import refresh from './images/Group 3139.svg';
import Iicon from './images/Group 3000.svg'

import image from './rust.jpg';
import axios from 'axios';

const Summary = (props) => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState([]);
  const [Bardata, setBardata] = useState({});
  const [keyValueData, setKeyValueData] = useState([]);
  //   const data ={
  //     "Pie Chart": {
  //         "Atmospheric Corrosion": "10.00%",
  //         "Pitting Corrosion": "16.60%",
  //         "Erosion Corrosion": "29.05%",
  //         "Fatigue Corrosion": "41.10%",
  //         "Stress Corrosion": "2.25%"
  //     }
  // };
  //     const Bardata = {
  //       "Bar Chart": [
  //           {
  //               "Year": 2007,
  //               "Atmospheric Corrosion": 0,
  //               "Pitting Corrosion": 1200,
  //               "Erosion Corrosion": 0,
  //               "Fatigue Corrosion": 0,
  //               "Stress Corrosion": 0
  //           },
  //           {
  //               "Year": 2008,
  //               "Atmospheric Corrosion": 0,
  //               "Pitting Corrosion": 0,
  //               "Erosion Corrosion": 3500,
  //               "Fatigue Corrosion": 2000,
  //               "Stress Corrosion": 5000
  //           },
  //           {
  //               "Year": 2009,
  //               "Atmospheric Corrosion": 800,
  //               "Pitting Corrosion": 0,
  //               "Erosion Corrosion": 3200,
  //               "Fatigue Corrosion": 10200,
  //               "Stress Corrosion": 0
  //           },
  //           {
  //               "Year": 2010,
  //               "Atmospheric Corrosion": 0,
  //               "Pitting Corrosion": 3800,
  //               "Erosion Corrosion": 3500,
  //               "Fatigue Corrosion": 0,
  //               "Stress Corrosion": 2500
  //           },
  //           {
  //               "Year": 2011,
  //               "Atmospheric Corrosion": 0,
  //               "Pitting Corrosion": 3000,
  //               "Erosion Corrosion": 4500,
  //               "Fatigue Corrosion": 0,
  //               "Stress Corrosion": 0
  //           },
  //           {
  //               "Year": 2012,
  //               "Atmospheric Corrosion": 2700,
  //               "Pitting Corrosion": 3000,
  //               "Erosion Corrosion": 0,
  //               "Fatigue Corrosion": 0,
  //               "Stress Corrosion": 0
  //           },
  //           {
  //               "Year": 2013,
  //               "Atmospheric Corrosion": 2000,
  //               "Pitting Corrosion": 0,
  //               "Erosion Corrosion": 0,
  //               "Fatigue Corrosion": 2000,
  //               "Stress Corrosion": 1000
  //           },
  //           {
  //               "Year": 2014,
  //               "Atmospheric Corrosion": 800,
  //               "Pitting Corrosion": 6500,
  //               "Erosion Corrosion": 0,
  //               "Fatigue Corrosion": 2500,
  //               "Stress Corrosion": 0
  //           },
  //           {
  //               "Year": 2015,
  //               "Atmospheric Corrosion": 800,
  //               "Pitting Corrosion": 500,
  //               "Erosion Corrosion": 9500,
  //               "Fatigue Corrosion": 0,
  //               "Stress Corrosion": 0
  //           },
  //           {
  //               "Year": 2016,
  //               "Atmospheric Corrosion": 0,
  //               "Pitting Corrosion": 0,
  //               "Erosion Corrosion": 3000,
  //               "Fatigue Corrosion": 2500,
  //               "Stress Corrosion": 0
  //           },
  //           {
  //               "Year": 2017,
  //               "Atmospheric Corrosion": 1000,
  //               "Pitting Corrosion": 3800,
  //               "Erosion Corrosion": 4000,
  //               "Fatigue Corrosion": 0,
  //               "Stress Corrosion": 0
  //           },
  //           {
  //               "Year": 2018,
  //               "Atmospheric Corrosion": 800,
  //               "Pitting Corrosion": 0,
  //               "Erosion Corrosion": 6200,
  //               "Fatigue Corrosion": 0,
  //               "Stress Corrosion": 0
  //           },
  //           {
  //               "Year": 2019,
  //               "Atmospheric Corrosion": 500,
  //               "Pitting Corrosion": 2500,
  //               "Erosion Corrosion": 3500,
  //               "Fatigue Corrosion": 6000,
  //               "Stress Corrosion": 0
  //           },
  //           {
  //               "Year": 2020,
  //               "Atmospheric Corrosion": 0,
  //               "Pitting Corrosion": 2000,
  //               "Erosion Corrosion": 7000,
  //               "Fatigue Corrosion": 9500,
  //               "Stress Corrosion": 0
  //           },
  //           {
  //               "Year": 2021,
  //               "Atmospheric Corrosion": 1000,
  //               "Pitting Corrosion": 2800,
  //               "Erosion Corrosion": 7000,
  //               "Fatigue Corrosion": 2000,
  //               "Stress Corrosion": 0
  //           },
  //           {
  //               "Year": 2022,
  //               "Atmospheric Corrosion": 0,
  //               "Pitting Corrosion": 2800,
  //               "Erosion Corrosion": 3200,
  //               "Fatigue Corrosion": 2500,
  //               "Stress Corrosion": 0
  //           },
  //           {
  //               "Year": 2023,
  //               "Atmospheric Corrosion": 600,
  //               "Pitting Corrosion": 1300,
  //               "Erosion Corrosion": 0,
  //               "Fatigue Corrosion": 0,
  //               "Stress Corrosion": 0
  //           }
  //       ],
  //       "Line Chart": [
  //           {
  //               "Year": 2007,
  //               "Atmospheric Corrosion": 0,
  //               "Pitting Corrosion": 1200,
  //               "Erosion Corrosion": 0,
  //               "Fatigue Corrosion": 0,
  //               "Stress Corrosion": 0
  //           },
  //           {
  //               "Year": 2008,
  //               "Atmospheric Corrosion": 0,
  //               "Pitting Corrosion": 0,
  //               "Erosion Corrosion": 3500,
  //               "Fatigue Corrosion": 2000,
  //               "Stress Corrosion": 5000
  //           },
  //           {
  //               "Year": 2009,
  //               "Atmospheric Corrosion": 800,
  //               "Pitting Corrosion": 0,
  //               "Erosion Corrosion": 3200,
  //               "Fatigue Corrosion": 10200,
  //               "Stress Corrosion": 0
  //           },
  //           {
  //               "Year": 2010,
  //               "Atmospheric Corrosion": 0,
  //               "Pitting Corrosion": 3800,
  //               "Erosion Corrosion": 3500,
  //               "Fatigue Corrosion": 0,
  //               "Stress Corrosion": 2500
  //           },
  //           {
  //               "Year": 2011,
  //               "Atmospheric Corrosion": 0,
  //               "Pitting Corrosion": 3000,
  //               "Erosion Corrosion": 4500,
  //               "Fatigue Corrosion": 0,
  //               "Stress Corrosion": 0
  //           },
  //           {
  //               "Year": 2012,
  //               "Atmospheric Corrosion": 2700,
  //               "Pitting Corrosion": 3000,
  //               "Erosion Corrosion": 0,
  //               "Fatigue Corrosion": 0,
  //               "Stress Corrosion": 0
  //           },
  //           {
  //               "Year": 2013,
  //               "Atmospheric Corrosion": 2000,
  //               "Pitting Corrosion": 0,
  //               "Erosion Corrosion": 0,
  //               "Fatigue Corrosion": 2000,
  //               "Stress Corrosion": 1000
  //           },
  //           {
  //               "Year": 2014,
  //               "Atmospheric Corrosion": 800,
  //               "Pitting Corrosion": 6500,
  //               "Erosion Corrosion": 0,
  //               "Fatigue Corrosion": 2500,
  //               "Stress Corrosion": 0
  //           },
  //           {
  //               "Year": 2015,
  //               "Atmospheric Corrosion": 800,
  //               "Pitting Corrosion": 500,
  //               "Erosion Corrosion": 9500,
  //               "Fatigue Corrosion": 0,
  //               "Stress Corrosion": 0
  //           },
  //           {
  //               "Year": 2016,
  //               "Atmospheric Corrosion": 0,
  //               "Pitting Corrosion": 0,
  //               "Erosion Corrosion": 3000,
  //               "Fatigue Corrosion": 2500,
  //               "Stress Corrosion": 0
  //           },
  //           {
  //               "Year": 2017,
  //               "Atmospheric Corrosion": 1000,
  //               "Pitting Corrosion": 3800,
  //               "Erosion Corrosion": 4000,
  //               "Fatigue Corrosion": 0,
  //               "Stress Corrosion": 0
  //           },
  //           {
  //               "Year": 2018,
  //               "Atmospheric Corrosion": 800,
  //               "Pitting Corrosion": 0,
  //               "Erosion Corrosion": 6200,
  //               "Fatigue Corrosion": 0,
  //               "Stress Corrosion": 0
  //           },
  //           {
  //               "Year": 2019,
  //               "Atmospheric Corrosion": 500,
  //               "Pitting Corrosion": 2500,
  //               "Erosion Corrosion": 3500,
  //               "Fatigue Corrosion": 6000,
  //               "Stress Corrosion": 0
  //           },
  //           {
  //               "Year": 2020,
  //               "Atmospheric Corrosion": 0,
  //               "Pitting Corrosion": 2000,
  //               "Erosion Corrosion": 7000,
  //               "Fatigue Corrosion": 9500,
  //               "Stress Corrosion": 0
  //           },
  //           {
  //               "Year": 2021,
  //               "Atmospheric Corrosion": 1000,
  //               "Pitting Corrosion": 2800,
  //               "Erosion Corrosion": 7000,
  //               "Fatigue Corrosion": 2000,
  //               "Stress Corrosion": 0
  //           },
  //           {
  //               "Year": 2022,
  //               "Atmospheric Corrosion": 0,
  //               "Pitting Corrosion": 2800,
  //               "Erosion Corrosion": 3200,
  //               "Fatigue Corrosion": 2500,
  //               "Stress Corrosion": 0
  //           },
  //           {
  //               "Year": 2023,
  //               "Atmospheric Corrosion": 600,
  //               "Pitting Corrosion": 1300,
  //               "Erosion Corrosion": 0,
  //               "Fatigue Corrosion": 0,
  //               "Stress Corrosion": 0
  //           }
  //       ]
  //   };
  //     const keyValueData = [{'key': 'PlantID', 'value': 'Plant – C'}, {'key': 'AssetID', 'value': 'AS0007'}, {'key': 'Asset', 'value': 'Gas Pipeline'}, {'key': 'Fluid', 'value': 'Sour Gas'}, {'key': 'InstallationDate', 'value': '2005-11-01'}, {'key': 'Size', 'value': '4'}, {'key': 'Material', 'value': 'API 5L-X42'}, {'key': 'CoatingType', 'value': 'Epoxy'}, {'key': 'OperatingPressure', 'value': '1100'}, {'key': 'LastInspectionDate', 'value': '2023-06-01'}];
      const detectedCorrosionType = localStorage.getItem('detectedCorrosionType');
        const plantId = sessionStorage.getItem('plantId');
        const assetId = sessionStorage.getItem('assetId');
        const selectedImage = localStorage.getItem('uploadedImage');
  useEffect(() => {
    const detectedCorrosionType = localStorage.getItem('detectedCorrosionType');
    const plantId = sessionStorage.getItem('plantId');
    const assetId = sessionStorage.getItem('assetId');
    const selectedImage = sessionStorage.getItem('selectedImage');
    
    const fetchData1 = async () => {
      try {
        const userInput = {
          plantId: plantId || '',
          assetId: assetId || '',
          detectedCorrosionType: detectedCorrosionType || '',
        };
    
        const response = await axios.post('http://52.157.248.197:5000/pieOne', userInput);
        const result = response.data;
        setData(result);
      } catch (error) {
        console.error('Error fetching data from API 1', error);
      }
    };

    const fetchData2 = async () => {
      try {
        const userInput = {
          plantId: plantId || '',
          assetId: assetId || '',
          detectedCorrosionType: detectedCorrosionType || '',
        };
    
        const response = await axios.post('http://52.157.248.197:5000/barOne', userInput);
        const result = response.data["Bar Chart"];

        const currentYear = new Date().getFullYear();
        const last5YearsData = result.filter(item => item.Year >= currentYear - 4 && item.Year <= currentYear);
        console.log(last5YearsData)
        
        console.log("bar",result)
        setBardata(last5YearsData);
      } catch (error) {
        console.error('Error fetching data from API 2', error);
      }
    };

    const fetchData3 = async () => {
      try {
        const userInput = {
          plantId: plantId || '',
          assetId: assetId || '',
          detectedCorrosionType: detectedCorrosionType || '',
        };
    
        const response = await axios.post('http://52.157.248.197:5000/tableOne', userInput);
        const result = response.data;
        setKeyValueData(result);
      } catch (error) {
        console.error('Error fetching data from API 3', error);
      }
    };
    
    Promise.all([fetchData1(),fetchData2(),  fetchData3()])
      .then(() => {
        setIsLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        setIsLoading(false);
      });
  }, []);
  const convertedArray = Object.entries(keyValueData).map(([key, value]) => ({
    key: key,
    value: value
  }));
  const splitIndex = Math.ceil(convertedArray.length / 2);
  const firstHalf = convertedArray.slice(0, splitIndex);
  const secondHalf = convertedArray.slice(splitIndex);
   const Loading = () => {
        return (
            <div className='incident-loader'>
          <div className="loader">
          <div className='loader-text'>Fetching the data from LLM</div>
            <div className="dot red"></div>
            <div className="dot green"></div>
            <div className="dot blue"></div>
          </div>
          </div>
        );
      
      };
  return (
    
    <div>
    {isLoading ? (
      <Loading />
    ) : (
      <div>
  
    
    <div className='summary-container'>
   
          
       
          <div className='left-sum'>
            <div className='top-left-summ'>
              <div >
                <table className='key-table'>
                  <tbody>
                    {firstHalf.map((item, index) => (
                      <tr key={index}>
                        <td>{`${item.key}: \u00A0${item.value}`}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div>
                <table className='key-table'>
                  <tbody>
                    {secondHalf.map((item, index) => (
                      <tr key={index}>
                        <td>{`${item.key}:  \u00A0${item.value}`}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            <div className='bottom-left-summ'>
            <div className='business-Heading-summ'>Maintenance cost over time</div>
              <BarChart barChartData={Bardata} /> 
            </div>
          </div>
          <div className='right-sum'>
            <div className='top-right-summ'>
              <div className='corrosion-sum'>
                <div className='type-sum'>{detectedCorrosionType}</div>
                <div className='detect-sum'>Detected Corrosion Type</div>
                
              </div>
              <img className='img-sum' src={selectedImage} alt='Sample' />
            </div>
            <div className='bottom-right-summ'>
            <div className='business-Heading-summ'>Corrosion Impact</div>
              <PieChart data={data} />
            </div>
          </div>
          </div>
          </div>
        )}
        </div>
       
       
  );
}

export default Summary;
