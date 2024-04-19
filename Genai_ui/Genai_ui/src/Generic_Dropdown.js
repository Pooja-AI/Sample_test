import React, { useState, useEffect } from 'react';
import './Scrm.css';



const GenericDropdown = ({ apiUrl, label, onChange}) => {
  const [options, setOptions] = useState([]);
  const [selectedOption, setSelectedOption] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(apiUrl);

        const data = await response.json();

        // Assuming the data structure has a key for options
        const fetchedOptions = data.response[label] || [];
        setOptions(fetchedOptions);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [apiUrl]);

  const handleDropdownChange = (event) => {
    const selectedValue = event.target.value;
    setSelectedOption(selectedValue);

    // Call the onChange handler with the selected value
    if (onChange) {
      onChange(selectedValue);
    }
  };

  return (
    <>
    <select
        id="genericDropdown"
        value={selectedOption}
        className='recommendation-type-dropdown scrm-dropdown'
        onChange={handleDropdownChange}
      >
        <option value="">Select {label}</option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
      {/* {selectedOption && (
        <p>Selected {label}: {selectedOption}</p>
      )} */}
     </>
  );
   
      
};

export default GenericDropdown;
