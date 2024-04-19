import React, { useState } from "react";
import "./CorrosionQuest.css";
import close from './images/Group 3473.svg';

const CorrosionQuest = ({ onClose }) => {
 const questions = ["Can you provide a more details of the identified corrosion type?",
    "What is the rate of corrosion in this case, measured in mils per year (mpy), and is it considered alarming ?",
    "What is the recommended maintenance strategy for addressing this corrosion issue? Is it repair, retrofitment, replacement, or regular maintenance?",
    "Based on the corrosion type detected, do you recommend any immediate action?",
    "Have there been any previous instances of this type of corrosion in the equipment, and if so, what actions were taken previously?",
    "How critical is this equipment in terms of plant operations, and does the corrosion pose any immediate risks to production?",
    "Are there any preventive measures that should be implemented to avoid similar corrosion issues in the future, and can you recommend any changes in equipment management practices?",
    "Should a work order be raised for this specific case of corrosion, and if so, what is the recommended priority level?"]
  

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

export default CorrosionQuest;
