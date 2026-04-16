"use client";

import Image from "next/image";
import Link from "next/link";

export const PromoBanner = () => {
  return (
    <section className="w-full bg-[#F7F8F0] pt-24 pb-12 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="bg-darkest-green rounded-[32px] md:rounded-[48px] overflow-hidden flex flex-col md:flex-row items-center justify-between px-10 md:px-20 py-12 md:py-0 relative h-auto md:h-[350px] shadow-lg">
          
          {/* Left: Text Content */}
          <div className="flex-1 text-white z-10 flex flex-col items-start gap-3 md:gap-5 text-left py-10">
            <h2 className="font-outfit text-[12vw] md:text-[6rem] font-bold leading-none tracking-tight">75%Off</h2>
            <p className="text-xl md:text-3xl font-medium tracking-tight opacity-95">Heat Up the Deals!</p>
            <Link 
              href="/services" 
              className="mt-4 bg-white text-darkest-green font-bold px-8 py-3 rounded-full text-base md:text-lg hover:scale-105 hover:shadow-lg transition-all active:scale-95 shadow-md"
            >
              Click here
            </Link>
          </div>

          {/* Right: Image (Watch) */}
          <div className="flex-1 relative flex justify-end items-center h-full w-full py-8 md:py-0">
            <div className="relative h-[120%] md:h-[130%] w-full flex justify-end translate-x-4 lg:translate-x-12 translate-y-4 md:translate-y-0">
                <Image src="/banner_watch.png" alt="Promo Watch" fill className="object-contain drop-shadow-2xl" />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
