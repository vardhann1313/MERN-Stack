import React, { useState } from 'react'
import {ToastContainer} from 'react-toastify'
import {Link, useNavigate} from 'react-router-dom'
import { handleError, handleSuccess } from '../utils'

function Signup() {

    const navigate = useNavigate();

    const [signupInfo, setSignupInfo] = useState({
        name: "",
        email: "",
        password: ""
    })

    const handleChange = (e) => {
        const {name, value} = e.target;
        const copySignupInfo = {...signupInfo}
        copySignupInfo[name] = value
        setSignupInfo(copySignupInfo)
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const {name, email, password} = signupInfo;

        if(!name || !email || !password){
            return handleError('Name, email and password is required !')
        }

        try {
            const url = "http://localhost:8080/auth/signup";
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(signupInfo)
            })
            const result = await response.json()

            const { success, message, error } = result ;
            
            if(success){
                handleSuccess(message)
                setTimeout(() => {
                    navigate('/login')
                }, 2000);
            }else if(error){
                const details = error?.details[0].message;
                handleError(details);
            }else if(!success){
                handleError(message)
            }
            
        } catch (error) {
            handleError(error)
        } 
    }

  return (
    <div className='container'>
        <h1>Signup page</h1>
        <form onSubmit={handleSubmit} >
            <div>
                <label htmlFor='name'>Name</label>
                <input
                    onChange={handleChange}
                    type='text'
                    name='name'
                    autoFocus
                    placeholder='Enter your name ...'
                    value={signupInfo.name}
                />
            </div>
            <div>
                <label htmlFor='email'>Email</label>
                <input
                    onChange={handleChange}
                    type='email'
                    name='email'
                    placeholder='Enter your mail ...'
                    value={signupInfo.email}
                />
            </div>
            <div>
                <label htmlFor='password'>Password</label>
                <input
                    onChange={handleChange}
                    type='password'
                    name='password'
                    placeholder='Enter your password ...'
                    value={signupInfo.password}
                />
            </div>
            <button type='submit'>Signup</button>
            <span>Already have an account ? 
                <Link to="/login">Login</Link>
            </span>
            <ToastContainer />
        </form>
    </div>
  )
}

export default Signup