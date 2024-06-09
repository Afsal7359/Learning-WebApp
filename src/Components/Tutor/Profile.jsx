import React, { useEffect, useState } from 'react'
import profileimg from "../../assets/images/profileimg.png"
import { toast } from 'react-toastify'
import { AddCertificate, GetTutorProfile } from '../../Api/Profile'
import { useForm } from "react-hook-form"
import { LogoutUser, refreshToken } from '../../Api/Authentication'
import PasswordChange from '../Modals/PasswordChange'
import ProfileEdit from '../Modals/ProfileEdit'
import Edit from "../../assets/images/edit.png"
import profimg from '../../assets/images/gallery/fg-3.jpg'
import './Course.css'
import { Link,useNavigate } from 'react-router-dom'



function Profile() {
  const { register, handleSubmit, reset,watch, formState: { errors },} = useForm()
  const [data,setData]=useState([])
  const [qualification,setQualification]=useState([]);
  const [isloading,setLoading]=useState(true)
  const [selectedFile, setSelectedFile] = useState(null);
  const [logoutmodal,setLogoutModal]=useState(false)
  const [passwordModal,setPasswordModal]=useState(false) 
  const [EditModal,setEditModal]=useState(false) 
  const user = "token-refresh-vini"
  const navigate = useNavigate();
    const passwordmodalvisible =()=>{
      setPasswordModal(true)
    }
    const handleEditModal =()=>{
      setEditModal(true)
    }
    

  const handleFileChange = (e) => {
      const file = e.target.files[0];
      setSelectedFile(file)
    };
console.log(selectedFile,"selectfile");
    console.log(qualification,"qualification");
    const ProfileDataFetch =async()=>{
      try {
        const userid =localStorage.getItem("tutor-data-vini")
        const item= JSON.parse(userid)
        const response= await GetTutorProfile(item[0].id)
        if(response.success === true){
          console.log(response,"response success");
          setData(response.profile)
          setQualification(response.qualifications)
          setLoading(false)
        }else{
          // console.log(response,"error");
        }
      } catch (error) {
        toast.error(`${error}`)
      }
    }
    useEffect(()=>{
      ProfileDataFetch();
    },[])

    const onformsubmit =async(data)=>{
      try {
        const userid =localStorage.getItem("tutor-data-vini")
        const item= JSON.parse(userid)
        const formdata ={
          tutor:item[0].id,
          qualification:data.qualification,
          certificate:selectedFile,
        }
        console.log(formdata,"formdata");
        const datas={
          refresh:localStorage.getItem("token-refresh-vini")
      }
      const tokencreate = await refreshToken(datas);
      if(tokencreate.success === true){
          localStorage.setItem("token-refresh-vini" , tokencreate.access)
          console.log(tokencreate);
      }else{
          console.log(tokencreate,"error");
      }
      console.log(tokencreate.access,"access");
        const response = await AddCertificate(formdata,tokencreate.access)
        if(response.success===true){
          ProfileDataFetch();
          console.log(response,"sucess");
          toast.success(`${response.message}`)
          reset();
        setSelectedFile(null);
        }else{
          console.log(response,"error");
        }
      } catch (error) {
        console.log(error);
        toast.error(`${error}`);
      }
    }
    const handleConfirm =async()=>{
      try  {
          const data ={
            refresh:localStorage.getItem('token-refresh-vini')
          }
          const response = await LogoutUser(data)
          if (response.success){
            localStorage.removeItem('token-access-vini')
            localStorage.removeItem('tutor-data-vini')
            localStorage.removeItem('token-refresh-vini')
            toast.success(`${response.message}`)
            // window.location.href = '/login'
            // navigate('/login')
            navigate('/login'); 
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
                <Link to="/tutor">
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
      </div>
       ):(
      
          <div className='mainbody mt-5'>
          <div className="page-content page-container" id="page-content">
  <div className="padding">
    <div className="row container d-flex justify-content-center">
      <div className="col-xl-12 col-md-12">
        <div className="card user-card-full">
          <div className="row m-l-0 m-r-0">
            <div className="col-sm-4 col-md-12 col-md-12 bg-c-lite-green user-profile">
              <div className="card-block text-center text-white">
                <div className="m-b-1">
                  <img
                    src={data.profile_image?data.profile_image:profimg}
                    className="img-radius"
                    alt="User-Profile-Image"
                    style={{ width: 130,borderRadius:"50%",height:130 }}
                  />

                </div>
                <a style={{cursor:"pointer"}}>
               {/* <img src={Edit} alt="" className='m-b-25'  onClick={handleEditModal} /> */}
               <Link onClick={handleEditModal}>
               Edit
               </Link>
               </a>
                
                <p className='mt-4' style={{fontWeight:"900", fontSize:"25px"}}>{data?data.username:""}</p>
                <h6 className="f-w-600">{data?data.person:""}</h6>
                <i className=" mdi mdi-square-edit-outline feather icon-edit m-t-10 f-16" />
              </div>
            </div>
            <div className="col-sm-8">
              <div className="card-block">
              <ul class="social-link list-unstyled m-t-40 m-b-10 " style={{marginLeft:"20em"}}>
              <div className="d-flex justify-content-end mt-5">
                <button className="btn btn-success" style={{ borderRadius: "25px" }} onClick={passwordmodalvisible}>
                  Change password
                </button>
                <button className="btn btn-danger ms-4" style={{ borderRadius: "25px" }} onClick={() => setLogoutModal(true)}>
                  Logout
                </button>
              </div></ul>
                <h6 className="m-b-20 p-b-5 b-b-default f-w-600">
                  Contact
                </h6>
                <div className="row">
                  <div className="col-sm-6">
                    <p className="m-b-10 f-w-600">Email</p>
                    <h6 className="text-muted f-w-400">{data?data.email:""}</h6>
                  </div>
                  <div className="col-sm-6">
                    <p className="m-b-10 f-w-600">User Id</p>
                    <h6 className="text-muted f-w-400">{data?data.id:""}</h6>
                  </div>
                </div>
                <h6 className="m-b-20 m-t-40 p-b-5 b-b-default f-w-600">
                  Informations
                </h6>
                <div className="row">
                  <div className="col-sm-6">
                    <p className="m-b-10 f-w-600">Gender</p>
                    <h6 className="text-muted f-w-400">{data?data.username:""}</h6>
                  </div>
                  <div className="col-sm-6">
                    <p className="m-b-10 f-w-600">Date Of Birth</p>
                    <h6 className="text-muted f-w-400">{data?data.date_of_birth:""}</h6>
                  </div>
                </div>
               
              </div>
            </div>
            <div className="col-lg-8">
                          <div className="card mb-4">
                            <div className="card-body">
                              <div className="row">
                                <div className="col-sm-3">
                                  {/* <p className="mb-0">Certifications</p> */}
                                </div>
                                <div className="col-sm-9 p-4" style={{
                                  borderRadius:"35px", 
                                  background: "rgba(102, 54, 255, 0.12)",
                                  borderRadius: "16px",
                                  boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
                                  backdropFilter: "blur(15.8px)",
                                  WebkitBackdropFilter: "blur(5.8px)",
                                  border: "1px solid rgba(255, 255, 255, 0.26)"}}>
                                  <form onSubmit={handleSubmit(onformsubmit)}>
                                  <div className="form-group local-forms">
                                    
                                    {selectedFile && (
                                      <iframe
                                        src={selectedFile}
                                        style={{ width: '100%', height: '200px' }} 
                                        frameBorder="0"
                                        scrolling="auto"
                                        allowFullScreen
                                        title="PDF Preview"
                                      />
                                    )}
                                    <input 
                                    {...register("qualification")}
                                    type="text" className='form-control mb-4 mt-3' placeholder='Qualification...' required/>
                                    <input className="form-control" type="file" onChange={handleFileChange} accept="application/pdf" required/>
                                    <label className='mt-4'>
                                      Please Upload Certificates in pdf format{" "}
                                    </label>
                                    <button className="btn m-2 btn-primary" style={{borderRadius:"15px"}}>Upload</button>
                                    
                                  </div>
                                
                                  </form>
                                
                                </div>  
                              </div>
                            </div>
                          </div>
                        </div>
                    <div className="row">
                    {qualification && qualification.length !== 0 ? qualification.map((item, index) => (
                      <div className={`col-lg-4 `} key={index}>
                        <div className="card mb-3">
                                      <iframe
                                        src={item.certificate}
                                        style={{ width: '100%', height: '200px' }} 
                                        frameBorder="0"
                                        scrolling="auto"
                                        allowFullScreen
                                        title="PDF Preview"
                                      />
                          <div className="card-body">
                            <h5 className="card-title">{item.qualification}</h5> 
                            {/* <p className="card-text">
                              Some quick example text to build on the card title and make up the bulk of
                              the card's content.
                            </p> */}
                            {/* <a href="#" className="btn btn-primary">
                              Go somewhere
                            </a> */}
                          </div>
                        </div>
                      </div>
                    )) : ""}

                      
                      
                        </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div></div>

       ) }
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
                    <p>Are you sure, you want to Logout?</p>
                    <div className="d-flex justify-content-between mt-5">
                   <button type="button" class="btn btn-secondary"
                    aria-label="Close"
                    data-bs-dismiss="modal"
                    id="close-modal" onClick={()=>setLogoutModal(false)}>No</button>
                    <a onClick={handleConfirm}  class="btn btn-danger" type="button">Logout</a>
                   </div>
                   </div>
      
      </div>
    </div>
</div>
        </div>)
}
  {passwordModal && <PasswordChange Modal={passwordModal} setModal={setPasswordModal}/>}

   {EditModal && <ProfileEdit Modal={EditModal} setModal={setEditModal} handle={ProfileDataFetch} users={user}/>}
    </div>
  )
}

export default Profile