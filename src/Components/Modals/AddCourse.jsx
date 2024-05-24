import React, { useState } from 'react'
import { useForm } from "react-hook-form"
import { toast } from 'react-toastify'
import { GetCategory } from '../../Api/Category'
import {AddCourses, AddFiles, AddModules} from '../../Api/Course'
import { refreshToken } from '../../Api/Authentication'
import { token } from '../../Api/token'
import './Modal.css'
import DocViewer from 'react-doc-viewer';

const AddCourse = ({setPage,setModal,datafetch}) => {

    const { register, handleSubmit, watch, formState: { errors },} = useForm()

    const [image,setImage]=useState(null)
  const [state,setState]=useState(false)
    const [module,setModule]=useState([])
    const [categorydata,setCategoryData]=useState([])
        
        
        const handleFileSelect =async(event) =>{
            const files = event.target.files[0];
            
            if (files.type === 'video/mp4') {
              const datas = {
                video : files,
              }
              setState(true)
              console.log(datas,"daaaat");
              const response = await AddFiles(datas ,"video")
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
              const response = await AddFiles(datas,"ppt")
              if(response.success){
                console.log(response,"success");
                const name = module.length+1
                console.log(name,"length");
                setModule([...module,{module_name:`Module ${name}`,module_type:"ppt",module_content_ppt:response.data.ppt}])
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
            const data ={
              thumbnail:files,
            }
           const response = await AddFiles(data,"thumbnail");
           if(response.success === true){
            console.log(response,"success");
            setImage(response.data.thumbnail)
           }else{
            console.log(response,"error");
           }
          } catch (error) {
            console.log(error);
          }
         } 
        const onSubmit =async (data) => {
          setState(true)
            try {
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
                  toast.success(response.message)
                  datafetch()
                  console.log(response,"succc");
                  setPage(true)
                  setModal(false)
                } else{
                  toast.error(`${response.message}`)
                  console.log(response,"error");
                }
                console.log(formData,"formdata");
            } catch (error) {
              console.log(error);
            }
          
          };
console.log(module,"modules");
  return (
        <> 
         {state?(
          <div className="loader-container">
          <div className="loader"></div>
          <p className='text-danger'>Please Wait... Module is Uploading, this may take some time</p>
        </div>
        
         ):(<div className="modal " tabIndex="-1" role="dialog" style={{ display: 'block'}}>
            <div className="modal-dialog" role="document">
            <div className="modal-content" >
              <form onSubmit={handleSubmit(onSubmit)}>
                  <div className="modal-body">
                    <button
                    aria-label="Close"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    onClick={() => {
                      setModal(false);
                      setPage(true);
                    }}
                      type="button"
                    >
                      {/* <span aria-hidden="true">&times;</span> */}
                    </button>
                    <div className="form-group m-2 mt-2">
                      <input
                      {...register('name', { required: true, minLength: 1 })}
                        type="text"
                        className="form-control"
                        placeholder="Course name "
                        required=""
                      />
                      {errors.name && errors.name.type === 'required' && (
                              <span className="text-danger">Name is required</span>
                            )}
                    </div>
                 {image?   <img src={image} alt="" />:""}
                    <div className="form-group m-2 mt-2">
                      <label htmlFor="thumbnail">Thumbnail Image</label>
                      <input
                          {...register('thumbnail')}
                          type="file"
                          className="form-control"
                          name="thumbnail"
                          onChange={handleImage}
                      />
                      {errors.thumbnail && <span className="text-danger">{errors.thumbnail.message}</span>}
                  </div>
                  <div className="form-group m-2 mt-2  ">
                      <select
                          {...register('category', { required: 'Category is required' })}
                          className="form-control custom-select"
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
                
                  <div className="form-group m-2 mt-2">
                      <input
                          {...register('duration', { required: 'Duration is required' })}
                          type="text"
                          className="form-control"
                          placeholder="Duration"
                          name="duration"
                      />
                      {errors.duration && <span className="text-danger">{errors.duration.message}</span>}
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
                  {module.map((item,index)=>(
                    <div className="document-viewer">
                            <iframe
                            height="375"
                            width="600"
                            src={item.module_content_ppt?item.module_content_ppt:item.module_content_video}
                            allowFullScreen
                          ></iframe>
                  </div>
                  ))}

                    <div className="form-group m-2 mt-2">
                      <label htmlFor="modules"></label>
                      <input
                          {...register('modules')}
                          className="form-control"
                          type="file"
                          // multiple
                           accept="video/mp4, application/vnd.ms-powerpoint ,application/vnd.openxmlformats-officedocument.presentationml.presentation"
                          name="modules"
                          onChange={(e)=>handleFileSelect(e)}
                      />
                      {/* {errors.modules && <span className="text-danger">{errors.modules.message}</span>} */}
                  </div>
                  <div className="form-group m-2 mt-2">
                      <textarea
                          {...register('description')}
                          className="form-control"
                          placeholder="Course Description"
                          rows={2}
                      />
                  </div>
                    <button className="btn btn-primary btn-block mt-2" type="submit">
                      Save
                    </button>
                    <button
                      aria-label="Close"
                      className="btn btn-outline-danger mt-2"
                      data-bs-dismiss="modal"
                      type="button"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
                {/* modal-body */}
              </div>
            </div>
          </div>)}
          </>
  )
}

export default AddCourse