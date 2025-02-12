import Room from "@/components/Room";
import React from "react";

interface Props {
  params: {
    id: string;
  };
}

const page = async ({ params }: Props) => {
  const { id } = await params;
  return (
    <div>
      <Room id={id} />
    </div>
  );
};

export default page;
