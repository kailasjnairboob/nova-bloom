import { Navbar } from "@/components/layout/Navbar";
import { GamificationSection } from "@/components/sections/GamificationSection";

const Gamification = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <main className="pt-20">
        <GamificationSection />
      </main>
    </div>
  );
};

export default Gamification;
