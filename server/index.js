const express = require("express");
const { Server } = require("socket.io");
const http = require("http");
const cors = require("cors");
const path = require('path');
require('dotenv').config();

const port = process.env.PORT || 443;

const app = express();
app.use(express.json());

const useSocketHashMap = {};
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.get("/check-server", (req, res) => {
  res.send("Hello from server");
});
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
    credentials: true,
  },
});

const getAllConnectiedClients = (roomId) => {
  return Array.from(io.sockets.adapter.rooms.get(roomId) || []).map(
    (socketId) =>({socketId, username: useSocketHashMap[socketId]})
  );
};

io.on("connection", (socket) => {
  socket.on("join", ({ roomId, username }) => {
    useSocketHashMap[socket.id] = username;
    socket.join(roomId);
    const clients = getAllConnectiedClients(roomId);
    clients.forEach(({socketId})=>{
        io.to(socketId).emit('joined', {clients, username, socketId: socket.id});
    });
  });

  socket.on(('code-change'),({roomId,code})=>{
     socket.in(roomId).emit('code-change', {code});
  });

  socket.on(('sync-code'),({code,socketId})=>{
    io.to(socketId).emit('code-change',{code});
  })

  socket.on("disconnecting", () => {
 
    const rooms = [...socket.rooms];
    rooms.forEach((roomId) => {
        socket.in(roomId).emit("leave-room", {
            socketId: socket.id,
            username: useSocketHashMap[socket.id],
        });
    });
    socket.leave();
    delete useSocketHashMap[socket.id];
    });
});

app.use(express.static(path.join(__dirname, '../client/dist')));
app.get('/{*any}', (req, res) => {
  res.sendFile(path.join(__dirname, '../client','dist','index.html'));
})
server.listen(port, () => {
  console.log(`running on port ${port}...`);
});
