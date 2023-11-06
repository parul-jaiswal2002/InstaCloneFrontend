import React from 'react'
import {RiCloseLine} from 'react-icons/ri'
import '../styles/Modal.css'
import { useNavigate } from 'react-router-dom'

const Modal = ({setModalOpen}) => {

  const navigate = useNavigate();

  return (
     <div className="darkbg" onClick={() => setModalOpen(false)}>
        <div className="centered">
            <div className="modal">
                {/* Modal header */}
                <div className="modal-header">
                  <h5 className='heading'>confirm</h5>
                </div>
                <button className='close-btn' onClick={() => setModalOpen(false)}>
                  <RiCloseLine></RiCloseLine>
                </button>

                {/* modal content */}
                <div className="modal-content">
                    Are you really want to logout?
                </div>

                <div className="modalActions">
                  <div className="actionsContainer">
                      <button className='logoutbtn' onClick={() => {
                          setModalOpen(false)
                          localStorage.clear();
                          navigate('/signin')
                      }}>Log out</button>
                      <button className='canclebtn' onClick={() => setModalOpen(false)}>Cancel</button>
                  </div>
                </div>
          </div>
      </div>
     </div>
  )
}

export default Modal