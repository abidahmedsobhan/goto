import React, { useState, useEffect } from "react";
import { Box, Typography, Avatar } from "@mui/material";
import { deepOrange, deepPurple } from "@mui/material/colors";
import Search from "./search";

import axios from "axios";

const UserList = ({ setPropsMessageID, current }) => {
  const [userlist, setUserList] = useState();
  const [isActive, setIsActive] = useState(false);
  useEffect(() => {
    axios
      .get("http://localhost:3002/getgroups/" + current)
      .then((response) => {
        setUserList(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [userlist]);

  return (
    <Box
      style={{
        width: 300,
        height: 500,
        padding: 10,
        backgroundColor: "whitesmoke",
        overflow: "auto",
      }}
    >
      <Box style={{ width: 300 }}>
        <Search current={current} />
        {userlist === undefined ? (
          ""
        ) : (
          <Box>
            {userlist &&
              userlist.map((item, index) => {
                return (
                  <Box
                    onClick={() => {
                      setPropsMessageID(item);
                      setIsActive(index);
                    }}
                    key={index}
                    display="flex"
                    flexDirection="row"
                    style={{
                      padding: 5,
                      marginTop: 10,
                      overflow: "auto",
                      backgroundColor: isActive === index ? "#AED6F1" : "",
                    }}
                  >
                    <Avatar
                      sx={{ bgcolor: deepPurple[500], height: 50, width: 50 }}
                      alt={item.title1}
                      src={"https://gotogetherapp.com/" + item.avater}
                    />

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
