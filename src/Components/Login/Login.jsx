import React, { useState } from 'react'
import './Login.css'
import { Loginuser } from '../../Api/Authentication';
import { toast } from 'react-toastify';

function Login() {

    const [email,setEmail]=useState('');
    const [password,setPassword]=useState('');
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [message,setMessage]=useState('');

    const togglePasswordVisibility = () => {
      setPasswordVisible(!passwordVisible);
    };

  const onSubmit =async (event) => {
    event.preventDefault();
    try {
        const data ={
            email:email,
            password:password,
        }
        const response = await Loginuser(data);
        if(response.success === true){
            console.log(response);
            console.log("ffffffffffffffffffff");
            // toast.success(`${response.message}`)
            
            if (response.data[0].person === "tutor"){
                window.location.href=('/tutor')
                localStorage.setItem("token-access-vini" , response.access)
                localStorage.setItem("token-refresh-vini" , response.refresh)
                localStorage.setItem("tutor-data-vini", JSON.stringify(response.data))
            }else if(response.data[0].person === 'student'){
                localStorage.setItem("student-data-vini", JSON.stringify(response.data))
                localStorage.setItem("student-access-vini" , response.access)
              localStorage.setItem("student-refresh-vini" , response.refresh)
                window.location.href=('/')
            }
        }else{
            console.log(response,"tttttttttt");
            setMessage(response.message)
            console.log(response,"tttttttttt");
        }
        console.log(data,"formsubmit");
    } catch (error) {
        console.log(error);
    }
  };

  return (
    <div>
        <div id="login">
        <h3 className="text-center text-white pt-5" />
        <div className="container">
        <div
            id="login-row"
            className="row justify-content-center align-items-center"
        >
            <div id="login-column" className="col-md-6">
            <div id="login-box" className="col-md-12">
            
                <h3 className="text-center text-inf mb-4">Login</h3>
                <div className="containers mb-5 mt-5">
                    <div className="checkbox-group">
                    <label className="checkbox-container">
                        <input
                        type="radio"
                        name="userType"
                        required
                        />
                        <span className="checkmark">
                        <i>
                            {' '}
                            <img
                            src="/src/assets/images/student.png"
                            style={{ borderRadius: 25 }}
                            alt=""
                            height="35px"
                            width="35px"
                            />
                        </i>
                        </span>
                        <span className="label-text">Student</span>
                    </label>
                    <label className="checkbox-container">
                        <input
                        type="radio"
                        name="userType"
                        required
                        />
                        <span className="checkmark">
                        <i>
                            {' '}
                            <img
                            src="/src/assets/images/tutor.png"
                            alt=""
                            style={{ borderRadius: 25 }}
                            height="35px"
                            width="35px"
                            />
                        </i>
                        </span>
                        <span className="label-text">Tutor</span>
                    </label>
                    </div>
                </div>
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
                            <div className="form-group">
                    <label className="text-inf" />
                    <br />
                    <a href="/forgot-password">forgot password ?</a>
                </div>  
                <div className="form-group">
                    <label className="text-inf" />
                    <br />
                    <a href="/register">if you don't have an account please register !!!</a>
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
        </div>
    </div>
  )
}

export default Login