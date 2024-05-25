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

const Tutorhome = () => {
    const [modalvisible,setModalvisible]=useState(false);
    const [pageUI,setPageUI]=useState(true)
    const [data,setData]=useState([])
    const [isloading,setLoading]=useState(true)
    const [deleteid,setDeleteId]=useState(null)

    const [detailPage,setDetailPage]=useState(false)
    const [detailPageData,setDetailPageData]=useState([])

    const handlemodal = async()=>{
        setModalvisible(true)
        setPageUI(false)
    }

    const CourseDataFetch=async()=>{
      try {
        const response = await GetAllCourse()
        if(response.success === true){
          console.log(response,"sucess");
          setData(response.courses)
          setLoading(false)
        }else{
          console.log(response,"error..................");
        }
      } catch (error) {
        console.log(error);
      }
    }

    useEffect(()=>{
      CourseDataFetch();
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
          const response = await DeleteCourse(deleteid)
          if(response.success === true){
            console.log(response,"success");
            toast.success(`${response.message}`)
            CourseDataFetch();
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
       {/* <header className="main-header">
        <nav className="main-menu">
        <div className="container">
            <div className="main-menu__logo">
            <button
                className="main-menu__login p-2 "
                onClick={handlemodal}
                style={{
                height: 40,
                width: 150,
                color: "#ffffff",
                backgroundColor: "#064f89",
                borderRadius: 15,
                
                }}
            >
                <span className="eduact-btn__curve" />
                Add Course
            </button>
            </div>
            
            <div className="main-menu__nav"></div>
         
            <div className="main-menu__right">
            <Link
                to="/tutor/Profile"
                className="main-menu__login p-2"
                style={{
                height: 40,
                width: 110,
                color: "#ffffff",
                backgroundColor: "#064f89",
                borderRadius: 15
                }}
            >
                <i className="icon-account-1" />
                <span className="eduact-btn__curve" />
                Profile
            </Link>
            </div>
        </div>
        </nav>
      </header> */}
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
<section
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
        className="course-two__shape-top wow fadeInRight"
        data-wow-delay="300ms"
      >
        {/* <img src={img2} alt="eduact" /> */}
      </div>
      <div className="container">
        <div className="row">
          {/* <div className="section-title text-center">
            <h5 className="section-title__tagline">
              Hai Welcome Tutor
              <svg
                className="arrow-svg"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 55 13"
              >
                <g clipPath="url(#clip0_324_36194)">
                  <path d="M10.5406 6.49995L0.700562 12.1799V8.56995L4.29056 6.49995L0.700562 4.42995V0.819946L10.5406 6.49995Z" />
                  <path d="M25.1706 6.49995L15.3306 12.1799V8.56995L18.9206 6.49995L15.3306 4.42995V0.819946L25.1706 6.49995Z" />
                  <path d="M39.7906 6.49995L29.9506 12.1799V8.56995L33.5406 6.49995L29.9506 4.42995V0.819946L39.7906 6.49995Z" />
                  <path d="M54.4206 6.49995L44.5806 12.1799V8.56995L48.1706 6.49995L44.5806 4.42995V0.819946L54.4206 6.49995Z" />
                </g>
              </svg>
            </h5>
            <h3 className="section-title__title">{data.length === 0 ?"No Course Found !!!":"Course List" }</h3>
          </div> */}
          
        {isloading? (
          <div className="loader-container">
            <div className="loader"></div>
          </div>
        ) :(data.data ? data.data.map((item,index)=>(
          <div className="col-xl-4 col-md-6 wow fadeInUp"
            data-wow-delay="400ms" key={index}>
            <div >
            <a> 
              <div className="course-two__thumb" onClick={()=>handledetailclick(item)}>
                <img src={item.thumbnail} alt="eduact" style={{ width: "300px", height: "200px" }}  />
              </div>
              <div className="course-two__content">
                <h3 className="course-two__title">
                  <a >
                    {item.name}
                  </a>
                </h3>
                <p>{item.description}</p>
                <button className='btn btn-danger' onClick={()=>{setDeleteId(item.id)}} data-bs-target="#deletemodal" data-bs-toggle="modal">Delete</button>
              </div>
              </a>
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
    </section>
    </>
   
   {modalvisible && <AddCourse setPage={setPageUI} setModal={setModalvisible} datafetch={CourseDataFetch} setLoading={setLoading}/>}

    {detailPage && <Tutorcourse data={detailPageData}  setDetailPage={setDetailPage} setPageUI={setPageUI}/>}
  
    <div id="deletemodal" class="modal fade">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
            <div className="modal-body">
            <button
              aria-label="Close"
              className="btn-close"
              data-bs-dismiss="modal"
              type="button"
            >
              {/* <span aria-hidden="true">&times;</span> */}
            </button>
            <div class="modal-body">
                        <p>Are you sure you want to delete?</p>
                      </div>
                      <div class="modal-footer">
                       <button type="button" class="btn btn-secondary"
                        aria-label="Close"
                        data-bs-dismiss="modal"
                        id="close-modal">No</button>
                        <a onClick={handleDeleteCourse}  class="btn btn-danger" type="button">Yes</a>
                       </div>
          
          </div>
        </div>
    </div>
   </div>
    </div>
  )
}

export default Tutorhome
