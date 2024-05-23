import React, { useState } from 'react'
import { toast } from 'react-toastify';
import { useForm } from "react-hook-form"
import { ProfileImageChange, refreshToken } from '../../Api/Authentication';

const ProfileEdit = ({Modal,setModal,handle}) => {
    const { register, handleSubmit, watch, formState: { errors },} = useForm()
    const [selectedFile, setSelectedFile] = useState(null);

    const [isloading,setLoading]=useState(false)

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setSelectedFile(file)
      };
      const onSubmit =async(data)=>{
        setLoading(true)
        try {
            console.log(data);
            const token={
                refresh:localStorage.getItem("token-refresh-vini")
                }
              const tokencreate = await refreshToken(token);
                if(tokencreate.success === true){
                    localStorage.removeItem("token-access-vini")
                    localStorage.setItem("token-access-vini" , tokencreate.access)
                    console.log(tokencreate);
                
                }else{
                    console.log(tokencreate.access,"error");
                    toast.error(tokencreate.message)
                }
                const formdata = new FormData()
                formdata.append('profile_image', selectedFile);
                const response = await ProfileImageChange(formdata,tokencreate.access)
                setLoading(false)
                if(response.success === true){
                 toast.success(`${response.message}`)
                 setModal(false)
                 handle()
                }else{
                 toast.error(`${response.message}`)
                 console.log(response);
                }

        } catch (error) {
            console.log(error);
            toast.error(error)
        }
      }

  return (
    <div>
        <div className="modal" tabIndex="-1" role="dialog" style={{ display: 'block' }}>
        <div className="modal-dialog" role="document">
          <div className="modal-content">
          {isloading?( <div class="loader-container">
        <div class="loader"></div>
      </div>):(
         
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="modal-body">
                <button
                    aria-label="Close"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    type="button"
                    onClick={()=>setModal(false)}
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
                        {...register('profile_image', { required: 'profile image is required' })}
                        type="file"
                        className="form-control"
                        name="profile_image"
                        onChange={handleFileChange}
                    />
                    {errors.profile_image && <span className="text-danger">{errors.profile_image.message}</span>}
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
           
       )}
        </div>
        </div>
          </div>
    </div>
  )
}

export default ProfileEdit