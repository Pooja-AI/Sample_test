import React, { props } from 'react';
import drilling from './images/drilling.svg';
import scrm from './images/scrm.svg';
import corrosion from './images/corrosion.svg';
import asset from './images/asset.svg';
import sustain from './images/sustainability.svg';
import RefineryInspection from './images/RefineryInspection.svg';
import scm from './images/scm.svg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLeaf, faChartBar, faSearch, faTools, faTruckMoving } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom'; // Import Link from React Router
import './App.css';
import optimboard from './images/optim-board.svg';

const App = (props) => {
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
      <div className='icons-m'>

        <Link to='/CorrosionPage' className='icon-container-m' onClick={props.closeSideBar}>
          <img className='img-class-m' src={corrosion} alt="primary header" /> <p className='landing-text'>Corrosion Detection</p>
        </Link>
        <Link to='/Sustainability' className='icon-container-m' onClick={props.closeSideBar}>
          <img className='img-class-m' src={sustain} alt="primary header" /><p className='landing-text'> Sustainability Benchmarking</p>
        </Link>
        <Link to='/Apm' className='icon-container-m' onClick={props.closeSideBar}>
          <img className='img-class-m' src={asset} alt="primary header" /> <p className='landing-text'>Asset Performance Management</p>
        </Link>
        <Link to='/OsduSearch' className='icon-container-m' onClick={props.closeSideBar}>
          <img className='img-class-m' src={scm} alt="primary header" /> <p className='landing-text'>OSDU Search Assistant</p>
        </Link>

      </div>
      <div className=' icons-m'>
      <Link to='/Scrm' className='icon-container1-m'>
        <img className='img-class-m' src={scrm} alt="primary header"  onClick={props.closeSideBar}/>  <p className='landing-text-drill'>Supply Chain Risk Management</p>
      </Link>
      <Link to='/Drilling' className='icon-container1-m'>
        <img className='img-class-m' src={drilling} alt="primary header"  onClick={props.closeSideBar}/>  <p className='landing-text-drill'>Drilling Operations Assistant</p>
      </Link>
      <Link to='/Optimization' className='icon-container1-m'>
        <img className='img-class-m' src={optimboard} alt="primary header"  onClick={props.closeSideBar}/>  <p className='landing-text-drill'>OptiGenius</p>
      </Link>
      <Link to='http://20.238.177.62/' className='icon-container1-m'>
        <img className='img-class-m' src={RefineryInspection} alt="primary header"  onClick={props.closeSideBar}/>  <p className='landing-text-drill'>Refinery Inspection Assistance</p>
      </Link>
      </div>

    </div>
  );
};

export default App;
