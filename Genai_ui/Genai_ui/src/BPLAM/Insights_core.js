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
// import { Alert } from '@coreui/react';
import {
  Alert,
  // CSmartTable,
  CTable,
  CAvatar,
  CBadge,
  CButton,
  CCollapse,
  CCardBody,
} from '@coreui/react';
// import { CSmartTable, CTable, CAvatar, CBadge, CButton, CCollapse, CCardBody } from '@coreui/react';

// import CSmartTable from '@coreui/vue-pro/src/components/smart-table/CSmartTable'
// import { CSmartTable } from '@coreui/vue/react';
// import 'coreui/dist/css/coreui.min.css'; // Import CoreUI styles
import '@coreui/coreui/dist/css/coreui.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';


const YourComponent = ({ jsonData2 }) => {
  // State variable in ComponentB
  // const [sharedVariable, setSharedVariable] = jsonData2;

  const BadgeExample = ({ status }) => {
    // Define a mapping of status to corresponding badge colors
    const statusToBadgeColor = {
      'Active': 'success',
      'Inactive': 'secondary',
      'Pending': 'warning',
      'Banned': 'danger',
    };
  
    // Get the corresponding badge color for the given status
    const badgeColor = statusToBadgeColor[status] || 'primary';
  
    return (
      <span className={`badge bg-${badgeColor}`}>{status}</span>
    );
  };


const [details, setDetails] = useState([])
const columns = [
  {
    key: 'avatar',
    label: '',
    filter: false,
    sorter: false,
  },
  {
    key: 'name',
    _style: { width: '20%' },
  },
  'registered',
  { 
    key: 'role',
    _style: { width: '20%' }
  },
  { 
    key: 'status',
    _style: { width: '20%' }
  },
  {
    key: 'show_details',
    label: '',
    _style: { width: '1%' },
    filter: false,
    sorter: false,
  },
]
const usersData = [
  {
    id: 1,
    name: 'Samppa Nori',
    avatar: '1.jpg',
    registered: '2022/01/01',
    role: 'Member',
    status: 'Active',
  },
  {
    id: 2,
    name: 'Estavan Lykos',
    avatar: '2.jpg',
    registered: '2022/02/07',
    role: 'Staff',
    status: 'Banned',
  },
  {
    id: 3,
    name: 'Chetan Mohamed',
    avatar: '3.jpg',
    registered: '2022/02/07',
    role: 'Admin',
    status: 'Inactive',
    _selected: true,
  },
  {
    id: 4,
    name: 'Derick Maximinus',
    avatar: '4.jpg',
    registered: '2022/03/19',
    role: 'Member',
    status: 'Pending',
  },
  {
    id: 5,
    name: 'Friderik Dávid',
    avatar: '5.jpg',
    registered: '2022/01/21',
    role: 'Staff',
    status: 'Active'
  },
  { 
    id: 6,
    name: 'Yiorgos Avraamu',
    avatar: '6.jpg',
    registered: '2022/01/01',
    role: 'Member',
    status: 'Active'
  },
  {
    id: 7,
    name: 'Avram Tarasios',
    avatar: '7.jpg',
    registered: '2022/02/07',
    role: 'Staff',
    status: 'Banned',
    _selected: true,
  },
  {
    id: 8,
    name: 'Quintin Ed',
    avatar: '8.jpg',
    registered: '2022/02/07',
    role: 'Admin',
    status: 'Inactive'
  },
  { 
    id: 9,
    name: 'Enéas Kwadwo',
    avatar: '9.jpg',
    registered: '2022/03/19',
    role: 'Member',
    status: 'Pending'
  },
  { 
    id: 10,
    name: 'Agapetus Tadeáš',
    avatar: '10.jpg',
    registered: '2022/01/21',
    role: 'Staff',
    status: 'Active'
  },
  { 
    id: 11,
    name: 'Carwyn Fachtna',
    avatar: '11.jpg',
    registered: '2022/01/01',
    role: 'Member',
    status: 'Active'
  },
  {
    id: 12,
    name: 'Nehemiah Tatius',
    avatar: '12.jpg',
    registered: '2022/02/07',
    role: 'Staff',
    status: 'Banned',
    _selected: true,
  },
  {
    id: 13,
    name: 'Ebbe Gemariah',
    avatar: '13.jpg',
    registered: '2022/02/07',
    role: 'Admin',
    status: 'Inactive'
  },
  {
    id: 14,
    name: 'Eustorgios Amulius',
    avatar: '14.jpg',
    registered: '2022/03/19',
    role: 'Member',
    status: 'Pending',
  },
  {
    id: 15,
    name: 'Leopold Gáspár',
    avatar: '15.jpg',
    registered: '2022/01/21',
    role: 'Staff',
    status: 'Active'
  },
]
const getBadge = (status) => {
  switch (status) {
    case 'Active':
      return 'success'
    case 'Inactive':
      return 'secondary'
    case 'Pending':
      return 'warning'
    case 'Banned':
      return 'danger'
    default:
      return 'primary'
  }
}
const toggleDetails = (index) => {
  const position = details.indexOf(index)
  let newDetails = details.slice()
  if (position !== -1) {
    newDetails.splice(position, 1)
  } else {
    newDetails = [...details, index]
  }
  setDetails(newDetails)
}
return (
  // <CSmartTable
  <CTable
    activePage={2}
    cleaner
    clickableRows
    columns={columns}
    columnFilter
    columnSorter
    // footer
    items={usersData}
    itemsPerPageSelect
    itemsPerPage={5}
    pagination
    onFilteredItemsChange={(items) => {
      console.log(items)
    }}
    onSelectedItemsChange={(items) => {
      console.log(items)
    }}
    scopedColumns={{
      avatar: (item) => (
        <td>
          <CAvatar src={`/images/avatars/${item.avatar}`} />
        </td>
      ),
      status: (item) => (
        <td>
            <CBadge color={getBadge(item.status)}>{item.status}</CBadge>
           {/* <BadgeExample status={item.status}>{item.status}</BadgeExample>  color={getBadge(item.status)} */}
           {/* <BadgeExample status={item.status}/> */}
        </td>
      ),
      show_details: (item) => {
        return (
          <td className="py-2">
            <CButton
              color="primary"
              variant="outline"
              shape="square"
              size="sm"
              onClick={() => {
                toggleDetails(item.id)
              }}
            >
              {details.includes(item.id) ? 'Hide' : 'Show'}
            </CButton>
          </td>
        )
      },
      details: (item) => {
        return (
          <CCollapse visible={details.includes(item.id)}>
            <CCardBody className="p-3">
              <h4>{item.username}</h4>
              <p className="text-muted">User since: {item.registered}</p>
              <CButton size="sm" color="info">
                User Settings
              </CButton>
              <CButton size="sm" color="danger" className="ml-1">
                Delete
              </CButton>
            </CCardBody>
          </CCollapse>
        )
      },
    }}
    selectable
    sorterValue={{ column: 'status', state: 'asc' }}
    tableFilter
    tableProps={{
      className: 'add-this-class',
      responsive: true,
      striped: true,
      hover: true,
    }}
    tableBodyProps={{
      className: 'align-middle'
    }}
  />
)

  //export default MyTableComponent;
  // return (
  //   <div>
     
  //   </div>
  // );
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