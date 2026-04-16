"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Compass, Shield, Layers, Play } from "lucide-react";
import { cn } from "@/lib/utils";

const Reveal = ({ children, className, delay = 0 }: { children: React.ReactNode, className?: string, delay?: number }) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("reveal-active");
          }
        });
      },
      { threshold: 0.1 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div 
      ref={ref} 
      className={cn("reveal-item", className)}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};

export default function AboutPage() {
  return (
    <div className="inter selection:bg-darkest-green selection:text-white overflow-x-hidden min-h-screen flex flex-col">
      <Header variant="dark" />

      {/* HERO SECTION */}
      <section className="relative w-full h-[90vh] bg-darkest-green flex items-center justify-center overflow-hidden">
        {/* Cinematic Background */}
        <div className="absolute inset-0 z-0">
          <Image 
            src="https://images.unsplash.com/photo-1547996160-81dfa63595dd?q=80&w=2000&auto=format&fit=crop" 
            alt="Luxury Movement" 
            fill
            className="object-cover opacity-30 scale-105 animate-[slow-zoom_20s_ease-in-out_infinite_alternate]" 
          />
          <div className="absolute inset-0 bg-gradient-to-b from-darkest-green/80 via-transparent to-darkest-green"></div>
        </div>

        <div className="relative z-10 text-center flex flex-col items-center gap-8 px-4">
          <Reveal className="flex flex-col items-center gap-4">
            <div className="w-px h-12 bg-white/40"></div>
            <span className="font-outfit text-white/60 uppercase tracking-[0.8em] text-[10px]">The Velixaco Story</span>
          </Reveal>
          
          <Reveal delay={200} className="flex flex-col items-center">
            <h1 className="font-outfit text-7xl md:text-[10rem] font-black text-white leading-[0.8] tracking-tighter uppercase drop-shadow-[0_20px_40px_rgba(0,0,0,0.3)]">
              Architects
            </h1>
            <h1 className="font-outfit text-7xl md:text-[10rem] font-black text-white leading-[0.8] tracking-tighter uppercase italic opacity-40 -mt-2">
              Of Time
            </h1>
          </Reveal>
          <Reveal delay={400}>
            <p className="text-white/70 text-lg md:text-xl max-w-2xl font-medium tracking-tight drop-shadow-md">
              Founded on the intersection of Swiss precision and architectural avant-garde. We don't just build watches; we engineer legacies.
            </p>
          </Reveal>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4">
           <Reveal delay={800} className="w-[1px] h-16 bg-gradient-to-b from-white to-transparent opacity-30"></Reveal>
        </div>
      </section>

      {/* HERITAGE SECTION */}
      <section className="py-32 md:py-48 bg-soft-beige relative">
        <div className="max-w-7xl mx-auto px-8 grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
          
          <Reveal className="flex flex-col gap-12">
            <div className="flex flex-col gap-4">
              <h2 className="font-outfit text-5xl md:text-7xl font-black text-darkest-green leading-[0.9] tracking-tighter uppercase">
                A Journey In <br /> <span className="text-darkest-green/50 italic">Perspective</span>
              </h2>
            </div>
            
            <div className="flex flex-col gap-8 text-black text-lg leading-relaxed font-medium">
              <p>
                The story of Velixaco began in a small atelier in Geneva, where our founder, a structural engineer turned horologist, sought to redefine the geometry of sound and time. 
              </p>
              <p>
                By treating the watch case not as a container, but as a bridge between the mechanical heart and the wearer&apos;s anatomy, we created a design language that feels both weightless and eternally grounded.
              </p>
              <div className="flex items-center gap-6 mt-4">
                <div className="flex flex-col">
                  <span className="font-outfit text-4xl font-black">1984</span>
                  <span className="text-xs uppercase tracking-widest text-black font-semibold">Est. Geneva</span>
                </div>
                <div className="w-px h-12 bg-darkest-green/20"></div>
                <div className="flex flex-col">
                  <span className="font-outfit text-4xl font-black">120+</span>
                  <span className="text-xs uppercase tracking-widest text-black font-semibold">Master Craftsmen</span>
                </div>
              </div>
            </div>
          </Reveal>

          <Reveal delay={300} className="relative">
            <div className="aspect-[4/5] bg-white rounded-[40px] p-4 shadow-2xl relative z-10 overflow-hidden group">
              <Image 
                src="https://images.unsplash.com/photo-1509048191080-d2984bad6ae5?q=80&w=2000&auto=format&fit=crop" 
                alt="Watchmaking" 
                fill
                className="object-cover rounded-[32px] group-hover:scale-105 transition-transform duration-1000" 
              />
            </div>
            {/* Decorative Elements */}
            <div className="absolute -top-12 -right-12 w-64 h-64 bg-darkest-green/5 rounded-full blur-3xl z-0"></div>
            <div className="absolute -bottom-8 -left-8 bg-darkest-green text-white p-8 rounded-3xl z-20 shadow-xl max-w-[200px]">
              <p className="text-[10px] font-black uppercase tracking-widest mb-2 opacity-60">Philosophy</p>
              <p className="text-sm font-bold leading-tight">&ldquo;The perfection of the unseen is what defines true luxury.&rdquo;</p>
            </div>
          </Reveal>

        </div>
      </section>

      {/* PHILOSOPHY: THREE PILLARS */}
      <section className="py-32 bg-darkest-green text-white overflow-hidden relative">
        <div className="max-w-7xl mx-auto px-8 flex flex-col items-center text-center">
          <Reveal className="mb-20">
            <h3 className="font-outfit text-white/50 uppercase tracking-[0.4em] text-xs mb-4">Our Methodology</h3>
            <h2 className="font-outfit text-4xl md:text-6xl font-black tracking-tighter uppercase">Engineering <span className="italic text-white/60">Eternity</span></h2>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 w-full text-left">
            {/* Pillar 1 */}
            <Reveal delay={100} className="bg-white/5 backdrop-blur-xl border border-white/10 p-10 rounded-[40px] flex flex-col gap-6">
              <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center">
                <Compass className="w-6 h-6 text-white" />
              </div>
              <h4 className="font-outfit text-2xl font-bold uppercase tracking-tight">Precision</h4>
              <p className="text-white/50 text-sm leading-relaxed">Each movement is regulated in six positions over 15 days, ensuring a rate stability that rivals the atomic clock.</p>
            </Reveal>
            {/* Pillar 2 */}
            <Reveal delay={200} className="bg-white/5 backdrop-blur-xl border border-white/10 p-10 rounded-[40px] flex flex-col gap-6">
              <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <h4 className="font-outfit text-2xl font-bold uppercase tracking-tight">Durability</h4>
              <p className="text-white/50 text-sm leading-relaxed">We use Grade 5 titanium and aerospace carbon fibers to ensure your timepiece survives generations, not just years.</p>
            </Reveal>
            {/* Pillar 3 */}
            <Reveal delay={300} className="bg-white/5 backdrop-blur-xl border border-white/10 p-10 rounded-[40px] flex flex-col gap-6">
              <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center">
                <Layers className="w-6 h-6 text-white" />
              </div>
              <h4 className="font-outfit text-2xl font-bold uppercase tracking-tight">Aesthetics</h4>
              <p className="text-white/50 text-sm leading-relaxed">Our hand-finishing involves over 40 hours of black polishing, anglage, and perlage per component.</p>
            </Reveal>
          </div>
        </div>
        
        {/* Background Gradient */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.03)_0%,transparent_70%)] pointer-events-none"></div>
      </section>

      {/* ATELIER SECTION */}
      <section className="py-32 bg-soft-beige overflow-hidden">
        <div className="max-w-7xl mx-auto px-8">
          <div className="flex flex-col lg:flex-row gap-20 items-end">
            <Reveal className="flex-1 flex flex-col gap-8">
              <h2 className="font-outfit text-6xl md:text-8xl font-black text-darkest-green leading-none tracking-tighter uppercase">
                Inside <br /> <span className="italic text-darkest-green/40">The Atelier</span>
              </h2>
              <p className="text-black text-xl font-medium leading-relaxed max-w-xl">
                Located in the quiet hills of Plan-les-Ouates, our atelier is a temple of silence where the world&apos;s finest watchmakers assemble history one ruby at a time.
              </p>
              <div className="grid grid-cols-2 gap-8 mt-10">
                <div className="flex flex-col gap-2">
                  <span className="text-darkest-green font-bold text-lg">Clean Room Level 5</span>
                  <p className="text-xs text-black uppercase tracking-widest font-semibold">Environment Control</p>
                </div>
                <div className="flex flex-col gap-2">
                  <span className="text-darkest-green font-bold text-lg">In-House Manufacture</span>
                  <p className="text-xs text-black uppercase tracking-widest font-semibold">Vertical Integration</p>
                </div>
              </div>
            </Reveal>
            <Reveal delay={300} className="flex-1 w-full">
              <div className="aspect-video bg-darkest-green rounded-[48px] overflow-hidden relative group">
                <Image 
                  src="https://images.unsplash.com/photo-1585123334904-845d60e97b29?q=80&w=1935&auto=format&fit=crop" 
                  alt="Atelier Interior" 
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110" 
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-20 h-20 rounded-full border border-white/30 flex items-center justify-center bg-white/10 backdrop-blur-md cursor-pointer hover:scale-110 transition-transform">
                    <Play className="w-8 h-8 text-white fill-white" />
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="py-32 bg-soft-beige px-6">
        <div className="max-w-7xl mx-auto">
          <Reveal className="bg-darkest-green rounded-[64px] p-12 md:p-32 text-center flex flex-col items-center gap-10 relative overflow-hidden group">
            <h2 className="font-outfit text-5xl md:text-7xl font-black text-white leading-tight tracking-tighter uppercase z-10">
              Experience The <br /> <span className="italic text-white/50">Extraordinary</span>
            </h2>
            <div className="flex flex-col md:flex-row gap-6 justify-center z-10">
              <Link href="/" className="bg-white text-darkest-green px-12 py-5 rounded-full font-bold text-lg hover:scale-105 transition-all active:scale-95 shadow-xl">
                Explore Collection
              </Link>
              <Link href="/contact" className="border border-white/30 text-white px-12 py-5 rounded-full font-bold text-lg hover:bg-white/10 hover:border-white transition-all active:scale-95 backdrop-blur-sm">
                Book a Private Tour
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      <Footer />
      
      <style jsx global>{`
        .reveal-item {
          opacity: 0;
          transform: translateY(30px);
          transition: all 1s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .reveal-active {
          opacity: 1;
          transform: translateY(0);
        }
        @keyframes slow-zoom {
          from { transform: scale(1); }
          to { transform: scale(1.1); }
        }
      `}</style>
    </div>
  );
}
