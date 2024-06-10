import React, { useState } from 'react'
import { AdminLogin } from '../Api/Authentication';
import './Admin.css'
import { toast } from 'react-toastify';
import bgimg from '../assets/images/backgroundgif.gif'
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';


const Adminlogin = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [email,setEmail]=useState('');
    const [password,setPassword]=useState('');
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [message,setMessage]=useState('');
    const navigate = useNavigate();
    const togglePasswordVisibility = () => {
      setPasswordVisible(!passwordVisible);
    };

    const onSubmit = async () => {
        try {
            const data ={
                email:email,
                password:password,
            }
            const response = await AdminLogin(data);
            if(response.success === true){
                toast.success(`${response.message}`)
                console.log(response);
                console.log("ffffffffffffffffffff");
                
                const expiryTime = new Date().getTime() + 6 * 24 * 60 * 60 * 1000;
                localStorage.setItem('tokenExpiry-admin', expiryTime);
                localStorage.setItem("token-admin-access-vini" , response.access)
                localStorage.setItem("token-admin-refresh-vini" , response.refresh)
                window.location.reload();
            }else{
                toast.error(`${response.message}`)
                console.log(response,"tttttttttt");
                setMessage(response.message)
                console.log(response,"tttttttttt");
            }
        } catch (error) {
            console.log(error);
        }
      };

 
  return (
    <div>
        {/* <div id="login" style={{ backgroundColor: "#064f89", height: "100vh" }}>
        <h3 className="text-center text-white pt-5" />
        <div className="container">
        <div
            id="login-row"
            className="row justify-content-center align-items-center"
        >
            <div id="login-column" className="col-md-6">
            <div id="login-box" className="col-md-12">
            
                <h3 className="text-center text-inf mb-4">Login</h3>
                
                <div className="form-group">
                    <label htmlFor="username" className="text-inf">
                    Username or email:
                    </label>
                    <br />
                    <input
                    type="text"
                    className={`form-control`}
                    value={email}
                    onChange={(e)=>setEmail(e.target.value)}
                    />
                </div>
                <div className="form-group mb-3">
                            <label htmlFor="password" className="text-inf">
                                Password:
                            </label>
                            <br />
                            <div className="input-group">
                                <input
                                type={passwordVisible ? "text" : "password"}
                                name="password"
                                id="password"
                                className="form-control"
                                value={password}
                                onChange={(e)=> setPassword(e.target.value)}
                                required
                                />
                                <div className="input-group-append">
                                <button
                                    className="btn btn-outline-secondary"
                                    type="button"
                                    onClick={togglePasswordVisibility}
                                >
                                    <i
                                    id="passwordIcon"
                                    className={passwordVisible ? "fas fa-eye-slash" : "fas fa-eye"}
                                    />
                                </button>
                                </div>
                            </div>
                            </div>
               
                <p className="text-danger text-inf mb-4 mt-4" >{message?message:""}</p>
                <div className="form-group mt-3">
                    <button type="submit" className="btn btn-primary" onClick={onSubmit}>
                    Submit
                    </button>
                </div>
            </div>
            </div>
        </div>
        </div>
        </div> */}
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
                    <h3 className="text-center text-inf">Admin Login</h3>
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
                                      value: 5,
                                      message: 'Password must be at least 5 characters long',
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
                 
                   
                 
                  
                 
                    <p className="text-danger text-inf mb-4 mt-4" >{message?message:""}</p>
                    <div className="form-group mb-3 mt-3">
                        <button type="submit" className="btn btn-primary">
                        Submit
                        </button>
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

export default Adminlogin