"use client";

import { useTonWallet } from "@tonconnect/ui-react";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Button } from "../ui/button";
import Link from "next/link";
import { BiArrowBack } from "react-icons/bi";
import axios from "axios";
import { retrieveLaunchParams } from "@telegram-apps/sdk";

const formSchema = z.object({
  blindSize: z.coerce.number(),
  maxPlayers: z.coerce.number(),
});

const CreateRoomForm = () => {
  const router = useRouter();
  const wallet = useTonWallet();
  const { initDataRaw, initData } = retrieveLaunchParams();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      blindSize: 1,
      maxPlayers: 6,
    },
  });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    try {
      console.log(data);
      if (!initDataRaw) {
        return alert(`No auth data found: ${initDataRaw}`);
      }
      // send auth to server
      const authResponse = await axios.post(
        "http://localhost:8080/api/auth/validate", // URL
        {}, // Body 数据
        {
          headers: {
            // 传递 HTTP headers
            Authorization: `tma ${initDataRaw}`,
          },
        }
      );

      console.log(authResponse);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (!wallet) {
      router.push("/");
    }
  }, [wallet, router]);

  return (
    <div>
      <div className="absolute top-0 left-0 py-10 px-2">
        <Link href={"/"}>
          <BiArrowBack />
        </Link>
      </div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-6 px-10 flex justify-center items-center flex-col min-h-screen">
          {/* blindSize */}
          <FormField
            control={form.control}
            name="blindSize"
            render={({ field }) => (
              <FormItem className="w-1/2">
                <FormLabel>BlindSize</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value.toString()}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a verified email to display" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent className="text-white">
                    <SelectItem value="1">1</SelectItem>
                    <SelectItem value="5">5</SelectItem>
                    <SelectItem value="10">10</SelectItem>
                  </SelectContent>
                </Select>
                <FormDescription>
                  The size of the blinds in the room.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* seats */}
          <FormField
            control={form.control}
            name="maxPlayers"
            render={({ field }) => (
              <FormItem className="w-1/2">
                <FormLabel>maxPlayers</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value.toString()}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a verified email to display" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent className="text-white">
                    <SelectItem value="6">6</SelectItem>
                    <SelectItem value="9">9</SelectItem>
                  </SelectContent>
                </Select>
                <FormDescription>maxPlayers</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Create Room</Button>
        </form>
      </Form>
    </div>
  );
};

export default CreateRoomForm;
