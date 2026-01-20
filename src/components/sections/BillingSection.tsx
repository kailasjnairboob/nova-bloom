import { motion } from "framer-motion";
import { CreditCard, Banknote, Send, Zap, ArrowRight, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const states = [
  { value: "kerala", label: "Kerala" },
  { value: "tamil-nadu", label: "Tamil Nadu" },
  { value: "karnataka", label: "Karnataka" },
  { value: "maharashtra", label: "Maharashtra" },
  { value: "delhi", label: "Delhi" },
];

const providers = {
  kerala: [
    { value: "kseb", label: "KSEB", rate: 3.80 },
    { value: "ksebl", label: "KSEBL", rate: 3.85 },
  ],
  delhi: [
    { value: "brpl", label: "BRPL", rate: 5.00 },
    { value: "tpddl", label: "TPDDL", rate: 4.95 },
  ],
};

const features = [
  { icon: CreditCard, title: "Pay Electricity Bill", description: "Redeem tokens to pay your electricity bill with local providers" },
  { icon: Banknote, title: "Withdraw to Bank", description: "Cash out tokens to your linked bank account (3-5 days)" },
  { icon: Send, title: "Transfer Tokens", description: "Send tokens peer-to-peer to other EnerChain users instantly" },
];

export const BillingSection = () => {
  return (
    <section className="py-12 relative">
      <div className="absolute inset-0 grid-pattern opacity-30" />
      
      <div className="container relative z-10 px-4 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            Redeem & <span className="text-accent text-glow-accent">Withdrawal</span>
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
              className="glass-card p-6 rounded-2xl text-center group hover:border-primary/40 transition-all duration-300"
            >
              <div className="w-14 h-14 mx-auto mb-4 rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                <feature.icon className="w-7 h-7 text-primary" />
              </div>
              <h3 className="font-display text-xl font-semibold text-foreground mb-2">{feature.title}</h3>
              <p className="text-muted-foreground text-sm">{feature.description}</p>
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
              <div className="p-2 rounded-lg bg-primary/20">
                <CreditCard className="w-5 h-5 text-primary" />
              </div>
              <h3 className="font-display text-xl font-semibold text-foreground">Pay Electricity Bill</h3>
            </div>

            <div className="space-y-5">
              <div>
                <label className="text-sm text-muted-foreground mb-2 block">Select Your State</label>
                <Select>
                  <SelectTrigger className="bg-muted/50 border-border/50">
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
                  <SelectTrigger className="bg-muted/50 border-border/50">
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
                  className="bg-muted/50 border-border/50"
                />
              </div>

              <div>
                <label className="text-sm text-muted-foreground mb-2 block">Tokens to Redeem</label>
                <Input 
                  type="number"
                  placeholder="Enter amount" 
                  className="bg-muted/50 border-border/50"
                />
                <p className="text-xs text-muted-foreground mt-2">
                  Available: <span className="text-primary font-semibold">387,452 tokens</span>
                </p>
              </div>

              <div className="p-4 rounded-xl bg-primary/10 border border-primary/30">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Estimated Amount</span>
                  <span className="font-display text-xl font-bold text-primary">₹3,800</span>
                </div>
                <p className="text-xs text-muted-foreground mt-1">1,000 tokens × ₹3.80</p>
              </div>

              <Button className="w-full bg-gradient-to-r from-primary to-primary/80 text-primary-foreground font-display font-semibold py-6">
                <Zap className="w-5 h-5 mr-2" />
                Generate Discount Code
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </div>
          </motion.div>

          {/* Success Preview */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="glass-card-accent p-6 md:p-8 rounded-2xl"
          >
            <div className="text-center mb-8">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/20 flex items-center justify-center">
                <CheckCircle2 className="w-8 h-8 text-primary" />
              </div>
              <h3 className="font-display text-2xl font-bold text-foreground mb-2">Redemption Preview</h3>
              <p className="text-muted-foreground">Your discount code will appear here</p>
            </div>

            <div className="glass-card p-6 rounded-xl mb-6">
              <div className="text-center mb-4">
                <p className="text-sm text-muted-foreground mb-2">Discount Code</p>
                <div className="font-display text-2xl font-bold text-accent tracking-wider">
                  ENC-2025-A7B9C2
                </div>
              </div>
              
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Amount</span>
                  <span className="text-foreground font-medium">₹3,800</span>
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
            </div>

            <div className="grid grid-cols-3 gap-3">
              <Button variant="outline" className="border-primary/50 text-primary hover:bg-primary/10">
                Copy
              </Button>
              <Button variant="outline" className="border-primary/50 text-primary hover:bg-primary/10">
                Share
              </Button>
              <Button variant="outline" className="border-primary/50 text-primary hover:bg-primary/10">
                Download
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
