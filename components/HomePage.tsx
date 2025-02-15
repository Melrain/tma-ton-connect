"use client";

import { TonConnectButton, useTonWallet } from "@tonconnect/ui-react";

import React, { useEffect, useState } from "react";

import { useRouter } from "next/navigation";
import Link from "next/link";

const HomePage = () => {
  const [isConnected, setIsConnected] = useState(false);
  const wallet = useTonWallet();
  useEffect(() => {
    const checkConnection = async () => {
      // eslint-disable-next-line react-hooks/rules-of-hooks

      if (wallet) {
        setIsConnected(true);
      } else {
        setIsConnected(false);
      }
    };
    checkConnection();
  }, [wallet]);

  const router = useRouter();

  return (
    <div className="flex flex-col w-full items-center justify-center">
      <TonConnectButton className="absolute top-0 right-0 py-10 px-2" />
      <div>
        {isConnected && <Link href={"/all-poker-rooms"}>all poker rooms</Link>}
        {!isConnected && <div>not connected</div>}
      </div>
    </div>
  );
};

export default HomePage;
