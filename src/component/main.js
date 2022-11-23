import React, { useState, useEffect } from "react";
import { Box, TextField, Button } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import Appbar from "./appbar";
import UserList from "./userlist";
import Messagelist from "./Message/messagelist";
import ResMain from "./Responsive/resMain";
import MembersComponent from "./members/membersComponent";
const Main = () => {
  const [propsMessageID, setPropsMessageID] = useState();
  const [current, setcurrent] = useState(3);

  useEffect(() => {
    localStorage.setItem("current", JSON.stringify(current));
  }, []);

  const matches = useMediaQuery("(max-width:500px)");
  const [msg, setMsg] = useState({
    Message: "",
  });

  const handleChange = (e) => {
    const newContact = { ...setMsg };
    newContact[e.target.name] = e.target.value;

    // newContact.name !== "" ? setdisable(false) : setdisable(true);
    setMsg(newContact);
  };
  const chatenter = () => {
    setcurrent(parseInt(msg.Message), 10);
  };

  return (
    <>
      {matches ? (
        <Box>
          {current === undefined ? (
            <Box style={{ margin: 50, padding: 50, marginLeft: "18%" }}>
              <TextField
                id="outlined-basic"
                label="Enter User ID Which will dynamically get from robi bhai end by session"
                variant="outlined"
                name="Message"
                value={msg.Message}
                onChange={handleChange}
                style={{ width: "80%" }}
              />
              <Button
                onClick={() => {
                  chatenter();
                }}
              >
                Enter Chat
              </Button>
            </Box>
          ) : (
            <ResMain current={current} />
          )}
        </Box>
      ) : (
        <>
          {" "}
          {current === undefined ? (
            <Box style={{ margin: 50, padding: 50, marginLeft: "18%" }}>
              <TextField
                id="outlined-basic"
                label="Enter User ID Which will dynamically get from robi bhai end by session"
                variant="outlined"
                name="Message"
                value={msg.Message}
                onChange={handleChange}
                style={{ width: "80%" }}
              />
              <Button
                onClick={() => {
                  chatenter();
                }}
              >
                Enter Chat
              </Button>
            </Box>
          ) : (
            <>
              <Appbar />
              <Box display="flex" flexDirection="row">
                <Box>
                  <UserList
                    setPropsMessageID={setPropsMessageID}
                    current={current}
                  />
                </Box>
                <Box>
                  {propsMessageID != undefined ? (
                    <Messagelist
                      propsMessageID={propsMessageID}
                      current={current}
                    />
                  ) : (
                    "Click a conv to chat"
                  )}
                </Box>
                <Box>
                  {propsMessageID != undefined ? (
                    <MembersComponent propsMessageID={propsMessageID} />
                  ) : (
                    ""
                  )}
                </Box>
              </Box>{" "}
            </>
          )}
        </>
      )}
    </>
  );
};

export default Main;
