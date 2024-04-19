// SidebarLink.js
import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom';

const SidebarLink = ({ to, selectedIndustry, setSelectedIndustry, industryCollapsed, setIndustryCollapsed, iconSrc, label, internal }) => {
  return (
    <div style={{ marginBottom: "30px" }}>
    <Link
      to={to}
      className={`selection-m ${selectedIndustry === label ? 'selected-m' : ''} no-underline ${industryCollapsed ? 'collapsed-sidebar' : 'expanded-sidebar'}`}
      onClick= {() => {setSelectedIndustry(label);
      }}
    >
      <img className= {internal ? (industryCollapsed  ? 'side-img2' :'side-img2') : (industryCollapsed  ? 'side-img' :'side-img') } src={iconSrc} alt={`${label} header`} />{industryCollapsed ? null : <p style={{ display:"inline-block" , fontSize: "14px", fontWeight: "500"}}>{label}</p>}
    </Link>
    </div>
  );
};

export default SidebarLink;
