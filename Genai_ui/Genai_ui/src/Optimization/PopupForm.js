// PopupForm.js
import React, { useState } from 'react';
import close from '../images/close.svg';

const PopupForm = ({ isOpen, onClose, onSave, identifiedKPIs }) => {
  const [data, setData] = useState([]);

  const handleUOMChange = (event, kpi) => {
    const updatedData = [...data];
    const index = identifiedKPIs.indexOf(kpi);

    if (index !== -1) {
      updatedData[index] = { ...updatedData[index], uomValue: event.target.value };
      setData(updatedData);
    }
  };

  const handleRemarksChange = (event, kpi) => {
    const updatedData = [...data];
    const index = identifiedKPIs.indexOf(kpi);

    if (index !== -1) {
      updatedData[index] = { ...updatedData[index], remarksValue: event.target.value };
      setData(updatedData);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSave(data);
  };

  return (
    <div className={`popup ${isOpen ? 'open' : ''}`}>
      <div className="popup-content1">
        <img style={{width:'3%',marginLeft:'670px',backgroundColor:'white',borderRadius:'50%',padding:'5px', marginBottom:'10px'}} src={close} onClick={onClose}></img>
        <form onSubmit={handleSubmit}>
          <table style={{width:'700px',fontSize:'12px', minHeight:'300px',color:'white'}}>
            <thead>
              <tr>
                <th style={{border:'1px solid white',width:'200px'}}>KPI</th>
                <th style={{border:'1px solid white'}}>UOM</th>
                <th style={{border:'1px solid white'}}>Remarks</th>
              </tr>
            </thead>
            <tbody>
              {identifiedKPIs.map((kpi, index) => (
                <tr key={index}>
                  <td style={{border:'1px solid white'}}>{kpi}</td>
                  <td style={{border:'1px solid white'}}>
                    <input
                      type="text"
                      value={data[index]?.uomValue || ''}
                      className='uom'
                      onChange={(event) => handleUOMChange(event, kpi)}
                      placeholder={`Enter UOM for ${kpi}`}
                    />
                  </td>
                  <td style={{border:'1px solid white'}}>
                    <input
                      type="text"
                      className='remarks'
                      value={data[index]?.remarksValue || ''}
                      onChange={(event) => handleRemarksChange(event, kpi)}
                      placeholder={`Enter Remarks for ${kpi}`}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <button style={{backgroundColor:'#6B5CD1',width:'100px',border:'1px solid #6B5CD1',color:'white', borderRadius:'15px',marginTop:'20px',marginLeft:'600px'}} type="submit">Save</button>
        </form>
      </div>
    </div>
  );
};

export default PopupForm;
