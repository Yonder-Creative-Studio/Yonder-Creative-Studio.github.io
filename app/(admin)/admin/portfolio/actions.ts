// src/app/admin/portfolio/actions.ts
"use server";

import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";

// 1. 新增作品文章
export async function createPortfolio(formData: FormData) {
  const title = formData.get("title") as string;
  const yearStr = formData.get("year") as string; // 表單拿出來是字串
  const description = formData.get("description") as string;
  const imgSrc = formData.get("imgSrc") as string;
  const slug = formData.get("slug") as string;
  const content = formData.get("content") as string; // 大量 HTML 文章內容

  if (!title || !slug || !content) {
    throw new Error("標題、網址識別碼(slug)與文章詳細內容為必填欄位");
  }

  // 轉換年份為整數 (Integer)，如果未填則預設為今年
  const year = parseInt(yearStr, 10) || new Date().getFullYear();

  // 寫入 Supabase (PostgreSQL) 的 Portfolio 資料表
  await db.portfolio.create({
    data: {
      title,
      year,
      description,
      imgSrc: imgSrc || "/logo/favicon.png",
      slug,
      content,
    },
  });

  // 🌟 即時同步：重建作品集列表頁與該篇新文章詳細頁的快取
  revalidatePath("/portfolio");
  revalidatePath(`/portfolio/${slug}`);
}

// 2. 刪除作品文章
export async function deletePortfolio(id: string, slug: string) {
  await db.portfolio.delete({
    where: { id },
  });

  // 🌟 即時同步前端
  revalidatePath("/portfolio");
  revalidatePath(`/portfolio/${slug}`);
}