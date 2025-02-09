"use client";

import React, { useCallback, useEffect, useState } from "react";
import { useTonConnectUI } from "@tonconnect/ui-react";
import { Address } from "@ton/ton";

const TonButtonDemo = () => {
  const [tonConnectUI] = useTonConnectUI();
  const [isLoading, setIsLoading] = useState(true);
  const [tonWalletAddress, setTonWalletAddress] = useState<string | null>(null);

  const handleWalletConnection = useCallback((address: string) => {
    setTonWalletAddress(address);
    console.log("Wallet connected:", address);
    setIsLoading(false);
  }, []);

  const handleWalletDisconnection = useCallback(() => {
    setTonWalletAddress(null);
    console.log("Wallet disconnected");
    setIsLoading(false);
  }, []);

  useEffect(() => {
    const checkWalletConnection = async () => {
      if (tonConnectUI.account?.address) {
        handleWalletConnection(tonConnectUI.account.address);
      } else {
        handleWalletDisconnection();
      }
    };
    checkWalletConnection();

    const unsubscribe = tonConnectUI.onStatusChange((wallet) => {
      if (wallet) {
        handleWalletConnection(wallet.account.address);
      } else {
        handleWalletDisconnection();
      }
    });

    return () => {
      unsubscribe();
    };
  }, [tonConnectUI, handleWalletConnection, handleWalletDisconnection]);

  const handleWalletAction = async () => {
    if (tonConnectUI.connected) {
      setIsLoading(true);
      await tonConnectUI.disconnect();
    } else {
      await tonConnectUI.openModal();
    }
  };

  const formatAddress = (address: string) => {
    const tempAddress = Address.parse(address).toString();
    return `${tempAddress.slice(0, 4)}...${tempAddress.slice(-4)}`;
  };

  if (isLoading) {
    return <div>Please wait...</div>;
  }

  return (
    <div>
      <h1>ton connect demo</h1>
      {tonWalletAddress ? (
        <div>
          <div>Wallet connected:</div>
          <div>{formatAddress(tonWalletAddress)}</div>
          <button onClick={handleWalletAction}>
            {tonConnectUI.connected ? "Disconnect" : "Connect"}
          </button>
        </div>
      ) : (
        <div>
          <button onClick={handleWalletAction}>
            {tonConnectUI.connected ? "Disconnect" : "Connect"}
          </button>
        </div>
      )}
    </div>
  );
};

export default TonButtonDemo;
