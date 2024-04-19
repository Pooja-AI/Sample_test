import React, { props } from 'react';
import safety_vigilance from './images/safety_vigilance.svg';
import { Link } from 'react-router-dom';
import './App.css';
import BPLAM from './images/image 21.svg';

const isMainScreen = true;
const App = (props) => {
  // Energy.js

  // Other code for Energy.js

  return (
    <div className='energy-m'>
      <div className='sub-H'>
        <div className='head1'>Home</div>
        <div className='head'>Planning & Strategy</div>
        <div className='head'>Core Operations</div>
        <div className='head'>Financial Management</div>
        <div className='head'>Supply Chain</div>
        <div className='head'>ESG</div>
        <div className='head'>Enterprise Functions</div>
      </div >
      <div className=' icons-m'>
        <Link to='/bplam' className='icon-container1-m'>
          <img className='img-class-m2' src={BPLAM} alt="primary header" onClick={props.closeSideBar} />  <p className='landing-text'>BPLAM</p>
        </Link>
        <Link to='/SafetyVigilance' className='icon-container1-m'>
          <img className='img-class-m2' src={safety_vigilance} alt="primary header" onClick={props.closeSideBar} />  <p className='landing-text'>Safety Vigilance</p>
        </Link>
        <Link to='/Retail' className='icon-container1-m'>
          <img className='img-class-m2' src={safety_vigilance} alt="primary header" onClick={props.closeSideBar} />  <p className='landing-text'>Retail</p>
        </Link>
      </div>

    </div>
  );
};

export default App;
