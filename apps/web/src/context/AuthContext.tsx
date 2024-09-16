'use client'

import { removeToken } from '@/lib/server';
import { useRouter } from 'next/navigation';
import { createContext, useContext, useState, ReactNode, useEffect } from 'react';

interface User {
  userId: number | null,
  token: string | null,
  role: string | null,
  name: string | null,
  email: string | null
}

interface AuthContextType {
  user: User | null;
  login: (userId: number, token: string, role: string, name: string, email: string) => void;
  logout: () => void;
}

const initialValues = {
  userId: null,
  role: null,
  token: null,
  name: null,
  email: null
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User>(initialValues);
  const router = useRouter();

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = (userId: number, token: string, role: string, name: string, email: string) => {
    const newUser = {userId, token, role, name, email};
    setUser(newUser);
    localStorage.setItem('user', JSON.stringify(newUser));
  };

  const logout = () => {
    setUser(initialValues);
    localStorage.removeItem('user');
    removeToken();
    router.push('/');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
