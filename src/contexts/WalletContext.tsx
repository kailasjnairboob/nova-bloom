import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';

// Types for Wallet - prepared for Solana integration
export interface WalletState {
  isConnected: boolean;
  isConnecting: boolean;
  address: string | null;
  shortAddress: string | null;
  balance: number;
  network: 'mainnet-beta' | 'devnet' | 'testnet';
  walletType: 'phantom' | 'solflare' | 'backpack' | null;
}

interface WalletContextType extends WalletState {
  // Wallet connection methods - ready for Solana Wallet Adapter
  connect: (walletType?: 'phantom' | 'solflare' | 'backpack') => Promise<void>;
  disconnect: () => Promise<void>;
  
  // Transaction methods - ready for Solana SDK
  sendTransaction: (to: string, amount: number) => Promise<string>;
  signMessage: (message: string) => Promise<string>;
  
  // Token operations
  getTokenBalance: () => Promise<number>;
  refreshBalance: () => Promise<void>;
  
  // Solana-specific placeholders
  // publicKey: PublicKey | null; // Add when integrating @solana/web3.js
  // signTransaction: (tx: Transaction) => Promise<Transaction>; // For Solana transactions
}

const WalletContext = createContext<WalletContextType | undefined>(undefined);

// Mock data for demo
const MOCK_ADDRESS = '4A1zD9xF7bN2qR8mK5vP3wL6yH0cE4sU9tJ1oI7xY9kR';
const shortenAddress = (addr: string) => `${addr.slice(0, 4)}...${addr.slice(-4)}`;

export const WalletProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, setState] = useState<WalletState>({
    isConnected: true, // Demo mode
    isConnecting: false,
    address: MOCK_ADDRESS,
    shortAddress: shortenAddress(MOCK_ADDRESS),
    balance: 387452,
    network: 'devnet',
    walletType: 'phantom',
  });

  // CONNECT WALLET - Ready for Solana Wallet Adapter integration
  // TODO: Integrate with @solana/wallet-adapter-react
  // Example:
  // import { useWallet } from '@solana/wallet-adapter-react';
  // const { connect, publicKey } = useWallet();
  const connect = useCallback(async (walletType: 'phantom' | 'solflare' | 'backpack' = 'phantom') => {
    setState(prev => ({ ...prev, isConnecting: true }));
    try {
      // SOLANA INTEGRATION POINT
      // const wallet = wallets.find(w => w.adapter.name === walletType);
      // await wallet?.adapter.connect();
      // const publicKey = wallet?.adapter.publicKey;
      
      await new Promise(resolve => setTimeout(resolve, 1500));
      setState({
        isConnected: true,
        isConnecting: false,
        address: MOCK_ADDRESS,
        shortAddress: shortenAddress(MOCK_ADDRESS),
        balance: 387452,
        network: 'devnet',
        walletType,
      });
    } catch (error) {
      setState(prev => ({ ...prev, isConnecting: false }));
      throw error;
    }
  }, []);

  // DISCONNECT WALLET
  const disconnect = useCallback(async () => {
    try {
      // SOLANA INTEGRATION POINT
      // await wallet.disconnect();
      
      setState({
        isConnected: false,
        isConnecting: false,
        address: null,
        shortAddress: null,
        balance: 0,
        network: 'devnet',
        walletType: null,
      });
    } catch (error) {
      throw error;
    }
  }, []);

  // SEND TRANSACTION - Ready for Solana SDK
  const sendTransaction = useCallback(async (to: string, amount: number): Promise<string> => {
    // SOLANA INTEGRATION POINT
    // import { Connection, Transaction, SystemProgram } from '@solana/web3.js';
    // const connection = new Connection(rpcUrl);
    // const transaction = new Transaction().add(
    //   SystemProgram.transfer({ fromPubkey, toPubkey, lamports })
    // );
    // const signature = await sendAndConfirmTransaction(connection, transaction, [payer]);
    
    await new Promise(resolve => setTimeout(resolve, 2000));
    const mockTxHash = `${Math.random().toString(36).substring(2, 15)}...`;
    
    setState(prev => ({
      ...prev,
      balance: prev.balance - amount,
    }));
    
    return mockTxHash;
  }, []);

  // SIGN MESSAGE
  const signMessage = useCallback(async (message: string): Promise<string> => {
    // SOLANA INTEGRATION POINT
    // const encodedMessage = new TextEncoder().encode(message);
    // const signature = await wallet.signMessage(encodedMessage);
    
    await new Promise(resolve => setTimeout(resolve, 500));
    return `signature_${Date.now()}`;
  }, []);

  // GET TOKEN BALANCE
  const getTokenBalance = useCallback(async (): Promise<number> => {
    // SOLANA INTEGRATION POINT
    // const connection = new Connection(rpcUrl);
    // const tokenAccounts = await connection.getTokenAccountsByOwner(publicKey, { mint: tokenMint });
    // Parse and return balance
    
    return state.balance;
  }, [state.balance]);

  // REFRESH BALANCE
  const refreshBalance = useCallback(async () => {
    // SOLANA INTEGRATION POINT
    // const balance = await getTokenBalance();
    // setState(prev => ({ ...prev, balance }));
    
    setState(prev => ({ ...prev, balance: prev.balance + Math.floor(Math.random() * 10) }));
  }, []);

  return (
    <WalletContext.Provider
      value={{
        ...state,
        connect,
        disconnect,
        sendTransaction,
        signMessage,
        getTokenBalance,
        refreshBalance,
      }}
    >
      {children}
    </WalletContext.Provider>
  );
};

export const useWallet = (): WalletContextType => {
  const context = useContext(WalletContext);
  if (context === undefined) {
    throw new Error('useWallet must be used within a WalletProvider');
  }
  return context;
};
