import { motion } from "framer-motion";
import { Zap, TrendingUp, Battery, Sun, Wind, ArrowUpRight, Activity } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, Tooltip, Area, AreaChart } from "recharts";

const generationData = [
  { time: "00:00", units: 120 },
  { time: "04:00", units: 80 },
  { time: "08:00", units: 450 },
  { time: "12:00", units: 920 },
  { time: "16:00", units: 680 },
  { time: "20:00", units: 340 },
  { time: "23:00", units: 180 },
];

const installations = [
  {
    name: "Rajasthan Solar",
    type: "Solar",
    capacity: "2.2 kW",
    todayUnits: 8.5,
    status: "active",
    efficiency: 94.2,
    icon: Sun,
  },
  {
    name: "Tamil Nadu Wind",
    type: "Wind",
    capacity: "1.5 kW",
    todayUnits: 4.3,
    status: "active",
    efficiency: 89.7,
    icon: Wind,
  },
];

export const DashboardPreview = () => {
  return (
    <section id="dashboard" className="py-24 relative">
      <div className="absolute inset-0 gradient-radial opacity-30" />
      
      <div className="container relative z-10 px-4 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            Real-Time <span className="text-primary text-glow">Energy Dashboard</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Monitor your installations, track token generation, and manage your clean energy portfolio.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Dashboard Panel */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-2 space-y-6"
          >
            {/* Stats Row */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { label: "Token Balance", value: "387,452", icon: Zap, color: "primary" },
                { label: "Today's Generation", value: "12,845 U", icon: TrendingUp, color: "accent" },
                { label: "Active Power", value: "1,847 W", icon: Activity, color: "primary" },
                { label: "Efficiency", value: "94.2%", icon: Battery, color: "accent" },
              ].map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className={`glass-card p-4 rounded-xl ${stat.color === 'accent' ? 'glass-card-accent' : ''}`}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <stat.icon className={`w-4 h-4 ${stat.color === 'accent' ? 'text-accent' : 'text-primary'}`} />
                    <span className="text-xs text-muted-foreground">{stat.label}</span>
                  </div>
                  <div className="font-display text-xl md:text-2xl font-bold text-foreground">
                    {stat.value}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Generation Chart */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="glass-card p-6 rounded-xl"
            >
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="font-display text-lg font-semibold text-foreground">Energy Generation</h3>
                  <p className="text-sm text-muted-foreground">Last 24 hours</p>
                </div>
                <div className="flex items-center gap-2 text-primary">
                  <span className="text-sm font-medium">+12.5%</span>
                  <ArrowUpRight className="w-4 h-4" />
                </div>
              </div>
              
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={generationData}>
                    <defs>
                      <linearGradient id="colorUnits" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="hsl(160 84% 45%)" stopOpacity={0.4}/>
                        <stop offset="95%" stopColor="hsl(160 84% 45%)" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <XAxis 
                      dataKey="time" 
                      axisLine={false} 
                      tickLine={false}
                      tick={{ fill: 'hsl(220 10% 55%)', fontSize: 12 }}
                    />
                    <YAxis 
                      axisLine={false} 
                      tickLine={false}
                      tick={{ fill: 'hsl(220 10% 55%)', fontSize: 12 }}
                    />
                    <Tooltip 
                      contentStyle={{
                        backgroundColor: 'hsl(220 25% 8%)',
                        border: '1px solid hsl(160 40% 25%)',
                        borderRadius: '8px',
                        color: 'hsl(150 100% 95%)',
                      }}
                    />
                    <Area
                      type="monotone"
                      dataKey="units"
                      stroke="hsl(160 84% 45%)"
                      strokeWidth={2}
                      fillOpacity={1}
                      fill="url(#colorUnits)"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </motion.div>

            {/* Installations */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {installations.map((installation, index) => (
                <motion.div
                  key={installation.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="glass-card p-5 rounded-xl group hover:border-primary/40 transition-all duration-300"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-primary/20">
                        <installation.icon className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-foreground">{installation.name}</h4>
                        <p className="text-sm text-muted-foreground">{installation.capacity} • {installation.type}</p>
                      </div>
                    </div>
                    <span className="flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                      <span className="text-xs text-primary font-medium uppercase">Live</span>
                    </span>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">Today's Units</p>
                      <p className="font-display text-lg font-bold text-foreground">{installation.todayUnits} U</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">Efficiency</p>
                      <p className="font-display text-lg font-bold text-primary">{installation.efficiency}%</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Live Generation Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="glass-card p-6 rounded-xl h-fit sticky top-24"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-display text-lg font-semibold text-foreground">Live Generation</h3>
              <span className="flex items-center gap-1.5 px-2 py-1 rounded-full bg-primary/20">
                <span className="w-2 h-2 rounded-full bg-primary animate-ping" />
                <span className="text-xs text-primary font-medium">LIVE</span>
              </span>
            </div>

            <div className="text-center mb-8">
              <motion.div
                className="font-display text-5xl font-bold text-primary text-glow mb-2"
                animate={{ opacity: [0.8, 1, 0.8] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                1,847.5
              </motion.div>
              <p className="text-muted-foreground">Watts Generated</p>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                <span className="text-sm text-muted-foreground">Token Rate</span>
                <span className="font-display font-semibold text-accent">+1.2/min</span>
              </div>
              <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                <span className="text-sm text-muted-foreground">Peak Today</span>
                <span className="font-display font-semibold text-foreground">968 W @ 12:30</span>
              </div>
              <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                <span className="text-sm text-muted-foreground">Weather</span>
                <span className="font-display font-semibold text-foreground">☀️ Sunny, 12 km/h</span>
              </div>
            </div>

            <div className="mt-6 pt-6 border-t border-border">
              <div className="text-center">
                <p className="text-sm text-muted-foreground mb-2">This Month</p>
                <p className="font-display text-3xl font-bold text-foreground">387,452</p>
                <p className="text-sm text-primary">Units Generated</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
