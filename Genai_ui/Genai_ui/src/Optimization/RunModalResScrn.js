import React from 'react';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import './optimization.css';

const RunModalResScrn = ({ autoResponse }) => {
  const { response, status_code } = autoResponse.data;
  console.log(autoResponse.data)
  console.log(response)

  const renderResponseInfo = () => {
    if (status_code === 200) {
      return (
        <>
          <div className='row'>
            <div className='col-sm-4 modal-label'> Solver Response:</div>
            <div className='col-sm-8'>
              <input className='runmodalScrn-input' type='text' value={response.Termination} readOnly />
            </div>
          </div>
          <div className='row' style={{ marginTop: '10px' }}>
            <div className='col-sm-4 modal-label'> Duration:</div>
            <div className='col-sm-8'>
              <input className='runmodalScrn-input' type='text' value={response.Duration} readOnly />
            </div>
          </div>
          <div className='row' style={{ marginTop: '10px' }}>
            <div className='col-sm-4 modal-label'> Issue Found:</div>
            <div className='col-sm-8'>
              <textarea
                className='runmodalScrn-input'
                rows='4'
                cols='48'
                value={response.Issues}
                readOnly
              ></textarea>
            </div>
          </div>
        </>
      );
    } else {
      return <div className='modal-label'>No response available</div>;
    }
  };

  return (
    <div>
      <div className='autoCmpt-div'>
        <div className='row autocomplete-row'>
          <div className='col-sm-3 autcomplete-label'>
            <div style={{ width: 200, height: 200, backgroundColor: '#CC33FF', padding: '30px', borderRadius: '10px' }}>
              <CircularProgressbar
                value={status_code === 200 ? 100 : 0}
                text={status_code === 200 ? '100%' : '0%'}
                styles={buildStyles({
                  pathColor: 'white',
                  textColor: 'white',
                  trailColor: '#C8C8C8',
                  backgroundColor: status_code === 200 ? 'green' : 'red',
                })}
              />
            </div>
            <div className='modal-label' style={{ textAlign: 'center' }}>
              {status_code === 200 ? 'Completed' : 'Not Completed'}
            </div>
          </div>
          <div className='col-sm-1'></div>
          <div className='col-sm-8 modal-box'>{renderResponseInfo()}</div>
        </div>
      </div>
    </div>
  );
};

export default RunModalResScrn;
