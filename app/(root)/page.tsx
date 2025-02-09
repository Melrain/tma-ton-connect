/* eslint-disable react-hooks/rules-of-hooks */
"use client";

import TonButton from "@/components/TonButton";
import UserInfo from "@/components/UserInfo";
import { useIsConnectionRestored } from "@tonconnect/ui-react";

import React from "react";

const page = () => {
  const connectionRestored = useIsConnectionRestored();

  if (!connectionRestored) {
    return <div>Please wait...</div>;
  }

  return (
    <div className="flex flex-col overflow-hidden">
      <div className="flex w-full justify-end p-2">
        <TonButton />
      </div>
      <div className="flex w-full justify-center items-center p-2 flex-wrap">
        <UserInfo />
      </div>
    </div>
  );
};

export default page;
