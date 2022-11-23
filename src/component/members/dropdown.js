import React from "react";
import { Box, Button, Typography, Avatar } from "@mui/material";
import useCollapse from "react-collapsed";
import CheckIcon from "@mui/icons-material/Check";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import DeleteIcon from "@mui/icons-material/Delete";
import PersonRemoveIcon from "@mui/icons-material/PersonRemove";
import { BaseUrl } from "../baseurl";
import { ArrowDropDownCircle, ArrowDropUpRounded } from "@mui/icons-material";
import axios from "axios";
const currentuser = localStorage.getItem("current");
const Dropdown = ({ item, index, propsMessageID }) => {
  const { getToggleProps, getCollapseProps, isExpanded } = useCollapse({
    defaultExpanded: false,
  });

  const handleAdmin2 = (value, item) => {
    axios
      .put(BaseUrl + "updateadmin/" + value, { item })
      .then((res) => {
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Box key={index}>
      <Box
        display="flex"
        flexDirection="row"
        {...getToggleProps({
          style: { height: 50, marginTop: 2 },
        })}
      >
        <Avatar
          alt={item.first_name}
          src={"https://gotogetherapp.com/" + item.avater}
          style={{ margin: 5 }}
        />
        <Box justifyContent="flex-start">
          <Box display="flex" flexDirection="column">
            <Typography style={{ fontSize: 20, width: 200, marginTop: 10 }}>
              {item.first_name}
            </Typography>
            {item.id.toString() === propsMessageID.admin1 ||
            item.id.toString() === propsMessageID.admin2 ? (
              <Typography style={{ fontSize: 12, color: "blue" }}>
                Admin
              </Typography>
            ) : (
              ""
            )}
          </Box>
        </Box>

        {currentuser === propsMessageID.admin1 ||
        currentuser === propsMessageID.admin2 ? (
          <Box style={{ marginTop: 12, marginRight: 5 }}>
            {!isExpanded ? <ArrowDropDownCircle /> : <ArrowDropUpRounded />}
          </Box>
        ) : (
          <Box style={{ margin: 5 }}>
            {item.id.toString() === propsMessageID.admin1 ||
            item.id.toString() === propsMessageID.admin2 ? (
              // <Box display="flex" flexDirection="row">
              <Typography fontSize={13} color="#037ffc">
                Admin
              </Typography>
            ) : (
              ""
            )}
          </Box>
        )}
      </Box>

      <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        {...getCollapseProps()}
      >
        <Box display="flex" flexDirection="row" justifyContent="space-between">
          <Box justifyContent="flex-start">
            <Box style={{ margin: 5 }}>
              {item.id.toString() === propsMessageID.admin2 ? (
                <Tooltip title="Remove Admin">
                  <IconButton
                    aria-label="comment"
                    style={{
                      width: 25,
                      height: 25,
                      margin: 5,
                      backgroundColor: "gray",
                    }}
                    onClick={() => {
                      handleAdmin2(propsMessageID.id);
                    }}
                  >
                    <DeleteIcon />
                  </IconButton>
                </Tooltip>
              ) : (
                <Box display="flex" flexDirection="row">
                  <Tooltip title="Make Admin">
                    <Box>
                      {item.id.toString() === propsMessageID.admin1 ? (
                        ""
                      ) : (
                        <Button
                          aria-label="comment"
                          style={{
                            backgroundColor: "#5BB6F3",

                            margin: 5,
                          }}
                          onClick={() => {
                            handleAdmin2(propsMessageID.id, item.id);
                          }}
                        >
                          Make Admin
                        </Button>
                      )}
                    </Box>
                  </Tooltip>
                </Box>
              )}
            </Box>
          </Box>
          <Box></Box>
          <Box>
            <Typography style={{ padding: 5, margin: 5 }}>asdfasdf</Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Dropdown;
