import React from 'react'
import './searchcard.css'

const Search = ({data,handleCourseClick}) => {
console.log(data,"data");
  return (
    <div style={{ marginTop: "10em" }}>
    <div className="container">
       {data.length !== 0 ? data.map((item, innerIndex) => (
          <div key={innerIndex} className="card mb-3" style={{ maxWidth: '100%' }}>
            <div className="row g-0 course-cards">
              <div className="col-md-4">
                <img 
                  src={item.thumbnail} 
                  alt="Course Thumbnail" 
                  className="img-fluid rounded-start" 
                  style={{ height: '200px', width: "350px", objectFit: 'cover' }} 
                />
              </div>
              <div className="col-md-8">
                <div className="card-body d-flex flex-column justify-content-between" style={{ height: '150px' }}>
                  <div>
                    <h5 className="card-title">{item.name}</h5>
                    <p className="card-text">{item.description.split(' ').slice(0, 30).join(' ')} </p>
                    <div className="d-flex align-items-center">
                      <img 
                        src={item.tutor ? item.tutor.profile_image : ""} 
                        style={{ height: "45px", width: "45px", borderRadius: "50%", marginRight: "10px" }} 
                        alt="" 
                      />
                      <p className="mb-0"><i>{item.tutor ? item.tutor.username : ""}</i></p>
                    </div>
                  </div>
                  <div className='d-flex justify-content-end mb-5' >
                <button 
                    className="btn btn-success align-self-end" 
                    onClick={() => handleCourseClick(item)}
                  >
                    Enroll
                  </button>
                </div>
                </div>
               
               
              </div>
              
            </div>
          </div>
        )):<h4 className='text-danger text-center'> Search Course Not Found !!!!</h4> }
        
    </div>
  </div>
  
  )
}

export default Search