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
    <section className="py-12 relative bg-background">
      <div className="absolute inset-0 grid-pattern opacity-20" />
      
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
            <CreditCard className="w-4 h-4 text-accent" />
            <span className="text-sm text-accent font-medium uppercase tracking-wide">Token Redemption</span>
          </motion.div>
          <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl tracking-wider mb-4">
            REDEEM & <span className="text-gradient-orange">WITHDRAW</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto font-body">
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
                  <span className="inline-flex items-center px-2 py-1 rounded-full bg-accent/20 text-accent text-xs font-semibold">
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
              <h3 className="font-subheading text-xl font-semibold text-foreground mb-2 uppercase tracking-wide">{feature.title}</h3>
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
              <h3 className="font-subheading text-xl font-semibold text-foreground uppercase tracking-wide">Pay Electricity Bill</h3>
            </div>

            <div className="space-y-5">
              <div>
                <label className="text-sm text-muted-foreground mb-2 block uppercase tracking-wide text-xs">Select Your State</label>
                <Select>
                  <SelectTrigger className="bg-muted border-border text-foreground">
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
                <label className="text-sm text-muted-foreground mb-2 block uppercase tracking-wide text-xs">Electricity Provider</label>
                <Select>
                  <SelectTrigger className="bg-muted border-border text-foreground">
                    <SelectValue placeholder="Choose provider" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="kseb">KSEB @ ₹3.80/token</SelectItem>
                    <SelectItem value="ksebl">KSEBL @ ₹3.85/token</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-sm text-muted-foreground mb-2 block uppercase tracking-wide text-xs">Consumer Account Number</label>
                <Input 
                  placeholder="e.g., KL-1234-567890" 
                  className="bg-muted border-border text-foreground placeholder:text-muted-foreground"
                />
              </div>

              <div>
                <label className="text-sm text-muted-foreground mb-2 block uppercase tracking-wide text-xs">Tokens to Redeem</label>
                <Input 
                  type="number"
                  value={tokenAmount}
                  onChange={(e) => setTokenAmount(e.target.value)}
                  placeholder="Enter amount" 
                  className="bg-muted border-border text-foreground font-mono placeholder:text-muted-foreground"
                />
                <p className="text-xs text-muted-foreground mt-2">
                  Available: <span className="text-primary font-semibold font-mono">{stats.tokenBalance.toLocaleString()} tokens</span>
                </p>
              </div>

              <motion.div 
                className="p-4 rounded-xl bg-primary/10 border border-primary/30"
                animate={{ borderColor: ['hsl(var(--primary) / 0.3)', 'hsl(var(--primary) / 0.5)', 'hsl(var(--primary) / 0.3)'] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground uppercase tracking-wide">Estimated Amount</span>
                  <span className="font-mono text-xl font-bold text-primary">₹{estimatedAmount.toLocaleString()}</span>
                </div>
                <p className="text-xs text-muted-foreground mt-1 font-mono">{tokenAmount || 0} tokens × ₹3.80</p>
              </motion.div>

              <Button 
                onClick={handleRedeem}
                disabled={isRedeeming}
                className="w-full btn-orange rounded-lg py-6 shadow-lg hover:shadow-xl transition-shadow"
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
            className="glass-card p-6 md:p-8 rounded-2xl neon-border-accent"
          >
            <div className="text-center mb-8">
              <motion.div 
                className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/20 flex items-center justify-center"
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <CheckCircle2 className="w-8 h-8 text-primary" />
              </motion.div>
              <h3 className="font-subheading text-2xl font-bold text-foreground mb-2 uppercase tracking-wide">Redemption Preview</h3>
              <p className="text-muted-foreground">Your discount code will appear here</p>
            </div>

            <motion.div 
              className="glass-card p-6 rounded-xl mb-6"
              initial={{ opacity: 0.5 }}
              animate={redeemCode ? { opacity: 1, scale: [1, 1.02, 1] } : { opacity: 0.7 }}
            >
              <div className="text-center mb-4">
                <p className="text-sm text-muted-foreground mb-2 uppercase tracking-wide">Discount Code</p>
                <motion.div 
                  className="font-mono text-2xl font-bold text-accent tracking-wider"
                  animate={redeemCode ? { scale: [1, 1.05, 1] } : {}}
                  transition={{ duration: 0.5 }}
                >
                  {redeemCode || 'ENC-XXXX-XXXXXX'}
                </motion.div>
              </div>
              
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Amount</span>
                  <span className="text-foreground font-medium font-mono">₹{estimatedAmount.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Provider</span>
                  <span className="text-foreground font-medium">KSEB</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Valid Until</span>
                  <span className="text-foreground font-medium font-mono">30-Nov-2025</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Consumer</span>
                  <span className="text-foreground font-medium font-mono">KL-1234-567890</span>
                </div>
              </div>
            </motion.div>

            <div className="grid grid-cols-3 gap-3">
              <Button variant="outline" className="border-primary/30 text-primary hover:bg-primary/10 hover:text-primary">
                Copy
              </Button>
              <Button variant="outline" className="border-primary/30 text-primary hover:bg-primary/10 hover:text-primary">
                Share
              </Button>
              <Button variant="outline" className="border-primary/30 text-primary hover:bg-primary/10 hover:text-primary">
                Download
              </Button>
            </div>

            {/* Bank Withdrawal Section */}
            <div className="mt-6 pt-6 border-t border-border">
              <div className="flex items-center justify-between mb-4">
                <h4 className="font-subheading text-lg font-semibold text-foreground uppercase tracking-wide">Bank Withdrawal</h4>
                <span className="inline-flex items-center px-2 py-1 rounded-full bg-accent/20 text-accent text-xs font-semibold">
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
