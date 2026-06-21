'use client'; // 必須在第一行，因為我們要使用 hooks 處理驗證

import { Geist, Geist_Mono } from "next/font/google";
import "@/app/globals.css";
import { SidebarApplication } from "@/components/sidebarApplication";
import { VerifyAdminKey } from "./action"; // 確保這裡與下方呼叫的大小寫完全一致

import { useEffect, useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

function AdminValidationGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isVerified, setIsVerified] = useState(false);

  useEffect(() => {
    // 動態設定後台網頁標題與圖標
    document.title = "admin - yonder creative studio";
    const link: HTMLLinkElement = document.querySelector("link[rel~='icon']") || document.createElement('link');
    link.type = 'image/png';
    link.rel = 'icon';
    link.href = 'https://pwrlohlzeuaikmxfohjf.supabase.co/storage/v1/object/public/YCwebsite/logo/favicon.png';
    document.getElementsByTagName('head')[0].appendChild(link);

    // 將驗證邏輯完整包裝與正確閉合
    async function verify() {
      const secretKey = searchParams.get('key');
      
      // 1. 如果網址帶有密鑰，優先走 Server Action 後端驗證
      if (secretKey) {
        const isValid = await VerifyAdminKey(secretKey);
        
        if (isValid) {
          sessionStorage.setItem('isAdminUnlocked', 'true');
          setIsVerified(true);
          router.replace('/admin');
          return; // 驗證成功，中斷往下執行
        }
      }

      // 2. 網址沒帶密鑰，或密鑰無效，檢查瀏覽器之前有沒有成功解鎖過
      const isUnlocked = sessionStorage.getItem('isAdminUnlocked');
      if (isUnlocked === 'true') {
        setIsVerified(true);
      } else {
        // 沒通過驗證，直接踢回前台首頁 (/)
        router.replace('/');
      }
    }

    verify(); // 🎯 最關鍵：一定要呼叫它，這個異步驗證機制才會真正啟動！

  }, [searchParams, router]);

  // 驗證通過前先回傳 null，避免後台畫面閃現
  if (!isVerified) {
    return null;
  }

  return <>{children}</>;
}

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
        
        {/* 使用 Suspense 包裹驗證機制，防止 Next.js 靜態編譯時報錯 */}
        <Suspense fallback={null}>
          <AdminValidationGuard>
            <div className="shrink-0 h-full">
              <SidebarApplication />
            </div>

            <main className="flex-1 h-full overflow-y-auto custom-scrollbar">
              {children}
            </main>
          </AdminValidationGuard>
        </Suspense>

      </body>
    </html>
  );
}