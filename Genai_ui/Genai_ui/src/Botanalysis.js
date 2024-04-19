import React from 'react'
import './Botanalysis.css';
const Botanalysis = ({ data, heading}) => {
  return (
    <div className='chartborderright-bot' >
                <p className='heading-topic-bot'>{heading}</p>
                {data.map((index) => (
                  <ul key={index} className='points-bot'>
                    <li>{index}</li></ul>))}
              </div>
  )
}

export default Botanalysis


