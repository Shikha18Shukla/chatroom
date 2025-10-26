import React, { useState, useEffect } from "react";
import Chatroom from "./Chatroom";
import Admin from "./Admin";
import { createTheme, ThemeProvider, CssBaseline } from "@mui/material";

export default function App() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [theme, setTheme] = useState(createTheme());

  useEffect(() => {
    const isApple = /Mac|iPhone|iPad|iPod/i.test(navigator.platform);
    if (isApple) {
      setTheme(createTheme({ palette: { mode: "light" }, shape: { borderRadius: 12 } }));
    } else {
      setTheme(createTheme({ palette: { mode: "light", primary: { main: "#6200EE" } }, shape: { borderRadius: 4 } }));
    }
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {isAdmin ? (
        <Admin />
      ) : (
        <div style={{ padding: 16 }}>
          <button onClick={() => setIsAdmin(true)}>Admin Login</button>
          <Chatroom />
        </div>
      )}
    </ThemeProvider>
  );
}