import { useState } from "react";
import { motion } from "framer-motion";
import { Zap, LayoutDashboard, Store, Gamepad2, Leaf, CreditCard, Wallet, Menu, X, User } from "lucide-react";
import { cn } from "@/lib/utils";
import { Link, useLocation } from "react-router-dom";

const navItems = [
  { name: "Dashboard", icon: LayoutDashboard, href: "/dashboard" },
  { name: "Marketplace", icon: Store, href: "/marketplace" },
  { name: "Gamification", icon: Gamepad2, href: "/gamification" },
  { name: "Carbon Impact", icon: Leaf, href: "/carbon-impact" },
  { name: "Bill Payment", icon: CreditCard, href: "/billing" },
];

export const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const isActive = (href: string) => location.pathname === href;

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-0 left-0 right-0 z-50 glass-card border-b border-primary/20"
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
                <div className="absolute inset-0 blur-lg bg-primary/50 -z-10" />
              </div>
              <span className="font-display font-bold text-xl lg:text-2xl text-foreground">
                Ener<span className="text-primary text-glow">Chain</span>
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
                    "flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-300",
                    isActive(item.href)
                      ? "bg-primary/20 text-primary"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                  )}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <item.icon className="w-4 h-4" />
                  <span className="text-sm font-medium">{item.name}</span>
                </motion.div>
              </Link>
            ))}
          </div>

          {/* Right Section - Wallet & Avatar */}
          <div className="flex items-center gap-4">
            {/* Wallet Status */}
            <motion.div
              className="hidden md:flex items-center gap-3 px-4 py-2 glass-card neon-border rounded-full"
              whileHover={{ scale: 1.02 }}
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
              </span>
              <span className="text-sm font-medium text-foreground">387K tokens</span>
              <Wallet className="w-4 h-4 text-primary" />
            </motion.div>

            {/* User Avatar */}
            <Link to="/profile">
              <motion.button
                className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-primary-foreground font-display font-bold text-lg"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                K
              </motion.button>
            </Link>

            {/* Mobile Menu Toggle */}
            <button
              className="lg:hidden p-2 text-foreground"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden pb-4"
          >
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className={cn(
                  "flex items-center gap-3 px-4 py-3 rounded-lg transition-all",
                  isActive(item.href)
                    ? "bg-primary/20 text-primary"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                <item.icon className="w-5 h-5" />
                <span className="font-medium">{item.name}</span>
              </Link>
            ))}
            <Link
              to="/profile"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-3 px-4 py-3 rounded-lg transition-all text-muted-foreground hover:text-foreground"
            >
              <User className="w-5 h-5" />
              <span className="font-medium">Profile</span>
            </Link>
          </motion.div>
        )}
      </div>
    </motion.nav>
  );
};
