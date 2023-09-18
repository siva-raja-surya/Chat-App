let socket = io();

socket.on('connect', function () {
    console.log('Conneted to server.');
});

socket.on('disconnect', function () {
    console.log('Disconneted from server.');
});

socket.on('newMessage', function (message){
    console.log("newMessage", message);
})