import React from 'react'
import { token } from '../../Api/token'
import { BlockUser } from '../../Api/Authentication'
import { toast } from 'react-toastify'

const BlockuserModal = ({item,setModal,setIsLoading,Userdatafetch}) => {

    const handleConfirm =async()=>{
      setIsLoading(true)
      setModal(false)
        try {
          const tokencreate = await token("token-admin-refresh-vini")
          const response = await BlockUser(item,tokencreate.access)
          if(response.success){
            console.log(response);
            toast.success(`${response.message}`)
            Userdatafetch()
            setIsLoading(false)
            
          }else{
            console.log(response,"error");
          }
           
        } catch (error) {
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
            <div class="modal-content" style={{
          display: 'block',
          background: "rgba(102, 54, 255, 0.12)",
          borderRadius: "16px",
          boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
          backdropFilter: "blur(5.8px)",
          WebkitBackdropFilter: "blur(5.8px)",
          border: "1px solid rgba(255, 255, 255, 0.26)"
      }}>
            <div className="modal-body">
            <button
              aria-label="Close"
              className="btn-close"
              onClick={()=> setModal(false)}
              type="button"
            >
              {/* <span aria-hidden="true">&times;</span> */}
            </button>
            <div class="modal-body">
                        <p className='text-white'>Are you sure you want to Block?</p>
                      </div>
                      <div className="d-flex justify-content-between ">
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

export default BlockuserModal