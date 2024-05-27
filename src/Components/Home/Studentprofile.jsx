import React, { useEffect, useState } from 'react'
import PasswordChange from '../Modals/PasswordChange';
import ProfileEdit from '../Modals/ProfileEdit';
import { toast } from 'react-toastify';
import { GetUserProfile } from '../../Api/Profile';
import { Link } from 'react-router-dom';
import profileimg from "../../assets/images/gallery/fg-4.jpg"
import Edit from "../../assets/images/edit.png"
import './Profile.css'
import { LogoutUser } from '../../Api/Authentication';

function Studentprofile() {

  const [data,setData]=useState([])
  const [passwordModal,setPasswordModal]=useState(false) 
  const [EditModal,setEditModal]=useState(false) 
  const [isloading,setLoading]=useState(true)
  const [logoutmodal,setLogoutModal]=useState(false)

    const user = "student-refresh-vini"
    const passwordmodalvisible =()=>{
      setPasswordModal(true)
    }
    const handleEditModal =()=>{
      setEditModal(true)
    }
    const handleProfiledatafetch =async()=>{
      try {
        // if (data.length === 0){
          const Item = localStorage.getItem("student-data-vini")
          const datas = JSON.parse(Item)
          
          const response = await GetUserProfile(datas[0].id)
          if(response.success===true){
            console.log(response,'suuccess');
            setLoading(false)
            setData(response.student_profile)

          }else{
            console.log("error");
          }
        }
        catch (error) {
        toast.error(`${error}`)
      }
    }
  useEffect(()=>{
  
      handleProfiledatafetch();
    
    
  },[EditModal])
  // console.log(data.profile_image,"link");

  const handleConfirm =async()=>{
    try  {
        const data ={
          refresh:localStorage.getItem('student-refresh-vini')
        }
        const response = await LogoutUser(data)
        if (response.success){
          localStorage.removeItem('student-refresh-vini')
          localStorage.removeItem('student-access-vini')
          localStorage.removeItem('student-data-vini')
          toast.success(`${response.message}`)
          window.location.href = '/login'
          // navigate('/login')
        }else{
          toast.success(`${response.message}`)
        }
      }  catch (error) {
        console.log(error);
    }
}
 
  return (
    <div>
                <header className="main-header">
            <nav className="main-menu">
            <div className="container">
                <div className="main-menu__logo mb-4">
                <Link to="/">
                    <i className="icon-arrow-left" />
                </Link>
                </div>
                {/* /.main-menu__logo */}
                <div className="main-menu__nav"></div>
                {/* /.main-menu__nav */}
                <div className="main-menu__right"></div>
                {/* /.main-menu__right */}
            </div>
            {/* /.container */}
            </nav>
            {/* /.main-menu */}
        </header>
        {isloading ? (
          <div class="loader-container">
          <div class="loader"></div>
        </div>):(
        <div className='mainbody mt-5'>
        <div className="page-content page-container" id="page-content">
          <div className="padding">
            <div className="row container d-flex justify-content-center">
              <div className="col-xl-12 col-md-12">
                <div className="card user-card-full">
                  <div className="row m-l-0 m-r-0">
                    <div className="col-12 col-md-12 col-sm-12 bg-c-lite-green user-profile">
                      <div className="card-block text-center text-white">
                        <div className="m-b-1">
                          <img
                            src={data[0].profile_image ? data[0].profile_image : profileimg}
                            className="img-radius"
                            alt="User-Profile-Image"
                            style={{ width: 130, borderRadius: "50%", height: 130 }}
                          />
                        </div>
                        <a style={{ cursor: "pointer" }}>
                          <Link onClick={handleEditModal}>
                            {/* <img src={Edit} alt="" className='m-b-25'  onClick={handleEditModal} /> */}
                            Edit
                          </Link>
                        </a>
                        <p className='mt-3' style={{ fontWeight: "900", fontSize: "25px" }}>{data[0]?.username}</p>
                        <h6 className="f-w-600">{data[0]?.person}</h6>
                        <i className="mdi mdi-square-edit-outline feather icon-edit m-t-10 f-16" />
                      </div>
                    </div>
                    <div className="col-12 col-md-12 col-sm-12">
                      <div className="card-block">
                        <div className="d-flex justify-content-end mt-3 mt-md-5">
                          <button className="btn btn-success" style={{ borderRadius: "25px" }} onClick={passwordmodalvisible}>
                            Change password
                          </button>
                          <button className="btn btn-danger ms-4" style={{ borderRadius: "25px" }} onClick={() => setLogoutModal(true)}>
                            Logout
                          </button>
                        </div>
                        <h6 className="m-b-20 p-b-5 b-b-default f-w-600 mt-3 mt-md-5">Contact</h6>
                        <div className="row">
                          <div className="col-sm-6">
                            <p className="m-b-10 f-w-600">Email</p>
                            <h6 className="text-muted f-w-400">{data[0]?.email}</h6>
                          </div>
                          <div className="col-sm-6">
                            <p className="m-b-10 f-w-600">User Id</p>
                            <h6 className="text-muted f-w-400">{data[0]?.id}</h6>
                          </div>
                        </div>
                        <h6 className="m-b-20 m-t-40 p-b-5 b-b-default f-w-600">Informations</h6>
                        <div className="row">
                          <div className="col-sm-6">
                            <p className="m-b-10 f-w-600">Gender</p>
                            <h6 className="text-muted f-w-400">{data[0]?.username}</h6>
                          </div>
                          <div className="col-sm-6">
                            <p className="m-b-10 f-w-600">Date Of Birth</p>
                            <h6 className="text-muted f-w-400">{data[0]?.date_of_birth}</h6>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
      
                <div className="cards-container">
                  {data.courses?.map((item, index) => (
                    <div className="card" key={index} style={{ width: "18rem" }}>
                      <img className="card-img-top" src={item.thumbnail} alt="Card image cap" />
                      <div className="card-body">
                        <h5 className="card-title">{item.name}</h5>
                        <p className="card-text">
                          {item.description.split(' ').slice(0, 20).join(' ')}
                        </p>
                      </div>
                    </div>
                  ))}
                  {/* Add more cards if needed */}
                </div>
      
              </div>
            </div>
          </div>
        </div>
      </div>
      )}
          {logoutmodal&&
              (<div className="modal bg" tabIndex="-1" role="dialog" style={{
                display: 'block',
                background: "rgba(102, 54, 255, 0.12)",
                borderRadius: "16px",
                boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
                backdropFilter: "blur(15.8px)",
                WebkitBackdropFilter: "blur(5.8px)",
                border: "1px solid rgba(255, 255, 255, 0.26)"
            }}>
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
                    onClick={()=>setLogoutModal(false)}
                    type="button"
                  >
                    {/* <span aria-hidden="true">&times;</span> */}
                  </button>
                  <div class="modal-body">
                              <p className='text-white'>Are you sure, you want to Logout?</p>
                              <div className="d-flex justify-content-between mt-5">
                            <button type="button" class="btn btn-secondary"
                              onClick={()=>setLogoutModal(false)}>No</button>
                              <a onClick={handleConfirm}  class="btn btn-danger" type="button">Logout</a>
                            </div>
                            </div>
                
                </div>
              </div>
          </div>
                  </div>)
          }
   {passwordModal && <PasswordChange Modal={passwordModal} setModal={setPasswordModal}/>}

   {EditModal && <ProfileEdit Modal={EditModal} setModal={setEditModal}  handle={handleProfiledatafetch} users={user}/>}
    </div>
  )
}

export default Studentprofile