var os = require("os");
var host = os.hostname();
const io = require("socket.io")(8900, {
  cors: {
    origin: "http://" + host + ":3000",
  },
});

let users = [];

const addUser = (userId, socketId) => {
  console.log(userId);
  !users.some((user) => user.userId === userId) &&
    users.push({ userId, socketId });
};

const removeUser = (socketId) => {
  users = users.filter((user) => user.socketId !== socketId);
};

const getUser = (userId) => {
  return users.find((user) => user.userId === userId);
};

io.on("connection", (socket) => {
  //when ceonnect
  console.log("a user connected.");

  //take userId and socketId from user
  socket.on("addUser", (userId) => {
    addUser(userId, socket.id);
    io.emit("getUsers", users);
  });

  //send and get message
  socket.on("sendMessage", ({ g_id, sender, message }) => {
    console.log(message);
    io.emit("getMessage", {
      g_id,
      sender,
      message,
    });
  });

  //when disconnect
  socket.on("disconnect", () => {
    console.log("a user disconnected!");
    removeUser(socket.id);
    io.emit("getUsers", users);
  });
});
