import { motion } from "framer-motion";
import { useEffect, useState, useRef } from "react";

interface PowerWaveformProps {
  isLive: boolean;
  power: number;
}

export const PowerWaveform = ({ isLive, power }: PowerWaveformProps) => {
  const [waveData, setWaveData] = useState<number[]>(Array(50).fill(50));
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!isLive) return;

    const interval = setInterval(() => {
      setWaveData(prev => {
        const newData = [...prev.slice(1)];
        // Generate smooth wave with power influence
        const baseValue = 50 + (power / 50);
        const noise = (Math.random() - 0.5) * 20;
        newData.push(Math.max(10, Math.min(90, baseValue + noise)));
        return newData;
      });
    }, 100);

    return () => clearInterval(interval);
  }, [isLive, power]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.scale(dpr, dpr);

    // Clear canvas
    ctx.clearRect(0, 0, rect.width, rect.height);

    // Draw grid
    ctx.strokeStyle = 'hsl(220 13% 91% / 0.5)';
    ctx.lineWidth = 0.5;
    for (let i = 0; i < rect.height; i += 20) {
      ctx.beginPath();
      ctx.moveTo(0, i);
      ctx.lineTo(rect.width, i);
      ctx.stroke();
    }

    if (!isLive) {
      // Draw flat line when paused
      ctx.strokeStyle = 'hsl(220 10% 46%)';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(0, rect.height / 2);
      ctx.lineTo(rect.width, rect.height / 2);
      ctx.stroke();
      return;
    }

    // Draw waveform
    const gradient = ctx.createLinearGradient(0, 0, rect.width, 0);
    gradient.addColorStop(0, 'hsl(160 84% 39% / 0.3)');
    gradient.addColorStop(0.5, 'hsl(160 84% 39%)');
    gradient.addColorStop(1, 'hsl(25 95% 53%)');

    ctx.strokeStyle = gradient;
    ctx.lineWidth = 2;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';

    ctx.beginPath();
    waveData.forEach((value, index) => {
      const x = (index / (waveData.length - 1)) * rect.width;
      const y = (value / 100) * rect.height;
      if (index === 0) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }
    });
    ctx.stroke();

    // Draw glow effect
    ctx.shadowColor = 'hsl(160 84% 39%)';
    ctx.shadowBlur = 10;
    ctx.stroke();

  }, [waveData, isLive]);

  return (
    <div className="relative glass-card rounded-xl p-4 overflow-hidden">
      <div className="flex items-center justify-between mb-3">
        <span className="text-sm font-medium text-foreground">Power Waveform</span>
        <div className="flex items-center gap-2">
          <motion.div
            className={`w-2 h-2 rounded-full ${isLive ? 'bg-primary' : 'bg-muted-foreground'}`}
            animate={isLive ? { scale: [1, 1.3, 1] } : {}}
            transition={{ duration: 0.8, repeat: Infinity }}
          />
          <span className="text-xs text-muted-foreground">{isLive ? 'Streaming' : 'Paused'}</span>
        </div>
      </div>
      
      <canvas 
        ref={canvasRef}
        className="w-full h-16"
        style={{ width: '100%', height: '64px' }}
      />

      {/* Power indicator bar */}
      <div className="mt-3 flex items-center gap-2">
        <div className="flex-1 h-1.5 bg-muted rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-primary to-accent rounded-full"
            initial={{ width: '0%' }}
            animate={{ width: `${Math.min(100, (power / 2500) * 100)}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>
        <span className="text-xs font-mono text-muted-foreground">{power.toFixed(0)}W</span>
      </div>
    </div>
  );
};
