import React, { useState } from 'react'
import './Coursedetails.css'
import { token } from '../../Api/token';
import { GetMeeting } from '../../Api/Meeting';
import DocViewer from 'react-doc-viewer';

function Coursedetails({data,setIntroPage,setcoursedetail,modules}) {
console.log(modules,"moduless");
    const [activeTab, setActiveTab] = useState(1);

    const handleTabClick = (tabNumber) => {
      setActiveTab(tabNumber);
    };
    const MeetingDataFetch =async()=>{
      try {
        const response = await GetMeeting(data.id)
        if(response.success=== true){
          console.log(response ,"res-succeess");
        }else{
          console.log(response,"error");
        }
      } catch (error) {
        console.log(error);
      }
    }

  return (
    <div>
         <header className="main-header">
            <nav className="main-menu">
            <div className="container">
                <div className="main-menu__logo">
                <a onClick={()=>{setIntroPage(true)
                  setcoursedetail(false)
                }}>
                    <i className="icon-arrow-left" />
                </a>
                </div>
                {/* /.main-menu__logo */}
                <div className="main-menu__nav"></div>
                {/* /.main-menu__nav */}
                <div className="main-menu__right">
                {/* <a href="#" class="main-menu__toggler mobile-nav__toggler">
                        <i class="fa fa-bars"></i>
                    </a> */}
                {/* /.mobile menu btn */}
                <div className="search-popup__contents">
                    <form
                    role="search"
                    method="get"
                    className="search-popup__form"
                    action="#"
                    >
                    <input type="text" id="search" placeholder="Search Here..." />
                    <button type="submit" className="eduact-btn">
                        <span className="eduact-btn__curve" />
                        <i className="icon-Search" />
                    </button>
                    </form>
                </div>
                {/* /.search btn */}
                <a href="#" className="main-menu__login">
                    <i className="icon-account-1" />
                </a>
                {/* /.login btn */}
                {/* <a href="contact.html" class="eduact-btn"><span class="eduact-btn__curve"></span>Get In Touch</a>/.contact btn */}
                </div>
                {/* /.main-menu__right */}
            </div>
            {/* /.container */}
            </nav>
            {/* /.main-menu */}
        </header>
        
    {/* course-details-start */}
    <section className="course-details">
      <div className="container">
        <div className="row">
          <div className="col-xl-8">
            <div className="course-details__thumb">
              <img src={data.thumbnail} alt="eduact" style={{height:"400px",}}/>
            </div>
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
            {/* tabs */}
            <div className="course-details__tabs tabs-box">
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
              </div>
            {/* tabs */}
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
                    Duration:<span>20 Hours</span>
                  </li>
                  <li>
                    <i className="icon-book" />
                    Modules:<span>{modules.length}</span>
                  </li>
                  <li>
                    <i className="icon-Digital-marketing" />
                    Tutor:<span>{data.tutor_name}</span>
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
    <div id="modaldemo1" className="modal fade">
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-body">
            <button
              aria-label="Close"
              className="btn-close"
              data-bs-dismiss="modal"
              type="button"
            >
              {/* <span aria-hidden="true">&times;</span> */}
            </button>
            <div>
              <h4 className="mt-2">Upcomming</h4>
              <div className="upcomemeet m-2 ">
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
                    <p>Date: 16/07/2023</p>
                    <p>Time : 6:00 pm</p>
                  </div>
                </div>
                <div
                  className="d-flex"
                  style={{ justifyContent: "space-around" }}
                >
                  <a href="https://meet.google.com/nvz-uyzo-tvu">
                    https://meet.google.com/nvz-uyzo-tvu
                  </a>
                  <p>1 hour</p>
                </div>
              </div>
              <div className="upcomemeet m-2 ">
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
                    <p>Date: 16/07/2023</p>
                    <p>Time : 6:00 pm</p>
                  </div>
                </div>
                <div
                  className="d-flex"
                  style={{ justifyContent: "space-around" }}
                >
                  <a href="https://meet.google.com/nvz-uyzo-tvu">
                    https://meet.google.com/nvz-uyzo-tvu
                  </a>
                  <p>1 hour</p>
                </div>
              </div>
              <h4 style={{ color: "coral" }} className="mt-5">
                Previous
              </h4>
              <div className="upcomemeetp m-2 ">
                <div className="m-2 d-flex">
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
                  <div style={{ justifyContent: "center" }}>
                    <p>Date: 16/07/2023</p>
                    <p>Time : 6:00 pm</p>
                  </div>
                </div>
                <div
                  className="d-flex"
                  style={{ justifyContent: "space-around" }}
                >
                  <p>https://meet.google.com/nvz-uyzo-tvu</p>
                  <p>Finished</p>
                </div>
              </div>
              <div className="upcomemeetp m-2 ">
                <div className="m-2 d-flex">
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
                  <div style={{ justifyContent: "center" }}>
                    <p>Date: 16/07/2023</p>
                    <p>Time : 6:00 pm</p>
                  </div>
                </div>
                <div
                  className="d-flex"
                  style={{ justifyContent: "space-around" }}
                >
                  <p>https://meet.google.com/nvz-uyzo-tvu</p>
                  <p>Finished</p>
                </div>
              </div>
              <div className="upcomemeetp m-2 ">
                <div className="m-2 d-flex">
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
                  <div style={{ justifyContent: "center" }}>
                    <p>Date: 16/07/2023</p>
                    <p>Time : 6:00 pm</p>
                  </div>
                </div>
                <div
                  className="d-flex"
                  style={{ justifyContent: "space-around" }}
                >
                  <p>https://meet.google.com/nvz-uyzo-tvu</p>
                  <p>Finished</p>
                </div>
              </div>
            </div>
            <button
              aria-label="Close"
              className="btn btn-outline-danger mt-5"
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