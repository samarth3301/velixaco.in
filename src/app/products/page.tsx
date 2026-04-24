"use client";

import { useEffect, useState } from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Reveal } from "@/components/layout/Reveal";
import { ProductCard } from "@/components/product/ProductCard";
import { ChevronDown, Filter } from "lucide-react";
import { cn } from "@/lib/utils";

export default function ProductsPage() {
  const [displayProducts, setDisplayProducts] = useState<any[]>([]);
  const [sortBy, setSortBy] = useState("featured");
  const [filterOpen, setFilterOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const response = await fetch('/api/products');
        const apiProducts = await response.json();
        if (apiProducts && Array.isArray(apiProducts)) {
          const sorted = [...apiProducts];
          applySort(sorted, sortBy);
          setDisplayProducts(sorted);
        }
      } catch (error) {
        console.error("Error loading products:", error);
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  const applySort = (items: any[], sort: string) => {
    switch (sort) {
      case "price-low":
        items.sort((a, b) => {
          const priceA = parseInt((a.price || "0").toString().replace(/[^\d]/g, ""));
          const priceB = parseInt((b.price || "0").toString().replace(/[^\d]/g, ""));
          return priceA - priceB;
        });
        break;
      case "price-high":
        items.sort((a, b) => {
          const priceA = parseInt((a.price || "0").toString().replace(/[^\d]/g, ""));
          const priceB = parseInt((b.price || "0").toString().replace(/[^\d]/g, ""));
          return priceB - priceA;
        });
        break;
      default:
        break;
    }
  };

  const handleSort = (newSort: string) => {
    setSortBy(newSort);
    const sorted = [...displayProducts];
    applySort(sorted, newSort);
    setDisplayProducts(sorted);
  };

  return (
    <div className="inter text-darkest-green selection:bg-darkest-green selection:text-white overflow-x-hidden min-h-screen flex flex-col">
      <Header variant="light" />

      {/* HERO SECTION */}
      <section className="relative w-full h-[60vh] bg-soft-beige flex items-center justify-center overflow-hidden">
        <Reveal className="relative z-10 flex flex-col items-center text-center gap-6">
          <h1 className="font-outfit text-6xl md:text-8xl font-black leading-[0.8] tracking-tighter uppercase">
            Premium Collection
          </h1>
          <p className="text-xl text-darkest-green/70 font-medium max-w-2xl">
            Discover our curated selection of luxury timepieces
          </p>
        </Reveal>
      </section>

      {/* PRODUCTS SECTION */}
      <section className="bg-soft-beige py-24 flex-1">
        <div className="max-w-7xl mx-auto px-8">
          {/* Filters & Sorting */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 mb-16">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setFilterOpen(!filterOpen)}
                className="flex items-center gap-2 px-6 py-3 rounded-full bg-darkest-green text-white font-black hover:bg-darkest-green/90 transition-colors"
              >
                <Filter className="w-5 h-5" />
                Filters
              </button>
              <span className="text-sm font-medium text-darkest-green/60">
                Showing {displayProducts.length} products
              </span>
            </div>

            {/* Sort Dropdown */}
            <div className="relative group">
              <button
                className="flex items-center gap-2 px-6 py-3 rounded-full border-2 border-darkest-green text-darkest-green font-black hover:bg-darkest-green/5 transition-colors"
              >
                Sort: {sortBy === "featured" ? "Featured" : sortBy === "price-low" ? "Price: Low to High" : sortBy === "price-high" ? "Price: High to Low" : "Newest"}
                <ChevronDown className="w-4 h-4" />
              </button>

              <div className="absolute right-0 mt-2 w-48 bg-white rounded-2xl shadow-xl border border-darkest-green/10 z-20 hidden group-hover:block">
                {["featured", "price-low", "price-high", "newest"].map((option) => (
                  <button
                    key={option}
                    onClick={() => handleSort(option)}
                    className={cn(
                      "w-full text-left px-6 py-3 font-bold transition-colors first:rounded-t-2xl last:rounded-b-2xl",
                      sortBy === option
                        ? "bg-darkest-green text-white"
                        : "hover:bg-darkest-green/5 text-darkest-green"
                    )}
                  >
                    {option === "featured" ? "Featured" : option === "price-low" ? "Price: Low to High" : option === "price-high" ? "Price: High to Low" : "Newest"}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Products Grid */}
          <Reveal className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 xl:gap-8">
            {displayProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </Reveal>
        </div>
      </section>

      <Footer />
    </div>
  );
}
