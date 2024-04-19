import React, { props } from 'react';
import './App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import sopImg from './images/Rectangle 764.svg';
import { Link } from 'react-router-dom';
import { faClipboardList } from '@fortawesome/free-solid-svg-icons';

const App = (props) => {
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
        <Link to='/SOPChemical' className='icon-container-m' onClick={props.closeSideBar}>
        <img  className='img-class-m2' src={sopImg}  alt="primary header" /> <p className='landing-text'>SOP Intelligent Assistant</p>
        </Link>
       
        {/* Add links for other icon-containers */}
      </div>
    </div>
  );
};

export default App;
