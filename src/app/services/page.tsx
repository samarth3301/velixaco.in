"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ArrowDown, Calendar } from "lucide-react";
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

export default function ServicesPage() {
  return (
    <div className="inter text-darkest-green selection:bg-darkest-green selection:text-white overflow-x-hidden min-h-screen flex flex-col">
      <Header variant="dark" />

      {/* HERO SECTION */}
      <header className="relative bg-darkest-green text-white h-screen flex flex-col items-center justify-center overflow-hidden">
        <div className="max-w-4xl mx-auto px-6 flex flex-col items-center text-center gap-12 z-10">
          
          <Reveal className="flex items-center gap-4 w-full justify-center">
            <div className="h-[1px] w-12 bg-white/30"></div>
            <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-white/50">Swiss-Certified Standards</span>
            <div className="h-[1px] w-12 bg-white/30"></div>
          </Reveal>

          <Reveal delay={200} className="flex flex-col items-center">
            <h1 className="font-outfit text-7xl md:text-[9rem] font-black leading-[0.8] tracking-tighter uppercase">Servicing</h1>
            <h1 className="font-outfit text-7xl md:text-[9rem] font-black leading-[0.8] tracking-tighter uppercase italic opacity-20 -mt-2">Heritage</h1>
          </Reveal>

          <Reveal delay={400}>
            <p className="text-white/40 text-lg md:text-xl font-medium italic max-w-xl">
              &ldquo;Preserving the pulse of horological history through master-class engineering and global sourcing.&rdquo;
            </p>
          </Reveal>

          <Reveal delay={600} className="flex flex-col items-center gap-12 pt-4 w-full">
            <button className="bg-white text-darkest-green px-10 py-5 rounded-full font-black text-xs uppercase tracking-[0.2em] flex items-center gap-3 hover:bg-soft-beige transition-all group scale-110 shadow-2xl">
              Explore Our Lab <ArrowDown className="w-4 h-4 group-hover:translate-y-1 transition-transform" />
            </button>
            <div className="w-[1px] h-32 bg-white/10"></div>
          </Reveal>
        </div>
      </header>

      {/* THE HOROLOGY LABORATORY SECTION */}
      <section className="py-48 bg-soft-beige overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
            
            <Reveal className="flex flex-col gap-10">
              <div className="flex flex-col gap-6">
                <h2 className="font-outfit text-6xl md:text-7xl font-black text-darkest-green leading-[0.9] tracking-tighter uppercase">
                  The Horology<br/>Laboratory
                </h2>
                <div className="h-1.5 w-32 bg-darkest-green"></div>
              </div>
              
              <p className="text-black text-lg md:text-xl font-medium leading-relaxed max-w-xl">
                Our state-of-the-art laboratory is equipped with Swiss-grade machinery and managed by master watchmakers with decades of experience in high-complication servicing.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-y-12 gap-x-12 mt-8">
                <div className="flex flex-col gap-4">
                  <h4 className="text-[14px] font-black uppercase tracking-widest text-darkest-green">Movement Overhaul</h4>
                  <p className="text-black text-sm font-medium leading-relaxed">Full strip-down, ultrasonic cleaning, and synthetic lubrication to Swiss standards.</p>
                </div>
                <div className="flex flex-col gap-4">
                  <h4 className="text-[14px] font-black uppercase tracking-widest text-darkest-green">Timing Calibration</h4>
                  <p className="text-black text-sm font-medium leading-relaxed">Regulation across 6 positions to ensure chronometric perfection in any orientation.</p>
                </div>
                <div className="flex flex-col gap-4">
                  <h4 className="text-[14px] font-black uppercase tracking-widest text-darkest-green">Pressure Testing</h4>
                  <p className="text-black text-sm font-medium leading-relaxed">Multi-stage dry and wet pressure testing to original manufacturer specifications.</p>
                </div>
                <div className="flex flex-col gap-4">
                  <h4 className="text-[14px] font-black uppercase tracking-widest text-darkest-green">Hand Polishing</h4>
                  <p className="text-black text-sm font-medium leading-relaxed">Artisanal restoration of case finishes, maintaining original edges and geometry.</p>
                </div>
              </div>
            </Reveal>

            <Reveal delay={300} className="relative flex justify-center w-full">
              <div className="w-full max-w-[550px] aspect-square rounded-[80px] overflow-hidden shadow-[0_40px_100px_rgba(0,0,0,0.1)] border-[20px] border-white relative">
                <Image src="/watch_center.png" alt="Horology Lab" fill className="object-cover scale-110" />
              </div>
            </Reveal>

          </div>
        </div>
      </section>

      {/* PATH TO PERFECTION SECTION */}
      <section className="py-48 bg-darkest-green overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 flex flex-col items-center gap-24">
          
          <Reveal className="text-center">
            <h2 className="font-outfit text-6xl md:text-7xl font-black text-white tracking-tighter uppercase">Path To Perfection</h2>
          </Reveal>

          <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-12 relative">
            <div className="hidden md:block absolute top-[60px] left-[20%] right-[20%] h-[1px] bg-white/10 -z-0"></div>

            {/* Step 01 */}
            <Reveal className="flex flex-col items-center text-center gap-10 z-10">
              <div className="w-28 h-28 bg-white rounded-[40px] shadow-[0_25px_50px_rgba(0,0,0,0.3)] flex items-center justify-center transform hover:scale-105 transition-transform duration-500">
                <span className="text-darkest-green font-outfit text-4xl font-black">01</span>
              </div>
              <div className="flex flex-col gap-4">
                <h3 className="text-[18px] font-black uppercase tracking-widest text-white">Forensic Intake</h3>
                <p className="text-white/60 text-sm font-medium leading-relaxed max-w-[280px]">
                  Every piece undergoes a multi-point forensic visual and technical inspection upon arrival.
                </p>
              </div>
            </Reveal>

            {/* Step 02 */}
            <Reveal delay={200} className="flex flex-col items-center text-center gap-10 z-10">
              <div className="w-28 h-28 bg-white rounded-[40px] shadow-[0_25px_50px_rgba(0,0,0,0.3)] flex items-center justify-center transform hover:scale-105 transition-transform duration-500">
                <span className="text-darkest-green font-outfit text-4xl font-black">02</span>
              </div>
              <div className="flex flex-col gap-4">
                <h3 className="text-[18px] font-black uppercase tracking-widest text-white">Master Execution</h3>
                <p className="text-white/60 text-sm font-medium leading-relaxed max-w-[280px]">
                  Our master artisans begin the meticulous process using period-correct tools and techniques.
                </p>
              </div>
            </Reveal>

            {/* Step 03 */}
            <Reveal delay={400} className="flex flex-col items-center text-center gap-10 z-10">
              <div className="w-28 h-28 bg-white rounded-[40px] shadow-[0_25px_50px_rgba(0,0,0,0.3)] flex items-center justify-center transform hover:scale-105 transition-transform duration-500">
                <span className="text-darkest-green font-outfit text-4xl font-black">03</span>
              </div>
              <div className="flex flex-col gap-4">
                <h3 className="text-[18px] font-black uppercase tracking-widest text-white">Certified Release</h3>
                <p className="text-white/60 text-sm font-medium leading-relaxed max-w-[280px]">
                  The piece is certified with our Laboratory Report and returned in custom luxury packaging.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* BEGIN YOUR LEGACY CTA */}
      <section className="relative bg-darkest-green text-white py-64 overflow-hidden flex flex-col items-center justify-center">
        <div className="max-w-4xl mx-auto px-6 flex flex-col items-center text-center gap-10 z-10">
          <Reveal className="flex flex-col items-center">
            <h2 className="font-outfit text-7xl md:text-[8rem] font-black leading-[0.8] tracking-tighter uppercase text-white">Begin Your</h2>
            <h2 className="font-outfit text-7xl md:text-[8rem] font-black leading-[0.8] tracking-tighter uppercase italic opacity-20 -mt-2 text-white">Legacy</h2>
          </Reveal>

          <Reveal delay={200}>
            <p className="text-white/40 text-lg md:text-xl font-medium italic max-w-xl">
              &ldquo;Our consultation slots are highly limited to maintain artisanal quality. Secure your place in our atelier today.&rdquo;
            </p>
          </Reveal>

          <Reveal delay={400}>
            <button className="bg-white text-darkest-green px-12 py-6 rounded-full font-black text-xs uppercase tracking-[0.2em] flex items-center gap-4 hover:bg-soft-beige transition-all scale-110 shadow-[0_20px_60px_rgba(255,255,255,0.1)] group">
              Schedule Private Session <Calendar className="w-5 h-5 group-hover:rotate-12 transition-transform" />
            </button>
          </Reveal>
        </div>

        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[100vw] h-[100vw] bg-white/[0.02] rounded-full blur-[120px] pointer-events-none"></div>
      </section>

      <Footer />
      
      <style jsx global>{`
        .reveal-item {
          opacity: 0;
          transform: translateY(20px);
          transition: all 0.8s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .reveal-active {
          opacity: 1;
          transform: translateY(0);
        }
      `}</style>
    </div>
  );
}
