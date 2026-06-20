// app/(admin)/admin/member/actions.ts
'use server';

import { db } from "@/lib/db";
import { supabaseAdmin } from "@/lib/supabase-admin";
import { revalidatePath } from "next/cache";

const BUCKET_NAME = "YCwebsite";
const FOLDER_PATH = "members";
const DEFAULT_AVATAR = "https://pwrlohlzeuaikmxfohjf.supabase.co/storage/v1/object/public/YCwebsite/logo/favicon.png";

/**
 * 內部共用核心：處理二進位檔案串流直接上傳至 Supabase Storage
 * 修正規則：檔名改為 [member_id]-[原檔名]
 */
async function uploadToSupabase(file: File, memberId: string) {
  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);
  
  // 核心修改：將檔名組合為 memberId-原檔名
  const storagePath = `${FOLDER_PATH}/${memberId}-${file.name}`;

  // 執行上傳
  const { error } = await supabaseAdmin.storage
    .from(BUCKET_NAME)
    .upload(storagePath, buffer, {
      contentType: file.type,
      upsert: true, // 如果一模一樣的檔名再度上傳，則覆蓋
    });

  if (error) {
    console.error("Supabase Storage 核心上傳失敗:", error);
    throw error;
  }

  // 回傳對接成功的標準 Supabase 公開圖片網址
  return `https://pwrlohlzeuaikmxfohjf.supabase.co/storage/v1/object/public/${BUCKET_NAME}/${storagePath}`;
}

/**
 * 1. 雙階式成員新增 Action
 */
export async function createMemberAction(formData: FormData) {
  try {
    const name = formData.get("name") as string;
    const role = formData.get("role") as string;
    const school = formData.get("school") as string;
    const department = formData.get("department") as string;
    const websiteUrl = formData.get("websiteUrl") as string;
    const order = parseInt(formData.get("order") as string || "0", 10);
    const expertise = JSON.parse(formData.get("expertise") as string || "[]");
    
    const file = formData.get("image") as File | null;

    // 階段一：於 PostgreSQL 中建立核心紀錄以撈取唯一識別 ID
    const newMember = await db.member.create({
      data: {
        name,
        role,
        school,
        department,
        expertise,
        websiteUrl,
        imgSrc: DEFAULT_AVATAR, // 先行放入系統預設佔位圖
        order,
      },
    });

    let finalImgSrc = newMember.imgSrc;

    // 階段二：驗證實體檔案是否被有效夾帶
    if (file && file.size > 0 && file.name && file.name !== "undefined") {
      // 傳入 file 物件，內部會自動解析出 file.name 進行組合
      finalImgSrc = await uploadToSupabase(file, newMember.id);

      // 階段三：檔案布署雲端完成後，將永久 URL 回填至關聯欄位中
      await db.member.update({
        where: { id: newMember.id },
        data: { imgSrc: finalImgSrc },
      });
    }

    // 核心快取清理
    revalidatePath("/admin/member");
    revalidatePath("/member");

    return { success: true, message: "團隊成員已成功新增並完成圖片對接！" };
  } catch (error) {
    console.error("createMemberAction 異常錯誤:", error);
    return { success: false, message: "伺服器內部錯誤，新增失敗。" };
  }
}

/**
 * 2. 成員修改 Action
 */
export async function updateMemberAction(formData: FormData) {
  try {
    const id = formData.get("id") as string;
    const name = formData.get("name") as string;
    const role = formData.get("role") as string;
    const school = formData.get("school") as string;
    const department = formData.get("department") as string;
    const websiteUrl = formData.get("websiteUrl") as string;
    const order = parseInt(formData.get("order") as string || "0", 10);
    const expertise = JSON.parse(formData.get("expertise") as string || "[]");

    const file = formData.get("image") as File | null;
    let imgSrc = formData.get("imgSrc") as string; // 若未更換照片則沿用舊網址

    // 如有全新上傳照片，上傳新照片（檔名同樣會遵循 [id]-[新檔名]）
    if (file && file.size > 0 && file.name && file.name !== "undefined") {
      imgSrc = await uploadToSupabase(file, id);
    }

    // 直接更新 PostgreSQL 資料庫
    await db.member.update({
      where: { id: id },
      data: {
        name,
        role,
        school,
        department,
        expertise,
        websiteUrl,
        imgSrc,
        order,
      },
    });

    // 重新編譯快取
    revalidatePath("/admin/member");
    revalidatePath("/member");

    return { success: true, message: "資料與圖片皆已同步更新完成！" };
  } catch (error) {
    console.error("updateMemberAction 異常錯誤:", error);
    return { success: false, message: "更新失敗。" };
  }
}

/**
 * 3. 刪除成員 Action
 */
export async function deleteMemberAction(id: string) {
  try {
    // 從遠端 PostgreSQL 資料庫刪除該筆成員資料
    await db.member.delete({
      where: { id: id }
    });

    // 即時刷新快取
    revalidatePath("/admin/member");
    revalidatePath("/member");

    return { success: true, message: "成員資料已成功刪除！" };
  } catch (error) {
    console.error("Action 刪除成員失敗:", error);
    return { success: false, message: "刪除失敗。" };
  }
}

/**
 * 4. 批次更新成員排序權重 (Drag and Drop)
 */
export async function updateMembersOrderAction(orderedIds: string[]) {
  try {
    // 使用 Prisma transaction 確保所有成員的 order 同步被批次更新
    await db.$transaction(
      orderedIds.map((id, index) =>
        db.member.update({
          where: { id },
          data: { order: index }, // 依據拖曳後的陣列索引 index 當作最新的 order 權重
        })
      )
    );

    // 即時刷新前後台快取
    revalidatePath("/admin/member");
    revalidatePath("/member");

    return { success: true, message: "排序已成功儲存並同步！" };
  } catch (error) {
    console.error("Action 批次排序失敗:", error);
    return { success: false, message: "同步排序失敗。" };
  }
}