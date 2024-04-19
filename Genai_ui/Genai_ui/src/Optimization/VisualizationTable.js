import React, { useState, useEffect } from 'react';
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

const VisualizationTable = ({ headers,cellWidths, screenData }) => {
  const dropdownOptions = ['Bar chart', 'Line chart', 'Pie chart', 'Scattered chart','stacked bar chart','Radar chart','Network graph','Score card'];
  const initialRow = Object.fromEntries(headers.map((header) => [header, '']));

  initialRow['dropdown'] = '';
  const [rows, setRows] = useState([{ id: 1, ...initialRow }]);

  const addRow = () => {
    const newRow = { id: rows.length + 1, ...initialRow };
    setRows([...rows, newRow]);
  };

  const prepareJsonStructure = () => {
    const screensData = {};

    accordions.forEach((accordion, screenIndex) => {
      const screenRows = rows.map((row) => {
        const rowData = headers.reduce((acc, header) => {
          acc[header] = row[header];
          return acc;
        }, {});
        return rowData;
      });

      const screenKey = `screen${screenIndex + 1}`;
      screensData[screenKey] = screenRows;
    });

    return screensData;
  };

  const saveClick = () => {
    const jsonData = prepareJsonStructure();
    console.log("jjjjjjjjjjjjjjjjjjjjjjjjjj",jsonData);
    screenData(jsonData)
    // Now you can send jsonData to the server or perform any other action
  };


  const deleteRow = (id) => {
    const updatedRows = rows.filter((row) => row.id !== id);
    setRows(updatedRows);
  };

  const handleInputChange = (id, columnName, event) => {
    const updatedRows = rows.map((row) =>
      row.id === id ? { ...row, [columnName]: event.target.value } : row
    );
    setRows(updatedRows);
  };

  const [accordions, setAccordions] = React.useState([{}]);

  const handleAddAccordion = () => {
    setAccordions([...accordions, {}]);
  };

  const handleRemoveAccordion = (index) => {
    const updatedAccordions = accordions.filter((_, i) => i !== index);
    setAccordions(updatedAccordions);
  };




  return (
    <>
    <div style={{marginTop:'62px'}}>
           

            <div className='scrollBarClass' style={{overflowY: 'scroll', height:'318px'}}>
              {accordions.map((accordion, index) => (

              <Accordion key={index} sx={{border:'1px solid white'}}>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon style={{color:'white'}}/>}
                  aria-controls={`panel${index + 1}-content`}
                  id={`panel${index + 1}-header`}
                  style={{ backgroundColor: '#3f425f', minHeight:'40px'}}
                >
                <Typography sx={{ whiteSpace: 'nowrap' ,lineHeight:'2.5',color:'white',fontSize:'13px', fontFamily: 'Graphik', fontWeight:500}}>Screen {index + 1}</Typography> 
                  <AccordionActions sx={{marginLeft:'799px', border:'none'}}>
                  <RemoveIcon onClick={() => handleRemoveAccordion(index)} sx={{background:'white', borderRadius:'10px', color:'black',marginRight:'10px', fontSize:'18px'}} />
                    {/* <Button sx={{height:'5px'}} onClick={() => handleRemoveAccordion(index)}>
                      <RemoveIcon sx={{background:'white', borderRadius:'10px', color:'black',marginRight:'10px', fontSize:'18px'}} />  <Typography sx={{ fontFamily: 'Graphik',color:'white', fontSize:'13px', textTransform:'capitalize',fontFamily: 'Graphik'}}>Remove Screen</Typography>
                    </Button> */}
                  </AccordionActions>
                </AccordionSummary>
                <AccordionDetails sx={{backgroundColor:' rgba(39, 40, 75, 1)', padding:'0px'}}>
                <div style={{ overflow:'auto' }}>
                  <table style={{color:'white', width:'100%',tableLayout: 'fixed'}}> 
                    <thead>
                      <tr style={{fontSize:'12px'}}>
                        {headers.map((header, index) => (
                          <th style={{border:'solid 1px white',width:cellWidths[index], textAlign:'center'}} key={header}>{header}</th>
                        ))}
                        <th style={{minWidth:'20px'}}></th>
                      </tr>
                    </thead>
                    <tbody >
                      {rows.map((row) => (
                        <tr  key={row.id}>
                          {headers.map((header,index) => (
                            <td style={{border:'solid 1px white',minWidth:cellWidths[index],maxWidth:'500px', color:'white'}} key={`${row.id}-${header}`}>
                              {index === 1 ?
                              (
                                <select style={{
                                  width: '100%',
                                  background: 'transparent',
                                  color: 'white',
                                  border: 'none',
                                  fontFamily: 'Graphik',
                                  fontSize: '12px'
                                }}
                                value={row[header]}
                                onChange={(e) =>
                                  handleInputChange(row.id, header, e)
                                }
                              >
                                <option value="">Select Option</option>
                                {dropdownOptions.map((option) => (
                                  <option key={option} value={option}>
                                    {option}
                                  </option>
                                ))}
                              </select>
                              ) : (
                                <input
                                className='input-table'
                                style={{width:'100%',color:'white',fontSize:'12px', background:'none', border:'none'}}
                                type="text"
                                value={row[header]}
                                onChange={(e) => handleInputChange(row.id, header, e)}
                              />
                              )}
                              
                             
                            </td>
                          ))}
                          <td style={{textAlign:'center'}}>
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
                  <button onClick={addRow} className='button-addRow' style={{fontSize:'14px',fontFamily:'Graphik', fontWeight:'500',paddingTop:'5px',width:'14%',color:'white',textTransform:'capitalize'}}><AddIcon sx={{background:'white', borderRadius:'10px', color:'black',marginRight:'10px', fontSize:'14px',marginTop:'-3px'}}/>  ADD</button>
                </div>
                </AccordionDetails>
              </Accordion>
              ))}
            </div>
     
    </div>
   
    <AccordionActions sx={{justifyContent:'flex-start',marginTop:'70px'}}>
              <button className='button-addRow' style={{
                // border:'2px solid white', borderRadius:'25px',marginTop: '6px',width: '14%',height: '40px',
                marginTop:'16px',fontSize:'14px',fontFamily:'Graphik', fontWeight:'500',paddingTop:'5px',width:'15%',color:'white',textTransform:'capitalize'}} onClick={handleAddAccordion}>
                <AddIcon sx={{background:'white', borderRadius:'10px', color:'black',marginRight:'10px', fontSize:'14px',marginTop:'-3px'}}/> 
                {/* <Typography sx={{color:'white',textTransform:'capitalize', fontSize:'13px', fontFamily: 'Graphik'}}> ADD</Typography> */}
              ADD
              </button>
              <button onClick={saveClick} style={{marginTop:'16px',fontSize:'14px',fontFamily:'Graphik', fontWeight:'500',paddingTop:'5px' , width:'15%',}} className='button-addRow'>
      <SaveIcon sx={{marginRight:'10px', fontSize:'15px',marginTop:'-3px'}}/>  SAVE</button>
   
    </AccordionActions>
   
    </>
  );
};

export default VisualizationTable;
