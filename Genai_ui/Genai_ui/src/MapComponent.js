import React, { useEffect, useRef} from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import "./Vegitation.css";

const MapComponent = ({lat,long, recommendationData, popup}) => {
  const mapContainerRef = useRef(null);
  useEffect(() => {
    mapboxgl.accessToken = 'pk.eyJ1IjoieXVzcmEwNiIsImEiOiJjbG50OHVucDYwMWRmMnFxeGU4dmlhdXNpIn0.LDoW36xI7IhbBqga4rSosw'; // Replace with your Mapbox access token
    let coordinates;

    const map = new mapboxgl.Map({
      container: mapContainerRef.current, // HTML container ID
      style: 'mapbox://styles/mapbox/satellite-v9', // satellite Map style URL
      center: recommendationData && recommendationData.data.length>0
      ?[
       recommendationData.data[0][9], //longitude
       recommendationData.data[0][8], //latitude
      ]
      : [ -75.6910, 45.4215],//Default center if no coordinates are available
      zoom: 15, // Initial zoom level
      
    });

    if(recommendationData && recommendationData.data){
      if(lat){
        coordinates = [[long, lat]];
        
      } else {
         coordinates = recommendationData.data.map(item => [item[9], item[8]]);
      }
      

      const bounds = coordinates.reduce((bounds, coord) => {
        return bounds.extend(coord);
      }, new mapboxgl.LngLatBounds(coordinates[0], coordinates[0])
      );

      //set the map's viewport to fit the bounding box
      //testing
      map.fitBounds(bounds, { padding: 50});
      
      coordinates.forEach((coordinate, index) => {
        const markerElement = document.createElement('div');
        markerElement.className = 'circle-marker';
        markerElement.style.backgroundColor = getPriorityColor(recommendationData.data[index][10]);
        
        const mapPoint = new mapboxgl.Marker({
          element:markerElement,
        })
        .setLngLat([coordinate[0], coordinate[1]])
        .addTo(map);

        //Create a popup for each point
        if(popup){
        const popup = new mapboxgl.Popup({ offset: 25, className: 'custom-popup-v'})

        
        
        .setHTML(`
           <div>
              <p>Clear Vegetation</p>
              <p> <span>${recommendationData.data[index][1]}</span>|
                  <span>${recommendationData.data[index][2]}</span>|
                  <span>${recommendationData.data[index][0]}</span>
              </p>
              
              <button style="background-color: ${getPriorityColor(recommendationData.data[index][10])} ;">
                   ${getPriorityText(recommendationData.data[index][10])}
              </button>
            </div>      

              `);

              //associate the popup with the points
              mapPoint.setPopup(popup);

              markerElement.addEventListener('mouseenter', () => {
                popup.addTo(map);
              });

              markerElement.addEventListener('mouseleave', () => {
                popup.remove();
              })
            }
            
      });
        
      

    }

      

    return () => {
      map.remove();
    };
  }, [ recommendationData, lat, long]);

  //helper function to get priority color
  const getPriorityColor = (priority) => {
    switch (priority){
      case 1:
        return '#FF3246'; //very high
      case 2:
        return '#FF50A0'; //medium
      case 3:
        return '#FF7800'; //low
      default:
        return 'blue'; //default color
    }
  };

  //help function to get priority text
  const getPriorityText = (priority) => {
    switch (priority) {
      case 1:
        return 'Very High';
      case 2:
        return 'Medium';
      case 3:
        return 'Low';
      default:
        return 'Unknown';
    }
  };

  

  return (
    <div ref={mapContainerRef} style={{ width: '100%', height: '100%' }}></div>
    
  );
};

export default MapComponent;
