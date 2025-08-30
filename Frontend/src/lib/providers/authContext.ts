import { createContext, useContext } from 'react';

export interface User {
  _id: string;
  email: string;
  full_name: string;
  whoareyou?: string;
  current_level_of_study?: string;
  isOnboarded: boolean;
  isPremium: boolean;
}

export interface AuthContextType {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (token: string, user: User) => void;
    logout: () => void;
      setIsAuthenticated: (isAuthenticated: boolean) => void;

  updateUser: (user: User) => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuthContext must be used within an AuthProvider');
  }
  return context;
};
