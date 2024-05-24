import React, { lazy, Suspense } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
const Home = lazy(()=> import('./Components/Home/Home'))
const Courseintro = lazy(()=> import('./Components/Course/Courseintro'))
const Coursedetails = lazy(()=> import('./Components/Course/Coursedetails'))
const Tutorhome = lazy(()=> import('./Components/Tutor/Tutorhome'))
const Tutorcourse = lazy(()=> import('./Components/Tutor/Tutorcourse'))
const Profile = lazy(()=> import('./Components/Tutor/Profile'))
const Login = lazy(()=> import('./Components/Login/Login'))
const Registration = lazy(()=> import('./Components/Registration/Registration'))
const Studentprofile = lazy(()=> import('./Components/Home/Studentprofile'))
const Adminhome = lazy(()=> import('./Admin/Adminhome'))
const Carousel = lazy(()=> import('./Admin/Carousel'))
const Adminlogin = lazy(()=> import('./Admin/Adminlogin'))
const Category = lazy(()=> import('./Admin/Category'))
const Forgotpassword = lazy(()=> import('./Components/Login/Forgotpassword'))
const CourseList = lazy(()=> import('./Admin/CourseList'))


function App() {

 

  const student = localStorage.getItem('student-refresh-vini')
  const tutor = localStorage.getItem("token-refresh-vini")
  const admin = localStorage.getItem("token-admin-refresh-vini")

  return (
    <>
            <Router>
            <Suspense fallback={<div>Loading...</div>}>
                <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/course-intro" element={student?<Courseintro/>:<Navigate to={"/login"}/>}/>
                <Route path="/course-detail" element={student?<Coursedetails/>:<Navigate to={"/login"}/>}/>
                <Route path="/profile" element={student?<Studentprofile/>:<Navigate to={"/login"}/>}/>

                <Route path="/tutor" element={tutor?<Tutorhome/>:<Navigate to={"/login"}/>}/>
                <Route path="/tutor/course-detail" element={tutor?<Tutorcourse/>:<Navigate to={"/login"}/>}/>
                <Route path="/tutor/Profile" element={tutor?<Profile/>:<Navigate to={"/login"}/>}/>

                <Route path="/admin/login" element={admin ? <Navigate to={"/admin"}/>: <Adminlogin/>}/>
                <Route path="/admin/Users" element={<Adminhome/>}/>
                <Route path="/admin" element={<CourseList/>}/>
                <Route path="/admin/carosuel" element={<Carousel/>}/>
                <Route path="/admin/category" element={<Category/>}/>


                <Route path="/login" element={<Login/>}/>
                <Route path="/register" element={<Registration/>}/>
                <Route path="/forgot-password" element={<Forgotpassword/>}/>


                </Routes>
                </Suspense>
            </Router>
    </>
  )
}

export default App