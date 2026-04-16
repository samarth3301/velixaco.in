"use client";

import Image from "next/image";

export const Subscribe = () => {
  return (
    <section className="min-h-screen flex items-center justify-center p-8 bg-[#F7F8F0] relative overflow-hidden">
      <div className="relative flex flex-col items-center justify-center w-full max-w-[1400px] mx-auto px-10">
        
        {/* Top Heading */}
        <h1 className="font-outfit text-[14vw] lg:text-[11rem] font-black text-darkest-green leading-none select-none z-0 transform translate-y-12">
          SUBSCRIBE
        </h1>

        {/* Main Visual: 3D Phone Mockup */}
        <div className="relative w-[80vw] max-w-[550px] z-10 flex items-center justify-center aspect-[4/5]">
          {/* Glow behind phone */}
          <div className="absolute inset-0 bg-green-200 blur-[120px] rounded-full opacity-30"></div>
          <Image 
            src="/phone.png" 
            alt="3D Phone Mockup" 
            fill 
            className="object-contain mix-blend-multiply relative z-10 pointer-events-none drop-shadow-2xl" 
          />
        </div>

        {/* Bottom Heading */}
        <h2 className="font-outfit text-[14vw] lg:text-[11rem] font-black text-darkest-green leading-none select-none z-0 transform -translate-y-12">
          VELIXACO
        </h2>

        {/* Subscribe Button */}
        <div className="mt-12 md:mt-24">
          <button className="bg-deep-green hover:bg-[#2F4531] text-white px-12 py-3.5 rounded-full text-lg font-bold transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-lg font-outfit uppercase tracking-wider">
            Subscribe
          </button>
        </div>
      </div>
    </section>
  );
};
