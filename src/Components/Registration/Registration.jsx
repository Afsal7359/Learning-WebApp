import React, { useState } from 'react'
import './Register.css'
import { RegisterUser } from '../../Api/Authentication';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import bgimg from '../../assets/images/backgroundgif.gif'
import { useForm } from 'react-hook-form';

function Registration() {
    const { register, handleSubmit, watch, formState: { errors },} = useForm()
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [username,setUsername]=useState('');
    const [password,setPassword]=useState('');
    const [email,setEmail]=useState('');
    const [dateOfBirth,setDateOfBirth]=useState('');
    const [person,setPerson]=useState('');
    const [gender,setGender]=useState('');
    const [message,setMessage]=useState('');
    const [selectedRole, setSelectedRole] = useState(''); // Initial state is empty
    const navigate = useNavigate();
    const handleSelection = (role) => {
        setSelectedRole(role);
        setValue('role', role, { shouldValidate: true }); // Update the role value and trigger validation
      };
    console.log(selectedRole,"selected role");
    const togglePasswordVisibility = () => {
      setPasswordVisible(!passwordVisible);
    };

    const formsubmit =async(event)=>{
        try {
            if(selectedRole){
                const data={
                    username,
                    email,
                    date_of_birth:dateOfBirth,
                    gender:gender,
                    password,
                    person:selectedRole,
                }
                console.log(data);
                const response = await RegisterUser(data)
                if(response.success === true){
                    toast.success(`${response.message}`)
                    console.log("sucess",response,"response data");
                    setTimeout(() => {
                        // window.location.href='/login'
                        navigate('/login'); 
                    }, 1000); 
                }else{
                    console.log(response);
                    toast.error(`${response.message}`)
                }
            }else{
                toast.error('Please select who you are: Tutor or Student from above');
            }
     
        } catch (error) {
            console.log(error);
        }
    }

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
                    <form onSubmit={handleSubmit(formsubmit)}>
                    <h3 className="text-center text-inf">Register</h3>
                    <div className="form-group-horizontal mt-5">
                    <div className="form-group">
                        <button
                        type="button"
                        className={`btn ${selectedRole === 'student' ? 'btn-primary' : 'btn-light'}`}
                        style={{ borderRadius: '25px' }}
                        onClick={() => handleSelection('student')}
                        >
                        Student
                        </button>
                    </div>
                    <div className="form-group">
                        <button
                        type="button"
                        className={`btn ${selectedRole === 'tutor' ? 'btn-primary' : 'btn-light'}`}
                        style={{ borderRadius: '25px' }}
                        onClick={() => handleSelection('tutor')}
                        >
                        Tutor
                        </button>
                    </div>
                 
                        </div>
                    {errors.role && <div className="text-danger mt-2">{errors.role.message}</div>}
                    <div className="form-group mb-3">
                        <label htmlFor="email" className="text-inf">
                        Email:
                        </label>
                        <br />
                        <input
                         {...register('email', {
                            required: 'Email is required',
                            pattern: {
                              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                              message: 'Invalid email address'
                            }
                          })}
                        placeholder='abcd@gmail.com'
                        className="form-control"
                        value={email}
                        onChange={(e)=> setEmail(e.target.value)}
                  
                        />
                           {errors.email && <p className='text-danger'>{errors.email.message}</p>}
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
                    <div className="form-group mb-3">
                        <label htmlFor="username" className="text-inf">
                        Username:
                        </label>
                        <br />
                        <input
                        type="text"
                        placeholder='username'
                        className={`form-control ${errors.username ? 'is-invalid' : ''}`}
                        {...register('username', {
                            required: 'Username is required',
                            maxLength: {
                            value: 20,
                            message: 'Username cannot exceed 20 characters'
                            },
                            minLength:{
                                value:3,
                                message:"Username must have been minimum 3 Character required"
                            },
                            pattern: {
                            value: /^[a-zA-Z0-9]*$/,
                            message: 'Username can only contain letters and numbers'
                            }
                        })}
                        value={username}
                        onChange={(e)=>setUsername(e.target.value)}
                      
                        />
                         {errors.username && <div className="invalid-feedback">{errors.username.message}</div>}
                    </div>
                    
                    <div className="form-group-horizontal">
                    <div className="form-group mb-3">
                        <label htmlFor="date_of_birth" className="text-inf">
                        Date of Birth:
                        </label>
                        <br />
                        <input
                        type="date"
                        name="date_of_birth"
                        id="date_of_birth"
                        className={`form-control ${errors.date_of_birth ? 'is-invalid' : ''}`}
                        {...register('date_of_birth', { required: 'Date of Birth is required' })}
                        value={dateOfBirth}
                        onChange={(e)=>setDateOfBirth(e.target.value)}/> 
                         {errors.date_of_birth && <div className="invalid-feedback">{errors.date_of_birth.message}</div>}
                    </div>
                    <div className="form-group">
                        <label htmlFor="gender" className="text-inf">
                        Gender:
                        </label>
                        <br />
                        <select
                         id="gender"
                         className={`form-control ${errors.gender ? 'is-invalid' : ''}`}
                         {...register('gender', { required: 'Gender is required' })}
                         style={{ height: "40px", width: "100%", borderRadius: "10px" }}
                         onChange={(e) => setGender(e.target.value)}
                        >
                        <option value="">Select gender</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        </select>
                        {errors.gender && <div className="invalid-feedback">{errors.gender.message}</div>}
                    </div>
                   
                    </div>
                   
                    <div className="form-group mb-3 mt-3">
                        <button type="submit" className="btn btn-primary">
                        Sign up
                        </button>
                    </div>
                    <div className="form-group mb-3">
                        <label htmlFor="password" className="text-inf" />
                        <br />
                        <Link to="/login" style={{color:"#fff"}}>
                        if you already have an account please Login !!!
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

export default Registration