"use client";

import React, { useState, useRef } from "react";
import { HoveredLink, Menu, MenuItem } from "@/components/ui/navbar-menu";
import { cn } from "@/lib/utils";
import Link from "next/link";
import Image from "next/image";

// 1. 引入 motion 與滾動偵測 Hooks
import { motion, useScroll, useMotionValueEvent } from "motion/react";


export function Navbar() {
  const [active, setActive] = useState<string | null>(null);

  // 2. 建立偵測滾動狀態
  const [hidden, setHidden] = useState(false);
  const { scrollY } = useScroll();
  const lastScrollY = useRef(0);

  // 3. 監聽滾動數值的變化
  useMotionValueEvent(scrollY, "change", (latest) => {

    // 情境 A：向下滾動，且滾動高度超過 40px 時隱藏
    if (latest > 40) {
      setHidden(true);
      setActive(null); // 隱藏 Navbar 時，順便把已經打開的下拉選單關閉，避免懸空
    } 
    // 情境 B：向上滾動，且滾動高度低於 20px 時（避免太敏感），重新顯示
    else if (latest < 20) {
      setHidden(false);
    }

    lastScrollY.current = latest;
  });

  return (
    // 4. 將最外層容器改為 motion.div，並套用顯隱動畫
    <motion.div
      variants={{
        visible: { y: 0, opacity: 1 },
        hidden: { y: -100, opacity: 0 }, // 往上收回 100px 且漸隱
      }}
      animate={hidden ? "hidden" : "visible"}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className={cn("fixed top-0 inset-x-0 w-full mx-auto z-50 shadow-xs", hidden && "pointer-events-none")} // 隱藏時禁止互動，避免點擊到隱藏的 Navbar
    >
      <Menu setActive={setActive}>
        <div className="w-full h-full flex items-center justify-center gap-16 mx-auto">

          {/* Logo */}
          <div className="h-full flex items-center justify-start">
            <Link href="/">
              <Image
                src="/logo.svg"
                alt="Logo"
                width={35}
                height={35}
                className="object-contain"
              />
            </Link>
          </div>
          
          {/* navigation items */}
          <div className="w-full h-full flex items-center justify-end gap-12 mx-auto">
            <MenuItem setActive={setActive} active={null} item="關於我們" href="/about">
            </MenuItem>
            
            <MenuItem setActive={setActive} active={active} item="服務項目" href="/item">
              <div className="flex flex-col space-y-4 text-sm">
                <HoveredLink href="https://google.com">Web Development</HoveredLink>
                <HoveredLink href="https://google.com">Interface Design</HoveredLink>
                <HoveredLink href="https://google.com">Search Engine Optimization</HoveredLink>
                <HoveredLink href="https://google.com">Branding</HoveredLink>
              </div>
            </MenuItem>


            <MenuItem setActive={setActive} active={active} item="文章" href="/article">
              <div className="flex flex-col space-y-4 text-sm">
                <HoveredLink href="https://google.com">Hobby</HoveredLink>
                <HoveredLink href="https://google.com">Individual</HoveredLink>
                <HoveredLink href="https://google.com">Team</HoveredLink>
                <HoveredLink href="https://google.com">Enterprise</HoveredLink>
              </div>
            </MenuItem>

            <MenuItem setActive={setActive} active={null} item="聯絡我們" href="/contact">
            </MenuItem>
          </div>

        </div>


      </Menu>
    </motion.div>
  );
}