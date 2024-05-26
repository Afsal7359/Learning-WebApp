import React, { useEffect, useState } from 'react'
import { DeleteCourse, GetAllCourse } from '../Api/Course';
import { toast } from 'react-toastify';
import Adminheader from './Adminheader';
import { token } from '../Api/token';
import UpdateToTrending from '../Components/Modals/UpdateToTrending';

const CourseList = () => {
    const [data,setData]=useState([])
    const [isloading,setLoading]=useState(true)
    const [deleteid,setDeleteId]=useState(null)
    const [Modal,setModal]=useState(false)
    const [deleteModal,setDeleteModal]=useState(false)

    const CourseDatafetch=async()=>{
        try {
            const response = await GetAllCourse()
            if(response.success===true){
                console.log(response);
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
        CourseDatafetch()
    },[])
    const handleDeleteCourse =async()=>{
        try {
            const tokens = await token("token-admin-refresh-vini")
          const response = await DeleteCourse(deleteid,tokens.access)
          if(response.success === true){
            console.log(response,"success");
            setDeleteModal(false)
            toast.success(`${response.message}`)
            CourseDatafetch();
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
        <Adminheader/>
        <section className="course-two  row home">
        <div className="container">
        <div className="row">
        <div className="section-title text-center">
            <h5 className="section-title__tagline">
              Hai Welcome Admin
            
            </h5>
            <h3 className="section-title__title">{data.length === 0 ?"No Course Found !!!":"Course List" }</h3>
          </div>
        {isloading ? (
            <div className="loader-container">
                <div className="loader"></div>
            </div>
        ):( 
           ( data?data.map((data,index)=>(
              (data.data ? data.data.map((item,index)=>(
                <div className="col-xl-4 col-md-6 wow fadeInUp"
                  data-wow-delay="400ms" key={index}>
                  <div >
                  <a> 
                    <div >
                      <img src={item.thumbnail} alt="eduact" style={{ width: "300px", height: "200px" }}  />
                    </div>
                    {/* /.course-thumb */}
                    <div className="course-two__content">
                      <h3 className="course-two__title">
                        <a >
                          {item.name}
                        </a>
                      </h3>
                      <p>{item.description}</p>
                     {item.is_trending !== true ? <button className='btn btn-success me-3' onClick={()=>{
                      setDeleteId(item.id)
                      setModal(true)
                     }}>Add To Trending</button>:""}
                      <button className='btn btn-danger' onClick={()=>{setDeleteId(item.id),setDeleteModal(true)}} data-bs-target="#deletemodal" data-bs-toggle="modal">Delete</button>
                    </div>
                    </a>
                  </div>
                </div>
              )):<h2>No course Found !!!</h2>)
          
            )):"")
           
        )}
        </div>
        </div>
        {Modal&& <UpdateToTrending setModal={setModal} id={deleteid} CourseDatafetch={CourseDatafetch} setLoading={setLoading}/>}
        </section>
       {deleteModal&& <div className="modal " tabIndex="-1" role="dialog" style={{ display: 'block',
            background: "rgba(102, 54, 255, 0.12)",
            borderRadius: "16px",
            boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
            backdropFilter: "blur(10.8px)",
            WebkitBackdropFilter: "blur(5.8px)",
            border: "1px solid rgba(255, 255, 255, 0.26)"}}>
        <div class="modal-dialog" role="document">
            <div class="modal-content" style={{
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
              type="button" onClick={()=>setDeleteModal(false)}
            >
              {/* <span aria-hidden="true">&times;</span> */}
            </button>
            <div class="modal-body">
                        <p className='text-white'>Are you sure you want to delete?</p>
                      </div>
                      <div className="d-flex justify-content-between mt-5">
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

export default CourseList