import { Navbar } from "@/components/layout/Navbar";
import { motion } from "framer-motion";
import { 
  User, Wallet, Settings, LogOut, Copy, ExternalLink, 
  Zap, TrendingUp, Calendar, Shield, Bell, Sun, Wind 
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useAuth, useWallet, useEnergy } from "@/contexts";
import { toast } from "sonner";

const Profile = () => {
  const { user, logout } = useAuth();
  const { isConnected, shortAddress, address, network, disconnect } = useWallet();
  const { stats, installations } = useEnergy();

  const handleCopyAddress = () => {
    if (address) {
      navigator.clipboard.writeText(address);
      toast.success("Address copied to clipboard");
    }
  };

  const handleDisconnect = async () => {
    await disconnect();
    toast.success("Wallet disconnected");
  };

  const handleLogout = async () => {
    await logout();
    toast.success("Logged out successfully");
  };

  // Map installation type to icon
  const getInstallationIcon = (type: string) => {
    switch (type) {
      case 'Solar': return Sun;
      case 'Wind': return Wind;
      default: return Zap;
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <main className="pt-24 pb-12">
        <div className="container px-4 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Profile Info */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-6"
            >
              {/* Profile Card */}
              <div className="glass-card p-6 rounded-2xl text-center">
                <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-4xl font-display font-bold text-primary-foreground ring-4 ring-primary/30">
                  {user?.name?.charAt(0) || 'U'}
                </div>
                <h2 className="font-display text-2xl font-bold text-foreground mb-1">
                  {user?.name || 'User'}
                </h2>
                <p className="text-accent font-semibold mb-4">
                  Level {user?.level || 1} - {user?.levelTitle || 'Beginner'}
                </p>
                
                <div className="mb-4">
                  <div className="flex items-center justify-between text-sm mb-2">
                    <span className="text-muted-foreground">XP Progress</span>
                    <span className="font-display font-semibold text-foreground">
                      {user?.xp?.toLocaleString() || 0} / {user?.xpRequired?.toLocaleString() || 1000}
                    </span>
                  </div>
                  <Progress 
                    value={user ? (user.xp / user.xpRequired) * 100 : 0} 
                    className="h-3" 
                  />
                </div>

                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div className="p-3 rounded-xl bg-muted/50">
                    <div className="font-display text-lg font-bold text-primary">
                      {stats.tokenBalance.toLocaleString()}
                    </div>
                    <p className="text-muted-foreground">Tokens</p>
                  </div>
                  <div className="p-3 rounded-xl bg-muted/50">
                    <div className="font-display text-lg font-bold text-accent">
                      {stats.lifetimeCo2Saved.toLocaleString()} kg
                    </div>
                    <p className="text-muted-foreground">CO₂ Saved</p>
                  </div>
                </div>
              </div>

              {/* Wallet Card */}
              <div className="glass-card p-6 rounded-2xl">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 rounded-lg bg-primary/20">
                    <Wallet className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="font-display text-lg font-semibold text-foreground">Wallet</h3>
                  <span className="ml-auto flex items-center gap-1.5">
                    <span className={`w-2 h-2 rounded-full ${isConnected ? 'bg-primary animate-pulse' : 'bg-muted-foreground'}`} />
                    <span className={`text-xs font-medium ${isConnected ? 'text-primary' : 'text-muted-foreground'}`}>
                      {isConnected ? 'Connected' : 'Disconnected'}
                    </span>
                  </span>
                </div>

                {isConnected && (
                  <div className="p-3 rounded-xl bg-muted/50 mb-4">
                    <p className="text-xs text-muted-foreground mb-1">Wallet Address</p>
                    <div className="flex items-center gap-2">
                      <code className="text-sm text-foreground font-mono">{shortAddress}</code>
                      <Button size="icon" variant="ghost" className="h-6 w-6" onClick={handleCopyAddress}>
                        <Copy className="w-3 h-3" />
                      </Button>
                      <Button size="icon" variant="ghost" className="h-6 w-6">
                        <ExternalLink className="w-3 h-3" />
                      </Button>
                    </div>
                  </div>
                )}

                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Network</span>
                  <span className="text-foreground font-medium capitalize">
                    Solana {network.replace('-', ' ')}
                  </span>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="glass-card p-6 rounded-2xl">
                <h3 className="font-display text-lg font-semibold text-foreground mb-4">Quick Actions</h3>
                <div className="space-y-2">
                  <Button variant="outline" className="w-full justify-start border-border/50 hover:bg-muted/50">
                    <Settings className="w-4 h-4 mr-3" />
                    Account Settings
                  </Button>
                  <Button variant="outline" className="w-full justify-start border-border/50 hover:bg-muted/50">
                    <Bell className="w-4 h-4 mr-3" />
                    Notifications
                  </Button>
                  <Button variant="outline" className="w-full justify-start border-border/50 hover:bg-muted/50">
                    <Shield className="w-4 h-4 mr-3" />
                    Security
                  </Button>
                  <Button 
                    variant="outline" 
                    className="w-full justify-start border-destructive/50 text-destructive hover:bg-destructive/10"
                    onClick={isConnected ? handleDisconnect : handleLogout}
                  >
                    <LogOut className="w-4 h-4 mr-3" />
                    {isConnected ? 'Disconnect Wallet' : 'Logout'}
                  </Button>
                </div>
              </div>
            </motion.div>

            {/* Right Column - Transactions & Installations */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              className="lg:col-span-2 space-y-6"
            >
              {/* My Installations */}
              <div className="glass-card p-6 rounded-2xl">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="font-display text-xl font-semibold text-foreground">My Installations</h3>
                  <Button variant="outline" size="sm" className="border-primary/50 text-primary hover:bg-primary/10">
                    + Add New
                  </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {installations.map((install) => {
                    const InstallIcon = getInstallationIcon(install.type);
                    return (
                      <div
                        key={install.id}
                        className="p-4 rounded-xl bg-muted/30 border border-border/50"
                      >
                        <div className="flex items-center gap-3 mb-3">
                          <div className="p-2 rounded-lg bg-primary/20">
                            <InstallIcon className="w-5 h-5 text-primary" />
                          </div>
                          <div>
                            <h4 className="font-semibold text-foreground">{install.name}</h4>
                            <p className="text-xs text-muted-foreground">{install.type} • {install.capacity}</p>
                          </div>
                          <span className="ml-auto flex items-center gap-1.5">
                            <span className={`w-2 h-2 rounded-full ${install.status === 'active' ? 'bg-primary animate-pulse' : 'bg-muted-foreground'}`} />
                            <span className={`text-xs font-medium uppercase ${install.status === 'active' ? 'text-primary' : 'text-muted-foreground'}`}>
                              {install.status === 'active' ? 'Live' : install.status}
                            </span>
                          </span>
                        </div>
                        <div className="grid grid-cols-2 gap-2 text-sm">
                          <div>
                            <p className="text-muted-foreground">Today</p>
                            <p className="font-semibold text-foreground">{install.todayUnits} Units</p>
                          </div>
                          <div>
                            <p className="text-muted-foreground">This Month</p>
                            <p className="font-semibold text-accent">{install.monthUnits} Units</p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Transaction History - placeholder for backend */}
              <div className="glass-card p-6 rounded-2xl">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="font-display text-xl font-semibold text-foreground">Transaction History</h3>
                  <Button variant="ghost" size="sm" className="text-primary hover:bg-primary/10">
                    View All
                  </Button>
                </div>

                <div className="text-center py-8 text-muted-foreground">
                  <p>Transaction history will be available after backend integration.</p>
                  <p className="text-sm mt-2">Connect your wallet to view transactions.</p>
                </div>
              </div>

              {/* Stats Summary */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { label: "Total Earned", value: stats.tokenBalance.toLocaleString(), icon: TrendingUp, color: "text-primary" },
                  { label: "Today Generation", value: stats.todayGeneration.toLocaleString(), icon: Zap, color: "text-accent" },
                  { label: "Efficiency", value: `${stats.efficiency}%`, icon: Calendar, color: "text-primary" },
                  { label: "CO₂ Saved", value: `${stats.lifetimeCo2Saved}`, icon: User, color: "text-accent" },
                ].map((stat) => (
                  <motion.div 
                    key={stat.label} 
                    className="glass-card p-4 rounded-xl"
                    whileHover={{ scale: 1.02 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <stat.icon className={`w-4 h-4 ${stat.color}`} />
                      <span className="text-xs text-muted-foreground">{stat.label}</span>
                    </div>
                    <div className="font-display text-xl font-bold text-foreground">{stat.value}</div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Profile;