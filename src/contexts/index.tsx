import React, { ReactNode } from 'react';
import { AuthProvider } from './AuthContext';
import { WalletProvider } from './WalletContext';
import { EnergyProvider } from './EnergyContext';

// Re-export all hooks for easy importing
export { useAuth } from './AuthContext';
export { useWallet } from './WalletContext';
export { useEnergy } from './EnergyContext';

// Re-export types
export type { User } from './AuthContext';
export type { WalletState } from './WalletContext';
export type { Installation, GenerationDataPoint, EnergyStats } from './EnergyContext';

/**
 * AppProvider - Wraps all context providers
 * 
 * This is the main entry point for all app-wide state.
 * When integrating with a backend, each provider can be updated independently.
 * 
 * Integration points:
 * - AuthProvider: Connect to authentication API (JWT, OAuth, etc.)
 * - WalletProvider: Connect to Solana Wallet Adapter
 * - EnergyProvider: Connect to energy data API and smart contracts
 */
interface AppProviderProps {
  children: ReactNode;
}

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  return (
    <AuthProvider>
      <WalletProvider>
        <EnergyProvider>
          {children}
        </EnergyProvider>
      </WalletProvider>
    </AuthProvider>
  );
};

/**
 * API Configuration Template
 * 
 * When connecting to a backend, create an api/ folder with these files:
 * 
 * src/api/
 *   ├── client.ts      // Axios or fetch wrapper with auth headers
 *   ├── auth.ts        // Authentication endpoints
 *   ├── energy.ts      // Energy data endpoints  
 *   ├── wallet.ts      // Wallet/blockchain endpoints
 *   └── index.ts       // Export all API modules
 * 
 * Example client.ts:
 * 
 * const apiClient = axios.create({
 *   baseURL: process.env.VITE_API_URL,
 *   headers: { 'Content-Type': 'application/json' }
 * });
 * 
 * apiClient.interceptors.request.use((config) => {
 *   const token = localStorage.getItem('auth_token');
 *   if (token) config.headers.Authorization = `Bearer ${token}`;
 *   return config;
 * });
 */
