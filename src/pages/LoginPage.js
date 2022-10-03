import React, {useState, useContext} from 'react';
import {useNavigate} from "react-router-dom";
import axios from "axios";
import {AuthContext} from '../context/context';


import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import MeetingRoomSharpIcon from '@mui/icons-material/MeetingRoomSharp';
import Typography from '@mui/material/Typography';


const LoginPage = ({toggler}) => {
  const navigate = useNavigate();
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setToken, authenticateUser } = useContext(AuthContext);

  const handleLoginSubmit = (e) => {
    e.preventDefault();
      const requestBody = { email, password };
    
      axios
          .post(`https://mittens-buffalo.cyclic.app/auth/login`, requestBody)
          .then((response) => {
            console.log("JWT token", response.data.authToken);
            setToken(response.data.authToken);
            authenticateUser();
          })
          .then(response => navigate("/home") )
          .catch((error) => console.log(error));
      };

  return (

    <Grid container component="main" sx={{ height: '100vh' }}>
  
    <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
      <Box sx={{ my: 8, mx: 4, display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <MeetingRoomSharpIcon />
        </Avatar>

        <Typography component="h1" variant="h5">
          ENTER SHH-AREA
        </Typography>
        <Box component="form" noValidate onSubmit={handleLoginSubmit} sx={{ mt: 1 }}>
    
            <TextField
            margin="normal"
            required
            fullWidth
            type="email"
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
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
            autoComplete="password"
            autoFocus
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
          <FormControlLabel control={<Checkbox value="remember" color="secondary" />} label="Remember me"/>
          <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
            Log In
          </Button>
          
            <Grid item>
              <Typography variant="body2" color="secondary" onClick={toggler}>
                {"Need an account? Sign Up"}
              </Typography>
            </Grid>    
    
            
        </Box>
      </Box>
    </Grid>
    <Grid
                item
                xs={false}
                sm={4}
                md={7}
                sx={{
                    backgroundImage: 'url(https://images.unsplash.com/photo-1496989981497-27d69cdad83e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=931&q=80)',
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                }}
                />
  </Grid>

    
  )
}

export default LoginPage;