// bring in the http server from the node standard library
import { createServer } from "http";
// bring in the server from socket io
import { Server } from "socket.io";

// create an http server using node standard library
const httpServer = createServer();

// create a new socket io server, and pass it the http server and then options
const socketIOServer = new Server(httpServer, {
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

httpServer.listen(4000, () => {
  console.log("HTTP Server listening on Port 4000");
});
