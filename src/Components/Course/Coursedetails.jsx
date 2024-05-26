import React, { useState } from 'react'
import './Coursedetails.css'
import { token } from '../../Api/token';
import { GetMeeting } from '../../Api/Meeting';
import profimg from '../../assets/images/profileimg.png'
import { Link } from 'react-router-dom';

function Coursedetails({data,setIntroPage,setcoursedetail,modules}) {
console.log(modules,"moduless");
    const [activeTab, setActiveTab] = useState(0);
    const [Meetingdata,setMeetingData]=useState([])
console.log(data,"dddddddddddddddddd");
    const handleTabClick = (tabNumber) => {
      setActiveTab(tabNumber);
    };
    const MeetingDataFetch =async()=>{
      try {
        const response = await GetMeeting(data.id)
        if(response.success=== true){
          console.log(response ,"res-succeess");
          setMeetingData(response.data)
        }else{
          console.log(response,"error");
        }
      } catch (error) {
        console.log(error);
      }
    }
    const convertTo12HourFormat = (time24) => {
      const [hours, minutes] = time24.split(':').map(Number);
      const ampm = hours >= 12 ? 'PM' : 'AM';
      const hours12 = hours % 12 || 12;
      return `${hours12}:${minutes < 10 ? '0' + minutes : minutes} ${ampm}`;
    };
  return (
    <div>
        
        
    {/* course-details-start */}
    <section className="course-details">
      <div className="container">
        <div className="row">
        <div className="main-menu__logo">
                <Link onClick={()=>{setIntroPage(true)
                  setcoursedetail(false)
                }}>
                    <i className="icon-arrow-left" />
                </Link>
                </div>
          <div className="col-xl-8" style={{backgroundColor:"#fff",borderRadius:25}}>
            {/* <div className="course-details__thumb">
              <img src={data.thumbnail} alt="eduact" style={{height:"400px",}}/>
            </div> */}
             <div className="tabs-content">
              <div>
                {modules.map((item,index) => (
                <div
                    key={index}
                    className={`tab ${activeTab === index ? 'active-tab' : ''}`}
                >
                    {/* Your content for each tab */}
                    <div className="course-details__curriculum">
                    
                    <div className="video-container">
                        {/* Video content for each tab */}
                        {activeTab === index &&
                        item.module_content_video? (
                          <iframe
                            height="375"
                            width="600"
                            src={item.module_content_video}
                            allowFullScreen
                            sandbox="allow-scripts allow-same-origin allow-popups"
                          ></iframe>
                        ):(
                          <div className="document-viewer">
                            <iframe
                            height="375"
                            width="600"
                            src={item.module_content_ppt}
                            allowFullScreen
                            
                          ></iframe>
                          </div>
                        )}
                        
                    </div>
                    </div>
                </div>
                )) }
              </div>
              </div>
                {/* tabs */}
            <div className="course-details__tabs tabs-box mt-4">
              <ul className="course-details__tabs__lists tab-buttons list-unstyled">
              <ul className="tab-buttons">
                {modules.length !==0 ?modules.map((item,index) => (
                <li
                    key={index}
                    className={`tab-btn ${activeTab === index ? 'active-btn' : ''}`}
                    onClick={() => handleTabClick(index)}
                >
                    <span>Module {index + 1}</span>
                </li>
                )):(
                  <li> <span>No Module Found !!!!</span> </li>
                )}
              </ul>
              </ul>
              {/* tab-title */}

             
              </div>
            {/* tabs */}
            <h3 className="course-details__title">
              {data.name}
            </h3>
            {/* details-title */}
            <div className="course-details__tabs tabs-box">
              <div className="tabs-content">
                <div className="tab active-tab fadeInUp animated">
                  <div className="course-details__curriculum">
                    <h4 className="course-details__curriculum__title" />
                    <p className="course-details__curriculum__text">
                     {data.description}
                    </p>
                  </div>
                </div>
                {/* tab-content-curriculum */}
              </div>
              {/* tab-content */}
            </div>
          
          </div>
          <div className="col-xl-4 wow fadeInRight" data-wow-delay="300ms">
            <div className="course-details__sidebar">
              <div className="course-details__sidebar__item">
                <h3 className="course-details__sidebar__title">
                  Course Features
                </h3>
                <ul className="course-details__sidebar__lists clerfix">
                  <li>
                    <i className="icon-history" />
                    Duration:<span>{data.duration}</span>
                  </li>
                  <li>
                    <i className="icon-book" />
                    Modules:<span>{modules.length}</span>
                  </li>
                  <li>
                    <i className="icon-Digital-marketing" />
                    Tutor:<span>{data.tutor.username}</span>
                  </li>
                </ul>
                <a
                onClick={()=>MeetingDataFetch()}
                  data-bs-target="#modaldemo1"
                  data-bs-toggle="modal"
                  className="eduact-btn eduact-btn-second"
                >
                  <span className="eduact-btn__curve" />
                  Join Live Section
                  <i className="icon-arrow" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    {/* course-details-end */}
    <div id="modaldemo1" className="modal fade" style={{
          background: "rgba(102, 54, 255, 0.12)",
          borderRadius: "16px",
          boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
          backdropFilter: "blur(10.8px)",
          WebkitBackdropFilter: "blur(5.8px)",
          border: "1px solid rgba(255, 255, 255, 0.26)"
      }}>
      <div className="modal-dialog" role="document">
        <div className="modal-content" style={{
          display: 'block',
          background: "rgba(102, 54, 255, 0.12)",
          borderRadius: "16px",
          boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
          backdropFilter: "blur(5.8px)",
          WebkitBackdropFilter: "blur(5.8px)",
          border: "1px solid rgba(255, 255, 255, 0.26)"
      }}>
          <div className="modal-body">
            <button
              aria-label="Close"
              className="btn-close"
              data-bs-dismiss="modal"
              type="button"
              color='white'
            >
              {/* <span aria-hidden="true">&times;</span> */}
            </button>
            <div>
              {Meetingdata.length !==0?Meetingdata.map((item,index)=>(
                <>
              <h4 className="mt-2 text-white">Meetings</h4>
              <div className="upcomemeet m-2 " style={{   
           background: "#fff",
          borderRadius: "16px",
          boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
          backdropFilter: "blur(5.8px)",
          WebkitBackdropFilter: "blur(5.8px)",
          border: "1px solid rgba(255, 255, 255, 0.26)"}}>
                <div className=" d-flex">
                  <img
                    src="/src/assets/images/favicons/dateandtime.png"
                    alt="image"
                    height="55px"
                    width="55px"
                    style={{
                      marginRight: "2em",
                      marginTop: "1em",
                      marginLeft: "1em"
                    }}
                  />
                  <div style={{ justifyContent: "center", marginTop: "1em" }}>
                    <p>Date: {item.date}</p>
                    <p>Time : {convertTo12HourFormat(item.time)}</p>
                  </div>
                </div>
                <div
                  className="d-flex"
                  style={{ justifyContent: "space-around" }}
                >
                  <Link to={`${item.link}`}>
                    {item.link}
                  </Link>
                  <p>{item.duration} . min</p>
                </div>
              </div>
             
              </>
              )): <h4 className="mt-2 text-white">No Meeting Found</h4>}
              
             
            </div>
            <button
              aria-label="Close"
              className="btn btn-danger mt-5"
              data-bs-dismiss="modal"
              type="button"
            >
              Back
            </button>
          </div>
        </div>
        {/* modal-content */}
      </div>
      {/* modal-dialog */}
    </div>
    {/*Add modal close */}
  
    </div>
  )
}

export default Coursedetails