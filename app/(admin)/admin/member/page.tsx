import { db } from "@/lib/db";
import MemberManageClient from "./MemberClient";

// 確保每次進來都是最新資料，不使用快取
export const revalidate = 0;

export default async function AdminMemberPage() {
  // 撈取所有成員，並依 order 排序
  const members = await db.member.findMany({
    orderBy: {
      order: "asc",
    },
  });

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">團隊成員管理後台</h1>
          <p className="text-sm text-gray-500 mt-1">
            在此管理前台顯示的成員資料、排序與照片。
          </p>
        </div>
      </div>

      {/* 載入一列一列的後台管理主元件 */}
      <MemberManageClient initialMembers={members} />
    </div>
  );
}