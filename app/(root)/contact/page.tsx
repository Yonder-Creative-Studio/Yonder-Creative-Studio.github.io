"use client";

import Footer from "@/components/footer";
import Title from "@/components/title";
import Image from "next/image";
import { useForm, ValidationError } from "@formspree/react";

import { motion } from "motion/react";

export default function Contact() {
  const [state, handleSubmit] = useForm("mnjykaev");

  return (
    <div className="custom-scrollbar scrollbar-y-auto! scrollbar-x-none!">
      <div className="min-h-screen bg-slate-100 flex flex-col items-center justify-start p-4">
        <div className="pt-16 px-4 h-full w-full">
          <Title title="聯絡我們" />

          {/* 表單與圖片並排容器：手機上下、大螢幕左右 */}
          <motion.div 
              className="flex flex-col lg:flex-row gap-8 justify-center"
              initial={{ opacity: 0, y: 30 }} // 1. 起點：透明且偏下 30px
              animate={{ opacity: 1, y: 0 }}  // 2. 終點：變實且回到原位
              transition={{ duration: 0.6, ease: "easeOut" }} // 3. 過程：跑 0.6 秒，使用平滑曲線
          >
            
            {/* 左側：表單區塊 */}
            <div className="w-full lg:w-1/2 flex flex-col h-full">
              {state.succeeded ? (
                <div className="bg-green-50 border border-green-200 text-green-700 p-6 rounded-md text-center font-medium w-full">
                  感謝您的來信！我們將盡快與您聯絡。
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-4 bg-white p-6 rounded-md shadow-xs w-full border border-slate-200/60">
                  
                  {/* Email 欄位 */}
                  <div className="flex flex-col gap-1">
                    <label htmlFor="email" className="text-sm font-medium text-slate-700">
                      Email
                    </label>
                    <input
                      id="email"
                      type="email"
                      name="email"
                      required
                      className="w-full px-3 py-2 border border-slate-300 rounded-sm focus:outline-hidden focus:border-primary text-sm"
                      placeholder="example@email.com"
                    />
                    <ValidationError 
                      prefix="Email" 
                      field="email" 
                      errors={state.errors} 
                      className="text-xs text-red-500 mt-1" 
                    />
                  </div>

                  {/* 訊息欄位 */}
                  <div className="flex flex-col gap-1">
                    <label htmlFor="message" className="text-sm font-medium text-slate-700">
                      我們能幫你什麼
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      required
                      rows={5}
                      className="w-full px-3 py-2 border border-slate-300 rounded-sm focus:outline-hidden focus:border-primary text-sm resize-none"
                      placeholder="請輸入您想讓我們幫您完成的事項..."
                    />
                    <ValidationError 
                      prefix="Message" 
                      field="message" 
                      errors={state.errors} 
                      className="text-xs text-red-500 mt-1" 
                    />
                  </div>

                  {/* 按鈕 */}
                  <button
                    type="submit"
                    disabled={state.submitting}
                    className="w-full bg-primary hover:bg-primary/80 transition-all duration-600 text-secondary font-medium py-2 px-4 rounded-sm disabled:opacity-50 disabled:cursor-not-allowed text-sm cursor-pointer"
                  >
                    {state.submitting ? "傳送中..." : "送出"}
                  </button>

                </form>
              )}
            </div>

            {/* 右側：圖片區塊 */}
            <div className="w-full lg:w-1/2 relative overflow-hidden rounded-md shadow-xs">
              <Image 
                src="/logo/YC_黑底白字.png"
                alt="logo" 
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover hover:scale-103 transition-transform duration-500 ease-out" 
              />
            </div>

          </motion.div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
