import React, { useState, useEffect } from "react";
import AppBar from "@mui/material/AppBar";
import { Box, Avatar } from "@mui/material";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
// import MenuIcon from '@mui/icons-material/Menu';
import { deepOrange, deepPurple } from "@mui/material/colors";
import axios from "axios";
import { BaseUrl } from "../component/baseurl";
export default function ButtonAppBar() {
  const [user, setUser] = useState();

  useEffect(() => {
    axios
      .get(BaseUrl + "getuser/gotogetherapp1@gmail.com")
      .then((response) => {
        setUser(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  // console.log(user[0]);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          {user === undefined ? (
            ""
          ) : (
            <Box display="flex" flexDirection="row" style={{ padding: 5 }}>
              <Avatar sx={{ bgcolor: deepPurple[100], height: 50, width: 50 }}>
                T
              </Avatar>
              <Typography style={{ marginTop: 10, marginLeft: 20 }}>
                {" "}
                {/* {user[0].username} */}
              </Typography>
            </Box>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
