"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Lock, CheckCircle, Banknote, CreditCard, Smartphone, ChevronUp } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";

export default function CheckoutPage() {
  const { cart, cartCount, clearCart } = useCart();
  const router = useRouter();
  
  const [addressVerified, setAddressVerified] = useState(false);
  const [paymentSelected, setPaymentSelected] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);

  const totalPrice = cart.reduce((acc, item) => {
    const priceNum = parseFloat(item.price.replace(/[^\d.]/g, "")) || 0;
    return acc + priceNum * item.qty;
  }, 0);

  const formattedTotal = "₹" + totalPrice.toLocaleString("en-IN") + ".00";

  const handlePlaceOrder = () => {
    if (cart.length === 0) return;
    
    const orders = JSON.parse(localStorage.getItem("velixaco-orders") || "[]");
    const newOrder = {
      id: "403-" + Math.floor(Math.random() * 1000000) + "-" + Math.floor(Math.random() * 1000000),
      date: new Date().toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" }),
      total: formattedTotal,
      status: "Arriving Friday",
      items: cart
    };

    orders.unshift(newOrder);
    localStorage.setItem("velixaco-orders", JSON.stringify(orders));
    clearCart();
    setOrderPlaced(true);
  };

  return (
    <div className="inter outline-none bg-soft-beige min-h-screen flex flex-col">
      {/* SIMPLE CHECKOUT HEADER */}
      <header className="bg-white border-b border-gray-200 py-6 px-6 md:px-12 flex items-center justify-between sticky top-0 z-[100]">
        <Link href="/" className="font-outfit text-3xl font-black text-darkest-green tracking-tighter uppercase leading-none">Velixaco</Link>
        <h1 className="text-2xl font-bold text-black hidden md:block">Checkout</h1>
        <div className="flex items-center gap-2">
          <Lock className="w-5 h-5 text-gray-400" />
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-12 flex flex-col lg:flex-row gap-12 flex-1 w-full">
        
        {/* LEFT: CHECKOUT STEPS */}
        <div className="flex-1 bg-white rounded-3xl p-8 shadow-sm border border-gray-200 h-fit">
          
          {/* STEP 1: DELIVERY ADDRESS */}
          <div className="py-8 border-b border-gray-100">
            <div className="flex items-start justify-between mb-6">
              <div className="flex gap-4">
                <span className="text-lg font-black text-darkest-green">1</span>
                <div>
                  <h2 className="text-xl font-bold text-black mb-1">Add delivery address</h2>
                  <p className="text-xs text-black font-semibold uppercase tracking-widest opacity-60">Enter your address to see delivery options</p>
                </div>
              </div>
            </div>
            
            <div className="ml-8">
              {!addressVerified ? (
                <button 
                  onClick={() => setAddressVerified(true)}
                  className="bg-[#f0c14b] border border-[#a88734] hover:bg-[#f4d078] px-8 py-3 rounded-full text-sm font-bold shadow-sm transition-all text-black"
                >
                  Add a new delivery address
                </button>
              ) : (
                <div className="bg-[#fdfdfd] border border-gray-200 rounded-2xl p-6 shadow-sm animate-fade-slide">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-base font-bold text-black mb-1">Parth Arora</p>
                      <p className="text-sm text-black font-medium leading-relaxed">
                        123 Horology Lane, Emerald District,<br />
                        Sector 44, Geneva, Switzerland 1211<br />
                        Phone: +41 22 123 4567
                      </p>
                      <button 
                        onClick={() => setAddressVerified(false)}
                        className="mt-4 text-[12px] font-bold text-blue-700 hover:underline"
                      >
                        Change address
                      </button>
                    </div>
                    <div className="bg-green-50 text-green-700 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border border-green-100 flex items-center gap-1">
                      <CheckCircle className="w-3 h-3" /> Verified
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* STEP 2: PAYMENT METHOD */}
          <div className={cn(
            "py-8 border-b border-gray-100 transition-opacity duration-500",
            !addressVerified && "opacity-50 pointer-events-none"
          )}>
            <div className="flex gap-4">
              <span className="text-lg font-black text-darkest-green">2</span>
              <h2 className="text-xl font-bold text-black">Payment method</h2>
            </div>
            
            {(addressVerified) && (
              <div className="ml-8 mt-8 space-y-4 animate-fade-slide">
                <label className="flex items-center justify-between p-5 border border-gray-100 bg-soft-beige rounded-2xl cursor-pointer hover:border-darkest-green transition-all group">
                  <div className="flex items-center gap-5">
                    <input type="radio" name="payment" onChange={() => setPaymentSelected(true)} className="w-5 h-5 accent-darkest-green" />
                    <div>
                      <p className="text-[15px] font-bold text-black">Pay on Delivery (Cash/UPI)</p>
                      <p className="text-[11px] text-gray-500 font-medium uppercase tracking-tighter">Scan QR or pay cash at the time of delivery</p>
                    </div>
                  </div>
                  <Banknote className="w-6 h-6 text-black opacity-20 group-hover:opacity-100 transition-opacity" />
                </label>

                <label className="flex items-center justify-between p-5 border border-gray-100 bg-white rounded-2xl cursor-pointer hover:border-darkest-green transition-all group">
                  <div className="flex items-center gap-5">
                    <input type="radio" name="payment" onChange={() => setPaymentSelected(true)} className="w-5 h-5 accent-darkest-green" />
                    <div>
                      <p className="text-[15px] font-bold text-black">Credit or Debit Card</p>
                      <div className="flex gap-2 mt-1">
                        <span className="text-[10px] font-bold text-gray-400">VISA / MASTERCARD</span>
                      </div>
                    </div>
                  </div>
                  <CreditCard className="w-6 h-6 text-black opacity-20 group-hover:opacity-100 transition-opacity" />
                </label>
              </div>
            )}
          </div>

          {/* STEP 3: REVIEW ITEMS */}
          <div className={cn(
            "py-8 transition-opacity duration-500",
            !paymentSelected && "opacity-50 pointer-events-none"
          )}>
            <div className="flex gap-4">
              <span className="text-lg font-black text-darkest-green">3</span>
              <h2 className="text-xl font-bold text-black">Review items and shipping</h2>
            </div>
            
            {paymentSelected && (
              <div className="ml-8 mt-8 animate-fade-slide">
                <div className="p-6 border border-gray-100 rounded-3xl bg-soft-beige/30">
                  <p className="text-sm text-black font-medium leading-relaxed">
                    Your order will be shipped to <span className="font-bold">Parth Arora</span> within <span className="font-bold">24-48 hours</span>.
                  </p>
                </div>
              </div>
            )}
          </div>

        </div>

        {/* RIGHT: ORDER SUMMARY */}
        <div className="w-full lg:w-96 flex flex-col gap-6">
          <div className="bg-white rounded-3xl p-8 border border-gray-200 shadow-sm sticky top-32">
            <button 
              disabled={!paymentSelected || cart.length === 0}
              onClick={handlePlaceOrder}
              className={cn(
                "w-full py-4 rounded-full font-black text-[14px] uppercase tracking-[0.2em] shadow-xl transition-all mb-8 active:scale-95",
                paymentSelected && cart.length > 0 
                  ? "bg-darkest-green text-white hover:opacity-90" 
                  : "bg-gray-200 text-gray-400 cursor-not-allowed"
              )}
            >
              {paymentSelected ? "Place your order" : "Deliver to this address"}
            </button>
            
            <div className="space-y-4 border-t border-gray-100 pt-6">
              <h3 className="text-lg font-bold text-black">Order Summary</h3>
              <div className="flex justify-between text-sm text-black font-medium">
                <span>Items:</span>
                <span>{cartCount}</span>
              </div>
              <div className="flex justify-between text-sm text-black font-medium pb-4 border-b border-gray-50">
                <span>Delivery:</span>
                <span className="text-green-600 font-bold uppercase text-[10px]">Free</span>
              </div>
              <div className="flex justify-between items-baseline pt-2">
                <span className="text-xl font-black text-black">Order Total:</span>
                <span className="text-2xl font-black text-darkest-green">{formattedTotal}</span>
              </div>
            </div>

            <div className="mt-8 p-4 bg-gray-50 rounded-xl border border-gray-100 text-[10px] text-gray-500 font-bold uppercase tracking-widest text-center">
              Secure SSL Encryption Verified
            </div>
          </div>
        </div>

      </main>

      {/* SUCCESS MODAL */}
      {orderPlaced && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center px-6">
          <div className="absolute inset-0 bg-darkest-green/40 backdrop-blur-md"></div>
          <div className="bg-white rounded-[48px] p-12 max-w-lg w-full relative z-[210] shadow-2xl text-center border border-gray-100">
            <div className="w-24 h-24 bg-soft-beige rounded-full flex items-center justify-center mx-auto mb-8 border border-green-100">
              <CheckCircle className="w-12 h-12 text-green-600" />
            </div>
            <h2 className="text-4xl font-black text-black font-outfit mb-4">Order Placed!</h2>
            <p className="text-black font-medium leading-relaxed mb-10">Thank you for your purchase. Your masterpiece is being prepared for its journey.</p>
            <div className="flex flex-col gap-4">
              <Link href="/orders" className="w-full bg-darkest-green text-white py-5 rounded-full font-black text-[13px] uppercase tracking-[0.2em] shadow-xl hover:opacity-90 transition-all">
                View Orders
              </Link>
              <Link href="/" className="w-full py-5 rounded-full font-black text-[13px] uppercase tracking-[0.2em] text-black border-2 border-gray-100 hover:bg-gray-50 transition-all">
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      )}

      <footer className="w-full py-12 bg-footer-bg flex justify-center mt-auto">
        <button 
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="text-white text-sm font-black uppercase tracking-widest hover:opacity-70 transition-opacity flex items-center gap-2"
        >
          <ChevronUp className="w-4 h-4" />
          Back to top
        </button>
      </footer>
    </div>
  );
}
