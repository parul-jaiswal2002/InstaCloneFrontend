import React, { useEffect, useState } from 'react'
import '../styles/profile.css'
import { useNavigate, useParams } from 'react-router-dom'
import PostDetail from './PostDetail'

const OthersProfile = ({login}) => {

  const defaultProfilePic = 'https://cdn-icons-png.flaticon.com/128/847/847969.png'
    
  const {userid} = useParams()
  const [posts, setPosts] = useState([])
  const [user, setUser] = useState('')
  const [isFollowed, setIsFollowed] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    fetch(`https://instaclonebackend-5yyd.onrender.com/others/${userid}`, {
        headers : {
          'Authorization' : 'Bearer ' + localStorage.getItem('jwt')
        }
    })
    .then(res => res.json())
    .then(result => {
         setUser(result.user)
         setPosts(result.posts)
         if(result.user.followers.includes(JSON.parse(localStorage.getItem('user'))._id)){
             setIsFollowed(true)
         }
    })
  }, [isFollowed])
  

  const followhandler = async (userId) => {
    console.log(userId)
    await fetch('https://instaclonebackend-5yyd.onrender.com/others/follow', {
       method : 'put',
       headers : {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('jwt')
       },
       body : JSON.stringify({
        followId : userId
       })
    }).then(res => res.json())
    .then(data => {
      // console.log(data)
      setIsFollowed(true)
    })
  }


  const unfollowhandler = (userId) => {
    fetch('https://instaclonebackend-5yyd.onrender.com/others/unfollow', {
       method : 'put',
       headers : {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('jwt')
       },
       body : JSON.stringify({
          followId : userId
       })
    }).then(res => res.json())
    .then(data => {
      // console.log(data)
      setIsFollowed(false)
    })
  }



  return (
    <div className="profile">
      {/* Profile frame */}
      <div className="profile-frame">
         {/* profile pic */}
         <div className="profile-picture">
          <img src={user.profilepic ? user.profilepic : defaultProfilePic} alt='profile-pic'/>
         </div>
         

         {/* profile data */}
         <div className="profile-data">
            <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
                <h1>{user.userName}</h1>
                <button className="followbtn" 
                       onClick={() => {
                          if(isFollowed){
                            unfollowhandler(user._id)
                          }
                          else{followhandler(user._id)}
                        }}>

                   {isFollowed ? "Unfollow" : "Follow"}
                </button>
            </div>


          {/* profile infor */}
          <div className="profile-info">
              <p>{posts.length} Posts</p>
              
              <p>{user.followers ? user.followers.length : "0"} followers</p>
              <p>{user.following ? user.following.length : "0"} following</p>
          </div>
         </div>

      </div>

      <hr style={{width : '90%', opacity:'0.8', margin: '24px auto', height:'0.5px'}}/>

      {/* gallary */}
      <div className="profile-gallary">
           {posts.map((post) => {
            return <img src={post.photo} alt={post.body} key={post._id}/>
           })}
      </div>

      {/* {show && <PostDetail Item={post} toggleDetail={toggleDetail}/>}  */}
       {/* here this item = post is a state of usestate we are sending the post detail in toggleDetail functiona and setting the setpost function so that we can send data in form of post state*/}
    </div>
  )
}

export default OthersProfile