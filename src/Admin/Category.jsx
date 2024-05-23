import React, { useEffect, useState } from 'react'
import Adminheader from './Adminheader'
import { AddCategory, DeleteCategory, GetCategory } from '../Api/Category'
import { useForm } from "react-hook-form"
import { refreshToken } from '../Api/Authentication'
import { toast } from 'react-toastify'

const Category = () => {
    const { register, handleSubmit, watch, formState: { errors },} = useForm()

    const [categorydata,setCategoryData]=useState([])
    const [deleteid,setdeleteId]=useState(0);

    const [isloading,setIsLoading]=useState(true)

    const Categorydatafetch =async()=>{
        try {
            const response = await GetCategory();
            if(response.success === true){
                setCategoryData(response.data)
                console.log(response);
                setIsLoading(false)
            }else{
                console.log(response,"response error");
            }
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(()=>{
        Categorydatafetch()
    },[])

    const onSubmit= async(data)=>{
        setIsLoading(true)
        try {
            const datas={
                refresh:localStorage.getItem("token-admin-refresh-vini")
            }
          const tokencreate = await refreshToken(datas);
            setIsLoading(false)
            if(tokencreate.success === true){
                localStorage.setItem("token-admin-access-vini" , tokencreate.access)
                console.log(tokencreate);
            }else{
                console.log(tokencreate,"error");
            }
            const response = await AddCategory(data,tokencreate.access)
            if(response.success === true){
                toast.success(`${response.message}`)
                console.log(response,"response");
                window.location.href=('/admin/category')
            }else{
                toast.error(`${response.message}`)
                console.log(response,"response error");
            }
        } catch (error) {
            console.log(error);
        }
    }
    const handledelete=async()=>{
        setIsLoading(true)
        try {
            console.log(deleteid,"deleted id ");
            const datas={
                refresh:localStorage.getItem("token-admin-refresh-vini")
            }
            const tokencreate = await refreshToken(datas);
            if(tokencreate.success === true){
                localStorage.setItem("token-admin-access-vini" , tokencreate.access)
                console.log(tokencreate);
            }else{
                console.log(tokencreate,"error");
            }
            const response = await DeleteCategory(deleteid , tokencreate.access)
            setIsLoading(false)
            if(response.success === true){
                toast.success(response.message)
                window.location.href = '/admin/category'
            }
           
        } catch (error) {
            console.log(error);
        }
    }
  return (
    <div>
        <Adminheader/>
        <div className='d-flex justify-content-center mt-5 mb-5'>
        <div className='align-center' style={{ maxWidth: '200px' }}>
            <button className='btn btn-success'    data-bs-target="#modaldemo1"
                data-bs-toggle="modal" >Add Category</button>
        </div>
      </div>
      {isloading?(<div class="loader-container">
                      <div class="loader"></div>
                    </div>):(
                        <div className="container">
                            <table className="table">
                            <thead>
                                <tr>
                                <th >#</th>
                                <th>category name</th>
                                <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {categorydata.map((item,index)=>(
                                    <tr key={index}>
                                    <th >{item.id}</th>
                                    <td>{item.category_name}</td>
                                    <td>
                                        <button className='btn btn-danger'  data-bs-target="#modaldemo3"
                                        data-bs-toggle="modal" onClick={()=>setdeleteId(item.id)} >Delete</button>
                                    </td>
                                </tr>
                                ))}
                            
                            </tbody>
                            </table>
                        </div>)}
        {/* Addmodal */}
        <div id="modaldemo1" className="modal fade">
        {isloading? (<div class="loader-container">
                      <div class="loader"></div>
                    </div>):(   
      <div className="modal-dialog" role="document">
        <div className="modal-content">
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="modal-body">
              <button
                aria-label="Close"
                className="btn-close"
                data-bs-dismiss="modal"
                type="button"
              >
              </button>
             
              <div className="form-group m-2 mt-4">
                <label htmlFor="thumbnail">Category Name </label>
                <input
                    {...register('category_name', { required: 'category name is required' })}
                    type="text"
                    className="form-control"
                    name="category_name"
                />
                {errors.category_name && <span className="text-danger">{errors.category_name.message}</span>}
            </div>
              <button className="btn btn-primary btn-block mt-5" type="submit">
                Submit
              </button>
              <button
                aria-label="Close"
                className="btn btn-outline-danger mt-5"
                data-bs-dismiss="modal"
                type="button"
              >
                Cancel
              </button>
            </div>
          </form>
          {/* modal-body */}
        </div>
        {/* modal-content */}
      </div>)}
            </div>
    {/*Add modal close */}

    {/* <!-- Delete Modal --> */}
       <div id="modaldemo3" class="modal fade">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                   
                    <div class="modal-body">
                        <div class="modal-header" >
                            <h5 class="modal-title" id="exampleModalLabel">Confirmation </h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                            </button>
                           </div>
                           <div class="modal-body">
                            <p>Are you sure you want to delete?</p>
                          </div>
                          <div class="modal-footer">
                           <button type="button" class="btn btn-secondary" id="close-modal">No</button>
                            <a   class="btn btn-danger" type="button" onClick={handledelete}>Yes</a>
                           </div>
                
                </div>
            </div>
        </div>
       </div>
    
       {/* Delete Modal Close  */}
    </div>
  )
}

export default Category