"use client";

import Link from "next/link";
import { User, MessageSquare, Key } from "lucide-react";

export default function SecurityPage() {
  return (
    <div className="inter outline-none bg-white md:bg-soft-beige min-h-screen flex flex-col items-center">
      {/* SIMPLE BRAND HEADER */}
      <header className="py-12 flex justify-center">
        <Link href="/" className="font-outfit text-4xl font-black text-darkest-green tracking-tighter uppercase">
          Velixaco
        </Link>
      </header>

      {/* SECURITY CONTENT */}
      <main className="max-w-md mx-auto px-6 pb-24 w-full">
        <div className="bg-white rounded-[48px] p-10 md:shadow-[0_60px_100px_-20px_rgba(26,46,28,0.12)] border border-gray-100">
          <h1 className="text-4xl font-black text-black font-outfit tracking-tight mb-10 text-center md:text-left">Verify mobile number</h1>

          {/* User Identity Box */}
          <div className="flex items-center justify-between p-5 bg-soft-beige rounded-3xl border border-gray-100 mb-10">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center text-black border border-gray-200">
                <User className="w-7 h-7" />
              </div>
              <div>
                <p className="text-base font-bold text-black">Parth Arora</p>
                <p className="text-[13px] text-gray-700 font-medium">+91 8700383626</p>
              </div>
            </div>
            <button className="text-[12px] font-black text-black hover:opacity-60 transition-opacity uppercase tracking-widest font-outfit">Switch</button>
          </div>

          {/* Instructions */}
          <p className="text-[15px] text-black font-medium leading-relaxed mb-8">
            Enter the One Time Password (OTP) that we sent to your verified mobile device to confirm your identity.
          </p>

          {/* OTP FORM */}
          <form className="space-y-8">
            <div>
              <label htmlFor="otp" className="block text-xs font-black uppercase tracking-[0.2em] text-black mb-4 ml-1">Enter OTP</label>
              <input 
                type="text" 
                id="otp" 
                placeholder="6-digit code" 
                className="w-full px-6 py-5 border-2 border-gray-100 bg-gray-50 rounded-2xl outline-none transition-all text-2xl tracking-[0.25em] font-black text-center text-black focus:border-darkest-green focus:bg-white" 
              />
            </div>

            <button 
              type="submit" 
              className="w-full bg-darkest-green text-white py-6 rounded-full font-black text-[14px] uppercase tracking-[0.25em] shadow-2xl hover:translate-y-[-2px] active:scale-95 transition-all font-outfit"
            >
              Verify mobile number
            </button>
          </form>

          {/* RESEND */}
          <div className="mt-10 text-center">
            <button className="text-[13px] text-black font-black uppercase tracking-widest hover:opacity-60 transition-opacity font-outfit">Resend OTP</button>
          </div>

          {/* DIVIDER */}
          <div className="relative py-10">
            <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-gray-100"></div></div>
            <div className="relative flex justify-center text-[11px] font-bold uppercase tracking-widest text-black bg-white px-4">or</div>
          </div>

          {/* SECONDARY ACTIONS */}
          <div className="space-y-4">
            <button className="w-full py-4 border-2 border-gray-100 rounded-full font-bold text-sm text-black hover:bg-gray-50 transition-all flex items-center justify-center gap-3 font-outfit">
              <MessageSquare className="w-4 h-4 text-black" />
              Send OTP to WhatsApp
            </button>
            <button className="w-full py-4 border-2 border-gray-100 rounded-full font-bold text-sm text-black hover:bg-gray-50 transition-all flex items-center justify-center gap-3 font-outfit">
              <Key className="w-4 h-4 text-black" />
              Sign in with a passkey
            </button>
          </div>
        </div>

        {/* FOOTER LINKS */}
        <div className="mt-12 flex flex-wrap justify-center gap-6 text-[11px] text-black font-black uppercase tracking-widest font-outfit">
          <Link href="#" className="hover:underline">Conditions of Use</Link>
          <Link href="#" className="hover:underline">Privacy Notice</Link>
          <Link href="#" className="hover:underline">Help</Link>
        </div>
        <p className="mt-6 text-center text-[10px] text-black font-bold uppercase tracking-widest opacity-60 font-outfit">© 2026 Velixaco Horology Platform</p>
      </main>
    </div>
  );
}
