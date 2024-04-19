
import React, { useState } from 'react';
import Select from 'react-select';
import search from '../images/search_bplam.svg';

const JSONTable = ({ jsonData }) => {
  const [selectedFilters, setSelectedFilters] = useState({
    BPL1: [],
    BPL2: [],
    BPL3: [],
    Tool: [],
  });
  // const [showDropdown, setShowDropdown] = useState(false);
  const [showOptions, setShowOptions] = useState(false);
  const [selectedOption, setSelectedOption] = useState('');
  const customStyles = {
    control: (provided, state) => ({
      ...provided,
      border: '2px solid #AD8BFF',
      borderRadius: '50px',
      fontSize:'12px',
      fontFamily:'Graphik',
      color:'#AD8BFF',
      backgroundColor:'rgba(255,255,255,0.1)',
      height:'10px',
      '::placeholder': {
        color: '#AD8BFF', // Replace with your desired color value
        fontWeight:'bold',
      },
      boxShadow: state.isFocused ? '0 0 0 1px #ddd' : 'none',
    }),
    menu: (provided) => ({
      ...provided,
      borderRadius: '4px',
    }),
    multiValue: (provided) => ({
      ...provided,
      backgroundColor: '#3498db',
      color: 'white',
    }),
    multiValueLabel: (provided) => ({
      ...provided,
      color: 'white',
    }),
    multiValueRemove: (provided) => ({
      ...provided,
      color: 'white',
      ':hover': {
        backgroundColor: '#2980b9',
      },
    }),
  };
  const handleFilterChange = (columnName, selectedOptions) => {
    setSelectedFilters((prevFilters) => ({
      ...prevFilters,
      [columnName]: selectedOptions,
    }));
  };

  const cleanValue = (value, columnName) => {
    if (Array.isArray(value)) {
      return value.map((item) => item.replace(/^\[|\]$/g, ''));
    } else if (typeof value === 'string') {
      const brokenValues = value.replace(/^\[|\]$/g, '').split(',').map((substring) => substring.trim());

      if ((columnName === 'Recommendations' || columnName === 'Business Impact') && brokenValues.length > 1) {
        return brokenValues.map((brokenPart, index) => (
          <React.Fragment key={index}>
            {index > 0 && <br />}
            &#8226; {brokenPart}
          </React.Fragment>
        ));
      } else {
        return brokenValues;
      }
    } else if (typeof value === 'number') {
      // Convert number to string for consistency with other types
      return [value.toString()];
    }
    return [];
  };

  const { columns, data } = JSON.parse(jsonData.impact_df);

  const getFilterOptions = (columnName) => {
    const columnIndex = columns.indexOf(columnName);
    if (columnIndex === -1) return [];

    return Array.isArray(data[0][columnIndex])
      ? data[0][columnIndex].map((value) => ({ label: value, value }))
      : data.map((row) => ({ label: row[columnIndex], value: row[columnIndex] }));
  };


  const dropdownOptions = [
    { value: 'option1', label: 'Option 1' },
    { value: 'option2', label: 'Option 2' },
    { value: 'option3', label: 'Option 3' },
  ];

  // const handleDropdownChange = (selectedOption) => {
  //   // Handle dropdown change here
  //   console.log('Selected Option:', selectedOption);
  // };

  // const handleCancelUpdate = () => {
  //   // Handle cancel/update button click here
  //   setShowDropdown(false);
  // };

  const handleOptionChange = (option) => {
    setSelectedOption(option);
  };

  const handleCancelUpdate = () => {
    setShowOptions(false);
    setSelectedOption('');
  };

  const handleSearchBarClick = () => {
    setShowOptions(!showOptions);
  };


  return (
    <div>
      {/* Filter Dropdowns */}
      <div className='bplam-insight-filter'>
        <p className='b-i-f-header'>Filter By   |   </p>
        <div className='bplam-insight-filter-cont'>
        {['BPL1', 'BPL2', 'BPL3', 'Tool'].map((column, index) => (
          <div key={index} style={{ marginBottom: '10px' }}>
            {/* <label className='bplam-insight-filter-label'>{column}</label> */}
            <Select
            className='bplam-insight-filter-sel'
            placeholder={column} 
              isMulti
              options={getFilterOptions(column)}
              value={selectedFilters[column]}
              onChange={(selectedOptions) => handleFilterChange(column, selectedOptions)}
              styles={customStyles} 
            />
          </div>
        ))}
        </div>

          <div className='search-insight-bplam' style={{display:'flex',flexDirection:'column'}}>
          <div className='search-bar' style={{
                display:'flex',
                flexDirection:'row',
                padding: '8px',
                marginTop:'1px',
                marginLeft:'300px',
                marginRight: '8px',
                backgroundColor:'rgba(255,255,255,0.1)',
                border:'1px solid #747BA9',
                borderRadius: '10px',
                width: '220px',
                height:'30px',
              }}
              // onClick={() => setShowDropdown(!showDropdown)}
              onClick={handleSearchBarClick}
          >
            <input
              type='text'
              placeholder='Type here to search...'
              style={{
                height:'20px',          
                backgroundColor:'rgba(255,255,255,0.0)',
                border:'1px solid rgba(255,255,255,0.0)',
                width: '180px',
                marginTop:'-4px',
                fontFamily:'Graphik',
                fontSize:'12px',
              }}
            />
            <span style={{ cursor: 'pointer', marginLeft: '8px' }}>
              <img
                src={search}
                alt='Search Icon'
                style={{ width: '20px', height: '20px', marginTop:'-12px'}}
              />
            </span>
          </div>
          {/* Dropdown */}
          
          {showOptions && (
            <div className='bplam-search-info' style={{marginLeft:'300px',padding:'5px',backgroundColor:'#FFFFFF',width:'220px',border:'1px solid #FFFFFF',borderRadius:'10px',display:'flex',flexDirection:'column'}}>
                      
            <div style={{ marginTop: '8px',display:'flex',flexDirection:'column' , fontSize:'12px',textAlign:'left',marginLeft:'8px'}}>
              <label>
                <input
                  type='radio'
                  name='options'
                  value='Option 1'
                  checked={selectedOption === 'Option 1'}
                  onChange={() => handleOptionChange('Option 1')}
                />
                All Applications
              </label>
              <label>
                <input
                  type='radio'
                  name='options'
                  value='Option 2'
                  checked={selectedOption === 'Option 2'}
                  onChange={() => handleOptionChange('Option 2')}
                />
                Overall Noisy Applications
              </label>
              <label>
                <input
                  type='radio'
                  name='options'
                  value='Option 3'
                  checked={selectedOption === 'Option 3'}
                  onChange={() => handleOptionChange('Option 3')}
                />
                Noisy Applications per Level
              </label>
            </div>
          {/* Cancel/Update Button */}
          
            <div style={{ marginTop: '8px' ,backgroundColor:'rgba(107,92,209,0.3)', width:'105%',height:'105%',marginLeft:'-5px'}}>
              <button onClick={handleCancelUpdate} style={{ marginRight: '8px' ,width:'35%',border:'1px solid #AD8BFF',borderRadius:'50px', fontSize:'13px', fontFamily:'Graphik',backgroundColor:'#FFFFFF'}}>
                Cancel
              </button>
              <button onClick={handleCancelUpdate} style={{ marginLeft: '8px' ,width:'35%',border:'1px solid #AD8BFF',borderRadius:'50px', fontSize:'13px', fontFamily:'Graphik',backgroundColor:'#6B5CD1',color:'#FFFFFF'}}>Update</button>
            </div>
          
            </div>
          )}
         
        
        </div>
      </div>
      {/* Table */}
      <table
        style={{
          width: '98%',
          borderCollapse: 'collapse',
          marginTop: '20px',
          marginLeft: '15px',
          marginBottom: '10px',
        }}
      >
        <thead>
          <tr>
            {columns.map((column, index) => (
              <th key={index} style={{ 
                border: '1px solid #ddd', 
                padding: '8px', 
                color:'white',
                backgroundColor:'#6B5CD1'
                // background: '#f2f2f2' 
              }}>
                {column}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((rowData, rowIndex) => (
            ['BPL1', 'BPL2', 'BPL3', 'Tool'].every((columnName) => {
              const selectedOptions = selectedFilters[columnName];
              if (selectedOptions.length === 0) {
                return true; // No filter selected for this column, always pass
              }

              const cellValue = rowData[columns.indexOf(columnName)];
              if (Array.isArray(cellValue)) {
                return selectedOptions.every((option) => cellValue.includes(option.value));
              } else if (typeof cellValue === 'string') {
                return selectedOptions.some((option) => option.value === cellValue);
              }

              return false;
            }) && (
              <tr
                key={rowIndex}
                style={{
                  background:
                    rowIndex % 2 === 0
                      ? 'linear-gradient(to right, #bdc3c7, #2c3e50)'
                      : 'linear-gradient(to right, #2c3e50, #bdc3c7)',
                }}
              >
                {columns.map((column, columnIndex) => (
                  <td key={columnIndex} style={{ border: '1px solid #ddd', padding: '8px', color: 'white' }}>
                    {cleanValue(rowData[columnIndex], column)}
                  </td>
                ))}
              </tr>
            )
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default JSONTable;





