"use client";

import { useState } from "react";
// 1. 引入用來偵測當前網址路徑的 Hook
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "motion/react";
import { Menu, X } from "lucide-react";
import Link from "next/link";

// 2. 將選單資料整理成陣列，方便動態判定與渲染
const NAV_LINKS = [
  { name: "首頁", href: "/" },
  { name: "關於我們", href: "/about" },
  { name: "服務項目", href: "/item" },
  { name: "作品集", href: "/portfolio" },
  { name: "成員", href: "/member" },
  { name: "聯絡我們", href: "/contact" },
];

export default function Hamburger() {
  const [isOpen, setIsOpen] = useState(false);
  
  // 3. 取得當前的網址路徑
  const pathname = usePathname();

  return (
    <div className="md:hidden"> {/* 僅在手機版/窄螢幕顯示 */}
      
      {/* 1. 漢堡按鈕 */}
      <button 
        onClick={() => setIsOpen(true)}
        className="text-primary focus:outline-none flex items-center"
      >
        <Menu className="w-6 h-6" />
      </button>

      {/* 2. 側邊欄動畫 */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* 半透明背景遮罩 */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-primary z-50"
            />

            {/* 側邊導覽欄主體 */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", bounce: 0, duration: 0.35 }}
              className="fixed right-0 top-0 h-full w-64 bg-white shadow-sm z-50 p-6 flex flex-col gap-6"
            >
              {/* 關閉按鈕 */}
              <div className="flex justify-end">
                <button onClick={() => setIsOpen(false)} className="p-1">
                  <X className="w-6 h-6 text-primary" />
                </button>
              </div>

              {/* 選單連結群組 */}
              <nav className="flex flex-col gap-2 text-sm font-medium text-primary">
                {NAV_LINKS.map((link) => {
                  // 4. 判斷此選單的連結，是否就是使用者「目前所在的網頁」
                  const isActive = pathname === link.href;

                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setIsOpen(false)}
                      // 5. 根據 isActive 動態切換底色與文字樣式
                      className={`py-2 rounded-md text-center transition-all duration-200 ${
                        isActive
                          ? "shadow-sm" // 當前頁面的高亮樣式：滿版深灰色底、白色字
                          : "" // 一般狀態
                      }`}
                    >
                      {link.name}
                    </Link>
                  );
                })}
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}