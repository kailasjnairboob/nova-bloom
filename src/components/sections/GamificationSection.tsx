import { motion } from "framer-motion";
import { Trophy, Target, Flame, Users, Gift, Star, Lock, Check, Clock, Award, Sparkles } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { useAuth } from "@/contexts";

const challenges = [
  { name: "Check Dashboard", xp: 5, tokens: 0.1, completed: true },
  { name: "Generate 10 Units", xp: 10, tokens: 0.5, progress: 70, current: 7, target: 10 },
  { name: "Share on Social Media", xp: 15, tokens: 0.2, completed: false },
];

const badges = [
  { name: "First Steps", emoji: "🌱", unlocked: true, date: "15-Sep-2025" },
  { name: "100 Units Club", emoji: "⚡", unlocked: true, date: "02-Oct-2025" },
  { name: "Green Pioneer", emoji: "🏆", unlocked: true, date: "20-Oct-2025" },
  { name: "Carbon Hero", emoji: "💚", unlocked: true, date: "25-Oct-2025" },
  { name: "Carbon Legend", emoji: "🌍", unlocked: false, progress: 92 },
  { name: "Community Champion", emoji: "👥", unlocked: false, progress: 40 },
];

const leaderboard = [
  { rank: 1, name: "EnergySamurai", units: "45,892", avatar: "🥇" },
  { rank: 2, name: "GreenInvestor_X", units: "42,150", avatar: "🥈" },
  { rank: 3, name: "CleanEnergyDream", units: "38,567", avatar: "🥉" },
  { rank: 4, name: "Kailas", units: "387,452", avatar: "⭐", isUser: true },
  { rank: 5, name: "SolarVision_India", units: "35,200", avatar: "🌟" },
];

export const GamificationSection = () => {
  const { user } = useAuth();

  return (
    <section className="py-12 relative bg-background">
      <div className="absolute inset-0 grid-pattern opacity-20" />
      <div className="absolute bottom-0 left-0 w-1/2 h-1/2 gradient-radial opacity-30" />

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
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/20 mb-6"
          >
            <Sparkles className="w-4 h-4 text-accent" />
            <span className="text-sm text-accent font-medium uppercase tracking-wide">Level Up Your Impact</span>
          </motion.div>
          <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl tracking-wider mb-4">
            ACHIEVEMENTS <span className="text-gradient-orange">CENTER</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto font-body">
            Complete challenges, earn badges, and climb the leaderboard while saving the planet.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* User Profile Card */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="glass-card p-6 rounded-2xl neon-border"
          >
            <div className="text-center mb-6">
              <motion.div 
                className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-3xl font-display font-bold text-primary-foreground ring-4 ring-primary/20 shadow-lg"
                whileHover={{ scale: 1.1, rotate: [0, -5, 5, 0] }}
              >
                {user?.name?.charAt(0) || 'K'}
              </motion.div>
              <h3 className="font-subheading text-2xl font-bold text-foreground uppercase tracking-wide">{user?.name || 'Kailas'}</h3>
              <p className="text-accent font-semibold">Level {user?.level || 7} - {user?.levelTitle || 'Eco Warrior'}</p>
            </div>

            <div className="mb-6">
              <div className="flex items-center justify-between text-sm mb-2">
                <span className="text-muted-foreground uppercase tracking-wide text-xs">XP Progress</span>
                <span className="font-mono font-semibold text-foreground">
                  {user?.xp?.toLocaleString() || '2,450'} / {user?.xpRequired?.toLocaleString() || '5,000'}
                </span>
              </div>
              <div className="relative">
                <Progress value={49} className="h-3" />
                <motion.div
                  className="absolute top-0 left-0 h-full bg-gradient-to-r from-transparent via-white/30 to-transparent"
                  style={{ width: '30%' }}
                  animate={{ x: ['-100%', '400%'] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                />
              </div>
              <p className="text-xs text-muted-foreground mt-2">555 XP to Carbon Champion</p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <motion.div 
                className="text-center p-3 rounded-xl bg-muted"
                whileHover={{ scale: 1.05 }}
              >
                <div className="font-mono text-xl font-bold text-primary">34.2</div>
                <p className="text-xs text-muted-foreground uppercase tracking-wide">Tokens Earned</p>
              </motion.div>
              <motion.div 
                className="text-center p-3 rounded-xl bg-muted"
                whileHover={{ scale: 1.05 }}
              >
                <div className="font-mono text-xl font-bold text-accent flex items-center justify-center gap-1">
                  14 <Flame className="w-4 h-4" />
                </div>
                <p className="text-xs text-muted-foreground uppercase tracking-wide">Day Streak</p>
              </motion.div>
            </div>
          </motion.div>

          {/* Daily Challenges */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass-card p-6 rounded-2xl"
          >
            <div className="flex items-center gap-3 mb-6">
              <motion.div 
                className="p-2 rounded-lg bg-accent/10"
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <Target className="w-5 h-5 text-accent" />
              </motion.div>
              <h3 className="font-subheading text-xl font-semibold text-foreground uppercase tracking-wide">Daily Challenges</h3>
            </div>

            <div className="space-y-4">
              {challenges.map((challenge, index) => (
                <motion.div
                  key={challenge.name}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.02, x: 4 }}
                  className={`p-4 rounded-xl border transition-all ${
                    challenge.completed 
                      ? 'bg-primary/10 border-primary/30' 
                      : 'bg-muted/50 border-border'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium text-foreground">{challenge.name}</span>
                    {challenge.completed ? (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", bounce: 0.5 }}
                      >
                        <Check className="w-5 h-5 text-primary" />
                      </motion.div>
                    ) : challenge.progress ? (
                      <span className="text-sm text-muted-foreground font-mono">{challenge.current}/{challenge.target}</span>
                    ) : (
                      <Clock className="w-4 h-4 text-muted-foreground" />
                    )}
                  </div>
                  {challenge.progress && !challenge.completed && (
                    <Progress value={challenge.progress} className="h-2 mb-2" />
                  )}
                  <div className="flex items-center gap-3 text-xs">
                    <span className="text-primary font-semibold">+{challenge.xp} XP</span>
                    <span className="text-accent font-semibold">+{challenge.tokens} tokens</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Leaderboard */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="glass-card p-6 rounded-2xl"
          >
            <div className="flex items-center gap-3 mb-6">
              <motion.div 
                className="p-2 rounded-lg bg-primary/10"
                animate={{ y: [0, -4, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <Trophy className="w-5 h-5 text-primary" />
              </motion.div>
              <h3 className="font-subheading text-xl font-semibold text-foreground uppercase tracking-wide">Global Leaderboard</h3>
            </div>

            <div className="space-y-3">
              {leaderboard.map((user, index) => (
                <motion.div
                  key={user.rank}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.02, x: 4 }}
                  className={`flex items-center gap-3 p-3 rounded-xl transition-all ${
                    user.isUser 
                      ? 'bg-gradient-to-r from-primary/10 to-accent/10 border border-primary/30 shadow-sm' 
                      : 'bg-muted'
                  }`}
                >
                  <motion.span 
                    className="text-2xl w-8 text-center"
                    animate={user.rank <= 3 ? { scale: [1, 1.2, 1] } : {}}
                    transition={{ duration: 2, repeat: Infinity, delay: user.rank * 0.3 }}
                  >
                    {user.avatar}
                  </motion.span>
                  <div className="flex-1 min-w-0">
                    <p className={`font-medium truncate ${user.isUser ? 'text-primary' : 'text-foreground'}`}>
                      {user.name} {user.isUser && <span className="text-xs">(You)</span>}
                    </p>
                    <p className="text-xs text-muted-foreground font-mono">{user.units} tokens</p>
                  </div>
                  <span className={`font-mono font-bold ${user.rank <= 3 ? 'text-accent' : 'text-muted-foreground'}`}>
                    #{user.rank}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Badges Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12"
        >
          <h3 className="font-heading text-3xl tracking-wider text-foreground text-center mb-8">ACHIEVEMENT BADGES</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
            {badges.map((badge, index) => (
              <motion.div
                key={badge.name}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                whileHover={badge.unlocked ? { scale: 1.08, y: -4 } : { scale: 1.02 }}
                className={`glass-card p-4 rounded-xl text-center ${
                  badge.unlocked ? 'cursor-pointer' : 'opacity-60'
                }`}
              >
                <motion.div 
                  className={`text-4xl mb-2 ${!badge.unlocked && 'grayscale'}`}
                  animate={badge.unlocked ? { rotate: [0, -5, 5, 0] } : {}}
                  transition={{ duration: 3, repeat: Infinity, delay: index * 0.2 }}
                >
                  {badge.emoji}
                </motion.div>
                <p className="font-medium text-sm text-foreground mb-1">{badge.name}</p>
                {badge.unlocked ? (
                  <p className="text-xs text-primary font-mono">{badge.date}</p>
                ) : (
                  <div className="flex items-center justify-center gap-1 text-xs text-muted-foreground">
                    <Lock className="w-3 h-3" />
                    <span className="font-mono">{badge.progress}%</span>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};
