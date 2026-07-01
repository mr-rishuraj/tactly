"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";

export interface User {
  id: string;
  email: string;
  name: string;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string, name: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const STORAGE_KEYS = {
  user: "tactly_user",
  session: "tactly_session",
} as const;

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Initialize from localStorage on mount
  useEffect(() => {
    try {
      const storedUser = localStorage.getItem(STORAGE_KEYS.user);
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    } catch (error) {
      console.error("Failed to load user from localStorage:", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const login = async (email: string, password: string): Promise<void> => {
    setIsLoading(true);
    try {
      // Dummy validation
      if (!email || !password) {
        throw new Error("Email and password are required");
      }

      // Simulate network delay
      await new Promise((resolve) => setTimeout(resolve, 500));

      // Create mock user
      const mockUser: User = {
        id: `user_${Date.now()}`,
        email,
        name: email.split("@")[0],
      };

      // Store in localStorage
      localStorage.setItem(STORAGE_KEYS.user, JSON.stringify(mockUser));
      localStorage.setItem(STORAGE_KEYS.session, `session_${Date.now()}`);

      setUser(mockUser);
    } finally {
      setIsLoading(false);
    }
  };

  const signup = async (
    email: string,
    password: string,
    name: string
  ): Promise<void> => {
    setIsLoading(true);
    try {
      // Dummy validation
      if (!email || !password || !name) {
        throw new Error("All fields are required");
      }

      // Simulate network delay
      await new Promise((resolve) => setTimeout(resolve, 500));

      // Create mock user
      const mockUser: User = {
        id: `user_${Date.now()}`,
        email,
        name,
      };

      // Store in localStorage
      localStorage.setItem(STORAGE_KEYS.user, JSON.stringify(mockUser));
      localStorage.setItem(STORAGE_KEYS.session, `session_${Date.now()}`);

      setUser(mockUser);
    } finally {
      setIsLoading(false);
    }
  };

  const logout = (): void => {
    localStorage.removeItem(STORAGE_KEYS.user);
    localStorage.removeItem(STORAGE_KEYS.session);
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        login,
        signup,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
}
