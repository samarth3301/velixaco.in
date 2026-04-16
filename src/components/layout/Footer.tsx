"use client";

import Link from "next/link";
import { Phone, MapPin, Mail, Tv, Camera, Link as LinkIcon } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="bg-footer-bg text-white rounded-t-[48px] relative overflow-hidden mt-20">
      
      {/* LAYER 1: BIG BACKGROUND TEXT */}
      <div className="absolute bottom-[2%] left-1/2 -translate-x-1/2 
                  w-full text-center font-outfit text-[8rem] md:text-[12rem] lg:text-[16rem] font-black text-footer-text tracking-[-0.06em]
                  leading-none whitespace-nowrap
                  z-0 pointer-events-none select-none uppercase opacity-95">
        VELIXACO
      </div>

      {/* LAYER 2: MAIN CONTENT */}
      <div className="relative z-20 w-full px-8 md:px-12 lg:px-16 pt-24 pb-72 
                  flex flex-col items-center text-center gap-16">

        {/* CONTENT BLOCK */}
        <div className="relative z-30 w-full max-w-4xl flex flex-col items-center">

          {/* LINKS */}
          <div className="flex flex-wrap justify-between w-full h-full gap-8 text-left">
            
            {/* Navigation */}
            <div className="min-w-[120px]">
              <h3 className="text-[15px] font-semibold mb-6 text-white font-inter uppercase tracking-wider">Navigation</h3>
              <ul className="space-y-3.5 text-[#9a9a9a] text-[14px]">
                <li className="hover:text-white cursor-pointer transition-colors"><Link href="/">Home</Link></li>
                <li className="hover:text-white cursor-pointer transition-colors"><Link href="/services">Services</Link></li>
                <li className="hover:text-white cursor-pointer transition-colors"><Link href="/about">About Us</Link></li>
                <li className="hover:text-white cursor-pointer transition-colors"><Link href="/contact">Contact Us</Link></li>
              </ul>
            </div>

            {/* Quick Links */}
            <div className="min-w-[120px]">
              <h3 className="text-[15px] font-semibold mb-6 text-white font-inter uppercase tracking-wider">Quick Links</h3>
              <ul className="space-y-3.5 text-[#9a9a9a] text-[14px]">
                <li className="hover:text-white cursor-pointer transition-colors">FAQ</li>
                <li className="hover:text-white cursor-pointer transition-colors">Digital Atelier</li>
                <li className="hover:text-white cursor-pointer transition-colors">Privacy Policy</li>
                <li className="hover:text-white cursor-pointer transition-colors">Terms of Service</li>
              </ul>
            </div>

            {/* Information */}
            <div className="min-w-[200px]">
              <h3 className="text-[15px] font-semibold mb-6 text-white font-inter uppercase tracking-wider">Information</h3>
              <ul className="space-y-4 text-[#9a9a9a] text-[14px] mb-8">
                <li className="flex items-center gap-3"><Phone className="w-4 h-4 text-white/50" /> +41 22 123 4567</li>
                <li className="flex items-center gap-3"><MapPin className="w-4 h-4 text-white/50" /> 123 Horology Lane, Geneva</li>
                <li className="flex items-center gap-3"><Mail className="w-4 h-4 text-white/50" /> concierge@velixaco.in</li>
              </ul>
              
              {/* Social Icons */}
              <div className="flex gap-6 text-white items-center justify-start mt-2">
                <a href="#" className="hover:text-gray-300 transition-colors">
                  <svg viewBox="0 0 24 24" fill="currentColor" className="w-[18px] h-[18px]"><path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z"/></svg>
                </a>
                <a href="#" className="hover:text-gray-300 transition-colors"><Tv className="w-[18px] h-[18px]" /></a>
                <a href="#" className="hover:text-gray-300 transition-colors"><Camera className="w-[18px] h-[18px]" /></a>
                <a href="#" className="hover:text-gray-300 transition-colors"><LinkIcon className="w-[18px] h-[18px]" /></a>
              </div>
            </div>
          </div>

          {/* NEWSLETTER */}
          <div className="mt-16 relative w-full lg:max-w-[480px] z-40">
            <input 
              type="email" 
              placeholder="Email" 
              className="w-full bg-transparent border border-gray-700 rounded-full pl-6 pr-36 py-4 text-[14px] outline-none text-white placeholder-gray-500 hover:border-gray-500 focus:border-white transition-colors"
            />
            <button 
              className="absolute right-1.5 top-1/2 -translate-y-1/2 bg-white hover:bg-gray-100 px-10 py-[12px] rounded-full text-[15px] font-black shadow-xl transition-all active:scale-95 z-50 text-darkest-green uppercase tracking-widest"
            >
              SUBMIT
            </button>
          </div>

        </div>
      </div>
    </footer>
  );
};
