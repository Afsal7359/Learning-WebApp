import React, { useEffect, useState } from 'react'
import { AddCarousel, DeleteCarosuel, GetAllCarousel } from '../Api/Carousel';
import Adminheader from './Adminheader';
import { useForm } from "react-hook-form"
import { toast } from 'react-toastify';
import { refreshToken } from '../Api/Authentication';
import instance, { setAuthToken } from '../Api/instance';
import axios from 'axios';
import { token } from '../Api/token';
import { TokenExpiry } from '../Api/Tokenexpiry';

const Carousel = () => {
    const [isloading,setIsLoading]=useState(true)
    const [carouselData,setCarouselData]=useState([]);
    const [image, setImage] = useState(null);
    const { register, handleSubmit, watch, formState: { errors },} = useForm()
    const [isModalOpen, setIsModalOpen] = useState(false);
    const UsertokenCheck = async()=>{
      try {
          const response = await TokenExpiry('token-admin-access-vini',"admin")
          if(response){
          console.log("not expired");
          }else{
            console.log("token -expired");
            window.location.href='/admin-login'
          }
      
      } catch (error) {
        console.log(error);
      }
    }
    useEffect(()=>{
      UsertokenCheck()
    },[])
    const [selectedFile, setSelectedFile] = useState(null);
    const [deleteid,setdeleteId]=useState(0);
    const [deletemodal,setdeletemodal]=useState(false)

    // const handleFileChange = (event) => {
    //     const file = event.target.files[0];
    //     if (file) {
    //       const reader = new FileReader();
    //       reader.onloadend = () => {
    //         setSelectedFile(reader.result);
    //       };
    //       reader.readAsDataURL(file);
    //     }
    //   };
    
  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };
    const handleImageChange = (event) => {
      setImage(event.target.files[0]);
    };
    const CarosuelDataFetch = async()=>{
        try {
           
            const response =await GetAllCarousel()
            if(response.success === true){
                setCarouselData(response.data);
                setIsLoading(false)
            }else{
                console.log(response);
            }
           
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(()=>{
        CarosuelDataFetch();
    },[])
    console.log(carouselData,"carosueldata");

    const onSubmitForm = async (event) => {
      event.preventDefault();
      try {
        const tokencreate = await token("token-admin-refresh-vini");
        console.log(tokencreate, 'token');
    
        // Check if the image size exceeds 1 MB
        if (image.size > 1024 * 1024) {
          toast.error("Image size exceeds 1 MB limit");
          return;
        }
    
        const formdata = new FormData();
        formdata.append('carousel_image', image);
        console.log(formdata, "formdata");
    
        const response = await AddCarousel(formdata, tokencreate.access);
        console.log(response, "response");
        if (response.success === true) {
          console.log(response);
          toast.success(`${response.message}`);
          CarosuelDataFetch();
          setIsModalOpen(false);
        } else {
          console.log(response, "error");
          toast.error(`${response.message}`);
        }
      } catch (error) {
        console.log(error);
      }
    }
    
  
    const handledelete =async()=>{
      try {
        const gettoken = await token("token-admin-refresh-vini")
        const response = await DeleteCarosuel(deleteid,gettoken.access);
        if(response.success){
          toast.success(`${response.message}`)
          CarosuelDataFetch();
          setdeletemodal(false)
        }
      } catch (error) {
        
      }
    }
 return (
    <div>
        <Adminheader/>
      <div className="row home">
      <div className='d-flex justify-content-end mt-5 mb-5' style={{ paddingRight: '5em' }}>
  <div style={{ maxWidth: '200px' }}>
    <button className='btn btn-success' onClick={openModal}>
      Add Carousel
    </button>
  </div>
</div>

      {isloading?(
        <div class="loader-container">
        <div class="loader"></div>
      </div>):carouselData.map((item, index) => (
          <div className={`col-lg-4 col-md-6 col-sm-6`} key={index}>
              <div className="card mb-3">
                  <img 
                      className="card-img-top" 
                      src={item.carousel_image ? item.carousel_image : ""} 
                      alt="Card image cap" 
                      style={{ width: "300px", height: "190px" }} // Adjust width and height as needed
                  />
                  <div className="card-body">
                      <h5 className="card-title">{item.id}</h5>
                      {/* <p className="card-text">
                          Some quick example text to build on the card title and make up the bulk of
                          the card's content.
                      </p> */}
                      <a  className="btn btn-danger"   onClick={()=>{
                        setdeleteId(item.id)
                        setdeletemodal(true)}} >
                          Delete
                      </a>
                  </div>
              </div>
          </div>
      ))}

</div>

  {/* Addmodal */}
  {isModalOpen && (
    <div className="modal " tabIndex="-1" role="dialog"  style={{ display: 'block',
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
    WebkitBackdropFilter: "blur(25.8px)",
    border: "1px solid rgba(255, 255, 255, 0.26)"}}>
        <form onSubmit={onSubmitForm}>
            <div className="modal-body">
              <button
                aria-label="Close"
                className="btn-close"
                data-bs-dismiss="modal"
                type="button"
                onClick={closeModal}
              >
              </button>
             
              <div className="form-group m-2 mt-4">
                <label htmlFor="thumbnail" className='text-black'>carousel Image</label>
                {/* {selectedFile && (
                                       <img
                                       src={selectedFile}
                                       alt="Selected Image"
                                       className="preview-image"
                                       style={{ width: '100px', height: '100px', marginTop: '10px', margin:'2em' }}
                                     />
                                     
                                         )} */}
                <input
                    type="file"
                    className="form-control"
                    name="carousel_image"
                    id='image'
                    onChange={handleImageChange}
                />
                {errors.carousel_image && <span className="text-danger">{errors.carousel_image.message}</span>}
            </div>
            <div className="d-flex justify-content-between ">
              
              <button
                aria-label="Close"
                className="btn btn-danger mt-5"
                data-bs-dismiss="modal"
                type="button"
                onClick={()=>setIsModalOpen(false)}
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
      {/* modal-dialog */}
    </div>)}
    {/*Add modal close */}

    {deletemodal && (
    <div className="modal " tabIndex="-1" role="dialog"  style={{ display: 'block',
    background: "rgba(102, 54, 255, 0.12)",
    borderRadius: "16px",
    boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
    backdropFilter: "blur(10.8px)",
    WebkitBackdropFilter: "blur(5.8px)",
    border: "1px solid rgba(255, 255, 255, 0.26)"}}>
            <div class="modal-dialog" role="document">
                <div class="modal-content" style={{ display: 'block',
    background: "rgba(102, 54, 255, 0.12)",
    borderRadius: "16px",
    boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
    backdropFilter: "blur(10.8px)",
    WebkitBackdropFilter: "blur(5.8px)",
    border: "1px solid rgba(255, 255, 255, 0.26)"}}>
                   
                    <div class="modal-body">
                            <h5 class="modal-title" id="exampleModalLabel">Confirmation </h5>

                           <div class="modal-body">
                            <p className='text-white'>Are you sure you want to delete?</p>
                            <div className="d-flex justify-content-between ">
                           <button type="button" class="btn btn-secondary" id="close-modal" onClick={()=>setdeletemodal(false)}>No</button>
                            <a   class="btn btn-danger" type="button" onClick={handledelete}>Yes</a>
                           </div>
                           </div>
                
                </div>
            </div>
        </div>
       </div>)}

    </div>
  )
}

export default Carousel