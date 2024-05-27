import React, { useEffect, useState } from 'react'
import Adminheader from './Adminheader'
import { toast } from 'react-toastify'
import { GetAllUsers, VerifyTutor } from '../Api/Profile'
import { token } from '../Api/token'
import BlockuserModal from '../Components/Modals/BlockuserModal'
import UnblockModal from '../Components/Modals/UnblockModal'

function Tutor() {

      const [student,setStudent]=useState([])
      const [tutor,setTutor]=useState([]);
      const [isloading,setIsLoading]=useState(true)
      const [ismodal,setIsModal]=useState(false)
      const [userid,setUserId]=useState(null)
      const [isUnBlockModal,setIsUnBlockModal]=useState(false)
      const [verifyModal,setVerifyModal]=useState(false)
      const [verifyid,setVerifyId]=useState(0)

      const [currentPage, setCurrentPage] = useState(1);
      const [currentPagetutor, setCurrentPagetutor] = useState(1);

    const itemsPerPage =10
  // Calculate total number of pages
  const totalPages = Math.ceil(student.length / itemsPerPage);

  // Calculate start and end index of items for the current page
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, student.length);

  // Get current page of data
  const currentPageData = student.slice(startIndex, endIndex);

  // Function to handle page change
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const totalPagess = Math.ceil(tutor.length / itemsPerPage);

  // Calculate start and end index of items for the current page
  const startIndexs = (currentPagetutor - 1) * itemsPerPage;
  const endIndexs = Math.min(startIndexs + itemsPerPage, tutor.length);

  // Get current page of data
  const currentPageDatas = tutor.slice(startIndexs, endIndexs);

  // Function to handle page change
  const handlePageChanges = (pageNumber) => {
    setCurrentPagetutor(pageNumber);
  };

      const Userdatafetch=async()=>{
        try {
         
            const  response = await GetAllUsers();
            if(response.success === true){
              console.log(response,"success");
              setStudent(response.student_profile)
              setTutor(response.tutor_profile)
              setIsLoading(false)
            }else{
              console.log(response,error);
            }
          
         
        } catch (error) {
          toast.error(`${error}`)
        }
      } 
      useEffect(()=>{
        Userdatafetch()
      },[])
      console.log(tutor,"tutor");
      console.log(student,"student");
      const handleverifyClick =async()=>{
        const item = verifyid
        console.log(item,"itemid");
          try {
            const tokens = await token("token-admin-refresh-vini")
            const response = await VerifyTutor(item,tokens.access)
            if(response.success===true){
              toast.success(`${response.message}`)
              Userdatafetch()
              setVerifyModal(false)
            }else{
              toast.error(`${response.message}`)
              console.log(response,"error");
            }
          } catch (error) {
            console.log(error);
            toast.error(`${error}`)
          }
      }
    
      const handleBlockuser =(id)=>{
        try {
          setUserId(id)
          setIsModal(true)
        } catch (error) {
          console.log(error);
        }
      }
      const handleUnBlockUser =(id)=>{
        try {
          setUserId(id)
          setIsUnBlockModal(true)
        } catch (error) {
          console.log(error);
        }
      }
  return (
    <>
        <Adminheader/>
        
        <section className="course-details home">
            <div className="container">
                {isloading?(<div class="loader-container">
                      <div class="loader"></div>
                    </div>):
                (<>
                <div className='mt-0  m-5 p-3' style={{backgroundColor:"#fff",borderRadius:"25px"}}>
                 <h4 className='p-4' style={{textAlign:"center"}}>Tutor Details</h4>
                <table className="table table-responsive " >
                    <thead>
                      <tr>
                        <th>SL No</th>
                        <th scope="col">ID</th>
                        <th scope="col">Username</th>
                        <th scope="col">Email</th>
                        <th scope="col">Action</th>
                        <th scope="col">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                     { currentPageDatas.length !==0 ? currentPageDatas.map((item,index)=>(
                        <tr key={startIndexs   + index}>
                        <th>{startIndexs + index + 1}</th>
                        <th>{item.id}</th>
                        <td>{item.username}</td>
                        <td>{item.email}</td>
                        <td>{item.is_tutor_verify === true ? <span style={{color:"green"}}>Verified</span>:
                        <button className='btn btn-danger' onClick={()=> {setVerifyId(item.id);setVerifyModal(true)}}>Click to verify</button>}
                        </td>
                        <td>{item.is_active === true ? <button className='btn btn-danger' onClick={()=>{
                         handleBlockuser(item.id)
                        }}>Block</button>:
                        <button className='btn btn-success' onClick={()=>handleUnBlockUser(item.id)}>unblock</button>}</td>
                      </tr>
                     )):""}

                    </tbody>
                    </table>
                    </div>
                    <div>
                      {/* Previous page button */}
                      <button className='btn btn-primary m-3' onClick={() => handlePageChanges(currentPagetutor - 1)} disabled={currentPagetutor === 1}>Previous</button>
                      
                      {/* Page numbers */}
                      {Array.from({ length: totalPagess }, (_, i) => (
                        <button  className='btn btn-success m-3'  key={i} onClick={() => handlePageChanges(i + 1)}>{i + 1}</button>
                      ))}

                      {/* Next page button */}
                      <button  className='btn btn-primary m-3' onClick={() => handlePageChanges(currentPagetutor + 1)} disabled={currentPagetutor === totalPagess}>Next</button>
                    </div>

               

              

                </>)}
            </div>
        </section>
        {verifyModal && (
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
                onClick={()=> setVerifyModal(false)}
                type="button"
              >
                {/* <span aria-hidden="true">&times;</span> */}
              </button>
              <div class="modal-body">
                          <p className='text-white'>Are you sure, You want to Verify this Tutor?</p>
                        </div>
                        <div className="d-flex justify-content-between mt-5">
                         <button type="button" class="btn btn-secondary"
                          aria-label="Close"
                          data-bs-dismiss="modal"
                          id="close-modal" onClick={()=>setVerifyModal(false)}>No</button>
                          <a onClick={handleverifyClick}  class="btn btn-success" type="button">Verify</a>
                         </div>
            
            </div>
          </div>
      </div>
              </div>
        )}
        {ismodal && <BlockuserModal item={userid} setModal={setIsModal} setIsLoading={setIsLoading} Userdatafetch={Userdatafetch}/>}
        {isUnBlockModal && <UnblockModal item={userid} setModal={setIsUnBlockModal} setIsLoading={setIsLoading} Userdatafetch={Userdatafetch} />}
    </>
  )
}

export default Tutor