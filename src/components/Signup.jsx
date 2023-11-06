import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {toast } from 'react-toastify'
import logo from '../assets/logo.png'
import '../styles/signup.css'

const Signup = () => {
    const [name, setName] = useState('')
    const [userName, setUserName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()

    const notifyError = (msg) =>  toast.error(msg)
    const notifySuccess = (msg) => toast.success(msg)

    const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/

    const postData = async (e) => {
        e.preventDefault()
        //check email
        if(!emailRegex.test(email)){
            return notifyError('Invalid email address')
        }
        if(!passwordRegex.test(password)){
            return notifyError('Password must be strong')
        }
        const response = await fetch('https://instaclonebackend-5yyd.onrender.com/user/signup', {
            method: 'POST',
            headers : {
                'Content-Type' : 'application/json'
            },
            body : JSON.stringify({name, email, password, userName})
        })
        const json = await response.json()
        if(response.ok){
            setName('');
            setEmail('');
            setPassword('');
            setUserName('');
            console.log('success')
            notifySuccess(json.message)
            navigate('/signin')
        }
        if(!response.ok){
             notifyError(json.error);
            console.log('error')
        }
    }


  return (
      <div className="signup">
         <div className="form-container">
           
            <div className="form">
                    <img className='signupLogo' src={logo} alt="logo" />
                    <p className='loginpara'>
                        Sign up to see photos and videos <br /> from your friends
                    </p> 
                    <div className='form-feild'>
                        <input type="email" name="email" id="email" placeholder='Email'  value={email} onChange={(e) => setEmail(e.target.value)}/>
                    </div>
                    <div className='form-feild'>
                        <input type="text" name="name" id="name" placeholder='Full Name' value={name}  onChange={(e) => setName(e.target.value)}/>
                    </div>
                    <div className='form-feild'>
                        <input type="text" name="username" id="username" placeholder='UserName' value={userName} onChange={(e) => setUserName(e.target.value)}/>
                    </div>
                    <div className='form-feild'>
                        <input type="password" name="password" id="password" placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)}/>
                    </div>
                    <p className='loginpara' style={{fontSize: '0.8rem', margin:'3px 0px'}}>By Sigining up, you agree to our Terms, <br/>Privacy policy and cookies policy  </p>
                    <input type="submit" id='submit-btn' value='Sign up' onClick={postData}/>
            </div>
            <div className='form2'>
                Already have an account ?  &nbsp;
                <Link to='/signin'><span style={{color : 'blue'}}>Sign in</span></Link>
            </div>
        </div> 
      </div>
    )
}

export default Signup