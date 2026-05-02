import React from "react";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import NavBar from "@/components/nav-bar";

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
      <NavBar />
      {children}
    </div>
  );
};

export default LandingLayout;
