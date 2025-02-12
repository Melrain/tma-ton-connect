"use client";

import { io } from "socket.io-client";
import React from "react";
import {
  TonConnectButton,
  useIsConnectionRestored,
  useTonWallet,
} from "@tonconnect/ui-react";

const AllPokerRooms = () => {
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

  const connectionRestored = useIsConnectionRestored();
  const tonWallet = useTonWallet();

  if (!connectionRestored) {
    return <div>Please wait...</div>;
  }

  if (!tonWallet) {
    return (
      <div>
        <TonConnectButton />
      </div>
    );
  }

  return <div className="flex justify-center items-center">All Rooms</div>;
};

export default AllPokerRooms;
