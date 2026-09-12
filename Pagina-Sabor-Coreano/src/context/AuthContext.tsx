"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { ApiError, ApiUser, login as apiLogin, logout as apiLogout, register as apiRegister } from "@/lib/api";

const AUTH_STORAGE_KEY = "auth";

interface AuthContextType {
  user: ApiUser | null;
  token: string | null;
  isAdmin: boolean;
  isHydrated: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<ApiUser | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(AUTH_STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        setUser(parsed.user);
        setToken(parsed.token);
      }
    } catch {
      // Ignora datos corruptos y arranca sin sesión
    }
    setIsHydrated(true);
  }, []);

  const login = async (email: string, password: string) => {
    const data = await apiLogin(email, password);
    setUser(data.user);
    setToken(data.token);
    localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(data));
  };

  const register = async (name: string, email: string, password: string) => {
    const data = await apiRegister(name, email, password);
    setUser(data.user);
    setToken(data.token);
    localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(data));
  };

  const logout = () => {
    if (token) {
      apiLogout(token).catch(() => {
        // Si falla la llamada al backend, igual cerramos la sesión localmente
      });
    }
    setUser(null);
    setToken(null);
    localStorage.removeItem(AUTH_STORAGE_KEY);
  };

  const isAdmin = user?.rol === "admin";

  return (
    <AuthContext.Provider value={{ user, token, isAdmin, isHydrated, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

export { ApiError };
