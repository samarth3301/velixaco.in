"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Script from "next/script";
import { Lock, CheckCircle, Banknote, CreditCard, ChevronUp, Loader2 } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/contexts/AuthContext";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";

export default function CheckoutPage() {
  const { cart, cartCount, clearCart } = useCart();
  const { user, authenticated, loading: authLoading } = useAuth();
  const router = useRouter();

  const [addressVerified, setAddressVerified] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<"cod" | "razorpay" | null>(null);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    if (!authLoading && !authenticated) {
      router.push('/login');
    }
  }, [authenticated, authLoading, router]);

  if (authLoading || !authenticated) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }

  const totalPrice = cart.reduce((acc, item) => {
    const priceNum = parseFloat(item.sellingPrice.replace(/[^\d.]/g, "")) || 0;
    return acc + priceNum * item.qty;
  }, 0);

  const formattedTotal = "₹" + totalPrice.toLocaleString("en-IN") + ".00";

  const handlePlaceOrder = async () => {
    if (cart.length === 0 || !paymentMethod) return;
    
    setIsProcessing(true);

    try {
      if (paymentMethod === "razorpay") {
        const response = await fetch("/api/checkout/create-order", {
          method: "POST",
        });
        const orderData = await response.json();

        if (orderData.error) {
          throw new Error(orderData.error);
        }

        const options = {
          key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
          amount: orderData.amount,
          currency: orderData.currency,
          name: "Velixaco",
          description: "Purchase from Velixaco",
          order_id: orderData.id,
          handler: async function (response: any) {
            const verifyRes = await fetch("/api/checkout/verify-payment", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
              }),
            });

            const verifyData = await verifyRes.json();
            if (verifyData.success) {
              completeOrder();
            } else {
              alert("Payment verification failed. Please contact support.");
            }
          },
          prefill: {
            name: user?.name || "",
            email: user?.email || "",
          },
          theme: {
            color: "#0a2e2a",
          },
        };

        const rzp = new (window as any).Razorpay(options);
        rzp.open();
      } else {
        // COD logic
        completeOrder();
      }
    } catch (error) {
      console.error("Checkout error:", error);
      alert("Something went wrong. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  };

  const completeOrder = () => {
    const orders = JSON.parse(localStorage.getItem("velixaco-orders") || "[]");
    const newOrder = {
      id: "403-" + Math.floor(Math.random() * 1000000) + "-" + Math.floor(Math.random() * 1000000),
      date: new Date().toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" }),
      total: formattedTotal,
      status: "Arriving Friday",
      items: cart,
      paymentMethod: paymentMethod === "razorpay" ? "Prepaid" : "COD"
    };

    orders.unshift(newOrder);
    localStorage.setItem("velixaco-orders", JSON.stringify(orders));
    clearCart();
    setOrderPlaced(true);
  };

  return (
    <div className="inter outline-none bg-soft-beige min-h-screen flex flex-col">
      <Script src="https://checkout.razorpay.com/v1/checkout.js" />
      
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
                <label className={cn(
                  "flex items-center justify-between p-5 border rounded-2xl cursor-pointer transition-all group",
                  paymentMethod === "cod" ? "bg-soft-beige border-darkest-green" : "bg-white border-gray-100 hover:border-darkest-green"
                )}>
                  <div className="flex items-center gap-5">
                    <input 
                      type="radio" 
                      name="payment" 
                      checked={paymentMethod === "cod"}
                      onChange={() => setPaymentMethod("cod")} 
                      className="w-5 h-5 accent-darkest-green" 
                    />
                    <div>
                      <p className="text-[15px] font-bold text-black">Pay on Delivery (Cash/UPI)</p>
                      <p className="text-[11px] text-gray-500 font-medium uppercase tracking-tighter">Scan QR or pay cash at the time of delivery</p>
                    </div>
                  </div>
                  <Banknote className={cn("w-6 h-6 text-black transition-opacity", paymentMethod === "cod" ? "opacity-100" : "opacity-20 group-hover:opacity-100")} />
                </label>

                <label className={cn(
                  "flex items-center justify-between p-5 border rounded-2xl cursor-pointer transition-all group",
                  paymentMethod === "razorpay" ? "bg-soft-beige border-darkest-green" : "bg-white border-gray-100 hover:border-darkest-green"
                )}>
                  <div className="flex items-center gap-5">
                    <input 
                      type="radio" 
                      name="payment" 
                      checked={paymentMethod === "razorpay"}
                      onChange={() => setPaymentMethod("razorpay")} 
                      className="w-5 h-5 accent-darkest-green" 
                    />
                    <div>
                      <p className="text-[15px] font-bold text-black">Online Payment (Razorpay)</p>
                      <div className="flex gap-2 mt-1">
                        <span className="text-[10px] font-bold text-gray-400 uppercase tracking-tighter">Cards, UPI, NetBanking, Wallets</span>
                      </div>
                    </div>
                  </div>
                  <CreditCard className={cn("w-6 h-6 text-black transition-opacity", paymentMethod === "razorpay" ? "opacity-100" : "opacity-20 group-hover:opacity-100")} />
                </label>
              </div>
            )}
          </div>

          {/* STEP 3: REVIEW ITEMS */}
          <div className={cn(
            "py-8 transition-opacity duration-500",
            !paymentMethod && "opacity-50 pointer-events-none"
          )}>
            <div className="flex gap-4">
              <span className="text-lg font-black text-darkest-green">3</span>
              <h2 className="text-xl font-bold text-black">Review items and shipping</h2>
            </div>
            
            {paymentMethod && (
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
              disabled={!paymentMethod || cart.length === 0 || isProcessing}
              onClick={handlePlaceOrder}
              className={cn(
                "w-full py-4 rounded-full font-black text-[14px] uppercase tracking-[0.2em] shadow-xl transition-all mb-8 active:scale-95 flex items-center justify-center gap-2",
                paymentMethod && cart.length > 0 && !isProcessing
                  ? "bg-darkest-green text-white hover:opacity-90" 
                  : "bg-gray-200 text-gray-400 cursor-not-allowed"
              )}
            >
              {isProcessing ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                paymentMethod ? "Place your order" : "Deliver to this address"
              )}
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
