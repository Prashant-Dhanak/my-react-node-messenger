const {goOnline, newMessage, readMessage, logout} = require("./socketEvents")


const connection = function (io) {
  io.on("connection", (socket) => {

    socket.on("go-online", id => goOnline(socket, id));

    socket.on("new-message", (data) => newMessage(io, data));
    
    socket.on("read-message", (data) => readMessage(io, data));

    socket.on("logout", (id) => logout(socket, id));

  });
}

module.exports = connection