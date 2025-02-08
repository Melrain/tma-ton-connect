import TonButton from "@/components/TonButton";
import UserInfo from "@/components/UserInfo";
import React from "react";

const page = () => {
  return (
    <div className="flex flex-col w-full">
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
