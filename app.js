const express = require("express");
const app = express();

const button1 = {
  left: 0,
};

const button2 = {
  left: 0,
};

// 1. create a regular http server from our app
const server = require("http").Server(app);

// 2. mount socket.io (websocket) server on top of that
const io = require("socket.io")(server);

// client portion goes here
const path = require("path");
app.use(express.static(path.join(__dirname, "public")));

io.on("connect", function (socket) {
  // socket reprsents connection w/ specific client
  // socket.id is unique identifier for connected client
  // everytime client connects log it out

  console.log(socket.id, "has just connected");
  socket.on("movement", function (data) {
    const { buttonType } = data;

    let newData;
    if (buttonType === 1) {
      button1.left++;
      newData = { left: button1.left, buttonType: 1 };
    } else if (buttonType === 2) {
      button2.left++;
      newData = { left: button2.left, buttonType: 2 };
    } else {
      console.error("bad button type.", data);
      return;
    }

    io.emit("movement", newData);
  });
});

server.listen(3000, () => console.log("listening on 3000"));
