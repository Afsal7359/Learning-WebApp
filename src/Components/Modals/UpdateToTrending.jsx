import React from 'react'
import { TrendingUpdate } from '../../Api/Category';
import { toast } from 'react-toastify';
import { token } from '../../Api/token';

const UpdateToTrending = ({setModal,id,CourseDatafetch,setLoading}) => {

    const handleConfirm=async()=>{
        setLoading(true)
        setModal(false)
        try {
            const tokencreate = await token("token-admin-refresh-vini")
            const response = await TrendingUpdate({is_trending:true},id,tokencreate.access)
            if(response.success===true){
                toast.success(`${response.message}`)
                CourseDatafetch()
                setLoading(false)
                console.log(response);
            }else{
                toast.error(`${response.message}`)
            }
        } catch (error) {
            console.log(error);
        }
    }
  return (
    <>
            <div className="modal" tabIndex="-1" role="dialog" style={{
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
              data-bs-dismiss="modal"
              type="button" onClick={()=>setModal(false)}
            >
              {/* <span aria-hidden="true">&times;</span> */}
            </button>
            <div class="modal-body">
                        <p className='text-white'>Are you sure you want to delete?</p>
                      </div>
                      <div className="d-flex justify-content-between">
                      <a onClick={handleConfirm}  class="btn btn-danger" type="button">Yes</a>
                       <button type="button" class="btn btn-secondary"
                        aria-label="Close"
                        data-bs-dismiss="modal" onClick={()=>setModal(false)}
                        id="close-modal">No</button>
                  
                       </div>
          
          </div>
        </div>
    </div>
            </div>
    </>
  )
}

export default UpdateToTrending