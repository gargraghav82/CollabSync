// socketService.js
import io from 'socket.io-client';

const socket = io('http://localhost:4000');

const socketService = {
  connect: () => {
    socket.connect();
  },

  disconnect: () => {
    socket.disconnect();
  },

  on: (eventName, callback) => {
    socket.on(eventName, callback);
  },

  off: (eventName, callback) => {
    socket.off(eventName, callback);
  },

  emit: (eventName, ...data) => {
    socket.emit(eventName, ...data);
  },
};

export default socketService;
