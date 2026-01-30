import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Location } from "./LocationCard";
import { useWallet, useEnergy } from "@/contexts";
import { toast } from "sonner";

interface InstallationModalProps {
  location: Location | null;
  isOpen: boolean;
  onClose: () => void;
}

// Investment calculations based on capacity
const PRICE_PER_KW = 45000; // ₹45,000 per kW
const ANNUAL_GENERATION_PER_KW = 1500; // Units per kW per year
const TOKEN_VALUE = 4.25; // ₹4.25 per token (average)
const MONTHLY_MAINTENANCE = 500; // ₹500 per month
const ANNUAL_LAND_RENTAL = 6000; // ₹6,000 per year
const INSTALLATION_DAYS = 12;

export const InstallationModal = ({ location, isOpen, onClose }: InstallationModalProps) => {
  const [capacity, setCapacity] = useState([5]);
  const { isConnected } = useWallet();
  const { addInstallation } = useEnergy();

  // Investment calculations
  const investment = useMemo(() => {
    const kw = capacity[0];
    const totalInvestment = kw * PRICE_PER_KW;
    const annualGeneration = kw * ANNUAL_GENERATION_PER_KW;
    const monthlyGeneration = Math.round(annualGeneration / 12);
    const grossMonthlyValue = monthlyGeneration * TOKEN_VALUE;
    const netMonthlyValue = grossMonthlyValue - MONTHLY_MAINTENANCE;
    const annualNetValue = netMonthlyValue * 12 - ANNUAL_LAND_RENTAL;
    const paybackYears = totalInvestment / annualNetValue;

    return {
      totalInvestment,
      annualGeneration,
      monthlyGeneration,
      netMonthlyValue: Math.round(netMonthlyValue),
      paybackYears: paybackYears.toFixed(1),
    };
  }, [capacity]);

  const handleConfirmInvest = async () => {
    if (!isConnected) {
      toast.error("Please connect your wallet first");
      return;
    }

    if (!location) return;

    toast.success(`Investment of ₹${investment.totalInvestment.toLocaleString()} confirmed!`);
    
    await addInstallation({
      name: location.name,
      type: location.type,
      location: location.location,
      capacity: `${capacity[0]} kW`,
      capacityKw: capacity[0],
      status: 'inactive',
      efficiency: 0,
      todayUnits: 0,
      monthUnits: 0,
    });

    onClose();
  };

  if (!location) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-lg z-50 p-4"
          >
            <div className="glass-card-accent rounded-xl overflow-hidden">
              {/* Header */}
              <div className="flex items-center justify-between p-6 pb-4">
                <h2 className="font-heading text-3xl tracking-wider text-foreground">
                  PLAN YOUR INSTALLATION
                </h2>
                <button
                  onClick={onClose}
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="px-6 pb-6 space-y-6">
                {/* Location Info */}
                <div className="glass-card p-4 rounded-lg">
                  <h3 className="font-body font-semibold text-foreground text-lg">{location.name}</h3>
                  <p className="text-muted-foreground text-sm">{location.location}</p>
                </div>

                {/* Capacity Slider */}
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-muted-foreground text-sm uppercase tracking-wider">Capacity (kW)</span>
                  </div>
                  <Slider
                    value={capacity}
                    onValueChange={setCapacity}
                    min={1}
                    max={25}
                    step={1}
                    className="mb-2"
                  />
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">1 kW</span>
                    <span className="font-mono text-2xl font-bold text-primary">
                      {capacity[0]} <span className="text-lg">kW</span>
                    </span>
                    <span className="text-muted-foreground">25 kW</span>
                  </div>
                </div>

                {/* Investment Summary */}
                <div className="glass-card p-5 rounded-lg space-y-4">
                  <h4 className="font-body font-bold text-xl text-foreground">Investment Summary</h4>
                  
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">Total Investment</span>
                      <span className="font-mono text-xl font-bold text-accent">
                        ₹{investment.totalInvestment.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">Annual Generation</span>
                      <span className="font-mono font-semibold text-primary">
                        {investment.annualGeneration.toLocaleString()} <span className="text-muted-foreground text-sm">Units</span>
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">Monthly Generation</span>
                      <span className="font-mono font-semibold text-primary">
                        {investment.monthlyGeneration.toLocaleString()} <span className="text-muted-foreground text-sm">Units</span>
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">Net Monthly Value*</span>
                      <span className="font-mono font-bold text-accent">
                        ₹{investment.netMonthlyValue.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">Payback Period</span>
                      <span className="font-mono font-bold text-foreground">
                        {investment.paybackYears} <span className="text-muted-foreground text-sm">years</span>
                      </span>
                    </div>
                  </div>
                </div>

                {/* Recurring Charges */}
                <div className="glass-card p-4 rounded-lg">
                  <h4 className="font-body font-semibold text-foreground mb-3">Recurring Charges:</h4>
                  <ul className="space-y-1.5 text-sm text-muted-foreground">
                    <li>• Monthly Maintenance: ₹{MONTHLY_MAINTENANCE} (auto-deducted)</li>
                    <li>• Annual Land Rental: ₹{ANNUAL_LAND_RENTAL.toLocaleString()}</li>
                    <li>• Installation Timeline: {INSTALLATION_DAYS} days</li>
                  </ul>
                </div>

                {/* CTA Button */}
                <Button
                  onClick={handleConfirmInvest}
                  className="w-full btn-orange rounded-lg py-4 text-lg"
                >
                  CONFIRM & INVEST ₹{investment.totalInvestment.toLocaleString()}
                </Button>

                {/* Disclaimer */}
                <p className="text-center text-xs text-muted-foreground">
                  *After monthly maintenance deduction. Token value varies by provider (₹3.70-5.00)
                </p>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
