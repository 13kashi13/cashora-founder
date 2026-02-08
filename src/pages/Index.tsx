import HeroSection from "@/components/HeroSection";
import LiquidScroll from "@/components/LiquidScroll";
import FounderSection from "@/components/FounderSection";
import HowItWorks from "@/components/HowItWorks";
import PlatformDistribution from "@/components/PlatformDistribution";
import GrowthGraphs from "@/components/GrowthGraphs";
import ValueSection from "@/components/ValueSection";
import MonetizationSection from "@/components/MonetizationSection";
import StatusSection from "@/components/StatusSection";
import Footer from "@/components/Footer";
import ParticleBackground from "@/components/ParticleBackground";
import AnimatedGradientBg from "@/components/AnimatedGradientBg";

const Index = () => {
  return (
    <div className="min-h-screen bg-background overflow-x-hidden relative noise-overlay">
      <AnimatedGradientBg />
      <ParticleBackground />
      <LiquidScroll className="relative z-10">
        <HeroSection />
        <FounderSection />
        <HowItWorks />
        <PlatformDistribution />
        <GrowthGraphs />
        <ValueSection />
        <MonetizationSection />
        <StatusSection />
        <Footer />
      </LiquidScroll>
    </div>
  );
};

export default Index;
