import ws from "ws";

// instantiate a new websocket server, with the port option passed in
const server = new ws.Server({ port: 4000 });
console.log("websocket server running on port 4000");

// on connection to the web socket server
server.on("connection", (socket) => {
  // on receiving a message to this socket
  socket.on("message", (message: Buffer) => {
    // the message we receieve is in the form of a <Buffer xx xx xx xx>
    // so we should convert the buffer to a string to read it
    const buffer = Buffer.from(message);
    const receivedMessage = buffer.toString();

    // send back the same message to the client
    socket.send(receivedMessage);
  });
});
