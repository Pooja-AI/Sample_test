// Tabs.js
// import React, { useState } from 'react';
import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
//import { useTable } from 'react-table';
// import 'react-table-heatmap/dist/index.css';
// import { useNavigate } from 'react-router-dom';
import JSONTable from './JSONTable';
// import JSONTable from './JsonInsightsFilter';
import HeatmapTable from './HeatmapTable';
import MultiLevelBarChart from './NestedBarChart';
import MyTableComponent from './myTable'
import MultilevelPieChart from './MultilevelPieChart';
import Example from './RootCauseAnalysis';
// import FishboneChart from './RootCauseAnalysis';
import HorizontalBarChart from './HorizontalBarChart';
import pheader from '../images/Primary Header.svg';
import topimage from '../images/Group 3000.svg';
import Tab from './Tab';
import upperimage from '../images/Rectangle 610.svg';
import t1 from '../images/calendar_month.svg';
import t2 from '../images/confirmation_number.svg';
import t3 from '../images/settings.svg';
import Info from './Infobplam';

// import  jsonResponse  from './App';
// import TabsScreen from './TabsScreen';
// const jsonData={

//     "message": "success",
//     "response": {
//         "date_range": {
//             "end": "08-Nov-21",
//             "start": "26-Mar-21"
//         },
//         "drilldowns":"{\"columns\":[\"Level\",\"PID\",\"Name\",\"Count\"],\"index\":[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,67,68,69,70,71,72,73,74,75,76,77,78,79,80,81,82,83,84,85,86,87,88,89,90,91,92,93,94,95,96,97,98,99,100,101,102,103,104,105,106,107,108,109,110,111,112,113,114,115,116,117,118,119,120,121,122,123,124,125,126,127,128,129,130,131,132,133,134,135,136,137,138,139,140,141,142,143,144,145,146,147,148,149,150,151,152,153,154,155,156,157,158,159,160,161,162,163,164,165,166,167,168,169,170,171,172,173,174,175,176,177,178,179,180,181,182,183,184,185,186,187,188,189,190,191,192,193,194,195,196],\"data\":[[\"l1\",\"1\",\"Plan & Manage the Enterprise\",0],[\"l2\",\"1.1\",\"Enterprise Strategy  & Performance Management\",0],[\"l3\",\"1.1.1\",\"Enterprise Strategy Management\",0],[\"l3\",\"1.1.2\",\"Enterprise Performance Management\",0],[\"l3\",\"1.1.3\",\"Enterprise EH&S Strategy Management\",0],[\"l2\",\"1.2\",\"Portfolio Management\",0],[\"l3\",\"1.2.1\",\"Portfolio Strategy Management\",0],[\"l3\",\"1.2.2\",\"Portfolio Assessment & Controlling\",0],[\"l3\",\"1.2.3\",\"Opportunity Identification & Management\",0],[\"l2\",\"1.3\",\"Enterprise Risk Management\",0],[\"l3\",\"1.3.1\",\"Financial Risk Management\",0],[\"l3\",\"1.3.2\",\"Non-Financial Risk Management\",0],[\"l3\",\"1.3.3\",\"Insurance Management\",0],[\"l3\",\"1.3.4\",\"EH&S Governance\",0],[\"l2\",\"1.4\",\"Stakeholder Relationship Management\",0],[\"l3\",\"1.4.1\",\"Stakeholder Identification\",0],[\"l3\",\"1.4.2\",\"Stakeholder Interaction\",0],[\"l2\",\"1.5\",\"Business & Competitive Intelligence\",0],[\"l3\",\"1.5.1\",\"Business Intelligence\",0],[\"l3\",\"1.5.2\",\"Competitive Intelligence\",0],[\"l1\",\"2\",\"Upstream Core Operations\",1],[\"l2\",\"2.1\",\"Exploration Management\",0],[\"l3\",\"2.1.1\",\"Basin Evaluation\",0],[\"l3\",\"2.1.2\",\"Seismic Acquisition & Processing\",0],[\"l3\",\"2.1.3\",\"Exploration Data Interpretation\",0],[\"l3\",\"2.1.4\",\"Geological Interpretation\",0],[\"l2\",\"2.2\",\"Wells & Field Development\",0],[\"l3\",\"2.2.1\",\"Well Design\",0],[\"l3\",\"2.2.2\",\"Well Planning & Performance Mgmt\",0],[\"l3\",\"2.2.3\",\"Well Operations\",0],[\"l2\",\"2.3\",\"Production Operations\",0],[\"l3\",\"2.3.1\",\"Production Ops. Activities\",0],[\"l3\",\"2.3.2\",\"Production Ops. Engineering\",0],[\"l3\",\"2.3.3\",\"Production Ops. Management\",0],[\"l3\",\"2.3.4\",\"Reservoir Engineering\",0],[\"l3\",\"2.3.5\",\"Integrated Gas Operations\",0],[\"l2\",\"2.4\",\"Technology & Engineering\",0],[\"l3\",\"2.4.1\",\"Research & Development\",0],[\"l3\",\"2.4.2\",\"Engineering Management\",0],[\"l3\",\"2.4.3\",\"Process Engineering\",0],[\"l3\",\"2.4.4\",\"Project Engineering\",0],[\"l3\",\"2.4.5\",\"Process Automation\",0],[\"l3\",\"2.4.6\",\"Technical Knowledge Management\",0],[\"l2\",\"2.5\",\"Decommissioning\",0],[\"l3\",\"2.5.1\",\"Late Life and Decom Planning\",0],[\"l3\",\"2.5.2\",\"Decom Preparation\",0],[\"l3\",\"2.5.3\",\"Removal & Disposal\",0],[\"l3\",\"2.5.4\",\"Continuing Liability\",0],[\"l2\",\"2.6\",\"Hydrocarbon & Commercial Management\",0],[\"l3\",\"2.6.1\",\"Integrated Business Planning\",0],[\"l3\",\"2.6.2\",\"Production Forecasting & Planning\",0],[\"l3\",\"2.6.3\",\"Production Accounting\",0],[\"l3\",\"2.6.4\",\"Ownership\",0],[\"l3\",\"2.6.5\",\"Revenue Accounting Management\",0],[\"l2\",\"2.7\",\"Asset & Integrity Management\",1],[\"l3\",\"2.7.1\",\"Maintenance Strategy Definition\",0],[\"l3\",\"2.7.2\",\"Maintenance Sourcing and Contractor Management\",0],[\"l3\",\"2.7.3\",\"Equipment Strategy Development\",0],[\"l3\",\"2.7.4\",\"Maintenance Planning & Scheduling\",0],[\"l3\",\"2.7.5\",\"Maintenance Execution\",0],[\"l3\",\"2.7.6\",\"Work & Asset Performance Monitoring\",1],[\"l3\",\"2.7.7\",\"Turnaround & Shutdown Management\",0],[\"l2\",\"2.8\",\"Health, Safety, Security and Environment (HSSE)\",0],[\"l3\",\"2.8.1\",\"HSSE Compliance Management\",0],[\"l3\",\"2.8.2\",\"Industrial Health and Occupational Safety Management\",0],[\"l3\",\"2.8.3\",\"Process Safety Management\",0],[\"l3\",\"2.8.4\",\"Personnel Safety Management\",0],[\"l3\",\"2.8.5\",\"Product Stewardship Management\",0],[\"l3\",\"2.8.6\",\"Environmental Management\",0],[\"l3\",\"2.8.7\",\"HSSE Risk Management\",0],[\"l3\",\"2.8.8\",\"HSSE Strategy and Planning\",0],[\"l3\",\"2.8.9\",\"Security Management\",0],[\"l1\",\"4\",\"Commercial Management\",0],[\"l2\",\"4.1\",\"Trading and Contract Management\",0],[\"l3\",\"4.1.1\",\"Market Analysis\",0],[\"l3\",\"4.1.2\",\"Trade Capture & Execution\",0],[\"l3\",\"4.1.3\",\"Position Management\",0],[\"l3\",\"4.1.4\",\"Portfolio Management\",0],[\"l3\",\"4.1.5\",\"Contract & Customer Management\",0],[\"l2\",\"4.2\",\"Commodity Risk Management\",0],[\"l3\",\"4.2.1\",\"Business Control\",0],[\"l3\",\"4.2.2\",\"Delegation of Authority\",0],[\"l3\",\"4.2.3\",\"Market Risk Management\",0],[\"l3\",\"4.2.4\",\"Credit Risk Management\",0],[\"l3\",\"4.2.5\",\"Regulatory Reporting\",0],[\"l2\",\"4.3\",\"Scheduling and Logistics Contract Management \– Pipelines\",0],[\"l3\",\"4.3.1\",\"Schedule & Confirm nomination\",0],[\"l3\",\"4.3.2\",\"Transport Agreement Management\",0],[\"l3\",\"4.3.3\",\"Imbalance Management\",0],[\"l3\",\"4.3.4\",\"Secondary Cost \/ Rates & Fees\",0],[\"l3\",\"4.3.5\",\"Pipeline Position Management\",0],[\"l2\",\"4.4\",\"Scheduling and Logistics Contract Management \– Bulk Movement\",0],[\"l3\",\"4.4.1\",\"Schedule & Confirm nomination\",0],[\"l3\",\"4.4.2\",\"Transport Agreement Management\",0],[\"l3\",\"4.4.3\",\"Freight Management\",0],[\"l3\",\"4.4.4\",\"Claim Management\/ Demurrage\",0],[\"l2\",\"4.5\",\"Settlement & Accounting\",0],[\"l3\",\"4.5.1\",\"Settlement\",0],[\"l3\",\"4.5.2\",\"Accounting\",0],[\"l3\",\"4.5.3\",\"Confirmation\",0],[\"l1\",\"5\",\"Hydrocarbon Supply Chain Management\",2],[\"l2\",\"5.1\",\"Storage Operations Management\",0],[\"l3\",\"5.1.1\",\"Planning & Scheduling\",0],[\"l3\",\"5.1.2\",\"Storage\/ Transportion\",0],[\"l2\",\"5.2\",\"Loading Operations Management\",2],[\"l3\",\"5.2.1\",\"Custody transfer\",0],[\"l3\",\"5.2.2\",\"Measurement & Quality Management\",2],[\"l1\",\"8\",\"Non-Hydrocarbon Supply Chain Management\",0],[\"l2\",\"8.1\",\"Supply Chain Strategy\",0],[\"l3\",\"8.1.1\",\"Strategy Development & Deployment\",0],[\"l3\",\"8.1.2\",\"Monitoring & Improvement of End to End Execution\",0],[\"l2\",\"8.2\",\"Requirements Planning\",0],[\"l3\",\"8.2.1\",\"Planning Master Data Management\",0],[\"l3\",\"8.2.2\",\"Capital Project Requirements Planning\",0],[\"l3\",\"8.2.3\",\"MRO \/ Spare Parts Requirements Planning\",0],[\"l3\",\"8.2.4\",\"Inventory & Transportation Planning\",0],[\"l3\",\"8.2.5\",\"Integrate Demand & Supply Plans\",0],[\"l3\",\"8.2.6\",\"Repairs & Disposition Planning\",0],[\"l2\",\"8.3\",\"Sourcing & Procurement\",0],[\"l3\",\"8.3.1\",\"Develop & Maintain Procurement Strategy\",0],[\"l3\",\"8.3.2\",\"Source & Manage Categories\",0],[\"l3\",\"8.3.3\",\"Capital Project Sourcing\",0],[\"l3\",\"8.3.4\",\"Manage Supplier Contracts\",0],[\"l3\",\"8.3.5\",\"Manage Supplier Relationships\",0],[\"l3\",\"8.3.6\",\"Manage Procurement Master Data\",0],[\"l2\",\"8.4\",\"Warehousing & logistics\",0],[\"l3\",\"8.4.1\",\"Fulfillment Strategy\",0],[\"l3\",\"8.4.2\",\"Inventory Management\",0],[\"l3\",\"8.4.3\",\"Transportation Management\",0],[\"l3\",\"8.4.4\",\"Warehousing & Distribution Operations Management\",0],[\"l3\",\"8.4.5\",\"Network Optimization\",0],[\"l2\",\"8.5\",\"Requisition to Pay\",0],[\"l3\",\"8.5.1\",\"Requisition Creation\",0],[\"l3\",\"8.5.2\",\"Tactical Sourcing\",0],[\"l3\",\"8.5.3\",\"Order Execution\",0],[\"l3\",\"8.5.4\",\"Receipt Processing\",0],[\"l3\",\"8.5.5\",\"Procurement Card Processing\",0],[\"l3\",\"8.5.6\",\"Invoice Processing\",0],[\"l2\",\"8.6\",\"Contractor Management\",0],[\"l3\",\"8.6.1\",\"Contractor Sourcing & Procurement Management\",0],[\"l3\",\"8.6.2\",\"Pre-Onboard Management\",0],[\"l3\",\"8.6.3\",\"Onboard Contractor Management\",0],[\"l3\",\"8.6.4\",\"Contractor Travel & Accomodation Management\",0],[\"l3\",\"8.6.5\",\"Work and Performance Management\",0],[\"l3\",\"8.6.6\",\"Demobilization & Contract Closeout\",0],[\"l1\",\"16\",\"Enterprise Functions\",2],[\"l2\",\"16.1\",\"Business Process Lifecycle Management\",1],[\"l3\",\"16.1.1\",\"Process Strategy Management\",0],[\"l3\",\"16.1.2\",\"Process Lifecycle Management\",0],[\"l3\",\"16.1.3\",\"Process IT Management\",0],[\"l3\",\"16.1.4\",\"Process Change Management\",0],[\"l3\",\"16.1.5\",\"BPM Delivery\",0],[\"l3\",\"16.1.6\",\"BPM Methods and Tools\",1],[\"l3\",\"16.1.7\",\"BPM Operations\",0],[\"l3\",\"16.1.8\",\"BPM Support\",0],[\"l3\",\"16.1.9\",\"BPM Transformation\",0],[\"l2\",\"16.2\",\"Information Technology\",0],[\"l3\",\"16.2.1\",\"Service Strategy\",0],[\"l3\",\"16.2.2\",\"Service Development\",0],[\"l3\",\"16.2.3\",\"Service Management & Operations\",0],[\"l3\",\"16.2.4\",\"IT Management\",0],[\"l3\",\"16.2.5\",\"Business\/Customer Relationship Management\",0],[\"l3\",\"16.2.6\",\"Service Transition\",0],[\"l3\",\"16.2.7\",\"Supplier Relationship Management\",0],[\"l2\",\"16.3\",\"Cybersecurity\",0],[\"l3\",\"16.3.1\",\"Security Governance\",0],[\"l3\",\"16.3.2\",\"Security Architecture\",0],[\"l3\",\"16.3.3\",\"Security Operations\",0],[\"l2\",\"16.4\",\"Human Resources & Knowledge Management\",0],[\"l3\",\"16.4.1\",\"Organization Management\",0],[\"l3\",\"16.4.2\",\"Talent Management\",0],[\"l3\",\"16.4.3\",\"HR Service & Administration\",0],[\"l3\",\"16.4.4\",\"HR Operations & Support\",0],[\"l2\",\"16.5\",\"Finance & Accounts\",0],[\"l3\",\"16.5.1\",\"General Accounting & Reporting (Record to Report)\",0],[\"l3\",\"16.5.2\",\"Fixed Asset Accounting\",0],[\"l3\",\"16.5.3\",\"Purchase to Pay\",0],[\"l3\",\"16.5.4\",\"Travel & Expenses Reimbursements (T&E)\",0],[\"l3\",\"16.5.5\",\"Order to Cash\",0],[\"l3\",\"16.5.6\",\"Product Costing & Inventory Accounting\",0],[\"l3\",\"16.5.7\",\"Payroll (See HP Model)\",0],[\"l3\",\"16.5.8\",\"Maintain Finance System & Data Structures\",0],[\"l2\",\"16.6\",\"Data & Information Management\",1],[\"l3\",\"16.6.1\",\"Data Governance Management\",0],[\"l3\",\"16.6.2\",\"Data Structure Management\",0],[\"l3\",\"16.6.3\",\"Data Architecture Management\",0],[\"l3\",\"16.6.4\",\"Master Data & Meta Data Management\",0],[\"l3\",\"16.6.5\",\"Data Quality Management\",1],[\"l3\",\"16.6.6\",\"Data Security Management\",0],[\"l2\",\"16.7\",\"Physical Infrastructure Management\",0],[\"l3\",\"16.7.1\",\"Physical Infrastructure Strategy Management\",0],[\"l3\",\"16.7.2\",\"Physical Infrastructure Operations\",0],[\"l2\",\"16.8\",\"Compliance Management & Support\",0],[\"l3\",\"16.8.1\",\"Legal Services & Administration\",0],[\"l3\",\"16.8.2\",\"Legal Operations & Support\",0],[\"l3\",\"16.8.3\",\"EH&S Support Services\",0],[\"l1\",0,\"Others\",0]]}",
//         "heat_map_table": "{\"columns\":[\"Enterprise Functions\",\"Hydrocarbon Supply Chain Management\",\"Upstream Core Operations\",\"Total tickets\"],\"index\":[\"Access\",\"Total tickets\"],\"data\":[[2.0,2.0,1.0,5.0],[2.0,2.0,1.0,5.0]]}",
//         "top_10_noisy_apps": {
//             "Application Lifecycle Management (ALM)": 1,
//             "Content Server 10.5": 1,
//             "Energy Components - Conventional": 1,
//             "HDMS - OpenText": 1,
//             "Synchrowave ( )": 1
//         },
//         "total_apps": 5,
//         "total_tickets": 5
//     },
//     "status_code": 200

// }

const Tabs = () => {
  // ,{ state: { jsonResponse } }
  // const jsonResponse = require('./App');
  console.log("Tabs.js")

  const [activeTab, setActiveTab] = useState(1);
  //   const [jsonData, setJsonData] = useState(response);
  const navigate = useNavigate();
  //const { jsonResponse1, jsonResponse2 } = location.state;
  const [jsonResponse2, setJsonResponse2] = useState(null);
  const [jsonResponse3, setJsonResponse3] = useState(null);
  const [jsonResponse, setJsonResponse] = useState(null);
  const location = useLocation();
  const [heatmapData, setHeatmapData] = useState(null);
  const [NestedData, setNestedData] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const handleToggleModal = () => {
    setShowModal(!showModal);
  };
  const nesteddata = [
    {
      "label": "Category 1",
      "value": 10,
      "nestedData": [
        {
          "label": "Subcategory 1.1",
          "value": 5,
          "nestedData": [
            {
              "label": "Subsubcategory 1.1.1",
              "value": 3
            },
            {
              "label": "Subsubcategory 1.1.2",
              "value": 2
            }
          ]
        },
        {
          "label": "Subcategory 1.2",
          "value": 5,
          "nestedData": [
            {
              "label": "Subsubcategory 1.2.1",
              "value": 2
            },
            {
              "label": "Subsubcategory 1.2.2",
              "value": 3
            }
          ]
        }
      ]
    },
    {
      "label": "Category 2",
      "value": 8,
      "nestedData": [
        {
          "label": "Subcategory 2.1",
          "value": 4,
          "nestedData": [
            {
              "label": "Subsubcategory 2.1.1",
              "value": 2
            },
            {
              "label": "Subsubcategory 2.1.2",
              "value": 2
            }
          ]
        },
        {
          "label": "Subcategory 2.2",
          "value": 4,
          "nestedData": [
            {
              "label": "Subsubcategory 2.2.1",
              "value": 3
            },
            {
              "label": "Subsubcategory 2.2.2",
              "value": 1
            }
          ]
        }
      ]
    }
  ];
  const nesteddata2 = [
    {
      "label": "Plan & Manage the Enterprise",
      "value": 2,
      "pid": "1",
      "level2": [
        {
          "label": "Enterprise Strategy  & Performance Management",
          "value": 2,
          "pid": "1.1",
          "level3": [
            {
              "label": "Enterprise Strategy Management",
              "value": 2,
              "pid": "1.1.1"
            },
            {
              "label": "Enterprise Performance Management",
              "value": 2,
              "pid": "1.1.2"
            },
            {
              "label": "Enterprise EH&S Strategy Management",
              "value": 2,
              "pid": "1.1.3"
            }
          ]
        },
        {
          "label": "Portfolio Management",
          "value": 2,
          "pid": "1.2",
          "level3": [
            {
              "label": "Portfolio Strategy Management",
              "value": 2,
              "pid": "1.2.1"
            },
            {
              "label": "Portfolio Assessment & Controlling",
              "value": 2,
              "pid": "1.2.2"
            },
            {
              "label": "Opportunity Identification & Management",
              "value": 2,
              "pid": "1.2.3"
            }
          ]
        },
        {
          "label": "Enterprise Risk Management",
          "value": 2,
          "pid": "1.3",
          "level3": [
            {
              "label": "Financial Risk Management",
              "value": 2,
              "pid": "1.3.1"
            },
            {
              "label": "Non-Financial Risk Management",
              "value": 2,
              "pid": "1.3.2"
            },
            {
              "label": "Insurance Management",
              "value": 2,
              "pid": "1.3.3"
            },
            {
              "label": "EH&S Governance",
              "value": 2,
              "pid": "1.3.4"
            }
          ]
        },
        {
          "label": "Stakeholder Relationship Management",
          "value": 2,
          "pid": "1.4",
          "level3": [
            {
              "label": "Stakeholder Identification",
              "value": 2,
              "pid": "1.4.1"
            },
            {
              "label": "Stakeholder Interaction",
              "value": 2,
              "pid": "1.4.2"
            }
          ]
        },
        {
          "label": "Business & Competitive Intelligence",
          "value": 2,
          "pid": "1.5",
          "level3": [
            {
              "label": "Business Intelligence",
              "value": 2,
              "pid": "1.5.1"
            },
            {
              "label": "Competitive Intelligence",
              "value": 2,
              "pid": "1.5.2"
            }
          ]
        }
      ]
    },
    {
      "label": "Upstream Core Operations",
      "value": 1,
      "pid": "2",
      "level2": [
        {
          "label": "Exploration Management",
          "value": 2,
          "pid": "2.1",
          "level3": [
            {
              "label": "Basin Evaluation",
              "value": 2,
              "pid": "2.1.1"
            },
            {
              "label": "Seismic Acquisition & Processing",
              "value": 2,
              "pid": "2.1.2"
            },
            {
              "label": "Exploration Data Interpretation",
              "value": 2,
              "pid": "2.1.3"
            },
            {
              "label": "Geological Interpretation",
              "value": 2,
              "pid": "2.1.4"
            }
          ]
        },
        {
          "label": "Wells & Field Development",
          "value": 2,
          "pid": "2.2",
          "level3": [
            {
              "label": "Well Design",
              "value": 2,
              "pid": "2.2.1"
            },
            {
              "label": "Well Planning & Performance Mgmt",
              "value": 2,
              "pid": "2.2.2"
            },
            {
              "label": "Well Operations",
              "value": 2,
              "pid": "2.2.3"
            }
          ]
        },
        {
          "label": "Production Operations",
          "value": 1,
          "pid": "2.3",
          "level3": [
            {
              "label": "Production Ops. Activities",
              "value": 2,
              "pid": "2.3.1"
            },
            {
              "label": "Production Ops. Engineering",
              "value": 2,
              "pid": "2.3.2"
            },
            {
              "label": "Production Ops. Management",
              "value": 2,
              "pid": "2.3.3"
            },
            {
              "label": "Reservoir Engineering",
              "value": 2,
              "pid": "2.3.4"
            },
            {
              "label": "Integrated Gas Operations",
              "value": 1,
              "pid": "2.3.5"
            }
          ]
        },
        {
          "label": "Technology & Engineering",
          "value": 2,
          "pid": "2.4",
          "level3": [
            {
              "label": "Research & Development",
              "value": 2,
              "pid": "2.4.1"
            },
            {
              "label": "Engineering Management",
              "value": 2,
              "pid": "2.4.2"
            },
            {
              "label": "Process Engineering",
              "value": 2,
              "pid": "2.4.3"
            },
            {
              "label": "Project Engineering",
              "value": 2,
              "pid": "2.4.4"
            },
            {
              "label": "Process Automation",
              "value": 2,
              "pid": "2.4.5"
            },
            {
              "label": "Technical Knowledge Management",
              "value": 2,
              "pid": "2.4.6"
            }
          ]
        },
        {
          "label": "Decommissioning",
          "value": 2,
          "pid": "2.5",
          "level3": [
            {
              "label": "Late Life and Decom Planning",
              "value": 2,
              "pid": "2.5.1"
            },
            {
              "label": "Decom Preparation",
              "value": 2,
              "pid": "2.5.2"
            },
            {
              "label": "Removal & Disposal",
              "value": 2,
              "pid": "2.5.3"
            },
            {
              "label": "Continuing Liability",
              "value": 2,
              "pid": "2.5.4"
            }
          ]
        },
        {
          "label": "Hydrocarbon & Commercial Management",
          "value": 2,
          "pid": "2.6",
          "level3": [
            {
              "label": "Integrated Business Planning",
              "value": 2,
              "pid": "2.6.1"
            }
          ]
        }
      ]
    }
  ];
  const nesteddata3 = [
    {
      "label": "Plan & Manage the Enterprise",
      "value": 10,
      "pid": "1",
      "level2": [
        {
          "label": "Enterprise Strategy  & Performance Management",
          "value": 10,
          "pid": "1.1",
          "level3": [
            {
              "label": "Enterprise Strategy Management",
              "value": 0,
              "pid": "1.1.1"
            },
            {
              "label": "Enterprise Performance Management",
              "value": 10,
              "pid": "1.1.2"
            },
            {
              "label": "Enterprise EH&S Strategy Management",
              "value": 0,
              "pid": "1.1.3"
            }
          ]
        },
        {
          "label": "Portfolio Management",
          "value": 0,
          "pid": "1.2",
          "level3": [
            {
              "label": "Portfolio Strategy Management",
              "value": 0,
              "pid": "1.2.1"
            },
            {
              "label": "Portfolio Assessment & Controlling",
              "value": 0,
              "pid": "1.2.2"
            },
            {
              "label": "Opportunity Identification & Management",
              "value": 0,
              "pid": "1.2.3"
            }
          ]
        },
        {
          "label": "Enterprise Risk Management",
          "value": 0,
          "pid": "1.3",
          "level3": [
            {
              "label": "Financial Risk Management",
              "value": 0,
              "pid": "1.3.1"
            },
            {
              "label": "Non-Financial Risk Management",
              "value": 0,
              "pid": "1.3.2"
            },
            {
              "label": "Insurance Management",
              "value": 0,
              "pid": "1.3.3"
            },
            {
              "label": "EH&S Governance",
              "value": 0,
              "pid": "1.3.4"
            }
          ]
        },
        {
          "label": "Stakeholder Relationship Management",
          "value": 0,
          "pid": "1.4",
          "level3": [
            {
              "label": "Stakeholder Identification",
              "value": 0,
              "pid": "1.4.1"
            },
            {
              "label": "Stakeholder Interaction",
              "value": 0,
              "pid": "1.4.2"
            }
          ]
        },
        {
          "label": "Business & Competitive Intelligence",
          "value": 0,
          "pid": "1.5",
          "level3": [
            {
              "label": "Business Intelligence",
              "value": 0,
              "pid": "1.5.1"
            },
            {
              "label": "Competitive Intelligence",
              "value": 0,
              "pid": "1.5.2"
            }
          ]
        }
      ]
    },
    {
      "label": "Upstream Core Operations",
      "value": 23,
      "pid": "2",
      "level2": [
        {
          "label": "Exploration Management",
          "value": 6,
          "pid": "2.1",
          "level3": [
            {
              "label": "Basin Evaluation",
              "value": 0,
              "pid": "2.1.1"
            },
            {
              "label": "Seismic Acquisition & Processing",
              "value": 0,
              "pid": "2.1.2"
            },
            {
              "label": "Exploration Data Interpretation",
              "value": 6,
              "pid": "2.1.3"
            },
            {
              "label": "Geological Interpretation",
              "value": 0,
              "pid": "2.1.4"
            }
          ]
        },
        {
          "label": "Wells & Field Development",
          "value": 0,
          "pid": "2.2",
          "level3": [
            {
              "label": "Well Design",
              "value": 0,
              "pid": "2.2.1"
            },
            {
              "label": "Well Planning & Performance Mgmt",
              "value": 0,
              "pid": "2.2.2"
            },
            {
              "label": "Well Operations",
              "value": 0,
              "pid": "2.2.3"
            }
          ]
        },
        {
          "label": "Production Operations",
          "value": 11,
          "pid": "2.3",
          "level3": [
            {
              "label": "Production Ops. Activities",
              "value": 0,
              "pid": "2.3.1"
            },
            {
              "label": "Production Ops. Engineering",
              "value": 1,
              "pid": "2.3.2"
            },
            {
              "label": "Production Ops. Management",
              "value": 3,
              "pid": "2.3.3"
            },
            {
              "label": "Reservoir Engineering",
              "value": 1,
              "pid": "2.3.4"
            },
            {
              "label": "Integrated Gas Operations",
              "value": 6,
              "pid": "2.3.5"
            }
          ]
        },
        {
          "label": "Technology & Engineering",
          "value": 1,
          "pid": "2.4",
          "level3": [
            {
              "label": "Research & Development",
              "value": 0,
              "pid": "2.4.1"
            },
            {
              "label": "Engineering Management",
              "value": 0,
              "pid": "2.4.2"
            },
            {
              "label": "Process Engineering",
              "value": 1,
              "pid": "2.4.3"
            },
            {
              "label": "Project Engineering",
              "value": 0,
              "pid": "2.4.4"
            },
            {
              "label": "Process Automation",
              "value": 0,
              "pid": "2.4.5"
            },
            {
              "label": "Technical Knowledge Management",
              "value": 0,
              "pid": "2.4.6"
            }
          ]
        },
        {
          "label": "Decommissioning",
          "value": 0,
          "pid": "2.5",
          "level3": [
            {
              "label": "Late Life and Decom Planning",
              "value": 0,
              "pid": "2.5.1"
            },
            {
              "label": "Decom Preparation",
              "value": 0,
              "pid": "2.5.2"
            },
            {
              "label": "Removal & Disposal",
              "value": 0,
              "pid": "2.5.3"
            },
            {
              "label": "Continuing Liability",
              "value": 0,
              "pid": "2.5.4"
            }
          ]
        },
        {
          "label": "Hydrocarbon & Commercial Management",
          "value": 2,
          "pid": "2.6",
          "level3": [
            {
              "label": "Integrated Business Planning",
              "value": 0,
              "pid": "2.6.1"
            }
          ]
        }
      ]
    }
  ];

  const fishboneData = {
    categories: ['Category A', 'Category B', 'Category C'],
    causes: [
      { name: 'Cause 1', categoryIndex: 0 },
      { name: 'Cause 2', categoryIndex: 1 },
      { name: 'Cause 3', categoryIndex: 2 },
    ],
  };

  // const { heat_map_table } = jsonResponse.response;
  useEffect(() => {
    // Check if state is available in the location
    if (location.state && location.state.jsonResponse2) {

      setJsonResponse2(location.state.jsonResponse2);
      console.log(jsonResponse2);

    } else {
      // Handle the case where jsonResponse is not available
      console.error('No jsonResponse found in location state');
    }
  }, [location.state]);
  console.log(jsonResponse2);


  useEffect(() => {
    // Check if state is available in the location
    if (location.state && location.state.jsonResponse3) {

      setJsonResponse3(location.state.jsonResponse3);
      console.log(jsonResponse3);

    } else {
      // Handle the case where jsonResponse is not available
      console.error('No jsonResponse found in location state');
    }
  }, [location.state]);
  console.log(jsonResponse3);



  useEffect(() => {
    // Check if state is available in the location
    if (location.state && location.state.jsonResponse) {

      setJsonResponse(location.state.jsonResponse);
      console.log(jsonResponse);

    } else {
      // Handle the case where jsonResponse is not available
      console.error('No jsonResponse found in location state');
    }
  }, [location.state]);
  console.log(jsonResponse);
  // Assuming this code is inside your component (e.g., Tabs.js)

  // Check if jsonResponse is not null
  // if (jsonResponse && jsonResponse.response) {
  //   const heatmapDataString = jsonResponse.response.heat_map_table;
  //   const heatmapData = JSON.parse(heatmapDataString);

  //   // Check if heatmapData is not null
  //   if (heatmapData) {
  //     // Now you can safely use heatmapData
  //     // ... rest of your code ...

  //     console.log(heatmapData);
  //     // const columns = heatmapData['columns'];
  //     // console.log(columns);
  //     const columns = heatmapData.columns;
  //     console.log(columns);
  //   const index = heatmapData.index;
  //   console.log(index);
  //   const data = heatmapData.data;
  //   console.log(data);
  //   console.log(heatmapData,columns,index,data);
  //   } else {
  //     console.error("Heatmap data is null.");
  //   }
  // } else {
  //   console.error("Invalid JSON response.");
  // }

  // const heatmapData = jsonResponse.response.heat_map_table;
  // const columns = heatmapData.columns;
  // const index = heatmapData.index;
  // const data = heatmapData.data;
  // console.log(heatmapData,columns,index,data);
  useEffect(() => {
    if (jsonResponse && jsonResponse.response) {
      const heatmapDataString = jsonResponse.response.heat_map_table;

      // Parse the JSON string into a JavaScript object
      const parsedHeatmapData = JSON.parse(heatmapDataString);

      // Check if parsedHeatmapData is not null
      if (parsedHeatmapData) {
        // Now you can safely use parsedHeatmapData
        setHeatmapData(parsedHeatmapData);
      } else {
        console.error("Heatmap data is null.");
      }
    } else {
      console.error("Invalid JSON response.");
    }
  }, [jsonResponse]);

  // Check if heatmapData exists before using it
  if (!heatmapData) {
    return null; // or handle the case when heatmapData is not available
  }

  // Extracting variables from heatmapData
  const { columns, index, data } = heatmapData;
  // useEffect(() => {
  //   if (jsonResponse && jsonResponse.response) {
  //     const nestedDataString = jsonResponse.response.drilldowns;

  //     // Parse the JSON string into a JavaScript object
  //     const parsedNestedData = JSON.parse(nestedDataString);

  //     // Check if parsedHeatmapData is not null
  //     if (parsedNestedData) {
  //       // Now you can safely use parsedHeatmapData
  //       setNestedData(parsedNestedData);
  //     } else {
  //       console.error("Heatmap data is null.");
  //     }
  //   } else {
  //     console.error("Invalid JSON response.");
  //   }
  // }, [jsonResponse]);

  // // Check if heatmapData exists before using it
  // if (!NestedData) {
  //   return null; // or handle the case when heatmapData is not available
  // }
  // const [{Nesteddata}] = NestedData;
  console.log("nd:", NestedData);
  console.log("columns", columns);
  console.log("index", index);
  console.log("data", data);
  console.log("nested data:", nesteddata);
  console.log("drilldowns: ", jsonResponse.response.drilldowns);
  // console.log("drilldowns2:",jsonResponse.response.drilldowns2);
  console.log("root cause analysis:", jsonResponse3);




  const handleTabChange = (tabIndex) => {
    setActiveTab(tabIndex);
  };


  const handlePrevButtonClick = (event) => {
    navigate('/Bplam');
  };
  const handleRefreshButtonClick1 = () => {
    window.location.reload(); // This will refresh the page
  };
  return (
    <div className='bplam-Main-comp'>
      {/* <img className='header-comp2' src={pheader} /> */}
      <div className='Heading-comp-bplam'>
        <div className='screen-change1-bplam' onClick={handlePrevButtonClick}>Oil & Gas/BPLAM</div>
        <div className='bplam-comp' >/Company Ticket Analysis</div>
        <img className='img-class-comp2-bplam' src={topimage} alt="primary header" onClick={handleToggleModal} />
        {/* <img className='img-class-comp-bplam' src={topimage} alt="primary header" onClick={handleToggleModal}/> */}
        {/* <div className='info-icon'><img className="i-icon" src={topimage} onClick={handleToggleModal} /></div> */}

        {showModal && (
          <Info
            onClose={() => setShowModal(false)}
          />
        )}
        <div className='refresh' onClick={handleRefreshButtonClick1}></div>
      </div>

      <div className="tab-buttons-bplam">
        <div onClick={() => handleTabChange(1)} className={"tab-button ${activeTab === 1 ? 'active' : ''}"}
          style={{
            padding: '10px',
            backgroundColor: activeTab === 1 ? 'transparent' : 'transparent',
            color: activeTab === 1 ? '#ffffff' : '#738395', // Change text color for active and inactive states
            borderBottom: activeTab === 1 ? '2px solid #AD8BFF' : '2px solid transparent',
            fontSize: '14px',

            cursor: 'pointer',
            border: 'none',
            outline: 'none',
          }}>
          Recommendations
        </div>
        <div onClick={() => handleTabChange(2)} className={'tab-button ${activeTab === 2 ? "active" : ""}'}
          style={{
            padding: '10px',
            backgroundColor: activeTab === 2 ? 'transparent' : 'transparent',
            color: activeTab === 2 ? '#ffffff' : '#738395', // Change text color for active and inactive states
            // borderBottom: activeTab === 2 ? '2px solid #AD8BFF': '0px solid transparent',
            borderBottom: `2px solid ${activeTab === 2 ? '#AD8BFF' : 'transparent'}`,
            fontSize: '14px',
            // fontWeight:'bold',
            cursor: 'pointer',
            border: 'none',
            outline: 'none',
          }}>
          Insights
        </div>
        <div onClick={() => handleTabChange(3)} className={'tab-button ${activeTab === 3 ? "active" : ""}'}
          style={{
            padding: '10px',
            backgroundColor: activeTab === 3 ? 'transparent' : 'transparent',
            color: activeTab === 3 ? '#ffffff' : '#738395', // Change text color for active and inactive states
            borderBottom: activeTab === 3 ? '2px solid #AD8BFF' : '2px solid transparent',

            fontSize: '14px',
            // fontWeight:'bold',
            cursor: 'pointer',
            border: 'none',
            outline: 'none',
          }}>
          Root Cause Analysis
        </div>

      </div>
      <div className="tab-content-bplam">
        {/* Render content based on the active tab */}
        {activeTab === 1 && jsonResponse ? (
          <div>
            <div className='bottom-comp-t1'>
              <div className='b-upper-ct1'>
                <div className='b-u-left-ct1'>
                  <div className='b-u-l-upper-ct1'>
                    {/* <p className='b-u-l-u-ct1-header'>Ticket Analysis Summary</p> */}
                    <div className='images-t1'>
                      <img className='date-range' src={t1} />
                      {jsonResponse.response && jsonResponse.response.date_range && (
                        <div>
                          <p className='date-range-text'>{jsonResponse.response.date_range.start} to {jsonResponse.response.date_range.end}</p>
                          <p className='date-range-text2'>Duration</p>
                        </div>)}
                      <img className='tot-ticket' src={t2} />
                      <div className='ts'>
                        <p className='tot-tic-text'>{jsonResponse.response.total_tickets}</p>
                        <p className='tot-tic-text2'>Total Tickets</p>
                      </div>
                      <img className='tot-apps' src={t3} />
                      <div className='ts'>
                        <p className='tot-app-text'>{jsonResponse.response.total_apps}</p>
                        <p className='tot-app-text2'>Total Apps</p>
                      </div>
                    </div>
                    <div>
                      {/* <Tab tabIndex={1} jsonData={state && state.jsonData} /> */}
                    </div>
                  </div>
                  <div className='b-u-l-lower-ct1'>
                    {/* <p className='b-u-r-ct1-header1'>Ticket Count by Level 1 Business Process</p> */}
                    < MultilevelPieChart data={jsonResponse.response.drilldowns} />
                    {/* < MultiLevelBarChart data={jsonResponse.response.drilldowns}/> */}
                    {/* < MultiLevelBarChart data={nesteddata3}/> */}
                    {/* < MultiLevelBarChart data={jsonResponse.response.drilldowns2}/> */}
                    {/* < MultiLevelBarChart data={NestedData}/> */}
                  </div>
                </div>
                <div className='b-u-right-ct1'>
                  <p className='b-u-r-ct1-header1'>Ticket Analysis Summary</p>
                  <p className='b-u-r-ct1-header2'>These 10 apps constitute about 75% of the business processes aligned Incidents</p>
                  <HorizontalBarChart data={jsonResponse.response.top_10_noisy_apps} />

                </div>
              </div>
              <div className='b-lower-comp-t1' style={{ paddingLeft: "15px", paddingTop: "15px" }}>
                <h2 className='hmt-header'>Issue Types by Business Process​</h2>
                <HeatmapTable columns={columns} index={index} data={data} />


              </div>
            </div>
          </div>
        ) : (
          <div></div>
        )}
        {activeTab === 2 && jsonResponse2 ? (<div >
          <div className='bplam-tab2-insights'>
            <div className='bplam-tab2-insights-header'>Applications to Business Process Mapping</div>
            <div>
              {/* <h4 className='insights-table-bplam'>Insights Table</h4> */}
              <JSONTable jsonData={jsonResponse2.response} />
              {/* <MyTableComponent /> */}
            </div>
          </div>
        </div>) : (
          <div></div>
        )}
        {activeTab === 3 && jsonResponse3 ? (<div className='bplam-root-cause-analysis'>
          <h6 className='root-cause-bplam'>Root Cause Analysis for major issues</h6>
          {/* <div>{jsonResponse3.response} </div> */}
          <Example data={jsonResponse3.response} />
          {/* data={fishboneData} */}
          {/* <FishboneChart data={jsonResponse3.response} /> */}
        </div>) : (
          <div></div>
        )}
        {activeTab === 4 && <div>Content for Tab 4</div>}
      </div>

      {/* <div className='footer-bplam'>
    <p>©2023 Accenture. All Rights Reserved.</p>
  </div> */}
    </div>

  );
};

export default Tabs;
