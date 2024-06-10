import React, { useEffect, useState } from 'react'
import './Login.css'
import { Loginuser } from '../../Api/Authentication';
import { toast } from 'react-toastify';
import Tutor from '../../assets/images/tutor.png'
import STudent from '../../assets/images/student.png'
import { Link  } from 'react-router-dom';
import bgimg from '../../assets/images/backgroundgif.gif'
import { useForm } from 'react-hook-form';
import {useNavigate} from 'react-router-dom'

function Login() {

    const [loginSuccess, setLoginSuccess] = useState(false); 
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [email,setEmail]=useState('');
    const [password,setPassword]=useState('');
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [tutors,setTutors]=useState(false)
    const [students,setstudents]=useState(false)
    const navigate = useNavigate();
    // const tutorlog =async ()=>{
    //         navigate('/tutor');
    //         console.log("Login tutor successful");
       
    // }
    // const studentlog = async()=>{
    //        navigate('/');
    //         console.log("Login student successful");
        
    // }

  
    const togglePasswordVisibility = () => {
      setPasswordVisible(!passwordVisible);
    };

    const onSubmit = async () => {
      try {
          const data = {
              email: email,
              password: password,
          };
          const response = await Loginuser(data);
          if (response.success === true) {
              console.log(response);
              const expiryTime = new Date().getTime() + 6 * 24 * 60 * 60 * 1000;
              console.log("Login successful");
              toast.success(`${response.message}`);
        
              if (response.person === "tutor") {
                // navigate('/tutor')
                localStorage.setItem("token-access-vini", response.access);
                localStorage.setItem("token-refresh-vini", response.refresh);
                localStorage.setItem('tokenExpiry-tutor', expiryTime);
                localStorage.setItem("tutor-data-vini", JSON.stringify(response.data));
              
              } else if (response.person === "student") {
                // navigate('/')
                localStorage.setItem("student-data-vini", JSON.stringify(response.data));
                localStorage.setItem("student-access-vini", response.access);
                localStorage.setItem("student-refresh-vini", response.refresh);
                localStorage.setItem('tokenExpiry-student', expiryTime);
             
              }setTutors(true)
              window.location.reload()
             
          } else {
              console.log(response, "Login failed");
              toast.error(`${response.message}`);
          }
      } catch (error) {
          console.log(error);
      }
  };


  return (
    <div>
         <div id="login" className='master' style={{
        backgroundImage: `url(${bgimg})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        height: "100vh",
        display: "block",
        justifyContent: "center",
        alignItems: "center",
        overflowY:"scroll",
      }}>  

            <div className="container">
            <div
                id="login-row"
                className="row justify-content-center align-items-center"
            >
                <div id="login-column" className="col-md-6">
                <div id="login-box" className="col-md-12">
                    <form onSubmit={handleSubmit(onSubmit)}>
                    <h3 className="text-center text-inf">Login</h3>
                    <div className="form-group mb-3">
                        <label htmlFor="email" className="text-inf">
                        Email:
                        </label>
                        <br />
                        <input
                        type="text"
                        placeholder='abcd@gmail.com'
                        className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                        {...register('email', {
                          required: 'Email is required',
                          pattern: {
                            value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                            message: 'Invalid email address',
                          },
                        })}
                        value={email}
                        onChange={(e)=> setEmail(e.target.value)}
                        />
                         {errors.email && <div className="invalid-feedback">{errors.email.message}</div>}
                    </div>
                    <div className="form-group mb-3">
                            <label htmlFor="password" className="text-inf">
                                Password:
                            </label>
                            <br />
                            <div className="input-group">
                                <input
                                type={passwordVisible ? "text" : "password"}
                                placeholder='password'
                                className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                                {...register('password', {
                                    required: 'Password is required',
                                    minLength: {
                                      value: 8,
                                      message: 'Password must be at least 8 characters long',
                                    },
                                    pattern: {
                                      value: /(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])/,
                                      message: 'Password must contain at least one number, one lowercase and one uppercase letter',
                                    },
                                  })}
                                value={password}
                                onChange={(e)=>setPassword(e.target.value)}
                                />
                                  
                                <div className="input-group-append">
                                <button
                                    className="btn btn-light mx-1"
                                    type="button"
                                    style={{border:"1px solid #000"}}
                                    onClick={togglePasswordVisibility}
                                >
                                    <i
                                    id="passwordIcon"
                                    className={passwordVisible ? "fas fa-eye" : "fas fa-eye-slash"}
                                    />
                                </button>
                                </div>
                                {errors.password && <div className="invalid-feedback">{errors.password.message}</div>}
                            </div>
                            {/* Container for displaying password errors */}
                            </div>
                 
                            <div className="form-group-horizontal">
                    <div className="form-group mb-3" >
                       
                        <label htmlFor="password" className="text-inf" />
                        <br />
                        <Link to="/forgot-password" style={{color:"#fff"}}>
                        Forgot Password
                        </Link>
                       
                      
                    </div>
                    
                    <div className="form-group mb-3 mt-3" >
                    <button type="submit" className="btn btn-primary " >
                        Login
                        </button>
                    </div>
                    </div>
                    <div className="form-group mb-3">
                        <label htmlFor="password" className="text-inf" />
                        <br />
                        <Link to="/register" style={{color:"#fff"}}>
                        if you don't have an account please Register !!!
                        </Link>
                    </div>
                    
                    </form>
                </div>
                </div>
            </div>
            </div>
        </div>

    </div>
  )
}

export default Login