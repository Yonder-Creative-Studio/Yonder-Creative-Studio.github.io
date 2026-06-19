"use client";

import Footer from "@/components/footer";
import MemberCard from "@/components/memberCard";
import Title from "@/components/title";

import { motion } from "motion/react";

export default function Member() {


   return (
    <div className="custom-scrollbar scrollbar-y-auto! scrollbar-x-none!">
      <div className="min-h-screen bg-slate-100 flex flex-col items-center justify-start p-4">
        <div className="pt-16 px-4 h-full w-full">

                <Title title="成員" />
                
                <motion.div 
                  className="grid grid-cols-1 md:grid-cols-2 gap-4"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                >
                    <MemberCard name="馮妍嘉" jobTitle="創辦人" education="國立政治大學" major="廣告學系 / 數位內容與科技學士學位學程" specialty={["Illustrator", "Photoshop", "Lightroom", "Figma", "Blender", "HTML", "CSS", "Javascript", "React.js", "Tailwind CSS", "Next.js", "p5.js", "python", "c++", "c#"]} href="https://114-2-web-112405033-hw1.vercel.app/" imgSrc="/images/yenchia.jpg" />
                    <MemberCard name="馮妍禎" jobTitle="創辦人" education="國立臺灣大學" major="工商管理學系科技管理組" specialty={["Illustrator", "Photoshop", "Figma", "HTML", "CSS", "Javascript", "React.js", "Vue.js", "Next.js", "Tailwind CSS", "Node.js (Express)", "p5.js", "python", "c++", "SQL"]} href="https://fengyenchen-my-portfolio.vercel.app/" imgSrc="/images/yenchen.jpg" />
                </motion.div>
            </div>
        </div>

          <Footer />
      </div>
    );
}