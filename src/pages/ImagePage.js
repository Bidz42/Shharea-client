import axios from "axios";
import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { AuthContext } from "../context/context";

import Comment from "../components/review/comment";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import FavoriteIcon from "@mui/icons-material/Favorite";
import CommentIcon from "@mui/icons-material/Comment";
import useMediaQuery from "@mui/material/useMediaQuery";
import Link from "@mui/material/Link";

import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";

import { theme } from "../index";

const ImagePage = () => {
  const { id } = useParams();
  const [image, setImage] = useState({});
  const [comments, setComments] = useState(false);
  const { user } = useContext(AuthContext);
  const userId = user?._id;
  const breakpoint = useMediaQuery(theme.breakpoints.down("sm" && "md"));

  // Refresh Render
  const [refresh, setRefresh] = useState(false)

 // Change Tabs
  const [value, setValue] = useState("1");

  useEffect(() => {
    const storeToken = localStorage.getItem("authToken");

    axios
      .get(`https://mittens-buffalo.cyclic.app/home/image/${id}`, {
        headers: { Authorization: `Bearer ${storeToken}` },
      })
      .then((res) => {
        setImage(res.data);
      })
      .catch((err) => console.log(err));
      // eslint-disable-next-line
  }, [refresh]);

  const handleLike = (e) => {
    e.preventDefault();
    axios
      .post(`https://mittens-buffalo.cyclic.app/home/image/like`, { userId, id })
      .then((res) => {
        setRefresh(!refresh)
        console.log(res);
      })
      .catch((err) => console.log(err));
  };



  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  console.log(comments)
  return (
    // First Section

    <Grid container spacing={{ xs: 0, md: 2 }} sx={{ p: 1 }}>
      <Grid item xs={12}>
        <Typography variant="h3" align="center">
          {image.name}{" "}
        </Typography>
      </Grid>

      <Grid item xs={12}>
        <Typography variant="subtitle" align="center" color="secondary">
          {image?.tags?.join(" ")}
        </Typography>
      </Grid>

      <Grid item xs={12} sx={{ mb: { xs: 1 } }}>
        <Typography variant="subtitle" align="center">
          This image was posted by{" "}
          <Link color="secondary" href={`/profile/${image?.owner?._id}`}>
            @{image?.owner?.username}{" "}
          </Link>
        </Typography>
      </Grid>

      {/* // Middle Section */}

      <Grid item xs={12} md={6}>
        <img
          src={image.imageUrl}
          alt={image.name}
          loading="lazy"
          style={{
            width: "100%",
          }}
        />

        <div
          onClick={handleLike}
          style={{
            position: "relative",
            top: `${breakpoint ? "-25%" : "-15%"}`,
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
            margin: "10px",
            padding: "1px",
          }}
        >
          <FavoriteIcon />
          {image?.likes?.length}
        </div>

        <div
          onClick={() => setComments(!comments)}
          style={{
            position: "relative",
            top: `${breakpoint ? "-25%" : "-15%"}`,
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
            margin: "10px",
          }}
        >
          <CommentIcon />
          {image?.comments?.length}
        </div>

        {comments && <Comment id={id} refresh={refresh} setRefresh={setRefresh} setComments={setComments} comments={comments} />}
      </Grid>
      <Grid item xs={12} md={6}>
        <Box sx={{ width: "100%" }}>
          <TabContext value={value}>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              <TabList
                onChange={handleChange}

                textColor="secondary"
                indicatorColor="secondary"
                aria-label="secondary tabs example"

              >
                <Tab label="See Likes" value="1"/>
                <Tab label="See Comments" value="2" />
              </TabList>
            
            </Box>
            <TabPanel value="1">
              {image?.likes?.map((like) => (
                <h3 key={like?._id}> <Link  href={`/profile/${like?._id}`}>@{like?.username}</Link></h3>
              ))}
            </TabPanel>
            <TabPanel value="2" align="left">
              {image?.comments?.map((comment) => (
                <h3 key={comment?._id}>
                  <Link href={`/profile/${comment?.owner?._id}`}>@{comment?.owner?.username}</Link>
                  {" "}<Typography variant="caption">{comment?.comment}</Typography>
                </h3>
              ))}
            </TabPanel>
          </TabContext>
        </Box>
      </Grid>
    </Grid>
  );
};

export default ImagePage;
