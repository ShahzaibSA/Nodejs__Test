const path = require('path');
const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

app.get('/', (req, res) => {
  const publicDirectoryPath = path.join(__dirname, '../public/index.html');
  res.sendFile(publicDirectoryPath);
});

io.on('connection', (socket) => {
  console.log('a user connected');

  socket.on('chat message', (msg) => {
    // Broadcast the message to all connected clients
    console.log(msg);
    socket.broadcast.emit('message', msg);
  });

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});

//Login Api

server.listen(3000, () => {
  console.log('listening on *:3000');
});
