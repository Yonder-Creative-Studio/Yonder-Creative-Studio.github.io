"use client";

import Footer from "@/components/footer";
import Title from "@/components/title";

import { InputGroup, InputGroupAddon, InputGroupButton, InputGroupInput, InputGroupText, InputGroupTextarea } from "@/components/ui/input-group"
import { SearchIcon } from "lucide-react";

export default function Article() {


  return (
    <div className="custom-scrollbar scrollbar-y-auto! scrollbar-x-none!">
        <div className="relative min-h-screen bg-slate-100 flex flex-col items-center justify-start p-4">
          <div className="absolute top-1/7 left-0 h-full w-full px-8">
            <InputGroup>
              <InputGroupInput placeholder="搜尋文章..." />
                <InputGroupAddon>
                  <SearchIcon />
                </InputGroupAddon>
                <InputGroupAddon align="inline-end">12 results</InputGroupAddon>
            </InputGroup>

            <Title title="文章" />

          </div>
        </div>
        
        <Footer />
    </div>
  );
}