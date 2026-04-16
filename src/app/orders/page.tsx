"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Search, ChevronDown, ChevronRight, AlertTriangle, Star, ChevronLeft } from "lucide-react";
import { products } from "@/lib/data";
import { cn } from "@/lib/utils";

export default function OrdersPage() {
  const [orders, setOrders] = useState<any[]>([]);
  const [isCancelModalOpen, setIsCancelModalOpen] = useState(false);
  const [orderToCancel, setOrderToCancel] = useState<string | null>(null);

  useEffect(() => {
    const savedOrders = JSON.parse(localStorage.getItem("velixaco-orders") || "[]");
    setOrders(savedOrders);
  }, []);

  const handleCancelOrder = (orderId: string) => {
    setOrderToCancel(orderId);
    setIsCancelModalOpen(true);
  };

  const confirmCancellation = () => {
    if (!orderToCancel) return;
    const updatedOrders = orders.filter((o) => o.id !== orderToCancel);
    localStorage.setItem("velixaco-orders", JSON.stringify(updatedOrders));
    setOrders(updatedOrders);
    setIsCancelModalOpen(false);
    setOrderToCancel(null);
  };

  return (
    <div className="inter outline-none bg-white min-h-screen flex flex-col">
      <Header variant="light" />

      <main className="pt-40 pb-24 px-6 md:px-12 max-w-7xl mx-auto flex-1 w-full">
        {/* BREADCRUMBS */}
        <nav className="flex items-center gap-2 text-[13px] mb-8">
          <Link href="/profile" className="text-black hover:text-red-700 hover:underline">Your Account</Link>
          <span className="text-black">›</span>
          <span className="text-black font-semibold">Your Orders</span>
        </nav>

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
          <h1 className="text-3xl font-bold text-black font-inter">Your Orders</h1>
          
          {/* SEARCH BAR */}
          <div className="flex items-center gap-0 w-full md:w-auto">
            <div className="relative flex-1 md:w-80">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input 
                type="text" 
                placeholder="Search all orders" 
                className="w-full pl-11 pr-4 py-2 border border-gray-300 rounded-l-lg outline-none focus:ring-1 focus:ring-darkest-green" 
              />
            </div>
            <button className="bg-darkest-green text-white px-6 py-2 rounded-r-lg font-bold text-sm hover:opacity-90 transition-all">
              Search Orders
            </button>
          </div>
        </div>

        {/* TABS */}
        <div className="flex items-center gap-8 border-b border-gray-200 mb-8 overflow-x-auto no-scrollbar">
          <button className="pb-3 text-sm border-b-2 border-darkest-green text-black font-bold whitespace-nowrap">Orders</button>
          <button className="pb-3 text-sm text-black hover:text-darkest-green whitespace-nowrap font-medium">Buy Again</button>
          <button className="pb-3 text-sm text-black hover:text-darkest-green whitespace-nowrap font-medium">Not Yet Shipped</button>
          <button className="pb-3 text-sm text-black hover:text-darkest-green whitespace-nowrap font-medium">Cancelled</button>
        </div>

        {/* FILTER LINE */}
        <div className="flex items-center gap-2 text-sm text-black mb-12 font-medium">
          <span className="font-bold text-black">{orders.length} orders</span>
          <span>placed in</span>
          <select className="bg-gray-100 border border-gray-300 rounded-lg px-3 py-1 text-sm outline-none cursor-pointer hover:bg-gray-200">
            <option>past 3 months</option>
            <option>2026</option>
            <option>2025</option>
            <option>past 6 months</option>
          </select>
        </div>

        {orders.length === 0 ? (
          <div className="text-center py-20 border-b border-gray-100">
            <h2 className="text-3xl font-bold text-black mb-4">No orders found</h2>
            <p className="text-black font-bold uppercase tracking-widest text-xs mb-10">Looks like you haven&apos;t placed any orders in 2026.</p>
            <Link href="/" className="inline-block bg-darkest-green text-white px-10 py-4 rounded-full font-black text-[12px] uppercase tracking-[0.2em] shadow-xl hover:opacity-90 transition-all">
              Start Shopping
            </Link>
          </div>
        ) : (
          <div className="space-y-8 mb-12">
            {orders.map((order) => (
              <div key={order.id} className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden animate-fade-slide">
                {/* Order Header */}
                <div className="bg-gray-50 border-b border-gray-200 px-6 md:px-8 py-4 flex flex-wrap items-center justify-between gap-6 text-[11px] font-black uppercase tracking-widest text-black">
                  <div className="flex gap-8 md:gap-12">
                    <div>
                      <p className="opacity-50 mb-1">Order Placed</p>
                      <p>{order.date}</p>
                    </div>
                    <div>
                      <p className="opacity-50 mb-1">Total</p>
                      <p>{order.total}</p>
                    </div>
                    <div>
                      <p className="opacity-50 mb-1">Ship To</p>
                      <Link href="#" className="text-blue-700 hover:underline">Parth Arora</Link>
                    </div>
                  </div>
                  <div className="hidden sm:block">
                    <p className="opacity-50 mb-1">Order # {order.id}</p>
                    <div className="flex gap-2">
                      <Link href="#" className="text-blue-700 hover:underline">View order details</Link>
                      <span className="text-gray-300">|</span>
                      <Link href="#" className="text-blue-700 hover:underline">Invoice</Link>
                    </div>
                  </div>
                </div>

                {/* Order Content */}
                <div className="p-6 md:p-8">
                  <div className="flex flex-col lg:flex-row items-start justify-between gap-8">
                    <div className="space-y-8 flex-1 w-full">
                      <h3 className="text-xl font-black text-black mb-4">{order.status}</h3>
                      {order.items.map((item: any, idx: number) => (
                        <div key={idx} className="flex gap-6 items-center">
                          <div className="w-20 h-20 bg-soft-beige rounded-xl p-2 border border-gray-100 relative">
                            <Image src={item.img} alt={item.name} fill className="object-contain" />
                          </div>
                          <div className="flex-1">
                            <Link href={`/product/${item.id}`}>
                              <h4 className="text-sm font-bold text-black mb-1 hover:text-blue-600 transition-colors">{item.name}</h4>
                            </Link>
                            <p className="text-[11px] text-gray-500 font-medium">Return window closed on 28 Apr 2026</p>
                            <button className="mt-3 bg-darkest-green text-white px-6 py-2 rounded-full font-black text-[10px] uppercase tracking-widest hover:opacity-90 transition-all">Buy it again</button>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="w-full lg:w-64 space-y-3">
                      <button className="w-full py-2.5 border border-gray-300 rounded-full text-[11px] font-black uppercase tracking-widest hover:bg-gray-50 transition-all">Track package</button>
                      <button className="w-full py-2.5 border border-gray-300 rounded-full text-[11px] font-black uppercase tracking-widest hover:bg-gray-50 transition-all">Return or replace items</button>
                      <button className="w-full py-2.5 border border-gray-300 rounded-full text-[11px] font-black uppercase tracking-widest hover:bg-gray-50 transition-all">Share gift receipt</button>
                      <button className="w-full py-2.5 border border-gray-300 rounded-full text-[11px] font-black uppercase tracking-widest hover:bg-gray-50 transition-all">Write a product review</button>
                      <button 
                        onClick={() => handleCancelOrder(order.id)}
                        className="w-full py-2.5 border-2 border-red-100 text-red-600 rounded-full text-[11px] font-black uppercase tracking-widest hover:bg-red-50 transition-all mt-4"
                      >
                        Cancel Order
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        <hr className="border-gray-200 mb-20" />

        {/* BROWSING HISTORY RECOMMENDATIONS */}
        <div>
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-darkest-green font-inter">Inspired by your browsing history</h2>
            <div className="flex gap-2">
              <button className="w-10 h-10 border border-gray-300 rounded-full flex items-center justify-center hover:bg-white transition-all shadow-sm"><ChevronLeft className="w-5 h-5" /></button>
              <button className="w-10 h-10 border border-gray-300 rounded-full flex items-center justify-center hover:bg-white transition-all shadow-sm"><ChevronRight className="w-5 h-5" /></button>
            </div>
          </div>

          <div className="flex gap-8 overflow-x-auto no-scrollbar pb-8">
            {products.slice(0, 6).map((w) => (
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

      {/* CANCELLATION MODAL */}
      {isCancelModalOpen && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center px-6">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-md"></div>
          <div className="bg-white rounded-[40px] p-10 max-w-md w-full relative z-[210] shadow-2xl text-center border border-gray-100 animate-fade-slide">
            <div className="w-20 h-20 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-6 border border-red-100">
              <AlertTriangle className="w-10 h-10 text-red-600" />
            </div>
            <h2 className="text-2xl font-black text-black font-outfit mb-3">Cancel Order?</h2>
            <p className="text-black font-medium leading-relaxed mb-10 text-sm">Are you sure you want to cancel this order? This action will permanently remove it from your history.</p>
            <div className="flex flex-col gap-3">
              <button 
                onClick={confirmCancellation}
                className="w-full bg-red-600 text-white py-4 rounded-full font-black text-[12px] uppercase tracking-[0.2em] shadow-lg hover:bg-red-700 transition-all font-outfit"
              >
                Yes, Cancel Masterpiece
              </button>
              <button 
                onClick={() => setIsCancelModalOpen(false)}
                className="w-full py-4 rounded-full font-black text-[12px] uppercase tracking-[0.2em] text-black border-2 border-gray-100 hover:bg-gray-50 transition-all font-outfit"
              >
                Keep My Order
              </button>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}
