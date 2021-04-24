let currentMessageId = 1


function createMessage(user, textMessage) {
  return {
    _id: currentMessageId++,
    text: textMessage,
    createdAt: new Date(),
    user: {
      _id: user.userId,
      name: user.username,
      avatar: user.avatar,
    },
  }
}

function handleMessage(socket, users) {
  socket.on("message", textMessage => {
    const user = users[socket.id];
    const message = createMessage(user, textMessage);
    console.log(message)
    socket.broadcast.emit("message", message)
  })
}

module.exports = { handleMessage };