"use client";

import React from "react";
import { io } from "socket.io-client";

const Room = ({ id }: { id: string }) => {
  const socketURL = process.env.NEXT_PUBLIC_SOCKET_URL;

  const socket = io(socketURL, {
    extraHeaders: {
      username: "admin",
      tonwallet: "faketonwallet01",
      roomid: "1",
    },
  });

  socket.on("connect", () => {
    console.log("socket connected!");
    return;
  });

  socket.on("disconnect", () => {
    console.log("socket disconnected!");
    return;
  });
  return <div>Room:{id}</div>;
};

export default Room;
