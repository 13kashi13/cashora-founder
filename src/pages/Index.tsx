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
import SocialProofSection from "@/components/SocialProofSection";
import EarningsCalculator from "@/components/EarningsCalculator";
import CommunitySection from "@/components/CommunitySection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background overflow-x-hidden relative noise-overlay pt-20">
      <HeroSection />
      <HowItWorks />
      <AboutSection />
      <SocialProofSection />
      <PlatformDistribution />
      <GrowthGraphs />
      <ValueSection />
      <MonetizationSection />
      <PricingSection />
      <EarningsCalculator />
      <TeamSection />
      <StatusSection />
      <CommunitySection />
      <Footer />
    </div>
  );
};

export default Index;
