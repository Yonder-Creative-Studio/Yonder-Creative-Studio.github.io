"use client";

import React, { useState } from "react";
import { Sidebar, SidebarBody, SidebarLink } from "@/components/ui/sidebar";
import { useRouter } from "next/navigation";
import {
  IconArrowLeft,
  IconBrandTabler,
  IconSettings,
  IconUsers,
  IconBriefcase,
  IconInfoCircle,
  IconPhoto, 
  IconUsersGroup,
} from "@tabler/icons-react";

export function SidebarApplication() {
  const router = useRouter();
  const [open, setOpen] = useState(false);

  const links = [
    {
      label: "Dashboard",
      href: "/admin",
      icon: <IconBrandTabler className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />,
    },
    {
      label: "About",
      href: "/admin/about",
      icon: <IconInfoCircle className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />,
    },
    {
      label: "Item",
      href: "/admin/item",
      icon: <IconBriefcase className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />,
    },
    {
      label: "Portfolio",
      href: "/admin/portfolio",
      icon: <IconPhoto className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />,
    },
    {
      label: "Member",
      href: "/admin/member",
      icon: <IconUsersGroup className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />,
    },
    {
      label: "Contact",
      href: "/admin/contact",
      icon: <IconUsers className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />,
    },
    {
      label: "Settings",
      href: "/admin/settings",
      icon: <IconSettings className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />,
    },
  ];

  const handleLogout = (e: React.MouseEvent) => {
    e.preventDefault(); // 阻止 <a> 標籤的預設跳轉行為
    
    // 清除隱形防護罩的解鎖狀態
    sessionStorage.removeItem("isAdminUnlocked");
    
    // 成功把鑰匙丟掉後，安全彈回前台首頁
    router.push("/");
  };

  return (
    <div className="shadow-sm h-full">
      <Sidebar open={open} setOpen={setOpen} animate={false}>
        <SidebarBody className="justify-between gap-10 h-full pl-8">
          <div className="flex flex-1 flex-col overflow-x-hidden overflow-y-auto">
            <div className="mt-8 flex flex-col gap-2">
              {/* 渲染一般功能連結 */}
              {links.map((link, idx) => (
                <SidebarLink key={idx} link={link} />
              ))}
              
              {/* 單獨渲染 Logout 按鈕，並綁定 onClick 登出事件 */}
              <div onClick={handleLogout} className="cursor-pointer">
                <SidebarLink
                  link={{
                    label: "Logout",
                    href: "/",
                    icon: <IconArrowLeft className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />,
                  }}
                />
              </div>
            </div>
          </div>
          <div>
            <SidebarLink
              link={{
                label: "Yonder Creative",
                href: "/admin",
                icon: (
                  <img
                    src="/logo/logo.svg"
                    className="h-7 w-7 shrink-0 rounded-full"
                    width={50}
                    height={50}
                    alt="yonder creative studio"
                  />
                ),
              }}
            />
          </div>
        </SidebarBody>
      </Sidebar>
    </div>
  );
}

export const LogoIcon = () => {
  return (
    <a
      href="/admin"
      className="relative z-20 flex items-center space-x-2 py-1 text-sm font-normal text-black"
    >
      <div className="h-5 w-6 shrink-0 rounded-tl-lg rounded-tr-sm rounded-br-lg rounded-bl-sm bg-black dark:bg-white" />
    </a>
  );
};