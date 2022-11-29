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
  const [current, setcurrent] = useState(51);

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
    <Box style={{ width: "100%", height: "100vh" }}>
      {matches ? (
        <Box>
          <ResMain current={current} />
        </Box>
      ) : (
        <>
          {" "}
          <>
            <Appbar />
            <Box display="flex" flexDirection="row">
              <Box display="flex" flexGrow="1">
                <UserList
                  setPropsMessageID={setPropsMessageID}
                  current={current}
                />
              </Box>
              <Box display="flex" flexGrow="1" style={{ width: "100%" }}>
                {propsMessageID != undefined ? (
                  <Messagelist
                    propsMessageID={propsMessageID}
                    current={current}
                  />
                ) : (
                  "Click a conv to chat"
                )}
              </Box>
              <Box display="flex" flexGrow="1" style={{ width: "100%" }}>
                {propsMessageID != undefined ? (
                  <MembersComponent propsMessageID={propsMessageID} />
                ) : (
                  ""
                )}
              </Box>
            </Box>{" "}
          </>
        </>
      )}
    </Box>
  );
};

export default Main;
