import React, { useEffect, useState } from 'react'
import { GetModules } from '../../Api/Course';
import { token } from '../../Api/token';
import Coursedetails from './Coursedetails';


function Courseintro({data,setPage,setIntroPage}) {
    console.log(data,"daaataaa");
    const [coursedetail,setcoursedetail]=useState(false)
    const [intropage,setintropage]=useState(true)
    const [modules,setModules]=useState([])

    

    const Modulefetch =async()=>{
        try {
            const tokens = await token("token-refresh-vini")
            console.log(tokens.access);
            const response = await GetModules(data.id,tokens.access)
            if(response.success === true){
                console.log(response,"response suceeesss");
                setModules(response.modules)
            }else{
                console.log(response,"error");
            }
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(()=>{
        Modulefetch();
    },[])
  return (
    
    <>
        {intropage&& <div>
        <header className="main-header">
            <nav className="main-menu">
            <div className="container">
                <div className="main-menu__logo">
                <a  onClick={()=> {setIntroPage(false); setPage(true)}}>
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
        <section className="course-details">
            <div className="container">
            <div className="row">
                <div className="col-xl-8">
                <div className="course-details__thumb">
                    <img src={data.thumbnail} alt="eduact" style={{height:"400px",}}/>
                </div>
                {/* details-thumb */}
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
                    Duration:<span>{data.duration} . hour</span>
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
                    <a className="eduact-btn eduact-btn-second" onClick={()=>{
                        setcoursedetail(true)
                        setintropage(false)
                    }}>
                        <span className="eduact-btn__curve" />
                        Watch Tutorials
                        <i className="icon-arrow" />
                    </a>
                    </div>
                </div>
                </div>
            </div>
            </div>
        </section>
        </div>}
        {coursedetail && <Coursedetails data={data} setIntroPage={setintropage} setcoursedetail={setcoursedetail} modules={modules}/>}
    </>
  )
}

export default Courseintro