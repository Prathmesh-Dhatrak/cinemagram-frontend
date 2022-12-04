import { io } from "socket.io-client";

const socket = io(
  process.env.REACT_APP_CINEMAGRAM_URL ||
    "https://cinemagram-server.up.railway.app",
  {
    reconnection: true,
    reconnectionDelay: 1000,
    reconnectionDelayMax: 5000,
    reconnectionAttempts: 50,
  }
);

export default socket;
