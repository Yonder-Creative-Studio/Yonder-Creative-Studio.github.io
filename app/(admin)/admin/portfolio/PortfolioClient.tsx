"use client";

import React, { useState, useTransition } from "react";
import { createPortfolio, deletePortfolio } from "./actions"; // 確保你的 actions 檔路徑正確

interface Portfolio {
  id: string;
  title: string;
  slug: string;
  imgSrc: string | null;
  description: string | null;
  year: number;
}

export default function PortfolioManageClient({ initialPortfolios }: { initialPortfolios: Portfolio[] }) {
  const [isPending, startTransition] = useTransition();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPortfolio, setEditingPortfolio] = useState<Portfolio | null>(null);

  // 表單獨立狀態
  const [formData, setFormData] = useState({
    title: "",
    year: String(new Date().getFullYear()),
    slug: "",
    imgSrc: "",
    description: "",
    content: "", // 詳細 HTML 內容
  });

  // 開啟「新增」彈窗
  const handleOpenCreate = () => {
    setEditingPortfolio(null);
    setFormData({
      title: "",
      year: String(new Date().getFullYear()),
      slug: "",
      imgSrc: "",
      description: "",
      content: "",
    });
    setIsModalOpen(true);
  };

  // 提交表單處理 (整合 Action)
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const data = new FormData();
    if (editingPortfolio) data.append("id", editingPortfolio.id);
    data.append("title", formData.title);
    data.append("year", formData.year);
    data.append("slug", formData.slug);
    data.append("imgSrc", formData.imgSrc);
    data.append("description", formData.description);
    data.append("content", formData.content);

    startTransition(async () => {
      // 這裡直接借用你原本寫在 form action 的 createPortfolio 
      // 如果你有個別獨立的 update 也可以在這裡做分流，或是統一交由後端處理
      const res = await createPortfolio(data); 
      
      // 假設你的 server action 有回傳標準格式，配合你的彈窗行為
      setIsModalOpen(false);
    });
  };

  const handleDelete = async (id: string, slug: string) => {
    if (!confirm("確定要刪除這項作品集案例嗎？此動作無法復原。")) return;
    
    // 呼叫原本的刪除 Action 
    await deletePortfolio(id, slug);
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      
      {/* 頂部操作區 - 完全對齊 Member 樣式 */}
      <div className="p-4 border-b border-gray-200 flex justify-between items-center bg-gray-50">
        <span className="text-sm font-medium text-gray-600">目前共 {initialPortfolios.length} 筆作品資料</span>
        <button
          onClick={handleOpenCreate}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition"
        >
          + 新增作品資料
        </button>
      </div>

      {/* 資料表格區 */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-100 text-gray-700 text-xs uppercase font-semibold border-b border-gray-200">
              <th className="p-4 w-24 text-center">年份</th>
              <th className="p-4 w-24">預覽圖</th>
              <th className="p-4">作品名稱 / 識別碼 (Slug)</th>
              <th className="p-4">卡片簡短描述</th>
              <th className="p-4 text-center w-32">操作動作</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 text-sm text-gray-700">
            {initialPortfolios.map((portfolio) => (
              <tr key={portfolio.id} className="hover:bg-gray-50 transition">
                {/* 年份 */}
                <td className="p-4 text-center font-mono font-medium text-blue-600 bg-blue-50/30">
                  {portfolio.year}
                </td>
                {/* 預覽圖 */}
                <td className="p-4">
                  <div className="w-10 h-10 rounded-lg overflow-hidden border border-gray-200 bg-gray-50 flex items-center justify-center">
                    <img
                      src={portfolio.imgSrc || "/logo/favicon.png"}
                      alt={portfolio.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </td>
                {/* 作品名稱 / Slug */}
                <td className="p-4">
                  <div className="font-semibold text-gray-900">{portfolio.title}</div>
                  <div className="text-xs font-mono text-gray-400">/portfolio/{portfolio.slug}</div>
                </td>
                {/* 簡短描述 */}
                <td className="p-4 text-gray-500 max-w-xs truncate">
                  {portfolio.description || <span className="text-gray-300 italic">未填寫</span>}
                </td>
                {/* 操作按鈕 */}
                <td className="p-4 text-center">
                  <div className="flex justify-center gap-2">
                    <button
                      onClick={() => handleDelete(portfolio.id, portfolio.slug)}
                      className="px-2 py-1 text-xs text-red-600 bg-red-50 rounded hover:bg-red-100 transition"
                    >
                      刪除
                    </button>
                  </div>
                </td>
              </tr>
            ))}

            {initialPortfolios.length === 0 && (
              <tr>
                <td colSpan={5} className="text-center py-12 text-gray-400">
                  資料庫目前空空如也，請點擊右上方按鈕新增資料。
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* 彈窗表單 Modal - 完美複製 Member 彈窗外觀與極致體驗 */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-xl w-full max-h-[90vh] overflow-y-auto p-6 shadow-xl">
            <h2 className="text-lg font-bold text-gray-900 mb-4">
              {editingPortfolio ? `編輯作品：${editingPortfolio.title}` : "新增工作室作品 / 案例"}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-3 gap-4">
                <div className="col-span-2">
                  <label className="block text-xs font-semibold text-gray-600 mb-1">作品標題 *</label>
                  <input
                    type="text" required
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    placeholder="例如：遙創官網 3D 互動視窗"
                    className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1">專案年份 *</label>
                  <input
                    type="number" required
                    value={formData.year}
                    onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                    className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-blue-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1">網址識別碼 (Slug) *</label>
                  <input
                    type="text" required
                    value={formData.slug}
                    onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                    placeholder="yonder-3d-window"
                    className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1">卡片預覽圖片路徑</label>
                  <input
                    type="text"
                    value={formData.imgSrc}
                    onChange={(e) => setFormData({ ...formData, imgSrc: e.target.value })}
                    placeholder="/logo/favicon.png"
                    className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1">作品簡短描述 (用於卡片)</label>
                <input
                  type="text"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="這是一段出現在作品集卡片上的簡短描述..."
                  className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1">詳細文章內容 (支援 HTML 語法) *</label>
                <textarea
                  required rows={6}
                  value={formData.content}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  placeholder="<h2>這是副標題</h2><p>這是您的內文...</p>"
                  className="w-full border rounded-lg p-3 text-sm font-mono bg-gray-50 focus:outline-blue-500"
                />
                <p className="text-[10px] text-gray-400 mt-1">💡 提示：可以使用標準 HTML 標籤排版文章。</p>
              </div>

              {/* 底部動作按鈕 */}
              <div className="flex justify-end gap-3 pt-4 border-t">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 border rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                  取消
                </button>
                <button
                  type="submit"
                  disabled={isPending}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 disabled:bg-gray-400 transition"
                >
                  {isPending ? "儲存中..." : "確認儲存"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}