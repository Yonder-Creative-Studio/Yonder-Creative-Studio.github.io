"use client";

import React, { useState, useRef } from "react";
import { HoveredLink, Menu, MenuItem } from "@/components/ui/navbar-menu";
import Hamburger from "./hamburger";

import { cn } from "@/lib/utils";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation"; // 1. 引入偵測目前網址的 Hook

// 引入 motion 與滾動偵測 Hooks
import { motion, useScroll, useMotionValueEvent } from "motion/react";

export function Navbar() {
  const [active, setActive] = useState<string | null>(null);
  const pathname = usePathname(); // 2. 取得當前的路徑

  // 建立偵測滾動狀態
  const [hidden, setHidden] = useState(false);
  const { scrollY } = useScroll();
  const lastScrollY = useRef(0);

  // 監聽滾動數值的變化
  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = lastScrollY.current;
    const diff = latest - previous;

    if (diff > 0 && latest > 40) {
      setHidden(true);
      setActive(null); 
    } else if (diff < -5 || latest < 20) {
      setHidden(false);
    }
    lastScrollY.current = latest;
  });

  // 3. 定義導覽列選單資料，方便跑迴圈並精確比對路徑
  const navItems = [
    { item: "首頁", href: "/" },
    { item: "關於我們", href: "/about" },
    { 
      item: "服務項目", 
      href: "/item",
      // children: (
      //   <div className="flex flex-col space-y-4 text-sm">
      //     <HoveredLink href="https://google.com">Web Development</HoveredLink>
      //     <HoveredLink href="https://google.com">Interface Design</HoveredLink>
      //     <HoveredLink href="https://google.com">Search Engine Optimization</HoveredLink>
      //     <HoveredLink href="https://google.com">Branding</HoveredLink>
      //   </div>
      // )
    },
    { 
      item: "作品集", 
      href: "/portfolio",
      // children: (
      //   <div className="flex flex-col space-y-4 text-sm">
      //     <HoveredLink href="https://google.com">Hobby</HoveredLink>
      //     <HoveredLink href="https://google.com">Individual</HoveredLink>
      //     <HoveredLink href="https://google.com">Team</HoveredLink>
      //     <HoveredLink href="https://google.com">Enterprise</HoveredLink>
      //   </div>
      // )
    },
    { item: "成員", href: "/member" },
    { item: "聯絡我們", href: "/contact" },
  ];

  return (
    <motion.div
      variants={{
        visible: { y: 0, opacity: 1 },
        hidden: { y: -100, opacity: 0 },
      }}
      animate={hidden ? "hidden" : "visible"}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className={cn("fixed top-0 inset-x-0 w-full mx-auto z-50 shadow-xs", hidden && "pointer-events-none")}
    >
      <Menu setActive={setActive}>
        <div className="w-full h-full flex items-center justify-center gap-16 mx-auto">

          {/* Logo */}
          <div className="h-full w-full flex items-center justify-start">
            <Link href="/">
              <Image
                src="logo/logo.svg"
                alt="Logo"
                width={35}
                height={35}
                className="object-contain"
              />
            </Link>
          </div>
          
          {/* navigation items */}
          <Hamburger />
          <div className="hidden w-full h-full md:flex items-center justify-end gap-12 mx-auto">
            {navItems.map((nav) => {
              // 4. 精確判斷目前這顆按鈕是否為當前頁面
              const isActivePage = pathname === nav.href;

              return (
                <div key={nav.href} className="relative py-1 flex flex-col items-center">
                  <MenuItem 
                    setActive={setActive} 
                    active={nav.children ? active : null} 
                    item={nav.item} 
                    href={nav.href}
                  >
                    {nav.children}
                  </MenuItem>

                  {/* 5. 如果是當前頁面，就渲染會移動的底線 */}
                  {isActivePage && (
                    <motion.div
                      layoutId="active-underline" // 關鍵：Framer motion 會自動做跨元素的流暢平移
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary rounded-full"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </div>
              );
            })}
          </div>

        </div>
      </Menu>
    </motion.div>
  );
}
