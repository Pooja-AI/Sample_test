import {React,useEffect} from 'react'
// import FishboneChart from 'fishbone-chart'
// import root_c_a from '../images/bplam_root_ca.svg'
import hor_line from '../images/Line 98.png';
import ver_line from '../images/Line 105.png';
import tick_ver_line from '../images/Line 110.png';
import tick_ver_line2 from '../images/Line 107.png';
// import { useEffect } from 'react';
 
const Example = ({data }) => {
 
    console.log('rca:',data)  
  //   const data2 = {'rca_performed_tickets - 94 out of Total Tickets-100': {
  //     'Access-46': ["1. Access management issues across multiple tools.",
  //                 "2. Password reset and login issues in various tools.",
  //                 "3. License and server issues in Autodesk AutoCAD and CMG.",
  //                 "4. SharePoint Office 365 file access and folder creation issues.",
  //                 "5. HDMS login and access issues in multiple tools."],
  //     'Infrastructure-29': [ "1. Software installation and compatibility issues.",
  //                 "2. Server and network connectivity problems.",
  //                 "3. Hardware malfunction and camera issues.",
  //                 "4. User error and training deficiencies.",
  //                 "5. System integration and data replication errors."],
  //     'Workflow-11': [ "1. Workflow configuration issues in multiple tools.",
  //                 "2. Technical glitches causing job failures and submission errors.",
  //                 "3. Inability to create or modify certain types of documents.",
  //                 "4. User errors leading to incorrect data input and system errors.",
  //                 "5. Lack of proper training and documentation for tool usage."],
  //     'Data- 7': [ "1. Outdated data causing discrepancies",
  //                 "2. Technical glitches in data transfer",
  //                 "3. Missing information in critical files",
  //                 "4. Inadequate system maintenance and updates",
  //                 "5. Internal errors in data processing tools"],
  //     'Network-1': ["1. Integration failure between SAP and HDMS",
  //                 "2. Incomplete data transfer from SAP to HDMS",
  //                 "3. Search functionality issue in HDMS",
  //                 "4. Data indexing problem in HDMS",
  //                 "5. Lack of data validation checks during integration"]
  //   }
  // }
 
    return (
      <div className='bplam-rca-main' >
      <div className='lines-rca-bplam' style={{position:'relative',top:'-237px',left:'-72px'}}>
      {/* <FishboneChart style={{color:"#FFFFFF"}} data={data} />       */}
      {/* <img className='try-bplam-rca' src={root_c_a} alt="rca"/> */}
      <img className='hor-line1' src={hor_line} alt="hor1"/>
      <img className='ver-line1' src={ver_line} alt="ver"/>
      <img className='hor-line2' src={hor_line} alt="hor2"/>
      <img className='hor-line3' src={hor_line} alt="hor3"/>
      <img className='ver-line2' src={ver_line} alt="ver2"/>
      <img className='hor-line4' src={hor_line} alt="hor4"/>
      <img className='hor-line5' src={hor_line} alt="hor5"/>
      <img className='hor-line6' src={hor_line} alt="hor6"/>
      <img className='ver-line3' src={tick_ver_line2} alt="ver3"/>
      <img className='ver-line4' src={tick_ver_line} alt="ver4"/>
      <img className='ver-line5' src={tick_ver_line} alt="ver5"/>
     
 
      </div>
      <div  className='bplam-rca-overlay-part2'>
        <div className='bplam-rca-upper-issues'style={{display:'flex',flexDirection:'row',paddingLeft:'50px',paddingRight:'50px'}}>
      <div className='bplam-rca-2-issue-1' style={{position:"relative",marginTop:'5px',marginLeft:'20px',width:'300px',height:'180px',backgroundColor:'rgba(255,255,255,0.1)',borderRadius: '10px'}}>
     
        <div className='bp-rca-it1-it' style={{position:"relative",color:'white',borderRadius: '5px 5px 0px 0px',height:'30px',backgroundColor:'rgba(107,92,209,1)',fontSize:'13px',fontWeight:'500',padding:'5px',textAlign:'center'}}>{data.rca_resp[0].Issue_Type}</div>
        <div className='bplam-rca-issue-1' style={{position:"relative",display:'flex',flexDirection:'column',height:'150px',width:'250px',marginLeft: '5px',overflowX:'auto',overflowY:'auto'}}>
       
        <div className='bpl-rca-it1-resons-1' style={{color:'white',padding: '2px 5px',borderRadius: '5px',fontSize:'10px',width:'250px',textAlign:'left'}}>{data.rca_resp[0].Reasons[0]}</div>
        <div className='bpl-rca-it1-resons-2' style={{color:'white',padding: '2px 5px',borderRadius: '5px',fontSize:'10px',width:'250px',textAlign:'left'}}>{data.rca_resp[0].Reasons[1]}</div>
        <div className='bpl-rca-it1-resons-3' style={{color:'white',padding: '2px 5px',borderRadius: '5px',fontSize:'10px',width:'250px',textAlign:'left'}}>{data.rca_resp[0].Reasons[2]}</div>
        <div className='bpl-rca-it1-resons-4' style={{color:'white',padding: '2px 5px',borderRadius: '5px',fontSize:'10px',width:'250px',textAlign:'left'}}>{data.rca_resp[0].Reasons[3]}</div>
        <div className='bpl-rca-it1-resons-5' style={{color:'white',padding: '2px 5px',borderRadius: '5px',fontSize:'10px',width:'250px',textAlign:'left'}}>{data.rca_resp[0].Reasons[4]}</div>
        </div>
       
      </div>
      <div className='bpl-rca-2-it1-count' style={{position:"relative",color:'white',marginLeft:'30px',marginTop:'85px',padding: '10px',borderRadius: '50px',fontSize:'18px',fontWeight:'bold',backgroundColor:'#615BD4',width:'50px',height:'50px',textAlign:'center'}}>{data.rca_resp[0].Count}</div>
 
      <div className='bplam-rca-2-issue-2' style={{position:"relative",marginTop:'5px',marginLeft:'40px',width:'300px',height:'180px',backgroundColor:'rgba(255,255,255,0.1)',borderRadius: '10px'}}>
     
      <div className='bp-rca-it2-it' style={{position:"relative",color:'white',borderRadius: '5px 5px 0px 0px',height:'30px',backgroundColor:'rgba(107,92,209,1)',fontSize:'13px',fontWeight:'500',padding:'5px',textAlign:'center'}}>{data.rca_resp[1].Issue_Type}</div>
      <div className='bplam-rca-issue-2' style={{position:"relative",display:'flex',flexDirection:'column',height:'150px',width:'250px',marginLeft: '5px',overflowX:'auto',overflowY:'auto'}}>
     
      <div className='bpl-rca-it2-resons-1' style={{color:'white',padding: '2px 5px',borderRadius: '5px',fontSize:'10px',width:'250px',textAlign:'left'}}>{data.rca_resp[1].Reasons[0]}</div>
      <div className='bpl-rca-it2-resons-2' style={{color:'white',padding: '2px 5px',borderRadius: '5px',fontSize:'10px',width:'250px',textAlign:'left'}}>{data.rca_resp[1].Reasons[1]}</div>
      <div className='bpl-rca-it2-resons-3' style={{color:'white',padding: '2px 5px',borderRadius: '5px',fontSize:'10px',width:'250px',textAlign:'left'}}>{data.rca_resp[1].Reasons[2]}</div>
      <div className='bpl-rca-it2-resons-4' style={{color:'white',padding: '2px 5px',borderRadius: '5px',fontSize:'10px',width:'250px',textAlign:'left'}}>{data.rca_resp[1].Reasons[3]}</div>
      <div className='bpl-rca-it2-resons-5' style={{color:'white',padding: '2px 5px',borderRadius: '5px',fontSize:'10px',width:'250px',textAlign:'left'}}>{data.rca_resp[1].Reasons[4]}</div>
      </div>
     
      </div>
      <div className='bpl-rca-2-it3-count' style={{position:"relative",color:'white',marginLeft:'40px',marginTop:'85px',padding: '12px',borderRadius: '50px',fontSize:'18px',fontWeight:'bold',backgroundColor:'#615BD4',width:'50px',height:'50px',textAlign:'center'}}>{data.rca_resp[2].Count}</div>
 
      <div className='bplam-rca-2-issue-3' style={{position:"relative",marginTop:'5px',marginLeft:'30px',width:'300px',height:'180px',backgroundColor:'rgba(255,255,255,0.1)',borderRadius: '10px'}}>
     
      <div className='bp-rca-it3-it' style={{position:"relative",color:'white',borderRadius: '5px 5px 0px 0px',height:'30px',backgroundColor:'rgba(107,92,209,1)',fontSize:'13px',fontWeight:'500',padding:'5px',textAlign:'center'}}>{data.rca_resp[2].Issue_Type}</div>
      <div className='bplam-rca-issue-3' style={{position:"relative",display:'flex',flexDirection:'column',height:'150px',width:'250px',marginLeft: '5px',overflowX:'auto',overflowY:'auto'}}>
     
      <div className='bpl-rca-it3-resons-1' style={{color:'white',padding: '2px 5px',borderRadius: '5px',fontSize:'10px',width:'250px',textAlign:'left'}}>{data.rca_resp[2].Reasons[0]}</div>
      <div className='bpl-rca-it3-resons-2' style={{color:'white',padding: '2px 5px',borderRadius: '5px',fontSize:'10px',width:'250px',textAlign:'left'}}>{data.rca_resp[2].Reasons[1]}</div>
      <div className='bpl-rca-it3-resons-3' style={{color:'white',padding: '2px 5px',borderRadius: '5px',fontSize:'10px',width:'250px',textAlign:'left'}}>{data.rca_resp[2].Reasons[2]}</div>
      <div className='bpl-rca-it3-resons-4' style={{color:'white',padding: '2px 5px',borderRadius: '5px',fontSize:'10px',width:'250px',textAlign:'left'}}>{data.rca_resp[2].Reasons[3]}</div>
      <div className='bpl-rca-it3-resons-5' style={{color:'white',padding: '2px 5px',borderRadius: '5px',fontSize:'10px',width:'250px',textAlign:'left'}}>{data.rca_resp[2].Reasons[4]}</div>
      </div>
     
      </div>
     
        </div>
        <div className='bpl-rca-2-it2-count' style={{position:"relative",color:'white',marginLeft:'564px',marginTop:'50px',padding: '10px',borderRadius: '50px',fontSize:'18px',fontWeight:'bold',backgroundColor:'#615BD4',width:'50px',height:'50px',textAlign:'center'}}>{data.rca_resp[1].Count}</div>  
        <div className='bplam-rca-lower-issues'style={{display:'flex',flexDirection:'row',paddingLeft:'50px',paddingRight:'50px'}}>
      <div className='bplam-rca-2-issue-4' style={{position:"relative",marginTop:'20px',marginLeft:'20px',width:'300px',height:'180px',backgroundColor:'rgba(255,255,255,0.1)',borderRadius: '10px'}}>
     
        <div className='bp-rca-it4-it' style={{position:"relative",color:'white',borderRadius: '5px 5px 0px 0px',height:'30px',backgroundColor:'rgba(107,92,209,1)',fontSize:'13px',fontWeight:'500',padding:'5px',textAlign:'center'}}>{data.rca_resp[3].Issue_Type}</div>
        <div className='bplam-rca-issue-4' style={{position:"relative",display:'flex',flexDirection:'column',height:'150px',width:'250px',marginLeft: '5px',overflowX:'auto',overflowY:'auto'}}>
       
        <div className='bpl-rca-it4-resons-1' style={{color:'white',padding: '2px 5px',borderRadius: '5px',fontSize:'10px',width:'250px',textAlign:'left'}}>{data.rca_resp[3].Reasons[0]}</div>
        <div className='bpl-rca-it4-resons-2' style={{color:'white',padding: '2px 5px',borderRadius: '5px',fontSize:'10px',width:'250px',textAlign:'left'}}>{data.rca_resp[3].Reasons[1]}</div>
        <div className='bpl-rca-it4-resons-3' style={{color:'white',padding: '2px 5px',borderRadius: '5px',fontSize:'10px',width:'250px',textAlign:'left'}}>{data.rca_resp[3].Reasons[2]}</div>
        <div className='bpl-rca-it4-resons-4' style={{color:'white',padding: '2px 5px',borderRadius: '5px',fontSize:'10px',width:'250px',textAlign:'left'}}>{data.rca_resp[3].Reasons[3]}</div>
        <div className='bpl-rca-it4-resons-5' style={{color:'white',padding: '2px 5px',borderRadius: '5px',fontSize:'10px',width:'250px',textAlign:'left'}}>{data.rca_resp[3].Reasons[4]}</div>
        </div>
       
      </div>
      <div className='bpl-rca-2-it4-count' style={{position:"relative",color:'white',marginLeft:'30px',marginTop:'70px',padding: '12px',borderRadius: '50px',fontSize:'18px',fontWeight:'bold',backgroundColor:'#615BD4',width:'50px',height:'50px',textAlign:'center'}}>{data.rca_resp[3].Count}</div>
      <div className='total-ticks-rca2' style={{position:"relative",marginTop:'65px',marginLeft:'40px',width:'300px',height:'135px',backgroundColor:'rgba(255,255,255,0.1)',borderRadius: '10px'}}>
      <div className='tot-tick-rca-2-perform' style={{position:"relative",color:'white',marginLeft:'110px',marginTop:'30px',padding: '10px',borderRadius: '50px',fontSize:'18px',fontWeight:'bold',backgroundColor:'#615BD4',width:'50px',textAlign:'center'}}>{data.rca_performed_tickets}</div>
        <div className='tot-tick-rca-2number' style={{position:"relative",color:'white',padding: '10px',borderRadius: '5px',fontSize:'13px',fontWeight:'400',width:'260px',marginLeft:'0px',textAlign:'center'}}>out of {data.total_tickets} total tickets</div>
      </div>
      <div className='bpl-rca-2-it5-count' style={{position:"relative",color:'white',marginLeft:'40px',marginTop:'70px',padding: '12px',borderRadius: '50px',fontSize:'18px',fontWeight:'bold',backgroundColor:'#615BD4',width:'50px',height:'50px',textAlign:'center'}}>{data.rca_resp[4].Count}</div>
      <div className='bplam-rca-2-issue-5' style={{position:"relative",marginTop:'20px',marginLeft:'30px',width:'300px',height:'180px',backgroundColor:'rgba(255,255,255,0.1)',borderRadius: '10px'}}>
     
      <div className='bp-rca-it5-it' style={{position:"relative",color:'white',borderRadius: '5px 5px 0px 0px',height:'30px',backgroundColor:'rgba(107,92,209,1)',fontSize:'13px',fontWeight:'500',padding:'5px',textAlign:'center'}}>{data.rca_resp[4].Issue_Type}</div>
      <div className='bplam-rca-issue-5' style={{position:"relative",display:'flex',flexDirection:'column',height:'150px',width:'250px',marginLeft: '5px',overflowX:'auto',overflowY:'auto'}}>
     
      <div className='bpl-rca-it5-resons-1' style={{color:'white',padding: '2px 5px',borderRadius: '5px',fontSize:'10px',width:'250px',textAlign:'left'}}>{data.rca_resp[4].Reasons[0]}</div>
      <div className='bpl-rca-it5-resons-2' style={{color:'white',padding: '2px 5px',borderRadius: '5px',fontSize:'10px',width:'250px',textAlign:'left'}}>{data.rca_resp[4].Reasons[1]}</div>
      <div className='bpl-rca-it5-resons-3' style={{color:'white',padding: '2px 5px',borderRadius: '5px',fontSize:'10px',width:'250px',textAlign:'left'}}>{data.rca_resp[4].Reasons[2]}</div>
      <div className='bpl-rca-it5-resons-4' style={{color:'white',padding: '2px 5px',borderRadius: '5px',fontSize:'10px',width:'250px',textAlign:'left'}}>{data.rca_resp[4].Reasons[3]}</div>
      <div className='bpl-rca-it5-resons-5' style={{color:'white',padding: '2px 5px',borderRadius: '5px',fontSize:'10px',width:'250px',textAlign:'left'}}>{data.rca_resp[4].Reasons[4]}</div>
      </div>
     
      </div>
 
     
 
        </div>  
      </div>
      </div>
    )
  }
 
export default Example;