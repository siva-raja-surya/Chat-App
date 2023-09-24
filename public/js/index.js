let socket = io();

socket.on("connect", function () {
  console.log("Conneted to server.");
});

socket.on("disconnect", function () {
  console.log("Disconneted from server.");
});

socket.on("newMessage", function (message) {
  console.log("newMessage", message);
  let li = document.createElement("li");
  li.innerText = `${message.from} : ${message.text}`;
  document.querySelector("body").appendChild(li);
});

socket.on("newLocationMessage", function (message) {
  console.log("newLocationMessage", message);
  let li = document.createElement("li");
  let a = document.createElement("a");
  a.setAttribute("target", "_blank");
  a.setAttribute("href", message.url);
  a.innerText = "My current Location";
  li.appendChild(a);
  document.querySelector("body").appendChild(li);
});

// socket.emit(
//   "createMessage",
//   {
//     from: "john",
//     text: "hey",
//   },
//   function (message) {
//     console.log(" got it.", message);
//   }
// );

document.querySelector("#submit-btn").addEventListener("click", function (e) {
  e.preventDefault();

  socket.emit(
    "createMessage",
    {
      from: "USer",
      text: document.querySelector('input[name="message"]').value,
    },
    function () {}
  );
});

document
  .querySelector("#send-location")
  .addEventListener("click", function (e) {
    if (!navigator.geolocation) {
      return alert("GeoLocation is not supported by your browser");
    }

    navigator.geolocation.getCurrentPosition(
      function (position) {
        console.log(position);
        socket.emit("createLocationMessage", {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
      },
      function () {
        alert("Unable to fetch location");
      }
    );
  });
