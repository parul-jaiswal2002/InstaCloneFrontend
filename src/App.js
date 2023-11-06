import {BrowserRouter, Routes, Route} from 'react-router-dom'
import React, { createContext, useState } from 'react'
import { AuthContext } from './context/AuthContext';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Signup from './components/Signup';
import Signin from './components/Signin';
import Profile from './pages/Profile';
import CreatePost from './pages/CreatePost';
import Modal from './components/Modal';
import OthersProfile from './components/OthersProfile';
import MyfollowingPosts from './pages/MyfollowingPosts';
import './App.css';



function App() {

  const [userLogin, setUserLogin] = useState(false)
  const [modalOpen, setModalOpen] = useState(false)
  return (
    <>
       <BrowserRouter>
          <div className='App'>
             <AuthContext.Provider value={{setUserLogin, setModalOpen}}>

                <Navbar Login={userLogin}/>
              <Routes>
                <Route path='/' element={<Home/>}/>
                <Route path='/signup' element={<Signup/>}/>
                <Route path='/signin' element={<Signin/>}/>
                <Route exact path='/profile' element={<Profile/>}/>
                <Route path='/createPost' element={<CreatePost/>}/>
                <Route path='/profile/:userid' element={<OthersProfile/>}/>
                <Route path='/myfollowingPosts' element={<MyfollowingPosts/>}/>
              </Routes>

              <ToastContainer theme='dark'/>
              {modalOpen && <Modal setModalOpen={setModalOpen}></Modal> }

              </AuthContext.Provider>
              
          </div>
       
       </BrowserRouter>
    </>
  );
}

export default App;
