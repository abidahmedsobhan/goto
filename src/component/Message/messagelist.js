import React, { useState, useEffect, useRef } from "react";
import { Box, TextField, IconButton } from "@mui/material";
import MsgHeader from "./msgHeader";
import "./message.css";
import axios from "axios";
import SendIcon from "@mui/icons-material/Send";
import { io } from "socket.io-client";
const Messagelist = ({ propsMessageID, current }) => {
  const socket = useRef();
  const scrollRef = useRef();

  const [Conv, setAllconv] = useState([]);
  const [arrivalMessage, setArrivalMessage] = useState(null);
  //   console.log(propsMessageID.id);

  useEffect(() => {
    axios
      .get("http://localhost:3002/getgroupmessage/" + propsMessageID.id)
      .then((res) => {
        setAllconv(res.data);
      })
      .catch((Err) => {
        console.log(Err);
      });
  }, [propsMessageID]);

  useEffect(() => {
    socket.current = io("ws://localhost:8900");
    socket.current.on("getMessage", (data) => {
      setArrivalMessage({
        g_id: data.g_id,
        sender: data.sender,
        message: data.message,
      });
    });
  }, []);

  useEffect(() => {
    // arrivalMessage &&
    //   Conv?.g_id.includes(arrivalMessage.g_id) &&
    if (arrivalMessage) {
      setAllconv((prev) => [...prev, arrivalMessage]);
    }
    // console.log(arrivalMessage);
  }, [arrivalMessage]);

  useEffect(() => {
    socket.current.emit("addUser", current);
  }, [current]);

  const [disable, setdisable] = useState(true);
  const [msg, setMsg] = useState({
    Message: "",
  });

  const handleChange = (e) => {
    const newContact = { ...setMsg };
    newContact[e.target.name] = e.target.value;

    newContact.msg !== "" ? setdisable(false) : setdisable(true);
    setMsg(newContact);
  };

  const sendMessage = () => {
    socket.current.emit("sendMessage", {
      g_id: propsMessageID.id,
      sender: current,
      message: msg.Message,
    });

    try {
      axios
        .post("http://localhost:3002/groupmessage", {
          g_id: propsMessageID.id,
          sender: current,
          message: msg.Message,
        })
        .then((d) => {
          if (d != null) {
            setMsg({ Message: "" });
          }
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [Conv]);

  return (
    <Box>
      {propsMessageID != undefined ? (
        <Box>
          <MsgHeader propsMessageID={propsMessageID} />

          <Box style={{ height: 400, overflow: "auto" }}>
            {Conv.map((item, index) => {
              return (
                <div key={index} ref={scrollRef}>
                  <div
                    className={
                      item.sender === current ? "message own" : "message"
                    }
                  >
                    <div className="messageTop">
                      <p className="messageText">{item.message}</p>
                    </div>
                    <div className="messageBottom"></div>
                  </div>
                </div>
              );
            })}
          </Box>
          <Box style={{ width: "100%", margin: 5 }}>
            <TextField
              id="outlined-basic"
              label="Aa"
              variant="outlined"
              name="Message"
              value={msg.Message}
              onChange={handleChange}
              style={{ width: "80%" }}
            />
            <IconButton
              disabled={disable}
              style={{
                backgroundColor: "#45c7ff",
                width: 60,
                height: 60,
                marginLeft: 20,
              }}
            >
              <SendIcon
                onClick={() => {
                  sendMessage();
                }}
              />
            </IconButton>
          </Box>
        </Box>
      ) : (
        "Click a Conversation to chat"
      )}
    </Box>
  );
};

export default Messagelist;
