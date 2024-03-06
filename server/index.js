import express from "express";
import authRoutes from './Routers/authRoutes.js'
import { connectdb } from "./config/database.js";
import cookieParser from "cookie-parser";
import { config } from "dotenv";
import bodyParser from "body-parser";
import { Server as SocketIOServer } from "socket.io";
import cors from "cors"
import { isAuthenticated } from "./middleware/isAuthenticated.js";
import { createRoom, joinRoom, notifyConnectionInit, signalHandler } from "./controllers/meetingController.js";
const map = new Map();

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

//app.use(isAuthenticated);
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

io.on('connection' , (socket , user) => {
  console.log("A User Connected");
  socket.join(socket.id)
  
  socket.on('add-detail' , (user) => {
    socket.user = user;
  })

  socket.on('create-room' , (meetingCode) => {
    createRoom(meetingCode , socket.user._id , socket.id , map);
  })

  socket.on('join-room' , (meetingCode) => {
    //console.log('times');
    joinRoom(meetingCode , socket.user._id , socket.id , socket);
  })

  socket.on('conn-init' , (data) => {
    notifyConnectionInit(socket , data);
  })

  socket.on('conn-signal' , (data) => {
    signalHandler(socket , data);
  })

  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
})