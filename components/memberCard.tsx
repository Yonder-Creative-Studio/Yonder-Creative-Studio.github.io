'use client';

import Link from "next/link";
import Image from "next/image";

interface MemberProps {
  name?: string;
  jobTitle?: string;
  education?: string;
  major?: string;
  specialty?: string[];
  href?: string;
  imgSrc?: string;
}

export default function Member({ name, jobTitle, education, major, specialty, href, imgSrc}: MemberProps) {
  return(
    
    <div className="w-full h-full text-primary bg-white shadow-sm hover:-translate-y-1 hover:shadow-md rounded-md transition-all duration-600 p-4 flex gap-4 justify-center items-center">

      {imgSrc && (
        <div className="w-full h-full aspect-9/10 relative mt-2 overflow-hidden rounded-md">
          <Image 
            src={imgSrc} 
            alt={name || "card image"} 
            fill
            sizes="(max-width: 768px) 100vw, 400px"
            className="object-cover hover:scale-105 transition-all duration-600" 
          />
        </div>
      )}

      <div className="flex flex-col items-start justify-between gap-4 w-full h-full mt-2 text-primary">
        <div className="flex flex-col gap-4 justify-between h-full">

          <div className="flex justify-start items-end gap-2 border-b border-primary pb-4">
            {name && <div className="font-serif text-lg font-bold">{name} /</div>}
            {jobTitle && <p className="text-sm opacity-80">{jobTitle}</p>}
          </div>
          
          <div className="flex flex-col gap-1 border border-primary/80 p-2 rounded-sm">
            {education && <p className="text-xs opacity-80">{education}</p>}
            {major && <p className="text-xs">{major}</p>}
          </div>

          {specialty && (
            <div className="flex flex-wrap gap-1 text-xs">
              <p>專長</p>
              {/* 傳入陣列 */}
              <div className="flex flex-wrap gap-2 text-xs">
                {(Array.isArray(specialty) ? specialty : [specialty]).map((item, index) => (
                  <span 
                    key={index} 
                    className="px-3 py-1 bg-white/60 backdrop-blur-xs text-primary rounded-sm border border-secondary/50 shadow-xs"
                  >
                    {item.trim()}
                  </span>
                ))}
              </div>
            </div>
          )}

          {href && (
            <Link href={href} target="_blank" className="text-xs text-primary/80 mt-2 inline-block self-end">
              <div className="bg-primary/10 hover:bg-primary/20 transition-colors duration-300 px-2 py-1 rounded-sm">
                個人網頁
              </div>
            </Link>
          )}

        </div>   
      </div>
    </div>

  )
}