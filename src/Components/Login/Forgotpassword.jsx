import React, { useState } from 'react'
import { ForgotPassword } from '../../Api/Authentication';
import './Login.css'
import { Link, useNavigate } from 'react-router-dom';
import bgimg from '../../assets/images/backgroundgif.gif'
import { toast } from 'react-toastify';
import { useForm } from 'react-hook-form';

const Forgotpassword = () => {
    const [message,setMessage]=useState('');
    const [email,setEmail]=useState('');
    const { register, handleSubmit, formState: { errors } } = useForm();
    const navigate = useNavigate();
    const onSubmit =async (event) => {
        try {
            const data ={
                email:email,
            }
            const response = await ForgotPassword(data);
            if(response.success === true){
                console.log(response);
                console.log("ffffffffffffffffffff");
                toast.success(" Password send Successfully !!  Please Check Your Email")
            // setMessage()
            // window.location.href='/login'
            navigate('/login'); 
            }else{
                console.log(response,"tttttttttt");
                setMessage(response.message)
                toast.error(`${response.message}`)
                console.log(response,"tttttttttt");
            }
            console.log(data,"formsubmit");
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
                    <h3 className="text-center text-inf">Forgot password</h3>
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
                   
                    <div className="form-group mb-3 mt-3">
                        <button type="submit" className="btn btn-primary">
                        Send
                        </button>
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

export default Forgotpassword