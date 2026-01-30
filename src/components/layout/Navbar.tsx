import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Zap, Activity, Store, Trophy, Leaf, CreditCard, Menu, X, User } from "lucide-react";
import { cn } from "@/lib/utils";
import { Link, useLocation } from "react-router-dom";
import { useWallet, useEnergy, useAuth } from "@/contexts";
import { ThemeToggle } from "@/components/ui/theme-toggle";

const navItems = [
  { name: "ACTIVITY", icon: Activity, href: "/dashboard" },
  { name: "MARKETPLACE", icon: Store, href: "/marketplace" },
  { name: "ACHIEVEMENTS", icon: Trophy, href: "/gamification" },
  { name: "CARBON IMPACT", icon: Leaf, href: "/carbon-impact" },
  { name: "PAYMENTS", icon: CreditCard, href: "/billing" },
];

export const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { } = useWallet();
  const { stats } = useEnergy();
  const { user } = useAuth();

  const isActive = (href: string) => location.pathname === href;

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-md border-b border-border"
    >
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link to="/">
            <motion.div
              className="flex items-center gap-2 group"
              whileHover={{ scale: 1.02 }}
            >
              <div className="relative">
                <Zap className="w-7 h-7 text-primary" />
                <motion.div 
                  className="absolute inset-0 bg-primary/30 rounded-full blur-lg -z-10"
                  animate={{ scale: [1, 1.3, 1], opacity: [0.5, 0.2, 0.5] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              </div>
              <span className="font-heading text-xl lg:text-2xl tracking-wider text-foreground">
                ENERCHAIN
              </span>
            </motion.div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.href}
              >
                <motion.div
                  className={cn(
                    "flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-300 relative",
                    isActive(item.href)
                      ? "bg-primary/15 text-primary"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                  )}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <item.icon className="w-4 h-4" />
                  <span className="text-sm font-nav font-semibold tracking-wide">{item.name}</span>
                </motion.div>
              </Link>
            ))}
          </div>

          {/* Right Section */}
          <div className="flex items-center gap-3">
            {/* Theme Toggle */}
            <ThemeToggle />

            {/* Token Balance */}
            <motion.div
              className="hidden md:flex items-center gap-2 px-4 py-2 bg-primary/20 rounded-full border border-primary/30"
              whileHover={{ scale: 1.02 }}
            >
              <span className="relative flex h-2 w-2">
                <motion.span 
                  className="absolute inline-flex h-full w-full rounded-full bg-primary"
                  animate={{ scale: [1, 1.5, 1], opacity: [1, 0.5, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
              </span>
              <span className="text-sm font-mono font-bold text-primary">
                {Math.floor(stats.tokenBalance).toLocaleString()}
              </span>
              <span className="text-xs text-muted-foreground">tokens</span>
            </motion.div>

            {/* User Avatar with Level */}
            <Link to="/profile">
              <motion.div
                className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-muted/50 border border-border hover:border-primary/30 transition-colors"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-accent to-accent/70 flex items-center justify-center text-accent-foreground font-bold text-sm">
                  {user?.name?.charAt(0).toUpperCase() || 'U'}
                </div>
                <div className="hidden sm:block text-left">
                  <p className="text-xs font-medium text-foreground leading-none">{user?.name || 'User'}</p>
                  <p className="text-xs text-muted-foreground">Level {user?.level || 1}</p>
                </div>
              </motion.div>
            </Link>

            {/* Mobile Menu Toggle */}
            <button
              className="lg:hidden p-2 text-foreground rounded-lg hover:bg-muted transition-colors"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <AnimatePresence mode="wait">
                {mobileMenuOpen ? (
                  <motion.div
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                  >
                    <X className="w-6 h-6" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                  >
                    <Menu className="w-6 h-6" />
                  </motion.div>
                )}
              </AnimatePresence>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden pb-4 overflow-hidden"
            >
              {navItems.map((item, index) => (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Link
                    to={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={cn(
                      "flex items-center gap-3 px-4 py-3 rounded-lg transition-all",
                      isActive(item.href)
                        ? "bg-primary/15 text-primary"
                        : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                    )}
                  >
                    <item.icon className="w-5 h-5" />
                    <span className="font-nav font-semibold tracking-wide">{item.name}</span>
                  </Link>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: navItems.length * 0.05 }}
              >
                <Link
                  to="/profile"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-3 px-4 py-3 rounded-lg transition-all text-muted-foreground hover:text-foreground hover:bg-muted/50"
                >
                  <User className="w-5 h-5" />
                  <span className="font-nav font-semibold tracking-wide">PROFILE</span>
                </Link>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
};
