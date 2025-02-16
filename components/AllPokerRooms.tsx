/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import React, { useEffect, useState } from "react";
import { useTonWallet } from "@tonconnect/ui-react";

import { useRouter } from "next/navigation";
import Link from "next/link";
import { BiArrowBack } from "react-icons/bi";
import { io } from "socket.io-client";

const AllPokerRooms = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [transport, setTransport] = useState("N/A");
  const router = useRouter();

  if (!useTonWallet()) {
    router.push("/");
  }

  useEffect(() => {
    const socketURL = process.env.NEXT_PUBLIC_SOCKET_URL;

    const socket = io(socketURL, {
      extraHeaders: {
        username: "admin",
        tonwallet: "address",
        roomid: "1",
      },
    });

    if (socket.connected) {
      onConnect();
    }

    function onConnect() {
      setIsConnected(true);
      setTransport(socket.io.engine.transport.name);

      socket.io.engine.on("upgrade", (transport) => {
        setTransport(transport.name);
      });
    }

    function onDisconnect() {
      setIsConnected(false);
      setTransport("N/A");
    }

    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);

    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
    };
  }, []);

  return (
    <div className="flex w-full flex-col">
      <div className="absolute top-0 left-0 py-10 px-2">
        <Link href={"/"}>
          <BiArrowBack />
        </Link>
      </div>
      {/* socket info */}
      <div>
        <h1>Socket Info</h1>
        <div>Connected: {isConnected ? "Yes" : "No"}</div>
        <div>Transport: {transport}</div>
      </div>
    </div>
  );
};

export default AllPokerRooms;
