"use client";

import { use } from "react";
import Image from "next/image";
import Link from "next/link";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { products } from "@/lib/data";
import { ShoppingCart, ShieldCheck, Truck, Star, Send, Check, ArrowRight } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useState } from "react";
import { ProductCard } from "@/components/product/ProductCard";
import { cn } from "@/lib/utils";

export default function ProductPage({ params: paramsPromise }: { params: Promise<{ id: string }> }) {
  const params = use(paramsPromise);
  const { id } = params;
  const product = products.find((p) => p.id === id) || products[0];
  const { addToCart } = useCart();
  
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);

  const handleAddToCart = () => {
    addToCart(product, qty);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const relatedProducts = products.filter((p) => p.id !== product.id).slice(0, 4);

  return (
    <div className="inter outline-none relative overflow-x-hidden text-darkest-green min-h-screen flex flex-col">
      <Header variant="light" />

      {/* Ambient Depth Background */}
      <div className="fixed inset-0 z-[-1] pointer-events-none">
        <div className="absolute inset-0 bg-soft-beige"></div>
        <div className="absolute top-[-10%] right-[-5%] w-[50vw] h-[50vw] bg-deep-green/[0.03] rounded-full blur-[120px]"></div>
        <div className="absolute bottom-[20%] left-[-10%] w-[40vw] h-[40vw] bg-deep-green/[0.04] rounded-full blur-[100px]"></div>
      </div>

      <main className="max-w-[1400px] mx-auto px-6 pt-32 pb-32 flex-1">
        <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24 relative">
          
          {/* Ambient Backglow for Image */}
          <div className="absolute left-[15%] top-1/2 -translate-y-1/2 w-[30vw] h-[30vw] bg-white rounded-full blur-[120px] opacity-[0.08] z-0 pointer-events-none"></div>

          {/* Left: Big Product Image */}
          <div className="flex-1 w-full relative z-10 flex justify-center items-center animate-fade-slide">
            <div className="relative group cursor-crosshair w-full aspect-square max-w-[600px] flex justify-center items-center">
              <div className="relative w-[85%] h-full animate-product-float group-hover:scale-[1.15] transition-transform duration-700 ease-out z-10">
                <Image 
                  src={product.img} 
                  alt={product.name} 
                  fill 
                  className="object-contain drop-shadow-[0_40px_50px_rgba(0,0,0,0.5)]"
                />
              </div>
            </div>
          </div>

          {/* Right: Premium Info Card */}
          <div className="flex-1 w-full z-10 animate-fade-slide delay-100">
            <div className="bg-darkest-green p-10 md:p-14 rounded-[40px] shadow-[0_30px_70px_rgba(0,0,0,0.4)] relative overflow-hidden">
              
              <div className="absolute -top-[50%] -left-[50%] w-[200%] h-[200%] bg-gradient-to-tr from-transparent via-white/5 to-transparent rotate-45 pointer-events-none"></div>

              <nav className="relative flex items-center gap-2 text-sm text-white/60 mb-8 font-medium">
                <Link href="/" className="hover:text-white transition-colors">Home</Link>
                <span className="opacity-50">/</span>
                <span className="text-white font-bold tracking-wide uppercase text-xs">Premium Collection</span>
              </nav>

              <h1 className="relative font-outfit text-4xl md:text-5xl lg:text-6xl font-black text-white mb-6 leading-[1.1] tracking-tight">
                {product.name}
              </h1>
              
              <div className="relative flex items-end gap-5 mb-8 flex-wrap">
                <span className="text-4xl md:text-6xl text-white font-black drop-shadow-[0_0_20px_rgba(255,255,255,0.2)]">
                  {product.price}.00
                </span>
                {product.oldPrice && (
                  <span className="text-xl md:text-2xl text-white/40 line-through font-medium mb-1 opacity-70">
                    {product.oldPrice}.00
                  </span>
                )}
                <div className="bg-deep-green/5 text-white px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-2 ml-2 border border-gray-300/50">
                  Sale 25% Off
                </div>
              </div>

              <p className="relative text-white/70 text-lg leading-relaxed mb-10 font-medium">
                {product.description}
              </p>

              <div className="relative flex flex-col lg:flex-row gap-5 w-full">
                <div className="flex items-center justify-between border border-white/10 rounded-full bg-white/5 p-1 shadow-inner w-full lg:w-auto">
                  <button 
                    onClick={() => setQty(Math.max(1, qty - 1))}
                    className="w-12 h-12 flex items-center justify-center rounded-full hover:bg-white/10 transition-all text-xl font-medium text-white"
                  >
                    -
                  </button>
                  <input 
                    type="text" 
                    value={qty} 
                    readOnly
                    className="w-12 text-center font-bold text-lg text-white bg-transparent outline-none pointer-events-none" 
                  />
                  <button 
                    onClick={() => setQty(qty + 1)}
                    className="w-12 h-12 flex items-center justify-center rounded-full hover:bg-white/10 transition-all text-xl font-medium text-white"
                  >
                    +
                  </button>
                </div>

                <button 
                  onClick={handleAddToCart}
                  className={cn(
                    "flex-1 rounded-full font-black text-lg flex items-center justify-center gap-3 transition-all duration-300 shadow-lg hover:-translate-y-1 active:translate-y-0 group relative overflow-hidden",
                    added ? "bg-green-500 text-white" : "bg-white text-darkest-green"
                  )}
                >
                  <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-darkest-green/10 to-transparent -translate-x-[150%] group-hover:translate-x-[150%] transition-transform duration-700 ease-out z-0"></div>
                  <ShoppingCart className="w-5 h-5 relative z-10 group-hover:scale-110 transition-transform" />
                  <span className="relative z-10">{added ? "Added to Cart" : "Add to Cart"}</span>
                </button>
              </div>

              <div className="relative mt-10 grid grid-cols-1 sm:grid-cols-2 gap-4 pt-8 border-t border-white/10">
                <div className="flex items-center gap-3 group">
                  <div className="w-10 h-10 rounded-full bg-white border border-gray-100 flex items-center justify-center shadow-sm hover:bg-gray-50 transition-colors duration-300">
                    <ShieldCheck className="w-4 h-4 text-darkest-green transition-colors" />
                  </div>
                  <span className="text-sm font-bold text-white">2 Year Warranty</span>
                </div>
                <div className="flex items-center gap-3 group">
                  <div className="w-10 h-10 rounded-full bg-white border border-gray-100 flex items-center justify-center shadow-sm hover:bg-gray-50 transition-colors duration-300">
                    <Truck className="w-4 h-4 text-darkest-green transition-colors" />
                  </div>
                  <span className="text-sm font-bold text-white">Free Express Delivery</span>
                </div>
              </div>

            </div>
          </div>
        </div>
      </main>

      {/* Review Section */}
      <section className="w-full bg-darkest-green py-24 border-t border-white/10">
        <div className="max-w-4xl mx-auto px-6">
          <div className="flex flex-col items-center text-center mb-16">
            <h2 className="font-outfit text-5xl font-black text-white mb-6 tracking-tight">Reviews</h2>
            <p className="text-white/50 font-medium text-lg">There are no reviews yet.</p>
            <p className="text-white font-black text-3xl mt-6 tracking-tight">
              Be the first to review <br/>
              <span className="text-white/70">&ldquo;{product.name}&rdquo;</span>
            </p>
          </div>

          {/* Review Form */}
          <form className="bg-white/5 backdrop-blur-xl p-10 md:p-14 rounded-[40px] shadow-[0_20px_60px_-15px_rgba(0,0,0,0.3)] border border-white/10 flex flex-col gap-10 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 blur-[80px] rounded-full pointer-events-none z-0"></div>

            {/* Rating */}
            <div className="relative z-10 flex flex-col gap-4 items-center">
              <label className="text-white font-black text-sm uppercase tracking-[0.2em]">Your Rating *</label>
              <div className="flex items-center gap-2 group">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star 
                    key={star}
                    onClick={() => setRating(star)}
                    onMouseEnter={() => setHoverRating(star)}
                    onMouseLeave={() => setHoverRating(0)}
                    className={cn(
                      "w-8 h-8 cursor-pointer transition-all duration-300 hover:scale-125",
                      (hoverRating || rating) >= star 
                        ? "text-yellow-400 fill-yellow-400 drop-shadow-[0_0_10px_rgba(250,204,21,0.4)]" 
                        : "text-white/30"
                    )}
                  />
                ))}
              </div>
            </div>

            <div className="relative z-10 flex flex-col gap-3">
              <label className="text-white font-black text-sm uppercase tracking-[0.15em] ml-2">Your Review *</label>
              <textarea rows={4} className="input-glow w-full bg-white/5 border border-white/10 rounded-[24px] p-6 outline-none transition-all duration-300 font-medium text-white placeholder-white/40 focus:bg-white/10 hover:border-white/30 resize-y min-h-[120px]" placeholder="Share your experience..."></textarea>
            </div>

            <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="flex flex-col gap-3">
                <label className="text-white font-black text-sm uppercase tracking-[0.15em] ml-2">Name *</label>
                <input type="text" className="input-glow w-full bg-white/5 border border-white/10 rounded-full px-6 py-5 outline-none transition-all duration-300 font-medium text-white placeholder-white/40 focus:bg-white/10 hover:border-white/30" placeholder="John Doe" />
              </div>
              <div className="flex flex-col gap-3">
                <label className="text-white font-black text-sm uppercase tracking-[0.15em] ml-2">Email *</label>
                <input type="email" className="input-glow w-full bg-white/5 border border-white/10 rounded-full px-6 py-5 outline-none transition-all duration-300 font-medium text-white placeholder-white/40 focus:bg-white/10 hover:border-white/30" placeholder="john@example.com" />
              </div>
            </div>

            <div className="relative z-10 flex items-start gap-4 cursor-pointer group mt-2">
              <div className="relative flex items-center mt-1">
                <input type="checkbox" id="save-info" className="peer appearance-none w-6 h-6 border-2 border-white/20 rounded-lg checked:bg-white checked:border-white transition-all cursor-pointer" />
                <Check className="absolute w-4 h-4 text-darkest-green left-1 hidden peer-checked:block pointer-events-none" />
              </div>
              <label htmlFor="save-info" className="text-white/60 text-sm font-medium cursor-pointer select-none leading-relaxed transition-colors group-hover:text-white">Save my name, email, and website in this browser for the next time I comment.</label>
            </div>

            <div className="relative z-10 flex justify-center mt-4">
              <button type="submit" className="bg-white px-14 py-5 rounded-full font-black text-lg flex items-center justify-center gap-3 transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-1 active:translate-y-0 group relative overflow-hidden text-darkest-green">
                <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-darkest-green/10 to-transparent -translate-x-[150%] group-hover:translate-x-[150%] transition-transform duration-700 ease-out z-0"></div>
                <span className="relative z-10">SUBMIT</span>
                <Send className="w-5 h-5 relative z-10 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </button>
            </div>
          </form>
        </div>
      </section>

      {/* Related Products */}
      <section className="w-full bg-darkest-green py-24 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-end justify-between mb-16">
            <h2 className="font-outfit text-5xl font-black text-white tracking-tight">More Watches</h2>
            <Link href="/" className="text-white/80 font-bold flex items-center gap-2 group transition-all pb-2 text-lg hover:text-white">
              View Collection <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 xl:gap-8 pb-12">
            {relatedProducts.map((rp) => (
              <ProductCard key={rp.id} product={rp} />
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
