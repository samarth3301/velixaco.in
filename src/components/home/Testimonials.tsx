"use client";

import Image from "next/image";

export const Testimonials = () => {
  return (
    <section className="min-h-screen flex items-center justify-center p-8 bg-[#F7F8F0] overflow-hidden">
      <div className="relative w-full max-w-6xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-16">
        
        {/* Left Side: Testimonial Cards */}
        <div className="flex-1 flex flex-col gap-8 z-10 w-full lg:w-auto">
          
          {/* Card 1 */}
          <div className="bg-white border border-gray-100 p-8 rounded-[32px] shadow-sm max-w-lg">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-4">
                <Image src="/avatar1.png" alt="Ilham Basikal" width={56} height={56} className="rounded-full object-cover grayscale-[0.2]" />
                <div>
                  <h4 className="text-darkest-green font-bold text-lg leading-tight">Ilham Basikal</h4>
                  <p className="text-gray-400 text-sm">Customer</p>
                </div>
              </div>
              <div className="flex items-center gap-1.5 bg-white border border-gray-100 px-3 py-1.5 rounded-full">
                <span className="text-yellow-500 text-xs">★</span>
                <span className="font-bold text-xs text-darkest-green">4.5</span>
              </div>
            </div>
            <p className="text-gray-500 leading-relaxed text-[15px]">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus vitae sapien id metus consequat sodales id eu nisl.
            </p>
          </div>

          {/* Card 2 */}
          <div className="bg-white border border-gray-100 p-8 rounded-[32px] shadow-sm max-w-lg">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-4">
                <Image src="/avatar2.png" alt="Yanto Grafitasi" width={56} height={56} className="rounded-full object-cover" />
                <div>
                  <h4 className="text-darkest-green font-bold text-lg leading-tight">Yanto Grafitasi</h4>
                  <p className="text-gray-400 text-sm">Customer</p>
                </div>
              </div>
              <div className="flex items-center gap-1.5 bg-white border border-gray-100 px-3 py-1.5 rounded-full">
                <span className="text-yellow-500 text-xs">★</span>
                <span className="font-bold text-xs text-darkest-green">4.5</span>
              </div>
            </div>
            <p className="text-gray-500 leading-relaxed text-[15px]">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus vitae sapien id metus consequat sodales id eu nisl.
            </p>
          </div>

        </div>

        {/* Right Side: Model + Shape */}
        <div className="relative flex-1 flex justify-end items-end h-[500px] md:h-[600px] lg:h-[650px] w-full mt-12 lg:mt-0">
          {/* Abstract Green Shape */}
          <div className="absolute right-0 bottom-0 w-[95%] lg:w-[85%] h-[90%] bg-darkest-green rounded-tl-[160px] lg:rounded-tl-[240px] z-0"></div>
          
          {/* Model Image Wrapper to Center in Box */}
          <div className="absolute right-0 bottom-0 w-[95%] lg:w-[85%] h-full flex justify-center items-end z-10">
            <div className="relative w-full h-[85%]">
                <Image src="/banner_man.png" alt="Male Model Viewing Watch" fill className="object-contain object-bottom drop-shadow-2xl" />
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
