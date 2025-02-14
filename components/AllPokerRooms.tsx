"use client";

import React, { useEffect } from "react";
import { useTonWallet } from "@tonconnect/ui-react";
import { backButton } from "@telegram-apps/sdk-react";
import { useRouter } from "next/navigation";

const AllPokerRooms = () => {
  const router = useRouter();

  useEffect(() => {
    const initBackButton = async () => {
      if (!backButton.isMounted()) {
        backButton.mount();
        backButton.show();
      }
    };
    initBackButton();
  }, []);

  if (!useTonWallet()) {
    router.push("/");
  }

  return <div>AllPokerRooms</div>;
};

export default AllPokerRooms;
