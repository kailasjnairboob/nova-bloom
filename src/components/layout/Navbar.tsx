import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Zap, Activity, Store, Trophy, Leaf, CreditCard, Wallet, Menu, X, User } from "lucide-react";
import { cn } from "@/lib/utils";
import { Link, useLocation } from "react-router-dom";
import { useWallet, useEnergy } from "@/contexts";

const navItems = [
  { name: "Activity", icon: Activity, href: "/dashboard" },
  { name: "Marketplace", icon: Store, href: "/marketplace" },
  { name: "Achievements", icon: Trophy, href: "/gamification" },
  { name: "Carbon Impact", icon: Leaf, href: "/carbon-impact" },
  { name: "Bill Payment", icon: CreditCard, href: "/billing" },
];

export const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { isConnected, shortAddress } = useWallet();
  const { stats } = useEnergy();

  const isActive = (href: string) => location.pathname === href;

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-0 left-0 right-0 z-50 bg-card/95 backdrop-blur-md border-b border-border shadow-sm"
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
                <Zap className="w-8 h-8 text-primary" />
                <motion.div 
                  className="absolute inset-0 bg-primary/20 rounded-full -z-10"
                  animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.2, 0.5] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              </div>
              <span className="font-display font-bold text-xl lg:text-2xl text-foreground">
                Ener<span className="text-primary">Chain</span>
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
                      ? "bg-primary/10 text-primary"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted"
                  )}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <item.icon className="w-4 h-4" />
                  <span className="text-sm font-medium">{item.name}</span>
                  {isActive(item.href) && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute bottom-0 left-2 right-2 h-0.5 bg-primary rounded-full"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                </motion.div>
              </Link>
            ))}
          </div>

          {/* Right Section - Wallet & Avatar */}
          <div className="flex items-center gap-4">
            {/* Wallet Status */}
            <motion.div
              className="hidden md:flex items-center gap-3 px-4 py-2 bg-muted rounded-full border border-border"
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
              <span className="text-sm font-medium text-foreground">
                {Math.floor(stats.tokenBalance).toLocaleString()} tokens
              </span>
              <Wallet className="w-4 h-4 text-primary" />
            </motion.div>

            {/* User Avatar */}
            <Link to="/profile">
              <motion.button
                className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-primary-foreground font-display font-bold text-lg shadow-md"
                whileHover={{ scale: 1.05, boxShadow: "0 4px 20px hsl(160 84% 39% / 0.4)" }}
                whileTap={{ scale: 0.95 }}
              >
                K
              </motion.button>
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
                        ? "bg-primary/10 text-primary"
                        : "text-muted-foreground hover:text-foreground hover:bg-muted"
                    )}
                  >
                    <item.icon className="w-5 h-5" />
                    <span className="font-medium">{item.name}</span>
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
                  className="flex items-center gap-3 px-4 py-3 rounded-lg transition-all text-muted-foreground hover:text-foreground hover:bg-muted"
                >
                  <User className="w-5 h-5" />
                  <span className="font-medium">Profile</span>
                </Link>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
};
