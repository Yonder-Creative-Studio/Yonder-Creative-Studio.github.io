"use client";
// import { useEffect, useRef, useState } from "react";

import Footer from "@/components/footer";
import Title from "@/components/title";

export default function Item() {


  return (
    <div className="custom-scrollbar scrollbar-y-auto! scrollbar-x-none!">
        <div className="min-h-screen bg-slate-100 flex flex-col items-center justify-start p-4">
          <div className="pt-16 px-4 h-full w-full">
            <Title title="服務項目" />

           </div>
        </div>
         
         <Footer />
     </div>
   );
}