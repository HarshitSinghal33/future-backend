import { Server } from 'socket.io';
let io;

function initSocket(server) {
  io = new Server(server, {
    cors: { origin: "*" },
  });

  io.on("connection", (socket) => {
    console.log("User connected", socket.id);

    socket.on("join_chat", (chatId) => {
      socket.join(chatId);
      console.log(`${socket.id} joined room ${chatId}`);
    });

    socket.on("disconnect", () => {
      console.log("User disconnected", socket.id);
    });
  });

  return io;
}

function getIo() {
  if (!io) {
    throw new Error("Socket.io not initialized!");
  }
  return io;
}

export { initSocket, getIo };
