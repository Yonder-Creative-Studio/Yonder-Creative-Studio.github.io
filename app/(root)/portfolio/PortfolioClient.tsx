// 用戶互動端
"use client";

import React, { useState } from "react";
import Card from "@/components/card";
import { InputGroup, InputGroupAddon, InputGroupInput } from "@/components/ui/input-group";
import { SearchIcon } from "lucide-react";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious
} from "@/components/ui/pagination";

interface Project {
  id: string;
  title: string;
  year: number;
  description: string;
  imgSrc: string;
  slug: string;
}

const ITEMS_PER_PAGE = 6;

export default function PortfolioClient({ initialProjects }: { initialProjects: Project[] }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1); // 搜尋時重置頁碼，避免空白頁 Bug
  };

  // 1. 第一階段：搜尋過濾
  const filteredProjects = initialProjects.filter((project) => {
    const query = searchQuery.toLowerCase().trim();
    return (
      project.title.toLowerCase().includes(query) ||
      project.description.toLowerCase().includes(query)
    );
  });

  const totalPages = Math.max(1, Math.ceil(filteredProjects.length / ITEMS_PER_PAGE));

  // 2. 第二階段：分頁切片
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const paginatedProjects = filteredProjects.slice(startIndex, endIndex);

  return (
    <div className="space-y-6">

      {/* 搜尋框組件 */}
      <InputGroup>
        <InputGroupInput
          placeholder="搜尋作品..."
          value={searchQuery}
          onChange={handleSearchChange}
        />
        <InputGroupAddon>
          <SearchIcon className="w-4 h-4 text-slate-400" />
        </InputGroupAddon>
        {/* 動態顯示過濾後的總數 */}
        <InputGroupAddon align="inline-end">
          {filteredProjects.length} {filteredProjects.length === 1 ? 'result' : 'results'}
        </InputGroupAddon>
      </InputGroup>

      {/* 卡片網格與無結果提示 */}
      {paginatedProjects.length === 0 ? (
        <div className="text-center py-20 text-slate-400 text-sm font-sans">
          找不到與「{searchQuery}」相符的作品
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
          {paginatedProjects.map((project) => (
            <Card
              key={project.id}
              title={project.title}
              description={project.description}
              year={project.year}
              imgSrc={project.imgSrc}
              href={`/portfolio/${project.slug}`} // 👈 點擊跳轉到對應文章詳細頁
            />
          ))}
        </div>
      )}

      {/* 頁面切換控制 */}
      {filteredProjects.length > 0 && (
        <div className="w-full flex justify-center my-8">
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
                  className={currentPage === 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
                />
              </PaginationItem>

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
  );
}