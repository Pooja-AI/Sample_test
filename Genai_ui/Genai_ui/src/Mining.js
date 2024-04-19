import React, { props } from 'react';
import Mining from './images/Comiq.svg';
import { Link } from 'react-router-dom';
import './App.css';
import scm from './images/SRG.svg';
import asset from './images/APM1.svg';
import sopImg from './images/SOP.svg';

const isMainScreen = true;
const App = (props) => {
  // Energy.js
 
// Other code for Energy.js

  return (
    <div className='energy-m'>
      <div className='sub-H'>
        <div className='head1'>Home</div>
        <div  className='head'>Planning & Strategy</div>
        <div  className='head'>Core Operations</div>
        <div  className='head'>Financial Management</div>
        <div  className='head'>Supply Chain</div>
        <div  className='head'>ESG</div>
        <div  className='head'>Enterprise Functions</div>
      </div >
      <div className=' icons-m'>

        <Link to='/compiq' className='icon-container-m' onClick={props.closeSideBar}>
        <img  className='img-class-m2' src={Mining}  alt="primary header" /> <p className='landing-text'>Intelligent Compliance Management</p>
        </Link>
        {/* <Link to='/Apm' className='icon-container-m'>
          <img className='img-class-m' src={asset} alt="primary header" /> <p className='landing-text'>Asset Performance Management</p>
        </Link>
        <Link to='/OsduSearch' className='icon-container-m'>
          <img className='img-class-m' src={scm} alt="primary header" /> <p className='landing-text'>OSDU Search Assistance</p>
        </Link>
        <Link to='/SOPMining' className='icon-container-m'>
        <img  className='img-class-m2' src={sopImg}  alt="primary header" /> <p className='landing-text'>SOP Review Accelerator</p>
        </Link>        */}
        
        </div>
      
    </div>
  );
};

export default App;
