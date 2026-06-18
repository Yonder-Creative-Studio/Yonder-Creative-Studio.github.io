"use client";
import React from "react";
import { motion } from "motion/react";
import Image from "next/image";
import Link from "next/link";



const transition = {
  type: "spring" as const,
  mass: 0.5,
  damping: 11.5,
  stiffness: 100,
  restDelta: 0.001,
  restSpeed: 0.001,
};

export const MenuItem = ({
  setActive,
  active,
  item,
  children,
  href,
}: {
  setActive: (item: string) => void;
  active: string | null;
  item: string;
  children?: React.ReactNode;
  href?: string;
}) => {
  // 將文字與動畫樣式抽出來，方便共用
  const itemText = (
    <motion.p
      transition={{ duration: 0.3 }}
      className="cursor-pointer text-primary hover:opacity-[0.9] hover:scale-105 transition-all duration-200"
    >
      {item}
    </motion.p>
  );

  return (
    <div onMouseEnter={() => setActive(item)} className="relative">
      {/* 判斷是否有傳入 href，有的話用 Next.js 的 Link 包裹文字 */}
      {href ? (
        <Link href={href}>
          {itemText}
        </Link>
      ) : (
        itemText
      )}

      {active !== null && (
        <motion.div
          initial={{ opacity: 0, scale: 0.85, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={transition}
        >
          {active === item && (
            <div className="absolute top-[calc(100%_+_1.2rem)] left-1/2 transform -translate-x-1/2 pt-2">
              <motion.div
                transition={transition}
                layoutId="active" // layoutId ensures smooth animation
                className="bg-white backdrop-blur-sm rounded-sm overflow-hidden shadow-sm"
              >
                <motion.div
                  layout // layout ensures smooth animation
                  className="w-max h-full p-4"
                >
                  {children}
                </motion.div>
              </motion.div>
            </div>
          )}
        </motion.div>
      )}
    </div>
  );
};



export const Menu = ({
  setActive,
  children,
}: {
  setActive: (item: string | null) => void;
  children: React.ReactNode;
}) => {
  return (
    <nav
      onMouseLeave={() => setActive(null)} // resets the state
      className="relative bg-white text-primary text-sm flex justify-center px-8 md:px-12 py-4 gap-8"
    >
      {children}
    </nav>
  );
};



export const ProductItem = ({
  title,
  description,
  href,
  src,
}: {
  title: string;
  description: string;
  href: string;
  src: string;
}) => {
  return (
    <Link href={href} className="flex space-x-2">
      <Image
        src={src}
        width={140}
        height={70}
        alt={title}
        loading="eager"
        className="shrink-0 shadow-2xl"
      />
      <div>
        <h4 className="text-xl font-bold mb-1 text-black">
          {title}
        </h4>
        <p className="text-primary text-sm max-w-40">
          {description}
        </p>
      </div>
    </Link>
  );
};



export const HoveredLink = ({ children, href, ...rest }: { children: React.ReactNode; href: string }) => {
  return (
    <Link
      href={href || "#"}
      className="text-primary hover:text-black "
      {...rest}
    >
      {children}
    </Link>
  );
};