import React, { useEffect, useState } from 'react'
import profileimg from "../../assets/images/profileimg.png"
import { toast } from 'react-toastify'
import { AddCertificate, GetTutorProfile } from '../../Api/Profile'
import { useForm } from "react-hook-form"
import { refreshToken } from '../../Api/Authentication'
import PasswordChange from '../Modals/PasswordChange'
import ProfileEdit from '../Modals/ProfileEdit'

function Profile() {
  const { register, handleSubmit, watch, formState: { errors },} = useForm()
  const [data,setData]=useState([])
  const [qualification,setQualification]=useState([]);
  const [isloading,setLoading]=useState(true)
  const [selectedFile, setSelectedFile] = useState(null);

  const [passwordModal,setPasswordModal]=useState(false) 
  const [EditModal,setEditModal]=useState(false) 


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
          console.log(response,"sucess");
          toast.success(`${response.message}`)
          ProfileDataFetch();
        }else{
          console.log(response,"error");
        }
      } catch (error) {
        console.log(error);
        toast.error(`${error}`);
      }
    }
  return (
    <div>
         <header className="main-header">
            <nav className="main-menu">
            <div className="container">
                <div className="main-menu__logo mb-4">
                <a href="/tutor">
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
      </div>
       ):(
              <section style={{ backgroundColor: "#064f89",justifyContent:"center",alignItems:"center",minHeight:"100vh",display:"flex" }}>
                    <div className="container py-5">
                      <div className="row">
                        <div className="col-lg-4">
                          <div className="card mb-4">
                            <div className="card-body text-center">
                              <img
                                src={data.profile_image?data.profile_image:profileimg}
                                alt="profile image"
                                className="rounded-circle img-fluid"
                                style={{ width: 150 }}
                              />
                              <h5 className="my-3" id="tutoe" />
                              <p className="text-muted mb-1">Tutor</p>
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
                                  <p className="mb-0">Gender</p>
                                </div>
                                <div className="col-sm-9">
                                  <p className="text-muted mb-0">{data?data.gender:""}</p>
                                </div>
                              </div>
                              <hr />
                              <div className="row">
                                <div className="col-sm-3">
                                  <p className="mb-0">Date of Birth</p>
                                </div>
                                <div className="col-sm-9">
                                  <p className="text-muted mb-0">{data?data.date_of_birth:""}</p>
                                </div>
                              </div>
                              <hr />
                            </div>
                          </div>
                        </div>
                        <div className="col-lg-8">
                          <div className="card mb-4">
                            <div className="card-body">
                              <div className="row">
                                <div className="col-sm-3">
                                  <p className="mb-0">Certifications</p>
                                </div>
                                <div className="col-sm-9">
                                  <form onSubmit={handleSubmit(onformsubmit)}>
                                  <div className="form-group local-forms">
                                    <label>
                                      Please Upload Certificates in pdf format{" "}
                                      <span className="login-danger">*</span>
                                    </label>
                                    {/* {selectedFile && (
                                      <iframe
                                        src={selectedFile}
                                        style={{ width: '100%', height: '200px' }} 
                                        frameBorder="0"
                                        scrolling="auto"
                                        allowFullScreen
                                        title="PDF Preview"
                                      />
                                    )} */}
                                    <input 
                                    {...register("qualification")}
                                    type="text" className='form-control mb-4 mt-3' placeholder='Qualification...' required/>
                                    <input className="form-control" type="file" onChange={handleFileChange} accept="application/pdf" required/>
                                    <button className="m-2 btn-primary">submit</button>
                                  </div>
                                  </form>
                                
                                </div>  
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
          </section>
       ) }
  {passwordModal && <PasswordChange Modal={passwordModal} setModal={setPasswordModal}/>}

   {EditModal && <ProfileEdit Modal={EditModal} setModal={setEditModal} handle={ProfileDataFetch()}/>}
    </div>
  )
}

export default Profile