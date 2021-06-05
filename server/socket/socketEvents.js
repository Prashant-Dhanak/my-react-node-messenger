const onlineUsers = require("../onlineUsers");

const goOnline = (socket, id) => {
    console.log("login: " + id)
    if (!onlineUsers.includes(id)) {
      onlineUsers.push(id);
    }
    socket.broadcast.emit("add-online-user", id);
  }
  
  const newMessage = (socket, data) => {
    console.log("New message: " + data.message)
    socket.broadcast.emit("new-message", {
      message: data.message,
      sender: data.sender,
    });
  }
  
  const logout = (socket, id) => {
    console.log("Log Out: " + id)
    if (onlineUsers.includes(id)) {
      userIndex = onlineUsers.indexOf(id);
      onlineUsers.splice(userIndex, 1);
      socket.broadcast.emit("remove-offline-user", id);
    }
  }

module.exports = {goOnline, newMessage, logout}