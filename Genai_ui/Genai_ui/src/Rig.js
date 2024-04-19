import React, { useState, useEffect } from 'react';
import filter from './images/XMLID_6_.svg';
import RigDetails from './RigDetails';
import './Doa.css';

function Rig() {
    const [value, setValue] = React.useState('');

    const handleChange = (event) => {
        setValue(event.target.value);
    };
    const [calenderValue, setCalenderValue] = React.useState('');

    const handleCalenderChange = (event) => {
        setCalenderValue(event.target.value);
    };
    const [rigDetailsShow, setRigDetailsShow] = useState(false);
    const getRig = () => {
        // ToDo: backend call to getrig details
        setRigDetailsShow(!rigDetailsShow);
    }
    return (
        <>
            {rigDetailsShow ? <RigDetails onClose={() => setRigDetailsShow(false)}/> :
                <div className='rig-panel'>
                    <div className='rig-panel-top'>
                        <p className='analysis-header'>Drilling Operations - Evening Report</p></div>
                    <div className='rig-company'>
                        <p className='rig-top-header'> Company Rigs</p>
                        <div className='rig-box'>
                            <div className='rig' onClick={getRig}>
                                <p className='rig-header'>Rig ID : S/GAU1</p>
                                <p className='rig-body'>{`Well ID \u00A0: SAZ#1`}</p>
                                <p className='rig-body'>{`Status \u00A0 : Work Over Job`}</p>
                                <p className='rig-body'>{`Issue \u00A0  \u00A0 : 03`}</p>
                                <p className='rig-body'>{`Req \u00A0  \u00A0 \u00A0 : 05`}</p>
                                <div className='rig-severity'>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='rig-contract'>
                        <p className='rig-top-header'> Contract Rigs</p>
                        <div className='rig-box'>
                            <div className='rig'>
                                <p className='rig-header'>Rig ID : S/GAU1</p>
                                <p className='rig-body'>Well ID : SAZ#1</p>
                                <p className='rig-body'> Status : Work Over Job</p>
                                <p className='rig-body'>Issue : 03</p>
                                <p className='rig-body'>Req : 05</p>
                                <div className='rig-severity'></div>
                            </div>
                        </div>
                    </div>




                </div>
            }
        </>
    )
}

export default Rig