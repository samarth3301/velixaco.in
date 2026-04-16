"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ChevronDown, Heart } from "lucide-react";
import { cn } from "@/lib/utils";

const Reveal = ({ children, className, delay = 0 }: { children: React.ReactNode, className?: string, delay?: number }) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => entry.isIntersecting && entry.target.classList.add("reveal-active"));
    }, { threshold: 0.1 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className={cn("reveal-item", className)} style={{ transitionDelay: `${delay}ms` }}>
      {children}
    </div>
  );
};

export default function TeamPage() {
  const team = [
    { name: "Daniel Brooks", role: "Head of Operations", img: "/banner_man.png", color: "bg-white" },
    { name: "Aiden Park", role: "Logistics Manager", img: "/avatar1.png", color: "bg-[#E8E9E1]" },
    { name: "Michael Reyes", role: "Founder & CEO", img: "/avatar2.png", color: "bg-[#5E8357]" },
    { name: "Helena Thorne", role: "Curatorial Director", img: "/model.png", color: "bg-[#E8E9E1]" },
  ];

  return (
    <div className="inter text-darkest-green selection:bg-darkest-green selection:text-white overflow-x-hidden min-h-screen flex flex-col">
      <Header variant="dark" />

      {/* TEAM HERO */}
      <header className="relative bg-darkest-green text-white h-screen flex flex-col items-center justify-center overflow-hidden">
        <Reveal className="relative z-10 flex flex-col items-center text-center gap-2">
          {/* Pre-title */}
          <div className="flex items-center gap-6 mb-4">
            <div className="h-[1px] w-12 bg-white/20"></div>
            <span className="text-[11px] uppercase tracking-[0.6em] font-black text-white/60">Curating Your Legacy</span>
            <div className="h-[1px] w-12 bg-white/20"></div>
          </div>

          {/* Main Title Stack */}
          <div className="relative flex flex-col items-center">
            <h1 className="font-outfit text-8xl md:text-[12rem] font-extrabold leading-[0.8] tracking-tighter uppercase z-20">
              The Team
            </h1>
            <h2 className="font-outfit text-8xl md:text-[12rem] font-extrabold leading-[0.8] tracking-tighter uppercase italic text-white/[0.07] -mt-6 md:-mt-12 z-10 scale-y-110">
              Collective
            </h2>
          </div>
        </Reveal>
      </header>

      {/* TEAM CONTENT */}
      <section className="py-40 bg-soft-beige overflow-hidden">
        <div className="max-w-7xl mx-auto px-8 w-full">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, i) => (
              <Reveal key={member.name} delay={i * 100} className="flex flex-col items-center group cursor-pointer">
                <div className={cn(
                  "relative w-full aspect-[1/2] rounded-[200px] shadow-[0_30px_60px_-15px_rgba(0,0,0,0.05)] hover:shadow-[0_45px_100px_-20px_rgba(94,131,87,0.4)] hover:-translate-y-3 transition-all duration-700 overflow-hidden",
                  member.color,
                  "group-hover:bg-[#5E8357]"
                )}>
                  <Image src={member.img} alt={member.name} fill className="object-cover group-hover:scale-110 transition-transform duration-1000 opacity-90" />
                  
                  <div className={cn(
                    "absolute inset-x-0 bottom-0 py-10 flex flex-col items-center text-center rounded-t-[100px] shadow-[0_-10px_30px_rgba(0,0,0,0.05)] transition-all duration-700 z-20",
                    member.color === "bg-[#5E8357]" ? "bg-[#5E8357]" : member.color,
                    "group-hover:bg-[#5E8357]"
                  )}>
                    <h3 className={cn(
                      "font-outfit text-xl font-bold tracking-tight transition-all duration-300",
                      member.color === "bg-[#5E8357]" ? "text-white" : "text-darkest-green",
                      "group-hover:text-white group-hover:drop-shadow-[0_0_12px_rgba(255,255,255,0.9)]"
                    )}>
                      {member.name}
                    </h3>
                    <p className={cn(
                      "text-[10px] uppercase tracking-widest font-black mt-2 transition-all duration-300",
                      member.color === "bg-[#5E8357]" ? "text-white/50" : "text-darkest-green/40",
                      "group-hover:text-white/60"
                    )}>
                      {member.role}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* INSIGHTS SECTION */}
      <section className="pb-40 bg-soft-beige">
        <div className="max-w-7xl mx-auto px-12">
          <div className="flex flex-col lg:flex-row gap-20">
            
            {/* Left */}
            <div className="lg:w-1/2 flex flex-col gap-12">
              {[
                { title: "Artisanal Horology Inception", desc: "Explore the secret geometry behind our limited-run movements and the Swiss masters who breathe life into every caliber.", img: "/banner_watch.png" },
                { title: "Digital Atelier Evolution", desc: "How we bridged the gap between century-old watchmaking and the future of digital luxury acquisitions.", img: "/hero_4.png" },
                { title: "The 2026 Legacy Roadmap", desc: "A first look at the upcoming Velixaco collection and our commitment to sustainable horology.", img: "/hero_3.png" }
              ].map((insight, i) => (
                <Reveal key={i} delay={i * 100} className="flex items-start gap-8">
                  <div className="w-40 h-40 flex-shrink-0 bg-darkest-green rounded-[40px] overflow-hidden relative">
                    <Image src={insight.img} alt={insight.title} fill className="object-cover opacity-80" />
                  </div>
                  <div className="flex flex-col gap-3 pt-2">
                    <h3 className="font-outfit text-2xl font-black uppercase tracking-tight leading-tight">{insight.title}</h3>
                    <p className="text-[14px] text-darkest-green/60 leading-relaxed max-w-sm font-medium">{insight.desc}</p>
                  </div>
                </Reveal>
              ))}
            </div>

            {/* Right */}
            <Reveal delay={300} className="lg:w-1/2 flex flex-col gap-8">
              <div className="relative aspect-[16/10] bg-darkest-green rounded-[56px] overflow-hidden group p-12">
                <Image src="/watch_center.png" alt="Feature" fill className="object-contain group-hover:scale-105 transition-transform duration-1000" />
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="relative flex h-32 w-32 items-center justify-center">
                    <Heart className="w-12 h-12 text-white/20 animate-pulse" />
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-4 px-4">
                <h3 className="font-outfit text-4xl font-black uppercase tracking-tighter leading-none">The Autumn 2026 Collection Is Here</h3>
                <p className="text-lg text-darkest-green/70 leading-relaxed font-semibold max-w-2xl">
                  A curated selection of archival masterworks, meticulously restored for the modern collector. Discover the perfect fusion of heritage and horizon.
                </p>
              </div>
            </Reveal>

          </div>
        </div>
      </section>

      <Footer />
      
      <style jsx global>{`
        .reveal-item { opacity: 0; transform: translateY(20px); transition: all 0.8s cubic-bezier(0.16, 1, 0.3, 1); }
        .reveal-active { opacity: 1; transform: translateY(0); }
      `}</style>
    </div>
  );
}
