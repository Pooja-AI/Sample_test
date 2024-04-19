import React from 'react'
import './CorrosionTrendChart.css';
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, LineChart, Line, Legend, BarChart, Bar, ResponsiveContainer } from 'recharts';
const CorrosionSeverityChart = ({ data, analysis}) => {
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
        {/* <div className="custom-legends-shape" style={{ color: "aliceblue" }}>
          <label style={{ whiteSpace: "nowrap" }}>Corrosion Type :</label>
          {legendItem.map((item, index) => (
            <div key={index} className="legend-items">
              <div className={`shape shape-${item.shape}`}></div>
              {item.label}
            </div>
          ))}
        </div> */}
        {/* <div className="custom-legends-shape2" style={{ color: "aliceblue" }}>
          {legendItem2.map((item, index) => (
            <div key={index} className="legend-items2">
              <div className={`shape shape-${item.shape}`}></div>
              {item.label}
            </div>
          ))}
        </div> */}
      </div>
      );
    };
  return (
    <div className='flexrow-bot'>
              <div className='chartborder-bot'>
                <p className='heading-chart-bot'>Corrosion Severity Impact</p>
                <div className='chart-box-bot'>
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
                    {data.map((entry, index) => (
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
              <div>
                <p className='heading-analysis-bot'>Gen AI - Analysis</p>
                {analysis.map((index) => (
                  <ul key={index} className='points-bot'>
                    <li>{index}</li></ul>))}
              </div>
            </div>
  )
}

export default CorrosionSeverityChart