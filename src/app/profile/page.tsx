"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Package, Lock, MapPin, Headphones, ChevronLeft, ChevronRight, Star } from "lucide-react";
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

      </main>

      <Footer />
    </div>
  );
}
