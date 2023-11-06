import React, { useContext, useEffect } from 'react'
import logo from '../assets/logo.png'
import '../styles/Navbar.css'
import { Link, useNavigate } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'

const Navbar = ({login}) => {
    
   const navigate = useNavigate()
   const {setModalOpen} = useContext(AuthContext)


   const loginStatus = () => {
      const token = localStorage.getItem('jwt')
      if(login || token){
         return [
            <>
              <Link to='/profile'><li>Profile</li></Link>
              <Link to='/createPost'><li><span className="material-symbols-outlined">add_a_photo</span></li></Link>
              <Link to='/myfollowingPosts'><li>My Following</li></Link>
              <Link to={''}><button className='primaryBtn' onClick={() => setModalOpen(true)}>Log out</button></Link>
            </>
         ]
      }
      else{
         return [
            <>
               <Link to='/signup'><li>Sign up</li></Link>
               <Link to='/signin'><li>Sign in</li></Link>
            </>
         ]
      }
   }

   const loginMobileStatus = () => {
      const token = localStorage.getItem('jwt')
      if(login || token){
         return [
            <>
              <Link to='/'><li><span class="material-symbols-outlined">home</span></li></Link>
              <Link to='/profile'><li><span class="material-symbols-outlined">person</span></li></Link>
              <Link to='/createPost'><li><span className="material-symbols-outlined">add_a_photo</span></li></Link>
              <Link to='/myfollowingPosts'><li><span class="material-symbols-outlined">explore</span></li></Link>
              <Link to={''}><li onClick={() => setModalOpen(true)}><span class="material-symbols-outlined">logout</span></li></Link>
            </>
         ]
      }
      else{
         return [
            <>
               <Link to='/signup'><li>Sign up</li></Link>
               <Link to='/signin'><li>Sign in</li></Link>
            </>
         ]
      }
   }

  return (
     <div className='navbar'>
        <img src={logo} id='insta-logo' alt="Instagram" onClick={() => navigate('/')}/>
        <ul className='nav-menu'>{loginStatus()}</ul>
        <ul className="nav-menu-mobile">{loginMobileStatus()}</ul>
     </div>
  )
}

export default Navbar