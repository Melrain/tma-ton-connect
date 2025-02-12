import React from "react";

const layout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return <main className="mt-24">{children}</main>;
};

export default layout;
