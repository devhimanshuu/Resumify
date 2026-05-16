import React from "react"; // Rebuild trigger
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import Header from "./_components/common/Header";
import MobileCustomizer from "./_components/common/MobileCustomizer";
import { ResumeInfoProvider } from "@/context/resume-info-provider";

const MainLayout = async ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const { userId } = auth();

  if (!userId) {
    redirect("/");
  }
  return (
    <ResumeInfoProvider>
      <div className="relative w-full h-auto min-h-screen overflow-x-hidden bg-background">
        <div className="pointer-events-none fixed inset-0 -z-10 bg-[linear-gradient(to_right,hsl(var(--border)/0.32)_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--border)/0.28)_1px,transparent_1px)] bg-[size:44px_44px] opacity-30" />
        <div className="pointer-events-none fixed inset-x-0 top-0 -z-10 h-80 bg-gradient-to-b from-indigo-500/[0.06] via-background to-background" />
        <Header />
        <main>{children}</main>
        <MobileCustomizer />
      </div>
    </ResumeInfoProvider>
  );
};

export default MainLayout;
