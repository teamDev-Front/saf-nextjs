// hooks/useAuth.tsx
"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { setCookie, deleteCookie, getCookie } from 'cookies-next';

type User = {
  id: number;
  name: string;
  email: string;
  is_admin: boolean;
};

type AuthContextType = {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string, confirmPassword: string) => Promise<void>;
  logout: () => void;
  error: string | null;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  // Verificar autenticação inicial
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = getCookie('token');
        
        if (token) {
          const response = await axios.get('/api/me');
          setUser(response.data);
        }
      } catch (error) {
        // Remover token inválido
        deleteCookie('token');
      } finally {
        setLoading(false);
      }
    };
    
    checkAuth();
  }, []);

  const login = async (email: string, password: string) => {
    try {
      setError(null);
      setLoading(true);
      
      console.log('[CLIENT] Iniciando login:', { email });
      
      const response = await axios.post('/api/login', { email, password });
      
      console.log('[CLIENT] Login bem-sucedido');
      
      setCookie('token', response.data.token);
      setUser(response.data.user);
      
      router.push('/');
    } catch (error: any) {
      console.error('[CLIENT] Erro durante o login:', error);
      
      if (error.response) {
        setError(error.response.data.message || 'Erro ao fazer login');
      } else {
        setError('Erro ao processar o login');
      }
    } finally {
      setLoading(false);
    }
  };

  const register = async (name: string, email: string, password: string, confirmPassword: string) => {
    try {
      setError(null);
      setLoading(true);
      
      console.log('[CLIENT] Iniciando registro de usuário:', { name, email });
      
      await axios.post('/api/register', { 
        name, 
        email, 
        password, 
        confirmPassword 
      });
      
      console.log('[CLIENT] Registro bem-sucedido, tentando login automático');
      
      // Após registro, fazer login automaticamente
      await login(email, password);
    } catch (error: any) {
      console.error('[CLIENT] Erro durante o registro:', error);
      
      if (error.response) {
        setError(error.response.data.message || 'Erro ao registrar usuário');
      } else {
        setError('Erro ao processar o registro');
      }
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    deleteCookie('token');
    setUser(null);
    router.push('/');
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout, error }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  
  return context;
}