// components/memberCard.tsx
'use client';

import Link from "next/link";
import Image from "next/image";

interface MemberProps {
  name?: string;
  role?: string;
  school?: string;
  department?: string;
  expertise?: any;
  websiteUrl?: string | null;
  imgSrc?: string;
}

export default function Member({ name, role, school, department, expertise, websiteUrl, imgSrc }: MemberProps) {
  
  let safeExpertise: string[] = [];
  if (expertise) {
    if (Array.isArray(expertise)) {
      safeExpertise = expertise.map(item => String(item));
    } else if (typeof expertise === 'string') {
      try {
        const parsed = JSON.parse(expertise);
        safeExpertise = Array.isArray(parsed) ? parsed.map(item => String(item)) : [String(parsed)];
      } catch {
        safeExpertise = expertise.split(",").map(s => s.trim()).filter(Boolean);
      }
    }
  }

  return (
    <div className="w-full h-full min-h-80 text-primary bg-white shadow-sm hover:-translate-y-1 hover:shadow-md rounded-md transition-all duration-600 p-4 flex flex-col md:flex-row gap-4 justify-center items-stretch">
      
      {/* 照片區塊 */}
      {imgSrc && (
        <div className="w-full aspect-video md:aspect-auto md:w-2/5 h-48 md:h-auto relative overflow-hidden rounded-md flex-shrink-0">
          <Image 
            src={imgSrc} 
            alt={name || "card image"} 
            fill
            sizes="(max-width: 768px) 100vw, 400px"
            className="object-cover hover:scale-105 transition-all duration-600" 
          />
        </div>
      )}

      {/* 文字詳細資料區 */}
      <div className="flex flex-col items-start justify-between gap-4 w-full h-full text-primary md:flex-1">
        <div className="flex flex-col gap-4 justify-between w-full h-full flex-1">

          <div className="w-full">
            {/* 桌面版頂部標題 */}
            <div className="flex justify-start items-end gap-2 border-b border-primary pb-2 mb-3">
              {name && <div className="font-serif text-lg font-bold">{name} /</div>}
              {role && <p className="text-sm opacity-80">{role}</p>}
            </div>
            
            {/* 學校科系 */}
            <div className="flex flex-col gap-1 md:border border-primary/80 md:p-3 rounded-sm w-full bg-slate-50/50 mb-3">
              {school && <p className="text-xs opacity-80 font-medium">{school}</p>}
              {department && <p className="text-xs text-gray-600">{department}</p>}
            </div>

            {/* 專業擅長標籤群 */}
            {safeExpertise.length > 0 && (
              <div className="flex flex-col gap-1.5 text-xs w-full">
                <p className="font-semibold opacity-80">專長</p>
                <div className="flex flex-wrap gap-1.5 text-xs">
                  {safeExpertise.map((item, index) => (
                    <span 
                      key={index} 
                      className="px-2.5 py-0.5 bg-white/60 text-primary rounded-sm border border-secondary/50 shadow-xs text-[11px]"
                    >
                      {item.trim()}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* 個人網站按鈕 - 確保永遠貼齊底部 */}
          <div className="w-full flex justify-end mt-auto pt-2">
            {websiteUrl ? (
              <Link href={websiteUrl} target="_blank" className="text-xs text-primary/80 inline-block">
                <div className="bg-primary/10 hover:bg-primary/20 transition-colors duration-300 px-2 py-1 rounded-sm font-medium">
                  個人網頁
                </div>
              </Link>
            ) : (
              // 如果沒有網頁，留一個隱形空位佔空間，防止卡片高度縮水
              <div className="h-[24px] w-1"></div>
            )}
          </div>

        </div>   
      </div>
    </div>
  );
}