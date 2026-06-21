// src/app/admin/portfolio/page.tsx
import { db } from "@/lib/db";
import PortfolioManageClient from "./PortfolioClient";
import Link from "next/link";

// 確保每次進來都是最新資料，不使用快取
export const revalidate = 0;

export default async function PortfolioAdminPage() {
  // 撈取所有作品
  const portfolios = await db.portfolio.findMany({
    orderBy: {
      year: "desc",
    },
  });

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">工作室作品管理後台</h1>
          <p className="text-sm text-gray-500 mt-1">
            在此管理前台顯示的作品專案、年份與詳細文章介紹。
          </p>
        </div>
        <Link href="/portfolio" target="_blank" className="text-sm text-blue-600">
          查看前台作品集 ➔
        </Link>
      </div>

      {/* 載入與 member 體驗完全一致的表格與彈窗元件 */}
      <PortfolioManageClient initialPortfolios={portfolios} />
    </div>
  );
}