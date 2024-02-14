import express from "express";
import authRoutes from './Routers/authRoutes.js'
import { connectdb } from "./config/database.js";
import cookieParser from "cookie-parser";
import { config } from "dotenv";
import bodyParser from "body-parser";
import { Server as SocketIOServer } from "socket.io";
import cors from "cors"

const app = express();
config({
    path : './config/.env'
})

app.use(cookieParser());

app.use(
  cors({
    origin: function (origin, callback) {
      // Temporary: Allow all origins
      callback(null, true);
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);


connectdb();
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: false,
  }),
);

app.use("/api/v1" , authRoutes);

const server = app.listen(4000 , (PORT) => {
    console.log(`Server listening at ${PORT}`);
})

const io = new SocketIOServer(server, {
  cors: {
    origin: 'http://localhost:3000',
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
  },
});

io.on('connection' , (socket) => {
  console.log("A User Connected");
  socket.on('join-room' , (roomId) => {
    socket.join(roomId);
    socket.to(roomId).emit('user-connected');
  })

  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
})