import React, { props } from 'react';
import percent from '../images/Group 3215.svg';
import pointer from '../images/Group 3214.svg';
import heart from '../images/Group 3213.svg';
import sridevi from '../images/Group 3001.svg';
import jegan from '../images/Group 3002.svg';
import close from '../images/Group 3005.svg';
import '../Info.css';

// function Info(props) {
function Info( props ) {
  return (
    <div className="modal">
        <div className="modal-content">
          <div className="left-sec">
            <div className="top-left modal-section">
              <ul>
                <li className='first-para'>Gen-AI is leveraged to reduce manual efforts of segregating Tickets for respective solution bucket . ​​</li>
                <li>Effort is considerable as the Ticket volume is huge.​</li>
              </ul>
            </div>

            <div className="bottom-left modal-section">
              <div className='business-Heading'>Business Value Proposition</div>
              <ul>
                <li className='business-items'>Reduction in Time investment​</li>
                <li className='business-items'>Resources can be levered for innovative work​</li>
                <li className='business-items'>Reduction in effort and cost​</li>
                <li className='business-items'>Minimize the turnaround time​</li>
                
              </ul>
            </div>
          </div>
          <div className="top-right modal-section">
            <div className="top-1">

              <div className='business-Heading'>What problem are we solving? </div>
              <ul>
                <li className='business-items'>The current manual process of mapping issue tickets to business processes is characterized by inefficiencies and the potential for inaccuracies.</li>
                <li className='business-items'>This manual mapping approach is not only time-consuming but also prone to errors, leading to misaligned business processes.</li>
                <li className='business-items'>To address these challenges, there is a need for an automated solution, such as LLM, to streamline and enhance the accuracy of business process mappings for issue tickets.</li>
                <li className='business-items'>Implementing an LLM can significantly reduce the time and manual efforts required for ticket mapping, ensuring precise and error-free alignment between issues and corresponding business processes</li>
              </ul>
            </div>
            <div className="top-2">
              <div className='business-Heading'>How does it work?</div>
              <ul>

                <li className='business-item'> Ticket mapping, Issue classification and analysis carried out by LLM​</li>
                <li className='business-item'>It  analyses a ticket dump and based on the details provided, then maps it to appropriate Business Process (currently supported up to 3 levels of mapping)​</li>
                <li className='business-item'>LLM also shows impact on business and provides recommendations​</li>
                <li className='business-item'>LLM performs Root Cause Analysis for top occurring iss​ues</li>
              </ul>
            </div>
            <div className="top-3">
              <div className='business-Heading'>Technology Choices</div>
              <ul>

                <li className='business-items'> Containerized cloud deployment</li>
                <li className='business-items'>Cloud agnostic</li>
                <li className='business-items'>LLM: OpenAI models​</li>
                <li className='business-items'>Embedding Vector DB​</li>
              </ul>
            </div>

          </div>
          <div className="bottom-right modal-section">
            <div className='top-4'>
              <div className='business-Heading'>Value to clients</div>
              <div className='percent-class'><img className="percent-logo" src={percent} />
                <div className='sub-head-1'>
                  <div className='business-Heading-1'>Enhance Asset Longevity & Reduce Maintenance cost</div>
                  <div className='business-items-1'>Total maintenance cost is always an important performance indicator. Timely Identification of corrosion helps reducing it’s impact ,makes it easy and quick to implement remediation and intern reduce maintenance cost .</div>
                </div>
              </div>
              <div className='percent-class'><img className="percent-logo" src={pointer} />
                <div className='sub-head-1'>
                  <div className='business-Heading-2'>Improve Efficiency</div>
                  <div className='business-items-1'>Corrosion leads to various operational challenges and inefficiencies.</div>
                  <div className='business-items-1'>Corrosion detection plays a crucial role in improving efficiency in an energy plant by identifying and addressing corrosion-related issues early.</div>
                </div>
              </div>
              <div className='percent-class'><img className="percent-logo" src={heart} />
                <div className='sub-head-1'>
                  <div className='business-Heading-2'>Workplace Safety</div>
                  <div className='business-items-1'>Timely corrosion detection significantly enhances workplace safety by preventing accidents, reducing health risks, and promoting a culture of safety.</div>
                </div>
              </div>
            </div>
            <div className='top-5'>
              <div className='business-Heading-3'>Contacts</div>
              <div><img className="sri-logo" src={sridevi} />
              </div>
              <div><img className="sri-logo" src={jegan} />
              </div>
            </div>
          </div>

          <img className='close-btn' src={close} alt='Sample' onClick={props.onClose} />
        </div>
      </div>
  )
}

export default Info