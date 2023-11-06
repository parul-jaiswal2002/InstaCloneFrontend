import React, {useState, useRef, useEffect} from 'react'
//we will access the profile pic from Profile.jsx using usestate here we are creatin the popup that will open when we click to the profile pic to change

const ProfilePic = ({changePic}) => {

    const [image,setImage] = useState('')
    const [url, setUrl] = useState('')
  
  const hiddenInputFile = useRef(null)

  const handleUpload = () => {
      hiddenInputFile.current.click()
  }

   //posting image to cloudinary
  const uploadProfilePic = () => {
   
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
  //set pic
  const setPic = () => {
    fetch('https://instaclonebackend-5yyd.onrender.com/others/uploadProfilePic', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + localStorage.getItem('jwt')
        },
        body: JSON.stringify({
          profilepic:url})
      }).then(res => res.json())
      .then(data => {
         changePic()
         window.location.reload()
      })
      .catch(err => console.error(err))

  }

  useEffect(() => {
    if(image){
        uploadProfilePic()
    }

  },[image])

  useEffect(() => {
    if(url){
        setPic()
    }
  },[url])

  //setPic
  

  return (
    <div className='profilePic darkbg'>
        <div className="changePic centered">
            <div>
                <h2>Change Profile Photo</h2>
            </div>
            <div className='button' onClick={handleUpload}>
                <button className='upload-btn'>Upload Photo</button>
                <input type='file' ref={hiddenInputFile} onChange={(e) => setImage(e.target.files[0])} accept='image/*' style={{display:'none'}} />
            </div>
            <div className='button'>
                <button className='remove-btn'
                 onClick={() => {
                   setUrl(null)
                   setPic()
                 }}>Remove Current Photo</button>
            </div>
            <div className='button' onClick={() => changePic()}>
                <button className='cancal-btn'>Cancel</button>
            </div>
        </div>
    </div>
  )
}

export default ProfilePic




//I will creating this styles in Profile.css