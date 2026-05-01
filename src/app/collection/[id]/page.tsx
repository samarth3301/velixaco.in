"use client";

import { useEffect, useState } from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Reveal } from "@/components/layout/Reveal";
import { ProductCard } from "@/components/product/ProductCard";

interface CollectionData {
  collection: {
    id: string;
    name: string;
    description?: string;
    parentId?: string;
  };
  products: any[];
}

export default function CollectionPage({ params }: { params: Promise<{ id: string }> }) {
  const [collectionData, setCollectionData] = useState<CollectionData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadCollection = async () => {
      try {
        const paramsResolved = await params;
        const response = await fetch(`/api/collections/${paramsResolved.id}/products`);

        if (!response.ok) {
          throw new Error("Failed to fetch collection");
        }

        const data = await response.json();
        setCollectionData(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Error loading collection");
        console.error("Error loading collection:", err);
      } finally {
        setLoading(false);
      }
    };

    loadCollection();
  }, [params]);

  if (loading) {
    return (
      <div className="inter text-darkest-green selection:bg-darkest-green selection:text-white overflow-x-hidden min-h-screen flex flex-col">
        <Header variant="light" />
        <div className="flex-1 flex items-center justify-center">
          <p className="text-xl text-gray-500">Loading collection...</p>
        </div>
        <Footer />
      </div>
    );
  }

  if (error || !collectionData) {
    return (
      <div className="inter text-darkest-green selection:bg-darkest-green selection:text-white overflow-x-hidden min-h-screen flex flex-col">
        <Header variant="light" />
        <div className="flex-1 flex items-center justify-center">
          <p className="text-xl text-red-500">{error || "Collection not found"}</p>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="inter text-darkest-green selection:bg-darkest-green selection:text-white overflow-x-hidden min-h-screen flex flex-col">
      <Header variant="light" />

      {/* HERO SECTION */}
      <section className="relative w-full h-[60vh] bg-soft-beige flex items-center justify-center overflow-hidden">
        <Reveal className="relative z-10 flex flex-col items-center text-center gap-6">
          <h1 className="font-outfit text-6xl md:text-8xl font-black leading-[0.8] tracking-tighter uppercase">
            {collectionData.collection.name}
          </h1>
          {collectionData.collection.description && (
            <p className="text-xl text-darkest-green/70 font-medium max-w-2xl">
              {collectionData.collection.description}
            </p>
          )}
        </Reveal>
      </section>

      {/* PRODUCTS SECTION */}
      <section className="bg-soft-beige py-24 flex-1">
        <div className="max-w-7xl mx-auto px-8">
          <div className="mb-16">
            <span className="text-sm font-medium text-darkest-green/60">
              Showing {collectionData.products.length} products
            </span>
          </div>

          {collectionData.products.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-lg text-darkest-green/60">No products in this collection yet.</p>
            </div>
          ) : (
            <Reveal className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 xl:gap-8">
              {collectionData.products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </Reveal>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}
