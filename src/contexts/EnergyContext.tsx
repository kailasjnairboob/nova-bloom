import React, { createContext, useContext, useState, useCallback, useEffect, ReactNode } from 'react';

// Types for Energy Data - prepared for API integration
export interface Installation {
  id: string;
  name: string;
  type: 'Solar' | 'Wind' | 'Hybrid';
  location: string;
  capacity: string;
  capacityKw: number;
  status: 'active' | 'inactive' | 'maintenance';
  efficiency: number;
  todayUnits: number;
  monthUnits: number;
}

export interface GenerationDataPoint {
  time: string;
  units: number;
  timestamp?: number;
}

export interface EnergyStats {
  tokenBalance: number;
  todayGeneration: number;
  activePower: number;
  efficiency: number;
  peakToday: { value: number; time: string };
  monthlyUnits: number;
  lifetimeCo2Saved: number;
}

interface EnergyContextType {
  // Data
  stats: EnergyStats;
  installations: Installation[];
  generationHistory: GenerationDataPoint[];
  isLoading: boolean;
  
  // Actions - ready for API integration
  fetchStats: () => Promise<void>;
  fetchInstallations: () => Promise<void>;
  fetchGenerationHistory: (period: '24h' | '7d' | '30d') => Promise<void>;
  addInstallation: (installation: Omit<Installation, 'id'>) => Promise<void>;
  
  // Real-time updates
  subscribeToLiveData: () => void;
  unsubscribeFromLiveData: () => void;
  
  // Token operations - ready for smart contract integration
  redeemTokens: (amount: number, providerId: string, consumerId: string) => Promise<string>;
  transferTokens: (to: string, amount: number) => Promise<string>;
}

const EnergyContext = createContext<EnergyContextType | undefined>(undefined);

// Mock data
const MOCK_STATS: EnergyStats = {
  tokenBalance: 387452,
  todayGeneration: 12845,
  activePower: 1847.5,
  efficiency: 94.2,
  peakToday: { value: 968, time: '12:30' },
  monthlyUnits: 387452,
  lifetimeCo2Saved: 1245,
};

const MOCK_INSTALLATIONS: Installation[] = [
  {
    id: 'inst_001',
    name: 'Rajasthan Solar',
    type: 'Solar',
    location: 'Jodhpur, Rajasthan',
    capacity: '2.2 kW',
    capacityKw: 2.2,
    status: 'active',
    efficiency: 94.2,
    todayUnits: 8.5,
    monthUnits: 245,
  },
  {
    id: 'inst_002',
    name: 'Tamil Nadu Wind',
    type: 'Wind',
    location: 'Tirunelveli, Tamil Nadu',
    capacity: '1.5 kW',
    capacityKw: 1.5,
    status: 'active',
    efficiency: 89.7,
    todayUnits: 4.3,
    monthUnits: 189,
  },
];

const MOCK_GENERATION_DATA: GenerationDataPoint[] = [
  { time: '00:00', units: 120 },
  { time: '04:00', units: 80 },
  { time: '08:00', units: 450 },
  { time: '12:00', units: 920 },
  { time: '16:00', units: 680 },
  { time: '20:00', units: 340 },
  { time: '23:00', units: 180 },
];

export const EnergyProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [stats, setStats] = useState<EnergyStats>(MOCK_STATS);
  const [installations, setInstallations] = useState<Installation[]>(MOCK_INSTALLATIONS);
  const [generationHistory, setGenerationHistory] = useState<GenerationDataPoint[]>(MOCK_GENERATION_DATA);
  const [isLoading, setIsLoading] = useState(false);
  const [liveDataInterval, setLiveDataInterval] = useState<NodeJS.Timeout | null>(null);

  // FETCH STATS - Ready for API integration
  const fetchStats = useCallback(async () => {
    setIsLoading(true);
    try {
      // API INTEGRATION POINT
      // const response = await energyApi.getStats();
      // setStats(response.data);
      
      await new Promise(resolve => setTimeout(resolve, 500));
      setStats(MOCK_STATS);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // FETCH INSTALLATIONS
  const fetchInstallations = useCallback(async () => {
    try {
      // API INTEGRATION POINT
      // const response = await energyApi.getInstallations();
      // setInstallations(response.data);
      
      await new Promise(resolve => setTimeout(resolve, 500));
      setInstallations(MOCK_INSTALLATIONS);
    } catch (error) {
      throw error;
    }
  }, []);

  // FETCH GENERATION HISTORY
  const fetchGenerationHistory = useCallback(async (period: '24h' | '7d' | '30d') => {
    try {
      // API INTEGRATION POINT
      // const response = await energyApi.getGenerationHistory(period);
      // setGenerationHistory(response.data);
      
      await new Promise(resolve => setTimeout(resolve, 500));
      setGenerationHistory(MOCK_GENERATION_DATA);
    } catch (error) {
      throw error;
    }
  }, []);

  // ADD INSTALLATION
  const addInstallation = useCallback(async (installation: Omit<Installation, 'id'>) => {
    try {
      // API INTEGRATION POINT
      // const response = await energyApi.addInstallation(installation);
      // setInstallations(prev => [...prev, response.data]);
      
      const newInstallation: Installation = {
        ...installation,
        id: `inst_${Date.now()}`,
      };
      setInstallations(prev => [...prev, newInstallation]);
    } catch (error) {
      throw error;
    }
  }, []);

  // SUBSCRIBE TO LIVE DATA - Ready for WebSocket integration
  const subscribeToLiveData = useCallback(() => {
    // WEBSOCKET INTEGRATION POINT
    // const ws = new WebSocket('wss://api.enerchain.io/live');
    // ws.onmessage = (event) => {
    //   const data = JSON.parse(event.data);
    //   setStats(prev => ({ ...prev, ...data }));
    // };
    
    // Mock live updates
    const interval = setInterval(() => {
      setStats(prev => ({
        ...prev,
        activePower: prev.activePower + (Math.random() - 0.5) * 50,
        tokenBalance: prev.tokenBalance + Math.random() * 0.5,
      }));
    }, 3000);
    
    setLiveDataInterval(interval);
  }, []);

  const unsubscribeFromLiveData = useCallback(() => {
    if (liveDataInterval) {
      clearInterval(liveDataInterval);
      setLiveDataInterval(null);
    }
  }, [liveDataInterval]);

  // REDEEM TOKENS - Ready for smart contract integration
  const redeemTokens = useCallback(async (amount: number, providerId: string, consumerId: string): Promise<string> => {
    // SMART CONTRACT INTEGRATION POINT
    // const contract = new Contract(programId, provider);
    // const tx = await contract.methods.redeemTokens(amount, providerId, consumerId).send();
    
    await new Promise(resolve => setTimeout(resolve, 2000));
    setStats(prev => ({
      ...prev,
      tokenBalance: prev.tokenBalance - amount,
    }));
    
    return `ENC-${Date.now()}-${Math.random().toString(36).substring(2, 8).toUpperCase()}`;
  }, []);

  // TRANSFER TOKENS
  const transferTokens = useCallback(async (to: string, amount: number): Promise<string> => {
    // SMART CONTRACT INTEGRATION POINT
    // const tx = await tokenContract.transfer(to, amount);
    
    await new Promise(resolve => setTimeout(resolve, 1500));
    setStats(prev => ({
      ...prev,
      tokenBalance: prev.tokenBalance - amount,
    }));
    
    return `TX_${Date.now()}`;
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (liveDataInterval) {
        clearInterval(liveDataInterval);
      }
    };
  }, [liveDataInterval]);

  return (
    <EnergyContext.Provider
      value={{
        stats,
        installations,
        generationHistory,
        isLoading,
        fetchStats,
        fetchInstallations,
        fetchGenerationHistory,
        addInstallation,
        subscribeToLiveData,
        unsubscribeFromLiveData,
        redeemTokens,
        transferTokens,
      }}
    >
      {children}
    </EnergyContext.Provider>
  );
};

export const useEnergy = (): EnergyContextType => {
  const context = useContext(EnergyContext);
  if (context === undefined) {
    throw new Error('useEnergy must be used within an EnergyProvider');
  }
  return context;
};
