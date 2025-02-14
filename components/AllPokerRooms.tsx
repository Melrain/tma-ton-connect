"use client";

import React from "react";
import { useTonWallet } from "@tonconnect/ui-react";

import { useRouter } from "next/navigation";

const AllPokerRooms = () => {
  const router = useRouter();

  if (!useTonWallet()) {
    router.push("/");
  }

  return <div>AllPokerRooms</div>;
};

export default AllPokerRooms;
