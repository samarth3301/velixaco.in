"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Plus, ChevronLeft, ChevronRight, Star } from "lucide-react";
import { cn } from "@/lib/utils";

export default function AddressesPage() {
  return (
    <div className="inter outline-none bg-white min-h-screen flex flex-col">
      <Header variant="light" />

      <main className="pt-40 pb-24 px-6 md:px-12 max-w-7xl mx-auto flex-1 w-full">
        
        {/* BREADCRUMBS */}
        <nav className="flex items-center gap-2 text-[13px] mb-8">
          <Link href="/profile" className="text-black hover:text-red-700 hover:underline">Your Account</Link>
          <span className="text-black">›</span>
          <span className="text-black font-semibold">Your Addresses</span>
        </nav>

        <h1 className="text-3xl font-bold text-black font-inter mb-12">Your Addresses</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-24">
          
          {/* ADD ADDRESS BOX */}
          <button className="group border-2 border-dashed border-gray-300 rounded-[24px] p-8 flex flex-col items-center justify-center gap-4 hover:border-darkest-green hover:bg-soft-beige transition-all min-h-[280px]">
            <div className="w-16 h-16 rounded-full flex items-center justify-center text-gray-300 group-hover:text-darkest-green transition-colors">
              <Plus className="w-12 h-12 stroke-[1px]" />
            </div>
            <h3 className="text-2xl font-bold text-gray-400 group-hover:text-darkest-green font-inter">Add address</h3>
          </button>

          {/* Existing Address */}
          <div className="bg-white rounded-[24px] p-8 border border-gray-200 shadow-sm flex flex-col min-h-[280px]">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-4">
                <span className="text-[10px] font-black uppercase text-gray-400 tracking-widest">Default</span>
                <hr className="flex-1 border-gray-100" />
              </div>
              <h4 className="text-lg font-bold text-black mb-1">Parth Arora</h4>
              <p className="text-sm text-black font-medium leading-relaxed">
                123 Horology Lane<br />
                Emerald District, Sector 44<br />
                Geneva, Switzerland 1211<br />
                Phone: +41 22 123 4567
              </p>
            </div>
            <div className="pt-6 flex gap-4 border-t border-gray-100">
              <button className="text-[12px] font-bold text-blue-700 hover:underline">Edit</button>
              <span className="text-gray-200">|</span>
              <button className="text-[12px] font-bold text-blue-700 hover:underline">Remove</button>
              <span className="text-gray-200">|</span>
              <button className="text-[12px] font-bold text-blue-700 hover:underline">Set as Default</button>
            </div>
          </div>

        </div>


      </main>

      <Footer />
    </div>
  );
}
