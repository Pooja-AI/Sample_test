//JsonInsightsTable
// import React, { useState } from 'react';
// import Select from 'react-select';
import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import search from '../images/search_bplam.svg';
import filters from '../images/Filter_icon.svg';


// const YourComponent = () => {
//   const [selectedOption, setSelectedOption] = useState('');
//   const [minTicketCount, setMinTicketCount] = useState(0);
//   const [maxTicketCount, setMaxTicketCount] = useState(100); // Assuming a maximum value, update as needed
//   const [rows, setRows] = useState([
//     { id: 1, tickets: 5, /* other row data */ },
//     { id: 2, tickets: 10, /* other row data */ },
//     // ... other rows
//   ]);
//   const [selectedRows, setSelectedRows] = useState([]);

//   useEffect(() => {
//     // Sort rows based on tickets in descending order
//     const sortedRows = [...rows].sort((a, b) => b.tickets - a.tickets);
//     setRows(sortedRows);
//   }, [minTicketCount, rows]);

//   const handleSliderChange = (event) => {
//     const value = parseInt(event.target.value);
//     setMinTicketCount(value);

//     // Update selected rows based on the slider value
//     const selectedRows = rows.slice(0, value);
//     setSelectedRows(selectedRows);
//   };

//   return (
//     <div>
//       {['Option 2', 'Option 3'].includes(selectedOption) && (
//         <div style={{ marginTop: '8px', display: 'flex', flexDirection: 'column', fontSize: '12px', textAlign: 'left', marginLeft: '8px' }}>
//           <input
//             type='range'
//             min={0}
//             max={maxTicketCount}
//             value={minTicketCount}
//             onChange={handleSliderChange}
//             style={{ width: '100%' }}
//           />
//         </div>
//       )}

//       {/* Render your table using selectedRows */}
//       <table>
//         <thead>
//           {/* your table header */}
//         </thead>
//         <tbody>
//           {selectedRows.map(row => (
//             <tr key={row.id}>
//               {/* render your table cells */}
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };


const JSONTable = ({ jsonData }) => {

  const [selectedFilters, setSelectedFilters] = useState({
    BPL1: [],
    BPL2: [],
    BPL3: [],
    Tool: [],
  });
  const columnHeaderMap = {
    'BPL1': 'Business Process Level 1',
    'BPL2': 'Business Process Level 2',
    'BPL3': 'Business Process Level 3',
    'Tool': 'Application Name',
    'Ticket Count':"Ticket Count",
    'Key Issues Identified':'Key Issues Identified',
    "Business Impact":"Business Impact",
    "Recommendations":"Recommendations"
    // Add more mappings as needed
  };
  const [showOptions, setShowOptions] = useState(false);
  // const [selectedOption, setSelectedOption] = useState('');
  const [selectedOption, setSelectedOption] = useState('');
  // const [minTicketCount, setMinTicketCount] = useState(0);
  // const [maxTicketCount, setMaxTicketCount] = useState(100);
  const [minTicketCount, setMinTicketCount] = useState(0);
  const [maxTicketCount, setMaxTicketCount] = useState();
  const [selectedRows, setSelectedRows] = useState([]);
  const [rows, setRows] = useState([]);

  const customStyles = {
    control: (provided, state) => ({
      ...provided,
      border: '1px solid #AD8BFF',
      borderRadius: '50px',
      fontSize: '12px',
      fontFamily: 'Graphik',
      color: '#AD8BFF',
      backgroundColor: 'rgba(255,255,255,0.1)',
      minHeight:'28px',
      marginLeft:'5px',
      // width:'100px',
      height: '8px',
      '::placeholder': {
        color: '#AD8BFF',
        fontWeight: 'bold',
      },
      '::value':{
        color:'black',
      },
      '.css-1xc3v61-indicatorContainer':{
          padding:'0px 5px',
      },
      '.css-tj5bde-Svg':{
        width:'15px',
      }, 
      boxShadow: state.isFocused ? '0 0 0 1px #ddd' : 'none',
    }),
    // indicatorContainer:(provider)=>({
    //   padding:'2px',
    // }),
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

    if (selectedOptions.some((option) => option.value === 'option2' || option.value === 'option3')) {
      const { data } = JSON.parse(jsonData.impact_analysis_df);
      // const ticketCounts = data.map((row) => row[data[0].indexOf('Ticket Count')]);

      // setMinTicketCount(Math.min(...ticketCounts));
      // setMaxTicketCount(Math.max(...ticketCounts));
    }
  };

  const cleanValue = (value, columnName) => {
    // ... your existing cleanValue logic
    
    if (Array.isArray(value)) {
      return value.map((item) => item.replace(/^\[|\]$/g, ''));
    } else if (typeof value === 'string') {
      const brokenValues = value.replace(/^\[|\]$/g, '').split(',').map((substring) => substring.trim());

      if ((columnName === 'Recommendations' || columnName === 'Business Impact' || columnName === 'Key Issues Identified') && brokenValues.length > 1) {
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

  const { columns, data } = JSON.parse(jsonData.impact_analysis_df);

  const getFilterOptions = (columnName) => {
    const columnIndex = columns.indexOf(columnName);
    if (columnIndex === -1) return [];

    return Array.isArray(data[0][columnIndex])
      ? data[0][columnIndex].map((value) => ({ label: value, value }))
      : data.map((row) => ({ label: row[columnIndex], value: row[columnIndex] }));
  };

  // const handleOptionChange = (option) => {
  //   setSelectedOption(option);
  // };

  // const handleOptionChange = (option) => {
  //   setSelectedOption(option);

  //   // Reset the min and max ticket counts when switching options
  //   setMinTicketCount(0);
  //   setMaxTicketCount(100);

  //   if (option === 'Option 2' || option === 'Option 3') {
  //     const { data } = JSON.parse(jsonData.impact_df);
  //     const ticketCounts = data.map((row) => row[data[0].indexOf('Ticket Count')]);

  //     setMinTicketCount(Math.min(...ticketCounts));
  //     setMaxTicketCount(Math.max(...ticketCounts));
  //   }
  // };

  const handleOptionChange = (option) => {
    setSelectedOption(option);
  
    if (option === 'Option 2' || option === 'Option 3') {
      const ticketCounts = data.map((row) => row[data[0].indexOf('Ticket Count')]);
      setMinTicketCount(Math.min(...ticketCounts));
      setMaxTicketCount(Math.max(...ticketCounts));
    }
  };
  

  const handleCancelUpdate = () => {
    setShowOptions(false);
    setSelectedOption('');
  };

  const handleSearchBarClick = () => {
    setShowOptions(!showOptions);
  };

  const handleSliderChange = (event) => {
    // Update the min or max ticket count based on the slider value
    // You can customize this logic as needed
    // const value = parseInt(event.target.value);
    // // For example, update the min ticket count
    // setMinTicketCount(value);

    const value = parseInt(event.target.value);
    setMinTicketCount(value);

    // Update selected rows based on the slider value
    const updatedRows = rows.slice(0, value);
    setSelectedRows(updatedRows);
  };
  useEffect(() => {
    // Load initial rows and set them as selected
    const { columns, data } = JSON.parse(jsonData.impact_analysis_df);
    const initialRows = data.map((rowData, index) => {
      const rowObject = {};
      columns.forEach((column, columnIndex) => {
        rowObject[column] = cleanValue(rowData[columnIndex], column);
      });
      // rowObject.id = index + 1; // You may adjust the ID as needed
      return rowObject;
    });

    setRows(initialRows);
    setSelectedRows(initialRows);
  }, [jsonData]);

  return (
    <div>
      <div className='bplam-insight-filter'>
        <p className='b-i-f-header'>Filter By   |   </p>
        <div className='bplam-insight-filter-cont'>
          {['BPL1', 'BPL2', 'BPL3', 'Tool'].map((column, index) => (
            <div key={index} style={{ marginBottom: '10px' }}>
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

        <div className='search-insight-bplam' style={{ display: 'flex', flexDirection: 'column' }}>
          
          <div
            className='search-bar'
            style={{
              display: 'flex',
              flexDirection: 'row',
              padding: '8px',
              marginTop: '1px',
              marginLeft: '320px',
              marginRight: '8px',
              backgroundColor: 'rgba(255,255,255,0.1)',
              border: '1px solid #747BA9',
              borderRadius: '10px',
              width: '220px',
              height: '30px',
            }}
            onClick={handleSearchBarClick}
          >
            <input
              type='text'
              placeholder='Type here to search...'
              style={{
                height: '20px',
                backgroundColor: 'rgba(255,255,255,0.0)',
                border: '1px solid rgba(255,255,255,0.0)',
                width: '180px',
                marginTop: '-4px',
                fontFamily: 'Graphik',
                fontSize: '12px',
                color: '#AD8BFF', // Added color to placeholder
              }}
            />
            <span style={{ cursor: 'pointer', marginLeft: '8px' }}>
              <img src={search} alt='Search Icon' style={{ width: '20px', height: '20px', marginTop: '-12px' }} />
            </span>
          </div>

          {showOptions && (
            <div className='bplam-search-info' style={{ marginLeft: '300px', padding: '5px', backgroundColor: '#FFFFFF', width: '220px', border: '1px solid #FFFFFF', borderRadius: '10px', display: 'flex', flexDirection: 'column' }}>
              <div style={{ marginTop: '8px', display: 'flex', flexDirection: 'column', fontSize: '12px', textAlign: 'left', marginLeft: '8px'}}>
                <label style={{color:'black' }}>
                  <input
                    type='radio'
                    name='options'
                    value='Option 1'
                    checked={selectedOption === 'Option 1'}
                    onChange={() => handleOptionChange('Option 1')}
                  />
                  All Applications
                </label>
                <label style={{color:'black' }}>
                  <input
                    type='radio'
                    name='options'
                    value='Option 2'
                    checked={selectedOption === 'Option 2'}
                    onChange={() => handleOptionChange('Option 2')}
                  />
                  Overall Noisy Applications
                </label>
                <label style={{color:'black' }}>
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
              {/* {['Option 2', 'Option 3'].includes(selectedOption) && (
              <div style={{ marginTop: '8px', display: 'flex', flexDirection: 'column', fontSize: '12px', textAlign: 'left', marginLeft: '8px' }}>
                <label>Min Ticket Count: {minTicketCount}</label>
                <label>Max Ticket Count: {maxTicketCount}</label>
                <input
                  type='range'
                  min={minTicketCount}
                  max={maxTicketCount}
                  value={minTicketCount}
                  onChange={handleSliderChange}
                  style={{ width: '100%' }}
                />
              </div>
              )} */}
              {['Option 2', 'Option 3'].includes(selectedOption) && (
                <div style={{ marginTop: '8px', display: 'flex', flexDirection: 'column', fontSize: '12px', textAlign: 'left', marginLeft: '8px' }}>
                 <div className='slider-bplam' style={{display:'flex',flexDirection:'row',fontSize:'9px'}}>
                  <label>App Count: {minTicketCount}</label>
                  <label className='max-tic-bplam' style={{marginLeft:'120px'}}>100</label></div>
                  <input
                    type='range'
                    // min={minTicketCount}
                    // max={maxTicketCount}
                    // value={minTicketCount}
                    min={0}
                    max={100}
                    value={minTicketCount}
                    //onChange={handleSliderChange}
                    onChange={handleSliderChange}
                    style={{ width: '100%' }}
                  />
                </div>
                // <YourComponent />
              )}

              <div style={{ marginTop: '8px', backgroundColor: 'rgba(107,92,209,0.3)', width: '105%', height: '105%', marginLeft: '-5px' }}>
                <button onClick={handleCancelUpdate} style={{ marginRight: '8px', width: '35%', border: '1px solid #AD8BFF', borderRadius: '50px', fontSize: '13px', fontFamily: 'Graphik', backgroundColor: '#FFFFFF' ,color:'black'}}>
                  Cancel
                </button>
                <button onClick={handleCancelUpdate} style={{ marginLeft: '8px', width: '35%', border: '1px solid #AD8BFF', borderRadius: '50px', fontSize: '13px', fontFamily: 'Graphik', backgroundColor: '#6B5CD1', color: '#FFFFFF' }}>Update</button>
              </div>
            </div>
          )}
        </div>
        <div className='filter-image'>
        <img className='img-filters' src={filters}/>
        </div>
      </div>

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
            {Object.keys(rows[0] || {}).map((column, index) => (
              <th key={index} style={{
                border: '1px solid #ddd',
                padding: '8px',
                color: 'white',
                backgroundColor: '#6B5CD1',
              }}>
                {column}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
        {selectedRows.map(row => (
            <tr key={row.id}>
              {Object.keys(row).map((column, index) => (
                <td key={index} style={{ border: '1px solid #ddd', padding: '8px', color: 'white' }}>
                  {row[column]}
                </td>
                ))}
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
            }) 
            // && (
            //   <tr
            //     key={rowIndex}
            //     style={{
            //       background:
            //       // 'linear-gradient(to right, #03D9FF, #6A59FF)',
            //         'rgba(255,255,255,0.0)',
            //     }}
            //   >
            //     {columns.map((column, columnIndex) => (
            //       <td key={columnIndex} style={{ border: '1px solid #ddd', padding: '8px', color: 'white' }}>
            //         {cleanValue(rowData[columnIndex], column)}
            //       </td>
            //     ))}
            //   </tr>
            // )
          ))}
        
        </tr>
          ))}
          </tbody>
      </table>
    </div>
  );
};

export default JSONTable;






