"use client";

import React from "react";
import Image from "next/image";
import { useResumeContext } from "@/context/resume-info-provider";

const DynamicQR = () => {
  const { resumeInfo } = useResumeContext();
  
  if (!resumeInfo?.documentId) return null;

  const portfolioUrl = `${window.location.origin}/p/${resumeInfo.documentId}`;
  const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(portfolioUrl)}`;

  return (
    <div className="flex flex-col items-center gap-1 opacity-80 hover:opacity-100 transition-opacity">
      <div className="w-16 h-16 border bg-white p-1 rounded-sm shadow-sm">
        <Image
          src={qrUrl}
          alt="Resume QR Code"
          width={150}
          height={150}
          unoptimized
          className="w-full h-full"
        />
      </div>
      <span className="text-[6px] font-bold uppercase tracking-widest text-slate-500">Scan for Live Version</span>
    </div>
  );
};

export default DynamicQR;
