import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';

// Types for Auth - prepared for backend integration
export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  level: number;
  levelTitle: string;
  xp: number;
  xpRequired: number;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

interface AuthContextType extends AuthState {
  // Auth methods - ready for backend integration
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  register: (email: string, password: string, name: string) => Promise<void>;
  updateProfile: (updates: Partial<User>) => Promise<void>;
  // Placeholder for API integration
  setAuthToken: (token: string) => void;
  authToken: string | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock user for demo - replace with API call
const MOCK_USER: User = {
  id: 'user_001',
  email: 'kailas@enerchain.io',
  name: 'Kailas',
  avatar: undefined,
  level: 7,
  levelTitle: 'Eco Warrior',
  xp: 2450,
  xpRequired: 5000,
};

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, setState] = useState<AuthState>({
    user: MOCK_USER, // Start with mock user for demo
    isAuthenticated: true,
    isLoading: false,
  });
  const [authToken, setAuthToken] = useState<string | null>(null);

  // LOGIN - Ready for backend integration
  // TODO: Replace with actual API call
  // Example: const response = await fetch('/api/auth/login', { ... })
  const login = useCallback(async (email: string, password: string) => {
    setState(prev => ({ ...prev, isLoading: true }));
    try {
      // BACKEND INTEGRATION POINT
      // const response = await authApi.login(email, password);
      // setAuthToken(response.token);
      // setState({ user: response.user, isAuthenticated: true, isLoading: false });
      
      // Mock implementation
      await new Promise(resolve => setTimeout(resolve, 1000));
      setState({
        user: MOCK_USER,
        isAuthenticated: true,
        isLoading: false,
      });
    } catch (error) {
      setState(prev => ({ ...prev, isLoading: false }));
      throw error;
    }
  }, []);

  // LOGOUT - Ready for backend integration
  const logout = useCallback(async () => {
    setState(prev => ({ ...prev, isLoading: true }));
    try {
      // BACKEND INTEGRATION POINT
      // await authApi.logout();
      
      setAuthToken(null);
      setState({
        user: null,
        isAuthenticated: false,
        isLoading: false,
      });
    } catch (error) {
      setState(prev => ({ ...prev, isLoading: false }));
      throw error;
    }
  }, []);

  // REGISTER - Ready for backend integration
  const register = useCallback(async (email: string, password: string, name: string) => {
    setState(prev => ({ ...prev, isLoading: true }));
    try {
      // BACKEND INTEGRATION POINT
      // const response = await authApi.register({ email, password, name });
      // setAuthToken(response.token);
      // setState({ user: response.user, isAuthenticated: true, isLoading: false });
      
      await new Promise(resolve => setTimeout(resolve, 1000));
      setState({
        user: { ...MOCK_USER, email, name },
        isAuthenticated: true,
        isLoading: false,
      });
    } catch (error) {
      setState(prev => ({ ...prev, isLoading: false }));
      throw error;
    }
  }, []);

  // UPDATE PROFILE - Ready for backend integration
  const updateProfile = useCallback(async (updates: Partial<User>) => {
    try {
      // BACKEND INTEGRATION POINT
      // const response = await authApi.updateProfile(updates);
      // setState(prev => ({ ...prev, user: response.user }));
      
      setState(prev => ({
        ...prev,
        user: prev.user ? { ...prev.user, ...updates } : null,
      }));
    } catch (error) {
      throw error;
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{
        ...state,
        login,
        logout,
        register,
        updateProfile,
        setAuthToken,
        authToken,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
