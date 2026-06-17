'use client';

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger} from "@/components/ui/accordion"
import { MdOutlineMail } from "react-icons/md";
import { FiPhone, FiMapPin } from "react-icons/fi";
import { FaFacebook, FaInstagram, FaGithub } from "react-icons/fa";


import Link from "next/link";

const items = [
  {
    value: "網站設計",
    trigger: "網站設計",
    content:
      "我們提供專業的網站設計服務，幫助您打造獨特且吸引人的線上形象。我們的團隊將與您密切合作，確保您的網站符合您的品牌和業務需求。",
  },
  {
    value: "平面設計",
    trigger: "平面設計",
    content:
      "我們提供專業的平面設計服務，幫助您創造出令人印象深刻的視覺效果。無論是海報、名片還是其他宣傳材料，我們都能為您量身定制，展現您的品牌特色。",
  },
  {
    value: "UI/UX 設計",
    trigger: "UI/UX 設計",
    content:
      "我們提供專業的 UI/UX 設計服務，幫助您創造出直觀且易用的用戶體驗。無論是網站還是應用程式，我們都能為您量身定制，滿足您的業務需求。",
  },
]

export default function Footer() {
 
  return (
    <div className="w-full h-full bg-[#2b2b38] text-gray-400 px-12 py-12 flex flex-col items-center justify-center gap-12">

      {/* information */}
      <div className="w-full h-full flex flex-col md:flex-row items-start justify-center gap-12 md:gap-24 mx-auto">
        <div className="w-full md:w-1/2 h-full flex flex-col justify-center items-center md:items-start">
          <strong className="text-lg mb-2">服務項目</strong>
          <Accordion
            type="single"
            collapsible
            defaultValue="item-1"
            className="w-full"
          >
            {items.map((item) => (
              <AccordionItem 
                key={item.value} 
                value={item.value}
              >
                <AccordionTrigger>{item.trigger}</AccordionTrigger>
                <AccordionContent>{item.content}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
          <div className="pt-4 w-full flex items-center justify-start gap-4">
            <strong>
              <Link href="/about" className="hover:text-white transition-all duration-600">
                關於我們
              </Link>
            </strong>
            <span className="mx-2">|</span>
            <strong>
              <Link href="/about" className="hover:text-white transition-all duration-600">
                文章
              </Link>
            </strong>
            <span className="mx-2">|</span>
            <strong>
              <Link href="/about" className="hover:text-white transition-all duration-600">
                作品集
              </Link>
            </strong>
          </div>
        </div>


        <div className="w-full md:w-1/2 h-full flex flex-col justify-center items-center gap-8">
          <div className="w-full flex flex-col gap-4">
            <strong className="text-lg -mb-1 text-center md:text-left">聯絡資訊</strong>
            <div className="flex items-center gap-4 md:gap-8">
              <MdOutlineMail />
              yondercreative@gmail.com
            </div>
            <div className="flex items-center gap-4 md:gap-8">
              <FiPhone />
              +886 958 543 915
            </div>
            <div className="flex items-center gap-4 md:gap-8">
              <FiMapPin />
              桃園市桃園區
            </div>

            <div className="flex justify-center md:justify-start items-center gap-8 md:gap-12 mt-4">
              <Link href="/" className="hover:text-white transition-all duration-600">
                <FaFacebook />
              </Link>
                <Link href="/" className="hover:text-white transition-all duration-600">
              <FaInstagram />
              </Link>
              <Link href="/" className="hover:text-white transition-all duration-600">
                <FaGithub />
              </Link>          
            </div>

          </div>
        </div>

      </div>
        

      {/* copyright */}
      <div className="flex flex-col items-center justify-center gap-1 text-xs">
        <p>
          &copy; 2026 Yonder Creative Studio 遙創工作室
        </p>
        <p>
          All rights reserved.
        </p>
      </div>

    </div>
  );
}