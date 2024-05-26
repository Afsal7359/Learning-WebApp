import React, { useEffect, useState } from 'react'
import './Course.css'
import { refreshToken } from '../../Api/Authentication';
import { CreateMeeting, GetModules } from '../../Api/Course';
import DocViewer from 'react-doc-viewer';
import Createmeeting from '../Modals/Createmeeting';
import { Link } from 'react-router-dom';
import { GetMeeting } from '../../Api/Meeting';

function Tutorcourse({data ,tutor, setPageUI,setDetailPage}) {
    const [activeTab, setActiveTab] = useState(0);
    const [moduledata,setModuleData]=useState([]);
    const [modulevisible,setModuleVisible]=useState(true)
    const [modal,setModal]=useState(false)
    const [CoursepageUI,setCoursePageUI]=useState(true)
    const [link,setlink]=useState('')
    const [Meetingdata,setMeetingData]=useState([])

    const handleTabClick = (tabNumber) => {
      setActiveTab(tabNumber);
    };
    console.log(data,"dataaaa");
    
    const ModulesFetch =async()=>{
      try {
        const tokenget = localStorage.getItem("token-refresh-vini")
        const tokencreate = await refreshToken({refresh:tokenget})
        console.log(tokencreate);
        const response = await GetModules(data.id,tokencreate.access)
        if(response.success){
          console.log(response,"success");
          setModuleData(response.modules)
          setModuleVisible(false)
        }else{
          console.log(response,"error");
        }
      } catch (error) {
        console.log(error);
      }
    }
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
    console.log(Meetingdata,"meet");
    useEffect(()=>{
      ModulesFetch()
      MeetingDataFetch()
    },[])
    console.log(data,":response");
    const convertTo12HourFormat = (time24) => {
      const [hours, minutes] = time24.split(':').map(Number);
      const ampm = hours >= 12 ? 'PM' : 'AM';
      const hours12 = hours % 12 || 12;
      return `${hours12}:${minutes < 10 ? '0' + minutes : minutes} ${ampm}`;
    };
    const MeetingLinkCreate =async()=>{
      try {
        const response = await CreateMeeting()
        if(response.success){
          console.log(response,"res  meet");
          setlink(response.link)
        }else{
          console.log(response,"err res - meet");
        }
      } catch (error) {
        console.log(error);
      }
    }
  return (
    <>
      {CoursepageUI &&<div>
     
        
    <section className="course-details">
      <div className="container">
        <div className='mx-3 mb-3' style={{backgroundColor:"#ffe",width:"20px"}}>
        <Link  onClick={()=>{setDetailPage(false),setPageUI(true),setCoursePageUI(false)}}>
                    <i className="icon-arrow-left" />
        </Link>
        </div>
    
        <div className="row">
          <div className="col-xl-8">
          
            {/* details-title */}
           
            {/* tabs */}
            {modulevisible ? 
            (<div className="loader-container">
              <div className="loader"></div>
            </div>):(
              <div className="course-details__tabs tabs-box">
                 <div className="tabs-content">
              <div>
                {moduledata?moduledata.map((item,index) => (
                <div
                    key={index}
                    className={`tab ${activeTab === index ? 'active-tab' : ''}`}
                >
                    {/* Your content for each tab */}
                    <div className="course-details__curriculum">
                    
                    <div className="video-container">
                        {/* Video content for each tab */}
                        {activeTab === index &&
                          <iframe
                            height="375"
                            width="600"
                            src={item.module_content_video?item.module_content_video:item.module_content_ppt}
                            allowFullScreen
                          ></iframe>
                        }
                        
                    </div>
                    </div>
                </div>
                )):<h3>No Modules Found</h3>}
              </div>
              </div>
              <ul className="course-details__tabs__lists tab-buttons list-unstyled">
              <ul className="tab-buttons">
                {moduledata.length!==0?moduledata.map((item,index) => (
                <li
                    key={index}
                    className={`tab-btn ${activeTab === index ? 'active-btn' : ''}`}
                    onClick={() => handleTabClick(index)}
                >
                    <span>Module {index + 1}</span>
                </li>
                )):<li className='tab-btn'>No Module Found</li>}
              </ul>
              </ul>
              {/* tab-title */}

             
              </div>
            )}
            
            <h3 className="course-details__title">
              {data.name}
            </h3>
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
                    Duration:<span>{data.duration}  Minutes</span>
                  </li>
                  <li>
                    <i className="icon-book" />
                    Modules:<span>{moduledata.length}</span>
                  </li>
                  <li>
                    <i className="icon-Digital-marketing" />
                    Tutor:<span>{tutor?.username}</span>
                  </li>
                </ul>
                <a
                  href="#"
                  data-bs-target="#modaldemo1"
                  data-bs-toggle="modal"
                  className="eduact-btn eduact-btn-second"
                >
                  <span className="eduact-btn__curve" /> Live Section
                  <i className="icon-arrow" />
                </a>
                <a
                  onClick={()=>{
                    MeetingLinkCreate()
                    setModal(true)
                    setCoursePageUI(false)
                    
                  }}
                  className="eduact-btn eduact-btn-second"
                >
                  <span className="eduact-btn__curve" />
                  Create Live Sections
                  <i className="icon-arrow" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    </div>}
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
            <h4 className="mt-2 text-white">Meetings</h4>
              {Meetingdata.length !==0?Meetingdata.map((item,index)=>(
                <>
            
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
      
  {modal && <Createmeeting setModal={setModal} meetingfetch={MeetingDataFetch} setPageUI={setCoursePageUI} link={link} tutor={tutor} coursedata={data}/>}
  
   
    </>
  )
}

export default Tutorcourse