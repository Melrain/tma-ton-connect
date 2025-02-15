"use client";

import { useTonWallet } from "@tonconnect/ui-react";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import router from "next/router";

const formSchema = z.object({
  blindSize: z.coerce.number(),
  maxPlayers: z.coerce.number(),
});

const CreateRoomForm = () => {
  const router = useRouter();
  const isConnected = useTonWallet();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      blindSize: 1,
      maxPlayers: 6,
    },
  });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    console.log(data);
  };

  useEffect(() => {
    if (!isConnected) {
      router.push("/");
    }
  }, [isConnected, router]);

  return <div>CreateRoomForm</div>;
};

export default CreateRoomForm;
