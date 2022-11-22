import React, { useEffect, useState } from "react";
import { Box, Typography, Button } from "@mui/material";
import axios from "axios";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import CheckIcon from "@mui/icons-material/Check";
import IconButton from "@mui/material/IconButton";
import Collapsible from "react-collapsible";
import Tooltip from "@mui/material/Tooltip";
import Avatar from "@mui/material/Avatar";
import DeleteIcon from "@mui/icons-material/Delete";
import PersonRemoveIcon from "@mui/icons-material/PersonRemove";
const MembersComponent = ({ propsMessageID }) => {
  const [members, setMember] = useState();
  const [Chatmembers, setChatMembers] = useState();
  const [open, setOPen] = useState(false);
  const currentuser = localStorage.getItem("current");
  const toggle = () => {
    setOPen(!open);
  };
  useEffect(() => {
    axios
      .get("http://localhost:3002/getgroupsformem/" + propsMessageID.id)
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
        .post("http://localhost:3002/getuserlistArray/", { members2 })
        .then((res) => {
          setChatMembers(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [members]);

  console.log(Chatmembers);

  const handleAdmin2 = (value, item) => {
    axios
      .put("http://localhost:3002/updateadmin/" + value, { item })
      .then((res) => {
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Box>
      <Button onClick={toggle}>Show Members</Button>
      {/* <Collapsible trigger="See Members"> */}
      {
        open && (
          <Box style={{ overflow: "auto", padding: 10 }}>
            <List
              sx={{
                width: "100%",
                maxWidth: 360,
                bgcolor: "background.paper",
                overflow: "auto",
              }}
            >
              {Chatmembers !== undefined &&
                Chatmembers.map((item, index) => {
                  // console.log(item.id, propsMessageID.admin2);
                  return (
                    <ListItem
                      key={index}
                      disableGutters
                      secondaryAction={
                        <Box>
                          {currentuser === propsMessageID.admin1 ||
                          currentuser === propsMessageID.admin2 ? (
                            <Box>
                              {propsMessageID.admin2 != null ? (
                                <>
                                  {item.id.toString() ===
                                    propsMessageID.admin1 ||
                                  item.id.toString() ===
                                    propsMessageID.admin2 ? (
                                    <Box display="flex" flexDirection="row">
                                      <Typography fontSize={13} color="#037ffc">
                                        Admin
                                      </Typography>
                                    </Box>
                                  ) : (
                                    "aa"
                                  )}
                                </>
                              ) : (
                                <Box display="flex" flexDirection="row">
                                  {" "}
                                  <Tooltip title="Make Admin">
                                    <Box>
                                      {item.id.toString() ===
                                      propsMessageID.admin1 ? (
                                        ""
                                      ) : (
                                        <IconButton
                                          aria-label="comment"
                                          style={{
                                            backgroundColor: "#14f20c",
                                            width: 25,
                                            height: 25,
                                            margin: 5,
                                          }}
                                          onClick={() => {
                                            handleAdmin2(
                                              propsMessageID.id,
                                              item.id
                                            );
                                          }}
                                        >
                                          <CheckIcon />
                                        </IconButton>
                                      )}
                                    </Box>
                                  </Tooltip>
                                  <Tooltip title="Remove User">
                                    <Box>
                                      {item.id.toString() ===
                                      propsMessageID.admin1 ? (
                                        ""
                                      ) : (
                                        <IconButton
                                          aria-label="comment"
                                          style={{
                                            backgroundColor: "#14f20c",
                                            width: 25,
                                            height: 25,
                                            margin: 5,
                                          }}
                                          onClick={() => {
                                            handleAdmin2();
                                            // propsMessageID.id,
                                            // item.id
                                          }}
                                        >
                                          <PersonRemoveIcon />
                                        </IconButton>
                                      )}
                                    </Box>
                                  </Tooltip>
                                </Box>
                              )}
                            </Box>
                          ) : (
                            ""
                          )}
                        </Box>
                      }
                    >
                      <Avatar
                        alt={item.first_name}
                        src={"https://gotogetherapp.com/" + item.avater}
                        style={{ margin: 5 }}
                      />
                      <ListItemText primary={item.first_name} />
                      <Box>
                        {" "}
                        {item.id.toString() === propsMessageID.admin2 ? (
                          <Tooltip title="Remove Admin">
                            <IconButton
                              aria-label="comment"
                              style={{
                                width: 20,
                                height: 20,
                                marginTop: -10,
                              }}
                              onClick={() => {
                                handleAdmin2(propsMessageID.id);
                              }}
                            >
                              <DeleteIcon />
                            </IconButton>
                          </Tooltip>
                        ) : (
                          ""
                        )}
                      </Box>
                    </ListItem>
                  );
                })}
            </List>
          </Box>
        )
        // </Collapsible>
      }
    </Box>
  );
};

export default MembersComponent;
