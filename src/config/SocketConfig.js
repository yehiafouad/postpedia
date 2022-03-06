import openSocket from "socket.io-client";

const socket = openSocket(
  process.env.NODE_ENV !== "production"
    ? process.env.REACT_APP_DEV_URL
    : process.env.REACT_APP_SERVER_URL
);

export default socket;
