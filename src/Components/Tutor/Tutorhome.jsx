import React, { useEffect, useState } from 'react'
import AddCourse from '../Modals/AddCourse';
import { DeleteCourse, GetAllCourse } from '../../Api/Course';
import Tutorcourse from './Tutorcourse';
import { toast } from 'react-toastify';
import img1 from '../../assets/images/shapes/course-shape-2.png'
import img2 from '../../assets/images/shapes/course-shape-1.png'


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
          console.log(response,"error");
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
       {pageUI &&<>
       <header className="main-header">
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
            {/* /.main-menu__logo */}
            <div className="main-menu__nav"></div>
            {/* /.main-menu__nav */}
            <div className="main-menu__right">
            <a
                href="/tutor/Profile"
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
            </a>
            {/* /.login btn */}
            {/* <a href="contact.html" class="eduact-btn"><span class="eduact-btn__curve"></span>Get In Touch</a>/.contact btn */}
            </div>
            {/* /.main-menu__right */}
        </div>
        {/* /.container */}
        </nav>
      </header>
      
    <section className="course-two course-two--page">
      <div
        className="course-two__shape-top wow fadeInRight"
        data-wow-delay="300ms"
      >
        <img src={img2} alt="eduact" />
      </div>
      <div className="container">
        <div className="row">
          <div className="section-title text-center">
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
          </div>
          
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
        )):<h5 style={{justifyContent:"center",position:"fixed"}}>No Course Found</h5>)}
         
        </div>
      </div>
      <div
        className="course-two__shape-bottom wow fadeInLeft"
        data-wow-delay="400ms"
      >
        <img src={img1} alt="eduact" />
      </div>
    </section>
    </>}
   
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
