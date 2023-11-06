import React, { useEffect, useState } from 'react'
import {toast } from 'react-toastify'
import '../styles/createPost.css'
import { useNavigate } from 'react-router-dom';

const CreatePost = () => {

  const [body, setBody] = useState('');
  const [image, setImage] = useState('')
  const [url, setUrl] = useState('')
  const navigate = useNavigate()

  const notifyError = (msg) =>  toast.error(msg)
  const notifySuccess = (msg) => toast.success(msg)

  const loadfile = (event) => {
    var output = document.getElementById('output');
    output.src = URL.createObjectURL(event.target.files[0]);
    output.onload = function() {
    URL.revokeObjectURL(output.src) // free memory
  }};


  const handlePostButton = (e) => {
    e.preventDefault();
    //posting image to cloudinary
    const data = new FormData();
    data.append("file", image);
    data.append('upload_preset', 'Instaclone')
    data.append('cloud_name', 'instacloud1')
    fetch("https://api.cloudinary.com/v1_1/instacloud1/image/upload",   {
        method : 'POST',
        body : data
    })
    .then(res => res.json())
    .then(data => setUrl(data.url))
    .catch(err => console.error(err))

  }

  useEffect(() => {
    if(url){
        //saving data to mongodb
      fetch('https://instaclonebackend-5yyd.onrender.com/post/createPost', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + localStorage.getItem('jwt')
        },
        body: JSON.stringify({
          body,
          photo:url})
      }).then(res => res.json())
      .then(data => {
          if(data.error){notifyError(data.error)}
          else{
            notifySuccess('Successfully posted')
            navigate('/')
           }
      })
      .catch(err => console.error(err))
    }
  },[url])

  return (
       <div className="createPost">

        {/* Header */}
          <div className="post-header">
            <h4>Create New Post</h4>
            <button id='post-btn' onClick={handlePostButton}>Share</button>
          </div>

          {/* Image preview */}
          <div className="main-div">
            <img id='output' src='https://cdn4.iconfinder.com/data/icons/ionicons/512/icon-image-512.png' />
            <input type="file" accept='image/*'
             onChange={(event) => {
              loadfile(event)
              setImage(event.target.files[0])
             }}/>
          </div>

          {/* details */}
          <div className="details">
            <div className="card-header">
                <div className="profile-pic">
                    <img src="data:image/jpeg;base64,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" alt="profile-picture" />
                </div>
                <h5>Paruljansie</h5>
            </div>
            <textarea value={body} onChange={(e) => setBody(e.target.value)} type='text' placeholder='Write a caption...'></textarea>
          </div>
       </div>
  )
}

export default CreatePost