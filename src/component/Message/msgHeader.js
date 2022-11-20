import React from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import SearchIcon from "@mui/icons-material/Search";
import { Box, Typography, Avatar } from "@mui/material";
import { deepOrange, deepPurple } from "@mui/material/colors";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";

const MsgHeader = ({ propsMessageID }) => {
  return (
    <Box style={{ width: "100%" }}>
      <Box
        display="flex"
        flexDirection="row"
        style={{ width: "100%", height: 70, backgroundColor: "gainsboro" }}
      >
        <Box
          display="flex"
          flexDirection="row"
          style={{ padding: 5, width: "100%" }}
        >
          <Avatar
            sx={{ bgcolor: deepPurple[100], height: 50, width: 50 }}
            alt={propsMessageID.title1}
            // src={"https://gotogetherapp.com/" + item.avater}
          />

          <Typography
            fontSize={12}
            style={{ width: "100%", marginTop: 10, marginLeft: 10 }}
          >
            {propsMessageID.title1}
          </Typography>
        </Box>
        <Box display="flex" style={{ marginLeft: 480 }}>
          <Tooltip title="Delete">
            <IconButton>
              <DeleteIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Search in Conversation">
            <IconButton>
              <SearchIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Mute">
            <IconButton>
              <NotificationsNoneIcon />
            </IconButton>
          </Tooltip>
        </Box>
      </Box>
    </Box>
  );
};

export default MsgHeader;
