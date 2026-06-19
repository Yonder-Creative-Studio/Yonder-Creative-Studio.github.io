// 動態作品詳細頁

import React from "react";
import { db } from "@/lib/db";
import { notFound } from "next/navigation";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function ProjectDetailPage({ params }: PageProps) {
  const { slug } = await params; // 👈 採用 Next.js 15+ 的非同步 params 寫法

  // 根據網址列的 slug 查詢對應的單一作品
  const project = await db.portfolio.findUnique({
    where: { slug },
  });

  // 如果資料庫中找不到，直接導向 404
  if (!project) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col justify-between">
      <div className="pt-24 px-6 md:px-12 max-w-4xl mx-auto w-full">

        {/* 文章標頭 */}
        <div className="space-y-4 border-b pb-6 border-slate-300">
          <h1 className="text-3xl md:text-4xl font-bold text-slate-800">
            {project.title}
          </h1>
        </div>

        {/* 🚀 安全渲染存放於資料庫的 HTML 文章 */}
        <article className="prose prose-slate mt-8 max-w-none text-slate-700 leading-relaxed space-y-4">
          <div dangerouslySetInnerHTML={{ __html: project.content }} />
        </article>

      </div>
    </div>
  );
}