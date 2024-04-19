import React, { useState, useEffect, useCallback } from 'react';
import Login from './login_local';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate, useLocation } from 'react-router-dom';
import SOP from './SOP';
import SOPMining from './SOPMining'
import Sales from './SaleAssist';
import DetectionTabs from './DetectionTabs';
import './App.css';
import Utility from './Utility';
import Agriculture from './Agriculture';
import primer_header from './images/localHeader.svg';
import oil from './images/oil_barrel_FILL0_wght400_GRAD0_opsz24 1.svg';
import utilities from './images/ev_charger_FILL0_wght400_GRAD0_opsz24 1.svg';
import chemical from './images/science_FILL0_wght400_GRAD0_opsz24 1.svg';
import mining from './images/outdoor_grill_FILL0_wght400_GRAD0_opsz24 1.svg';
import Doa from './Drilling_Operation_Assistant/Doa';
import CorrosionPage from './CorrosionPage';
import Vegetation from './Vegetation';
import OsduSearch from './OsduSearch';
import Scrm from './Scrm';
import Energy from './Energy';
import Mining from './Mining';
import Compiq from './CompIQ';
import Chemical from './Chemical';
import SidebarLink from './SideBarLink';
import Sustainability from './sustainabilityMain';
import Apm from './Apm';
import Customer360 from './customer360';
import Optimization from '../src/Optimization/otimization';
import toggle from './images/Industry.svg';
import Bplam from './BPLAM/bplam1';
import Tabs from './BPLAM/Tabs';
import accn from './images/Acn_icon.svg';
import Internal from './Internal';
// import SOPNew from './SOP_NewUI/SOP';
import SOPNew from './SOP_Chemical';
import { authProvider } from './Auth/AuthProvider';
import { AzureAD, AuthenticationState } from 'react-aad-msal';
import login from './images/Group 3802.svg';
import genaisight from './images/GenAISight.png';
import title from './images/LoginTitle.png';
import './login.css';
import loginNew from './images/LoginNew.svg';
import accenture_header from './images/accenture_header.svg';
import notification_header from './images/notification.svg';
import user_header from './images/account_circle.svg';
import logot from './images/logout.svg';
import SafetyVigilance from './Safety_Vigilance/new';
import { MsalProvider, useMsal } from '@azure/msal-react';
import Retail from './Retail_Management/Retail';

const App = () => {
    const [selectedIndustry, setSelectedIndustry] = useState('');
    const [industryCollapsed, setIndustryCollapsed] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();
    const internal = true;
    const isScrm = location.pathname === '/Scrm';
    function truncateText(input) {
        if (input.length > 10) {
            return input.substring(0, 10) + '...';
        }
        return input;
    }
    const { instance } = useMsal();
    const activeAccount = instance.getActiveAccount();

    const handleLogoutRedirect = () => {
        instance.logoutRedirect();
    };
    return (
        <div className=" main-m">
            <div >
                <div className="primary" style={{ position: "fixed", zIndex: "10000" }}>
               {/* <div style={{ fontWeight: "500",color:'white',marginTop:'10px' }}>GENAI</div>\ */}
                <p className='genaiHeader'>GenAI <span style={{ fontWeight: "300" }}>Sight</span></p>
                <div className='header-icon'>
                  <div className='icon-Header-circle'>
                    <img className='icon-Header-notification' src={notification_header} /></div>
                  <button type="button" className='user-header-box username-container' data-toggle="tooltip" data-placement="left" title={activeAccount && activeAccount.username ? activeAccount.username : 'Unknown'} >

                    <img className='icon-Header' src={user_header} style={{ marginTop: "1px" }} />
                    <span style={{ fontSize: "10px", marginTop: "3px", marginRight: "5px", width: "80px" }} >
                      {activeAccount && activeAccount.username ? truncateText(activeAccount.username) : 'Admin'}</span>
                  </button>
                  <div className='icon-Header-circle' style={{ marginLeft: "8px", cursor: "pointer" }}>
                    <img className='icon-Header-logout' src={logot} title="logout" onClick={handleLogoutRedirect} /></div>
                </div>
              </div>
                <div className='col-sm-12 panels-m'>
                    <div className={`col-sm-2 left-panel-m ${industryCollapsed ? 'collapsed-left-panel' : ''}`} >
                        <div>
                            <img src={toggle} className='sidebar-toggle' onClick={() => {
                                setIndustryCollapsed(!industryCollapsed);
                            }} />
                            <SidebarLink
                                to="/"
                                selectedIndustry={selectedIndustry}
                                setSelectedIndustry={setSelectedIndustry}
                                industryCollapsed={industryCollapsed}
                                setIndustryCollapsed={setIndustryCollapsed}
                                iconSrc={mining}
                                label="Agriculture"
                            />
                            <SidebarLink
                                to="/chemical"
                                selectedIndustry={selectedIndustry}
                                setSelectedIndustry={setSelectedIndustry}
                                industryCollapsed={industryCollapsed}
                                setIndustryCollapsed={setIndustryCollapsed}
                                iconSrc={chemical}
                                label="Chemical"
                            />
                             <SidebarLink
                                to="/Life Science"
                                selectedIndustry={selectedIndustry}
                                setSelectedIndustry={setSelectedIndustry}
                                industryCollapsed={industryCollapsed}
                                setIndustryCollapsed={setIndustryCollapsed}
                                iconSrc={mining}
                                label="Life Science"
                            />
                            <SidebarLink
                                to="/mining"
                                selectedIndustry={selectedIndustry}
                                setSelectedIndustry={setSelectedIndustry}
                                industryCollapsed={industryCollapsed}
                                setIndustryCollapsed={setIndustryCollapsed}
                                iconSrc={mining}
                                label="Mining"
                            />
                             <SidebarLink
                                to="/Networking"
                                selectedIndustry={selectedIndustry}
                                setSelectedIndustry={setSelectedIndustry}
                                industryCollapsed={industryCollapsed}
                                setIndustryCollapsed={setIndustryCollapsed}
                                iconSrc={mining}
                                label="Networking"
                            />
                              <SidebarLink
                                to="/Oil & Gas"
                                selectedIndustry={selectedIndustry}
                                setSelectedIndustry={setSelectedIndustry}
                                industryCollapsed={industryCollapsed}
                                setIndustryCollapsed={setIndustryCollapsed}
                                iconSrc={oil}
                                label="Oil & Gas"
                            />
                            <SidebarLink
                                to="/Semiconductors"
                                selectedIndustry={selectedIndustry}
                                setSelectedIndustry={setSelectedIndustry}
                                industryCollapsed={industryCollapsed}
                                setIndustryCollapsed={setIndustryCollapsed}
                                iconSrc={mining}
                                label="Semiconductors"
                            />
                           
                            <SidebarLink
                                to="/utility"
                                selectedIndustry={selectedIndustry}
                                setSelectedIndustry={setSelectedIndustry}
                                industryCollapsed={industryCollapsed}
                                setIndustryCollapsed={setIndustryCollapsed}
                                iconSrc={utilities}
                                label="Utilities"
                            />
                            <SidebarLink
                                to="/internal"
                                selectedIndustry={selectedIndustry}
                                setSelectedIndustry={setSelectedIndustry}
                                industryCollapsed={industryCollapsed}
                                setIndustryCollapsed={setIndustryCollapsed}
                                iconSrc={accn}
                                label="Internal"
                                internal={internal}
                            />
                            {/* <p style={{ width: "20px", color:"grey", backgroundColor: "transparent", border:"solid", borderColor:"transparent"}} onClick={() => {
                    setIndustryCollapsed(!industryCollapsed);
                  }}>{">"}{">"}</p> */}
                        </div>
                    </div>
                    <div className={`col-sm-10 middle-panel-m ${isScrm ? 'right-scrm-section' : ''}`} style={{ marginTop: "40px", marginBottom: "5px" }}>
                        <Routes>
                            <Route path="/" element={<Agriculture closeSideBar={() => { setIndustryCollapsed(true); }} />} />
                            <Route path="/Energy" element={<Energy closeSideBar={() => { setIndustryCollapsed(true); }} />} />
                            <Route path="/utility" element={<Utility closeSideBar={() => { setIndustryCollapsed(true); }} />} />
                            <Route path="/Mining" element={<Mining closeSideBar={() => { setIndustryCollapsed(true); }} />} />
                            <Route path="/chemical" element={<Chemical closeSideBar={() => { setIndustryCollapsed(true); }} />} />
                            <Route path="/internal" element={<Internal closeSideBar={() => { setIndustryCollapsed(true); }} />} />
                            <Route path="/CorrosionPage" element={<CorrosionPage />} />
                            <Route path="/detectionresult/*" element={<DetectionTabs />} />
                            <Route path="/Sustainability" element={<Sustainability />} />
                            <Route path="/compiq" element={<Compiq />} />
                            <Route path="/Apm" element={<Apm />} />
                            <Route path="/OsduSearch" element={<OsduSearch />} />
                            <Route path="/SOP" element={<SOP />} />
                            <Route path="/SOPUtility" element={<SOPMining />} />
                            <Route path="/drilling" element={<Doa />} />
                            <Route path="/Scrm" element={<Scrm />} />
                            <Route path="/SalesAssistance" element={<Sales />} />
                            <Route path="/VegetationManagement" element={<Vegetation />} />
                            <Route path="/Customer360" element={<Customer360 />} />
                            <Route path="/Bplam" element={<Bplam />} />
                            <Route path="/tabs-screen" element={<Tabs />} />
                            <Route path="/SOPChemical" element={<SOPNew />} />
                            <Route path="/Optimization" element={<Optimization />} />
                            <Route path="/SafetyVigilance" element={<SafetyVigilance />} />
                            <Route path="/Retail" element={<Retail />} />
                        </Routes>
                    </div>
                </div>
            </div>
        </div>


    )
}

export default App;
