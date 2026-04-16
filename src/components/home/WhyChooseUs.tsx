"use client";

import Image from "next/image";

export const WhyChooseUs = () => {
  return (
    <section className="relative w-full overflow-hidden">
      {/* Split Background */}
      <div className="absolute inset-0 z-0">
        <div className="h-[20%] bg-[#F7F8F0]"></div>
        <div className="h-[80%] bg-darkest-green"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 py-24 flex flex-col items-center">
        
        {/* Heading */}
        <h2 className="font-outfit text-5xl md:text-7xl font-black text-darkest-green text-center mb-12 lg:mb-20 tracking-tight uppercase">
          WHY CHOOSE US
        </h2>

        <div className="relative w-full flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-0">
          
          {/* Left Cards */}
          <div className="flex flex-col gap-16 lg:gap-32 w-full lg:w-1/3 z-20">
            <div className="bg-[#F7F8F0] shadow-sm border border-darkest-green/10 p-8 rounded-[24px] transform hover:-translate-y-1 transition-transform">
              <h3 className="text-darkest-green font-bold text-xl mb-3">Trend Meets Comfort</h3>
              <p className="text-darkest-green/80 text-sm leading-relaxed font-medium">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus vitae sapien id metus consequat sodales id eu nisl.
              </p>
            </div>
            <div className="bg-[#F7F8F0] shadow-sm border border-darkest-green/10 p-8 rounded-[24px] transform hover:-translate-y-1 transition-transform">
              <h3 className="text-darkest-green font-bold text-xl mb-3">Exclusive Designs</h3>
              <p className="text-darkest-green/80 text-sm leading-relaxed font-medium">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus vitae sapien id metus consequat sodales id eu nisl.
              </p>
            </div>
          </div>

          {/* Center Image (Ruby Watch) */}
          <div className="relative w-full lg:w-1/3 h-[400px] md:h-[500px] lg:h-[600px] flex justify-center py-8 lg:py-0 z-30 translate-y-4 lg:translate-y-0 scale-110 md:scale-[1.15]">
            <Image src="/ruby_watch.png" alt="Ruby Red Luxury Watch" fill className="object-contain drop-shadow-2xl" />
          </div>

          {/* Right Cards */}
          <div className="flex flex-col gap-16 lg:gap-32 w-full lg:w-1/3 z-20">
            <div className="bg-[#F7F8F0] shadow-sm border border-darkest-green/10 p-8 rounded-[24px] transform hover:-translate-y-1 transition-transform">
              <h3 className="text-darkest-green font-bold text-xl mb-3 text-center md:text-right">Premium Quality</h3>
              <p className="text-darkest-green/80 text-sm leading-relaxed font-medium text-center md:text-right">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus vitae sapien id metus consequat sodales id eu nisl.
              </p>
            </div>
            <div className="bg-[#F7F8F0] shadow-sm border border-darkest-green/10 p-8 rounded-[24px] transform hover:-translate-y-1 transition-transform">
              <h3 className="text-darkest-green font-bold text-xl mb-3 text-center md:text-right">Fast & Secure Shopping</h3>
              <p className="text-darkest-green/80 text-sm leading-relaxed font-medium text-center md:text-right">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus vitae sapien id metus consequat sodales id eu nisl.
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
