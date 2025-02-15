"use client";

import { TonConnectButton, useTonWallet } from "@tonconnect/ui-react";
import Link from "next/link";
import React from "react";

const HomePage = () => {
  const isConnected = useTonWallet();

  return (
    <div className="flex flex-col w-full items-center justify-center">
      <div className="absolute top-0 right-0 py-10 px-2">
        <TonConnectButton />
      </div>

      <div>
        {isConnected ? (
          <div className=" bg-indigo-600 p-4 rounded-lg font-bold shadow-md shadow-white cursor-pointer">
            <Link href={"/all-poker-rooms"}>All Poker Rooms</Link>
          </div>
        ) : (
          <div>not connected</div>
        )}
      </div>
    </div>
  );
};

export default HomePage;
