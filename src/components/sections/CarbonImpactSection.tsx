import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { Leaf, TreePine, Car, Home, Wind, Download, Share2 } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip, CartesianGrid } from "recharts";
import { Button } from "@/components/ui/button";
import { useEnergy } from "@/contexts";
import { useEffect, useState } from "react";
import { toast } from "sonner";

const monthlyData = [
  { month: "Jan", co2: 95 },
  { month: "Feb", co2: 102 },
  { month: "Mar", co2: 125 },
  { month: "Apr", co2: 118 },
  { month: "May", co2: 128 },
  { month: "Jun", co2: 135 },
  { month: "Jul", co2: 142 },
  { month: "Aug", co2: 138 },
  { month: "Sep", co2: 148 },
  { month: "Oct", co2: 114 },
];

// Animated counter component
const AnimatedCounter = ({ value, suffix = "" }: { value: number; suffix?: string }) => {
  const [displayValue, setDisplayValue] = useState(0);
  const motionValue = useMotionValue(0);
  const rounded = useTransform(motionValue, (latest) => Math.round(latest));

  useEffect(() => {
    const controls = animate(motionValue, value, { duration: 2 });
    const unsubscribe = rounded.on("change", (v) => setDisplayValue(v));
    return () => {
      controls.stop();
      unsubscribe();
    };
  }, [value, motionValue, rounded]);

  return <>{displayValue.toLocaleString()}{suffix}</>;
};

export const CarbonImpactSection = () => {
  const { stats } = useEnergy();

  // Calculate impact stats based on actual CO2 saved
  const impactStats = [
    { 
      icon: TreePine, 
      value: Math.round(stats.lifetimeCo2Saved / 20), 
      label: "Trees Planted", 
      sublabel: "annually equivalent" 
    },
    { 
      icon: Car, 
      value: Math.round(stats.lifetimeCo2Saved / 400), 
      label: "Cars Off Road", 
      sublabel: "for 1 year" 
    },
    { 
      icon: Home, 
      value: Math.round(stats.lifetimeCo2Saved / 45), 
      label: "Home-Days", 
      sublabel: "powered" 
    },
    { 
      icon: Wind, 
      value: Math.round(stats.lifetimeCo2Saved * 3), 
      label: "Lbs Pollution", 
      sublabel: "avoided" 
    },
  ];

  // Calculate certificate progress based on actual stats
  const certificates = [
    { 
      name: "100 kg CO₂ Milestone", 
      status: stats.lifetimeCo2Saved >= 100 ? "unlocked" : "in-progress",
      progress: Math.min(100, (stats.lifetimeCo2Saved / 100) * 100),
      date: "15-Sep-2025", 
      icon: "🏆" 
    },
    { 
      name: "1 Ton CO₂ Milestone", 
      status: stats.lifetimeCo2Saved >= 1000 ? "unlocked" : stats.lifetimeCo2Saved >= 100 ? "in-progress" : "locked",
      progress: Math.min(100, (stats.lifetimeCo2Saved / 1000) * 100),
      icon: "🌍" 
    },
    { 
      name: "10 Ton CO₂ Masterpiece", 
      status: stats.lifetimeCo2Saved >= 10000 ? "unlocked" : stats.lifetimeCo2Saved >= 1000 ? "in-progress" : "locked",
      progress: Math.min(100, (stats.lifetimeCo2Saved / 10000) * 100),
      icon: "🔓" 
    },
  ];

  const handleShare = () => {
    // BACKEND INTEGRATION POINT
    // Example: await shareApi.shareImpact(stats.lifetimeCo2Saved);
    toast.success("Impact shared! (Backend integration needed)");
  };

  const handleDownloadCertificate = (certName: string) => {
    // BACKEND INTEGRATION POINT
    // Example: const pdf = await certificateApi.download(certName);
    toast.success(`Downloading ${certName}... (Backend integration needed)`);
  };

  return (
    <section className="py-12 relative overflow-hidden">
      <div className="absolute inset-0 gradient-dark" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] rounded-full bg-gradient-to-br from-primary/5 to-transparent blur-3xl" />

      <div className="container relative z-10 px-4 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            Your Environmental <span className="text-primary text-glow">Impact</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Track your contribution to a cleaner planet with real-time carbon savings.
          </p>
        </motion.div>

        {/* Hero Stat */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="glass-card rounded-3xl p-8 md:p-12 text-center max-w-4xl mx-auto mb-12"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <Leaf className="w-8 h-8 text-primary animate-float" />
            <span className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Lifetime CO₂ Saved</span>
          </div>
          
          <motion.div
            className="font-display text-6xl md:text-8xl font-bold text-primary text-glow mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <AnimatedCounter value={stats.lifetimeCo2Saved} />
            <span className="text-3xl md:text-4xl text-foreground ml-2">kg</span>
          </motion.div>

          <p className="text-muted-foreground mb-8">Equivalent Environmental Impact</p>

          {/* Impact Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {impactStats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                className="p-4 rounded-xl bg-muted/30"
              >
                <stat.icon className="w-6 h-6 text-primary mx-auto mb-2" />
                <div className="font-display text-2xl font-bold text-foreground">
                  <AnimatedCounter value={stat.value} />
                </div>
                <p className="text-sm text-foreground font-medium">{stat.label}</p>
                <p className="text-xs text-muted-foreground">{stat.sublabel}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Monthly Chart */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="glass-card p-6 rounded-2xl"
          >
            <h3 className="font-display text-xl font-semibold text-foreground mb-6">Monthly CO₂ Savings</h3>
            
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={monthlyData}>
                  <XAxis 
                    dataKey="month" 
                    axisLine={false} 
                    tickLine={false}
                    tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
                  />
                  <YAxis 
                    axisLine={false} 
                    tickLine={false}
                    tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
                    unit=" kg"
                  />
                  <Tooltip 
                    contentStyle={{
                      backgroundColor: 'hsl(var(--card))',
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '8px',
                      color: 'hsl(var(--foreground))',
                    }}
                    formatter={(value) => [`${value} kg CO₂`, 'Saved']}
                  />
                  <Bar 
                    dataKey="co2" 
                    fill="url(#greenGradient)"
                    radius={[4, 4, 0, 0]}
                    animationDuration={1500}
                  />
                  <defs>
                    <linearGradient id="greenGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="hsl(var(--primary))" />
                      <stop offset="100%" stopColor="hsl(var(--primary) / 0.6)" />
                    </linearGradient>
                  </defs>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          {/* Certificates */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="glass-card p-6 rounded-2xl"
          >
            <h3 className="font-display text-xl font-semibold text-foreground mb-6">Carbon Certificates</h3>
            
            <div className="space-y-4">
              {certificates.map((cert, index) => (
                <motion.div
                  key={cert.name}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.02 }}
                  className={`p-4 rounded-xl border ${
                    cert.status === 'unlocked' 
                      ? 'bg-primary/10 border-primary/30' 
                      : cert.status === 'in-progress'
                      ? 'bg-accent/10 border-accent/30'
                      : 'bg-muted/30 border-border/50 opacity-60'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{cert.icon}</span>
                      <div>
                        <p className="font-medium text-foreground">{cert.name}</p>
                        {cert.status === 'unlocked' && (
                          <p className="text-xs text-primary">Unlocked: {cert.date}</p>
                        )}
                        {cert.status === 'in-progress' && (
                          <p className="text-xs text-accent">{cert.progress.toFixed(1)}% Complete</p>
                        )}
                        {cert.status === 'locked' && (
                          <p className="text-xs text-muted-foreground">Locked</p>
                        )}
                      </div>
                    </div>
                    {cert.status === 'unlocked' && (
                      <div className="flex gap-2">
                        <Button 
                          size="sm" 
                          variant="ghost" 
                          className="h-8 w-8 p-0"
                          onClick={() => handleDownloadCertificate(cert.name)}
                        >
                          <Download className="w-4 h-4" />
                        </Button>
                        <Button 
                          size="sm" 
                          variant="ghost" 
                          className="h-8 w-8 p-0"
                          onClick={handleShare}
                        >
                          <Share2 className="w-4 h-4" />
                        </Button>
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="mt-6 pt-6 border-t border-border">
              <Button 
                className="w-full bg-gradient-to-r from-primary to-primary/80 text-primary-foreground font-display"
                onClick={handleShare}
              >
                <Share2 className="w-4 h-4 mr-2" />
                Share Your Impact
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};