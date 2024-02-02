// define a new websocket
const socket = new WebSocket("ws://localhost:4000");

// define a function to send a message (which might receive an event)
function sendMessage(event) {
  event.preventDefault();

  const input = document.querySelector("input");

  if (input.value) {
    // send the message with the websocket
    socket.send(input.value);
    // reset the input field
    input.value = "";
  }

  // put the focus back on the input
  input.focus();
}

const form = document.querySelector("form");
form.addEventListener("submit", sendMessage);

// listen to messages that we receive from the server

// we add a socket event listener, and we listen for a message
// we receive an event message
socket.addEventListener("message", (event) => {
  // the data is the message from the server
  const { data } = event;

  const li = document.createElement("li");
  // set the li's content to the data
  li.textContent = data;
  // append the new li with the message to the list
  const ul = document.querySelector("ul");
  ul.appendChild(li);
});
