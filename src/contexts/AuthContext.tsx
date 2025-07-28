// src/contexts/AuthContext.tsx
import { createContext, useContext, useState, ReactNode } from 'react';
import axios from 'axios';

// Buat instance axios yang akan kita gunakan di seluruh aplikasi
const apiClient = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
    withCredentials: true, // PENTING: agar Sanctum bisa bekerja
    headers: {
        'Accept': 'application/json',
    }
});

interface User {
  id: string;
  email: string;
  name: string;
  isAdmin?: boolean;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  // Tambahkan fungsi register jika perlu
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  const login = async (email: string, password: string) => {
    // 1. Ambil CSRF cookie dari Sanctum
    await apiClient.get('/sanctum/csrf-cookie');

    // 2. Kirim request login
    const response = await apiClient.post('/login', { email, password });

    // 3. Ambil data user dan set state
    if (response.data) {
        setUser(response.data);
    }
  };

  const logout = async () => {
    await apiClient.post('/logout');
    setUser(null);
  };

  const value = {
    user,
    isAuthenticated: !!user,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};