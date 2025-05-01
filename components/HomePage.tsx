"use client";

import { TonConnectButton, useTonWallet } from "@tonconnect/ui-react";

import React, { useEffect, useState } from "react";

import Link from "next/link";
import axios from "axios";

const HomePage = () => {
  const [isConnected, setIsConnected] = useState(false);
  const wallet = useTonWallet();

  // use this to prevent hydration mismatch
  // because when wallet state changes, without useEffect, the component will not re-render

  const apitest = async () => {
    await axios.get("http://localhost:8080/api/test");
  };

  useEffect(() => {
    const checkConnection = async () => {
      if (wallet) {
        setIsConnected(true);
      } else {
        setIsConnected(false);
      }
    };
    checkConnection();
  }, [wallet]);

  return (
    <div className="flex flex-col w-full items-center justify-center">
      <button
        onClick={() => {
          apitest();
        }}>
        api test
      </button>
      <TonConnectButton className="absolute top-0 right-0 py-10 px-2" />
      <>
        {isConnected && (
          <div className="flex flex-col space-y-4">
            <Link
              className="bg-indigo-400 p-4 rounded-lg shadow-sm shadow-white"
              href={"/all-poker-rooms"}>
              Poker Rooms
            </Link>
            <Link
              className="bg-indigo-400 p-4 rounded-lg shadow-sm shadow-white"
              href={"/create-poker-room"}>
              Create Poker Room
            </Link>
          </div>
        )}
        {!isConnected && (
          <div>
            not connected
            <TonConnectButton />
          </div>
        )}
      </>
    </div>
  );
};

export default HomePage;
