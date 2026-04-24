"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface HeroImage {
  id: string;
  name: string;
  url: string;
}

export const Hero = () => {
  const [images, setImages] = useState<HeroImage[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await fetch("/api/hero-images");
        if (response.ok) {
          const data = await response.json();
          setImages(data.filter((img: HeroImage) => img.url));
        }
      } catch (error) {
        console.error("Error fetching hero images:", error);
      }
    };

    fetchImages();
  }, []);

  useEffect(() => {
    if (images.length === 0) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [images.length]);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const currentImage = images[currentIndex];

  return (
    <section className="relative w-full h-screen overflow-hidden flex items-center justify-center">

      {/* Background Image Carousel */}
      {currentImage && (
        <>
          <Image
            src={currentImage.url}
            alt={currentImage.name}
            fill
            className="object-cover absolute inset-0 z-0 transition-opacity duration-1000"
            priority
          />
          {/* Dark Overlay */}
          <div className="absolute inset-0 z-1 bg-black/40"></div>
        </>
      )}

      {/* Center Branding */}
      <div className="relative z-10 flex flex-col items-center gap-8 select-none text-center">
        <h1 className="font-outfit text-[12vw] font-black text-[#F4F4EB] leading-none tracking-tight drop-shadow-[0_25px_60px_rgba(0,0,0,0.5)]">
          VELIXACO
        </h1>
        <p className="text-white/80 text-xl md:text-2xl font-medium tracking-[0.4em] uppercase -mt-4 drop-shadow-[0_10px_20px_rgba(0,0,0,0.4)]">
          Luxury Timepieces
        </p>
      </div>

      {/* Carousel Controls */}
      {images.length > 0 && (
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 z-20 flex items-center gap-6">
          <button
            onClick={handlePrev}
            className="p-3 rounded-full bg-white/10 hover:bg-white/20 transition-colors border border-white/20 hover:border-white/40 text-white backdrop-blur-sm"
            aria-label="Previous image"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          {/* Carousel Indicators */}
          <div className="flex gap-2">
            {images.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                className={`w-2.5 h-2.5 rounded-full transition-all ${
                  idx === currentIndex ? "bg-white w-8" : "bg-white/40 hover:bg-white/60"
                }`}
                aria-label={`Go to image ${idx + 1}`}
              />
            ))}
          </div>

          <button
            onClick={handleNext}
            className="p-3 rounded-full bg-white/10 hover:bg-white/20 transition-colors border border-white/20 hover:border-white/40 text-white backdrop-blur-sm"
            aria-label="Next image"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>
      )}

    </section>
  );
};
