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

  return (
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
  );
};

export default CreateRoomForm;
