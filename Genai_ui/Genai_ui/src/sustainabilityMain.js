import React from 'react'
import Sop from './Sustainability/Sustainability'

function SOP_Chemical() {
    const questions = [
        'Give information about the ESG highlights of shell',
        'Give information about the spills, clean-up, Prevention for shell',
        'what are the various waste management strategies undertaken by shell?',
        'What environmental certifications shell and chevron have obtained?',
        'give shells safety and core values',
        'give performance overview of shell in 2022',
        'Report Review Panel recommendations of shell',
        'what are personal safety measurements taken in shell?'
         
    ];
  return (
    <Sop  upload_endpoint= "http://52.157.248.214:5000/uploadFiles" getpdf_endpoint = "http://52.157.248.214:5000/get-pdf" chatbot_endpoint= "http://52.157.248.214:5000/chatBot" questions = {questions}/>
  )
}

export default SOP_Chemical