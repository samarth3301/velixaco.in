"use client";

import Image from "next/image";

export const Hero = () => {
  return (
    <section className="relative w-full h-screen bg-darkest-green overflow-hidden flex items-center justify-center">
      
      {/* Luxury Radial Glow */}
      <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.05)_0%,transparent_60%)]"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] bg-white/5 rounded-full blur-[120px] pointer-events-none"></div>

      {/* Main Hero Composition */}
      <div className="relative z-10 w-full max-w-[1600px] flex flex-col items-center justify-center -translate-y-12">
        
        {/* Symmetrical Watch Gallery */}
        <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex items-center justify-between px-20 lg:px-40 w-full pointer-events-none">
          
          {/* Left Side Watches */}
          <div className="flex flex-col gap-24 lg:gap-32 pointer-events-auto">
            <div className="relative w-48 lg:w-64 h-64 animate-float hover:scale-110 transition-transform duration-700 cursor-pointer">
              <Image src="/hero_3.png" alt="Watch Left Top" fill className="object-contain drop-shadow-[0_20px_40px_rgba(0,0,0,0.4)]" />
            </div>
            <div className="relative w-48 lg:w-64 h-64 animate-float-delayed hover:scale-110 transition-transform duration-700 cursor-pointer">
              <Image src="/hero_4.png" alt="Watch Left Bottom" fill className="object-contain drop-shadow-[0_20px_40px_rgba(0,0,0,0.4)]" />
            </div>
          </div>

          {/* Right Side Watches */}
          <div className="flex flex-col gap-24 lg:gap-32 pointer-events-auto">
            <div className="relative w-48 lg:w-64 h-64 animate-float-medium hover:scale-110 transition-transform duration-700 cursor-pointer">
              <Image src="/hero_7.png" alt="Watch Right Top" fill className="object-contain drop-shadow-[0_20px_40px_rgba(0,0,0,0.4)]" />
            </div>
            <div className="relative w-48 lg:w-64 h-64 animate-float-slow-delayed hover:scale-110 transition-transform duration-700 cursor-pointer">
              <Image src="/hero_5.png" alt="Watch Right Bottom" fill className="object-contain drop-shadow-[0_20px_40px_rgba(0,0,0,0.4)]" />
            </div>
          </div>

        </div>

        {/* Center Branding */}
        <div className="relative flex flex-col items-center gap-8 select-none">
          {/* Low Opacity Background Watch */}
          <div className="absolute -top-12 left-1/2 -translate-x-1/2 opacity-[0.03] blur-sm scale-150 rotate-45 pointer-events-none">
            <div className="relative w-96 h-96">
                <Image src="/hero_3.png" alt="Subtle Backdrop" fill className="object-contain grayscale" />
            </div>
          </div>
          
          <h1 className="font-outfit text-[12vw] font-black text-[#F4F4EB] leading-none tracking-tight drop-shadow-[0_25px_60px_rgba(0,0,0,0.2)]">
            VELIXACO
          </h1>
          <p className="text-white/60 text-xl md:text-2xl font-medium tracking-[0.4em] uppercase -mt-4">
            Luxury Timepieces
          </p>
        </div>

      </div>

    </section>
  );
};
