import React, { useState, useEffect } from "react";
import { Box, TextField } from "@mui/material";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Checkbox from "@mui/material/Checkbox";
// import "../Message/group.css";
import axios from "axios";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import { BaseUrl } from "../baseurl";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};

function ChildModal({ dis, u, seto, cuser }) {
  const [userlist, setUserList] = useState();
  const [updatelist, setUpdateList] = useState();
  const [Options, setOptions] = useState();
  const animatedComponents = makeAnimated();

  // const currentuser = localStorage.getItem("current");
  console.log(cuser);

  useEffect(() => {
    axios
      .get(BaseUrl + "api/get/" + cuser)
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

  const handleSelect = () => {
    const EEE = [cuser];
    if (selectedOptions !== undefined) {
      selectedOptions.forEach((eee) => {
        EEE.push(...EEE, eee.value);
        console.log(EEE);
      });
    }

    axios
      .post(BaseUrl + "creategroup/" + cuser, {
        title: u.title,
        members: EEE,
      })
      .then((d) => {
        console.log(d.status);
        // window.reload();
        // handleClose();
        if (d.status === 200) {
          window.location.reload();
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <React.Fragment>
      <Button onClick={handleOpen} disabled={dis}>
        Add Members on Group
      </Button>
      <Modal
        hideBackdrop
        open={open}
        onClose={handleClose}
        aria-labelledby="child-modal-title"
        aria-describedby="child-modal-description"
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
            Create Group
          </Button>
        </Box>
      </Modal>
    </React.Fragment>
  );
}

export default function NestedModal() {
  const [cuser, setCuser] = useState();

  useEffect(() => {
    const currentuser = JSON.parse(localStorage.getItem("current"));
    setCuser(currentuser);
  }, []);

  const [user, setUser] = useState({
    title: "",
  });

  const [disable, setdisable] = useState(true);

  const handleChange = (e) => {
    const newContact = { ...user };
    newContact[e.target.name] = e.target.value;

    newContact.name !== "" ? setdisable(false) : setdisable(true);
    setUser(newContact);
  };

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button onClick={handleOpen}>Create Group</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <Box sx={{ ...style, width: 400 }}>
          <h2 id="parent-modal-title">Enter Group Name</h2>
          <TextField
            id="outlined-basic"
            label="Enter Group Name"
            name="title"
            value={user.title}
            onChange={handleChange}
            variant="outlined"
            style={{ width: 350 }}
          />
          <ChildModal dis={disable} u={user} seto={setOpen} cuser={cuser} />
        </Box>
      </Modal>
    </div>
  );
}
