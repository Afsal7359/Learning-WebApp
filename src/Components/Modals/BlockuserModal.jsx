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
            <div className="modal" tabIndex="-1" role="dialog" style={{ display: 'block' }}>
            <div class="modal-dialog" role="document">
            <div class="modal-content">
            <div className="modal-body">
            <button
              aria-label="Close"
              className="btn-close"
              data-bs-dismiss="modal"
              type="button"
            >
              {/* <span aria-hidden="true">&times;</span> */}
            </button>
            <div class="modal-body">
                        <p>Are you sure you want to delete?</p>
                      </div>
                      <div class="modal-footer">
                       <button type="button" class="btn btn-secondary"
                        aria-label="Close"
                        data-bs-dismiss="modal"
                        id="close-modal">No</button>
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