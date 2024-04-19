// import React, { useEffect, useState } from 'react';

// const MyTableComponent = () => {
//   const [tableData, setTableData] = useState([]);

//   useEffect(() => {
//     // Parse the JSON string from the backend
//     const jsonData = {
//       "impact_analysis_df": "{\"columns\":[\"BPL1\",\"BPL2\",\"BPL3\",\"Tool\",\"Ticket Count\",\"Key Issues Identified\",\"Business Impact\",\"Recommendations\"],\"index\":[7,9,1,4,10,3,5,8,0,2,6],\"data\":[[\"Upstream Core Operations\",\"Hydrocarbon & Commercial Management\",\"Production Forecasting & Planning\",\"HANA\",11,\"['Access', 'Workflow', 'Data', 'Infrastructure']\",\"['Workflow Disruption', 'Authentication Failure', 'Report Generation Issue', 'Data Inaccuracy', 'System Error', 'Production Delay', 'Data Refresh Issue', 'Communication Breakdown', 'Authentication Failure', 'Report Generation Issue', 'System Error', 'System Downtime']\",\"['Investigate and resolve HANA Index Server crash', 'Investigate and resolve authentication issue', 'Investigate and resolve Costpick error', 'Perform data correction in HANA', 'Investigate and resolve JDBC internal error', 'Create views in production as required', 'Investigate and resolve PowerBI dashboard refresh issue', 'Ensure proper communication channels for IT email list removal', 'Investigate and resolve Spotfire login issue', 'Investigate and resolve Costpick error', 'Investigate and resolve HANA downtime']\"],[\"Upstream Core Operations\",\"Production Operations\",\"Production Ops. Management\",\"PARCView\",10,\"['Access', 'Performance', 'Data', 'Infrastructure']\",\"['User Access Issue', 'Security Breach', 'Process Disruption', 'Site Configuration Error', 'Application Failure', 'Data Trending Issue', 'Application Update Issue', 'Database Connectivity Issue', 'Installation Failure', 'Data Inaccuracy']\",\"['Check user access permissions', 'Investigate and resolve security breach', 'Troubleshoot and fix application issue', 'Check site configuration', 'Resolve application failure', 'Investigate and fix data trending issue', 'Reinstall Parcview application', 'Check database connectivity', 'Reinstall Parcview application', 'Investigate and fix data inaccuracy issue']\"],[\"Non-Hydrocarbon Supply Chain Management\",\"Requisition to Pay\",\"Invoice Processing\",\"Adobe Sign\",8,\"['Access', 'Other']\",\"['Workflow Disruption', 'Productivity Loss', 'Workflow Disruption', 'Workflow Disruption', 'Workflow Disruption', 'Workflow Disruption', 'Workflow Disruption']\",\"['Check and reactivate user accounts', 'Investigate and resolve Access Documented notice', 'Investigate and resolve Access Documented notice', 'Investigate and resolve Adobe Acrobat issues', 'Investigate and resolve Adobe Acrobat signature and save issues', 'Check and reactivate user accounts', 'Investigate and resolve access warnings']\"],[\"Plan & Manage the Enterprise\",\"Enterprise Strategy  & Performance Management\",\"Enterprise Performance Management\",\"Enterprise Connect\",7,\"['Access']\",\"['Productivity Loss', 'Workflow Disruption', 'Data Inaccuracy']\",\"['Provide training on Enterprise Connect usage', 'Ensure Enterprise Connect is installed on all devices', 'Investigate and resolve issues with copying to folders in Enterprise Connect', 'Ensure compatibility of Enterprise Connect with Outlook and Livelink']\"],[\"Upstream Core Operations\",\"Technology & Engineering\",\"Process Engineering\",\"Appian - EWR-PARF (Engineering Work Request-Project Activity Request Form)\",5,\"['Other', 'Access', 'Functionality', 'Workflow', 'Data']\",\"['Workflow Disruption', 'Report Generation Issue', 'Functionality Issue', 'Search Issue', 'Report Generation Issue']\",\"['Investigate and resolve log-in error', 'Provide training on report generation', 'Fix line number and export functionality', 'Investigate and resolve search issue', 'Fix report generation issue for EWR\\/PARF list']\"],[\"Plan & Manage the Enterprise\",\"Business & Competitive Intelligence\",\"Business Intelligence\",\"Power BI\",2,\"['Access']\",\"['Data Inaccuracy', 'Workflow Disruption']\",\"['Check data sources for accuracy', 'Provide clear installation instructions for tablet application']\"],[\"Upstream Core Operations\",\"Asset & Integrity Management\",\"Maintenance Sourcing and Contractor Management\",\"Primavera P6\",2,\"['Access', 'Infrastructure']\",\"['Workflow Disruption', 'Productivity Loss']\",\"['Investigate root cause of P6 downtime and implement measures to prevent future occurrences', 'Ensure timely resolution of access credential issues to minimize impact on project timelines']\"],[\"Upstream Core Operations\",\"Production Operations\",\"Production Ops. Management\",\"DigitCore\",2,\"['Access', 'Infrastructure']\",\"['Workflow Disruption', 'Productivity Loss']\",\"['Investigate and resolve the issue with GeoLogic (CoreSearch) not showing up in Software Center', 'Ensure proper communication and training for users on the new version of Geo Logic Imaging Core Data']\"],[\"Hydrocarbon Supply Chain Management\",\"Loading Operations Management\",\"Measurement & Quality Management\",\"Petrel\",1,\"['Performance']\",\"['Productivity Loss', 'Workflow Disruption']\",\"['Restart Petrel', 'Check for updates', 'Contact support team']\"],[\"Plan & Manage the Enterprise\",\"Business & Competitive Intelligence\",\"Business Intelligence\",\"HANA\",1,\"['Infrastructure']\",\"['Workflow Disruption']\",\"['Investigate root cause of app039 restart issue and implement measures to prevent future occurrences.']\"],[\"Upstream Core Operations\",\"Hydrocarbon & Commercial Management\",\"Production Accounting\",\"PCARD\",1,\"['Access']\",\"['Productivity Loss']\",\"['Implement a self-service password reset option to reduce dependency on IT support for password resets.']\"]]}",
//     };

//     const parsedData = JSON.parse(jsonData.impact_analysis_df);

//     // Extract columns and data
//     const columns = parsedData.columns;
//     const data = parsedData.data;

//     // Combine columns and data into an array of objects
//     const tableDataArray = data.map((row) => {
//       const rowData = {};
//       columns.forEach((column, columnIndex) => {
//         if (["Business Impact", "Key Issues Identified", "Recommendations"].includes(column)) {
//           // Handle JSON array stored as a string
//           const jsonString = row[columnIndex].replace(/'/g, '"'); // Replace single quotes with double quotes
//           try {
//             const jsonArr = JSON.parse(jsonString);
//             rowData[column] = jsonArr.slice(0, 5);
//           } catch (error) {
//             console.error(`Error parsing JSON for column ${column}:`, error);
//             rowData[column] = [];
//           }
//         } else {
//           rowData[column] = row[columnIndex];
//         }
//       });
//       return rowData;
//     });

//     setTableData(tableDataArray);
//   }, []); // Empty dependency array means this effect runs once after the initial render

//   return (
//     <table style={{ color: 'white' }}>
//       <thead>
//         <tr>
//           {Object.keys(tableData[0] || {}).map((column) => (
//             <th key={column}>{column}</th>
//           ))}
//         </tr>
//       </thead>
//       <tbody>
//         {tableData.map((row, rowIndex) => (
//           <tr key={rowIndex}>
//             {Object.values(row).map((cell, index) => (
//               <td key={index}>
//                 {Array.isArray(cell) ? cell.join(', ') : cell}
//               </td>
//             ))}
//           </tr>
//         ))}
//       </tbody>
//     </table>
//   );
// };

// export default MyTableComponent;

import React, { useEffect, useState } from 'react';

const MyTableComponent = () => {
  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    // Parse the JSON string from the backend
    const jsonData = {
      "impact_analysis_df": "{\"columns\":[\"BPL1\",\"BPL2\",\"BPL3\",\"Tool\",\"Ticket Count\",\"Key Issues Identified\",\"Business Impact\",\"Recommendations\"],\"index\":[7,9,1,4,10,3,5,8,0,2,6],\"data\":[[\"Upstream Core Operations\",\"Hydrocarbon & Commercial Management\",\"Production Forecasting & Planning\",\"HANA\",11,\"['Access', 'Workflow', 'Data', 'Infrastructure']\",\"['Workflow Disruption', 'Authentication Failure', 'Report Generation Issue', 'Data Inaccuracy', 'System Error', 'Production Delay', 'Data Refresh Issue', 'Communication Breakdown', 'Authentication Failure', 'Report Generation Issue', 'System Error', 'System Downtime']\",\"['Investigate and resolve HANA Index Server crash', 'Investigate and resolve authentication issue', 'Investigate and resolve Costpick error', 'Perform data correction in HANA', 'Investigate and resolve JDBC internal error', 'Create views in production as required', 'Investigate and resolve PowerBI dashboard refresh issue', 'Ensure proper communication channels for IT email list removal', 'Investigate and resolve Spotfire login issue', 'Investigate and resolve Costpick error', 'Investigate and resolve HANA downtime']\"],[\"Upstream Core Operations\",\"Production Operations\",\"Production Ops. Management\",\"PARCView\",10,\"['Access', 'Performance', 'Data', 'Infrastructure']\",\"['User Access Issue', 'Security Breach', 'Process Disruption', 'Site Configuration Error', 'Application Failure', 'Data Trending Issue', 'Application Update Issue', 'Database Connectivity Issue', 'Installation Failure', 'Data Inaccuracy']\",\"['Check user access permissions', 'Investigate and resolve security breach', 'Troubleshoot and fix application issue', 'Check site configuration', 'Resolve application failure', 'Investigate and fix data trending issue', 'Reinstall Parcview application', 'Check database connectivity', 'Reinstall Parcview application', 'Investigate and fix data inaccuracy issue']\"],[\"Non-Hydrocarbon Supply Chain Management\",\"Requisition to Pay\",\"Invoice Processing\",\"Adobe Sign\",8,\"['Access', 'Other']\",\"['Workflow Disruption', 'Productivity Loss', 'Workflow Disruption', 'Workflow Disruption', 'Workflow Disruption', 'Workflow Disruption', 'Workflow Disruption']\",\"['Check and reactivate user accounts', 'Investigate and resolve Access Documented notice', 'Investigate and resolve Access Documented notice', 'Investigate and resolve Adobe Acrobat issues', 'Investigate and resolve Adobe Acrobat signature and save issues', 'Check and reactivate user accounts', 'Investigate and resolve access warnings']\"],[\"Plan & Manage the Enterprise\",\"Enterprise Strategy  & Performance Management\",\"Enterprise Performance Management\",\"Enterprise Connect\",7,\"['Access']\",\"['Productivity Loss', 'Workflow Disruption', 'Data Inaccuracy']\",\"['Provide training on Enterprise Connect usage', 'Ensure Enterprise Connect is installed on all devices', 'Investigate and resolve issues with copying to folders in Enterprise Connect', 'Ensure compatibility of Enterprise Connect with Outlook and Livelink']\"],[\"Upstream Core Operations\",\"Technology & Engineering\",\"Process Engineering\",\"Appian - EWR-PARF (Engineering Work Request-Project Activity Request Form)\",5,\"['Other', 'Access', 'Functionality', 'Workflow', 'Data']\",\"['Workflow Disruption', 'Report Generation Issue', 'Functionality Issue', 'Search Issue', 'Report Generation Issue']\",\"['Investigate and resolve log-in error', 'Provide training on report generation', 'Fix line number and export functionality', 'Investigate and resolve search issue', 'Fix report generation issue for EWR\\/PARF list']\"],[\"Plan & Manage the Enterprise\",\"Business & Competitive Intelligence\",\"Business Intelligence\",\"Power BI\",2,\"['Access']\",\"['Data Inaccuracy', 'Workflow Disruption']\",\"['Check data sources for accuracy', 'Provide clear installation instructions for tablet application']\"],[\"Upstream Core Operations\",\"Asset & Integrity Management\",\"Maintenance Sourcing and Contractor Management\",\"Primavera P6\",2,\"['Access', 'Infrastructure']\",\"['Workflow Disruption', 'Productivity Loss']\",\"['Investigate root cause of P6 downtime and implement measures to prevent future occurrences', 'Ensure timely resolution of access credential issues to minimize impact on project timelines']\"],[\"Upstream Core Operations\",\"Production Operations\",\"Production Ops. Management\",\"DigitCore\",2,\"['Access', 'Infrastructure']\",\"['Workflow Disruption', 'Productivity Loss']\",\"['Investigate and resolve the issue with GeoLogic (CoreSearch) not showing up in Software Center', 'Ensure proper communication and training for users on the new version of Geo Logic Imaging Core Data']\"],[\"Hydrocarbon Supply Chain Management\",\"Loading Operations Management\",\"Measurement & Quality Management\",\"Petrel\",1,\"['Performance']\",\"['Productivity Loss', 'Workflow Disruption']\",\"['Restart Petrel', 'Check for updates', 'Contact support team']\"],[\"Plan & Manage the Enterprise\",\"Business & Competitive Intelligence\",\"Business Intelligence\",\"HANA\",1,\"['Infrastructure']\",\"['Workflow Disruption']\",\"['Investigate root cause of app039 restart issue and implement measures to prevent future occurrences.']\"],[\"Upstream Core Operations\",\"Hydrocarbon & Commercial Management\",\"Production Accounting\",\"PCARD\",1,\"['Access']\",\"['Productivity Loss']\",\"['Implement a self-service password reset option to reduce dependency on IT support for password resets.']\"]]}",
    };

    const parsedData = JSON.parse(jsonData.impact_analysis_df);

    // Extract columns and data
    const columns = parsedData.columns;
    const data = parsedData.data;

    // Combine columns and data into an array of objects
    const tableDataArray = data.map((row) => {
      const rowData = {};
      columns.forEach((column, columnIndex) => {
        if (["Business Impact", "Key Issues Identified", "Recommendations"].includes(column)) {
          // Handle JSON array stored as a string
          const jsonString = row[columnIndex].replace(/'/g, '"'); // Replace single quotes with double quotes
          try {
            const jsonArr = JSON.parse(jsonString).slice(0, 5);
            const formattedValue = (
              <ul style={{ listStyleType: 'disc', margin: 0, paddingLeft: '1.5em' }}>
                {jsonArr.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            );
            rowData[column] = formattedValue;
          } catch (error) {
            console.error(`Error parsing JSON for column ${column}:`, error);
            rowData[column] = '';
          }
        } else {
          rowData[column] = row[columnIndex];
        }
      });
      return rowData;
    });

    setTableData(tableDataArray);
  }, []); // Empty dependency array means this effect runs once after the initial render// Empty dependency array means this effect runs once after the initial render

  return (
    
        <table style={{ color: 'white' }}>
          <thead>
            <tr>
              {Object.keys(tableData[0] || {}).map((column) => (
                <th key={column}>{column}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {tableData.map((row, rowIndex) => (
              <tr key={rowIndex}>
                {Object.values(row).map((cell, index) => (
                  <td key={index}>
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      );
    };

export default MyTableComponent;


