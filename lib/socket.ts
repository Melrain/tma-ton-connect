"use client";
import { io } from "socket.io-client";

const socketURL = process.env.NEXT_PUBLIC_SOCKET_URL;
export const socket = io(socketURL, {
  extraHeaders: {
    username: "admin",
    tonwallet: "faketonwallet01",
    roomid: "1",
  },
});
