import React, { useState } from 'react'
import { toast } from 'react-toastify';
import { useForm } from "react-hook-form"
import { ProfileImageChange, refreshToken } from '../../Api/Authentication';
import { token } from '../../Api/token';

const ProfileEdit = ({Modal,setModal,handle,users}) => {
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
            console.log(users,"users");
              const tokencreate = await token(users);
           
                const formdata = new FormData()
                formdata.append('profile_image', selectedFile);
                const response = await ProfileImageChange(formdata,tokencreate.access)
                setLoading(false)
                if(response.success === true){
                    handle()
                 toast.success(`${response.message}`)
                 setModal(false)
               
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
    <div className="modal bg" tabIndex="-1" role="dialog" style={{
          display: 'block',
          background: "rgba(102, 54, 255, 0.12)",
          borderRadius: "16px",
          boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
          backdropFilter: "blur(15.8px)",
          WebkitBackdropFilter: "blur(5.8px)",
          border: "1px solid rgba(255, 255, 255, 0.26)"
      }}>
        <div className="modal-dialog" role="document">
          <div className="modal-content" style={{
                display: 'block',
                background: "rgba(102, 54, 255, 0.12)",
                borderRadius: "16px",
                boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
                backdropFilter: "blur(5.8px)",
                WebkitBackdropFilter: "blur(5.8px)",
                border: "1px solid rgba(255, 255, 255, 0.26)"
          }}>
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
                   
                    <input
                        {...register('profile_image', { required: 'profile image is required' })}
                        type="file"
                        className="form-control"
                        name="profile_image"
                        onChange={handleFileChange}
                    />
                    {errors.profile_image && <span className="text-danger">{errors.profile_image.message}</span>}
                </div>
              
                <div className="d-flex justify-content-between mt-5">
                    <button
                        aria-label="Close"
                        className="btn btn-danger"
                        data-bs-dismiss="modal"
                        type="button"    onClick={()=>setModal(false)}
                    >
                        Cancel
                    </button>
                    <button className="btn btn-primary" type="submit">
                        Upload
                    </button>
                    </div>

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