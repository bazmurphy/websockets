// we use "io" from "socketio" that we imported in the script tag in the html
const socket = io("ws://localhost:4000");

// define a function to send a message (which might receive an event)
function sendMessage(event) {
  event.preventDefault();

  const input = document.querySelector("input");

  if (input.value) {
    // we emit [1st argument] a type in this case "message", [2nd argument] the data itself
    socket.emit("message", input.value);
    // reset the input field
    input.value = "";
  }

  // put the focus back on the input
  input.focus();
}

const form = document.querySelector("form");
form.addEventListener("submit", sendMessage);

// listen to messages that we receive from the server

// we use the socket.on()
socket.on("message", (data) => {
  // ^ we no longer need to destructure data from the event

  const li = document.createElement("li");
  // set the li's content to the data
  li.textContent = data;
  // append the new li with the message to the list
  const ul = document.querySelector("ul");
  ul.appendChild(li);
});
