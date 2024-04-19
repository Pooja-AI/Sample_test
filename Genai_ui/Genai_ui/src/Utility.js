import React, { props } from 'react';
import './App.css';
import asset from './images/image 37.svg';
import vegitation from './images/image 32.svg';
import Customer from './images/shutterstock_download 1.svg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import { faClipboardList } from '@fortawesome/free-solid-svg-icons';
import sopImg from './images/SOP.svg';

const Utility = (props) => {
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
     
      <div className='icons-m'>
        <Link to='/SalesAssistance' className='icon-container-m' onClick={props.closeSideBar}>
        <img className='img-class-m' src={asset}  alt="primary header" /><p className='landing-text'>Customer Experience Intelligent Assistant</p>
        </Link>
        <Link to='/VegetationManagement' className='icon-container-m' onClick={props.closeSideBar}>
        <img className='img-class-m' src={vegitation}  alt="primary header" /><p className='landing-text'>Vegetation Management</p>
        </Link>
        <Link to='/Customer360' className='icon-container-m' onClick={props.closeSideBar}>
        <img className='img-class-m' src={Customer}  alt="primary header" /><p className='landing-text'>GenAI Enabled Customer 360</p>
        </Link>
        <Link to='/SOPUtility' className='icon-container-m' onClick={props.closeSideBar}>
        <img  className='img-class-m2' src={sopImg}  alt="primary header" /> <p className='landing-text'>SOP Review Accelerator</p>
        </Link>
        {/* Add links for other icon-containers */}
      </div>
    </div>
  );
};

export default Utility;
