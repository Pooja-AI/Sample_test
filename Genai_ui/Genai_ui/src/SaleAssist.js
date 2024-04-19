import React from 'react';
import Iframe from 'react-iframe'; // if you are using react-iframe
import './App.css';

const App = () => {
    return (
      <div className='sale'>
      
        <Iframe
          url="https://xzwkygsn15fzy79l.launchpad.cfapps.eu10.hana.ondemand.com/ag27357.ag27357/index.html?BP=6000117&BPName=Robert%20Hurley" // Replace with your external app's link
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
  