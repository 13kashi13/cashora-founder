import HeroSection from "@/components/HeroSection";
import TeamSection from "@/components/TeamSection";
import HowItWorks from "@/components/HowItWorks";
import PlatformDistribution from "@/components/PlatformDistribution";
import GrowthGraphs from "@/components/GrowthGraphs";
import ValueSection from "@/components/ValueSection";
import MonetizationSection from "@/components/MonetizationSection";
import StatusSection from "@/components/StatusSection";
import AboutSection from "@/components/AboutSection";
import PricingSection from "@/components/PricingSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background overflow-x-hidden relative noise-overlay pt-24">
      <HeroSection />
      <HowItWorks />
      <AboutSection />
      <PlatformDistribution />
      <GrowthGraphs />
      <ValueSection />
      <MonetizationSection />
      <PricingSection />
      <TeamSection />
      <StatusSection />
      <Footer />
    </div>
  );
};

export default Index;
