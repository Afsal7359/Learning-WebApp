import React, { useEffect, useState } from 'react'
import { AddCarousel, DeleteCarosuel, GetAllCarousel } from '../Api/Carousel';
import Adminheader from './Adminheader';
import { useForm } from "react-hook-form"
import { toast } from 'react-toastify';
import { refreshToken } from '../Api/Authentication';
import instance, { setAuthToken } from '../Api/instance';
import axios from 'axios';
import { token } from '../Api/token';

const Carousel = () => {
    const [isloading,setIsLoading]=useState(true)
    const [carouselData,setCarouselData]=useState([]);
    const [image, setImage] = useState(null);
    const { register, handleSubmit, watch, formState: { errors },} = useForm()

    const [selectedFile, setSelectedFile] = useState(null);

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
    const handleImageChange = (event) => {
      setImage(event.target.files[0]);
    };
    const CarosuelDataFetch = async()=>{
        try {
           if (carouselData.length === 0){
            const response =await GetAllCarousel()
            if(response.success === true){
                setCarouselData(response.data);
                setIsLoading(false)
            }else{
                console.log(response);
            }
           }
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(()=>{
        CarosuelDataFetch();
    },[])
    console.log(carouselData,"carosueldata");

    const onSubmitForm =async (event) => {
      event.preventDefault();
        try {
           
            const tokencreate = await token("token-admin-refresh-vini")
            console.log(tokencreate,'tokeens');
            const formdata = new FormData()
            formdata.append('carousel_image', image);
            console.log(formdata, "formdata");

            const response = await AddCarousel(formdata,tokencreate.access);
            console.log(response,"response");
            if (response.success === true){
                console.log(response);
                toast.success(`${response.message}`)
                window.location.href = '/admin/carosuel'
                
            }else{
                console.log(response,"error");
                toast.error(`${response.message}`)
            }
        } catch (error) {
            console.log(error);
        }
    }
    const handleDelete = async(payload)=>{
      try {
        console.log(payload);
        const gettoken = localStorage.getItem("token-admin-refresh-vini")
        const token = await refreshToken(gettoken)
        if(token.access){
          const response = await DeleteCarosuel(payload,token.access);
        if(response.success === true){
          toast.success(`${response.message}`)
        }else{
          console.log(response);
        }
        }

        
      } catch (error) {
        console.log(error);
        // toast.error(`${error}`)
      }
    }
 return (
    <div>
        <Adminheader/>
      <div className="row">
      <div className='d-flex justify-content-center mt-5 mb-5'>
        <div className='align-center' style={{ maxWidth: '200px' }}>
            <button className='btn btn-success'    data-bs-target="#modaldemo1"
                data-bs-toggle="modal" >Add Carousel</button>
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
                      style={{ width: "400px", height: "190px" }} // Adjust width and height as needed
                  />
                  <div className="card-body">
                      <h5 className="card-title">{item.id}</h5>
                      {/* <p className="card-text">
                          Some quick example text to build on the card title and make up the bulk of
                          the card's content.
                      </p> */}
                      <a  className="btn btn-danger" onClick={(item)=>handleDelete(item.id)}>
                          Delete
                      </a>
                  </div>
              </div>
          </div>
      ))}

</div>

  {/* Addmodal */}
  <div id="modaldemo1" className="modal fade">
      <div className="modal-dialog" role="document">
        <div className="modal-content">
        <form onSubmit={onSubmitForm}>
            <div className="modal-body">
              <button
                aria-label="Close"
                className="btn-close"
                data-bs-dismiss="modal"
                type="button"
              >
              </button>
             
              <div className="form-group m-2 mt-4">
                {/* <label htmlFor="thumbnail">carousel Image</label> */}
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
      </div>
      {/* modal-dialog */}
    </div>
    {/*Add modal close */}

    </div>
  )
}

export default Carousel