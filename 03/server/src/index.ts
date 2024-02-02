// bring in express
import express from "express";

// bring in the server from socket io
import { Server } from "socket.io";

// import path from the node standard library
import path from "path";

// define the port
const PORT = process.env.PORT || 4000;

// create our express app
const app = express();

// setup middleware for the static directory
app.use(express.static(path.join(__dirname, "..", "public")));

// define the listener
const expressServer = app.listen(PORT, () => {
  console.log(`Express Server listening on Port ${PORT}`);
});

// create a new socket io server, and pass it the express server and then options
const socketIOServer = new Server(expressServer, {
  // websockets are not the same as http, so we have to handle the CORS for that separately
  cors: {
    // in production we don't want anyone from outside the domain to access it
    // (!) gotcha: CORS reads localhost literally as 127.0.0.1 and causes issues
    origin:
      process.env.NODE_ENV === "production"
        ? false
        : ["http://localhost:3000", "http://127.0.0.1:3000"],
  },
});

// on connection to the socket io socket server
socketIOServer.on("connection", (socket) => {
  // every socket connection gets its own ID
  console.log(`User ${socket.id} connected`);

  // on receiving a message to this socket
  socket.on("message", (data) => {
    // we emit [1st argument] a type in this case "message", [2nd argument] the data itself
    socketIOServer.emit("message", `${socket.id.substring(0, 5)} : ${data}`);
  });
});
