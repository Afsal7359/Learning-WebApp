import React from 'react'
import { LogoutUser } from '../../Api/Authentication';

const LogoutModal = ({setModal,token}) => {

    const handleConfirm =async()=>{
        try  {
            const data ={
              refresh:localStorage.getItem('token-admin-refresh-vini')
            }
            const response = await LogoutUser(data)
            if (response.success){
              localStorage.removeItem('token-admin-refresh-vini')
              localStorage.removeItem('token-admin-access-vini')
              toast.success(`${response.message}`)
              window.location.href = '/admin-login'
            }else{
              toast.success(`${response.message}`)
            }
          }  catch (error) {
            console.log(error);
        }
    }
  return (
    <>
  <div className="modal bg" tabIndex="-1" role="dialog" style={{
          display: 'block',
          background: "rgba(102, 54, 255, 0.12)",
          borderRadius: "16px",
          boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
          backdropFilter: "blur(5.8px)",
          WebkitBackdropFilter: "blur(5.8px)",
          border: "1px solid rgba(255, 255, 255, 0.26)"
      }}>
            <div class="modal-dialog" role="document">
            <div class="modal-content">
            <div className="modal-body">
            <button
              aria-label="Close"
              className="btn-close"
              onClick={()=>setModal(false)}
              type="button"
            >
              {/* <span aria-hidden="true">&times;</span> */}
            </button>
            <div class="modal-body">
                        <p className='text-white'>Are you sure you want to Unblock?</p>
                      </div>
                      <div className="d-flex justify-content-between mt-5">
                       <button type="button" class="btn btn-secondary"
                        aria-label="Close"
                        data-bs-dismiss="modal"
                        id="close-modal" onClick={()=>setModal(false)}>No</button>
                        <a onClick={handleConfirm}  class="btn btn-danger" type="button">Yes</a>
                       </div>
          
          </div>
        </div>
    </div>
            </div>
    </>
  )
}

export default LogoutModal