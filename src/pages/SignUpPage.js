import React from 'react'
import axios from "axios";
import { useState } from "react";
import image from "../assets/profile.png";

import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';


const SignUpPage = ({toggler}) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [username, setUsername] = useState("");
    const [name, setName] = useState("");
    
 

    const handleSubmit = (e) =>{
        e.preventDefault();
        axios.post("https://mittens-buffalo.cyclic.app/auth/signup", {email, password, username, name, image})
            .then(response => {
                console.log( response)
                toggler()
            })
            .catch(err => console.log(err));
            
    }

  return (
    <Grid container component="main" sx={{ height: '100vh' }}>
      <Grid
        item
        xs={false}
        sm={4}
        md={7}
        sx={{
          backgroundImage: 'url(https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80)',
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
    <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
      <Box sx={{ my: 8, mx: 4, display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <LockOutlinedIcon />
        </Avatar>

        <Typography component="h1" variant="h5">
          JOIN SHH-AREA
        </Typography>
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="name"
            label="Name"
            name="name"
            autoFocus
            onChange={(e) => setName(e.target.value)} 
            value={name}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="username"
            label="Username"
            type="username"
            id="username"
            onChange={(e) => setUsername(e.target.value)} 
            value={username}
          />
            <TextField
            margin="normal"
            required
            fullWidth
            type="email"
            id="email"
            label="Email Address"
            name="email"
            onChange={(e) => setEmail(e.target.value)} 
            value={email}
          />
            <TextField
            margin="normal"
            required
            fullWidth
            type="password"
            id="password"
            label="Password"
            name="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
          <FormControlLabel control={<Checkbox value="remember" color="secondary" />} label="Remember me"/>
          <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
            Sign Up
          </Button>
          
            <Grid item>
              <Typography variant="body2" color="secondary" onClick={toggler}>
                {"Already have an account? Log In"}
              </Typography>
            </Grid>    
    
        </Box>
      </Box>
    </Grid>
  </Grid>

);
}

export default SignUpPage;