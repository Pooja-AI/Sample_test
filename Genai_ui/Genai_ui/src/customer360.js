import React from 'react';
import Iframe from 'react-iframe'; // if you are using react-iframe
import './App.css';

const App = () => {
    return (
      <div className='sale'>
      
        <Iframe
          url="https://ercs-myc-accenture-com.launchpad.cfapps.eu10.hana.ondemand.com/42b5187a-77ea-4783-807b-00bb39c84201.zintel_cust_360_app.cust360zcustgas-0.0.1/index.html" // Replace with your external app's link
          width="1200px"
          height="620px" // Set the height as needed
          id="my-iframe"
          display="initial"
          position="relative"
         
        />
      </div>
    );
  }
  
  export default App;
  