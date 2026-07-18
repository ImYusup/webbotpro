// src/app/page.tsx
import { HeroSection } from "@/components/hero-section";
import { ServicesSection } from "@/components/services-section";
import { WhyChooseSection } from "@/components/why-choose-section";
import { TestimonialsSection } from "@/components/testimonials-section";
import { FeaturedProductsSection } from "@/components/FeaturedProductsSection";

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <main>
        <HeroSection />
        <FeaturedProductsSection />
        <ServicesSection />
        <WhyChooseSection />
        <TestimonialsSection />
      </main>
    </div>
  );
}