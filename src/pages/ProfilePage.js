import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import ProfileCard from "../components/profile/profilecard";
import {
  ImageList,
  ImageListItem,
  ImageListItemBar,
  IconButton,
  Typography,
  Link
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { AuthContext } from "../context/context";


const ProfilePage = () => {
  const { id } = useParams();
  const [ownImages, setOwnImages] = useState([]);
  const { user } = useContext(AuthContext);
  const [hoverImage, setHoverImage] = useState([false, " "]);
  const [refresh, setRefresh] = useState(false)

  const storeToken = localStorage.getItem("authToken");
 
  useEffect(() => {
    axios
      .get(`https://mittens-buffalo.cyclic.app/user/profile/${id}`, {
        headers: { Authorization: `Bearer ${storeToken}` },
      })
      .then((response) => setOwnImages(response.data))
      .catch((err) => console.log(err));
   // eslint-disable-next-line
  }, [id, refresh]);

  const handleDelete = (id) => {
    axios 
      .delete(`https://mittens-buffalo.cyclic.app/home/image/${id}`, 
      { headers: { Authorization: `Bearer ${storeToken}` },
      })
      .then((response) => {console.log(response.data)
      setRefresh(true)})
      .catch((err) => console.log(err));
  };



  return (
    <div>
      <ProfileCard id={id} />

      <Typography
        variant="h4"
        sx={{ padding: "20px", textDecoration: "underline" }}
        color="secondary"
      >
        View your images below
      </Typography>
      <ImageList variant="masonry" cols={4} xs={12}>
        {ownImages &&
          ownImages?.map((item) => (
            <div key={item._id}>
              <ImageListItem color="secondary">
                <img
                  src={item?.imageUrl}
                  srcSet={item?.imageUrl}
                  alt={item.name}
                  loading="lazy"
                />
              
                  <ImageListItemBar
                    title={<Link href={`/home/image/${item._id}`}> {item?.name} </Link>}
                    actionIcon={
                      // color is set by HoverImage state change
                      <IconButton
                        aria-label={`info about ${item.name}`}
                        onMouseOver={(e) => setHoverImage([!hoverImage[0], item._id])}
                        onMouseOut={(e) => setHoverImage([false, item._id])}
                        sx={{
                          color: (hoverImage[0] && hoverImage[1] === item._id? "#EE4B2B"  : "#F06FCB")
                            
                        }}
                        onClick={() => handleDelete(item._id)}
                      >
                        {user._id === id && (
                          <DeleteIcon  />
                        )}
                      </IconButton>
                    }
                  />{" "}
                
              </ImageListItem>
            </div>
          ))}
      </ImageList>

     
    </div>
  );
};

export default ProfilePage;
