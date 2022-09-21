import React, {useEffect, useState} from 'react'
import { useParams, Link } from 'react-router-dom'
import axios from "axios";
import ProfileCard from '../components/profile/profilecard';

const ProfilePage = () => {
    const {id} = useParams();
    const [ownImages, setOwnImages] = useState([]);
 
    useEffect(() =>{
    axios
        .get(`http://localhost:5005/user/profile/${id}`)
        .then(response => setOwnImages(response.data))
        .catch(err => console.log(err));
    },[id])    



  console.log(ownImages)


    return (
    
    <div>ProfilePage
 
    <ProfileCard id={id}/>



    {
        ownImages && 
        ownImages?.map( item =>{
           return (
          <div key={item?._id}>
            <img
              src={item?.imageUrl}
              alt={item?.name}
              loading="lazy"
              style={{
                display: 'block',
                width: '25%',
              }}
            />
            <Link to={`/home/image/${item?._id}`}>{item?.name}</Link>
            
            <span>{item?.tags}</span>

            <div> 
              <h2>This Image Has {item?.comments?.length} comments</h2>
              {item?.comments?.map(comment => {
                return <p key={comment._id}><span>{comment?.owner?.username} said: </span> {comment.comment}</p>
              })}
            </div>
           
            <div> 
              <h2>This Image Has {item?.likes?.length} Likes</h2>
              {item?.likes?.map(like => {
                return <p key={like._id}><span>{like?.username} liked it </span></p>
              })}
            </div>


     </div>
        )})}

    
    </div>
  )
}

export default ProfilePage