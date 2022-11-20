import React, { useState, useEffect } from "react";
import { Box, Typography, Avatar } from "@mui/material";
import { deepOrange, deepPurple } from "@mui/material/colors";

import axios from "axios";

const UserList = ({ setPropsMessageID, setIsShown }) => {
  const [userlist, setUserList] = useState();

  useEffect(() => {
    axios
      .get("http://localhost:3002/getgroups")
      .then((response) => {
        setUserList(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  // console.log(userlist);

  return (
    <Box
      style={{
        width: "100%",
        height: 500,
        padding: 10,
        backgroundColor: "whitesmoke",
      }}
    >
      <Box style={{ width: 300, height: 50 }}>
        {userlist === undefined ? (
          ""
        ) : (
          <Box>
            {userlist.map((item, index) => {
              return (
                <Box
                  onClick={() => {
                    setPropsMessageID(item);
                    setIsShown(true);
                  }}
                  key={index}
                  display="flex"
                  flexDirection="row"
                  style={{ padding: 5, marginTop: 10 }}
                >
                  <Avatar
                    sx={{ bgcolor: deepPurple[500], height: 50, width: 50 }}
                  >
                    N
                  </Avatar>

                  <Box display="flex" flexDirection="column">
                    <Typography style={{ marginTop: 10, marginLeft: 20 }}>
                      {item.title1}
                    </Typography>
                  </Box>
                </Box>
              );
            })}
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default UserList;
