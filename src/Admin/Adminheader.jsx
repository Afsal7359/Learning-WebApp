import React,{useEffect, useState} from 'react'
import { Link, NavLink,useNavigate } from 'react-router-dom'
import './header.css'
import logo2 from '../assets/images/logo-vinjan.png'
import sidebaricon1 from '../assets/images/home.png'
import tutor from '../assets/images/tutor.png'
import student from '../assets/images/student.png'
import logout from '../assets/images/logout.png'
import carouselimg from '../assets/images/carousel.png'
import categoryimg from '../assets/images/category.png'
import { LogoutUser } from '../Api/Authentication'
import { toast } from 'react-toastify'

function Adminheader() {
    const [isSidebarClosed, setSidebarClosed] = useState(false);
    const [isDarkMode, setDarkMode] = useState(false);
    const [logoutmodal,setLogoutModal]=useState(false)
    const navigate = useNavigate();
    const [loginSuccess, setLoginSuccess] = useState(false); 
    const handleToggleSidebar = () => {
      setSidebarClosed(!isSidebarClosed);
    };
  
    const handleSearchBtnClick = () => {
      setSidebarClosed(false);
    };
  
    const handleModeSwitch = () => {
      setDarkMode(!isDarkMode);
    };
    useEffect(() => {
      if (loginSuccess) {
          const admintoken = localStorage.getItem("token-admin-refresh-vini");

          if (admintoken) {
              console.log(studentToken, "Navigating to student dashboard");
              navigate('/admin', { replace: true });
          } 

          // Reset loginSuccess to prevent infinite loop
          setLoginSuccess(false);
      }
  }, [loginSuccess, navigate]); 
    const handlelogout =async()=>{
      try {
        const data ={
          refresh:localStorage.getItem('token-admin-refresh-vini')
        }
        const response = await LogoutUser(data)
        if (response.success){
          localStorage.removeItem('token-admin-refresh-vini')
          localStorage.removeItem('token-admin-access-vini')
          toast.success(`${response.message}`)
          // navigate('/admin-login');
          setLoginSuccess(true) 
        }else{
          toast.success(`${response.message}`)
        }
      } catch (error) {
        console.log(error);
      }
    }

  
  return (
    <>
          {/* <header className="main-header-two">
      <nav className="main-menu">
        <div className="container">
        
          <div className="main-menu__nav">
            <ul className="main-menu__list">
              
              <li>
                <Link to={"/admin"}>Dashboard</Link>
              </li>
              <li>
              <Link to={"/admin-category"}>Category</Link>
              </li>
              <li>
              <Link to={"/admin-carosuel"}>Carousel</Link>
              </li>
              <li>
              <Link to={"/admin-Users"}>Users</Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header> */}
   <div className={`app ${isDarkMode ? 'dark' : ''}`}>
      <nav className={`sidebar ${isSidebarClosed ? 'close' : ''}`}>
        <header>
          <div className="image-text">
            <span >
              {/* <img src={logo2} alt="Logo" height={40} width={250}/> */}
            </span>
            <div className="text logo-text">
              <span className="name">Admin Panel</span>
              {/* <span className="profession">Web developer</span> */}
            </div>
          </div>
          {/* <i className="bx bx-chevron-right toggle" onClick={handleToggleSidebar} /> */}
        </header>
        <div className="menu-bar">
          <div className="menu">
            {/* <li className="search-box" onClick={handleSearchBtnClick}>
              <i className="bx bx-search icon" />
              <input type="text" placeholder="Search Games..." />
            </li> */}
            <ul className="menu-links">
              <li className="nav-link ">
                <NavLink to={"/admin"} activeClassName="active">
                  {/* <i className="home-alt icon" /> */}
                  <img src={sidebaricon1} alt="" height={35} width={35}/>
                  <span className="text nav-text mx-3 ">Dashboard</span>
                </NavLink>
              </li>
              <li className="nav-link" activeClassName='active'>
              <NavLink to={"/admin-category"}>
                  <img src={categoryimg} alt="" height={35}/>
                  <span className="text nav-text mx-3">Category</span>
                </NavLink>
              </li>
              <li className="nav-link">
                <NavLink to={"/admin-carosuel"} activeClassName='active'>
                  {/* <i className="bx bx-bell icon" /> */}
                  <img src={carouselimg} alt="" height={35} />
                  <span className="text nav-text mx-3">Carousel</span>
                </NavLink>
              </li>
              <li className="nav-link">
                <NavLink to={"/admin-Users"} activeClassName='active'>
                  <img src={tutor} alt="" height={35} />
                  <span className="text nav-text mx-3">Tutors</span>
                </NavLink>
              </li>
              <li className="nav-link">
                <NavLink to={"/admin-students"} activeClassName='active'>
                  <img src={student} alt="" height={35} />
                  <span className="text nav-text mx-3">Students</span>
                </NavLink>
              </li>
              <li className="nav-link">
                <Link  onClick={()=>setLogoutModal(true)}>
                  {/* <i className="bx bx-bell icon" /> */}
                  <img src={logout} alt="" height={35} />
                  <span className="text nav-text mx-3">Logout</span>
                </Link>
              </li>
            </ul>
          </div>
          <div className="bottom-content">
            {/* <li>
              <a href="#">
                <i className="bx bx-log-out icon" />
                <span className="text nav-text">Logout</span>
              </a>
            </li> */}
            {/* <li className="mode">
              <div className="sun-moon">
                <i className="bx bx-moon icon moon" />
                <i className="bx bx-sun icon sun" />
              </div>
              <span className="mode-text text">
                {isDarkMode ? 'Light mode' : 'Dark mode'}
              </span>
              <div className="toggle-switch" onClick={handleModeSwitch}>
                <span className="switch" />
              </div>
            </li> */}
          </div>
        </div>
      </nav>
      </div>

      {logoutmodal&&
    (<div className="modal bg" tabIndex="-1" role="dialog" style={{
      display: 'block',
      background: "rgba(102, 54, 255, 0.12)",
      borderRadius: "16px",
      boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
      backdropFilter: "blur(15.8px)",
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
          onClick={()=>setLogoutModal(false)}
          type="button"
        >
          {/* <span aria-hidden="true">&times;</span> */}
        </button>
        <div class="modal-body">
                    <p className='text-white'>Are you sure, you want to Logout?</p>
                    <div className="d-flex justify-content-between mt-5">
                   <button type="button" class="btn btn-secondary"
                     onClick={()=>setLogoutModal(false)}>No</button>
                    <a onClick={handlelogout}  class="btn btn-danger" type="button">Logout</a>
                   </div>
                   </div>
      
      </div>
    </div>
</div>
        </div>)
}
    </>
  )
}

export default Adminheader