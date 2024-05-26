import React, { useEffect, useState } from 'react'
import Adminheader from './Adminheader'
import { AddCategory, DeleteCategory, GetCategory } from '../Api/Category'
import { useForm } from "react-hook-form"
import { refreshToken } from '../Api/Authentication'
import { toast } from 'react-toastify'

const Category = () => {
    const { register, handleSubmit, watch, formState: { errors },} = useForm()
    const [isModalOpen, setIsModalOpen] = useState(false);
    const openModal = () => {
        setIsModalOpen(true);
      };
    
      const closeModal = () => {
        setIsModalOpen(false);
      };

    const [categorydata,setCategoryData]=useState([])
    const [deleteid,setdeleteId]=useState(0);
    const [deletemodal,setDeleteModal]=useState(false)

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
                Categorydatafetch()
                setIsModalOpen(false)
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
                Categorydatafetch()
                toast.success(response.message)
                setDeleteModal(false)
              
            }
           
        } catch (error) {
            console.log(error);
        }
    }
  return (
    <div >
        <Adminheader/>
        <div className="row home">
        <div className='d-flex justify-content-end mt-5 mb-5' style={{ paddingRight: '5em' }}>
        <div className='align-center' style={{ maxWidth: '200px' }}>
            <button className='btn btn-success'      onClick={openModal}>Add Category</button>
        </div>
      </div>
      {isloading?(<div class="loader-container">
                      <div class="loader"></div>
                    </div>):(
                      <div className='mt-0  m-5 p-3' style={{backgroundColor:"#fff",borderRadius:"25px"}}>
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
                                        data-bs-toggle="modal" onClick={()=>{setdeleteId(item.id),setDeleteModal(true)}} >Delete</button>
                                    </td>
                                </tr>
                                ))}
                            
                            </tbody>
                            </table>
                        </div>)}
        {/* Addmodal */}
        {isModalOpen && (
    <div className="modal " tabIndex="-1" role="dialog" style={{ display: 'block',
    background: "rgba(102, 54, 255, 0.12)",
    borderRadius: "16px",
    boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
    backdropFilter: "blur(10.8px)",
    WebkitBackdropFilter: "blur(5.8px)",
    border: "1px solid rgba(255, 255, 255, 0.26)"}}>
     
 
            <div className="modal-dialog" role="document">
            <div className="modal-content"  style={{ display: 'block',
    background: "rgba(102, 54, 255, 0.12)",
    borderRadius: "16px",
    boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
    backdropFilter: "blur(10.8px)",
    WebkitBackdropFilter: "blur(5.8px)",
    border: "1px solid rgba(255, 255, 255, 0.26)"}}>
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="modal-body">
              <button
                aria-label="Close"
                className="btn-close"
                data-bs-dismiss="modal"
                type="button" onClick={()=>setIsModalOpen(false)}
              >
              </button>
             
              <div className="form-group m-2 mt-4">
                <label htmlFor="thumbnail" className='text-black'>Category Name </label>
                <input
                    {...register('category_name', { required: 'category name is required' })}
                    type="text"
                    className="form-control"
                    placeholder='category name'
                    name="category_name"
                />
                {errors.category_name && <span className="text-danger">{errors.category_name.message}</span>}
            </div>
            <div className="d-flex justify-content-between">
            <button
                aria-label="Close"
                className="btn btn-outline-danger mt-5"
                data-bs-dismiss="modal"
                type="button" onClick={()=>setIsModalOpen(false)}
              >
                Cancel
              </button>
              <button className="btn btn-primary btn-block mt-5" type="submit">
                Submit
              </button>
             
              </div>
            </div>
          </form>
          {/* modal-body */}
        </div>
        {/* modal-content */}
      </div>
            </div>)}
    {/*Add modal close */}

    {/* <!-- Delete Modal --> */}
   {deletemodal&& <div className="modal " tabIndex="-1" role="dialog" style={{ display: 'block',
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
                   
                    <div class="modal-body">
                        <div class="modal-header" >
                            <h5 class="modal-title" id="exampleModalLabel">Confirmation </h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close" onClick={()=>setDeleteModal(false)}>
                            <span aria-hidden="true">&times;</span>
                            </button>
                           </div>
                           <div class="modal-body">
                            <p>Are you sure you want to delete?</p>
                          </div>
                          <div className="d-flex justify-content-between mt-5">
                           <button type="button" class="btn btn-secondary" id="close-modal" onClick={()=>setDeleteModal(false)}>No</button>
                            <a   class="btn btn-danger" type="button" onClick={handledelete}>Yes</a>
                           </div>
                
                </div>
            </div>
        </div>
       </div>}
       </div>
       {/* Delete Modal Close  */}
    </div>
  )
}

export default Category