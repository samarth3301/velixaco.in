"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Search, Compass, ShieldCheck, Music, Wallet, ChevronRight, Crown } from "lucide-react";

export default function ContactPage() {
  const [recentOrder, setRecentOrder] = useState<any>(null);

  useEffect(() => {
    const orders = JSON.parse(localStorage.getItem("velixaco-orders") || "[]");
    if (orders.length > 0) {
      setRecentOrder(orders[0]);
    }
  }, []);

  return (
    <div className="inter outline-none bg-soft-beige min-h-screen flex flex-col">
      {/* HELP HEADER */}
      <header className="bg-darkest-green text-white pt-24 pb-32 px-6 md:px-12 relative overflow-hidden">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-8 relative z-10">
          <div>
            <h1 className="text-4xl md:text-5xl font-black font-outfit mb-3">Customer Support</h1>
            <p className="text-lg opacity-80 font-medium">Thank you for being a Velixaco customer.</p>
          </div>
          <div className="w-full max-w-xl">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input 
                type="text" 
                placeholder="Ask a support question" 
                className="w-full bg-white text-black py-5 pl-14 pr-6 rounded-xl shadow-2xl outline-none text-lg placeholder:text-gray-400 focus:ring-2 focus:ring-white/20" 
              />
            </div>
          </div>
        </div>
        {/* Decorative background elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl"></div>
      </header>

      <main className="max-w-7xl mx-auto px-6 md:px-12 -mt-16 pb-24 flex flex-col lg:flex-row gap-8 relative z-20 w-full">
        
        {/* LEFT SIDEBAR: QUICK ANSWERS */}
        <aside className="w-full lg:w-80 space-y-4">
          <div className="bg-white rounded-[32px] p-8 border border-gray-100 shadow-sm">
            <h2 className="text-lg font-bold text-black mb-2">Need a quick answer?</h2>
            <p className="text-[11px] text-gray-500 font-bold uppercase tracking-widest mb-6">Read these articles for support.</p>
            
            <select className="w-full border border-gray-200 rounded-xl p-3 text-sm font-medium outline-none mb-8 bg-transparent">
              <option>Recommended topics</option>
              <option>Shipping & Delivery</option>
              <option>Returns & Refunds</option>
            </select>

            <div className="space-y-3">
              <button className="w-full text-left p-4 rounded-2xl border border-gray-100 hover:border-darkest-green transition-all flex flex-col gap-1 shadow-sm bg-white">
                <span className="text-sm font-bold text-black">Track your package</span>
                <span className="text-[10px] text-gray-500">Track packages on Your Orders</span>
              </button>
              <button className="w-full text-left p-4 rounded-2xl border border-gray-100 hover:border-darkest-green transition-all flex flex-col gap-1 shadow-sm bg-white">
                <span className="text-sm font-bold text-black">Shipping speeds & charges</span>
                <span className="text-[10px] text-gray-500">Learn about delivery timelines</span>
              </button>
              <button className="w-full text-left p-4 rounded-2xl border border-gray-100 hover:border-darkest-green transition-all flex flex-col gap-1 shadow-sm bg-white">
                <span className="text-sm font-bold text-black">Return items you ordered</span>
                <span className="text-[10px] text-gray-500">Using our Online Returns Center</span>
              </button>
              <button className="w-full text-left p-4 rounded-2xl border border-gray-100 hover:border-darkest-green transition-all flex flex-col gap-1 shadow-sm bg-white">
                <span className="text-sm font-bold text-black">Status of a refund</span>
                <span className="text-[10px] text-gray-500">Track your refund status</span>
              </button>
            </div>
          </div>
        </aside>

        {/* RIGHT CONTENT: RECENT ACTIVITY & CATEGORIES */}
        <div className="flex-1 space-y-8">
          
          {/* RECENT ORDERS TAB */}
          <div className="bg-white rounded-[40px] p-10 border border-gray-100 shadow-sm">
            <h2 className="text-xl font-bold text-black mb-1">What brings you here today?</h2>
            <p className="text-xs text-black font-semibold uppercase tracking-widest opacity-60 mb-8">You can choose an item or filter by category.</p>
            
            <div className="flex gap-10 border-b border-gray-100 mb-8">
              <button className="pb-4 text-sm font-bold text-darkest-green border-b-4 border-darkest-green">Orders</button>
              <button className="pb-4 text-sm font-bold text-gray-400 hover:text-black transition-colors">Digital Content</button>
            </div>

            <div id="help-orders-container">
              {recentOrder ? (
                <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm animate-fade-slide">
                  <div className="bg-gray-50 p-4 border-b border-gray-200 flex justify-between items-center">
                    <span className="text-[10px] font-black uppercase tracking-widest text-black">Recent Order #{recentOrder.id}</span>
                    <span className="text-[10px] font-black uppercase tracking-widest text-[#007600]">{recentOrder.status}</span>
                  </div>
                  <div className="p-6 flex items-center gap-6">
                    <div className="w-16 h-16 bg-soft-beige rounded-xl p-2 relative">
                      <img 
                        src={recentOrder.items[0].img} 
                        className="w-full h-full object-contain" 
                        alt={recentOrder.items[0].name}
                      />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-sm font-bold text-black">{recentOrder.items[0].name}</h4>
                      <p className="text-[11px] text-gray-400 mt-1">Ordered on {recentOrder.date}</p>
                    </div>
                    <button className="bg-darkest-green text-white px-6 py-2 rounded-full font-black text-[10px] uppercase tracking-widest shadow-md active:scale-95 transition-all">Track Box</button>
                  </div>
                </div>
              ) : (
                <div className="bg-gray-50 rounded-3xl p-12 text-center border border-gray-100 border-dashed">
                  <p className="text-black font-bold uppercase tracking-widest text-[11px] mb-6">You haven&apos;t placed any orders yet.</p>
                  <Link href="/" className="inline-block bg-white border-2 border-gray-200 text-black px-8 py-3 rounded-full font-black text-[12px] uppercase tracking-[0.2em] shadow-sm hover:border-darkest-green transition-all">
                    Start Shopping
                  </Link>
                </div>
              )}
            </div>
            
            <button className="mt-8 text-[13px] font-black text-darkest-green uppercase tracking-widest flex items-center gap-2 hover:opacity-60 transition-all">
              Load more <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* CATEGORY GRID */}
          <div>
            <h2 className="text-xl font-bold text-black mb-1">Can&apos;t find what you&apos;re looking for?</h2>
            <p className="text-xs text-black font-semibold uppercase tracking-widest opacity-60 mb-8">We can also solve these common issues.</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Link href="#" className="bg-white p-8 rounded-3xl border border-gray-200 shadow-sm flex items-center gap-6 hover:shadow-xl hover:border-darkest-green transition-all group">
                <div className="w-16 h-16 bg-soft-beige rounded-2xl flex items-center justify-center text-darkest-green border border-gray-100 group-hover:bg-darkest-green group-hover:text-white transition-colors">
                  <Crown className="w-8 h-8" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-black">Managing Elite</h3>
                  <p className="text-[11px] text-gray-500 font-medium uppercase tracking-tighter">Premier member benefits</p>
                </div>
              </Link>
              <Link href="/security" className="bg-white p-8 rounded-3xl border border-gray-200 shadow-sm flex items-center gap-6 hover:shadow-xl hover:border-darkest-green transition-all group">
                <div className="w-16 h-16 bg-soft-beige rounded-2xl flex items-center justify-center text-black border border-gray-100 group-hover:bg-darkest-green group-hover:text-white transition-colors">
                  <ShieldCheck className="w-8 h-8" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-black">Login, Security & Privacy</h3>
                  <p className="text-[11px] text-gray-500 font-medium uppercase tracking-tighter">Edit your credentials</p>
                </div>
              </Link>
              <Link href="#" className="bg-white p-8 rounded-3xl border border-gray-200 shadow-sm flex items-center gap-6 hover:shadow-xl hover:border-darkest-green transition-all group">
                <div className="w-16 h-16 bg-soft-beige rounded-2xl flex items-center justify-center text-blue-600 border border-gray-100 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                  <Music className="w-8 h-8" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-black">Digital Content</h3>
                  <p className="text-[11px] text-gray-500 font-medium uppercase tracking-tighter">Atelier Music & Playlists</p>
                </div>
              </Link>
              <Link href="#" className="bg-white p-8 rounded-3xl border border-gray-200 shadow-sm flex items-center gap-6 hover:shadow-xl hover:border-darkest-green transition-all group">
                <div className="w-16 h-16 bg-soft-beige rounded-2xl flex items-center justify-center text-orange-500 border border-gray-100 group-hover:bg-orange-500 group-hover:text-white transition-colors">
                  <Wallet className="w-8 h-8" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-black">Velixaco Pay</h3>
                  <p className="text-[11px] text-gray-500 font-medium uppercase tracking-tighter">Balances & Transactions</p>
                </div>
              </Link>
            </div>
          </div>

        </div>

      </main>

      {/* NAVIGATION REDIRECTS */}
      <div className="bg-white border-t border-gray-200 py-12 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center bg-darkest-green rounded-3xl md:rounded-full p-6 text-white text-xs font-black uppercase tracking-widest gap-6 text-center">
          <Link href="/" className="hover:underline">Back to Shop</Link>
          <Link href="/profile" className="hover:underline">Your Account</Link>
          <Link href="/orders" className="hover:underline">Order History</Link>
        </div>
      </div>
    </div>
  );
}
