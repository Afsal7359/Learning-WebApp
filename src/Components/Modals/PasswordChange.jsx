import React from 'react'
import { toast } from 'react-toastify';
import { useForm } from "react-hook-form"
import { ChangePassword, refreshToken } from '../../Api/Authentication';

const PasswordChange = ({Modal,setModal}) => {
    const { register, handleSubmit, watch, formState: { errors },} = useForm()

    const onSubmits =async(data)=>{
        try {
         const token={
           refresh:localStorage.getItem("token-admin-refresh-vini")
           }
         const tokencreate = await refreshToken(token);
           if(tokencreate.success === true){
               localStorage.setItem("token-admin-access-vini" , tokencreate.access)
               console.log(tokencreate);
              
           }else{
               console.log(tokencreate,"error");
               toast.error(tokencreate.message)
           }
           const datas ={
             old_password:data.old_password,
             new_password:data.new_password,
           }
           const responses = await ChangePassword(datas,tokencreate.access)
           if(responses.success === true){
             console.log(responses);
             toast.success(responses.message)
             setModal(false)
           }else{
             console.log(responses,"error");
             toast.error(responses.message)
           }
       } catch (error) {
         console.log(error);
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
          <div className="modal-content" style={{  display: 'block',
          background: "rgba(102, 54, 255, 0.12)",
          borderRadius: "16px",
          boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
          backdropFilter: "blur(5.8px)",
          WebkitBackdropFilter: "blur(5.8px)",
          border: "1px solid rgba(255, 255, 255, 0.26)"}}>
        <form onSubmit={handleSubmit(onSubmits)}>
            <div className="modal-body">
            
              <div className="form-group m-2 mt-4">
                <label htmlFor="old_password" style={{color:"#fff"}}>Old password</label>
                <input
                    {...register('old_password', { required: 'old password is required' })}
                    type="text"
                    className="form-control"
                    name="old_password"
                />
                {errors.old_password && <span className="text-danger">{errors.old_password.message}</span>}
            </div>
            <div className="form-group m-2 mt-4">
                <label htmlFor="new_password"  style={{color:"#fff"}}>New password</label>
                <input
                    {...register('new_password', { required: 'new password is required' })}
                    type="text"
                    className="form-control"
                    name="new_password"
                />
                {errors.new_password && <span className="text-danger">{errors.new_password.message}</span>}
            </div>
            <div className="d-flex justify-content-between">
            
              <button
                aria-label="Close"
                className="btn btn-outline-danger mt-5"
                data-bs-dismiss="modal"
                type="button"
                onClick={()=>setModal(false)}
              >
                Cancel
              </button>
              <button className="btn btn-primary btn-block mt-5" type="submit">
                Change Password
              </button>
            </div>
            </div>
          </form>
          {/* modal-body */}
        </div>
          </div>
        </div>
    </div>
  )
}

export default PasswordChange