import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "@/app/globals.css";

import { Navbar } from "@/components/navbar";

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
    icon: "logo/logo.svg",
  },
  openGraph: {
    title: "yonder creative studio",
    description: "遙創工作室，一個專注於網頁設計與開發的創意團隊，致力於為客戶打造獨特且高效的數位體驗。",
    url: "https://yonder-creative.vercel.app/",
    siteName: "yonder creative studio",
    images: [
      {
        url: "logo/YC_黑底白字.png",
        width: 1200,
        height: 630,
        alt: "yonder creative studio",
      }
    ]
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
      <body className="custom-scrollbar w-full h-full flex flex-col scrollbar-y-auto! scrollbar-x-none!">
        <Navbar />
        {children}
      </body>
    </html>
  );
}
