import React, { useEffect, useState } from "react";
import { socket } from "./signaling";
import { Box, Paper, Typography } from "@mui/material";

export default function Admin() {
  const [rooms, setRooms] = useState({});

  useEffect(() => {
    socket.emit("join-admin");
    socket.on("admin-init", (allRooms) => setRooms(allRooms));
    socket.on("admin-update", ({ room, messages }) =>
      setRooms((prev) => ({ ...prev, [room]: messages }))
    );
  }, []);

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h4" sx={{ mb: 2 }}>Admin Console</Typography>
      {Object.keys(rooms).map((room) => (
        <Paper key={room} sx={{ mb: 2, p: 2 }}>
          <Typography variant="h6">Room: {room}</Typography>
          {rooms[room].map((msg, idx) => (
            <Box key={idx} sx={{ mt: 1 }}>
              <Typography><b>{msg.user}</b>: {msg.text}</Typography>
            </Box>
          ))}
        </Paper>
      ))}
    </Box>
  );
}