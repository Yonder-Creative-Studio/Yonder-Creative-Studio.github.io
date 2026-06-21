"use client";

import { motion } from "motion/react";
import MemberCard from "@/components/memberCard";

// 定義從資料庫傳過來的成員物件格式 (TypeScript)
interface MemberFromDb {
  id: string;
  order: number;
  name: string;
  role: string;
  school: string;
  department: string;
  imgSrc: string;
  expertise: string[];
  websiteUrl: string | null; // 註：資料庫中可選欄位可能是 string 或 null
}

interface MemberClientProps {
  members: MemberFromDb[];
}

export default function MemberClient({ members }: MemberClientProps) {
  return (
    <motion.div
      className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      {members.map((member) => (
        <MemberCard
          key={member.id}
          name={member.name}
          role={member.role} 
          school={member.school}
          department={member.department}
          expertise={member.expertise}
          imgSrc={member.imgSrc}
          websiteUrl={member.websiteUrl || undefined} // 如果 websiteUrl 是 null，傳 undefined 給 MemberCard
        />
      ))}
    </motion.div>
  );
}