import React, { lazy, Suspense } from "react";
import {
  HashRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

const Student = lazy(() => import("./Admin/Student"));
const Error = lazy(() => import("./Components/404/Error"));
const Home = lazy(() => import("./Components/Home/Home"));
const Courseintro = lazy(() => import("./Components/Course/Courseintro"));
const Coursedetails = lazy(() => import("./Components/Course/Coursedetails"));
const Tutorhome = lazy(() => import("./Components/Tutor/Tutorhome"));
const Tutorcourse = lazy(() => import("./Components/Tutor/Tutorcourse"));
const Profile = lazy(() => import("./Components/Tutor/Profile"));
const Login = lazy(() => import("./Components/Login/Login"));
const Registration = lazy(() => import("./Components/Registration/Registration"));
const Studentprofile = lazy(() => import("./Components/Home/Studentprofile"));
const Tutor = lazy(() => import("./Admin/Tutor"));
const Carousel = lazy(() => import("./Admin/Carousel"));
const Adminlogin = lazy(() => import("./Admin/Adminlogin"));
const Category = lazy(() => import("./Admin/Category"));
const Forgotpassword = lazy(() => import("./Components/Login/Forgotpassword"));
const CourseList = lazy(() => import("./Admin/CourseList"));

function App() {
  
  const student = localStorage.getItem('student-refresh-vini');
  const tutor = localStorage.getItem("token-refresh-vini");
  const admin = localStorage.getItem("token-admin-refresh-vini");

  return (
    <>
      <Router>
        <Suspense fallback={<div className="loader-container"><div className="loader"></div></div>}>
          <Routes>
            <Route path="/" element={student ? <Home /> : <Navigate to={"/login"} />} />
            <Route path="/course-intro" element={student ? <Courseintro /> : <Navigate to={"/login"} />} />
            <Route path="/course-detail" element={student ? <Coursedetails /> : <Navigate to={"/login"} />} />
            <Route path="/profile" element={student ? <Studentprofile /> : <Navigate to={"/login"} />} />

            <Route path="/tutor" element={tutor ? <Tutorhome/> : <Navigate to={"/login"} />} />
            <Route path="/tutor/course-detail" element={tutor ? <Tutorcourse /> : <Navigate to={"/login"} />} />
            <Route path="/tutor-Profile" element={tutor ? <Profile /> : <Navigate to={"/login"} />} />

            <Route path="/admin-login" element={<Adminlogin />} />
            <Route path="/admin-Users" element={admin ? <Tutor /> : <Navigate to={"/admin-login"} />} />
            <Route path="/admin-students" element={admin ? <Student /> : <Navigate to={"/admin-login"} />} />
            <Route path="/admin" element={admin ? <CourseList /> : <Navigate to={"/admin-login"} />} />
            <Route path="/admin-carosuel" element={admin ? <Carousel /> : <Navigate to={"/admin-login"} />} />
            <Route path="/admin-category" element={admin ? <Category /> : <Navigate to={"/admin-login"} />} />

            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Registration />} />
            <Route path="/forgot-password" element={<Forgotpassword />} />

            <Route path="*" element={<Error />} />
          </Routes>
        </Suspense>
      </Router>
    </>
  );
}

export default App;