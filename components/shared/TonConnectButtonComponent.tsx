"use client";

import { TonConnectButton, useTonWallet } from "@tonconnect/ui-react";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

const TonConnectButtonComponent = () => {
  const router = useRouter();
  const isConnected = useTonWallet();
  useEffect(() => {
    if (isConnected) {
      router.push("/all-poker-rooms");
    }
  }, [isConnected, router]);

  return (
    <div>
      <TonConnectButton />
    </div>
  );
};

export default TonConnectButtonComponent;
