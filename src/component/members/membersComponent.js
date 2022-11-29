import React, { useEffect, useState } from "react";
import { Box, Typography, Button, Tooltip, IconButton } from "@mui/material";
import axios from "axios";
import AddIcon from "@mui/icons-material/Add";
import makeAnimated from "react-select/animated";
import Select from "react-select";
import Modal from "@mui/material/Modal";

import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import Dropdown from "./dropdown";
import { BaseUrl } from "../baseurl";
const MembersComponent = ({ propsMessageID }) => {
  const [members, setMember] = useState();
  const [Chatmembers, setChatMembers] = useState();
  const [open, setOPen] = useState(false);
  const currentuser = localStorage.getItem("current");
  const [Mopen, setMOpen] = React.useState(false);
  const [userlist, setUserList] = useState();
  const [Options, setOptions] = useState();
  const animatedComponents = makeAnimated();
  const handleOpen = () => setMOpen(true);
  const handleClose = () => setMOpen(false);
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

  useEffect(() => {
    axios
      .get(BaseUrl + "api/get/" + currentuser)
      .then((response) => {
        setUserList(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    if (userlist && userlist !== undefined) {
      const tttt = [];
      userlist.forEach((el) => {
        const data = { value: el.id, label: el.first_name };

        tttt.push(data);
        setOptions(tttt);
      });
    }
  }, [userlist]);

  const [selectedOptions, setSelectedOptions] = useState();
  const [final, setFinal] = useState();

  const handleSelect = () => {
    var members2fetch = JSON.parse("[" + propsMessageID.members2 + "]")[0];

    const EEE = [];

    // EEE.push(...EEE, 1);
    // console.log(typeof members2fetch);
    if (selectedOptions !== undefined) {
      selectedOptions.forEach((eee) => {
        console.log(eee);
        EEE.push(...EEE, eee.value);
        setFinal(members2fetch.concat(EEE));
      });
    }

    console.log(final);
    axios
      .put(BaseUrl + "secondAdminaddmembers/" + propsMessageID.id, { final })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  return (
    <Box display="flex" flexDirection="row" style={{ marginLeft: 20 }}>
      <>
        {currentuser === propsMessageID.admin1 ||
        currentuser === propsMessageID.admin2 ? (
          <Tooltip title="Add Member">
            <IconButton
              aria-label="comment"
              style={{
                width: 25,
                height: 25,
                margin: 5,
              }}
              onClick={handleOpen}
            >
              <AddIcon />
            </IconButton>
          </Tooltip>
        ) : (
          ""
        )}
      </>
      <Box>
        <Button onClick={toggle}>Show Members</Button>

        {
          open && (
            <Box>
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

      <div>
        <Modal
          open={Mopen}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={{ ...style, width: "90%", height: 500 }}>
            <h2 id="child-modal-title">Select Member</h2>
            <Box>
              {userlist === undefined ? (
                ""
              ) : (
                <Select
                  value={selectedOptions}
                  closeMenuOnSelect={false}
                  components={animatedComponents}
                  // defaultValue={selectedOptions}
                  onChange={(item) => setSelectedOptions(item)}
                  classNamePrefix="select"
                  // defaultValue={[Options[4], Options[5]]}
                  isMulti
                  options={Options}
                />
              )}
            </Box>

            <Button
              onClick={() => {
                handleSelect();
              }}
            >
              Add Member
            </Button>
          </Box>
        </Modal>
      </div>
    </Box>
  );
};

export default MembersComponent;
