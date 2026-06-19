// prisma/seed.ts
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  await prisma.portfolio.deleteMany(); // 清除舊資料，確保種子資料乾淨

  await prisma.portfolio.createMany({
    data: [
      {
        title: "遙創工作室 3D 互動視窗",
        description: "結合 Three.js 與 React Three Fiber 的未來感 3D 視窗展示元件。",
        year: 2023,
        imgSrc: "/logo/favicon.png",
        slug: "yonder-3d-window",
        content: `
          <h2 class="text-xl font-bold text-slate-800 mb-4">專案緣起與技術核心</h2>
          <p class="text-slate-600 mb-4">這是一個極具實驗性的前端 3D 元件。我們結合了 WebGL、Three.js 與 React Three Fiber 來實現流暢的頁面互動...</p>
          <blockquote class="border-l-4 border-indigo-500 pl-4 italic text-slate-500 my-4">"The future is not far. We build it."</blockquote>
          <p class="text-slate-600">透過將 .glb 模型打包匯出，我們大幅降低了單一檔案的體積，使其能無痛在網頁上載入。</p>
        `,
      },
      {
        title: "智慧待辦清單 (Todo App)",
        description: "具備瀏覽器 LocalStorage 自動存檔與自動聚焦功能的前端練習專案。",
        year: 2023,
        imgSrc: "/logo/favicon.png",
        slug: "smart-todo-app",
        content: `
          <h2 class="text-xl font-bold text-slate-800 mb-4">優秀的使用者體驗設計</h2>
          <p class="text-slate-600 mb-4">為了解決傳統待辦清單每次新增都要手動點擊輸入框的痛點，我們整合了 <strong>useRef</strong> 來實現自動聚焦，並配合 <strong>useEffect</strong> 進行 LocalStorage 的自動同步。</p>
          <p class="text-slate-600">這是一個看似簡單，但細節拉滿的 UI/UX 範例專案。</p>
        `,
      },
    ],
  });

  console.log("🌱 資料庫測試種子資料植入成功！");
}

main()
  .then(async () => { await prisma.$disconnect(); })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });