"use client";
import {
  TonConnectButton,
  useIsConnectionRestored,
} from "@tonconnect/ui-react";
import React from "react";

const TonButton = () => {
  const connectionRestored = useIsConnectionRestored();

  if (!connectionRestored) {
    return <div>Please wait...</div>;
  }
  return (
    <div>
      <TonConnectButton />
    </div>
  );
};

export default TonButton;
