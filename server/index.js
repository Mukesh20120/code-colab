const express = require("express");
const { Server } = require("socket.io");
const http = require("http");
const cors = require("cors");

const app = express();
app.use(express.json());

const useSocketHashMap = {};
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.get("/", (req, res) => {
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
    (sockerId) => ({ sockerId, username: useSocketHashMap[sockerId] })
  );
};

io.on("connection", (socket) => {
  //   console.log("a new client connected", socket.id);
  socket.on("join", ({ roomId, username }) => {
    useSocketHashMap[socket.id] = username;
    socket.join(roomId);
    const clients = getAllConnectiedClients(roomId);
    console.log(clients);
    clients.forEach(({sockerId})=>{
        io.to(sockerId).emit('joined', {clients, username, socketId: socket.id});
    });
  });

  socket.on("disconnect", () => {
    const rooms = [...socket.rooms];
    rooms.forEach((roomId) => {
        socket.in(roomId).emit("disconnected", {
            socketId: socket.id,
            username: useSocketHashMap[socket.id],
        });
    });
    socket.leave();
    delete useSocketHashMap[socket.id];
    });
});

server.listen(5000, () => {
  console.log("running on port 5000 ...");
});
