"use client";

import {
  CHAIN,
  SendTransactionRequest,
  useTonAddress,
  useTonConnectUI,
} from "@tonconnect/ui-react";
import { Cell, Address, beginCell, storeMessage, TonClient } from "@ton/ton";

import React from "react";
import { retry } from "@/utils";

const transaction: SendTransactionRequest = {
  validUntil: Date.now() + 1 * 60 * 1000, // 5 minutes
  messages: [
    {
      address: "0QD-SuoCHsCL2pIZfE8IAKsjc0aDpDUQAoo-ALHl2mje04A-", // message destination in user-friendly format
      amount: "20000000", // Toncoin in nanotons
    },
  ],
  network: CHAIN.TESTNET,
};

const UserInfo = () => {
  const [status, setStatus] = React.useState("Idle");
  const userFriendlyAddress = useTonAddress();
  const [tonConnectUI, setOptions] = useTonConnectUI();

  const onSendTon = async () => {
    try {
      // Set loading state
      tonConnectUI.setConnectRequestParameters({ state: "loading" });
      const result = await tonConnectUI.sendTransaction(transaction);
      const exBoc = result.boc;
      const client = new TonClient({
        endpoint: "https://toncenter.com/api/v2/jsonRPC",
        apiKey:
          "fb067e269eb882e96e68e37d26c7c520d2bb362334e290478c0cc91b76f120e1",
      });

      const myAddress = Address.parse(userFriendlyAddress);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    userFriendlyAddress && (
      <div className="flex flex-col flex-wrap items-center justify-center">
        <span className="break-words text-xs">{userFriendlyAddress}</span>
        <button onClick={onSendTon}>Send Ton</button>
        <span>{status}</span>
      </div>
    )
  );
};

export default UserInfo;
