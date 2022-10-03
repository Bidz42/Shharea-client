import axios from 'axios';
import React, {useContext, useState} from 'react'
import {AuthContext} from '../../context/context';
import AddCircleIcon from '@mui/icons-material/AddCircle';

import {TextField} from '@mui/material'
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';

const Upload = ({setRefresh, refresh}) => {
    const { user } = useContext(AuthContext);
    const [name, setName] = useState("");
    const [tags, setTags] = useState([]);
    const [toggle, setToggle] = useState(false)
    const userId=user?._id

    const handleUpload = (e) => {
    console.log('here', e?.target.image)
    e.preventDefault();
    const tagsArray = [...tags].join('').split(',')
    const uploadData = new FormData();
    uploadData.append("imageUrl", e.target.image.files[0]);
    uploadData.append("name", name);
    uploadData.append("owner", userId );
    uploadData.append("tags", JSON.stringify(tagsArray));
     
    axios
        .post('https://mittens-buffalo.cyclic.app/home/upload', uploadData)
        .then((response) => {
          setRefresh(!refresh)
          console.log(response)
        
        })
        .catch((err) => console.log("Error while uploading the file: ", err));
        
        
    

    };
    
    const toggler = () => {
        if (toggle === false) {
          setToggle(true);
        } else {
          setToggle(false);
        }
      };

     
  return (
    <div>

{!toggle &&
        <AddCircleIcon onClick={toggler} sx={{mt:5, mb:5}} color="secondary" />
}

 {toggle &&
 
 <>
       
<form onSubmit={handleUpload} style={{display: 'flex', alignItems: 'center', justifyItems: 'center', flexDirection: 'column', marginTop: '15px'}}>
<TextField
            type="name"
            margin="normal"
            required
            id="name"
            label="Name"
            name="name"
            autoComplete="name"
            autoFocus
            onChange={(e) => setName(e.target.value)} 
            value={name}
            style={{width:'40%'}}
            variant="filled"
            color="secondary"
          /> 
         <div style={{display: 'flex'}}>
          <Button variant="contained" component="label" color="primary" sx={{p:0.5, pt:0, pb:0}}>
            CHOOSE FILE <input type="file" name="image" hidden/>
            </Button>
            <IconButton color="secondary" aria-label="upload picture" component="label">
            <PhotoCamera />
            </IconButton>
         </div>
           <TextField
            type="tags"
            margin="normal"
            required
            id="tags"
            label="Initiate a tag with #, Use commas to seperate tags"
            name="tags"
            autoComplete="tags"
            onChange={(e) => setTags(e.target.value)} 
            value={tags}
            style={{width:'40%'}}
            variant="filled"
            color="secondary"
          />
   
        <Button variant="contained" component="label" color="primary" sx={{p:0.5, pt:0, pb:0, m:3}}>
          UPLOAD TO SHH-AREA
          <button type="submit" hidden></button>
        </Button>


        <RemoveCircleIcon  onClick={toggler} sx={{mb:5}} color="secondary" /> 

    </form>
</>
  }   
  
</div>
   
  )
}

export default Upload 
