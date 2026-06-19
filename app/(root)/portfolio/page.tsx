// 作品集列表頁

import React from "react";
import Footer from "@/components/footer";
import Title from "@/components/title";
import { db } from "@/lib/db";
import PortfolioClient from "./PortfolioClient"; // 👈 引入 Client 元件

export default async function Portfolio() {
  // 🚀 運用 Prisma 6 特性：不撈取大體積的文章內容，大幅減少資料傳輸！
  const projects = await db.portfolio.findMany({
    omit: {
      content: true, // 👈 列表中不需要文章內容，直接不撈，省資源
    },
  });

  return (
    <div className="custom-scrollbar scrollbar-y-auto! scrollbar-x-none!">
      <div className="min-h-screen bg-slate-100 flex flex-col items-center justify-start p-4">
        <div className="pt-16 ps-4 h-full w-full px-8 max-w-6xl mx-auto">

          <Title title="作品集" className="mb-4!" />

          {/* 👈 將資料庫撈出的乾淨資料，傳給 Client 端進行過濾與分頁 */}
          <PortfolioClient initialProjects={projects} />

        </div>
      </div>
      <Footer />
    </div>
  );
}