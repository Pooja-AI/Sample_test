import React, { useState, useEffect } from 'react';
import pdf from './images/PDF-button.svg';
import close from './images/Group 3124.svg';
import shift1 from './images/Group 3087.svg';
import shift2 from './images/Group 3088.svg';

import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, LineChart, Line, Legend, BarChart, Bar, ResponsiveContainer } from 'recharts';

function Insights(props) {
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
    ;
  };
  const color = {
    'Low': '#6ed3fe',
    'N/A': 'gray',
    'High': 'red',
    'Moderate': 'orange'
  };
  const shape = {
    "Atmospheric Corrosion": "circle",
    "Fatigue Corrosion": "square",
    "Pitting Corrosion": "triangle",
    "Erosion Corrosion": "cross",
    "Stress Corrosion": "diamond",
  };
  const colors = {
    "Atmospheric Corrosion": "rgba(161, 84, 186, 1)",
    "Fatigue Corrosion": "rgba(17, 207, 236, 1)",
    "Pitting Corrosion": "rgba(137, 114, 255, 1",
    "Erosion Corrosion": "rgba(24, 90, 171, 1)",
    "Stress Corrosion": "rgba(46, 156, 220, 1)",

  };

  const tooltipStyle = {
    backgroundColor: 'white',
    color: 'black',
    border: '1px solid',
    padding: '10px',
    borderRadius: '5px',
    borderColor: '#8d97dac5',
    boxShadow: '0px 0px 10px 0px rgba(0, 0, 0, 0.2)',
    fontFamily: 'Graphik',
    fontSize: '12px',
    // backgroundColor: '#f5f5f5',
  };
  const scatterTooltipStyle = {
    border: '1px solid',
    padding: '10px',
    borderRadius: '5px',
    borderColor: '#8d97dac5',
    boxShadow: '0px 0px 10px 0px rgba(0, 0, 0, 0.2)',
    fontFamily: 'Graphik',
    fontSize: '12px',
    color: 'black'
  };

  const CustomLegendContent = () => {
    const legendItems = [
      { color: '#6ed3fe', label: 'Low' },
      { color: 'orange', label: 'Moderate' },
      { color: 'red', label: 'High' }
    ];
    const legendItem = [
      { shape: 'circle', label: 'Atmospheric Corrosion' },
      { shape: 'square', label: 'Fatigue Corrosion' },
      { shape: 'triangle', label: 'Pitting Corrosion' }
    ];
    const legendItem2 = [
      { shape: 'cross', label: 'Erosion Corrosion' },
      { shape: 'diamond', label: 'Stress Corrosion' }
    ];
    return (<div>
      <div className="custom-legends" style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
        <label style={{ marginRight: "3px" }}>Corrosion Severity :</label>
        {legendItems.map((item, index) => (
          <div key={index} style={{ display: 'flex', alignItems: 'center', marginLeft: '5px' }}>
            <div style={{ width: '10px', height: '10px', backgroundColor: item.color, marginRight: '5px' }}></div>
            {item.label}
          </div>
        ))}


      </div>
      <div className="custom-legends-shape" style={{ color: "aliceblue" }}>
        <label style={{ whiteSpace: "nowrap" }}>Corrosion Type :</label>
        {legendItem.map((item, index) => (
          <div key={index} className="legend-items">
            <div className={`shape shape-${item.shape}`}></div>
            {item.label}
          </div>
        ))}
      </div>
      <div className="custom-legends-shape2" style={{ color: "aliceblue" }}>
        {legendItem2.map((item, index) => (
          <div key={index} className="legend-items2">
            <div className={`shape shape-${item.shape}`}></div>
            {item.label}
          </div>
        ))}
      </div>
    </div>
    );
  };
  const CustomLegendContent_Bar = () => {
    const legendItems = [
      { color: 'rgba(161, 84, 186, 1)', label: 'Atmospheric Corrosion' },
      { color: 'rgba(17, 207, 236, 1)', label: 'Pitting Corrosion' },
      { color: 'rgba(137, 114, 255, 1)', label: 'Erosion Corrosion' },
      { color: 'rgba(24, 90, 171, 1)', label: 'Fatigue Corrosion' },
      { color: 'rgba(46, 156, 220, 1)', label: 'Stress Corrosion' },
    ];

    return (
      <div className="custom-legend">
        {legendItems.map((item, index) => (
          <div key={index} className="legend-item">
            <div style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: item.color, marginRight: '5px' }}></div>
            {item.label}
          </div>
        ))}
      </div>
    );
  };

  const [pdfModal, setShowPdfModal] = useState(false);
  const [pdfType, setPdfType] = useState('');
  const [pdfContent, setPdfContent] = useState(false);

  const handleToggleModal = (pdfname) => {
    setShowPdfModal(true);
    const checkpdf = (pdfname == "pdf1" ? "pdf1" : "pdf2");
    setPdfType(checkpdf);
    const pdf = (pdfname == "pdf1" ? ["1112345A - Routine Inspection and Maintenance for Atmospheric Corrosion Control"] : ["1241734Q - Emergency Response for Atmospheric Corrosion- relates pipeline Issues"]);
    setPdfContent(pdf);
  };
  const handleClosePdfView = () => {
    setShowPdfModal(false)
  };
  const handlePdfView = () => {
    const name = (pdfType == "pdf1" ? "pdf2" : "pdf1")
    handleToggleModal(name)
  };
  const pdf1 = [
    "The highest downtime due to corrosion was observed in the year 2015, with a total of 7 days.",
    "The most common type of corrosion observed was Erosion Corrosion, with a total downtime of 22 days over the years.",
    "The least common type of corrosion observed was Stress Corrosion, with a total downtime of only 4 days over the years.",
    "There seems to be a correlation between the occurrence of Pitting Corrosion and an increase in downtime, with a peak in 2014.",
    "The occurrence of Atmospheric Corrosion seems to have decreased over the years, with a peak in 2012.",
    "The occurrence of Erosion Corrosion seems to have increased over the years, with a peak in 2020.",
    "Further statistical analysis could be performed to determine if there is a significant correlation between the type of corrosion and the downtime observed."
  ];
  const pdf2 = [
    "Erosion Corrosion and Pitting Corrosion have the highest total cost and total downtime.",
    "Fatigue Corrosion has a high total cost but a moderate total downtime.",
    "Stress Corrosion has a low total cost but a low total downtime.",
    "Atmospheric Corrosion has a low total cost and a moderate total downtime.",
    "There is no data for corrosion types with no severity.",
    "The severity of corrosion varies greatly, with some types having high severity and others having no severity.",
    "There is no clear correlation between the type of corrosion and the cost or downtime over the years."
  ];
  const Pdf = () => {
    return (<div className='pdf-contanier'>
      <div style={{ display: "flex" }}>
        <p className='pdf-heading col-sm-10'>{pdfContent}</p>
        <div className= "col-sm-2" style={{ display: "flex", paddingLeft:"55px" }}>
        <img src={shift1} className="chatboticon close-pdf" onClick={handlePdfView} />
        <img src={shift2} className="chatboticon close-pdf" onClick={handlePdfView} />
        <img src={close} className="chatboticon close-pdf"  onClick={handleClosePdfView} />
      </div></div>
      <div style={{ display: "flex" }}>
        <div>
          <img src={pdf} alt="Icon" className="pdf-cd" />
        </div>
        <div>
          {{ pdfType} == "pdf1" ? (<div>{pdf1.map((index) => (
            <ul key={index} className='points'>
              <li>{index}</li></ul>))}</div>)
            : (<div>{pdf2.map((index) => (
              <ul key={index} className='points'>
                <li>{index}</li></ul>))}</div>)}
        </div>
      </div>
      <div>
      </div>
    </div>);
  }
  return (
    (props.loading ? (<Loading />) : (pdfModal ? (<Pdf />) :
      <div className='insights' >
        <div className='hidescroll'>
          <div className='chart'>
            <div className='flexrow'>
              <div className='col-sm-6 chartborder'>
                <p className='heading-chart'>Corrosion Trend</p>
                <div className='chart-box'>
                  <BarChart width={520} height={350} data={props.linechartdata} margin={{ top: 5, right: 10, left: 1, bottom: 5 }}>
                    <CartesianGrid stroke="rgba(65, 67, 82, 1)" />
                    <XAxis
                      dataKey="Year"
                      stroke="rgba(65, 67, 82, 1)"
                      tick={{ fill: 'white', fontSize: 13, fontwieght: 100 }}
                      label={{ value: "Year", fill: 'white', fontSize: 13, position: 'insideBottom', dy: 10, fontwieght: 200 }}
                    />
                    <YAxis
                      stroke="rgba(65, 67, 82, 1)"
                      tick={{ fill: 'white', fontSize: 13, fontwieght: 100 }}
                      label={{ value: "Downtine (Days)", fill: 'white', fontSize: 13, angle: -90, dy: 1, dx: -4, fontwieght: 100 }} domain={[0, 'dataMax+1']}
                    />
                    <Tooltip cursor={false} contentStyle={tooltipStyle} />
                    <Legend
                      width={500}
                      wrapperStyle={{
                        backgroundColor: 'transparent',
                        fontSize: '10px',
                        borderRadius: 3,
                        paddingTop: '20px',
                        paddingLeft: '50px',
                        color: 'white'
                      }}
                      height={45}
                      content={<CustomLegendContent_Bar />} align="center" verticalAlign="bottom"
                    />
                    {Object.keys(props.linechartdata[0]).map((key, index) => {
                      if (key !== "Year") {
                        return <Bar key={index} dataKey={key} fill={colors[key]} barSize={50} />;
                      }
                      return null;
                    })}
                  </BarChart>
                </div>
              </div>
              <div className='col-sm-6 chartborderright' >
                <p className='heading-analysis'>Gen AI - Analysis</p>
                {(props.lineAnalysis) ? props.lineAnalysis.map((index) => (
                  <ul key={index} className='points'>
                    <li>{index}</li></ul>)) : <></>}
              </div>
            </div>
          </div>

          <div className='chart'>
            <div className='flexrow'>
              <div className='col-sm-6 chartborder'>
                <p className='heading-chart'>Corrosion Severity Impact</p>
                <div className='chart-box'>
                  <ScatterChart width={500} height={375}>
                    <CartesianGrid stroke="rgba(65, 67, 82, 1)" />
                    {/* <XAxis type="number" dataKey="downtime" name="Total Downtime"  allowDuplicatedCategory={false} stroke="rgba(65, 67, 82, 1)" tick={{ fill: 'white', fontSize: 13, fontwieght: 100 }} label={{ value: "Year", fill: 'white', fontSize: 13, position: 'insideBottom', dy: 10, fontwieght: 200 }} padding={{ left: 70, right: 70, bottom: 120 }} />
                <YAxis type="number" dataKey="downtime" name="Total Cost" stroke="rgba(65, 67, 82, 1)" tick={{ fill: 'white', fontSize: 13, fontwieght: 100 }} label={{ value: "Count/Downtine (Days)", fill: 'white', fontSize: 13, angle: -90, dy: 1, dx: -4, fontwieght: 100 }} padding={{ top: 60 }} /> */}
                    <XAxis type="number" dataKey="Total Downtime" name="Total Downtime" tick={{ fill: 'white', fontSize: 13, fontwieght: 100 }} label={{ value: "Downtime", fill: 'white', fontSize: 13, position: 'insideBottom', dy: 10, fontwieght: 200 }} padding={{ left: 50, right: 70, bottom: 120 }} />
                    <YAxis type="number" dataKey="Total Cost" name="Total Cost" tick={{ fill: 'white', fontSize: 13, fontwieght: 100 }} label={{ value: "Cost (USD)", fill: 'white', fontSize: 13, angle: -90, dy: 1, dx: -23, fontwieght: 100 }} padding={{ top: 50 }} />
                    {/* <XAxis type="number" dataKey="downtime" name="Total Downtime" />
                  <YAxis type="number" dataKey="cost" name="Total Cost" /> */}
                    <Legend
                      wrapperStyle={{
                        backgroundColor: 'transparent',
                        fontSize: '10px',
                        borderRadius: 3,
                        lineHeight: '20px',
                        paddingTop: '50px',
                        paddingLeft: '50px',
                        color: 'white'
                      }}
                      content={<CustomLegendContent />}
                    />

                    <Tooltip cursor={{ strokeDasharray: '3 3' }} contentStyle={scatterTooltipStyle} />
                    {props.convertedData.map((entry, index) => (
                      <Scatter
                        key={`scatter-${index}`}
                        data={[entry]}
                        fill={color[entry.Severity]}
                        shape={shape[entry["Corrosion Type"]]}
                      />
                    ))}
                  </ScatterChart>
                </div>
              </div>
              <div className='col-sm-6 chartborderright' >
                <p className='heading-analysis'>Gen AI - Analysis</p>
                {props.scatterAnalysis.map((index) => (
                  <ul key={index} className='points'>
                    <li>{index}</li></ul>))}
              </div>
            </div>
          </div>
          <div className='chart'>
            <div className='flexrow1'>
              <div className='col-sm-6 chartborder'>
                <p className='heading-topic'>Root Cause Analysis</p>
                <div className='chart-box-below'>
                  {props.rootCauseAnalysis.map((index) => (
                    <ul key={index} className='points'>
                      <li>{index}</li></ul>))}
                </div>
              </div>
              <div className='col-sm-6 chartborderright' >
                <p className='heading-topic'>Remedial Measures</p>
                {props.preventiveMeasures.map((index) => (
                  <ul key={index} className='points'>
                    <li>{index}</li></ul>))}
              </div>
            </div>
          </div>
          <div className='sop-box'>
            <div className='flexrow3 chart'>
              <p className='heading-analysis'>SOP & Documentation</p>
            </div>
            <div className='pdf-cd-box'>
              <div className='col-sm-6 pdf-cd-box-rt'><img src={pdf} alt="Icon" className="pdf-cd" onClick={() => handleToggleModal("pdf1")} /> <p className='pdf-text'>1112345A - Routine Inspection and Maintenance for Atmospheric Corrosion Control</p></div>
              <div className='col-sm-6 pdf-cd-box-rt'><img src={pdf} alt="Icon" className="pdf-cd" onClick={() => handleToggleModal("pdf1")} /><p className='pdf-text'>1241734Q - Emergency Response for Atmospheric Corrosion- relates pipeline Issues</p></div>
            </div>
          </div>
        </div>
      </div >))
  )
}

export default Insights