import React, { useEffect, useState } from 'react'
import AddCourse from '../Modals/AddCourse';
import { DeleteCourse, GetAllCourse } from '../../Api/Course';
import Tutorcourse from './Tutorcourse';
import { toast } from 'react-toastify';
import img1 from '../../assets/images/shapes/course-shape-2.png'
import img2 from '../../assets/images/shapes/course-shape-1.png'
import { Link } from 'react-router-dom';
import bgimg from '../../assets/images/backgroundgif.gif'
import logo2 from '../../assets/images/logo-vinjan.png'
import proficon from '../../assets/images/proficon.png'
import bgimg1 from '../../assets/images/shapes/banner-bg-2.png'
import bannerimg1 from '../../assets/images/resources/banner-2-1.jpg'
import { GetTutorProfile } from '../../Api/Profile';
import { token } from '../../Api/token';
import './swiper.css'
import { TokenExpiry } from '../../Api/Tokenexpiry';

const Tutorhome = () => {
    const [modalvisible,setModalvisible]=useState(false);
    const [pageUI,setPageUI]=useState(true)
    const [courseData,setCourseData]=useState([])
    const [isloading,setLoading]=useState(true)
    const [deleteid,setDeleteId]=useState(null)
    const [DeleteModal,setDeleteModal]=useState(false)
    const [detailPage,setDetailPage]=useState(false)
    const [detailPageData,setDetailPageData]=useState([])
    const [tutor,setTutor]=useState([]);

    const handlemodal = async()=>{
        setModalvisible(true)
        setPageUI(false)
    }

    // const CourseDataFetch=async()=>{
    //   try {
    //     const response = await GetAllCourse()
    //     if(response.success === true){
    //       console.log(response,"sucess");
    //       setCourseData(response.courses)
    //       setLoading(false)
    //     }else{
    //       console.log(response,"error..................");
    //     }
    //   } catch (error) {
    //     console.log(error);
    //   }
    // }
    
  const UsertokenCheck = async()=>{
    try {
        const response = await TokenExpiry('token-refresh-vini',"tutor")
        if(response){
        console.log("not expired");
        }else{
          console.log("token -expired");
          window.location.href='/login'
        }
    
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(()=>{
    UsertokenCheck()
  },[])

      const TutorCourseFetch=async()=>{
        try {
          const userid =localStorage.getItem("tutor-data-vini")
        const item= JSON.parse(userid)
        const response = await GetTutorProfile(item[0].id)
        if(response.success){
          console.log(response,"res");
          setCourseData(response.courses)
          setTutor(response.profile)
          setLoading(false)
        }else{
          console.log(response);
        }
        } catch (error) {
          console.log(error);
        }
      }
      
    useEffect(()=>{
      // CourseDataFetch();
      TutorCourseFetch()
    },[])
      const handledetailclick =(item)=>{
        try {
          console.log(item,"data");
          setDetailPage(true)
          setPageUI(false)
          setDetailPageData(item)
        } catch (error) {
          console.log(error);
        }
      }
      const handleDeleteCourse =async()=>{
        try {
          const tokens = await token("token-refresh-vini")
          const response = await DeleteCourse(deleteid,tokens.access)
          if(response.success === true){
            console.log(response,"success");
            toast.success(`${response.message}`)
            TutorCourseFetch();
            setDeleteModal(false)
          }else{
            toast.error(`${response.message}`)
            console.log(response,"error");
          }
        } catch (error) {
          console.log(error);
          toast.error(`${error}`)
        }
      }

  return (
    <div>
     <>
     
      <header className="main-header-two">
  <nav className="main-menu">
    <div className="container">
      <div className="main-menu__logo">
        <Link href="index.html">
          <img
             src={logo2}
             width={410}
             height={60}
            alt="Eduact"
          />
        </Link>
      </div>
      {/* /.main-menu__logo */}
      <div className="main-menu__nav">
        {/*  */}
      </div>
      {/* /.main-menu__nav */}
      <div className="main-menu__right">
       
                <Link to="/tutor-Profile" className="main-menu__login">
                {/* <i className="icon-account-1"/> */}
                <img src={proficon} alt="" />
            </Link>
            </div>
      {/* /.main-menu__right */}
    </div>
    {/* /.container */}
  </nav>
  {/* /.main-menu */}
</header>
{pageUI&&<><section
  className="hero-banner-two"
  style={{ backgroundImage:bgimg1 }}
  id="home"
>
 
 
  <div
    className="hero-banner-two__bg-shape1 wow fadeInUp"
    data-wow-delay="500ms"
  >
    
  </div>
  {/* banner-bg-shape */}
  <div className="container">
    <div className="row">
      <div className="col-lg-6 d-flex align-items-center">
        <div className="hero-banner-two__content">
          <h2
            className="hero-banner-two__title wow fadeInUp"
            data-wow-delay="400ms"
          >
            Come Along
            <br /> As We Begin Our
            <br /> Learning
            <span>
              Journey
              
            </span>
          </h2>
          <p
            className="hero-banner-two__text wow fadeInUp"
            data-wow-delay="500ms"
          >
            As a dedicated tutor with a passion for teaching, I am committed to<br /> 
             inspiring and empowering students to reach their full potential.<br /> 
              My motivation comes from seeing my students grow, succeed, and<br /> 
               develop a lifelong love for learning.<br /> 
            
          </p>
          <div
            className="hero-banner-two__btn wow fadeInUp"
            data-wow-delay="600ms"
          >
            <a  className="eduact-btn eduact-btn-second" onClick={handlemodal}>
              <span className="eduact-btn__curve" />
              Add Course
              <i className="icon-arrow" />
            </a>
          </div>
          {/* banner-btn */}
        </div>
        {/* banner-content */}
      </div>
      <div className="col-lg-6">
        <div
          className="eduact-stretch-element-inside-column wow slideInRight"
          data-wow-delay="300ms"
        >
          <div className="hero-banner-two__stretch-image">
            <img src={bannerimg1} alt="eduact" />
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

    <section className="course-two course-two--page" >
      <div
        className="course-two__shape-top wow fadeInRight "
        data-wow-delay="300ms"
      >
        {/* <img src={img2} alt="eduact" /> */}
      </div>
      <div className="container">
        <div className="row">
        
          
        {isloading? (
          <div className="loader-container">
            <div className="loader"></div>
          </div>
        ) :(courseData ? courseData.map((data,index)=>(
          <div className="col-xl-4 col-md-6 wow fadeInUp course-card"
            data-wow-delay="400ms" key={index}>
            <div >
            <div className="course-card">
          <div>
            <img
              src={data.thumbnail}
              alt="eduact"
              className="course-image"
              height={125}
              style={{ borderRadius: "20px" }}
            />
          </div>
      
          <div className="course-two__content">
            <div className='container pt-2 pb-2 d-flex justify-content-between' style={{  alignItems: 'center', borderRadius: "12px" }}>
              {/* <div>
                <img src={data.tutor?.profile_image || profileimg} alt="" style={{ height: 45, width: 45, borderRadius: '50%' }} />
              </div> */}
              <div style={{ marginLeft: 10 }}>
                <h5 style={{ fontWeight: "bolder", fontFamily: "sans-serif", fontSize: 25 }}>{data.name}</h5>
              </div>
              <div>
                <i><p style={{ fontSize: "14px" }}>Duration: {data.duration}</p></i>
              </div>
            </div>
          <div className='d-flex justify-content-between'>
          <button className='btn btn-danger'  onClick={()=>{setDeleteId(data.id),setDeleteModal(true)}}>Delete</button>
          <button className='btn btn-success'  onClick={()=>handledetailclick(data)}>View Details</button>
          </div>
           
          </div>
        </div>
            </div>
          </div>
        )):<div className="loader-container"><p className='text-danger'>No Course Found !!!</p></div>)}
         
        </div>
      </div>
      <div
        className="course-two__shape-bottom wow fadeInLeft"
        data-wow-delay="400ms"
      >
        <img src={img1} alt="eduact" />
      </div>
    </section></>}
    </>
   
   {modalvisible && <AddCourse setPage={setPageUI} setModal={setModalvisible}  datafetch={TutorCourseFetch} setLoading={setLoading}/>}

    {detailPage && <Tutorcourse data={detailPageData}  setDetailPage={setDetailPage} tutor={tutor} setPageUI={setPageUI}/>}
  
    {DeleteModal&&<div className="modal bg" tabIndex="-1" role="dialog" style={{
      display:"block",
          background: "rgba(102, 54, 255, 0.12)",
          borderRadius: "16px",
          boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
          backdropFilter: "blur(10.8px)",
          WebkitBackdropFilter: "blur(5.8px)",
          border: "1px solid rgba(255, 255, 255, 0.26)"
      }}>
        <div class="modal-dialog" role="document">
            <div class="modal-content" style={{
          display: 'block',
          background: "rgba(102, 54, 255, 0.12)",
          borderRadius: "16px",
          boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
          backdropFilter: "blur(10.8px)",
          WebkitBackdropFilter: "blur(5.8px)",
          border: "1px solid rgba(255, 255, 255, 0.26)"
      }}>
            <div className="modal-body">
            <button
              aria-label="Close"
              className="btn-close"
              data-bs-dismiss="modal"
              type="button" onClick={()=>setDeleteModal(false)}
            >
              {/* <span aria-hidden="true">&times;</span> */}
            </button>
            <div class="modal-body">
                        <p className='text-white'>Are you sure you want to delete?</p>
                      </div>
                      <div class="modal-footer">
                       <button type="button" class="btn btn-secondary"
                        aria-label="Close"
                        data-bs-dismiss="modal"
                        id="close-modal" onClick={()=>setDeleteModal(false)}>No</button>
                        <a onClick={handleDeleteCourse}  class="btn btn-danger" type="button">Yes</a>
                       </div>
          
          </div>
        </div>
    </div>
   </div>}
    </div>
  )
}

export default Tutorhome
