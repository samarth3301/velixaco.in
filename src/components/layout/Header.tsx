"use client";

import Link from "next/link";
import { ChevronDown, ShoppingBag, User } from "lucide-react";
import { useScroll } from "@/hooks/useScroll";
import { useCart } from "@/context/CartContext";
import { cn } from "@/lib/utils";

interface HeaderProps {
  variant?: "light" | "dark";
}

export const Header = ({ variant = "dark" }: HeaderProps) => {
  const scrolled = useScroll(50);
  const { cartCount } = useCart();
  
  const isDark = variant === "dark";
  
  return (
    <nav
      className={cn(
        "fixed top-0 left-0 w-full z-[100] flex items-center justify-between px-6 md:px-12 py-8 transition-all duration-500",
        scrolled
          ? "bg-darkest-green/90 backdrop-blur-xl py-6 text-white"
          : isDark 
            ? "text-white" 
            : "text-darkest-green bg-soft-beige/80 backdrop-blur-xl border-b border-deep-green/5 shadow-[0_4px_30px_rgba(0,0,0,0.02)]"
      )}
    >
      <div className="flex items-center gap-6 md:gap-10">
        <Link 
          href="/" 
          className="text-sm font-black uppercase tracking-widest opacity-80 hover:opacity-100 transition-opacity"
        >
          Home
        </Link>
        <Link 
          href="/services" 
          className="text-sm font-black uppercase tracking-widest opacity-80 hover:opacity-100 transition-opacity"
        >
          Services
        </Link>
        <Link 
          href="/about" 
          className="text-sm font-black uppercase tracking-widest opacity-80 hover:opacity-100 transition-opacity"
        >
          About
        </Link>
        
        {/* DROPDOWN: PAGES */}
        <div className="group relative py-2">
          <button className="flex items-center gap-2 text-sm font-black uppercase tracking-widest opacity-80 group-hover:opacity-100 transition-all">
            Pages
            <ChevronDown className="w-3 h-3 transition-transform group-hover:rotate-180" />
          </button>
          <div className="absolute top-full left-0 mt-4 w-64 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
            <div className="bg-darkest-green/95 backdrop-blur-xl border border-white/20 rounded-[32px] p-6 shadow-2xl flex flex-col gap-4">
              <Link href="/orders" className="text-[11px] font-black uppercase tracking-[0.4em] text-white/60 hover:text-white hover:translate-x-2 transition-all">Orders</Link>
              <Link href="/contact" className="text-[11px] font-black uppercase tracking-[0.4em] text-white/60 hover:text-white hover:translate-x-2 transition-all">Contact</Link>
              <Link href="/team" className="text-[11px] font-black uppercase tracking-[0.4em] text-white/60 hover:text-white hover:translate-x-2 transition-all">Team</Link>
              <Link href="/terms" className="text-[11px] font-black uppercase tracking-[0.4em] text-white/60 hover:text-white hover:translate-x-2 transition-all">Terms</Link>
            </div>
          </div>
        </div>
      </div>
      
      <div className="flex items-center gap-4 md:gap-6">
        <Link 
          href="/profile" 
          className={cn(
            "p-2 cursor-pointer hover:scale-110 transition-transform opacity-90 hover:opacity-100",
            (isDark || scrolled) ? "text-white" : "text-darkest-green"
          )}
        >
          <User className="w-6 h-6" />
        </Link>
        <Link 
          href="/cart" 
          className={cn(
            "relative p-2 cursor-pointer hover:scale-110 transition-transform opacity-90 hover:opacity-100",
            (isDark || scrolled) ? "text-white" : "text-darkest-green"
          )}
        >
          <ShoppingBag className="w-6 h-6" />
          {cartCount >= 0 && (
            <span className="absolute top-0.5 right-0 bg-red-600 text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold text-white shadow-sm ring-2 ring-darkest-green">
              {cartCount}
            </span>
          )}
        </Link>
      </div>
    </nav>
  );
};
