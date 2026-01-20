import { motion } from "framer-motion";
import { Trophy, Target, Flame, Users, Gift, Star, Lock, Check, Clock } from "lucide-react";
import { Progress } from "@/components/ui/progress";

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
  return (
    <section id="gamification" className="py-24 relative">
      <div className="absolute inset-0 grid-pattern opacity-50" />
      <div className="absolute bottom-0 left-0 w-1/2 h-1/2 gradient-radial opacity-20" />

      <div className="container relative z-10 px-4 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            Gamification <span className="text-accent text-glow-accent">Center</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Complete challenges, earn badges, and climb the leaderboard while saving the planet.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* User Profile Card */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="glass-card p-6 rounded-2xl"
          >
            <div className="text-center mb-6">
              <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-3xl font-display font-bold text-primary-foreground ring-4 ring-primary/30">
                K
              </div>
              <h3 className="font-display text-2xl font-bold text-foreground">Kailas</h3>
              <p className="text-accent font-semibold">Level 7 - Eco Warrior</p>
            </div>

            <div className="mb-6">
              <div className="flex items-center justify-between text-sm mb-2">
                <span className="text-muted-foreground">XP Progress</span>
                <span className="font-display font-semibold text-foreground">2,450 / 5,000</span>
              </div>
              <Progress value={49} className="h-3 bg-muted" />
              <p className="text-xs text-muted-foreground mt-2">555 XP to Carbon Champion</p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-3 rounded-xl bg-muted/50">
                <div className="font-display text-xl font-bold text-primary">34.2</div>
                <p className="text-xs text-muted-foreground">Tokens Earned</p>
              </div>
              <div className="text-center p-3 rounded-xl bg-muted/50">
                <div className="font-display text-xl font-bold text-accent flex items-center justify-center gap-1">
                  14 <Flame className="w-4 h-4" />
                </div>
                <p className="text-xs text-muted-foreground">Day Streak</p>
              </div>
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
              <div className="p-2 rounded-lg bg-accent/20">
                <Target className="w-5 h-5 text-accent" />
              </div>
              <h3 className="font-display text-xl font-semibold text-foreground">Daily Challenges</h3>
            </div>

            <div className="space-y-4">
              {challenges.map((challenge, index) => (
                <motion.div
                  key={challenge.name}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className={`p-4 rounded-xl border ${
                    challenge.completed 
                      ? 'bg-primary/10 border-primary/30' 
                      : 'bg-muted/30 border-border/50'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium text-foreground">{challenge.name}</span>
                    {challenge.completed ? (
                      <Check className="w-5 h-5 text-primary" />
                    ) : challenge.progress ? (
                      <span className="text-sm text-muted-foreground">{challenge.current}/{challenge.target}</span>
                    ) : (
                      <Clock className="w-4 h-4 text-muted-foreground" />
                    )}
                  </div>
                  {challenge.progress && !challenge.completed && (
                    <Progress value={challenge.progress} className="h-2 mb-2" />
                  )}
                  <div className="flex items-center gap-3 text-xs text-muted-foreground">
                    <span className="text-primary font-medium">+{challenge.xp} XP</span>
                    <span className="text-accent font-medium">+{challenge.tokens} tokens</span>
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
              <div className="p-2 rounded-lg bg-primary/20">
                <Trophy className="w-5 h-5 text-primary" />
              </div>
              <h3 className="font-display text-xl font-semibold text-foreground">Global Leaderboard</h3>
            </div>

            <div className="space-y-3">
              {leaderboard.map((user, index) => (
                <motion.div
                  key={user.rank}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className={`flex items-center gap-3 p-3 rounded-xl ${
                    user.isUser 
                      ? 'bg-gradient-to-r from-primary/20 to-accent/20 border border-primary/30' 
                      : 'bg-muted/30'
                  }`}
                >
                  <span className="text-2xl w-8 text-center">{user.avatar}</span>
                  <div className="flex-1 min-w-0">
                    <p className={`font-medium truncate ${user.isUser ? 'text-primary' : 'text-foreground'}`}>
                      {user.name} {user.isUser && <span className="text-xs">(You)</span>}
                    </p>
                    <p className="text-xs text-muted-foreground">{user.units} tokens</p>
                  </div>
                  <span className={`font-display font-bold ${user.rank <= 3 ? 'text-accent' : 'text-muted-foreground'}`}>
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
          <h3 className="font-display text-2xl font-semibold text-foreground text-center mb-8">Achievement Badges</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
            {badges.map((badge, index) => (
              <motion.div
                key={badge.name}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className={`glass-card p-4 rounded-xl text-center ${
                  badge.unlocked ? 'hover:border-primary/40' : 'opacity-60'
                } transition-all duration-300`}
              >
                <div className={`text-4xl mb-2 ${!badge.unlocked && 'grayscale'}`}>
                  {badge.emoji}
                </div>
                <p className="font-medium text-sm text-foreground mb-1">{badge.name}</p>
                {badge.unlocked ? (
                  <p className="text-xs text-primary">{badge.date}</p>
                ) : (
                  <div className="flex items-center justify-center gap-1 text-xs text-muted-foreground">
                    <Lock className="w-3 h-3" />
                    {badge.progress}%
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
