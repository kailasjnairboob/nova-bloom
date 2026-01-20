import { motion } from "framer-motion";
import { Sun, Wind, Zap, MapPin, Star, ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

const locations = [
  {
    id: 1,
    name: "Rajasthan Solar Park",
    location: "Jodhpur, Rajasthan",
    type: "Solar",
    icon: Sun,
    capacity: "500 kW",
    sunnyDays: 300,
    generation: "1,500 Units/kW",
    score: 4.9,
    gradient: "from-orange-500 to-yellow-500",
    benefits: ["Highest solar irradiance", "Minimal cloud cover", "Desert optimal conditions"],
  },
  {
    id: 2,
    name: "Tamil Nadu Wind Farm",
    location: "Tirunelveli, Tamil Nadu",
    type: "Wind",
    icon: Wind,
    capacity: "750 kW",
    windSpeed: "8-15 m/s",
    generation: "2,200 Units/kW",
    score: 4.8,
    gradient: "from-cyan-500 to-blue-500",
    benefits: ["Coastal monsoon winds", "Consistent generation", "High efficiency"],
  },
  {
    id: 3,
    name: "Gujarat Hybrid Station",
    location: "Kutch, Gujarat",
    type: "Hybrid",
    icon: Zap,
    capacity: "600 kW",
    generation: "2,000 Units/kW",
    score: 4.9,
    gradient: "from-primary to-accent",
    benefits: ["24/7 generation", "Solar + Wind combined", "Minimal downtime"],
  },
  {
    id: 4,
    name: "Karnataka Solar Array",
    location: "Pavagada, Karnataka",
    type: "Solar",
    icon: Sun,
    capacity: "550 kW",
    sunnyDays: 290,
    generation: "1,450 Units/kW",
    score: 4.8,
    gradient: "from-yellow-400 to-orange-400",
    benefits: ["High elevation", "Low dust levels", "Excellent irradiance"],
  },
];

const comingSoon = [
  { name: "Sahara Solar Array", location: "Morocco", flag: "🇲🇦" },
  { name: "Patagonia Wind Park", location: "Argentina", flag: "🇦🇷" },
  { name: "Outback Hybrid", location: "Australia", flag: "🇦🇺" },
];

export const MarketplaceSection = () => {
  return (
    <section id="marketplace" className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 gradient-dark" />
      <div className="absolute top-0 right-0 w-1/2 h-1/2 gradient-radial opacity-20" />

      <div className="container relative z-10 px-4 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card border border-accent/30 mb-6">
            <Sparkles className="w-4 h-4 text-accent" />
            <span className="text-sm text-accent font-medium">Premium Locations</span>
          </div>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            Remote Installation <span className="text-primary text-glow">Marketplace</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Choose your optimal location and start generating clean energy with verified installations.
          </p>
        </motion.div>

        {/* Location Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {locations.map((location, index) => (
            <motion.div
              key={location.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group"
            >
              <div className="glass-card rounded-2xl overflow-hidden hover:border-primary/40 transition-all duration-500">
                {/* Gradient Header */}
                <div className={`h-2 bg-gradient-to-r ${location.gradient}`} />
                
                <div className="p-6">
                  {/* Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className={`p-3 rounded-xl bg-gradient-to-br ${location.gradient} bg-opacity-20`}>
                        <location.icon className="w-6 h-6 text-foreground" />
                      </div>
                      <div>
                        <h3 className="font-display text-xl font-semibold text-foreground">{location.name}</h3>
                        <div className="flex items-center gap-1.5 text-muted-foreground text-sm">
                          <MapPin className="w-3.5 h-3.5" />
                          {location.location}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-1 px-2 py-1 rounded-lg bg-primary/20">
                      <Star className="w-4 h-4 text-primary fill-primary" />
                      <span className="font-display font-semibold text-primary">{location.score}</span>
                    </div>
                  </div>

                  {/* Stats */}
                  <div className="grid grid-cols-3 gap-4 mb-5 py-4 border-y border-border/50">
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">Type</p>
                      <p className="font-semibold text-foreground">{location.type}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">Available</p>
                      <p className="font-semibold text-foreground">{location.capacity}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">Expected</p>
                      <p className="font-semibold text-accent">{location.generation}</p>
                    </div>
                  </div>

                  {/* Benefits */}
                  <div className="space-y-2 mb-6">
                    {location.benefits.map((benefit, i) => (
                      <div key={i} className="flex items-center gap-2 text-sm text-muted-foreground">
                        <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                        {benefit}
                      </div>
                    ))}
                  </div>

                  {/* CTA */}
                  <Button 
                    className="w-full bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 text-primary-foreground font-display font-semibold group"
                  >
                    Plan Your Installation
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Coming Soon */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <h3 className="font-display text-xl font-semibold text-muted-foreground mb-6">Coming Soon - Global Expansion</h3>
          <div className="flex flex-wrap justify-center gap-4">
            {comingSoon.map((loc) => (
              <div
                key={loc.name}
                className="glass-card px-5 py-3 rounded-xl opacity-60 hover:opacity-80 transition-opacity cursor-not-allowed"
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{loc.flag}</span>
                  <div className="text-left">
                    <p className="font-medium text-foreground text-sm">{loc.name}</p>
                    <p className="text-xs text-muted-foreground">{loc.location}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};
