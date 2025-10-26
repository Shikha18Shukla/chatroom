# React Chatroom Upgrade with Auto-Detect Theming

This project is a full chatroom app with Material 3 and Apple-like theming, auto-detected based on device.

## Features

- Responsive design (mobile, tablet, desktop)
- Random room creation/join
- Text chat
- Image sharing (max 5MB placeholder)
- Voice calling via WebRTC (basic signaling)
- Admin console with real-time monitoring
- Auto-detect theme: Apple theme for iOS/macOS, Material 3 otherwise

## Installation

### Backend
```
cd chatroom-app-upgrade
npm install
node server.js
```

### Frontend
```
cd client
npm install
npm start
```

## File Structure

- `server.js`: backend server with Socket.io
- `client/src`: React frontend components
  - `App.jsx`: main app with theme detection and admin toggle
  - `Chatroom.jsx`: user chatroom component
  - `Admin.jsx`: admin console component
  - `signaling.js`: socket.io client instance
- `client/public/index.html`: HTML template
- `README.md`: this file