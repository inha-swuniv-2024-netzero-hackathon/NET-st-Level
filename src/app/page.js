import * as React from "react";
import { NextUIProvider } from "@nextui-org/react";
import MainPage from "@/components/MainPage";

export default function Home() {
  return (
      <NextUIProvider>
        <div className='flex justify-center items-center  absolute w-full h-full'>
          <div id="mobile" className='flex flex-col min-h-screen w-[425px] border-2 border-black items-center justify-center'>
            <MainPage />
          </div>
        </div>
      </NextUIProvider>    
  );
}
