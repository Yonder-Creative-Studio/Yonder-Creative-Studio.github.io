"use client";

import React, { useState, useTransition } from "react";
import { createMemberAction, updateMemberAction, deleteMemberAction } from "./actions";

interface Member {
  id: string;
  name: string;
  role: string;
  school: string;
  department: string;
  expertise: any; // 相容 Prisma 的 JsonValue
  websiteUrl: string | null; // 允許 null，避免與資料庫型別打架
  imgSrc: string;
  order: number;
}

export default function MemberManageClient({ initialMembers }: { initialMembers: Member[] }) {
  const [isPending, startTransition] = useTransition();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingMember, setEditingMember] = useState<Member | null>(null);

  // 表單獨立狀態
  const [formData, setFormData] = useState({
    name: "",
    role: "",
    school: "",
    department: "",
    websiteUrl: "",
    order: "0",
    expertise: "",
  });
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  // 開啟「新增」彈窗
  const handleOpenCreate = () => {
    setEditingMember(null);
    setFormData({ name: "", role: "", school: "", department: "", websiteUrl: "", order: "0", expertise: "" });
    setSelectedFile(null);
    setIsModalOpen(true);
  };

  // 開啟「編輯」彈窗（將原有資料帶入）
  const handleOpenEdit = (member: Member) => {
    setEditingMember(member);

    // 防禦性地將專長陣列轉換回以逗號分隔的乾淨字串，讓後台 input 更好閱讀
    let expertiseString = "";
    if (member.expertise) {
      if (Array.isArray(member.expertise)) {
        expertiseString = member.expertise.join(", ");
      } else if (typeof member.expertise === "string") {
        try {
          const parsed = JSON.parse(member.expertise);
          expertiseString = Array.isArray(parsed) ? parsed.join(", ") : String(parsed);
        } catch {
          expertiseString = member.expertise;
        }
      }
    }

    setFormData({
      name: member.name,
      role: member.role,
      school: member.school,
      department: member.department,
      websiteUrl: member.websiteUrl || "",
      order: String(member.order),
      expertise: expertiseString, // 帶入漂亮乾淨的字串，徹底解決語法崩潰錯誤
    });
    setSelectedFile(null);
    setIsModalOpen(true);
  };

  // 提交表單（同時處理 新增 與 修改）
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const data = new FormData();
    if (editingMember) data.append("id", editingMember.id);
    data.append("name", formData.name);
    data.append("role", formData.role);
    data.append("school", formData.school);
    data.append("department", formData.department);
    data.append("websiteUrl", formData.websiteUrl);
    data.append("order", formData.order);
    
    // 不管使用者輸入什麼，存進資料庫前一律變回標準 JSON 陣列
    if (formData.expertise.trim()) {
      if (formData.expertise.trim().startsWith("[")) {
        try {
          const parsed = JSON.parse(formData.expertise);
          data.append("expertise", JSON.stringify(Array.isArray(parsed) ? parsed : [parsed]));
        } catch {
          const arr = formData.expertise.replace(/[\[\]"]/g, "").split(",").map(s => s.trim()).filter(Boolean);
          data.append("expertise", JSON.stringify(arr));
        }
      } else {
        const arr = formData.expertise.split(",").map(s => s.trim()).filter(Boolean);
        data.append("expertise", JSON.stringify(arr));
      }
    } else {
      data.append("expertise", JSON.stringify([]));
    }

    if (selectedFile) {
      data.append("image", selectedFile);
    } else if (editingMember) {
      data.append("imgSrc", editingMember.imgSrc);
    }

    startTransition(async () => {
      const res = editingMember 
        ? await updateMemberAction(data)
        : await createMemberAction(data);
        
      if (res.success) {
        alert(res.message);
        setIsModalOpen(false);
      } else {
        alert(res.message);
      }
    });
  };

  // 刪除處理
  const handleDelete = async (id: string) => {
    if (!confirm("確定要刪除這位團隊成員嗎？此動作無法復原。")) return;
    
    const res = await deleteMemberAction(id);
    if (res.success) {
      alert(res.message);
    } else {
      alert(res.message);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      
      {/* 頂部操作區 */}
      <div className="p-4 border-b border-gray-200 flex justify-between items-center bg-gray-50">
        <span className="text-sm font-medium text-gray-600">目前共 {initialMembers.length} 筆資料</span>
        <button
          onClick={handleOpenCreate}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition"
        >
          + 新增成員資料
        </button>
      </div>

      {/* 資料表格區 */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-100 text-gray-700 text-xs uppercase font-semibold border-b border-gray-200">
              <th className="p-4 w-16 text-center">排序</th>
              <th className="p-4 w-20">照片</th>
              <th className="p-4">姓名 / 職稱</th>
              <th className="p-4">學校 / 科系</th>
              <th className="p-4">專業擅長</th>
              <th className="p-4 text-center w-32">操作動作</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 text-sm text-gray-700">
            {initialMembers.map((member) => {
              // 💡 安全渲染解析：確保表格在 map 專長標籤時不會因為格式而出錯
              let displayExpertise: string[] = [];
              if (member.expertise) {
                if (Array.isArray(member.expertise)) {
                  displayExpertise = member.expertise;
                } else if (typeof member.expertise === "string") {
                  try {
                    const parsed = JSON.parse(member.expertise);
                    displayExpertise = Array.isArray(parsed) ? parsed : [parsed];
                  } catch {
                    displayExpertise = member.expertise.split(",").map((s: string) => s.trim()).filter(Boolean);
                  }
                }
              }

              return (
                <tr key={member.id} className="hover:bg-gray-50 transition">
                  {/* 排序 */}
                  <td className="p-4 text-center font-mono text-gray-500">{member.order}</td>
                  {/* 照片 */}
                  <td className="p-4">
                    <img
                      src={member.imgSrc || "/images/default-avatar.jpg"}
                      alt={member.name}
                      className="w-10 h-10 rounded-full object-cover border bg-gray-100"
                    />
                  </td>
                  {/* 姓名職稱 */}
                  <td className="p-4">
                    <div className="font-semibold text-gray-900">{member.name}</div>
                    <div className="text-xs text-gray-500">{member.role}</div>
                  </td>
                  {/* 學校科系 */}
                  <td className="p-4">
                    <div>{member.school}</div>
                    <div className="text-xs text-gray-500">{member.department}</div>
                  </td>
                  {/* 專長 */}
                  <td className="p-4">
                    <div className="flex flex-wrap gap-1">
                      {displayExpertise.map((exp, idx) => (
                        <span key={idx} className="bg-gray-100 text-gray-600 px-2 py-0.5 rounded text-xs">
                          {String(exp)}
                        </span>
                      ))}
                    </div>
                  </td>
                  {/* 操作按紐 */}
                  <td className="p-4 text-center">
                    <div className="flex justify-center gap-2">
                      <button
                        onClick={() => handleOpenEdit(member)}
                        className="px-2 py-1 text-xs text-blue-600 bg-blue-50 rounded hover:bg-blue-100 transition"
                      >
                        編輯
                      </button>
                      <button
                        onClick={() => handleDelete(member.id)}
                        className="px-2 py-1 text-xs text-red-600 bg-red-50 rounded hover:bg-red-100 transition"
                      >
                        刪除
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}

            {initialMembers.length === 0 && (
              <tr>
                <td colSpan={6} className="text-center py-12 text-gray-400">
                  資料庫目前空空如也，請點擊右上方按鈕新增資料。
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* 彈窗 Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-lg w-full max-h-[90vh] overflow-y-auto p-6 shadow-xl">
            <h2 className="text-lg font-bold text-gray-900 mb-4">
              {editingMember ? `編輯成員：${editingMember.name}` : "新增團隊成員"}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1">姓名 *</label>
                <input
                  type="text" required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-blue-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1">職稱 / 角色 *</label>
                  <input
                    type="text" required
                    value={formData.role}
                    onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                    className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1">顯示排序權重 (越小越靠前)</label>
                  <input
                    type="number"
                    value={formData.order}
                    onChange={(e) => setFormData({ ...formData, order: e.target.value })}
                    className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-blue-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1">學校學校 *</label>
                  <input
                    type="text" required
                    value={formData.school}
                    onChange={(e) => setFormData({ ...formData, school: e.target.value })}
                    className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1">就讀科系 *</label>
                  <input
                    type="text" required
                    value={formData.department}
                    onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                    className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1">專業擅長 (請用英文逗號 , 分隔)</label>
                <input
                  type="text"
                  placeholder="例如: UI/UX, React, Blender"
                  value={formData.expertise}
                  onChange={(e) => setFormData({ ...formData, expertise: e.target.value })}
                  className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1">個人網站 / 作品集 URL</label>
                <input
                  type="url"
                  value={formData.websiteUrl}
                  onChange={(e) => setFormData({ ...formData, websiteUrl: e.target.value })}
                  className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1">成員大頭貼照片</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setSelectedFile(e.target.files?.[0] || null)}
                  className="w-full text-xs text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                />
                {editingMember && !selectedFile && (
                  <p className="text-gray-400 text-xs mt-1">💡 提示：若不更換照片，放空即可自動沿用原圖。</p>
                )}
              </div>

              {/* 底部按鈕 */}
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