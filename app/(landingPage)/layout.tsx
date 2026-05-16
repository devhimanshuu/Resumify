import React from "react";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { Header } from "@/components/ui/header-2";

const LandingLayout = async ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const { userId } = auth();

  if (userId) {
    redirect("/dashboard");
  }
  return (
    <div>
      <Header />
      {children}
    </div>
  );
};

export default LandingLayout;
