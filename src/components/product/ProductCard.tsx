"use client";

import Link from "next/link";
import Image from "next/image";
import { ShoppingCart, CheckCircle } from "lucide-react";
import { Product } from "@/types";
import { useCart } from "@/context/CartContext";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface ProductCardProps {
  product: Product;
}

export const ProductCard = ({ product }: ProductCardProps) => {
  const { addToCart } = useCart();
  const [added, setAdded] = useState(false);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    addToCart(product, 1);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  return (
    <div className="flex flex-col group cursor-pointer">
      <Link href={`/product/${product.id}`} className="block">
        <div className="bg-white shadow-sm hover:shadow-md rounded-[32px] overflow-hidden aspect-[4/5] flex items-center justify-center relative group">
          {product.badge && (
            <span className={cn(
                "absolute top-6 right-6 px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest z-10 shadow-sm text-white",
                product.badgeType === 'new' && "bg-darkest-green",
                product.badgeType === 'limited' && "bg-black",
                product.badgeType === 'sale' && "bg-[#FF3B30]",
                product.badgeType === 'exclusive' && "bg-deep-green",
                product.badgeType === 'trending' && "bg-darkest-green",
                product.badgeType === 'vault' && "bg-black",
                product.badgeType === 'flagship' && "bg-deep-green",
                product.badgeType === 'essential' && "bg-black",
                product.badgeType === 'seasonal' && "bg-[#FF3B30]"
            )}>
              {product.badge}
            </span>
          )}
          <div className="relative w-[85%] h-[85%] transition-transform duration-700 group-hover:scale-110">
            <Image 
              src={product.img} 
              alt={product.name} 
              fill 
              className="object-contain"
            />
          </div>
        </div>
        <div className="mt-6 flex flex-col items-start px-2">
          <h3 className="text-xl font-bold text-darkest-green">{product.name}</h3>
          <div className="flex items-center gap-3 mt-2">
            {product.oldPrice && (
              <span className="text-black line-through text-sm">{product.oldPrice}</span>
            )}
            <span className="text-[#FF3B30] font-bold text-lg">{product.price}</span>
          </div>
        </div>
      </Link>
      <div className="px-2">
        <button 
          onClick={handleAddToCart}
          className={cn(
            "mt-5 w-full py-4 rounded-full font-bold flex items-center justify-center gap-2 transition-all shadow-md active:scale-95",
            added ? "bg-green-600 text-white" : "bg-deep-green text-white hover:bg-opacity-90"
          )}
        >
          {added ? (
            <>
              <CheckCircle className="w-4 h-4" /> Added
            </>
          ) : (
            <>
              <ShoppingCart className="w-4 h-4" /> Add to cart
            </>
          )}
        </button>
      </div>
    </div>
  );
};
