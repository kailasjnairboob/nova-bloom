import { Navbar } from "@/components/layout/Navbar";
import { motion } from "framer-motion";
import { 
  User, Wallet, Settings, LogOut, Copy, ExternalLink, 
  Zap, TrendingUp, Calendar, Shield, Bell, Sun, Wind 
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

const transactions = [
  { id: 1, type: "Earned", amount: "+245.5", date: "28-Oct-2025", balance: "387,452.0" },
  { id: 2, type: "Earned", amount: "+189.2", date: "27-Oct-2025", balance: "387,206.5" },
  { id: 3, type: "Redeemed", amount: "-1,000", date: "26-Oct-2025", balance: "387,017.3" },
  { id: 4, type: "Earned", amount: "+267.8", date: "25-Oct-2025", balance: "388,017.3" },
  { id: 5, type: "Sent", amount: "-50", date: "24-Oct-2025", balance: "387,749.5" },
];

const installations = [
  { name: "Rajasthan Solar", type: "Solar", capacity: "2.2 kW", status: "active", icon: Sun },
  { name: "Tamil Nadu Wind", type: "Wind", capacity: "1.5 kW", status: "active", icon: Wind },
];

const Profile = () => {
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
                  K
                </div>
                <h2 className="font-display text-2xl font-bold text-foreground mb-1">Kailas</h2>
                <p className="text-accent font-semibold mb-4">Level 7 - Eco Warrior</p>
                
                <div className="mb-4">
                  <div className="flex items-center justify-between text-sm mb-2">
                    <span className="text-muted-foreground">XP Progress</span>
                    <span className="font-display font-semibold text-foreground">2,450 / 5,000</span>
                  </div>
                  <Progress value={49} className="h-3" />
                </div>

                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div className="p-3 rounded-xl bg-muted/50">
                    <div className="font-display text-lg font-bold text-primary">387,452</div>
                    <p className="text-muted-foreground">Tokens</p>
                  </div>
                  <div className="p-3 rounded-xl bg-muted/50">
                    <div className="font-display text-lg font-bold text-accent">1,245 kg</div>
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
                    <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                    <span className="text-xs text-primary font-medium">Connected</span>
                  </span>
                </div>

                <div className="p-3 rounded-xl bg-muted/50 mb-4">
                  <p className="text-xs text-muted-foreground mb-1">Wallet Address</p>
                  <div className="flex items-center gap-2">
                    <code className="text-sm text-foreground font-mono">4A1z...xY9k</code>
                    <Button size="icon" variant="ghost" className="h-6 w-6">
                      <Copy className="w-3 h-3" />
                    </Button>
                    <Button size="icon" variant="ghost" className="h-6 w-6">
                      <ExternalLink className="w-3 h-3" />
                    </Button>
                  </div>
                </div>

                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Network</span>
                  <span className="text-foreground font-medium">Solana Devnet</span>
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
                  <Button variant="outline" className="w-full justify-start border-destructive/50 text-destructive hover:bg-destructive/10">
                    <LogOut className="w-4 h-4 mr-3" />
                    Disconnect Wallet
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
                  {installations.map((install) => (
                    <div
                      key={install.name}
                      className="p-4 rounded-xl bg-muted/30 border border-border/50"
                    >
                      <div className="flex items-center gap-3 mb-3">
                        <div className="p-2 rounded-lg bg-primary/20">
                          <install.icon className="w-5 h-5 text-primary" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-foreground">{install.name}</h4>
                          <p className="text-xs text-muted-foreground">{install.type} • {install.capacity}</p>
                        </div>
                        <span className="ml-auto flex items-center gap-1.5">
                          <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                          <span className="text-xs text-primary font-medium uppercase">Live</span>
                        </span>
                      </div>
                      <div className="grid grid-cols-2 gap-2 text-sm">
                        <div>
                          <p className="text-muted-foreground">Today</p>
                          <p className="font-semibold text-foreground">8.5 Units</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">This Month</p>
                          <p className="font-semibold text-accent">245 Units</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Transaction History */}
              <div className="glass-card p-6 rounded-2xl">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="font-display text-xl font-semibold text-foreground">Transaction History</h3>
                  <Button variant="ghost" size="sm" className="text-primary hover:bg-primary/10">
                    View All
                  </Button>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-border/50">
                        <th className="text-left py-3 px-2 text-sm font-medium text-muted-foreground">Date</th>
                        <th className="text-left py-3 px-2 text-sm font-medium text-muted-foreground">Type</th>
                        <th className="text-right py-3 px-2 text-sm font-medium text-muted-foreground">Amount</th>
                        <th className="text-right py-3 px-2 text-sm font-medium text-muted-foreground">Balance</th>
                      </tr>
                    </thead>
                    <tbody>
                      {transactions.map((tx) => (
                        <tr key={tx.id} className="border-b border-border/30 hover:bg-muted/20">
                          <td className="py-3 px-2 text-sm text-foreground">{tx.date}</td>
                          <td className="py-3 px-2">
                            <span className={`text-sm font-medium ${
                              tx.type === 'Earned' ? 'text-primary' : 
                              tx.type === 'Redeemed' ? 'text-accent' : 'text-muted-foreground'
                            }`}>
                              {tx.type}
                            </span>
                          </td>
                          <td className={`py-3 px-2 text-sm text-right font-display font-semibold ${
                            tx.amount.startsWith('+') ? 'text-primary' : 'text-accent'
                          }`}>
                            {tx.amount}
                          </td>
                          <td className="py-3 px-2 text-sm text-right text-foreground font-mono">
                            {tx.balance}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Stats Summary */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { label: "Total Earned", value: "412,500", icon: TrendingUp, color: "primary" },
                  { label: "Total Redeemed", value: "25,048", icon: Zap, color: "accent" },
                  { label: "Days Active", value: "45", icon: Calendar, color: "primary" },
                  { label: "Referrals", value: "2", icon: User, color: "accent" },
                ].map((stat) => (
                  <div key={stat.label} className="glass-card p-4 rounded-xl">
                    <div className="flex items-center gap-2 mb-2">
                      <stat.icon className={`w-4 h-4 text-${stat.color}`} />
                      <span className="text-xs text-muted-foreground">{stat.label}</span>
                    </div>
                    <div className="font-display text-xl font-bold text-foreground">{stat.value}</div>
                  </div>
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
