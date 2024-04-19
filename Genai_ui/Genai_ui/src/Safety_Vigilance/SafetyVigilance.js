import React, { useState } from 'react';

import SafetyVigilance1 from './new';
import SafetyVigilanceSide from './SafetyVigilanceSide';
import "react-multi-carousel/lib/styles.css";
import 'react-multi-carousel/lib/styles.css';
import './SafetyVigilance.css';

function SafetyVigilance() {



  return (

    <div style={{ margin: "20px", width: "78vw", height: "84vh", display: "flex" }}>
      <div className='col-sm-9' style={{ display: "flex", flexDirection: "column" }}>
        <div className='row-sm-11' style={{ width: "100%", height: "100%", position: "relative" }} >
          <SafetyVigilance1 />
        </div>
        {/* <div className='row-sm-1' style={{ position: "absolute", left: "9%", top: "83%", color: "white", fontFamily: "Graphik", fontSize: "12px", lineHeight: "5px" }}>
         
          <p><b>Location:</b> AHM-GGS-Equipment Inventory Unit– Camera 0015</p>
          <p><b>Severity :</b> Moderate </p>
          <p><b>Issue :</b> Equipment Handling – Near Miss</p>
          <p><b>Description :</b> Truck driver is identified without a hard hat during material unloading and damaged the equipment due to improper handling the forklift.</p>

        </div> */}
      </div>
      <div className='col-sm-4'>
        <SafetyVigilanceSide />
      </div>
      {/* <div className="pb-3">
<Button onClick={this.changeSource('sintelTrailer')} className="mr-3">
Sintel teaser
</Button>
<Button onClick={this.changeSource('bunnyTrailer')} className="mr-3">
Bunny trailer
</Button>
<Button onClick={this.changeSource('bunnyMovie')} className="mr-3">
Bunny movie
</Button>
<Button onClick={this.changeSource('test')} className="mr-3">
Test movie
</Button>
</div> */}
    </div>
  );
}

export default SafetyVigilance