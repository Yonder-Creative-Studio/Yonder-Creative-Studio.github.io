import Footer from "@/components/footer";
import Title from "@/components/title";

import { db } from "@/lib/db"; // 引入資料庫連線
import MemberClient from "./MemberClient"; // 引入負責動畫與循環渲染的 Client 元件

export default async function MemberPage() {
  
  // 1. 直接從 PostgreSQL 資料庫撈取所有成員
  const members = await db.member.findMany({
    select: {
      id: true,
      order: true,
      name: true,
      role: true,
      school: true,
      department: true,
      imgSrc: true,
      expertise: true,
      websiteUrl: true,
    },
    orderBy: {
      order: 'asc', // 依照數字大小來排
    },
  });

  return (
    <div className="custom-scrollbar scrollbar-y-auto! scrollbar-x-none!">
      <div className="min-h-screen bg-slate-100 flex flex-col items-center justify-start p-4">
        <div className="pt-16 px-4 h-full w-full">
          
          <Title title="成員" />
          
          {/* 2. 將資料傳給負責 Framer Motion 的 Client 元件 */}
          <MemberClient members={members} />

        </div>
      </div>
      <Footer />
    </div>
  );
}