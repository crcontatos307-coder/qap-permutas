
import React, { createContext, useState, useContext, ReactNode } from 'react';
import { User } from '../types';
import { MOCK_USERS } from '../services/mockDb';

interface AuthContextType {
  user: User | null;
  login: (email: string, matricula: string) => Promise<User | null>;
  register: (nome: string, email: string, matricula: string) => Promise<User | null>;
  logout: () => void;
  simulateApproval: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [usersDb, setUsersDb] = useState<User[]>(MOCK_USERS);

  const login = async (email: string, matricula: string): Promise<User | null> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const foundUser = usersDb.find(u => u.email === email && u.matricula === matricula);
        if (foundUser) {
          setUser(foundUser);
          resolve(foundUser);
        } else {
          resolve(null);
        }
      }, 500);
    });
  };

  const register = async (nome: string, email: string, matricula: string): Promise<User | null> => {
     return new Promise((resolve) => {
        setTimeout(() => {
            const existingUser = usersDb.find(u => u.email === email || u.matricula === matricula);
            if (existingUser) {
                resolve(null); // User already exists
                return;
            }
            const newUser: User = {
                id: `user-${Date.now()}`,
                nome,
                email,
                matricula,
                status: 'pendente',
            };
            setUsersDb(prev => [...prev, newUser]);
            setUser(newUser);
            resolve(newUser);
        }, 500);
     });
  };

  const logout = () => {
    setUser(null);
  };

  const simulateApproval = () => {
    if (user && user.status === 'pendente') {
      const updatedUser = { ...user, status: 'aprovado' as const };
      setUser(updatedUser);
      setUsersDb(prev => prev.map(u => u.id === user.id ? updatedUser : u));
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, simulateApproval }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
