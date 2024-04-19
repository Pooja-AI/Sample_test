import React, { useState } from "react";
import "./CorrosionQuest.css";
import close from './images/Group 3473.svg';
import question from './images/Group 3593.svg';

const VegetationQuest = ({ onClose }) => {
 const questions = ["Can you plot a bar graph for top 5 circuits with maximum total customer served in year 2023?",
    "How many circuits are present in central division and Aldene substation?",
    "Provide the circuit with highest customer being served with the customer count?",
    "What are the circuits with maximum customer served in southern division?",
    "Provide the details of top 5 circuits with maximum customer served?",
    "Can you plot a pie chart for top 5 circuits with highest total customer served?",
    "Can you plot a line graph for top 5 circuits with highest total customer served?"]
  

  return (
    <div className="modal-overlay-quest">
      <div className="modal-doa-quest">
        
        <div className="modal-content-quest">
        <div className='analysis-head2-quest'> Recommended Questions
        <img className="close-icon-quest" onClick={onClose} src = {close}/></div>
        { questions.map((index) => (
                  <ul key={index} className='points'>
                    <li>{index}</li></ul>))}

     </div>   
      </div>
    </div>
  );
};

export default VegetationQuest;
