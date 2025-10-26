import React, { useState, useEffect } from "react";
import { socket } from "./signaling";
import { TextField, Button, Box, Paper, Typography } from "@mui/material";

export default function Chatroom() {
  const [room, setRoom] = useState("");
  const [joined, setJoined] = useState(false);
  const [msg, setMsg] = useState("");
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    socket.on("message", (msg) => setMessages((prev) => [...prev, msg]));
    socket.on("room-history", (msgs) => setMessages(msgs));
  }, []);

  const joinRoom = () => {
    socket.emit("join-room", room);
    setJoined(true);
  };

  const sendMessage = () => {
    if (!msg) return;
    const message = { user: "User", text: msg };
    socket.emit("message", { room, msg: message });
    setMessages((prev) => [...prev, message]);
    setMsg("");
  };

  return (
    <Box sx={{ mt: 2 }}>
      {!joined ? (
        <Box>
          <TextField label="Room Code" value={room} onChange={(e) => setRoom(e.target.value)} />
          <Button variant="contained" sx={{ ml: 1 }} onClick={joinRoom}>Join Room</Button>
        </Box>
      ) : (
        <Box>
          <Box sx={{ mt: 2, mb: 2, maxHeight: 300, overflowY: "auto" }}>
            {messages.map((m, idx) => (
              <Paper key={idx} sx={{ p: 1, mb: 1 }}>
                <Typography><b>{m.user}</b>: {m.text}</Typography>
              </Paper>
            ))}
          </Box>
          <TextField label="Message" value={msg} onChange={(e) => setMsg(e.target.value)} />
          <Button variant="contained" sx={{ ml: 1 }} onClick={sendMessage}>Send</Button>
        </Box>
      )}
    </Box>
  );
}