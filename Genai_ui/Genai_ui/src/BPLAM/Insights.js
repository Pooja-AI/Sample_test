import React, { useState, useEffect, useRef } from 'react';
import Select from 'react-select';
import search from '../images/search_bplam.svg';
import filters from '../images/Filter_icon.svg';
// import cancel from '../images/cancelRevert.png';
import cancel from '../images/cancel_insight.svg';
import apply from '../images/Apply.svg';
import lines from '../images/insights_before_pages_line.svg';
import Toast from 'react-bootstrap/Toast';
import ToastContainer from 'react-bootstrap/ToastContainer';
import leftarrow from '../images/keyboard_arrow_right.png';
import rightarrow from '../images/keyboard_arrow_right2.svg';


const YourComponent = ({ jsonData2 }) => {
  // State variable in ComponentB
  // const [sharedVariable, setSharedVariable] = jsonData2;


  const fetchData = async () => {
    try {
      // Replace this with your actual data fetching logic
      const jsonData = jsonData2;

      const parsedData = JSON.parse(jsonData.impact_analysis_df);

      const columns = parsedData.columns;
      const data = parsedData.data;

      const tableDataArray = data.map((row) => {
        const rowData = {};
        // columns.forEach((column, columnIndex) => {
        //   if (["Business Impact", "Key Issues Identified", "Recommendations"].includes(column)) {
        //     const jsonString = row[columnIndex].replace(/'/g, '"');
        //     try {
        //       const jsonArr = JSON.parse(jsonString).slice(0, 5);
        //       const formattedValue = (
        //         <ul style={{ listStyleType: 'disc', margin: 0, paddingLeft: '1.5em' }}>
        //           {jsonArr.map((item, index) => (
        //             <li key={index}>{item}</li>
        //           ))}
        //         </ul>
        //       );
        //       rowData[column] = formattedValue;
        //     } catch (error) {
        //       console.error(`Error parsing JSON for column ${column}:`, error);
        //       rowData[column] = '';
        //     }
        //   } else {
        //     rowData[column] = row[columnIndex];
        //   }
        // });
        columns.forEach((column, columnIndex) => {
          if (["Key Issues Identified"].includes(column)) {
            const jsonString = row[columnIndex].replace(/'/g, '"');
            try {
              const jsonArr = JSON.parse(jsonString).slice(0, 5);
              const formattedValue = (
                <ul style={{ listStyleType: 'disc', margin: 0, paddingLeft: '1.5em' }}>
                  {jsonArr.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              );
              rowData[column] = formattedValue;
            } catch (error) {
              console.error(`Error parsing JSON for column ${column}:`, error);
              rowData[column] = '';
            }
          } else if (["Business Impact", "Recommendations"].includes(column)) {
            const values = row[columnIndex].split(',').map(value => value.trim()).slice(0, 5);
            const formattedValue = (
              <ul style={{ listStyleType: 'disc', margin: 0, paddingLeft: '1.5em' }}>
                {values.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            );
            rowData[column] = formattedValue;
          } else {
            rowData[column] = row[columnIndex];
          }
        });
        
        return rowData;
      });

      return tableDataArray;
    } catch (error) {
      console.error('Error fetching or parsing data:', error);
      // Handle error state or display a message to the user
      return [];
    }
  };

  const MyTableComponent = () => {
    const [tableData, setTableData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [showFilterOptions, setShowFilterOptions] = useState(false);
    const [filterOption, setFilterOption] = useState(1);
    const [sliderValue, setSliderValue] = useState(0);
    const [columnFilters, setColumnFilters] = useState({
      BPL1: [],
      BPL2: [],
      BPL3: [],
      Tool: [],
    });

    const [showFilterForm, setShowFilterForm] = useState(true); // Initially show the filter form
    const [rowsPerPage] = useState(10);
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState([]); // Added missing state
    const [currentSearchIndex, setCurrentSearchIndex] = useState(0); // Added missing state
    const searchInputRef = useRef(null);
    const columnHeaderMap = {
      'BPL1': 'Business Process Level 1',
      'BPL2': 'Business Process Level 2',
      'BPL3': 'Business Process Level 3',
      'Tool': 'Application Name',
      'Ticket Count': "Ticket Count",
      'Key Issues Identified': 'Key Issues Identified',
      "Business Impact": "Business Impact",
      "Recommendations": "Recommendations"
      // Add more mappings as needed
    };
    const columnHeaderMap2 = {
      'BPL1': 'Level 1',
      'BPL2': 'Level 2',
      'BPL3': 'Level 3',
      'Tool': 'App Name',
      // Add more mappings as needed
    };
    const customStyles = {
      control: (provided, state) => ({
        ...provided,
        border: '1px solid #AD8BFF',
        borderRadius: '50px',
        fontSize: '12px',
        fontFamily: 'Graphik',
        color: '#AD8BFF',
        backgroundColor: 'rgba(255,255,255,0.1)',
        minHeight: '28px',
        marginLeft: '5px',
        // width:'100px',
        height: '8px',
        '::placeholder': {
          color: '#AD8BFF',
          fontWeight: 'bold',
        },
        '::options': {
          fontSize: '10px',
        },
        '::value': {
          color: 'black',
          fontSize: '10px',
        },
        '.css-1xc3v61-indicatorContainer': {
          padding: '0px 5px',
        },
        '.css-tj5bde-Svg': {
          width: '15px',
        },
        '.css-jwx7oq-MultiValueGeneric': {
          fontSize: '8px',
        },
        '.css-1jqq78o-placeholder': {
          color: '#FFFFFF',
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
      option: (provided, state) => ({
        ...provided,
        fontSize: '10px', // Adjust the font size as needed
        height: 'fit-content',
        color: "black"
      }),
    };

    useEffect(() => {
      fetchData().then((data) => setTableData(data));
    }, []);
    // useEffect(() => {
    //   // Call fetchData and pass jsonData as a parameter
    //   fetchData(jsonData).then((data) => setTableData(data));
    // }, [jsonData]); // Update when jsonData changes

    const totalPages = Math.ceil(tableData.length / rowsPerPage);
    const startIndex = (currentPage - 1) * rowsPerPage;
    const endIndex = startIndex + rowsPerPage;
    const currentRows = tableData.slice(startIndex, endIndex);

    const handlePageChange = (newPage) => {
      setCurrentPage(newPage);
    };

    const handleFilterButtonClick = () => {
      setShowFilterOptions(!showFilterOptions);
    };

    const breakLabel = (label) => {
        const words = label.split(" ");
        if (words.length > 3) {
          const halfIndex = Math.ceil(words.length / 2);
          const firstLine = words.slice(0, halfIndex).join(" ");
          const secondLine = words.slice(halfIndex).join(" ");
          return [firstLine,<br></br> ,secondLine];
        }
        return [label];
      };

    const handleUpdateFilter = async () => {
      let filteredData = tableData;
      const data = await fetchData();
      // Apply radio button filters
      if (filterOption === 1) {
        // filteredData = filteredData.slice(0, sliderValue);
        filteredData = data;
      }
      else if (filterOption === 2) {
        // filteredData = filteredData.slice(0, sliderValue);
        // handleCancelFilter();
        filteredData = data.slice(0, sliderValue);

      }
      else if (filterOption === 3) {
        filteredData = filteredData.slice(0, sliderValue);
      }

      setTableData(filteredData);

      // Hide the filter form after update
      setShowFilterOptions(false);
    };

    const handleCancelFilter = async () => {
      const data = await fetchData();
      setTableData(data);

      // Hide the filter form after cancel
      setShowFilterOptions(false);
    };

    const handleColumnFilterChange = (column, selectedOptions) => {
      const values = selectedOptions.map((option) => option.value);
      setColumnFilters({ ...columnFilters, [column]: values });
    };

    const columnFilterOptions = (columnName) => {
      return Array.from(
        new Set(tableData.map((row) => String(row[columnName])))
      ).map((value) => ({ value, label: String(value) }));
    };
    const [showA, setShowA] = useState(false);
    const toggleShowA = () => setShowA(!showA);
    const toggleclose = () => setShowA(false);
    const handleApplyColumnFilters = () => {
      // Apply column filters
      let filteredData = [...tableData];

      Object.keys(columnFilters).forEach((column) => {
        const selectedValues = columnFilters[column];
        if (selectedValues.length > 0) {
          filteredData = filteredData.filter((row) =>
            selectedValues.includes(row[column])
          );
        }
      });

      setTableData(filteredData);
    };

    // const handleSearch = () => {
    //   if (searchTerm.trim() === '') {
    //     setSearchResults([]);
    //     setCurrentSearchIndex(0);
    //     setCurrentPage(1);
    //     return;
    //   }

    //   const lowerCaseSearchTerm = searchTerm.toLowerCase();
    //   const matchedRows = tableData.filter((row) =>
    //     Object.values(row).some(
    //       (value) =>
    //         typeof value === 'string' &&
    //         value.toLowerCase().includes(lowerCaseSearchTerm)
    //     )
    //   );

    //   if (matchedRows.length > 0) {
    //     setSearchResults(matchedRows);
    //     setCurrentPage(1);
    //   } else {
    //     setSearchResults([]);
    //     setCurrentPage(1);
    //   }
    // };

    const handleSearch = e => {
      setSearchTerm(e.target.value)
      const value2 = e.target.value;
      if (value2.trim() === '') {
        setSearchResults([]);
        setCurrentSearchIndex(0);
        setCurrentPage(1);
        return;
      }

      const lowerCaseSearchTerm = value2.toLowerCase();
      const matchedRows = tableData.filter((row) =>
        Object.values(row).some(
          (value) =>
            typeof value === 'string' &&
            value.toLowerCase().includes(lowerCaseSearchTerm)
        )
      );

      if (matchedRows.length > 0) {
        setSearchResults(matchedRows);
        setCurrentPage(1);
      } else {
        setSearchResults([]);
        setCurrentPage(1);
      }
    };

    return (
      <div>
        {/* Column Filter Form */}
        <div className='all-filter-container-insights-bplam' style={{ paddingBottom: '0px' }}>
          <div><p className='b-i-f-header'>Filter By</p></div>
          <div className='column-filter-container-insights-bplam' style={{ position: 'relative', marginTop: '10px', marginLeft: '10px', display: 'flex', flexDirection: 'row' }}>
            {Object.keys(columnFilters).map((column) => (
              <div className='column-dropdown-filter-insights-bplam' key={column} style={{ width: '120px', height: '30px' }}>
                {/* <label>{columnHeaderMap2[column] || column}</label> */}
                <Select
                  className='bplam-insight-filter-sel'
                  placeholder={columnHeaderMap2[column] || column}
                  isMulti
                  options={columnFilterOptions(column)}
                  onChange={(selectedOptions) =>
                    handleColumnFilterChange(column, selectedOptions)
                  }
                  styles={customStyles}
                />
              </div>
            ))}
            <div className='column-filter-button-container' style={{ display: 'flex', flexDirection: 'row' }}>
              <button className='apply-button-insights-bplam' style={{ marginTop: '-13px', padding: '2px', marginLeft: '5px', backgroundColor: 'transparent', border: 'none' }} onClick={handleApplyColumnFilters} title='Apply Column Filters'><img className='img-filters' style={{ width: '20px', height: '20px' }} src={apply} /></button>
              <button className='revert-button-insights-bplam' style={{ marginTop: '-13px', padding: '2px', backgroundColor: 'transparent', border: 'none' }} onClick={handleCancelFilter} title='Clear all Column Filters'><img className='img-filters' style={{ width: '20px', height: '20px' }} src={cancel} /></button>
            </div>
          </div>



          {/* Search Bar */}
          {/* Search Bar */}
          <div style={{ position: 'relative', marginTop: '10px', marginLeft: '260px' }}>
            {/* <button style={{backgroundColor:'transparent',border:'none'}} onClick={handleFilterButtonClick}><img className='img-filters' src={filters} /></button> */}
            <button style={{ backgroundColor: 'transparent', border: 'none' }} onClick={toggleShowA}><img className='img-filters' src={filters} /></button>
            <ToastContainer
              className="p-3"
              position="bottom-end"
              onMouseLeave={toggleclose}
              style={{ zIndex: 1, marginRight: "175px" }}>
              <Toast show={showA} onClose={toggleShowA}>
                {/* <Toast.Header style={{ backgroundColor: "#6c5cd1af", border: "1px solid #6B5CD1" }}>
                    <img
                      src="holder.js/20x20?text=%20"
                      className="rounded me-2"
                      alt=""
                    />
                    <strong className="me-auto">Questions</strong>
                  </Toast.Header> */}
                <Toast.Body style={{ padding: "0px", height: "1px" }}>
                  <div className='filter-button-form-bplam' style={{ backgroundColor: '#FFFFFF', border: '1px solid #AD8BFF', borderRadius: '10px' }}>
                    <div className='filter-option-container'>
                      <div>
                        <label style={{ fontSize: '12px', color: "black" }}>
                          <input
                            className='radio-opt'
                            type="radio"
                            name="filterOption"
                            value={1}
                            checked={filterOption === 1}
                            onChange={() => setFilterOption(1)}
                            style={{ paddingTop: '2px' }}
                          />
                          All Applications
                        </label>
                      </div>
                      <div>
                        <label style={{ fontSize: '12px', color: "black" }}>
                          <input
                            className='radio-opt'
                            type="radio"
                            name="filterOption"
                            value={2}
                            checked={filterOption === 2}
                            onChange={() => setFilterOption(2)}
                          />
                          Overall Noisy Applications
                        </label>
                      </div>
                      <div style={{ fontSize: '12px', color: "black" }}>
                        <label>
                          <input
                            className='radio-opt'
                            type="radio"
                            name="filterOption"
                            value={3}
                            checked={filterOption === 3}
                            onChange={() => setFilterOption(3)}
                          />
                          Noisy Applications per Level
                        </label>
                      </div>
                    </div>

                    {/* Slider for Option 2 */}
                    {(filterOption === 2) && (
                      <div style={{ fontSize: '10px', marginTop: '10px' }}>
                        <label style={{ marginRight: '10px' }}>
                          <div style={{ display: 'flex', flexDirection: 'row', color: "black" }}><div>App Count:{sliderValue}</div><div style={{ marginLeft: '105px' }}>{tableData.length > 15 ? (15) : (tableData.length)}</div></div>
                          <input
                            type="range"
                            min={0}
                            // max={tableData.length}
                            max={tableData.length > 15 ? (15) : (tableData.length)}
                            value={sliderValue}
                            onChange={(e) => setSliderValue(parseInt(e.target.value))}
                            style={{ width: '180px' }}
                          />

                        </label>
                      </div>
                    )}
                    {(filterOption === 3) && (
                      <div style={{ fontSize: '10px', marginTop: '10px' }}>
                        <label style={{ marginRight: '10px' }}>
                          <div style={{ display: 'flex', flexDirection: 'row', color: "black" }}><div>App Count:{sliderValue}</div><div style={{ marginLeft: '105px' }}>{tableData.length > 5 ? (5) : (tableData.length)}</div></div>
                          <input
                            type="range"
                            min={0}
                            // max={tableData.length}
                            max={tableData.length > 5 ? (5) : (tableData.length)}
                            value={sliderValue}
                            onChange={(e) => setSliderValue(parseInt(e.target.value))}
                            style={{ width: '180px' }}
                          />

                        </label>
                      </div>
                    )}

                    {/* Update and Cancel Buttons */}
                    <div className='button-class-container-bplam-insight-filter-form' style={{ marginTop: '8px', width: '112%', height: '105%', marginLeft: '-10px', textAlign: 'justify', display: 'flex', flexDirection: 'row-reverse' }}> {/* backgroundColor: 'rgba(107,92,209,0.3)', */}
                      <button onClick={handleCancelFilter} style={{ marginLeft: '2px', marginRight: '8px', width: '45%', border: '1px solid #AD8BFF', borderRadius: '50px', fontSize: '13px', fontFamily: 'Graphik', backgroundColor: '#FFFFFF', color: 'black' }} title='Cancel the form filters.'>Cancel</button>
                      <button onClick={handleUpdateFilter} style={{ marginLeft: '8px', marginRight: '2px', width: '45%', border: '1px solid #AD8BFF', borderRadius: '50px', fontSize: '13px', fontFamily: 'Graphik', backgroundColor: '#6B5CD1', color: '#FFFFFF' }} title='update the table with the filter selected.'>Update</button>
                    </div>
                  </div>
                </Toast.Body>
              </Toast></ToastContainer>
          </div>
          <div className='search-bar'
            style={{
              display: 'flex',
              flexDirection: 'row',
              padding: '8px',
              marginTop: '10px',
              marginRight: '10px',
              // marginLeft: '260px',
              backgroundColor: 'rgba(255,255,255,0.1)',
              border: '1px solid #747BA9',
              borderRadius: '10px',
              width: '220px',
              height: '30px',
            }}>
            <input
              ref={searchInputRef}
              type="text"
              //placeholder="Search..."
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
              value={searchTerm}
              onChange={handleSearch} />
            <button style={{ backgroundColor: 'transparent', padding: '10px', marginTop: '-5px', border: 'none' }}><img src={search} alt='Search Icon' style={{ width: '20px', height: '20px', marginTop: '-25px' }} /></button>
          </div>
          {/* Filter Button at Top Right Corner */}

        </div>

        {/* Table */}


        {/* Filter Button Options */}
        {showFilterOptions && (
          <div className='filter-button-form-bplam' style={{ backgroundColor: '#FFFFFF', border: '1px solid #AD8BFF', borderRadius: '10px', marginLeft: '870px', zIndex: "10000" }}>
            <div className='filter-option-container'>
              <div>
                <label style={{ fontSize: '12px', color: "black" }}>
                  <input
                    type="radio"
                    name="filterOption"
                    value={1}
                    checked={filterOption === 1}
                    onChange={() => setFilterOption(1)}
                  />
                  All Applications
                </label>
              </div>
              <div>
                <label style={{ fontSize: '12px', color: "black" }}>
                  <input
                    type="radio"
                    name="filterOption"
                    value={2}
                    checked={filterOption === 2}
                    onChange={() => setFilterOption(2)}
                  />
                  Overall Noisy Applications
                </label>
              </div>
              <div style={{ fontSize: '12px', color: "black" }}>
                <label>
                  <input
                    type="radio"
                    name="filterOption"
                    value={3}
                    checked={filterOption === 3}
                    onChange={() => setFilterOption(3)}
                  />
                  Noisy Applications per Level
                </label>
              </div>
            </div>

            {/* Slider for Option 2 */}
            {(filterOption === 2 || filterOption === 3) && (
              <div style={{ fontSize: '10px' }}>
                <label style={{ marginRight: '10px' }}>
                  <div style={{ display: 'flex', flexDirection: 'row', color: "black" }}><div>App Count:{sliderValue}</div><div style={{ marginLeft: '105px' }}>{tableData.length}</div></div>
                  <input
                    type="range"
                    min={0}
                    max={tableData.length}
                    value={sliderValue}
                    onChange={(e) => setSliderValue(parseInt(e.target.value))}
                    style={{ width: '180px' }}
                  />

                </label>
              </div>
            )}

            {/* Update and Cancel Buttons */}
            <div className='button-class-container-bplam-insight-filter-form' style={{ marginTop: '8px', backgroundColor: 'rgba(107,92,209,0.3)', width: '112%', height: '105%', marginLeft: '-10px', textAlign: 'justify' }}>
              <button onClick={handleCancelFilter} style={{ marginLeft: '8px', width: '45%', border: '1px solid #AD8BFF', borderRadius: '50px', fontSize: '13px', fontFamily: 'Graphik', backgroundColor: '#FFFFFF', color: 'black' }}>Cancel</button>
              <button onClick={handleUpdateFilter} style={{ marginLeft: '2px', marginRight: '8px', width: '45%', border: '1px solid #AD8BFF', borderRadius: '50px', fontSize: '13px', fontFamily: 'Graphik', backgroundColor: '#6B5CD1', color: '#FFFFFF' }}>Update</button>
            </div>
          </div>
        )}

        <img src={lines} style={{ marginLeft: '15px', width: '1120px' }} />

        {/* Table */}
        <table className='bplam-insights-table' style={{ color: 'white', marginTop: '50px', margin: '10px', marginTop: '50px', border: "1px solid #8d97dac5", borderRadius: "10px" }}>
          {/* Table Header */}
          <thead className='bplam-insights-table-header'>
            <tr style={{ textAlign: 'center' }}>
              {Object.keys(currentRows[0] || {}).map((column) => (
                <th className='bplam-insights-table-th' key={column} style={{ border: '1px solid #FFFFFF', backgroundColor: 'rgb(107, 92, 209)' }}>{breakLabel(columnHeaderMap[column]) || column}</th>
              ))}
            </tr>
          </thead>
          {/* Table Body */}
          <tbody className='insights-table-body' >
            {searchResults.length > 0 ? (
              // Render based on search results
              searchResults
                .slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage)
                .map((row, rowIndex) => (
                  <tr key={rowIndex}>
                    {Object.values(row).map((cell, index) => (
                      <td className='bplam-insights-table-td' style={{ border: '1px solid #FFFFFF' }} key={index}>
                        {typeof cell === 'string' ? (
                          <span
                            dangerouslySetInnerHTML={{
                              __html: cell.replace(
                                new RegExp(`(${searchTerm})`, 'gi'),
                                '<mark>$1</mark>'
                              ),
                            }}
                          />
                        ) : (
                          cell
                        )}
                      </td>
                    ))}
                  </tr>
                ))
            ) : (
              // Render based on currentRows (original data or filtered data)
              currentRows.map((row, rowIndex) => (
                <tr key={rowIndex}>
                  {Object.values(row).map((cell, index) => (
                    <td className='bplam-insights-table-td' key={index}>{cell}</td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
        <img src={lines} style={{ marginLeft: '15px', width: '1120px' }} />
        {/* Pagination Controls */}
        <div className='pagination-insights-bplam' style={{ marginLeft: '980px', color: 'white', fontSize: '10px' }}>
          <button className='previous-button-insights-bplam'
            style={{
              backgroundColor: currentPage === 1 ? '#CCCCCC' : '#AD8BFF',
              color: currentPage === 1 ? '#666666' : '#FFFFFF',
              border: "none",
              borderRadius: "70px",
              marginRight: "4px"
            }}
            disabled={currentPage === 1}
            onClick={() => handlePageChange(currentPage - 1)}
          >
            <img className='previous-page' src={leftarrow} />
          </button>
          <span>
            {' '} Page {currentPage} of {totalPages}{' '}
          </span>
          <button
            style={{
              backgroundColor: currentPage === totalPages ? '#CCCCCC' : '#AD8BFF',
              color: currentPage === totalPages ? '#666666' : '#FFFFFF',
              border: "none",
              borderRadius: "70px",
              marginLeft: "4px"
            }}
            disabled={currentPage === totalPages}
            onClick={() => handlePageChange(currentPage + 1)}
          >
            <img src={rightarrow} />
          </button>
        </div>
      </div>
    );
  };

  //export default MyTableComponent;
  return (
    <div>
      <MyTableComponent />
    </div>
  );
};

export default YourComponent;


{/* <div style={{ position: 'relative', marginTop: '10px', marginRight: '10px' }}>
            //  <button style={{backgroundColor:'transparent',border:'none'}} onClick={handleFilterButtonClick}><img className='img-filters' src={filters} /></button> 
            <button style={{ backgroundColor: 'transparent', border: 'none' }} onClick={toggleShowA}><img className='img-filters' src={filters} /></button>
            <ToastContainer
              className="p-3"
              position="bottom-end"
              onMouseLeave={toggleclose}
              style={{ zIndex: 1, marginRight: "175px" }}>
              <Toast show={showA} onClose={toggleShowA}>
                {/* <Toast.Header style={{ backgroundColor: "#6c5cd1af", border: "1px solid #6B5CD1" }}>
                    <img
                      src="holder.js/20x20?text=%20"
                      className="rounded me-2"
                      alt=""
                    />
                    <strong className="me-auto">Questions</strong>
                  </Toast.Header> */}
// <Toast.Body style={{ padding: "0px", height: "1px" }}>
//   <div className='filter-button-form-bplam' style={{ backgroundColor: '#FFFFFF', border: '1px solid #AD8BFF', borderRadius: '10px' }}>
//     <div className='filter-option-container'>
//       <div>
//         <label style={{ fontSize: '12px', color: "black" }}>
//           <input
//             type="radio"
//             name="filterOption"
//             value={1}
//             checked={filterOption === 1}
//             onChange={() => setFilterOption(1)}
//           />
//           All Applications
//         </label>
//       </div>
//       <div>
//         <label style={{ fontSize: '12px', color: "black" }}>
//           <input
//             type="radio"
//             name="filterOption"
//             value={2}
//             checked={filterOption === 2}
//             onChange={() => setFilterOption(2)}
//           />
//           Overall Noisy Applications
//         </label>
//       </div>
//       <div style={{ fontSize: '12px', color: "black" }}>
//         <label>
//           <input
//             type="radio"
//             name="filterOption"
//             value={3}
//             checked={filterOption === 3}
//             onChange={() => setFilterOption(3)}
//           />
//           Noisy Applications per Level
//         </label>
//       </div>
//     </div>

//     {/* Slider for Option 2 */}
//     {(filterOption === 2 || filterOption === 3) && (
//       <div style={{ fontSize: '10px' }}>
//         <label style={{ marginRight: '10px' }}>
//           <div style={{ display: 'flex', flexDirection: 'row', color: "black" }}><div>App Count:{sliderValue}</div><div style={{ marginLeft: '105px' }}>{tableData.length}</div></div>
//           <input
//             type="range"
//             min={0}
//             max={tableData.length}
//             value={sliderValue}
//             onChange={(e) => setSliderValue(parseInt(e.target.value))}
//             style={{ width: '180px' }}
//           />

//         </label>
//       </div>
//     )}

//     {/* Update and Cancel Buttons */}
//     <div className='button-class-container-bplam-insight-filter-form' style={{ marginTop: '8px', backgroundColor: 'rgba(107,92,209,0.3)', width: '112%', height: '105%', marginLeft: '-10px', textAlign: 'justify' }}>
//       <button onClick={handleCancelFilter} style={{ marginLeft: '8px', width: '45%', border: '1px solid #AD8BFF', borderRadius: '50px', fontSize: '13px', fontFamily: 'Graphik', backgroundColor: '#FFFFFF', color: 'black' }} title='Cancel the form filters.'>Cancel</button>
//       <button onClick={handleUpdateFilter} style={{ marginLeft: '2px', marginRight: '8px', width: '45%', border: '1px solid #AD8BFF', borderRadius: '50px', fontSize: '13px', fontFamily: 'Graphik', backgroundColor: '#6B5CD1', color: '#FFFFFF' }} title='update the table with the filter selected.'>Update</button>
//     </div>
//   </div>
// </Toast.Body>
// </Toast></ToastContainer>
// </div> */}