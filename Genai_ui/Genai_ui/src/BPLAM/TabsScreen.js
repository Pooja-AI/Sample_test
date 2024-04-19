// TabsScreen.js

import React from 'react';
import { Link } from 'react-router-dom';
import Tabs from './Tabs';


const TabsScreen = () => {
  
  // const jsonResponse = location.state && location.state.jsonResponse;
  console.log("tabscreen.js");
   
  // useEffect(() => {
  //   console.log("tabscreen.js")
  //   console.log(jsonResponse)
  //   // You can do something with jsonResponse when it changes
  // }, [jsonResponse]);
  

  return (
    <div>      
      <Tabs />
      {/* Your content for the new screen goes here */}
    </div>
  );
};

export default TabsScreen;
