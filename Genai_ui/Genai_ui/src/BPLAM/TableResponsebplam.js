import React from "react";
import '../ChatVeg.css';
import like from "../images/Icon-Like.svg";
import dislike from "../images/Icon-DisLike.svg";
import share from "../images/Group 3306.svg";
import copy from "../images/Union.svg";

const TableResponse = ({ data }) => {
  // Render the table based on the data received
  return (
    <>
    <table  className="mytable-d">
      <thead>
        <tr>
          {data.table.columns.map((column, index) => (
            <th key={index}>{column}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.table.data.map((row, rowIndex) => (
          <tr key={rowIndex}>
            {row.map((cell, cellIndex) => (
              <td key={cellIndex}>{cell}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
    
    </>
    
  );
};

export default TableResponse;