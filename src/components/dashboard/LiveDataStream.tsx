import { motion, AnimatePresence } from "framer-motion";
import { Activity, Zap, TrendingUp, Radio } from "lucide-react";
import { useState, useEffect } from "react";

interface DataPacket {
  id: string;
  value: number;
  timestamp: Date;
  type: 'generation' | 'token' | 'efficiency';
}

interface LiveDataStreamProps {
  isLive: boolean;
  activePower: number;
}

export const LiveDataStream = ({ isLive, activePower }: LiveDataStreamProps) => {
  const [packets, setPackets] = useState<DataPacket[]>([]);
  const [pulseIntensity, setPulseIntensity] = useState(0);

  useEffect(() => {
    if (!isLive) {
      setPackets([]);
      return;
    }

    const interval = setInterval(() => {
      const newPacket: DataPacket = {
        id: `pkt_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        value: Math.random() * 100,
        timestamp: new Date(),
        type: ['generation', 'token', 'efficiency'][Math.floor(Math.random() * 3)] as DataPacket['type'],
      };

      setPackets(prev => [...prev.slice(-8), newPacket]);
      setPulseIntensity(prev => (prev + 1) % 3);
    }, 800);

    return () => clearInterval(interval);
  }, [isLive]);

  const getPacketColor = (type: DataPacket['type']) => {
    switch (type) {
      case 'generation': return 'bg-primary';
      case 'token': return 'bg-accent';
      case 'efficiency': return 'bg-blue-500';
    }
  };

  const getPacketIcon = (type: DataPacket['type']) => {
    switch (type) {
      case 'generation': return Activity;
      case 'token': return Zap;
      case 'efficiency': return TrendingUp;
    }
  };

  return (
    <div className="relative overflow-hidden rounded-xl glass-card p-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <motion.div
            animate={isLive ? { scale: [1, 1.2, 1] } : {}}
            transition={{ duration: 1, repeat: Infinity }}
          >
            <Radio className={`w-4 h-4 ${isLive ? 'text-primary' : 'text-muted-foreground'}`} />
          </motion.div>
          <span className="text-sm font-medium text-foreground">Data Stream</span>
        </div>
        <div className="flex items-center gap-1">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className={`w-1.5 h-3 rounded-full ${
                isLive && pulseIntensity >= i ? 'bg-primary' : 'bg-muted'
              }`}
              animate={isLive ? { opacity: [0.5, 1, 0.5] } : {}}
              transition={{ duration: 0.5, delay: i * 0.1, repeat: Infinity }}
            />
          ))}
        </div>
      </div>

      {/* Stream visualization */}
      <div className="relative h-24 mb-4">
        {/* Background wave effect */}
        <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none">
          <motion.path
            d="M0,50 Q25,30 50,50 T100,50 T150,50 T200,50"
            fill="none"
            stroke="hsl(var(--primary) / 0.2)"
            strokeWidth="2"
            animate={isLive ? {
              d: [
                "M0,50 Q25,30 50,50 T100,50 T150,50 T200,50",
                "M0,50 Q25,70 50,50 T100,50 T150,50 T200,50",
                "M0,50 Q25,30 50,50 T100,50 T150,50 T200,50",
              ]
            } : {}}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          />
        </svg>

        {/* Floating data packets */}
        <AnimatePresence mode="popLayout">
          {packets.map((packet, index) => {
            const Icon = getPacketIcon(packet.type);
            return (
              <motion.div
                key={packet.id}
                initial={{ x: -20, opacity: 0, scale: 0.5 }}
                animate={{ 
                  x: `${(index + 1) * 10}%`,
                  opacity: 1,
                  scale: 1,
                  y: Math.sin(index * 0.5) * 15
                }}
                exit={{ x: '110%', opacity: 0 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className={`absolute top-1/2 -translate-y-1/2 p-1.5 rounded-full ${getPacketColor(packet.type)} shadow-lg`}
              >
                <Icon className="w-3 h-3 text-white" />
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      {/* Live metrics bar */}
      <div className="flex items-center justify-between text-xs">
        <div className="flex items-center gap-1">
          <span className="text-muted-foreground">Packets/s:</span>
          <motion.span 
            className="font-mono font-semibold text-foreground"
            animate={isLive ? { opacity: [0.7, 1, 0.7] } : {}}
            transition={{ duration: 0.5, repeat: Infinity }}
          >
            {isLive ? '1.25' : '0.00'}
          </motion.span>
        </div>
        <div className="flex items-center gap-1">
          <span className="text-muted-foreground">Latency:</span>
          <span className="font-mono font-semibold text-primary">{isLive ? '12ms' : '--'}</span>
        </div>
        <div className="flex items-center gap-1">
          <span className="text-muted-foreground">Buffer:</span>
          <span className="font-mono font-semibold text-foreground">{packets.length}/8</span>
        </div>
      </div>
    </div>
  );
};
