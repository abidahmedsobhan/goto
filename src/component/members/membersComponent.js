import React, { useEffect, useState } from "react";
import { Box, Typography, Button } from "@mui/material";
import axios from "axios";

import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import Dropdown from "./dropdown";
import { BaseUrl } from "../baseurl";
const MembersComponent = ({ propsMessageID }) => {
  const [members, setMember] = useState();
  const [Chatmembers, setChatMembers] = useState();
  const [open, setOPen] = useState(false);
  const [expand, setExpand] = useState(false);
  const currentuser = localStorage.getItem("current");
  const toggle = () => {
    setOPen(!open);
  };
  useEffect(() => {
    axios
      .get(BaseUrl + "getgroupsformem/" + propsMessageID.id)
      .then((res) => {
        setMember(res.data);
      })
      .catch((Err) => {
        console.log(Err);
      });
  }, [propsMessageID]);

  useEffect(() => {
    if (members && members[0] !== undefined) {
      //   console.log(members[0].members2);
      const members2 = members[0].members2;
      axios
        .post(BaseUrl + "getuserlistArray/", { members2 })
        .then((res) => {
          setChatMembers(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [members]);

  console.log(Chatmembers);

  return (
    <Box>
      <Button onClick={toggle}>Show Members</Button>
      {/* <Collapsible trigger="See Members"> */}
      {
        open && (
          <Box style={{ overflow: "auto", padding: 10 }}>
            <Box
              display="flex"
              flexDirection="column"
              sx={{
                height: "100%",
                width: "100%",
                overflow: "auto",
              }}
            >
              {Chatmembers !== undefined &&
                Chatmembers.map((item, index) => {
                  // console.log(item.id, propsMessageID.admin2);
                  return (
                    <Dropdown
                      item={item}
                      index={index}
                      propsMessageID={propsMessageID}
                    />
                  );
                })}
            </Box>
          </Box>
        )
        // </Collapsible>
      }
    </Box>
  );
};

export default MembersComponent;
