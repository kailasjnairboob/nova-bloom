import { Navbar } from "@/components/layout/Navbar";
import { BillingSection } from "@/components/sections/BillingSection";

const Billing = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <main className="pt-20">
        <BillingSection />
      </main>
    </div>
  );
};

export default Billing;
