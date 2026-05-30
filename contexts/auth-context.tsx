"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { useRouter } from "next/navigation";
import { AuthState, User } from "@/types/auth";
import { api } from "@/services/api";


import Cookies from 'js-cookie'

interface LoginCredentials {
  email: string;
  password: string;
}

interface LoginResponse {
  token: string;
  user: User;
}

interface AuthContextType extends AuthState {
  login: (credentials: LoginCredentials) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);

  // Recupera sessão salva ao carregar
  useEffect(() => {
    const savedToken = Cookies.get("tracklog-token");
    const savedUser = localStorage.getItem("tracklog:user");

    // Aqui verificamos se ambos token e usuário estão presentes antes de atualizar o estado
    if (savedToken && savedUser) {
      setToken(savedToken);
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const login = async (credentials: LoginCredentials) => {
    // Aguarda a resposta da API de login
    const response = await api.post<LoginResponse>("/auth/login", credentials);

    // Salva token e usuário no localStorage para persistência
    Cookies.set("tracklog-token", response.token, {expires: 1}); // Expira em 1 dia
    localStorage.setItem("tracklog:user", JSON.stringify(response.user));

    // Atualiza o estado com os dados do usuário e token
    setToken(response.token);
    setUser(response.user);

    // Redireciona para o dashboard após login bem-sucedido
    router.push("/dashboard");
  };

  const logout = () => {
    // Remove token e usuário do localStorage
    Cookies.remove("tracklog-token");
    localStorage.removeItem("tracklog:user");

    // Limpa o estado
    setToken(null);
    setUser(null);

    // Redireciona para a página de login
    router.push("/login");
  };

  return (
    <AuthContext.Provider
      value={{ user, token, isAuthenticated: !!token, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth deve ser usado dentro de um AuthProvider");
  }
  return context;
};
