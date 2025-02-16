import React, { Suspense } from "react";
import Loading from "./loading";

const layout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <Suspense fallback={<Loading />}>
      <main>{children}</main>;
    </Suspense>
  );
};

export default layout;
