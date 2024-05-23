import React, { useEffect, useState } from 'react'
import PasswordChange from '../Modals/PasswordChange';
import ProfileEdit from '../Modals/ProfileEdit';
import profile from '../../assets/images/profileimg.png'
import { toast } from 'react-toastify';
import { GetUserProfile } from '../../Api/Profile';

function Studentprofile() {

  const [data,setData]=useState([])
  const [passwordModal,setPasswordModal]=useState(false) 
  const [EditModal,setEditModal]=useState(false) 
  const [isloading,setLoading]=useState(true)


    const passwordmodalvisible =()=>{
      setPasswordModal(true)
    }
    const handleEditModal =()=>{
      setEditModal(true)
    }
    
  useEffect(()=>{
  
   
      const handleProfiledatafetch =async()=>{
        try {
          // if (data.length === 0){
            const Item = localStorage.getItem("student-data-vini")
            const datas = JSON.parse(Item)
            
            const response = await GetUserProfile(datas[0].id)
            if(response.success===true){
              console.log(response,'suuccess');
              console.log(response.user,"res");
              setLoading(false)
              setData(response.user)
            }else{
              console.log("error");
            }
          }
          catch (error) {
          toast.error(`${error}`)
        }
      }
      handleProfiledatafetch();
    
    
  },[EditModal])
  console.log(data,"data");
  // console.log(data.profile_image,"link");


 
  return (
    <div>
                <header className="main-header">
            <nav className="main-menu">
            <div className="container">
                <div className="main-menu__logo mb-4">
                <a href="/">
                    <i className="icon-arrow-left" />
                </a>
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
        <section style={{ backgroundColor: "#064f89",height:"100vh" }}>
          <div className="container py-5">
            <div className="row">
              <div className="col-lg-4">
                <div className="card mb-4">
                  <div className="card-body text-center">
                    <img
                      src={data.profile_image?data.profile_image:profile}
                      alt="profile image"
                      className="rounded-circle img-fluid"
                      style={{ width: 130 }}
                    />
                    <h5 className="my-3" id="tutoe" />
                    <div className="d-flex justify-content-center mb-2">
                      <button
                        type="button"
                        className="btn btn-primary"
                        style={{ backgroundColor: "#064f89" }}
                        onClick={handleEditModal}
                      >
                        Update Profile Image
                      </button>
                    </div>
                    <div className="d-flex justify-content-center mb-2">
                      <button
                        type="button"
                        className="btn btn-primary"
                        style={{ backgroundColor: "#064f89" }}
                        onClick={passwordmodalvisible}
                      >
                      Change Password
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-8">
                <div className="card mb-4">
                  <div className="card-body">
                    <div className="row">
                      <div className="col-sm-3">
                        <p className="mb-0">User Name</p>
                      </div>
                      <div className="col-sm-9">
                        <p className="text-muted mb-0">{data?data.username:""}</p>
                      </div>
                    </div>
                    <hr />
                    <div className="row">
                      <div className="col-sm-3">
                        <p className="mb-0">Email</p>
                      </div>
                      <div className="col-sm-9">
                        <p className="text-muted mb-0">{data?data.email:""}</p>
                      </div>
                    </div>
                    <hr />
                    <div className="row">
                      <div className="col-sm-3">
                        <p className="mb-0">Date Of Birth</p>
                      </div>
                      <div className="col-sm-9">
                        <p className="text-muted mb-0">{data?data.date_of_birth:""}</p>
                      </div>
                    </div>
                    <hr />
                    <div className="row">
                      <div className="col-sm-3">
                        <p className="mb-0">Gender</p>
                      </div>
                      <div className="col-sm-9">
                        <p className="text-muted mb-0">{data?data.gender:""}</p>
                      </div>
                    </div>
                    <hr />
                  </div>
                </div>
              </div>
              {/* <div className="col-lg-8">
                <div className="card mb-4">
                  <div className="card-body">
                    <div className="row">
                      <div className="col-sm-3">
                        <p className="mb-0">Course</p>
                      </div>
                      <div className="col-sm-9">
                        <div className="form-group local-forms">
                          <div style={{backgroundColor:"#064f89" , height:"45px", width:"50%",borderRadius:"15px",}}>
                              <p style={{color:"white",textAlign:"center"}}>Course Name</p>  
                              <p style={{color:"black",textAlign:"center"}}>Course Name</p>  
                          </div>
                        
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div> */}
            </div>
          </div>
        </section>)}
   {passwordModal && <PasswordChange Modal={passwordModal} setModal={setPasswordModal}/>}

   {EditModal && <ProfileEdit Modal={EditModal} setModal={setEditModal}/>}
    </div>
  )
}

export default Studentprofile