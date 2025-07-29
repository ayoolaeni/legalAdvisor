import React, { createContext, useContext, useState, ReactNode } from 'react';
import { AuthUser, AuthContextType } from '../types';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState(false);

    const login = async (email: string, password: string): Promise<void> => {
    setIsLoading(true);
    try {
      const response = await fetch('http://localhost:5200/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include', // ✅ This allows Flask to set the session cookie
        body: JSON.stringify({ email, password })
      });

      const data = await response.json();

      if (!response.ok) throw new Error(data.error || 'Login failed');

      // Save user info from response (if you want)
      const mockUser: AuthUser = {
        id: data.user_id,
        email,
        name: email.split('@')[0],
        isAuthenticated: true
      };

      setUser(mockUser);
      localStorage.setItem('auth_user', JSON.stringify(mockUser));
    } catch (error) {
      throw new Error('Invalid email or password');
    } finally {
      setIsLoading(false);
    }
  };


const signup = async (name: string, email: string, password: string): Promise<void> => {
  setIsLoading(true);
  try {
    const response = await fetch('http://localhost:5200/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({ name, email, password })  // ✅ Fixed here
    });

    const data = await response.json();
    if (!response.ok) throw new Error(data.error || 'Signup failed');

    // Auto-login after signup
    await login(email, password);
  } catch (error) {
    throw new Error('Signup failed');
  } finally {
    setIsLoading(false);
  }
};


  const logout = async () => {
  await fetch('http://localhost:5200/logout', {
    method: 'POST',
    credentials: 'include'
  });
  setUser(null);
  localStorage.removeItem('auth_user');
};


  const resetPassword = async (email: string): Promise<void> => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
    } finally {
      setIsLoading(false);
    }
  };

  // Check for existing auth on mount
  React.useEffect(() => {
    const savedUser = localStorage.getItem('auth_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const value: AuthContextType = {
    user,
    login,
    signup,
    logout,
    resetPassword,
    isLoading
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};