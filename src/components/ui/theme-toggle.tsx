import { motion } from "framer-motion";
import { Sun, Moon } from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";

export const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <motion.button
      onClick={toggleTheme}
      className="relative w-14 h-7 rounded-full p-1 transition-colors duration-500"
      style={{
        background: isDark 
          ? 'linear-gradient(135deg, hsl(220 25% 15%) 0%, hsl(250 30% 20%) 100%)' 
          : 'linear-gradient(135deg, hsl(45 100% 85%) 0%, hsl(35 100% 80%) 100%)',
        boxShadow: isDark
          ? 'inset 0 2px 4px rgba(0,0,0,0.3), 0 0 20px hsl(250 80% 60% / 0.2)'
          : 'inset 0 2px 4px rgba(0,0,0,0.1), 0 0 20px hsl(45 100% 50% / 0.3)',
      }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
    >
      {/* Stars for dark mode */}
      {isDark && (
        <>
          <motion.div
            className="absolute w-1 h-1 bg-white rounded-full"
            style={{ top: '20%', left: '60%' }}
            animate={{ opacity: [0.4, 1, 0.4], scale: [0.8, 1, 0.8] }}
            transition={{ duration: 2, repeat: Infinity, delay: 0 }}
          />
          <motion.div
            className="absolute w-0.5 h-0.5 bg-white rounded-full"
            style={{ top: '60%', left: '75%' }}
            animate={{ opacity: [0.3, 0.8, 0.3], scale: [0.8, 1, 0.8] }}
            transition={{ duration: 1.5, repeat: Infinity, delay: 0.5 }}
          />
          <motion.div
            className="absolute w-0.5 h-0.5 bg-white rounded-full"
            style={{ top: '35%', left: '85%' }}
            animate={{ opacity: [0.5, 1, 0.5], scale: [0.8, 1, 0.8] }}
            transition={{ duration: 2.5, repeat: Infinity, delay: 0.2 }}
          />
        </>
      )}

      {/* Sun rays for light mode */}
      {!isDark && (
        <motion.div
          className="absolute inset-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {[...Array(4)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-yellow-500 rounded-full"
              style={{
                top: '50%',
                right: `${15 + i * 8}%`,
                transform: 'translateY(-50%)',
              }}
              animate={{ 
                opacity: [0.3, 0.7, 0.3],
                scale: [0.8, 1.2, 0.8],
              }}
              transition={{ 
                duration: 1.5, 
                repeat: Infinity, 
                delay: i * 0.2 
              }}
            />
          ))}
        </motion.div>
      )}

      {/* Toggle knob */}
      <motion.div
        className="relative w-5 h-5 rounded-full flex items-center justify-center"
        animate={{
          x: isDark ? 26 : 0,
          background: isDark 
            ? 'linear-gradient(135deg, hsl(240 10% 90%) 0%, hsl(240 5% 80%) 100%)'
            : 'linear-gradient(135deg, hsl(45 100% 60%) 0%, hsl(35 100% 50%) 100%)',
          boxShadow: isDark
            ? '0 2px 8px rgba(0,0,0,0.3), inset 0 -1px 2px rgba(0,0,0,0.2)'
            : '0 2px 8px hsl(45 100% 50% / 0.5), inset 0 -1px 2px rgba(0,0,0,0.1)',
        }}
        transition={{ 
          type: "spring", 
          stiffness: 500, 
          damping: 30,
          background: { duration: 0.3 },
        }}
      >
        <motion.div
          animate={{ rotate: isDark ? 0 : 180, scale: isDark ? 1 : 0 }}
          transition={{ duration: 0.3 }}
          className="absolute"
        >
          <Moon className="w-3 h-3 text-slate-600" />
        </motion.div>
        <motion.div
          animate={{ rotate: isDark ? -180 : 0, scale: isDark ? 0 : 1 }}
          transition={{ duration: 0.3 }}
          className="absolute"
        >
          <Sun className="w-3 h-3 text-yellow-700" />
        </motion.div>
      </motion.div>

      {/* Craters on moon */}
      {isDark && (
        <motion.div 
          className="absolute pointer-events-none"
          style={{ left: '32px', top: '6px' }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.3 }}
          transition={{ delay: 0.2 }}
        >
          <div className="w-1.5 h-1.5 rounded-full bg-slate-400 mb-0.5" />
          <div className="w-1 h-1 rounded-full bg-slate-400 ml-2" />
        </motion.div>
      )}
    </motion.button>
  );
};
