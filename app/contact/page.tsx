"use client";

import Footer from "@/components/footer";
import Title from "@/components/title";

// import { useEffect, useRef, useState } from "react";
  
export default function Contact() {


  return (
      <div className="custom-scrollbar scrollbar-y-auto! scrollbar-x-none!">
          <div className="relative min-h-screen bg-slate-100 flex flex-col items-center justify-start p-4">
            <div className="absolute top-1/7 left-0 h-full w-full px-8">
                <Title title="聯絡我們" />

            </div>
          </div>
          
          <Footer />
      </div>
    );
}