import { motion, AnimatePresence } from "framer-motion";
import { TrendingUp, TrendingDown, Minus, Clock } from "lucide-react";
import { useState, useEffect } from "react";

interface StatUpdate {
  id: string;
  label: string;
  value: number;
  previousValue: number;
  unit: string;
  timestamp: Date;
}

interface RealtimeStatsProps {
  isLive: boolean;
  stats: {
    activePower: number;
    tokenBalance: number;
    efficiency: number;
  };
}

export const RealtimeStats = ({ isLive, stats }: RealtimeStatsProps) => {
  const [updates, setUpdates] = useState<StatUpdate[]>([]);
  const [lastUpdate, setLastUpdate] = useState<Date>(new Date());

  useEffect(() => {
    if (!isLive) return;

    const interval = setInterval(() => {
      const statTypes = [
        { label: 'Power', value: stats.activePower, unit: 'W' },
        { label: 'Tokens', value: stats.tokenBalance, unit: '' },
        { label: 'Efficiency', value: stats.efficiency, unit: '%' },
      ];

      const randomStat = statTypes[Math.floor(Math.random() * statTypes.length)];
      const change = (Math.random() - 0.5) * 10;
      
      const newUpdate: StatUpdate = {
        id: `upd_${Date.now()}`,
        label: randomStat.label,
        value: randomStat.value + change,
        previousValue: randomStat.value,
        unit: randomStat.unit,
        timestamp: new Date(),
      };

      setUpdates(prev => [newUpdate, ...prev.slice(0, 4)]);
      setLastUpdate(new Date());
    }, 2000);

    return () => clearInterval(interval);
  }, [isLive, stats]);

  const getTrendIcon = (current: number, previous: number) => {
    const diff = current - previous;
    if (Math.abs(diff) < 0.1) return Minus;
    return diff > 0 ? TrendingUp : TrendingDown;
  };

  const getTrendColor = (current: number, previous: number) => {
    const diff = current - previous;
    if (Math.abs(diff) < 0.1) return 'text-muted-foreground';
    return diff > 0 ? 'text-primary' : 'text-accent';
  };

  return (
    <div className="glass-card rounded-xl p-4">
      <div className="flex items-center justify-between mb-4">
        <span className="text-sm font-medium text-foreground">Live Updates</span>
        <div className="flex items-center gap-1 text-xs text-muted-foreground">
          <Clock className="w-3 h-3" />
          <span>{isLive ? 'Just now' : 'Paused'}</span>
        </div>
      </div>

      <div className="space-y-2 min-h-[120px]">
        <AnimatePresence mode="popLayout">
          {updates.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex items-center justify-center h-[120px] text-sm text-muted-foreground"
            >
              {isLive ? 'Waiting for updates...' : 'Stream paused'}
            </motion.div>
          ) : (
            updates.map((update, index) => {
              const TrendIcon = getTrendIcon(update.value, update.previousValue);
              const trendColor = getTrendColor(update.value, update.previousValue);
              
              return (
                <motion.div
                  key={update.id}
                  initial={{ opacity: 0, x: -20, height: 0 }}
                  animate={{ opacity: 1 - index * 0.15, x: 0, height: 'auto' }}
                  exit={{ opacity: 0, x: 20, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="flex items-center justify-between p-2 rounded-lg bg-muted/50"
                >
                  <div className="flex items-center gap-2">
                    <motion.div
                      initial={{ scale: 1.5 }}
                      animate={{ scale: 1 }}
                      transition={{ duration: 0.2 }}
                    >
                      <TrendIcon className={`w-3 h-3 ${trendColor}`} />
                    </motion.div>
                    <span className="text-xs font-medium text-foreground">{update.label}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <motion.span
                      initial={{ scale: 1.2 }}
                      animate={{ scale: 1 }}
                      className={`text-xs font-mono font-semibold ${trendColor}`}
                    >
                      {update.value.toFixed(1)}{update.unit}
                    </motion.span>
                  </div>
                </motion.div>
              );
            })
          )}
        </AnimatePresence>
      </div>

      {/* Update frequency indicator */}
      <div className="mt-3 pt-3 border-t border-border">
        <div className="flex items-center justify-between text-xs">
          <span className="text-muted-foreground">Update freq</span>
          <div className="flex items-center gap-1">
            {[0, 1, 2, 3, 4].map((i) => (
              <motion.div
                key={i}
                className={`w-1 h-2 rounded-sm ${
                  isLive ? 'bg-primary' : 'bg-muted'
                }`}
                animate={isLive ? {
                  scaleY: [1, 1.5, 1],
                  opacity: [0.5, 1, 0.5],
                } : {}}
                transition={{
                  duration: 0.5,
                  delay: i * 0.1,
                  repeat: Infinity,
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
