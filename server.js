const io = require("socket.io")(3001, { cors: { origin: "*" } });

const rooms = {}; // store messages per room
                                                      
io.on("connection", (socket) => {
  console.log("New user connected:", socket.id);

  socket.on("join-room", (room, isAdmin = false) => {
    socket.join(room);
    if (!rooms[room]) rooms[room] = [];
    socket.emit("room-history", rooms[room]);

    if (!isAdmin) {
      io.to("admins").emit("admin-update", { room, messages: rooms[room] });
    }
  });


  socket.on("message", ({ room, msg }) => {
    rooms[room].push(msg);
    socket.to(room).emit("message", msg);
    io.to("admins").emit("admin-update", { room, messages: rooms[room] });
  });

  socket.on("offer", ({ room, offer }) => socket.to(room).emit("offer", offer));
  socket.on("answer", ({ room, answer }) => socket.to(room).emit("answer", answer));
  socket.on("ice-candidate", ({ room, candidate }) => socket.to(room).emit("ice-candidate", candidate));

  socket.on("join-admin", () => {
    socket.join("admins");
    socket.emit("admin-init", rooms);
  });
});