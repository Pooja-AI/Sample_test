import React from 'react'
import Sop from './SOP_NewUI/SOP'

function SOP_Chemical() {
    const questions = [
      'What are the proposed benefits of upgrading the Globe Control Valve for CV103 in the Paraxylene Plant?',
      'How will the installation of the new valve CV-103 impact the load on steam traps?',
      'What are the target flow rate and pressure for lining up the condenser in the Paraxylene Plant?',
      'What steps are involved in lining up the condenser in the Paraxylene Plant?',
      'What is the relationship between valve opening and steam flow rate in the Paraxylene Plant?',
      'What is the purpose of installing the P506B pump as standby for pump P506A in the Paraxylene Plant?',
      'What additional pipeline and isolation valves will be required to bring the standby pump into action? ',
      'What are the responsibilities of the Panel Officer, Field Officer, and Tank Farm personnel during startup activities in the Paraxylene Plant?',
      'What are the critical process parameters that need to be monitored during startup activities in the Paraxylene Plant? ',
      'What are the definitions of MAT, MAP, LEL, ESD, and PPE ?',
      'What is the procedure for filling the column in the Paraxylene plant?',
      'Which plant and area is the equipment tag CV103 located in? ',
      'What is the proposed benefit of upgrading the Globe Control Valve CV103?',
      'What is the target flow rate and pressure for the lining up of the condenser?',
      'Who is responsible for checking the condenser for abnormalities or leaks ?'
    ];
  return (
    <Sop  upload_endpoint= "http://4.175.0.137:5000/uploadFiles" getpdf_endpoint = "http://4.175.0.137:5000/get-pdf" chatbot_endpoint= "http://4.175.0.137:5000/chatBot" questions = {questions}/>
  )
}

export default SOP_Chemical