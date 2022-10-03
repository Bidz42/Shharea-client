import React, { useContext, useState, useEffect } from "react";
import { AuthContext } from "../../context/context";
import axios from "axios";
import { Button, Card, CardContent, Typography, TextField, Box, IconButton } from "@mui/material";
import PhotoCamera from '@mui/icons-material/PhotoCamera';


const ProfileCard = ({ id }) => {
  const { user, toggle, setToggle } = useContext(AuthContext);
  const userId = user?._id;
  const userEmail = user?.email;
  const userUserName = user?.username;
  const userInfo = user?.info;
  const userLocation = user?.location;

  const [details, setDetails] = useState({});
  const [email, setEmail] = useState(userEmail);
  const [username, setUsername] = useState(userUserName);
  const [info, setInfo] = useState(userInfo);
  const [location, setLocation] = useState(userLocation);

  // const [friend, setFriend] = useState(false);
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    const storeToken = localStorage.getItem('authToken');

    axios
      .get(`https://mittens-buffalo.cyclic.app/user/${id}/details`, {headers: {Authorization: `Bearer ${storeToken}`}})
      .then((response) => setDetails(response.data))
      .catch((err) => console.log(err));
    // eslint-disable-next-line
  }, [refresh]);

  const handleProfile =  (e) => {
    e.preventDefault();

     const updateProfile = new FormData();
        updateProfile.append("image", (e.target.image.files[0]?e.target.image.files[0]: details?.image ) );
        updateProfile.append("username", (username? username : details?.username) );
        updateProfile.append("userId", userId);
        updateProfile.append("location", (location? location : details?.location));
        updateProfile.append("info", (info? info : details?.info));
        updateProfile.append("email", (email? email : details?.email));

    

    axios
      .post("https://mittens-buffalo.cyclic.app/user/profile", updateProfile )
      .then((response) => {
        setRefresh(!refresh)
        toggler()
        console.log(response.data)
        })
      .catch((err) => console.log(err))
  };

  // const handleFriendship = async () => {
  //   (await friend) ? setFriend(false) : setFriend(true);
  //   try {
  //     const friendsResponse = await axios.post(
  //       `https://mittens-buffalo.cyclic.app/user/${id}/friends`,
  //       { userId }
  //     );
  //     console.log(friendsResponse);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // Show and Hide Edit Form

  const toggler = () => {
    if (toggle === false) {
      setToggle(true);
    } else {
      setToggle(false);
    }
  };


  return (
    <div>
      <div>
        <Card sx={{ justify:'center', align: 'center'}} >
          <CardContent>
        <img src={details?.image} alt={details?.name} style={{height: "100px", width: "100px", borderRadius:"50%", marginTop:'20px' }}/>

        <Typography variant='h5' sx={{margin:'5px'}}  color='primary' >
          Name: {details?.name}
        </Typography>
        <Typography variant='body1' sx={{margin:'5px'}}  color='secondary' >
          Location: {details?.location}
          </Typography>
          <Typography variant='body1' color='primary' sx={{margin:'2px'}}>Info:</Typography>
          <Typography variant='body2' sx={{margin:'5px', marginBottom: '20px'}}  color='secondary' >{details?.info}</Typography>

        {userId === id &&  <Button sx={{marginBottom: '20px', padding: '0'}} variant='contained' onClick={toggler}>Edit</Button>}
                                 
        {/* Shows if not current user, FRIEND REQUEST*/}
        {/* {!(userId === id) && (
          <Button sx={{marginBottom: '20px', padding: '1'}} variant='contained' onClick={handleFriendship}>Friend Request</Button>
          
        )} */}
        </CardContent>
        </Card>
      </div>

      {/* Edit User Information Section*/}

      {toggle && (

          <Box component="form" noValidate onSubmit={handleProfile} sx={{ mt: 1, width: '50%', margin: 'auto'}}>

            <Button variant="contained" component="label" color="primary" sx={{p:0.5, pt:0, pb:0}}>
            CHOOSE A NEW PROFILE PIC <input type="file" name="image" hidden/>
            </Button>
            <IconButton color="secondary" aria-label="upload picture" component="label">
            <PhotoCamera />
            </IconButton>

          <TextField
            margin="normal"
            required
            fullWidth
            id="username"
            label="Username"
            name="username"
            placeholder={details.username}
            autoFocus
            onChange={(e) => setUsername(e.target.value)} 
            value={username}
          />
            <TextField
            margin="normal"
            required
            fullWidth
            type="email"
            id="email"
            label='Email'
            name="email"
            placeholder={details.email}
            onChange={(e) => setEmail(e.target.value)} 
            value={email}
          />
            <TextField
            margin="normal"
            required
            fullWidth
            type="location"
            id="location"
            label='Location'
            name="location"
            placeholder={details.location}
            onChange={(e) => setLocation(e.target.value)}
            value={location}
          />
           <TextField
            margin="normal"
            required
            fullWidth
            type="info"
            id="info"
            label='Info'
            name="info"
            placeholder={details.info}
            onChange={(e) => setInfo(e.target.value)}
            value={info}
          />
    
          <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
          Update profile
          </Button>
        </Box>
      )}
    </div>
  );
};

export default ProfileCard;
