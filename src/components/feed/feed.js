import React, {useContext, useEffect, useState} from 'react'
import axios from 'axios'
import {AuthContext} from '../../context/context';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import IconButton from '@mui/material/IconButton';
import Link from '@mui/material/Link';
import FavoriteIcon from '@mui/icons-material/Favorite';
import CommentIcon from '@mui/icons-material/Comment';
import useMediaQuery from '@mui/material/useMediaQuery';
import {theme} from '../../index'
import { Typography } from '@mui/material';

const Feed = ({refresh}) => {

const { images, setImages } = useContext(AuthContext);
const[hoverImage, setHoverImage] = useState([false,"id"])

useEffect(() => {
  const storeToken = localStorage.getItem('authToken');

   axios
        .get('https://mittens-buffalo.cyclic.app/home/images', {headers: {Authorization: `Bearer ${storeToken}`}} )
        .then((res) => setImages(res.data))
        .catch((err) => console.log(err));
        // eslint-disable-next-line react-hooks/exhaustive-deps
}, [refresh])
  

const breakpoint = useMediaQuery(theme.breakpoints.down('sm' && 'md'));

  return (
    <div>

{images && 
       
  <ImageList sx={{ width: '98%', height: '100%', margin:'auto' }} variant="masonry" cols={breakpoint ? 1 : 4 } gap={2} >
    {images?.map((item) => (
    <ImageListItem key={item._id}  >
      <img src={`${item.imageUrl}?w=500&fit=crop&auto=format`} srcSet={`${item.imageUrl}?w=500&fit=crop&auto=format&dpr=2 2x`} alt={item.name} loading="lazy" onMouseOver={(e)=> setHoverImage([true, item._id])} onMouseOut={(e) => setHoverImage([false, item._id])} />
        <Link href={`/home/image/${item._id}`}>
        <ImageListItemBar title={item?.name} subtitle={`Posted by @${item?.owner?.username}`} actionIcon={ 
          // color is set by HoverImage state change
          <IconButton sx={{ color: (hoverImage[1] === item._id ? "#F06FCB" : "rgba(255, 255, 255, 0.54) ") }} aria-label={`info about ${item.name}`} >


            <FavoriteIcon  />  <Typography variant="caption" sx={{mr:1}}>{item.likes.length}</Typography>
            <CommentIcon /> <Typography variant="caption" sx={{mr:1}}>{item.comments.length}</Typography> 

            
          </IconButton> }  /></Link>
    </ImageListItem>))}
  </ImageList>
  }
    </div>
  )
}

export default Feed

