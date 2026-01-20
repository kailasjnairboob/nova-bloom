import { Navbar } from "@/components/layout/Navbar";
import { HeroSection } from "@/components/sections/HeroSection";
import { FooterSection } from "@/components/sections/FooterSection";
import { motion } from "framer-motion";
import { Zap, LayoutDashboard, Store, Gamepad2, Leaf, CreditCard, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const features = [
  {
    icon: LayoutDashboard,
    title: "Real-Time Dashboard",
    description: "Monitor your energy generation, token balance, and installations live.",
    href: "/dashboard",
    color: "primary",
  },
  {
    icon: Store,
    title: "Marketplace",
    description: "Browse optimal locations across India and plan your installation.",
    href: "/marketplace",
    color: "accent",
  },
  {
    icon: Gamepad2,
    title: "Gamification",
    description: "Complete challenges, earn badges, and climb the global leaderboard.",
    href: "/gamification",
    color: "primary",
  },
  {
    icon: Leaf,
    title: "Carbon Impact",
    description: "Track your environmental contribution with real-time CO₂ savings.",
    href: "/carbon-impact",
    color: "accent",
  },
  {
    icon: CreditCard,
    title: "Bill Payment",
    description: "Redeem tokens for electricity bills or withdraw to your bank.",
    href: "/billing",
    color: "primary",
  },
];

const Index = () => {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <Navbar />
      <main>
        <HeroSection />
        
        {/* Features Section */}
        <section className="py-24 relative">
          <div className="absolute inset-0 gradient-radial opacity-20" />
          <div className="container relative z-10 px-4 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
                Explore <span className="text-primary text-glow">EnerChain</span>
              </h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                Everything you need to manage your renewable energy investments.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {features.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link
                    to={feature.href}
                    className={`block glass-card p-6 rounded-2xl h-full group hover:border-${feature.color}/40 transition-all duration-300`}
                  >
                    <div className={`w-14 h-14 mb-4 rounded-xl bg-${feature.color}/20 flex items-center justify-center group-hover:scale-110 transition-transform`}>
                      <feature.icon className={`w-7 h-7 text-${feature.color}`} />
                    </div>
                    <h3 className="font-display text-xl font-semibold text-foreground mb-2">{feature.title}</h3>
                    <p className="text-muted-foreground text-sm mb-4">{feature.description}</p>
                    <div className={`flex items-center gap-2 text-${feature.color} font-medium text-sm`}>
                      Explore
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <FooterSection />
    </div>
  );
};

export default Index;
