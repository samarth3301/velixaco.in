import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/home/Hero";
import { BestSellers } from "@/components/home/BestSellers";
import { PromoBanner } from "@/components/home/PromoBanner";
import { WhyChooseUs } from "@/components/home/WhyChooseUs";
import { Testimonials } from "@/components/home/Testimonials";
import { Subscribe } from "@/components/home/Subscribe";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col">
      <Header variant="dark" />
      <Hero />
      <BestSellers />
      <PromoBanner />
      <WhyChooseUs />
      <Testimonials />
      <Subscribe />
      <Footer />
    </main>
  );
}
