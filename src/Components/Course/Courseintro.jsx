import React, { useEffect, useState } from 'react'
import { GetModules } from '../../Api/Course';
import { token } from '../../Api/token';
import Coursedetails from './Coursedetails';
import proficon from '../../assets/images/profileimg.png'
import { Link } from 'react-router-dom';

function Courseintro({data,setPage,setIntroPage,setsearchbar}) {
    console.log(data,"daaataaa");
    const [coursedetail,setcoursedetail]=useState(false)
    const [intropage,setintropage]=useState(true)
    const [modules,setModules]=useState([])

    

    const Modulefetch =async()=>{
        try {
            const tokens = await token("student-refresh-vini")
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
      
        <section className="course-details">
            <div className="container">
            <div className="row">
            <div className="main-menu__logo">
                <Link  onClick={()=> {setIntroPage(false); setPage(true);setsearchbar(true)}}>
                    <i className="icon-arrow-left" />
                </Link>
                </div>
                <div className="col-xl-8" style={{backgroundColor:"#fff",borderRadius:25}}>
                <div className="course-details__thumb">
                    <img src={data.thumbnail} alt="eduact" style={{height:"400px",}}/>
                </div>
                {/* details-thumb */}
                <h3 className="course-details__title">
                    {data.name}
                </h3>
                {/* details-title */}
                <div className="course-details__tabs tabs-box" >
                    <div className="tabs-content">
                    <div className="tab active-tab fadeInUp animated">
                        <div className="course-details__curriculum">
                        <h4 className="course-details__curriculum__title" />
                        <p className="course-details__curriculum__text">
                            {data.description} In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content. Lorem ipsum may be used as a placeholder before the final copy is available.
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
                    Duration:<span>{data.duration} . Minutes</span>
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
        {coursedetail && <Coursedetails data={data} setIntroPage={setintropage} setcoursedetail={setcoursedetail} modules={modules} />}
    </>
  )
}

export default Courseintro