import { motion } from "framer-motion";
import { CreditCard, Banknote, Send, Zap, ArrowRight, CheckCircle2, Clock, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useEnergy } from "@/contexts";
import { useState } from "react";

const states = [
  { value: "kerala", label: "Kerala" },
  { value: "tamil-nadu", label: "Tamil Nadu" },
  { value: "karnataka", label: "Karnataka" },
  { value: "maharashtra", label: "Maharashtra" },
  { value: "delhi", label: "Delhi" },
];

const features = [
  { 
    icon: CreditCard, 
    title: "Pay Electricity Bill", 
    description: "Redeem tokens to pay your electricity bill with local providers",
    available: true
  },
  { 
    icon: Banknote, 
    title: "Withdraw to Bank", 
    description: "Cash out tokens to your linked bank account (3-5 days)",
    available: false,
    upcoming: true
  },
  { 
    icon: Send, 
    title: "Transfer Tokens", 
    description: "Send tokens peer-to-peer to other EnerChain users instantly",
    available: true
  },
];

export const BillingSection = () => {
  const { stats, redeemTokens } = useEnergy();
  const [tokenAmount, setTokenAmount] = useState('1000');
  const [isRedeeming, setIsRedeeming] = useState(false);
  const [redeemCode, setRedeemCode] = useState<string | null>(null);
  
  const estimatedAmount = parseFloat(tokenAmount || '0') * 3.80;

  const handleRedeem = async () => {
    setIsRedeeming(true);
    try {
      const code = await redeemTokens(parseFloat(tokenAmount), 'kseb', 'KL-1234-567890');
      setRedeemCode(code);
    } finally {
      setIsRedeeming(false);
    }
  };

  return (
    <section className="py-12 relative bg-muted/30">
      <div className="absolute inset-0 grid-pattern opacity-50" />
      
      <div className="container relative z-10 px-4 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-foreground">
            Redeem & <span className="text-accent">Withdrawal</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Convert your tokens to real value - pay bills, withdraw to bank, or transfer to friends.
          </p>
        </motion.div>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={feature.available ? { scale: 1.02, y: -4 } : {}}
              className={`glass-card p-6 rounded-2xl text-center group relative ${
                !feature.available ? 'opacity-80' : ''
              }`}
            >
              {feature.upcoming && (
                <div className="absolute top-4 right-4">
                  <span className="upcoming-badge">
                    <Clock className="w-3 h-3 mr-1" />
                    Upcoming
                  </span>
                </div>
              )}
              <motion.div 
                className={`w-14 h-14 mx-auto mb-4 rounded-xl flex items-center justify-center ${
                  feature.available 
                    ? 'bg-gradient-to-br from-primary/20 to-accent/20' 
                    : 'bg-muted'
                }`}
                whileHover={feature.available ? { rotate: [0, -10, 10, 0] } : {}}
                transition={{ duration: 0.5 }}
              >
                <feature.icon className={`w-7 h-7 ${feature.available ? 'text-primary' : 'text-muted-foreground'}`} />
              </motion.div>
              <h3 className="font-display text-xl font-semibold text-foreground mb-2">{feature.title}</h3>
              <p className="text-muted-foreground text-sm">{feature.description}</p>
              
              {!feature.available && (
                <div className="mt-4 flex items-center justify-center gap-2 text-muted-foreground text-sm">
                  <Lock className="w-4 h-4" />
                  <span>Coming Soon</span>
                </div>
              )}
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Pay Bill Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="glass-card p-6 md:p-8 rounded-2xl"
          >
            <div className="flex items-center gap-3 mb-6">
              <motion.div 
                className="p-2 rounded-lg bg-primary/10"
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <CreditCard className="w-5 h-5 text-primary" />
              </motion.div>
              <h3 className="font-display text-xl font-semibold text-foreground">Pay Electricity Bill</h3>
            </div>

            <div className="space-y-5">
              <div>
                <label className="text-sm text-muted-foreground mb-2 block">Select Your State</label>
                <Select>
                  <SelectTrigger className="bg-muted border-border">
                    <SelectValue placeholder="Choose state" />
                  </SelectTrigger>
                  <SelectContent>
                    {states.map((state) => (
                      <SelectItem key={state.value} value={state.value}>
                        {state.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-sm text-muted-foreground mb-2 block">Electricity Provider</label>
                <Select>
                  <SelectTrigger className="bg-muted border-border">
                    <SelectValue placeholder="Choose provider" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="kseb">KSEB @ ₹3.80/token</SelectItem>
                    <SelectItem value="ksebl">KSEBL @ ₹3.85/token</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-sm text-muted-foreground mb-2 block">Consumer Account Number</label>
                <Input 
                  placeholder="e.g., KL-1234-567890" 
                  className="bg-muted border-border"
                />
              </div>

              <div>
                <label className="text-sm text-muted-foreground mb-2 block">Tokens to Redeem</label>
                <Input 
                  type="number"
                  value={tokenAmount}
                  onChange={(e) => setTokenAmount(e.target.value)}
                  placeholder="Enter amount" 
                  className="bg-muted border-border"
                />
                <p className="text-xs text-muted-foreground mt-2">
                  Available: <span className="text-primary font-semibold">{stats.tokenBalance.toLocaleString()} tokens</span>
                </p>
              </div>

              <motion.div 
                className="p-4 rounded-xl bg-primary/5 border border-primary/20"
                animate={{ borderColor: ['hsl(160 84% 39% / 0.2)', 'hsl(160 84% 39% / 0.4)', 'hsl(160 84% 39% / 0.2)'] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Estimated Amount</span>
                  <span className="font-display text-xl font-bold text-primary">₹{estimatedAmount.toLocaleString()}</span>
                </div>
                <p className="text-xs text-muted-foreground mt-1">{tokenAmount || 0} tokens × ₹3.80</p>
              </motion.div>

              <Button 
                onClick={handleRedeem}
                disabled={isRedeeming}
                className="w-full bg-gradient-to-r from-primary to-primary/80 text-primary-foreground font-display font-semibold py-6 shadow-lg hover:shadow-xl transition-shadow"
              >
                {isRedeeming ? (
                  <motion.div 
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    className="mr-2"
                  >
                    ⚡
                  </motion.div>
                ) : (
                  <Zap className="w-5 h-5 mr-2" />
                )}
                {isRedeeming ? 'Generating...' : 'Generate Discount Code'}
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </div>
          </motion.div>

          {/* Success Preview */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="glass-card p-6 md:p-8 rounded-2xl border-accent/20"
          >
            <div className="text-center mb-8">
              <motion.div 
                className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center"
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <CheckCircle2 className="w-8 h-8 text-primary" />
              </motion.div>
              <h3 className="font-display text-2xl font-bold text-foreground mb-2">Redemption Preview</h3>
              <p className="text-muted-foreground">Your discount code will appear here</p>
            </div>

            <motion.div 
              className="glass-card p-6 rounded-xl mb-6"
              initial={{ opacity: 0.5 }}
              animate={redeemCode ? { opacity: 1, scale: [1, 1.02, 1] } : { opacity: 0.7 }}
            >
              <div className="text-center mb-4">
                <p className="text-sm text-muted-foreground mb-2">Discount Code</p>
                <motion.div 
                  className="font-display text-2xl font-bold text-accent tracking-wider"
                  animate={redeemCode ? { scale: [1, 1.05, 1] } : {}}
                  transition={{ duration: 0.5 }}
                >
                  {redeemCode || 'ENC-XXXX-XXXXXX'}
                </motion.div>
              </div>
              
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Amount</span>
                  <span className="text-foreground font-medium">₹{estimatedAmount.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Provider</span>
                  <span className="text-foreground font-medium">KSEB</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Valid Until</span>
                  <span className="text-foreground font-medium">30-Nov-2025</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Consumer</span>
                  <span className="text-foreground font-medium">KL-1234-567890</span>
                </div>
              </div>
            </motion.div>

            <div className="grid grid-cols-3 gap-3">
              <Button variant="outline" className="border-primary/30 text-primary hover:bg-primary/5">
                Copy
              </Button>
              <Button variant="outline" className="border-primary/30 text-primary hover:bg-primary/5">
                Share
              </Button>
              <Button variant="outline" className="border-primary/30 text-primary hover:bg-primary/5">
                Download
              </Button>
            </div>

            {/* Bank Withdrawal Section */}
            <div className="mt-6 pt-6 border-t border-border">
              <div className="flex items-center justify-between mb-4">
                <h4 className="font-display text-lg font-semibold text-foreground">Bank Withdrawal</h4>
                <span className="upcoming-badge">
                  <Clock className="w-3 h-3 mr-1" />
                  Upcoming
                </span>
              </div>
              <div className="p-4 rounded-xl bg-muted/50 text-center">
                <Banknote className="w-8 h-8 mx-auto mb-2 text-muted-foreground" />
                <p className="text-sm text-muted-foreground mb-3">
                  Withdraw tokens directly to your bank account. This feature is currently under development.
                </p>
                <Button disabled className="w-full" variant="outline">
                  <Lock className="w-4 h-4 mr-2" />
                  Withdraw to Bank
                  <span className="ml-2 text-xs bg-accent/20 text-accent px-2 py-0.5 rounded-full">Upcoming</span>
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
