// we use "io" from "socketio" that we imported in the script tag in the html
const socket = io("ws://localhost:4000");

const activity = document.querySelector(".activity");

const msgInput = document.querySelector("input");

const messageList = document.querySelector("ul");

// define a function to send a message (which might receive an event)
function sendMessage(event) {
  event.preventDefault();

  if (msgInput.value) {
    // we emit [1st argument] a type in this case "message", [2nd argument] the data itself
    socket.emit("message", msgInput.value);
    // reset the input field
    msgInput.value = "";
  }

  // put the focus back on the input
  msgInput.focus();
}

const form = document.querySelector("form");
form.addEventListener("submit", sendMessage);

// listen to messages that we receive from the server

// we use the socket.on()
socket.on("message", (data) => {
  // ^ we no longer need to destructure data from the event

  // this will clear the "userId is typing..."
  activity.textContent = "";

  const li = document.createElement("li");
  // set the li's content to the data
  li.textContent = data;

  if (data.includes("Chat")) {
    li.classList.add("chat");
  } else if (data.includes("Connected")) {
    li.classList.add("connected");
  } else if (data.includes("Disconnected")) {
    li.classList.add("disconnected");
  } else {
    li.classList.add("message");
  }

  // append the new li with the message to the list
  messageList.appendChild(li);
});

// add an event listener to the message input field, on keypress, emi an "activity" and send through the user ID
msgInput.addEventListener("keypress", () => {
  socket.emit("activity", socket.id.substring(0, 5));
});

// create a timer
let activityTimer;

// listen to the activity event
socket.on("activity", (userId) => {
  activity.textContent = `${userId} is typing...`;

  // clear the activity message after 2 seconds
  clearTimeout(activityTimer);
  activityTimer = setTimeout(() => {
    activity.textContent = "";
  }, 2000);
});
