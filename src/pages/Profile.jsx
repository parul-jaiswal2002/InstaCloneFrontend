import React, { useEffect, useState } from 'react'
import '../styles/profile.css'
import { useNavigate } from 'react-router-dom'
import PostDetail from '../components/PostDetail'
import ProfilePic from '../components/ProfilePic'

const Profile = ({login}) => {
  const defaultProfilePic = 'https://cdn-icons-png.flaticon.com/128/847/847969.png'
  const [images, setImages] = useState([])
  const [show, setShow] = useState(false)
  const [post, setPost] = useState([])
  const [user, setUser] = useState([])
  const [changeProfilePic, setChangeProfilePic] = useState(false)
  const navigate = useNavigate()

  const toggleDetail = (post) => {
    if(show){
      setShow(false)
    }
    else{
      setShow(true)
      setPost(post)
      console.log(post)
    }
    
  }

  useEffect(() => {
    const token = localStorage.getItem('jwt')
    if(!token){
      navigate('/signin')
    }
  }, [])

  useEffect(() => {
    fetch(`https://instaclonebackend-5yyd.onrender.com/others/${JSON.parse(localStorage.getItem("user"))._id}`, {
        headers : {
          'Authorization' : 'Bearer ' + localStorage.getItem('jwt')
        }
    })
    .then(res => res.json())
    .then(result => {
         setUser(result.user)
         setImages(result.posts)
    })
  }, [])

  const changePic = () => {
    if(changeProfilePic){
      setChangeProfilePic(false)
      console.log('hide')
    }
    else{
      setChangeProfilePic(true)
      console.log('show')
    }
  }


  return (
    <div className="profile">
      {/* Profile frame */}
      <div className="profile-frame">
         {/* profile pic */}
         <div className="profile-picture">
            <img onClick={() => changePic()} src={user.profilepic ? user.profilepic : defaultProfilePic} style={{cursor:"pointer"}}/>
         </div>

         {/* profile data */}
         <div className="profile-data">
          <h1>{JSON.parse(localStorage.getItem('user')).userName}</h1>
          {/* profile infor */}
          <div className="profile-info">
              <p>{images.length} Posts</p>
              <p>{user.followers ? user.followers.length : '0'} followers</p>
              <p>{user.following ? user.following.length : '0'} following</p>
          </div>
         </div>

      </div>

      <hr style={{width : '90%', opacity:'0.8', margin: '24px auto', height:'0.5px'}}/>

      {/* gallary */}
      <div className="profile-gallary">
           {images.map((post) => {
            return <img src={post.photo} alt={post.body} onClick={() => toggleDetail(post)} key={post._id}/>
           })}
      </div>

      {show && <PostDetail Item={post} toggleDetail={toggleDetail}/>} 
       {/* here this item = post is a state of usestate we are sending the post detail in toggleDetail functiona and setting the setpost function so that we can send data in form of post state*/}

       {changeProfilePic && <ProfilePic changePic={changePic}/>}
    </div>
  )
}

export default Profile