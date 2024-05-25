import React, { useEffect, useState } from 'react'
import Adminheader from './Adminheader'
import { toast } from 'react-toastify'
import { GetAllUsers, VerifyTutor } from '../Api/Profile'
import { token } from '../Api/token'
import BlockuserModal from '../Components/Modals/BlockuserModal'
import UnblockModal from '../Components/Modals/UnblockModal'
const Student = () => {
    
    const [student,setStudent]=useState([])
    const [tutor,setTutor]=useState([]);
    const [isloading,setIsLoading]=useState(true)
    const [ismodal,setIsModal]=useState(false)
    const [userid,setUserId]=useState(null)
    const [isUnBlockModal,setIsUnBlockModal]=useState(false)

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
    const handleverifyClick =async(item)=>{
      console.log(item,"itemid");
        try {
          const tokens = await token("token-admin-refresh-vini")
          const response = await VerifyTutor(item,tokens.access)
          if(response.success===true){
            toast.success(`${response.message}`)
            Userdatafetch()
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
                 <div className='mt-0 ml-0 m-5 p-3' style={{backgroundColor:"#fff",borderRadius:"25px"}}>
                <h4 className='p-4' style={{textAlign:"center"}}>Student Details</h4>
                <table className="table table-responsive">
                    <thead>
                      <tr>
                        <th>SL No</th>
                        <th scope="col">ID</th>
                        <th scope="col">Username</th>
                        <th scope="col">Email</th>
                        <th scope="col">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                     { currentPageData.length !==0 ? currentPageData.map((item,index)=>(
                      <tr key={startIndex + index}>
                      <th>{startIndex + index + 1}</th>
                        <th>{item.id}</th>
                        <td>{item.username}</td>
                        <td>{item.email}</td>
                        <td>{item.is_active === true ? <button className='btn btn-danger' onClick={()=>{
                         handleBlockuser(item.id)
                        }}>Block</button>:
                        <button className='btn btn-success' onClick={()=>handleUnBlockUser(item.id)}>unblock</button>}</td>
                      </tr>
                     )):""}

                    </tbody>
                </table>
                </div>
                  {/* Pagination */}
                  <div>
                  {/* Previous page button */}
                  <button className='btn btn-primary m-3' onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>Previous</button>
                  
                  {/* Page numbers */}
                  {Array.from({ length: totalPages }, (_, i) => (
                    <button  className='btn btn-success m-3'  key={i} onClick={() => handlePageChange(i + 1)}>{i + 1}</button>
                  ))}

                  {/* Next page button */}
                  <button  className='btn btn-primary m-3' onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}>Next</button>
                </div>

                </>)}
            </div>
        </section>

        {ismodal && <BlockuserModal item={userid} setModal={setIsModal} setIsLoading={setIsLoading} Userdatafetch={Userdatafetch}/>}
        {isUnBlockModal && <UnblockModal item={userid} setModal={setIsUnBlockModal} setIsLoading={setIsLoading} Userdatafetch={Userdatafetch} />}
   
        </>
  )
}

export default Student