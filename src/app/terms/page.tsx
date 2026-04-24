import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Reveal } from "@/components/layout/Reveal";
import { MarkdownRenderer } from "@/components/MarkdownRenderer";
import { client } from "@/lib/storentiaClient";

export default async function TermsPage() {
  const pageId = "95efb122-18e1-4c01-b1e3-33e3f91f0343";
  let pageData = { pageTitle: "Governance Protocols", content: "" };

  try {
    const page = await client.pages.get(pageId);
    if (page) {
      pageData = {
        pageTitle: page.pageTitle,
        content: page.content
      };
    }
  } catch (error) {
    console.error("Error fetching terms page:", error);
  }

  return (
    <div className="inter text-darkest-green selection:bg-darkest-green selection:text-white overflow-x-hidden min-h-screen flex flex-col">
      <Header variant="dark" />

      {/* GOVERNANCE HERO */}
      <header className="relative bg-darkest-green text-white h-[60vh] flex flex-col items-center justify-center overflow-hidden">
        <Reveal className="relative z-10 flex flex-col items-center text-center gap-2">
          {/* Pre-title */}
          <div className="flex items-center gap-6 mb-4">
            <div className="h-[1px] w-12 bg-white/20"></div>
            <span className="text-[11px] uppercase tracking-[0.6em] font-black text-white/60">Legal Framework</span>
            <div className="h-[1px] w-12 bg-white/20"></div>
          </div>

          {/* Main Title Stack */}
          <div className="relative flex flex-col items-center">
            <h1 className="font-outfit text-6xl md:text-9xl font-black leading-[0.8] tracking-tighter uppercase z-20 text-center">
              {pageData.pageTitle.split(' ')[0]}
            </h1>
            {pageData.pageTitle.split(' ').length > 1 && (
              <h2 className="font-outfit text-6xl md:text-9xl font-black leading-[0.8] tracking-tighter uppercase italic text-white/[0.07] -mt-4 md:-mt-8 z-10 scale-y-110">
                {pageData.pageTitle.split(' ').slice(1).join(' ')}
              </h2>
            )}
          </div>
        </Reveal>
      </header>

      {/* GOVERNANCE CONTENT */}
      <section className="pb-40 bg-soft-beige pt-24">
        <div className="max-w-4xl mx-auto px-8 w-full">
          <Reveal delay={200} className="flex flex-col gap-12">
            <div className="h-[2px] w-24 bg-darkest-green/20"></div>
            
            <MarkdownRenderer content={pageData.content} className="text-black" />

            <div className="h-[1px] bg-darkest-green/10 mt-20"></div>
            <p className="text-[10px] font-black uppercase tracking-[0.5em] opacity-30 text-center">
              Revised: April 2026 • Official Documentation
            </p>
          </Reveal>
        </div>
      </section>

      <Footer />
    </div>
  );
}
