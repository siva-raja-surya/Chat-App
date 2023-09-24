import { join } from "path";
import { createServer } from "http";
// import express, { static } from "express";
import express from "express";
import socketIO from "socket.io";

import { generateMessage, generateLocationMessage } from "./utils/message";
const publicPath = join(__dirname, "/../public");
const port = process.env.PORT || 3000;
let app = express();
let server = createServer(app);
let io = socketIO(server);

app.use(express.static(publicPath));

io.on("connection", (socket) => {
  console.log("A new user just connected");

  socket.emit(
    "newMessage",
    generateMessage("Admin", "Welcome to the chat app!")
  );

  socket.broadcast.emit(
    "newMessage",
    generateMessage("Admin", "new user joined")
  );

  socket.on("createMessage", (message, callback) => {
    console.log("createdMessage", message);
    io.emit("newMessage", generateMessage(message.from, message.text));
    callback("This is the server:");
  });

  socket.on('createLocationMessage', (coords) => {
    io.emit('newLocationMessage',
    generateLocationMessage('Admin' ,coords.lat, coords.lng))
  })
  socket.on("disconnect", () => {
    console.log("User was disconnected");
  });
});

server.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});

// console.log(__dirname + "/../public");
// console.log(path.join(__dirname, '/../public'));
