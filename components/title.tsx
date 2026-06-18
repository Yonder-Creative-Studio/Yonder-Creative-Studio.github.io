'use client';

// import Link from "next/link";

import { motion } from "motion/react";

interface TitleProps {
  title: string;
  className?: string;
}

export default function Title({ title, className }: TitleProps) {
  return (
    <motion.h1 
      className={`title ${className || ''}`}
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      {title}
    </motion.h1>
  );
}