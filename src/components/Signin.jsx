import React, { useContext, useState } from 'react'
import {toast } from 'react-toastify'
import { Link, useNavigate } from 'react-router-dom'
import { AuthContext} from '../context/AuthContext'
import logo from '../assets/logo.png'
import '../styles/signin.css'

const Signin = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('')
    const navigate = useNavigate()
    const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
    const {setUserLogin} = useContext(AuthContext)

    const notifyError = (msg) =>  toast.error(msg)
    const notifySuccess = (msg) => toast.success(msg)

    const postData = async (e) => {
        e.preventDefault()
        //check email
        if(!emailRegex.test(email)){
            return notifyError('Invalid email address')
        }
        const response = await fetch('https://instaclonebackend-5yyd.onrender.com/user/signin', {
            method: 'POST',
            headers : {
                'Content-Type' : 'application/json',
            },
            body : JSON.stringify({ email, password})
        })
        const json = await response.json()
        if(response.ok){
            setEmail('');
            setPassword('');
            console.log('success')
            notifySuccess(json.message)
            localStorage.setItem('jwt', json.token)
            localStorage.setItem('user', JSON.stringify(json.user))
            setUserLogin(true)
            navigate('/')
           
        }
        if(!response.ok){
             notifyError(json.error);
            console.log('error')
        }
    }


  return (
    <div className="signin">
        <div>
            <div className="loginForm">
             <img className='signupLogo' src={logo} alt="logo" />
             <div className='form-feild'>
             <input type="email" name="email" id="email" placeholder='Email'  value={email} onChange={(e) => setEmail(e.target.value)}/>
            </div>
            <div className='form-feild'>
            <input type="password" name="password" id="password" placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)}/>
            </div>
            <input type="submit" id='login-btn' value='Sign in' onClick={postData}/>
            </div>

            <div className='loginForm2'>
                Don't have an account ? &nbsp;
                <Link to='/signup'><span style={{color: 'blue', cursor: 'pointer'}}>Sign up</span></Link>
            </div>
        </div>
    </div>
  )
}

export default Signin