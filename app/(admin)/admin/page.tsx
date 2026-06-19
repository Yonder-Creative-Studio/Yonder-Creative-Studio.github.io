"use client";
import ThreeD from "@/components/3d";

// import { EncryptedText } from "@/components/ui/encrypted-text";

import dynamic from "next/dynamic";

const EncryptedText = dynamic(
  () => import("@/components/ui/encrypted-text").then((mod) => mod.EncryptedText),
  { ssr: false }
);

export default function Home() {


  return (
    <div className="relative w-full h-screen bg-slate-100 flex flex-col items-center justify-center p-4">
      <ThreeD />
      
      <div className="absolute bottom-1/20 left-0 h-full w-full px-8 flex flex-col items-start justify-end">
        <p className="text-xl md:text-2xl font-bold text-white mb-4">
          <EncryptedText
            text="Yonder Creative Studio 遙創工作室"
            encryptedClassName="text-white"
            revealedClassName="text-white"
            revealDelayMs={30}
          />
        </p>
        <p className="text-xs md:text-sm text-white">
          <EncryptedText
            text="一個致力於結合藝術、科技與未來想像的跨領域團隊，
「Yonder」象徵著對遙遠、未知與更高視野的渴望，「Creative」則體現我們以創意驅動每一次探索與實踐。"
            encryptedClassName="text-white"
            revealedClassName="text-white"
            revealDelayMs={50}
          />
        </p>
      </div>
     
    </div>
  );
}