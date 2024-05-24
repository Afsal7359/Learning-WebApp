import React, { useState } from 'react'
import { AdminLogin } from '../Api/Authentication';
import './Admin.css'
import { toast } from 'react-toastify';

const Adminlogin = () => {

    const [email,setEmail]=useState('');
    const [password,setPassword]=useState('');
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [message,setMessage]=useState('');

    const togglePasswordVisibility = () => {
      setPasswordVisible(!passwordVisible);
    };

    const onSubmit = async (event) => {
        event.preventDefault();
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
                localStorage.setItem("token-admin-access-vini" , response.access)
                localStorage.setItem("token-admin-refresh-vini" , response.refresh)
             
                    window.location.href=('/admin')
            }else{
                toast.error(`${response.message}`)
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
          <section>
    {" "}
    <span /> <span /> <span /> <span /> <span /> <span /> <span /> <span />{" "}
    <span /> <span /> <span /> <span /> <span /> <span /> <span /> <span />{" "}
    <span /> <span /> <span /> <span /> <span /> <span /> <span /> <span />{" "}
    <span /> <span /> <span /> <span /> <span /> <span /> <span /> <span />{" "}
    <span /> <span /> <span /> <span /> <span /> <span /> <span /> <span />{" "}
    <span /> <span /> <span /> <span /> <span /> <span /> <span /> <span />{" "}
    <span /> <span /> <span /> <span /> <span /> <span /> <span /> <span />{" "}
    <span /> <span /> <span /> <span /> <span /> <span /> <span /> <span />{" "}
    <span /> <span /> <span /> <span /> <span /> <span /> <span /> <span />{" "}
    <span /> <span /> <span /> <span /> <span /> <span /> <span /> <span />{" "}
    <span /> <span /> <span /> <span /> <span /> <span /> <span /> <span />{" "}
    <span /> <span /> <span /> <span /> <span /> <span /> <span /> <span />{" "}
    <span /> <span /> <span /> <span /> <span /> <span /> <span /> <span />{" "}
    <span /> <span /> <span /> <span /> <span /> <span /> <span /> <span />{" "}
    <span /> <span /> <span /> <span /> <span /> <span /> <span /> <span />{" "}
    <span /> <span /> <span /> <span /> <span /> <span /> <span /> <span />{" "}
    <span /> <span /> <span /> <span /> <span /> <span /> <span /> <span />{" "}
    <span /> <span /> <span /> <span /> <span /> <span /> <span /> <span />{" "}
    <span /> <span /> <span /> <span /> <span /> <span /> <span /> <span />{" "}
    <span /> <span /> <span /> <span /> <span /> <span /> <span /> <span />{" "}
    <span /> <span /> <span /> <span /> <span /> <span /> <span /> <span />{" "}
    <span /> <span /> <span /> <span /> <span /> <span /> <span /> <span />{" "}
    <span /> <span /> <span /> <span /> <span /> <span /> <span /> <span />{" "}
    <span /> <span /> <span /> <span /> <span /> <span /> <span /> <span />{" "}
    <span /> <span /> <span /> <span /> <span /> <span /> <span /> <span />{" "}
    <span /> <span /> <span /> <span /> <span /> <span /> <span /> <span />{" "}
    <span /> <span /> <span /> <span /> <span /> <span /> <span /> <span />{" "}
    <span /> <span /> <span /> <span /> <span /> <span /> <span /> <span />{" "}
    <span /> <span /> <span /> <span /> <span /> <span /> <span /> <span />{" "}
    <span /> <span /> <span /> <span /> <span /> <span /> <span /> <span />{" "}
    <span /> <span /> <span /> <span /> <span /> <span /> <span /> <span />{" "}
    <span /> <span /> <span /> <span /> <span /> <span /> <span /> <span />{" "}
    <span /> <span /> <span /> <span />
    <div className="signin">
      <div className="content">
        <h2>Sign In</h2>
        <form className="form">
          <div className="inputBox">
            <input type="text" value={email}
                    onChange={(e)=>setEmail(e.target.value)} required /> <i>Email</i>
          </div>
          <div className="inputBox">
            <input type="password"  value={password}
             onChange={(e)=> setPassword(e.target.value)} required/> <i>Password</i>
          </div>
          {/* <div className="links">
            {" "}
            <Link to="/forgot-password" style={{color:"#000"}}>Forgot Password</Link> <Link to="/register">Signup</Link>
          </div> */}
          <div className="inputBox">
            <input type="submit" defaultValue="Login" onClick={onSubmit} />
          </div>
        </form>
      </div>
    </div>
  </section>{" "}
    </div>
  )
}

export default Adminlogin