"use client";

import {
  CHAIN,
  SendTransactionRequest,
  useTonAddress,
  useTonConnectUI,
} from "@tonconnect/ui-react";
import TonWeb from "tonweb";
import React from "react";

const transaction: SendTransactionRequest = {
  validUntil: Date.now() + 1 * 60 * 1000, // 5 minutes
  messages: [
    {
      address: "0QD-SuoCHsCL2pIZfE8IAKsjc0aDpDUQAoo-ALHl2mje04A-", // message destination in user-friendly format
      amount: "40000000", // Toncoin in nanotons
    },
  ],
  network: CHAIN.TESTNET,
};

const UserInfo = () => {
  const [status, setStatus] = React.useState("Idle");
  const [hash, setHash] = React.useState("");
  const userFriendlyAddress = useTonAddress();
  const [tonConnectUI] = useTonConnectUI();

  const onSendTon = async () => {
    try {
      // Set loading state
      setStatus("Sending...");
      const result = await tonConnectUI.sendTransaction(transaction);
      const bocCellBytes = await TonWeb.boc.Cell.oneFromBoc(
        TonWeb.utils.base64ToBytes(result.boc)
      ).hash();
      const hashBase64 = TonWeb.utils.bytesToBase64(bocCellBytes);
      setHash(hashBase64);

      // send hash to the server, wait server to confirm the transaction
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
        <span>{hash}</span>
      </div>
    )
  );
};

export default UserInfo;
