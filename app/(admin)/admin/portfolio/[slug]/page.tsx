"use client";

import React, { useState } from "react";
import Footer from "@/components/footer";
import Title from "@/components/title";
import Card from "@/components/card";

import { InputGroup, InputGroupAddon, InputGroupInput } from "@/components/ui/input-group";
import { MdSearch } from "react-icons/md";

import { motion } from "motion/react";

import { 
  Pagination, 
  PaginationContent, 
  PaginationItem, 
  PaginationLink, 
  PaginationNext, 
  PaginationPrevious 
} from "@/components/ui/pagination";

// 1. 定義您的作品資料格式
interface Project {
  id: number;
  title: string;
  description: string;
  imgSrc: string;
  href: string;
  year: string;
}

// 2. 模擬多一些作品資料
const PROJECTS_DATA: Project[] = [
  { id: 1, title: "網頁開發專案 A", description: "這是第一個作品的描述", imgSrc: "/logo/favicon.png", href: "/", year: "2023" },
  { id: 2, title: "介面設計專案 B", description: "這是第二個作品的描述", imgSrc: "/logo/favicon.png", href: "/", year: "2023" },
  { id: 3, title: "SEO 優化專案 C", description: "這是第三個作品的描述", imgSrc: "/logo/favicon.png", href: "/", year: "2022" },
  { id: 4, title: "品牌識別專案 D", description: "這是第四個作品的描述", imgSrc: "/logo/favicon.png", href: "/", year: "2022" },
  { id: 5, title: "3D 互動網頁 E", description: "這是第五個作品的描述", imgSrc: "/logo/favicon.png", href: "/", year: "2021" },
  { id: 6, title: "智慧待辦清單 F", description: "這是第六個作品的描述", imgSrc: "/logo/favicon.png", href: "/", year: "2021" },
  { id: 7, title: "前端科技實驗 G", description: "這是第七個作品的描述", imgSrc: "/logo/favicon.png", href: "/", year: "2020" },
  { id: 8, title: "設計師作品集 H", description: "這是第八個作品的描述", imgSrc: "/logo/favicon.png", href: "/", year: "2020" },
  { id: 9, title: "後台管理系統 I", description: "這是第九個作品的描述", imgSrc: "/logo/favicon.png", href: "/", year: "2019" },
  { id: 10, title: "APP UI 介面設計 J", description: "這是第十個作品的描述", imgSrc: "/logo/favicon.png", href: "/", year: "2019" },
];

// 每頁想要顯示幾張卡片
const ITEMS_PER_PAGE = 6;

export default function Portfolio() {
  // 3. 狀態控制
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1); // 預設在第 1 頁

  // 4. 當使用者打字時的處理函式
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1); // 只要搜尋關鍵字改變，一律強制跳回第 1 頁，避免空白頁 Bug
  };

  // 5. 【第一階段過濾】先根據關鍵字過濾出所有符合的作品
  const filteredProjects = PROJECTS_DATA.filter((project) => {
    const query = searchQuery.toLowerCase().trim();
    return (
      project.title.toLowerCase().includes(query) ||
      project.description.toLowerCase().includes(query)
    );
  });

  // 計算過濾後，總共需要幾頁分頁
  const totalPages = Math.max(1, Math.ceil(filteredProjects.length / ITEMS_PER_PAGE));

  // 6. 【第二階段過濾】計算當前分頁要顯示的資料區間（例如:第 1 頁顯示 0~5 筆）
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const paginatedProjects = filteredProjects.slice(startIndex, endIndex);

  return (
    <div className="custom-scrollbar scrollbar-y-auto! scrollbar-x-none!">
      <div className="min-h-screen bg-slate-100 flex flex-col items-center justify-start p-4">
        <div className="pt-16 px-4 h-full w-full">

          <Title title="作品集" />

          {/* 搜尋框組件 */}
          <InputGroup>
            <InputGroupInput 
              placeholder="搜尋作品..." 
              value={searchQuery}
              onChange={handleSearchChange} // 綁定打字監聽
            />
            <InputGroupAddon>
              <MdSearch className="w-4 h-4 text-slate-400" />
            </InputGroupAddon>
            {/* 動態顯示過濾後的總數 */}
            <InputGroupAddon align="inline-end">
              {filteredProjects.length} {filteredProjects.length === 1 ? 'result' : 'results'}
            </InputGroupAddon>
          </InputGroup>

          {/* 卡片網格區域 */}
          {paginatedProjects.length === 0 ? (
            <div className="text-center py-20 text-slate-400 text-sm font-sans">
              找不到與「{searchQuery}」相符的作品
            </div>
            ) : (
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6"
              initial={{ opacity: 0, y: 30 }} // 1. 起點：透明且偏下 30px
              animate={{ opacity: 1, y: 0 }}  // 2. 終點：變實且回到原位
              transition={{ duration: 0.6, ease: "easeOut" }} // 3. 過程：跑 0.6 秒，使用平滑曲線
            >
              {/* 7. 渲染「當前分頁」的資料即可 */}
              {paginatedProjects.map((project) => (
                <Card 
                  key={project.id}
                  title={project.title} 
                  description={project.description} 
                  imgSrc={project.imgSrc} 
                  href={project.href} 
                  year={project.year}
                />
              ))}
            </motion.div>
          )}

          {/* 頁面切換 (僅在有需要分頁時顯示，且按鈕數量是動態計算的) */}
          {filteredProjects.length > 0 && (
            <div className="w-full flex justify-center my-8">
              <Pagination>
                <PaginationContent>
                  
                  {/* 上一頁按鈕:如果在第一頁就禁用 (disabled) */}
                  <PaginationItem>
                    <PaginationPrevious 
                      onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
                      className={currentPage === 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
                    />
                  </PaginationItem>

                  {/* 動態產生分頁按鈕:例如共有 2 頁，就產生 1、2 按鈕 */}
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <PaginationItem key={page}>
                      <PaginationLink 
                        onClick={() => setCurrentPage(page)}
                        isActive={currentPage === page}
                        className="cursor-pointer"
                      >
                        {page}
                      </PaginationLink>
                    </PaginationItem>
                  ))}

                  {/* 下一頁按鈕:如果已經在最後一頁就禁用 */}
                  <PaginationItem>
                    <PaginationNext 
                      onClick={() => setCurrentPage((prev) => Math.min(totalPages, prev + 1))}
                      className={currentPage === totalPages ? "pointer-events-none opacity-50" : "cursor-pointer"}
                    />
                  </PaginationItem>

                </PaginationContent>
              </Pagination>
            </div>
          )}

        </div>
      </div>
      <Footer />
      
    </div>
  );
}