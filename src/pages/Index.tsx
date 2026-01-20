import { Navbar } from "@/components/layout/Navbar";
import { HeroSection } from "@/components/sections/HeroSection";
import { DashboardPreview } from "@/components/sections/DashboardPreview";
import { MarketplaceSection } from "@/components/sections/MarketplaceSection";
import { GamificationSection } from "@/components/sections/GamificationSection";
import { CarbonImpactSection } from "@/components/sections/CarbonImpactSection";
import { BillingSection } from "@/components/sections/BillingSection";
import { FooterSection } from "@/components/sections/FooterSection";

const Index = () => {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <Navbar />
      <main>
        <HeroSection />
        <DashboardPreview />
        <MarketplaceSection />
        <GamificationSection />
        <CarbonImpactSection />
        <BillingSection />
      </main>
      <FooterSection />
    </div>
  );
};

export default Index;
