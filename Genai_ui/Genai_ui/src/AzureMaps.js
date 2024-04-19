import React, { useEffect, useRef } from 'react';
import * as atlas from 'azure-maps-control';

const AzureMapsComponent = () => {
  const mapRef = useRef(null);

  useEffect(() => {
    // Create an Azure Maps map object
    const map = new atlas.Map(mapRef.current, {
      center: [72.8777, 19.0760], // Mumbai coordinates [longitude, latitude]
      zoom: 10, // Zoom level to show Mumbai city
      authOptions: {
        authType: 'subscriptionKey',
        subscriptionKey: 'm933ncgkmWwpwO6ZS_Y4Cm810U4mKguhhdOJFavZdqA', // Your Azure Maps subscription key
      },
    });

    // Add map controls
    map.controls.add([
      new atlas.control.ZoomControl(),
      new atlas.control.PitchControl(),
      new atlas.control.CompassControl(),
    ], { position: 'top-right' });

    // Cleanup when the component unmounts
    return () => {
      map.dispose();
    };
  }, []); // Empty dependency array to run the effect only once when the component mounts

  return (
    <div style={{ height: '400px' }} ref={mapRef}></div>
  );
};

export default AzureMapsComponent;
