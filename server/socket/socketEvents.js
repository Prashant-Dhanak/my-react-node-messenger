const onlineUsers = require("../onlineUsers");

const goOnline = (socket, id) => {
  onlineUsers[id] ? null : onlineUsers[id] = socket.id
  socket.broadcast.emit("add-online-user", id);
}

const newMessage = (io, data) => {
  const { recipientId } = data
  onlineUsers[recipientId] ?
    io.to(onlineUsers[recipientId]).emit("new-message", {
      message: data.message,
      sender: data.sender,
    }) : null

}

const logout = (socket, id) => {
  onlineUsers[id] ? (
    delete onlineUsers[id],
    socket.broadcast.emit("remove-offline-user", id))
    : null
}

module.exports = { goOnline, newMessage, logout }