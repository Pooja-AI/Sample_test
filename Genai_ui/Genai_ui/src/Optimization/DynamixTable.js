import React, { useState } from 'react';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import SaveIcon from '@mui/icons-material/Save';

// ... (other imports)

const DynamicTable = ({ headers, cellWidths, onSaveClick }) => {
  const initialRow = Object.fromEntries(headers.map((header) => [header, '']));
  const [rows, setRows] = useState([{ id: 1, ...initialRow }]);
  const [suggestions, setSuggestions] = useState([]);
  const [isTypingFormulaDetails, setIsTypingFormulaDetails] = useState(false);

  const addRow = () => {
    const newRow = { id: rows.length + 1, ...initialRow };
    setRows([...rows, newRow]);
  };

  const deleteRow = (id) => {
    const updatedRows = rows.filter((row) => row.id !== id);
    setRows(updatedRows);
  };

  const handleSaveClick = () => {
    // Convert rows to CSV format
    const csvHeaders = headers.join(',');
  const csvRows = rows.map((row) => Object.values(row).join(',')).join('\n');
  const csvData = `${csvHeaders}\n${csvRows}`;
    

    // Call the onSaveClick function passed from the main component
    onSaveClick(csvData);
    console.log("qqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqq", csvData);
  };

  const handleInputChange = (id, columnName, event) => {
    const updatedRows = rows.map((row) =>
      row.id === id ? { ...row, [columnName]: event.target.value } : row
    );
    setRows(updatedRows);

    // Update suggestions based on the values entered in "Curated Parameter Name"
    if (columnName === 'Curated Parameter Name') {
      const curatedValues = updatedRows.map((row) => row['Curated Parameter Name']).filter(Boolean);
      setSuggestions([...new Set(curatedValues)]);
    }

    // Update suggestions based on the entered text in "Formula Details"
    if (columnName === 'Formula Details') {
      setIsTypingFormulaDetails(true); // Set the flag when the user starts typing in "Formula Details"
      const currentText = event.target.value.toLowerCase();
      const filteredSuggestions = suggestions.filter((suggestion) =>
        suggestion.toLowerCase().includes(currentText)
      );
      setSuggestions(filteredSuggestions);
    }
  };

  const renderCell = (row, header, cellIndex) => {
    return (
      <td style={{ border: 'solid 1px white',minWidth: cellWidths[cellIndex] }} key={`${row.id}-${header}`}>
        <input
          className='input-table'
          style={{ background: 'rgba(32, 35, 66, 1)', color: 'white',width:'100%', border: 'solid 1px rgba(32, 35, 66, 1)' }}
          type="text"
          value={row[header]}
          onChange={(e) => handleInputChange(row.id, header, e)}
        />
        {header === 'Formula Details' && isTypingFormulaDetails && suggestions.length > 0 && (
          // Display suggestions based on the entered text in "Formula Details"
          <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
            {suggestions.map((suggestion, index) => (
              <li key={index} onClick={() => handleInputChange(row.id, header, { target: { value: suggestion } })}>
                {suggestion}
              </li>
            ))}
          </ul>
        )}
      </td>
    );
  };

  return (
    <div className='scrollBarClass' style={{ marginTop: '50px',width:'110%', height:'500px',overflowY:'scroll' }}>
        <table style={{fontSize:'12px',marginLeft:'0px'}}> 
        <thead style={{fontSize:'12px'}}>
          <tr style={{ background: '#464B7A', fontSize:'12px', textAlign:'center' }}>
            {headers.map((header, cellIndex) => (
               <th style={{ padding:'3px',  border:'1px solid white'}} key={header}>{header}</th>
               ))}
                <th style={{  background: 'rgba(32, 35, 66, 1)',border:' 1px solid rgb(32, 35, 66)' }}></th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr style={{paddingLeft:'10px'}} key={row.id}>
              {headers.map((header, cellIndex) => renderCell(row, header, cellIndex))}
              <button className='button-remove' style={{ }} onClick={() => deleteRow(row.id)}>
                <RemoveIcon sx={{ background: 'white', borderRadius: '10px', color: 'black', marginRight: '10px', fontSize: '18px' }} />
              </button>
            </tr>
          ))}
        </tbody>
      </table>
      <div style={{ borderRadius: '10px',marginTop: '10%', width: '150%', marginLeft:'0px'}}>
        <button onClick={addRow}  className='button-addRow' style={{width:'9%',fontSize:'14px',fontFamily:'Graphik', fontWeight:'500',paddingTop:'5px',marginTop:'18%'}}><AddIcon sx={{background:'white',borderRadius:'10px', color:'black',marginRight:'10px', fontSize:'18px',marginTop:'-5px'}}/>  ADD</button>
        <button onClick={handleSaveClick} className='button-addRow' style={{width:'9%',fontSize:'14px',fontFamily:'Graphik', fontWeight:'500',paddingTop:'5px'}}><SaveIcon sx={{marginRight:'10px', fontSize:'18px',marginTop:'-5px'}}/>  SAVE</button>
      </div>
    </div>
  );
};

export default DynamicTable;
