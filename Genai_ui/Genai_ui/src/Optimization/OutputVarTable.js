import React, { useState } from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionActions from '@mui/material/AccordionActions';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import Typography from '@mui/material/Typography';
import SaveIcon from '@mui/icons-material/Save';

const OutputVarTable = ({onSaveClick2, headers,cellWidths }) => {
  const initialRow = Object.fromEntries(headers.map((header) => [header, '']));
  const [rows, setRows] = useState([{ id: 1, ...initialRow }]);

  const addRow = () => {
    const newRow = { id: rows.length + 1, ...initialRow };
    setRows([...rows, newRow]);
  };

  const deleteRow = (id) => {
    const updatedRows = rows.filter((row) => row.id !== id);
    setRows(updatedRows);
  };
 
  const saveClick = () => {
    // Convert rows to CSV format
    const csvHeaders = headers.join(',');
  const csvRows = rows.map((row) => Object.values(row).join(',')).join('\n');
  
  const csvData = `${csvHeaders}\n${csvRows}`;
    

    // Call the onSaveClick function passed from the main component
    onSaveClick2(csvData);
    console.log("qqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqq", csvData);
  };

  const handleInputChange = (id, columnName, event) => {
    const updatedRows = rows.map((row) =>
      row.id === id ? { ...row, [columnName]: event.target.value } : row
    );
    setRows(updatedRows);
  };

  return (
    <div  className='scrollBarClass' style={{marginTop:'50px', overflowY:'scroll',height:'500px', marginLeft:'-50px', marginRight:'-118px' }}>
      <table style={{tableLayout: 'fixed', width: '100%'}}> 
        <thead>
          <tr style={{background:'#464B7A', fontSize:'12px', textAlign:'center'}}>
            {headers.map((header, index) => (
              <th style={{padding:'3px',border:'solid 1px white',width:cellWidths[index]}} key={header}>{header}</th>
            ))}
             <th style={{  background: 'rgba(32, 35, 66, 1)',border:' 1px solid rgb(32, 35, 66)', minWidth: '100px', maxWidth: '500px' }}></th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr  key={row.id}>
              {headers.map((header, index) => (
                <td style={{border:'solid 1px white', width:header === 'Formula Details' ? '400px':'180px'}} key={`${row.id}-${header}`}>
                  <input
                    className='input-table'
                    style={{width: '-webkit-fill-available',fontSize:'12px',background:'rgba(32, 35, 66, 1)',color:'white', border:'solid 1px rgba(32, 35, 66, 1)'}}
                    type="text"
                    value={row[header]}
                    onChange={(e) => handleInputChange(row.id, header, e)}
                  />
                </td>
              ))}
               <td style={{ border: '1px solid rgb(32, 35, 66)' }}>
                <button className='button-remove' style={{ }}
                      onClick={() => deleteRow(row.id)}>
                        <RemoveIcon sx={{background:'white', borderRadius:'10px', color:'black',marginRight:'10px', fontSize:'18px'}} /> 
                        {/* <RemoveIcon sx={{color:'white', fontSize:'10px'}}></RemoveIcon> */}
                 </button>
               </td>
          
              
            </tr>
          ))}
        </tbody>
      </table>
      <div style={{ borderRadius: '10px',marginTop: '34%', width: '150%'}}>
        <button onClick={addRow}  className='button-addRow' style={{width:'9%',fontSize:'14px',fontFamily:'Graphik', fontWeight:'500',paddingTop:'5px'}}><AddIcon sx={{background:'white',borderRadius:'10px', color:'black',marginRight:'10px', fontSize:'18px',marginTop:'-5px'}}/>  ADD</button>
        <button onClick={saveClick} className='button-addRow' style={{width:'9%',fontSize:'14px',fontFamily:'Graphik', fontWeight:'500',paddingTop:'5px'}}><SaveIcon sx={{marginRight:'10px', fontSize:'18px', marginTop:'-5px'}}/>  SAVE</button>
      </div>
    
    </div>
  );
};

export default OutputVarTable;
