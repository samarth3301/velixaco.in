"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Package, Lock, MapPin, Headphones, ChevronLeft, ChevronRight, Star } from "lucide-react";
import { products } from "@/lib/data";
import { cn } from "@/lib/utils";

export default function ProfilePage() {
  return (
    <div className="inter outline-none bg-soft-beige min-h-screen flex flex-col">
      <Header variant="light" />

      <main className="pt-40 pb-24 px-6 md:px-12 max-w-7xl mx-auto flex-1 w-full">
        <h1 className="text-4xl font-bold text-darkest-green mb-12 font-inter">Your Account</h1>

        {/* DASHBOARD GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-24">
          
          {/* Box 1: Your Orders */}
          <Link href="/orders" className="group bg-white rounded-2xl p-8 border border-gray-200 hover:shadow-lg flex items-start gap-6 transition-all duration-300">
            <div className="w-14 h-14 flex-shrink-0">
              <div className="w-full h-full bg-[#fceec7] rounded-lg flex items-center justify-center border border-[#f3d078]">
                <Package className="w-8 h-8 text-[#8b6e3f] stroke-[2.5px]" />
              </div>
            </div>
            <div>
              <h3 className="text-xl font-medium text-black">Your Orders</h3>
              <p className="text-[13px] text-black font-medium mt-0.5 leading-relaxed">Track, return, or buy things again</p>
            </div>
          </Link>

          {/* Box 2: Login & Security */}
          <Link href="/security" className="group bg-white rounded-2xl p-8 border border-gray-200 hover:shadow-lg flex items-start gap-6 transition-all duration-300">
            <div className="w-14 h-14 flex-shrink-0">
              <div className="w-full h-full bg-gray-100 rounded-lg flex items-center justify-center border border-gray-200">
                <Lock className="w-8 h-8 text-black stroke-[2.5px]" />
              </div>
            </div>
            <div>
              <h3 className="text-xl font-medium text-black">Login & security</h3>
              <p className="text-[13px] text-black font-medium mt-0.5 leading-relaxed">Edit login, name, and mobile number</p>
            </div>
          </Link>

          {/* Box 4: Your Addresses */}
          <Link href="/addresses" className="group bg-white rounded-2xl p-8 border border-gray-200 hover:shadow-lg flex items-start gap-6 transition-all duration-300">
            <div className="w-14 h-14 flex-shrink-0 text-orange-500">
              <div className="w-full h-full flex items-center justify-center">
                <MapPin className="w-12 h-12 fill-orange-500 text-white stroke-[1px]" />
              </div>
            </div>
            <div>
              <h3 className="text-xl font-medium text-black">Your Addresses</h3>
              <p className="text-[13px] text-black font-medium mt-0.5 leading-relaxed">Edit addresses for orders and gifts</p>
            </div>
          </Link>

          {/* Box 8: Contact */}
          <Link href="/contact" className="group bg-white rounded-2xl p-8 border border-gray-200 hover:shadow-lg flex items-start gap-6 transition-all duration-300">
            <div className="w-14 h-14 flex-shrink-0">
              <div className="w-full h-full bg-[#e7f4f4] rounded-lg flex items-center justify-center border border-[#b2dbdb]">
                <Headphones className="w-8 h-8 text-[#4a8a8a] stroke-[2.5px]" />
              </div>
            </div>
            <div>
              <h3 className="text-xl font-medium text-black">Contact Us</h3>
              <p className="text-[13px] text-black font-medium mt-0.5 leading-relaxed">Contact our customer service via phone or chat</p>
            </div>
          </Link>

        </div>

        {/* CAROUSEL */}
        <div className="mt-20">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-darkest-green font-inter">Inspired by your browsing history</h2>
            <div className="flex gap-2">
              <button className="w-10 h-10 border border-gray-300 rounded-full flex items-center justify-center hover:bg-white transition-all shadow-sm"><ChevronLeft className="w-5 h-5" /></button>
              <button className="w-10 h-10 border border-gray-300 rounded-full flex items-center justify-center hover:bg-white transition-all shadow-sm"><ChevronRight className="w-5 h-5" /></button>
            </div>
          </div>

          <div className="flex gap-8 overflow-x-auto no-scrollbar pb-8">
            {products.map((w) => (
              <div key={w.id} className="min-w-[280px] group cursor-pointer">
                <Link href={`/product/${w.id}`}>
                  <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-all flex flex-col h-full">
                    <div className="aspect-square bg-soft-beige rounded-xl flex items-center justify-center p-4 mb-4 relative overflow-hidden">
                      <div className="relative w-[90%] h-full group-hover:scale-110 transition-transform duration-700">
                        <Image src={w.img} alt={w.name} fill className="object-contain" />
                      </div>
                      {w.badge && (
                        <span className="absolute top-3 left-3 bg-red-600 text-[9px] font-black text-white px-2 py-1 rounded-sm uppercase tracking-tighter">
                          {w.badge}
                        </span>
                      )}
                    </div>
                    <div className="flex-1 flex flex-col gap-1 px-1">
                      <h4 className="text-[13px] font-bold text-darkest-green leading-tight group-hover:text-blue-600 transition-colors line-clamp-2">{w.name}</h4>
                      <div className="flex items-center gap-1 mt-1">
                        <div className="flex text-orange-400">
                          {[1, 2, 3, 4, 5].map((s) => (
                            <Star key={s} className={cn("w-3 h-3", s <= 4 && "fill-current")} />
                          ))}
                        </div>
                        <span className="text-[10px] text-gray-400">12,50{w.id}</span>
                      </div>
                      <div className="mt-2 flex items-baseline gap-2">
                        <span className="text-sm font-bold text-red-700">{w.price}</span>
                        {w.oldPrice && <span className="text-[10px] text-gray-400 line-through">{w.oldPrice}</span>}
                      </div>
                      <p className="text-[10px] text-gray-400 mt-1">FREE delivery <span className="font-bold text-gray-600">Tomorrow, 15 Apr</span></p>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>

      </main>

      <Footer />
    </div>
  );
}
