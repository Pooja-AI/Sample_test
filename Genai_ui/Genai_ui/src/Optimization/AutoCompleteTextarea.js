import React, { useState, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay } from '@fortawesome/free-solid-svg-icons';
import RunModalResScrn from './RunModalResScrn';
import './optimization.css';

const AutocompleteTextarea = ({onSaveClick3,setShowModal,autoResponse}) => {
  const [maximizeValue, setMaximizeValue] = useState('');
  const [minimizeValue, setMinimizeValue] = useState('');
  const textareaRef = useRef(null);
  const [showModalResScrn, setShowModalResScrn] = useState(false);

  const handleTextareaChange = (event, type) => {
    const value = event.target.value;
    if (type === 'maximize') {
      setMaximizeValue(value);
    } else if (type === 'minimize') {
      setMinimizeValue(value);
    }
  };

  const handlerunModalClick = () => {
    // Convert entered values into a JSON format
    const objectives = {
      Maximize: maximizeValue.trim().split(';').filter(value => value !== '').map(value => [value]),
      Minimize: minimizeValue.trim().split(';').filter(value => value !== '').map(value => [value]),
    };

    const csvData = convertToCSV(objectives);

  // Do something with the CSV data, for example, send it to the server
  console.log(csvData);
  onSaveClick3(csvData);
    //setShowModalResScrn(true);
  };
  const convertToCSV = (data) => {
    const headers = Object.keys(data);
    const values = headers.map((header) => data[header].join(';'));
  
    return [headers.join(','), values.join(',')].join('\n');
  };

  return (
    <div>
      {!setShowModal ? (
        <div className='autoCmpt-div'>
          <div className="col-sm-12 autocomplete-header">
            Optimization Objective
          </div>
          <div className='row autocomplete-row'>
            <div className='col-sm-2 autcomplete-label'>
              Maximize:
            </div>
            <div className='col-sm-10'>
              <textarea
                ref={textareaRef}
                placeholder=""
                value={maximizeValue}
                onChange={(e) => handleTextareaChange(e, 'maximize')}
                className="autosuggest-textarea"
              />
            </div>
          </div>
          <div className='row autocomplete-row'>
            <div className='col-sm-2 autcomplete-label'>
              Minimize:
            </div>
            <div className='col-sm-10'>
              <textarea
                ref={textareaRef}
                placeholder=""
                value={minimizeValue}
                onChange={(e) => handleTextareaChange(e, 'minimize')}
                className="autosuggest-textarea"
              />
            </div>
          </div>
          <div className='row autocomplete-button'>
            <button className='run-button' onClick={handlerunModalClick} >
              <FontAwesomeIcon icon={faPlay} />  RUN MODEL
            </button>
          </div>
        </div>
      ) : (
        <RunModalResScrn autoResponse={autoResponse}/>
      )}
    </div>
  );
};

export default AutocompleteTextarea;
