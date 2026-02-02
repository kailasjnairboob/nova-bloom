import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { Zap, TrendingUp, Battery, Sun, Wind, ArrowUpRight, Activity, Radio, Wifi } from "lucide-react";
import { 
  AreaChart, Area, XAxis, YAxis, ResponsiveContainer, Tooltip, 
  LineChart, Line, BarChart, Bar, ComposedChart,
  CartesianGrid
} from "recharts";
import { useEnergy } from "@/contexts";
import { useState, useEffect } from "react";
import { LiveDataStream } from "@/components/dashboard/LiveDataStream";
import { PowerWaveform } from "@/components/dashboard/PowerWaveform";
import { RealtimeStats } from "@/components/dashboard/RealtimeStats";

// Animated counter component
const AnimatedCounter = ({ value, duration = 2 }: { value: number; duration?: number }) => {
  const count = useMotionValue(0);
  const rounded = useTransform(count, (v) => Math.floor(v).toLocaleString());
  const [displayValue, setDisplayValue] = useState("0");

  useEffect(() => {
    const controls = animate(count, value, { duration });
    const unsubscribe = rounded.on("change", (v) => setDisplayValue(v));
    return () => {
      controls.stop();
      unsubscribe();
    };
  }, [value, duration, count, rounded]);

  return <span>{displayValue}</span>;
};

// Chart type selector
type ChartType = 'area' | 'line' | 'bar' | 'composed';

export const DashboardPreview = () => {
  const { stats, installations, generationHistory, subscribeToLiveData, unsubscribeFromLiveData } = useEnergy();
  const [chartType, setChartType] = useState<ChartType>('area');
  const [isLive, setIsLive] = useState(false);

  useEffect(() => {
    if (isLive) {
      subscribeToLiveData();
    } else {
      unsubscribeFromLiveData();
    }
    return () => unsubscribeFromLiveData();
  }, [isLive, subscribeToLiveData, unsubscribeFromLiveData]);

  const chartTypes: { type: ChartType; label: string }[] = [
    { type: 'area', label: 'Area' },
    { type: 'line', label: 'Line' },
    { type: 'bar', label: 'Bar' },
    { type: 'composed', label: 'Mixed' },
  ];

  const renderChart = () => {
    const commonProps = {
      data: generationHistory,
    };

    switch (chartType) {
      case 'line':
        return (
          <LineChart {...commonProps}>
            <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
            <XAxis dataKey="time" axisLine={false} tickLine={false} className="fill-muted-foreground text-xs" />
            <YAxis axisLine={false} tickLine={false} className="fill-muted-foreground text-xs" />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: 'hsl(var(--card))', 
                border: '1px solid hsl(var(--border))', 
                borderRadius: '8px',
                color: 'hsl(var(--foreground))'
              }} 
            />
            <Line type="monotone" dataKey="units" stroke="hsl(var(--primary))" strokeWidth={3} dot={{ fill: 'hsl(var(--primary))', strokeWidth: 2, r: 4 }} activeDot={{ r: 6, fill: 'hsl(var(--accent))' }} />
          </LineChart>
        );
      case 'bar':
        return (
          <BarChart {...commonProps}>
            <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
            <XAxis dataKey="time" axisLine={false} tickLine={false} className="fill-muted-foreground text-xs" />
            <YAxis axisLine={false} tickLine={false} className="fill-muted-foreground text-xs" />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: 'hsl(var(--card))', 
                border: '1px solid hsl(var(--border))', 
                borderRadius: '8px',
                color: 'hsl(var(--foreground))'
              }} 
            />
            <Bar dataKey="units" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
          </BarChart>
        );
      case 'composed':
        return (
          <ComposedChart {...commonProps}>
            <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
            <XAxis dataKey="time" axisLine={false} tickLine={false} className="fill-muted-foreground text-xs" />
            <YAxis axisLine={false} tickLine={false} className="fill-muted-foreground text-xs" />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: 'hsl(var(--card))', 
                border: '1px solid hsl(var(--border))', 
                borderRadius: '8px',
                color: 'hsl(var(--foreground))'
              }} 
            />
            <Bar dataKey="units" fill="hsl(var(--primary) / 0.3)" radius={[4, 4, 0, 0]} />
            <Line type="monotone" dataKey="units" stroke="hsl(var(--accent))" strokeWidth={2} dot={false} />
          </ComposedChart>
        );
      default:
        return (
          <AreaChart {...commonProps}>
            <defs>
              <linearGradient id="colorUnits" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
            <XAxis dataKey="time" axisLine={false} tickLine={false} className="fill-muted-foreground text-xs" />
            <YAxis axisLine={false} tickLine={false} className="fill-muted-foreground text-xs" />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: 'hsl(var(--card))', 
                border: '1px solid hsl(var(--border))', 
                borderRadius: '8px',
                color: 'hsl(var(--foreground))'
              }} 
            />
            <Area type="monotone" dataKey="units" stroke="hsl(var(--primary))" strokeWidth={2} fillOpacity={1} fill="url(#colorUnits)" />
          </AreaChart>
        );
    }
  };

  return (
    <section className="py-12 relative bg-background">
      <div className="absolute inset-0 gradient-radial opacity-30" />
      <div className="absolute inset-0 grid-pattern opacity-20" />
      
      <div className="container relative z-10 px-4 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6"
          >
            <Activity className="w-4 h-4 text-primary" />
            <span className="text-sm text-primary font-medium uppercase tracking-wide">Real-Time Monitoring</span>
          </motion.div>
          <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl tracking-wider mb-4">
            ENERGY <span className="text-gradient-teal">DASHBOARD</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto font-body">
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
                { label: "Token Balance", value: stats.tokenBalance, icon: Zap, color: "primary" },
                { label: "Today's Generation", value: stats.todayGeneration, suffix: " U", icon: TrendingUp, color: "accent" },
                { label: "Active Power", value: stats.activePower, suffix: " W", icon: Activity, color: "primary" },
                { label: "Efficiency", value: stats.efficiency, suffix: "%", icon: Battery, color: "accent" },
              ].map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.02, y: -2 }}
                  className="glass-card p-4 rounded-xl"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <stat.icon className={`w-4 h-4 ${stat.color === 'accent' ? 'text-accent' : 'text-primary'}`} />
                    <span className="text-xs text-muted-foreground font-subheading uppercase tracking-wide">{stat.label}</span>
                  </div>
                  <div className="font-mono text-xl md:text-2xl font-bold text-foreground">
                    <AnimatedCounter value={typeof stat.value === 'number' ? stat.value : 0} />
                    {stat.suffix}
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
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                <div>
                  <h3 className="font-subheading text-xl font-semibold text-foreground uppercase tracking-wide">Energy Generation</h3>
                  <p className="text-sm text-muted-foreground">Last 24 hours</p>
                </div>
                <div className="flex items-center gap-3">
                  {/* Chart Type Selector */}
                  <div className="flex bg-muted rounded-lg p-1">
                    {chartTypes.map((ct) => (
                      <button
                        key={ct.type}
                        onClick={() => setChartType(ct.type)}
                        className={`px-3 py-1 text-xs font-medium rounded-md transition-all ${
                          chartType === ct.type
                            ? 'bg-primary text-primary-foreground'
                            : 'text-muted-foreground hover:text-foreground'
                        }`}
                      >
                        {ct.label}
                      </button>
                    ))}
                  </div>
                  <div className="flex items-center gap-2 text-primary">
                    <span className="text-sm font-medium">+12.5%</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </div>
                </div>
              </div>
              
              <motion.div 
                className="h-64"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                key={chartType}
              >
                <ResponsiveContainer width="100%" height="100%">
                  {renderChart()}
                </ResponsiveContainer>
              </motion.div>
            </motion.div>

            {/* Installations */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {installations.map((installation, index) => (
                <motion.div
                  key={installation.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.02 }}
                  className="glass-card p-5 rounded-xl group"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <motion.div 
                        className="p-2 rounded-lg bg-primary/10"
                        animate={{ rotate: installation.type === 'Wind' ? [0, 360] : 0 }}
                        transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                      >
                        {installation.type === 'Solar' ? (
                          <Sun className="w-5 h-5 text-primary" />
                        ) : (
                          <Wind className="w-5 h-5 text-primary" />
                        )}
                      </motion.div>
                      <div>
                        <h4 className="font-semibold text-foreground">{installation.name}</h4>
                        <p className="text-sm text-muted-foreground">{installation.capacity} • {installation.type}</p>
                      </div>
                    </div>
                    <span className="flex items-center gap-1.5">
                      <motion.span 
                        className="w-2 h-2 rounded-full bg-primary"
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                      />
                      <span className="text-xs text-primary font-medium uppercase">Live</span>
                    </span>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-xs text-muted-foreground mb-1 uppercase tracking-wide">Today's Units</p>
                      <p className="font-mono text-lg font-bold text-foreground">{installation.todayUnits} U</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground mb-1 uppercase tracking-wide">Efficiency</p>
                      <p className="font-mono text-lg font-bold text-primary">{installation.efficiency}%</p>
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
            className="space-y-4 h-fit sticky top-24"
          >
            {/* Connection Status Header */}
            <div className="glass-card p-4 rounded-xl neon-border">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <motion.div
                    animate={isLive ? { rotate: 360 } : {}}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                  >
                    <Wifi className={`w-4 h-4 ${isLive ? 'text-primary' : 'text-muted-foreground'}`} />
                  </motion.div>
                  <span className="text-sm font-medium text-foreground uppercase tracking-wide">WebSocket</span>
                </div>
                <button
                  onClick={() => setIsLive(!isLive)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full transition-all ${
                    isLive 
                      ? 'bg-primary/20 text-primary border border-primary/40' 
                      : 'bg-muted text-muted-foreground border border-border'
                  }`}
                >
                  <motion.span 
                    className={`w-2 h-2 rounded-full ${isLive ? 'bg-primary' : 'bg-muted-foreground'}`}
                    animate={isLive ? { scale: [1, 1.4, 1], opacity: [1, 0.6, 1] } : {}}
                    transition={{ duration: 1, repeat: Infinity }}
                  />
                  <span className="text-xs font-semibold">{isLive ? 'CONNECTED' : 'DISCONNECTED'}</span>
                </button>
              </div>

              {/* Connection stats */}
              <div className="grid grid-cols-3 gap-2 text-center">
                <div className="p-2 rounded-lg bg-muted/50">
                  <p className="text-xs text-muted-foreground">Status</p>
                  <p className={`text-xs font-semibold ${isLive ? 'text-primary' : 'text-muted-foreground'}`}>
                    {isLive ? 'Active' : 'Idle'}
                  </p>
                </div>
                <div className="p-2 rounded-lg bg-muted/50">
                  <p className="text-xs text-muted-foreground">Ping</p>
                  <p className="text-xs font-mono font-semibold text-foreground">{isLive ? '24ms' : '--'}</p>
                </div>
                <div className="p-2 rounded-lg bg-muted/50">
                  <p className="text-xs text-muted-foreground">Uptime</p>
                  <p className="text-xs font-mono font-semibold text-foreground">{isLive ? '99.9%' : '--'}</p>
                </div>
              </div>
            </div>

            {/* Live Power Display */}
            <div className="glass-card p-5 rounded-xl">
              <div className="text-center mb-4">
                <p className="text-xs text-muted-foreground mb-1 uppercase tracking-wide">Active Power</p>
                <motion.div
                  className="font-mono text-4xl font-bold text-primary"
                  animate={isLive ? { 
                    textShadow: [
                      '0 0 10px hsl(var(--primary) / 0.3)',
                      '0 0 20px hsl(var(--primary) / 0.5)',
                      '0 0 10px hsl(var(--primary) / 0.3)',
                    ]
                  } : {}}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  <AnimatedCounter value={stats.activePower} />
                  <span className="text-lg ml-1">W</span>
                </motion.div>
              </div>

              {/* Live indicator bars */}
              <div className="flex items-center justify-center gap-0.5 mb-4">
                {Array.from({ length: 20 }).map((_, i) => (
                  <motion.div
                    key={i}
                    className="w-1 rounded-full bg-primary"
                    animate={isLive ? {
                      height: [8, 16 + Math.random() * 16, 8],
                      opacity: [0.4, 1, 0.4],
                    } : { height: 4, opacity: 0.2 }}
                    transition={{
                      duration: 0.5 + Math.random() * 0.5,
                      delay: i * 0.05,
                      repeat: Infinity,
                    }}
                  />
                ))}
              </div>

              <div className="grid grid-cols-2 gap-3">
                <motion.div 
                  className="p-3 rounded-lg bg-muted/50"
                  whileHover={{ scale: 1.02 }}
                >
                  <p className="text-xs text-muted-foreground">Token Rate</p>
                  <p className="font-mono font-semibold text-accent">+1.2/min</p>
                </motion.div>
                <motion.div 
                  className="p-3 rounded-lg bg-muted/50"
                  whileHover={{ scale: 1.02 }}
                >
                  <p className="text-xs text-muted-foreground">Peak Today</p>
                  <p className="font-mono font-semibold text-foreground">{stats.peakToday.value}W</p>
                </motion.div>
              </div>
            </div>

            {/* Live Data Stream */}
            <LiveDataStream isLive={isLive} activePower={stats.activePower} />

            {/* Power Waveform */}
            <PowerWaveform isLive={isLive} power={stats.activePower} />

            {/* Realtime Stats */}
            <RealtimeStats 
              isLive={isLive} 
              stats={{
                activePower: stats.activePower,
                tokenBalance: stats.tokenBalance,
                efficiency: stats.efficiency
              }}
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};
