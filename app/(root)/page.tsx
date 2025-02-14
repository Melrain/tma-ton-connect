import TonConnectButtonComponent from "@/components/shared/TonConnectButtonComponent";

import UserInfo from "@/components/UserInfo";
import React from "react";

const page = () => {
  return (
    <div className="flex flex-col justify-center items-center min-h-screen">
      <TonConnectButtonComponent />
      <UserInfo />
    </div>
  );
};

export default page;
