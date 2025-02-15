"use client";

import React from "react";
import { useTonWallet } from "@tonconnect/ui-react";

import { useRouter } from "next/navigation";
import Link from "next/link";
import { BiArrowBack } from "react-icons/bi";

const AllPokerRooms = () => {
  const router = useRouter();

  if (!useTonWallet()) {
    router.push("/");
  }

  return (
    <div className="flex w-full flex-col">
      <div className="absolute top-0 left-0 py-10 px-2">
        <Link href={"/"}>
          <BiArrowBack />
        </Link>
      </div>
    </div>
  );
};

export default AllPokerRooms;
