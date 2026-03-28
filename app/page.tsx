import { About } from "@/components/About";
import { CTA } from "@/components/CTA";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/Hero";
import { Pricing } from "@/components/Pricing";
import { Services } from "@/components/Services";
import { TopNav } from "@/components/TopNav";
import { VideoShowcase } from "@/components/VideoShowcase";

export default function HomePage() {
  return (
    <div className="site-shell relative min-h-screen overflow-x-clip">
      <main className="relative z-10">
        <TopNav />
        <Hero />
        <About />
        <VideoShowcase />
        <Pricing />
        <Services />
        <CTA />
        <Footer />
      </main>
    </div>
  );
}
