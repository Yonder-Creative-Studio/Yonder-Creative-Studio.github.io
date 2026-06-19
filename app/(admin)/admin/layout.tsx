import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "@/app/globals.css";

import { SidebarApplication } from "@/components/sidebarApplication";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "yonder creative studio",
  description: "遙創工作室，一個專注於網頁設計與開發的創意團隊，致力於為客戶打造獨特且高效的數位體驗。",
  icons: {
    icon: "../logo/logo.svg",
  },
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en" suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} antialiased`}
    >
      <body className="w-full h-screen overflow-hidden flex bg-[#f8f9fa]"> 
        
        <div className="shrink-0 h-full">
          <SidebarApplication />
        </div>

        <main className="flex-1 h-full overflow-y-auto custom-scrollbar">
          {children}
        </main>

      </body>
    </html>
  );
}