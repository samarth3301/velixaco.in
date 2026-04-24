"use client";

import Image from "next/image";
import Link from "next/link";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { useCart } from "@/context/CartContext";
import { CheckCircle, Star, Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";

export default function CartPage() {
  const { cart, removeFromCart, updateQty, cartCount, clearCart } = useCart();

  const totalPrice = cart.reduce((acc, item) => {
    const priceNum = parseFloat(item.price.replace(/[^\d.]/g, "")) || 0;
    return acc + priceNum * item.qty;
  }, 0);

  const formattedTotal = "₹" + totalPrice.toLocaleString("en-IN");

  return (
    <div className="inter outline-none bg-soft-beige min-h-screen flex flex-col">
      <Header variant="light" />

      <main className="pt-32 pb-24 px-6 md:px-12 max-w-[1700px] mx-auto flex-1 w-full">
        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* LEFT COLUMN: CART ITEMS (70%) */}
          <div className="flex-1">
            
            <div className="bg-white rounded-[32px] p-8 md:p-12 shadow-sm min-h-[400px]">
              <h1 className="text-3xl font-bold text-darkest-green mb-1">Shopping Cart</h1>
              <button 
                className="text-xs text-blue-600 font-medium hover:underline mb-8" 
                onClick={clearCart}
              >
                Deselect all items
              </button>
              
              {cart.length === 0 ? (
                <div className="flex flex-col md:flex-row items-center gap-12 py-10">
                  <div className="w-full md:w-3/5 group cursor-pointer">
                    <Link href="/">
                      <div className="relative aspect-[16/9] w-full transform group-hover:scale-[1.02] transition-transform duration-500">
                        <Image src="/empty_cart.png" alt="Your Cart is Empty" fill className="object-contain" />
                      </div>
                    </Link>
                  </div>
                  <div className="w-full md:w-2/5 text-center md:text-left pr-8">
                    <h2 className="font-outfit text-4xl font-black text-darkest-green mb-4">Your Velixaco Cart is empty</h2>
                    <p className="text-gray-500 mb-8 max-w-sm">Fine horology is an investment in time. Begin your journey today with our curated masterworks.</p>
                    <div className="flex flex-col gap-4">
                      <Link href="/" className="bg-darkest-green text-white px-8 py-4 rounded-full font-black hover:bg-black transition-all text-center text-[11px] uppercase tracking-widest shadow-lg">
                        Shop current masterworks
                      </Link>
                      <div className="flex gap-4">
                        <Link href="/profile" className="flex-1 bg-darkest-green text-white px-4 py-4 rounded-full font-black hover:bg-black transition-all text-center text-[10px] uppercase tracking-widest">
                          Sign in
                        </Link>
                        <Link href="/profile" className="flex-1 bg-transparent border-2 border-darkest-green text-darkest-green px-4 py-4 rounded-full font-black hover:bg-darkest-green hover:text-white transition-all text-center text-[10px] uppercase tracking-widest">
                          Register account
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="space-y-8">
                  {cart.map((item) => (
                    <div key={item.id} className="flex flex-col md:flex-row gap-8 items-start py-6 border-b border-gray-100 last:border-b-0 animate-fadeIn">
                      <div className="w-full md:w-44 aspect-square bg-soft-beige rounded-2xl flex items-center justify-center p-4 relative">
                        <Link href={`/product/${item.id}`} className="block w-full h-full relative">
                          <Image src={item.img} alt={item.name} fill className="object-contain hover:scale-110 transition-transform duration-500" />
                        </Link>
                      </div>
                      <div className="flex-1 space-y-2">
                        <div className="flex justify-between items-start">
                          <Link href={`/product/${item.id}`}>
                            <h3 className="text-xl font-bold text-darkest-green hover:text-blue-600 transition-colors">{item.name}</h3>
                          </Link>
                          <p className="text-xl font-bold text-darkest-green">{item.price}</p>
                        </div>
                        <p className="text-[10px] text-green-700 font-bold uppercase tracking-widest">In Stock</p>
                        <p className="text-[11px] text-gray-400">Eligible for FREE Shipping</p>
                        <div className="flex items-center gap-6 pt-4">
                          <div className="flex items-center bg-gray-50 border border-gray-200 rounded-lg overflow-hidden h-10">
                            <button 
                              onClick={() => updateQty(item.id, item.qty - 1)}
                              className="px-3 hover:bg-gray-100 transition-all font-bold text-gray-500"
                            >
                              -
                            </button>
                            <span className="w-10 text-center bg-transparent text-sm font-bold text-darkest-green">
                              {item.qty}
                            </span>
                            <button 
                              onClick={() => updateQty(item.id, item.qty + 1)}
                              className="px-3 hover:bg-gray-100 transition-all font-bold text-gray-500"
                            >
                              +
                            </button>
                          </div>
                          <div className="h-4 w-[1px] bg-gray-200"></div>
                          <button 
                            onClick={() => removeFromCart(item.id)}
                            className="text-xs text-blue-600 hover:underline flex items-center gap-1"
                          >
                            <Trash2 className="w-3 h-3" /> Delete
                          </button>
                          <div className="h-4 w-[1px] bg-gray-200"></div>
                          <button className="text-xs text-blue-600 hover:underline">Save for later</button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {cart.length > 0 && (
                <div className="mt-12 pt-8 border-t border-gray-100 flex justify-end">
                  <p className="text-xl font-medium text-darkest-green">
                    Subtotal ({cartCount} items): <span className="font-bold">{formattedTotal}</span>
                  </p>
                </div>
              )}
            </div>

            <p className="mt-8 text-[11px] text-black font-medium leading-relaxed px-6 opacity-80 uppercase tracking-wider">
              The price and availability of items at Velixaco.in are subject to change. The shopping cart is a temporary place to store a list of your items and reflects each item's most recent price. Do you have a gift card or promotional code? We’ll ask you to enter your claim code when it’s time to pay.
            </p>
          </div>

          {/* RIGHT COLUMN: SIDEBAR (30%) */}
          <div className="w-full lg:w-[380px]">
            <div className="sticky top-32 space-y-8 z-40">
              {/* CHECKOUT CARD */}
              <div className={cn(
                "bg-gradient-to-br from-[#004225] to-[#012e1a] rounded-[32px] p-8 shadow-[0_40px_80px_rgba(0,0,0,0.5)] border border-white/20 relative overflow-hidden transition-opacity",
                cart.length === 0 && "opacity-50 pointer-events-none"
              )}>
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.05),transparent)]"></div>
                
                <div className="relative z-10">
                  <div className="flex items-center gap-2 text-[#4ADE80] mb-6">
                    <CheckCircle className="w-5 h-5 drop-shadow-sm" />
                    <span className="text-[11px] font-black uppercase tracking-[0.2em] drop-shadow-sm">Free Shipping Active</span>
                  </div>
                  <p className="text-[12px] font-bold text-white uppercase tracking-widest mb-1 opacity-60">Portfolio Valuation</p>
                  <div className="flex items-baseline gap-2 mb-8">
                    <p className="text-4xl md:text-5xl lg:text-6xl font-black text-white tracking-tighter">{formattedTotal}</p>
                    <span className="text-[12px] font-black text-[#4ADE80] uppercase tracking-widest">INR</span>
                  </div>
                  
                  <div className="flex items-start gap-4 mb-8 bg-white/5 p-5 rounded-2xl border border-white/10 backdrop-blur-sm">
                    <input type="checkbox" id="gift" className="mt-1 w-5 h-5 rounded border-white/30 bg-transparent text-[#4ADE80] focus:ring-[#4ADE80] cursor-pointer" />
                    <label htmlFor="gift" className="text-[11px] text-white leading-relaxed font-semibold cursor-pointer">This selection is a premium gift. Include a personalized certificate.</label>
                  </div>

                  <Link href="/checkout" className="w-full bg-white text-[#004225] py-5 rounded-full font-black flex items-center justify-center gap-2 hover:bg-[#F4F0EA] transition-all shadow-2xl active:scale-95 text-[12px] uppercase tracking-[0.2em]">
                    Secure Checkout
                  </Link>
                </div>
              </div>
            </div>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}
