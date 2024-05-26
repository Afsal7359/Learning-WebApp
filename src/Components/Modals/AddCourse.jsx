import React, { useRef, useState } from 'react'
import { useForm } from "react-hook-form"
import { toast } from 'react-toastify'
import { GetCategory } from '../../Api/Category'
import {AddCourses, AddFiles, AddModules} from '../../Api/Course'
import { refreshToken } from '../../Api/Authentication'
import { token } from '../../Api/token'
import './Modal.css'
import DocViewer from 'react-doc-viewer';
import info from '../../assets/images/info.png'

const AddCourse = ({setPage,setModal,datafetch}) => {

    const { register, handleSubmit, watch, formState: { errors },} = useForm()

    const [image,setImage]=useState(null)
  const [state,setState]=useState(false)
    const [module,setModule]=useState([])
    const [categorydata,setCategoryData]=useState([])
    const fileInputRef = useRef();
    
        const handleFileSelect =async(event) =>{
            const files = event.target.files[0];
            
            if (files.type === 'video/mp4') {
              const datas = {
                video : files,
              }
              setState(true)
              console.log(datas,"daaaat");
              const tokens= await token("token-refresh-vini")
              const response = await AddFiles(datas ,"video",tokens.access)
              if(response.success === true){
                console.log(response);
                const name = module.length
                console.log(name,"length");
                setState(false)
                setModule([...module,{module_name:`Module ${name}`,module_type:"video",module_content_video:response.data.video}])
              }else{
                console.log(response,"error");
              }
            }else if(files.type === 'application/vnd.openxmlformats-officedocument.presentationml.presentation' || files.type === "application/vnd.ms-powerpoint"){
              const datas = {
                ppt : files,
              }
              setState(true)
              const tokens= await token("token-refresh-vini")
              const response = await AddFiles(datas,"pdf",tokens.access)
              if(response.success){
                console.log(response,"success");
                const name = module.length+1
                console.log(name,"length");
                setModule([...module,{module_name:`Module ${name}`,module_type:"ppt",module_content_ppt:response.data.pdf}])
                setState(false)
              }else{
                console.log(response,"error");
              }
              console.log(datas,"dataaaa");
            }
            console.log(module,"modules");
          }
      

        const handleCategory = async()=>{
            try {
              if(categorydata.length ===0){
                const response = await GetCategory();
                if(response.success === true){
                  setCategoryData(response.data)
                }else{
                  toast(response.message,'error')
                }
              }
            } catch (error) {
              console.log(error);
            }
          }

         const handleImage  = async(event)=>{
          try {
            const files = event.target.files[0]
            const fileSize = files.size / 1024 / 1024; // Convert bytes to MB

            if (fileSize > 1) {
              toast.error('File size exceeds 1 MB');
              fileInputRef.current.value = null;
            } else {
              const data ={
                thumbnail:files,
              }
              const tokens= await token("token-refresh-vini")
             const response = await AddFiles(data,"thumbnail",tokens.access);
             if(response.success === true){
              console.log(response,"success");
              setImage(response.data.thumbnail)
             }else{
              console.log(response,"error");
             }
            }
         
          } catch (error) {
            console.log(error);
          }
         } 
        const onSubmit =async (data) => {
          
            try {
              if (!image ){
                toast.error("Please Select Atleast One Image ")
              }else if(module.length===0){
                toast.error("Please Upload Atleast One Module")
              }else{
                // setState(true)
                const tokencreate = await token("token-refresh-vini")
                const formdata ={
                     name:data.name,
                     description : data.description,
                     thumbnail:image,
                     duration:data.duration,
                     category:data.category,
                     modules:module
                }
                 const response = await AddCourses(formdata,tokencreate.access);
                 if(response.success === true){
                  datafetch()
                   toast.success(response.message)
                   console.log(response,"succc");
                   setPage(true)
                   setModal(false)
                 } else{
                   toast.error(`${response.message}`)
                   console.log(response,"error");
                 }
             
              }
             
            } catch (error) {
              console.log(error);
            }
          
          };
          const handleRemoveModule = (index) => {
            setModule(module.filter((_, i) => i !== index));
          };
console.log(module,"modules");
  return (
        <> 
     <div className="modal bg" tabIndex="-1" role="dialog" style={{
          display: 'block',
          background: "rgba(102, 54, 255, 0.12)",
          borderRadius: "16px",
          boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
          backdropFilter: "blur(10.8px)",
          WebkitBackdropFilter: "blur(5.8px)",
          border: "1px solid rgba(255, 255, 255, 0.26)"
      }}>
      
            <div className="modal-dialog" role="document">
            <div className="modal-content p-2" style={{
          display: 'block',
          background: "rgba(102, 54, 255, 0.12)",
          borderRadius: "16px",
          boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
          backdropFilter: "blur(5.8px)",
          WebkitBackdropFilter: "blur(5.8px)",
          border: "1px solid rgba(255, 255, 255, 0.26)"
      }} >
             
              <form onSubmit={handleSubmit(onSubmit)}>
              {/* {state?(
                <div className="loader-container"> <div className="loader"></div> </div>
              ):( */}
                <div className="modal-body">
                    
                    <h4 style={{textAlign:"center"}}>Add course</h4>
                    <div className="form-group m-2 mt-5" >
                    <label htmlFor="thumbnail" style={{color:"#2A254D"}}>Course Name</label>
                      <input style={{borderRadius:"10px"}}
                       {...register('name', {
                        required: 'Course name is required',
                        minLength: { value: 1, message: 'Minimum length is 1' },
                        pattern: {
                          value: /^[a-zA-Z0-9\s]*$/,
                          message: 'Only alphabets and numbers are allowed'
                        }
                      })}
                        type="text"
                        className="form-control"
                        placeholder="Course name "
                        required=""
                      />
                       {errors.name && <p className='text-danger'> <i>{errors.name.message}</i> </p>}
                      <p className='text-black mt-2'  style={{fontSize:"13px",color:"#3f3a5e"}}> <img src={info} alt="" height={14} /> <i>Only alphabets and numbers are allowed</i> </p>
                      
                    </div>
                    <div className="form-group m-2 mt-3">
                  <label htmlFor="thumbnail" style={{color:"#2A254D"}}>Description</label>
                  <textarea style={{borderRadius:"10px"}}
                         {...register('description', {
                          required: 'Course Description is required',
                          validate: (value) => {
                            const wordCount = value.trim().split(/\s+/).length;
                            return wordCount <= 10000 || 'Description must not exceed 10,000 words';
                          }
                        })}
                        className={`form-control ${errors.description ? 'is-invalid' : ''}`}
                          placeholder="Course Description"
                          rows={2}
                      />
                       
                      {errors.description && <div className="invalid-feedback">{errors.description.message}</div>}
                  </div>
                    <div className="form-group m-2 mt-3">
                    <label htmlFor="thumbnail" style={{color:"#2A254D"}}>Thumbnail Image</label>
                      <input style={{borderRadius:"10px"}}
                          {...register('thumbnail')}
                          type="file"
                          className="form-control"
                          name="thumbnail"
                          onChange={handleImage}
                          ref={fileInputRef}
                      />
                       <p className='text-black mt-2'  style={{fontSize:"13px",color:"#3f3a5e"}}> <img src={info} alt="" height={14} /> <i>Image should be below 1 MB</i> </p>
                        {image?   <img className='mt-4 mb-3' src={image} height={55} alt="" />:""}
                      {errors.thumbnail && <span className="text-danger">{errors.thumbnail.message}</span>}
                  </div>
                  <div className="form-group m-2 mt-3  ">
                  <label htmlFor="thumbnail" style={{color:"#2A254D"}}>Category</label>
                  <select style={{borderRadius:"10px",height:"35px",width:"100%"}}
                          {...register('category', { required: 'Category is required' })}
                       
                          name="category"
                          onClick={handleCategory}
                          onMouseEnter={handleCategory}
                      >
                          <option value="">Select Category</option>
                          {categorydata.map((option)=>(
                            <option value={option.id} key={option.id}>
                              {option.category_name}
                            </option>
                          ))}
                      </select>
                      {errors.category && <span className="text-danger">{errors.category.message}</span>}
                  </div>
                
                  <div className="form-group m-2 mt-3">
                  <label htmlFor="thumbnail" style={{color:"#2A254D"}}>Duration </label>
                  <input style={{borderRadius:"10px"}}
                          {...register('duration', { required: 'Duration is required' })}
                          type="number"
                          className="form-control"
                          placeholder="Duration"
                          name="duration"
                      />
                      {errors.duration && <span className="text-danger">{errors.duration.message}</span>}
                      <p className='text-black mt-2'  style={{fontSize:"13px",color:"#3f3a5e"}}> <img src={info} alt="" height={14} /> <i>Type Duration in Minutes</i> </p>
                  </div>
                    {/* <div className="form-group m-2 mt-4">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Tutor"
                        name="tutor"
                        id="tutor"
                        required=""
                      />
                    </div> */}
                  {/* {module.map((item,index)=>(
                    <div className="document-viewer">
                            <iframe
                            height="200"
                            width="500"
                            src={item.module_content_ppt?item.module_content_ppt:item.module_content_video}
                            allowFullScreen
                          ></iframe>
                  </div>
                  ))} */}
                    {module.map((item, index) => (
        <div key={index} className="document-viewer" style={{ position: 'relative', marginBottom: '20px' }}>
          <iframe
            height="150"
            width="400"
            src={item.module_content_ppt ? item.module_content_ppt : item.module_content_video}
            allowFullScreen
          ></iframe>
          <button
            onClick={() => handleRemoveModule(index)}
            style={{
              position: 'absolute',
              top: '10px',
              right: '10px',
              background: 'red',
              color: 'white',
              border: 'none',
              borderRadius: '50%',
              width: '25px',
              height: '25px',
              textAlign: 'center',
              cursor: 'pointer',
              lineHeight: '25px',
            }}
          >
            &times;
          </button>
        </div>
      ))}

                    <div className="form-group m-2 mt-3">
                    <label htmlFor="thumbnail" style={{color:"#2A254D"}}>Modules</label>
                   { !state?   <input style={{borderRadius:"10px"}}
                          {...register('modules')}
                          className="form-control"
                          type="file"
                          // multiple
                           accept="video/mp4, application/vnd.ms-powerpoint ,application/vnd.openxmlformats-officedocument.presentationml.presentation"
                          name="modules"
                          onChange={(e)=>handleFileSelect(e)}
                      />:<><div className="loader"></div><p className='text-danger'>Module Uploading Please Wait</p></>  }
                       <p className='text-black mt-2'  style={{fontSize:"13px",color:"#3f3a5e"}}> <img src={info} alt="" height={14} /> <i>Please Upload Modules One by One . File format should be ppt having file size of 30 MB and mp4 of below 1 GB </i> </p>
                    
                  </div>
                  <div className="d-flex justify-content-between mt-5">
                    
                    <button
                      aria-label="Close"
                      className="btn btn-outline-danger mt-2"
                      data-bs-dismiss="modal"
                      type="button"
                      onClick={()=>{setModal(false),setPage(true)}}>Cancel</button>
                    <button className="btn btn-primary btn-block mt-2" type="submit">
                      Add Course
                    </button>
                    </div>
                  </div>
             
                </form>
                {/* modal-body */}
              </div>
            </div>
          </div>
          </>
  )
}

export default AddCourse