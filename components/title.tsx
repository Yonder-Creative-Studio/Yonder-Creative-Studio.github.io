'use client';

// import Link from "next/link";

interface TitleProps {
  title: string;
}

export default function Title({ title }: TitleProps) {
  return (
    <div className="inline-block bg-[#2B2B38]/2 text-[#2B2B38] px-4 py-1 text-md font-bold mb-4 shadow-sm">
      {title}
    </div>
  );
}