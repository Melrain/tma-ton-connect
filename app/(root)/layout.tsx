import React from "react";

const layout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return <main className="flex h-screen">{children}</main>;
};

export default layout;
