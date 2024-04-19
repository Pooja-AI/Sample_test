import React from 'react'
import { XAxis, YAxis, CartesianGrid, Tooltip, Legend, BarChart, Bar } from 'recharts';
import './CorrosionTrendChart.css';
const CorrosionTrendChart = ({ data, analysis}) => {
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
  return (
    <div className='flexrow-bot'>
              <div className='chartborder-bot'>
                <p className='heading-chart-bot'>Corrosion Trend</p>
                <div className='chart-box-bot'>
                  <BarChart width={520} height={350} data={data} margin={{ top: 5, right: 10, left: 1, bottom: 5 }}>
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
                    {/* <Legend
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
                    /> */}
                    {Object.keys(data[0]).map((key, index) => {
                      if (key !== "Year") {
                        return <Bar key={index} dataKey={key} fill={colors[key]} barSize={50} />;
                      }
                      return null;
                    })}
                  </BarChart>
                </div>
              </div>
              <div >
                <p className='heading-analysis-bot'>Gen AI - Analysis</p>
                {(analysis) ? analysis.map((index) => (
                  <ul key={index} className='points-bot'>
                    <li>{index}</li></ul>)) : <></>}
              </div>
            </div>
  )
}

export default CorrosionTrendChart