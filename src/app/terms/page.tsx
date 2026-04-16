"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
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

export default function TermsPage() {
  const sections = [
    { id: "agreement", num: "01", title: "Collective Agreement", content: (
      <>
        <p className="mb-8">By entering the Velixaco digital environment, you acknowledge that you are partaking in a premium horology experience. This agreement governs all digital interactions, concierge services, and personal acquisitions conducted through our Geneva hub.</p>
        <p>We maintain an absolute standard of artisanal excellence. Membership in our Inner Atelier is a privilege reserved for those who adhere to the protocols of high-horology stewardship.</p>
      </>
    )},
    { id: "financial", num: "02", title: "Financial Protocols", content: (
      <>
        <div className="bg-white rounded-[48px] p-12 shadow-sm border border-darkest-green/5 italic text-xl font-medium leading-relaxed mt-4 mb-8">
          &ldquo;All acquisitions are processed via secured escrow channels. Secured Transit is a standard, non-negotiable protocol for all vault-cleared masterworks.&rdquo;
        </div>
        <p>Pricing is subject to international market fluctuations. A final quote provided by our senior curators is valid for a period of 48 hours. Post-finalization, a non-refundable security deposit is required to initiate logistics from the Geneva vault.</p>
      </>
    )},
    { id: "intellectual", num: "03", title: "Intellectual Heritage", content: (
      <p>The Velixaco visual language, including the &ldquo;Darkest Green&rdquo; chromatic signature, architectural layouts, and editorial narratives, are the exclusive intellectual heritage of Velixaco Horology S.A. Unauthorized reproduction is strictly prohibited under international copyright law.</p>
    )},
    { id: "privacy", num: "04", title: "Privacy Sanctuary", content: (
      <p>We operate with absolute discretion. Your acquisition history, collection details, and concierge communication are secured within our encrypted private ledger. We do not engage with third-party data handlers; your digital journey remains an exclusive covenant between you and Velixaco.</p>
    )}
  ];

  return (
    <div className="inter text-darkest-green selection:bg-darkest-green selection:text-white overflow-x-hidden min-h-screen flex flex-col">
      <Header variant="dark" />

      {/* GOVERNANCE HERO */}
      <header className="relative bg-darkest-green text-white h-[80vh] flex flex-col items-center justify-center overflow-hidden">
        <Reveal className="relative z-10 flex flex-col items-center text-center gap-2">
          {/* Pre-title */}
          <div className="flex items-center gap-6 mb-4">
            <div className="h-[1px] w-12 bg-white/20"></div>
            <span className="text-[11px] uppercase tracking-[0.6em] font-black text-white/60">Establish Your Legacy</span>
            <div className="h-[1px] w-12 bg-white/20"></div>
          </div>

          {/* Main Title Stack */}
          <div className="relative flex flex-col items-center">
            <h1 className="font-outfit text-8xl md:text-[12rem] font-extrabold leading-[0.8] tracking-tighter uppercase z-20">
              Governance
            </h1>
            <h2 className="font-outfit text-8xl md:text-[12rem] font-extrabold leading-[0.8] tracking-tighter uppercase italic text-white/[0.07] -mt-6 md:-mt-12 z-10 scale-y-110">
              Protocols
            </h2>
          </div>
        </Reveal>
      </header>

      {/* GOVERNANCE CONTENT */}
      <section className="pb-40 bg-soft-beige pt-24">
        <div className="max-w-7xl mx-auto px-12 w-full">
          <div className="flex flex-col lg:flex-row gap-32 relative">
            
            {/* Sticky Index */}
            <Reveal className="lg:w-1/4">
              <div className="sticky top-32 flex flex-col gap-12">
                <h3 className="text-[11px] font-black uppercase tracking-[0.6em] text-darkest-green opacity-80">Governance Index</h3>
                <nav className="flex flex-col gap-10">
                  {sections.map((s) => (
                    <a key={s.id} href={`#${s.id}`} className="group flex flex-col gap-1 text-2xl font-black text-darkest-green hover:opacity-70 transition-all duration-700">
                      <span className="text-base opacity-40 group-hover:opacity-100 transition-opacity">{s.num} •</span>
                      <span className="leading-[1.1]">{s.title.split(' ').slice(0, 1)}<br />{s.title.split(' ').slice(1).join(' ')}</span>
                    </a>
                  ))}
                </nav>
              </div>
            </Reveal>

            {/* Legislative Sections */}
            <Reveal delay={200} className="lg:w-3/4 flex flex-col gap-32">
              {sections.map((s) => (
                <div key={s.id} id={s.id} className="flex flex-col gap-6 scroll-mt-32">
                  <span className="text-[13px] font-bold text-black/30 uppercase tracking-[0.2em]">{s.num} • {s.title}</span>
                  <h2 className="text-6xl md:text-7xl font-black font-outfit uppercase tracking-tighter leading-tight text-darkest-green">
                    {s.title}
                  </h2>
                  <div className="h-[2px] w-24 bg-darkest-green/20"></div>
                  <div className="text-black/70 leading-relaxed font-medium mt-4 text-xl">
                    {s.content}
                  </div>
                </div>
              ))}

              <div className="h-[1px] bg-darkest-green/10"></div>
              <p className="text-[10px] font-black uppercase tracking-[0.5em] opacity-30 text-center">Revised: April 2026 • Geneva Jurisdiction</p>
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
