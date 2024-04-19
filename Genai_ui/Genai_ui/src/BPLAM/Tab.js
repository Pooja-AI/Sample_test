// Tab.js
import React from 'react';

const Tab = ({ tabIndex, jsonData }) => {
  return (
    <div>
      {/* Add your content here */}
      <h2>Tab {tabIndex}</h2>
      {jsonData && (
        <div>
          <p>Total Apps: {jsonData.response.total_apps}</p>
          <p>Total Tickets: {jsonData.response.total_tickets}</p>
          <p>Date Range: {jsonData.response.date_range.start} - {jsonData.response.date_range.end}</p>
          {/* Display other relevant information from the JSON data */}
        </div>
      )}
    </div>
  );
};

export default Tab;
