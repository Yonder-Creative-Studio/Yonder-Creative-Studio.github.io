'use client';

import Link from "next/link";
import Image from "next/image";

interface CardProps {
  year?: string;
  title?: string;
  description?: string;
  href?: string;
  imgSrc?: string;
  onClick?: () => void;
  className?: string;
}

export default function Card({ year, title, description, href, imgSrc, onClick, className = '' }: CardProps) {
  const content = (
    <div className={`text-primary bg-white shadow-sm hover:-translate-y-1 hover:shadow-md rounded-md transition-all duration-600 p-4 flex flex-col gap-1 justify-center items-center w-full h-full ${className}`}>
      {imgSrc && (
        <div className="w-full aspect-video relative mt-2 overflow-hidden rounded-md">
          <Image 
            src={imgSrc} 
            alt={title || "card image"} 
            fill
            sizes="(max-width: 768px) 100vw, 400px"
            className="object-cover hover:scale-105 transition-all duration-600" 
          />
        </div>
      )}
      {year && <div className="font-serif text-xs opacity-80">{year}</div>}
      {title && <div className="font-serif text-md font-bold">{title}</div>}
      {description && <p className="text-sm opacity-80">{description}</p>}
    </div>
  );

  // 確保整張卡片皆可點擊
  if (href) {
    return <Link href={href} onClick={onClick} className="block w-full">{content}</Link>;
  }

  return <div onClick={onClick} className={`w-full ${onClick ? 'cursor-pointer' : ''}`}>{content}</div>;
}