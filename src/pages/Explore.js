import axios from "axios";
import React, { useState, useEffect } from "react";
import Link from "@mui/material/Link";
import PageviewIcon from "@mui/icons-material/Pageview";
import Input from "@mui/material/Input";
import InputAdornment from "@mui/material/InputAdornment";
import { Typography } from "@mui/material";
import Grid from "@mui/material/Grid";
import { ImageList, ImageListItem, ImageListItemBar } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import { theme } from "../index";


const Explore = () => {
  const storeToken = localStorage.getItem("authToken");
  const [data, setData] = useState([]);
  const [query, setQuery] = useState("");
  const copyData = [...data];
  const images = copyData[0];
  const users = copyData[1];
  const breakpoint = useMediaQuery(theme.breakpoints.down("sm" && "md"));
  const one = "https://mittens-buffalo.cyclic.app/home/search/upload";
  const two = "https://mittens-buffalo.cyclic.app/home/search/user";
  
  const requestOne = axios.get(one, {
    headers: { Authorization: `Bearer ${storeToken}` },
  });
  const requestTwo = axios.get(two, {
    headers: { Authorization: `Bearer ${storeToken}` },
  });

  useEffect(() => {
    axios
      .all([requestOne, requestTwo])
      .then(
        axios.spread((...responses) => {
          setData([responses[0].data, responses[1].data]);
        })
      )
      .catch((err) => console.log(err));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  let filteredImage = images?.filter((image) => {
    return (
      image.name.toLowerCase().includes(query.toLowerCase()) ||
      image?.owner?.name.toLowerCase().includes(query.toLowerCase())
    );
  });

  let filteredUser = users?.filter((user) => {
    return (
      user.name.toLowerCase().includes(query.toLowerCase()) ||
      user.username.toLowerCase().includes(query.toLowerCase())
    );
  });
 
  return (
    <>
      <Input
        sx={{ mt: 3, mb: 3 }}
        color="primary"
        label="Search"
        id="input-with-icon-adornment"
        onChange={(e) => setQuery(e.target.value)}
        value={query}
        startAdornment={
          <InputAdornment position="start">
            {" "}
            <PageviewIcon fontSize="large" color="primary" />{" "}
          </InputAdornment>
        }
      />

      <Grid container>
        <Grid xs={8}>
          <Typography sx={{ mb: 4, align: "left" }} color='secondary'>Images</Typography>
          <ImageList
            sx={{ width: "100%", height: "100%", marginLeft: "15px" }}
            variant="masonry"
            cols={breakpoint ? 1 : 4}
            gap={2}
          >
            {filteredImage?.map((item) => (
              <ImageListItem key={item._id}>
                <img
                  src={`${item.imageUrl}?w=500&fit=crop&auto=format`}
                  srcSet={`${item.imageUrl}?w=500&fit=crop&auto=format&dpr=2 2x`}
                  alt={item.name}
                  loading="lazy"
                />
                <Link href={`/home/image/${item._id}`}>
                  <ImageListItemBar title="" subtitle={item?.name} />
                </Link>
              </ImageListItem>
            ))}
          </ImageList>
        </Grid>

        <Grid xs={4} sx={{ width: "100%", height: "100%" }}>
          <Typography sx={{ mb: 4 }} color='secondary'> Users </Typography>

          {filteredUser?.map((item) => (
            <div key={item._id}>
              <img
                src={item.image}
                style={{ height: "40px", width: "40px", borderRadius: "50%" }}
                alt={item.name}
              />
              <Link href={`/profile/${item._id}`}>
                <Typography sx={{ mb: "20px" }}> @{item?.username} </Typography>
              </Link>
            </div>
          ))}
        </Grid>
      </Grid>
    </>
  );
};

export default Explore;
