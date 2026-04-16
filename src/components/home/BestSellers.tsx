"use client";

import Link from "next/link";
import { ProductCard } from "@/components/product/ProductCard";
import { products } from "@/lib/data";

export const BestSellers = () => {
  return (
    <section className="w-full bg-[#F7F8F0] py-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Header */}
        <div className="flex items-center justify-between mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-darkest-green">Best Sellers</h2>
          <Link 
            href="/services" 
            className="bg-deep-green text-white px-8 py-3 rounded-full font-bold hover:scale-105 transition-transform active:scale-95"
          >
            Shop Now
          </Link>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
};
