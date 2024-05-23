import React, { useState } from 'react'
import './Register.css'
import { RegisterUser } from '../../Api/Authentication';

function Registration() {

    const [passwordVisible, setPasswordVisible] = useState(false);
    const [username,setUsername]=useState('');
    const [password,setPassword]=useState('');
    const [email,setEmail]=useState('');
    const [dateOfBirth,setDateOfBirth]=useState('');
    const [person,setPerson]=useState('');
    const [gender,setGender]=useState('');
    const [message,setMessage]=useState('');

    const togglePasswordVisibility = () => {
      setPasswordVisible(!passwordVisible);
    };

    const formsubmit =async(event)=>{
        event.preventDefault();
        try {
            const data={
                username,
                email,
                date_of_birth:dateOfBirth,
                gender:gender,
                password,
                person,
            }
            console.log(data);
            const response = await RegisterUser(data)
            if(response.success === true){
                console.log("sucess",response,"response data");
                setMessage("Register sucessfully Please Login")
                setTimeout(() => {
                    window.location.href='/login'
                }, 1000); 
            }else{
                console.log(response);
                setMessage(response.message)
            }
        } catch (error) {
            console.log(error);
        }
    }

  return (
    <div>
        <div id="login" style={{ backgroundColor: "#064f89", height: "100%" }}>
            <div className="container">
            <div
                id="login-row"
                className="row justify-content-center align-items-center"
            >
                <div id="login-column" className="col-md-6">
                <div id="login-box" className="col-md-12">
                    <form onSubmit={formsubmit}>
                    <h3 className="text-center text-inf">Register</h3>
                    <div className="form-group mb-3">
                        <label htmlFor="email" className="text-inf">
                        Email:
                        </label>
                        <br />
                        <input
                        type="text"
                        name="email"
                        id="email"
                        className="form-control"
                        value={email}
                        onChange={(e)=> setEmail(e.target.value)}
                        required=""
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
                                onChange={(e)=>setPassword(e.target.value)}
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
                            <div id="passwordErrors" className="text-danger" />{" "}
                            {/* Container for displaying password errors */}
                            </div>
                    <div className="form-group mb-3">
                        <label htmlFor="username" className="text-inf">
                        username:
                        </label>
                        <br />
                        <input
                        type="text"
                        name="username"
                        id="username"
                        className="form-control"
                        value={username}
                        onChange={(e)=>setUsername(e.target.value)}
                        required=""
                        />
                    </div>
                    <div className="form-group mb-3">
                        <label htmlFor="date_of_birth" className="text-inf">
                        Date of Birth:
                        </label>
                        <br />
                        <input
                        type="date"
                        name="date_of_birth"
                        id="date_of_birth"
                        className="form-control"
                        value={dateOfBirth}
                        onChange={(e)=>setDateOfBirth(e.target.value)}
                        required=""
                        />
                    </div>
                    <div className="form-group mb-3">
                        <label htmlFor="password" className="text-inf">
                        Gender:
                        </label>
                        <br />
                        <select
                        className="form-control select"
                        onChange={(e)=>setGender(e.target.value)}
                        required
                        >
                        <option >select gender</option>
                        <option value="male">male</option>
                        <option value="female">female</option>
                        </select>
                    </div>
                    <div className="form-group mb-3">
                        <label htmlFor="person" className="text-inf">
                        Choose who are you:
                        </label>
                        <br />
                        <select
                        className="form-control select"
                        onChange={(e)=>setPerson(e.target.value)}
                        required
                        >
                        <option >select one ...</option>
                        <option value="student">Student</option>
                        <option value="tutor">Tutuor</option>
                        </select>
                    </div>
                    <div id="errorMessage" className="text-danger" />
                    <div id="sucessmessage" className="text-success" />
                    <div className="form-group mb-3">
                        <label htmlFor="password" className="text-inf" />
                        <br />
                        <a href="/login">
                        if you already have an account please Login !!!
                        </a>
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

export default Registration