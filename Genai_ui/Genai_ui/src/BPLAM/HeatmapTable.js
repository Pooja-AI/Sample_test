import React from 'react';

const HeatmapTable = ({ columns, index, data }) => {
  console.log("HeatmapTable entered");
  console.log("columns:", columns);
  console.log("index:", index);

  const orderedList = [
    'Plan & Manage the Enterprise',
    'Upstream Core Operations',
    'Commercial Management',
    'Hydrocarbon Supply Chain Management',
    'Non-Hydrocarbon Supply Chain Management',
    'Enterprise Functions',
    'Others',
    'Total tickets'
  ];

  const filteredColumns = orderedList.filter((col) => columns.includes(col));
  const remainingColumns = columns.filter((col) => !orderedList.includes(col));
  const reorderedColumns = [...filteredColumns, ...remainingColumns];

  const reorderedData = data.map((row) => {
    return reorderedColumns.map((col) => row[columns.indexOf(col)]);
  });

  const cyanColor = [74,72,111];
  const blueColor = [88,86,149];
  const magentaColor = [108,103,195];
  const pinkColor = [139,100,179];
  const redColor = [206,82,136]; // New color for 80-100% range
  const maxColor =[253,72,105];
  const purpleColor = [115, 76, 124];
 

  const totalTicketsRowIndex = index.indexOf('Total tickets');
  const totalTicketsColumnIndex = columns.indexOf('Total tickets');

  function findMinMaxExcludingTotalTickets(
    data,
    totalTicketsRowIndex,
    totalTicketsColumnIndex
  ) {
    const flatData = data.reduce((acc, row, rowIndex) => {
      if (rowIndex !== totalTicketsRowIndex) {
        row.forEach((value, columnIndex) => {
          if (columnIndex !== totalTicketsColumnIndex) {
            acc.push(value);
          }
        });
      }
      return acc;
    }, []);

    const minValue = Math.min(...flatData);
    const maxValue = Math.max(...flatData);

    return { minValue, maxValue };
  }

  const { minValue, maxValue } = findMinMaxExcludingTotalTickets(
    data,
    totalTicketsRowIndex,
    totalTicketsColumnIndex
  );

  const getColorForValue = (value, rowIndex, colIndex) => {
    if (rowIndex === totalTicketsRowIndex || colIndex === totalTicketsColumnIndex) {
      return `rgb(${purpleColor[0]}, ${purpleColor[1]}, ${purpleColor[2]})`;
    }

    const percentage = (value - minValue) / (maxValue - minValue);
    let red, green, blue;

    if (percentage <= 0.2) {
      red = Math.round(cyanColor[0] + (blueColor[0] - cyanColor[0]) * 3 * percentage);
      green = Math.round(cyanColor[1] + (blueColor[1] - cyanColor[1]) * 3 * percentage);
      blue = Math.round(cyanColor[2] + (blueColor[2] - cyanColor[2]) * 3 * percentage);
    } else if (percentage <= 0.4) {
      red = Math.round(blueColor[0] + (magentaColor[0] - blueColor[0]) * 3 * (percentage - 0.2));
      green = Math.round(blueColor[1] + (magentaColor[1] - blueColor[1]) * 3 * (percentage - 0.2));
      blue = Math.round(blueColor[2] + (magentaColor[2] - blueColor[2]) * 3 * (percentage - 0.2));
    } else if (percentage <= 0.6) {
      red = Math.round(magentaColor[0] + (pinkColor[0] - magentaColor[0]) * 3 * (percentage - 0.4));
      green = Math.round(magentaColor[1] + (pinkColor[1] - magentaColor[1]) * 3 * (percentage - 0.4));
      blue = Math.round(magentaColor[2] + (pinkColor[2] - magentaColor[2]) * 3 * (percentage - 0.4));
    } else if (percentage <= 0.8) {
      red = Math.round(pinkColor[0] + (redColor[0] - pinkColor[0]) * 3 * (percentage - 0.6));
      green = Math.round(pinkColor[1] + (redColor[1] - pinkColor[1]) * 3 * (percentage - 0.6));
      blue = Math.round(pinkColor[2] + (redColor[2] - pinkColor[2]) * 3 * (percentage - 0.6));
    } else {
      // red = redColor[0];
      // green = redColor[1];
      // blue = redColor[2];
      red = Math.round(redColor[0] + (maxColor[0] - redColor[0]) * 3 * (percentage - 0.8));
      green = Math.round(redColor[1] + (maxColor[1] - redColor[1]) * 3 * (percentage - 0.8));
      blue = Math.round(redColor[2] + (maxColor[2] - redColor[2]) * 3 * (percentage - 0.8));
    }

    return `rgb(${red}, ${green}, ${blue})`;
  };

  const breakAfterTwoWords = (str) => {
    const words = str.split(' ');
    if (words.length > 2) {
      return words.slice(0, 2).join(' ') + '<br/>' + words.slice(2).join(' ');
    }
    return str;
  };

  return (
    <table className='heatmap-table'>
      <thead>
        <tr>
          <th className='heatmap-table-th'>Issue Type</th>
          {reorderedColumns.map((col, colIndex) => (
            <th className='heatmap-table-th' key={colIndex} dangerouslySetInnerHTML={{ __html: breakAfterTwoWords(col) }}style={{fontWeight:'500',padding:'8px 8px'}}></th>
          ))}
        </tr>
      </thead>
      <tbody>
        {index.map((rowHeader, rowIndex) => (
          <tr key={rowIndex}>
            <td className='heatmap-table-td1'>{rowHeader}</td>
            {reorderedData[rowIndex].map((cellValue, cellIndex) => {
              const colName = reorderedColumns[cellIndex];
              if (colName) {
                return (
                  <td
                    className='heatmap-table-td'
                    key={cellIndex}
                    style={{ backgroundColor: getColorForValue(cellValue, rowIndex, cellIndex) }}
                  >
                    {cellValue}
                  </td>
                );
              }
              return null;
            })}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default HeatmapTable;

