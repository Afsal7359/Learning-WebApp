import React, { useState } from 'react'
import { ForgotPassword } from '../../Api/Authentication';

const Forgotpassword = () => {
    const [message,setMessage]=useState('');
    const [email,setEmail]=useState('');

    const onSubmit =async () => {
        try {
            const data ={
                email:email,
            }
            const response = await ForgotPassword(data);
            if(response.success === true){
                console.log(response);
                console.log("ffffffffffffffffffff");
            setMessage(" Password send Successfully !!  Please Check Your Email")
             
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
    <div id="login" style={{ backgroundColor: "#064f89", height: "100vh" }}>
    <h3 className="text-center text-white pt-5" />
    <div className="container">
    <div
        id="login-row"
        className="row justify-content-center align-items-center"
    >
        <div id="login-column" className="col-md-6">
        <div id="login-box" className="col-md-12">
        
            <h3 className="text-center text-inf mb-4">Forgot Password</h3>
           
            <div className="form-group">
                <label htmlFor="username" className="text-inf">
                 email:
                </label>
                <br />
                <input
                type="text"
                className={`form-control`}
                value={email}
                onChange={(e)=>setEmail(e.target.value)}
                />
            </div>
            <div className="form-group">
                    <label className="text-inf" />
                    <br />
                    <a href="/login">if you have an account login here !!</a>
                </div>  
                <div className="form-group">
                    <label className="text-inf" />
                    <br />
                    <a href="/register">if you don't have an account Please Register here !!</a>
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

export default Forgotpassword