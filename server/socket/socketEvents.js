const {onlineUsers, onlineUsersSocketID} = require("../onlineUsers");

const goOnline = (socket, id) => {
    if (!onlineUsers.includes(id)) {
      onlineUsers.push(id);
      onlineUsersSocketID.push(socket.id)
    }
    socket.broadcast.emit("add-online-user", id);
  }
  
  const newMessage = (io, data) => {
    const recipientId = data.recipientId
    if (onlineUsers.includes(recipientId)){
      const socketID = onlineUsersSocketID[onlineUsers.indexOf(recipientId)]
      io.to(socketID).emit("new-message", {
        message: data.message,
        sender: data.sender,
      })
    }
  }
  
  const logout = (socket, id) => {
    if (onlineUsers.includes(id)) {
      userIndex = onlineUsers.indexOf(id);
      onlineUsers.splice(userIndex, 1);
      onlineUsersSocketID.splice(userIndex, 1);
      socket.broadcast.emit("remove-offline-user", id);
    }
  }

module.exports = {goOnline, newMessage, logout}