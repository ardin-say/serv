const socket = io();

// const form = document.getElementById('ss');
// const messageInput = document.getElementById('messageInp');
// const messageContainer = document.querySelector(".container");

const name = prompt("Enter Your Name To Join");

socket.emit('new-user-joined',name);