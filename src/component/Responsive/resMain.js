import React, { useState, useEffect } from "react";
import { Box } from "@mui/material";
import ResUserList from "./resUserList";
import MessengerRes from "./messangerRes";
const Responsive_Entry = ({ current }) => {
  const [isShown, setIsShown] = useState(false);
  const [propsMessageID, setPropsMessageID] = useState();
  return (
    <Box>
      {isShown === true ? (
        <MessengerRes propsMessageID={propsMessageID} current={current} />
      ) : (
        <ResUserList
          setPropsMessageID={setPropsMessageID}
          setIsShown={setIsShown}
        />
      )}
    </Box>
  );
};

export default Responsive_Entry;
