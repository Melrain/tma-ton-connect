"use client";

import { useTonAddress } from "@tonconnect/ui-react";
import React from "react";

const UserInfo = () => {
  const userFriendlyAddress = useTonAddress();
  const rawAddress = useTonAddress(false);
  return (
    userFriendlyAddress && (
      <div>
        <span>User-friendly address: {userFriendlyAddress}</span>
        <span>Raw address: {rawAddress}</span>
      </div>
    )
  );
};

export default UserInfo;
