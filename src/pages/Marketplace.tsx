import { Navbar } from "@/components/layout/Navbar";
import { MarketplaceSection } from "@/components/sections/MarketplaceSection";

const Marketplace = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <main className="pt-20">
        <MarketplaceSection />
      </main>
    </div>
  );
};

export default Marketplace;
