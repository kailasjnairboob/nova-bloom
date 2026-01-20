import { Navbar } from "@/components/layout/Navbar";
import { CarbonImpactSection } from "@/components/sections/CarbonImpactSection";

const CarbonImpact = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <main className="pt-20">
        <CarbonImpactSection />
      </main>
    </div>
  );
};

export default CarbonImpact;
