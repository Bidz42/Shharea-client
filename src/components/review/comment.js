import axios from 'axios';
import React, {useState, useContext} from 'react'

import {AuthContext} from '../../context/context';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

const Comment = ({id, refresh, setRefresh, comments, setComments}) => {
    const [comment, setComment] = useState("");
    const {user} = useContext(AuthContext);
    const imageId = id


    const handleComment = (e) => {
        e.preventDefault();
        const owner = user._id;
        // const uploadData = new FormData();
        // uploadData.append("comment", comment);
        // uploadData.append("owner", owner)
        // uploadData.append("id", imageId)
        axios
            .post(`https://mittens-buffalo.cyclic.app/home/image/comment`, {comment, imageId, owner})
            .then((res) => {

                // refresh render 
                setRefresh(!refresh)
                // close comment form
                setComments(!comments)
                console.log(res)})
            .catch((err) => console.log(err))
    }

  return (

    <Grid container spacing={2} style={{position:"relative", top:"-9%"}}>

            <form onSubmit={handleComment} style={{position:"relative", alignItems: "center", justifyContent:"center", margin:"10px", padding:"1px", width: "100%"}}>
                <TextField
                        type="name"
                        margin="normal"
                        required
                        id="comment"
                        label="Comment"
                        name="comment"
                        autoComplete="comment"
                        autoFocus
                        onChange={(e) => setComment(e.target.value)} 
                        value={comment}
                        style={{width:'100%'}}
                        sx={{pl:10}}
                        variant="filled"
                        color="secondary"
                    /> 
                 

                <Button variant="contained" component="label" color="primary" >
                COMMENT!
                <button type="submit" hidden></button>
                </Button>

            </form>
    </Grid>

    )
}

export default Comment