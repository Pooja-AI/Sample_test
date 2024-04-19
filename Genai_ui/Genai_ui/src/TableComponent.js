import React from 'react';

const TableComponent = ({ columns, data }) => {
  const tableStyle = {
    backgroundColor: "#3C4069",
    border:'1px solid #747BA9',
    color:'#3BBC6F', // Change this to your desired background color
    width:'170px',
    minWidth:'170px'
  };
  return (
    <div className="table-container">
      <table className="table" style={tableStyle}>
        <thead>
          <tr>
            {columns.map((column, index) => (
              <th key={index} style={tableStyle}>{column.Header} </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, rowIndex) => (
            <tr key={rowIndex} >
              {columns.map((column, columnIndex) => (
    // Change this to your desired background color
                <td key={columnIndex} style={{ backgroundColor: '#27284B', border:'1px solid #747BA9', color:'white',width:'170px',minWidth:'170px'}}>{row[column.accessor]}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TableComponent;
