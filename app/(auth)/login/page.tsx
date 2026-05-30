"use client";

import { useState } from "react";
import { AlertCircle, Loader2, Truck } from "lucide-react";
import { useAuth } from "@/contexts/auth-context";

const inputClassName =
  "w-full h-10 px-3.5 text-slate-900 dark:text-slate-100 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm " +
  "placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-brand-accent/20 focus:border-brand-accent transition-colors duration-200";

export default function LoginPage() {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async () => {
    if (isLoading || !email || !password) return;

    setError("");
    setIsLoading(true);

    try {
      await login({ email, password });
    } catch {
      setError("Email ou senha inválidos. Tente novamente.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      void handleLogin();
    }
  };

  return (
    <div className="min-h-screen flex transition-colors duration-200">
      <aside className="hidden lg:flex lg:w-1/2 bg-slate-900 login-panel-pattern relative flex-col justify-between p-10">
        <div className="flex items-center gap-3">
          <Truck className="h-7 w-7 text-blue-500" strokeWidth={2} aria-hidden="true" />
          <span className="text-xl font-semibold text-white">Tracklog</span>
        </div>

        <div className="max-w-md">
          <h2 className="text-2xl font-medium text-white leading-snug">
            Rastreamento de entregas com controle total
          </h2>
          <p className="mt-3 text-sm text-slate-400 leading-relaxed">
            Monitore cada etapa da operação logística em um painel corporativo
            pensado para equipes que vivem o dia a dia das entregas.
          </p>
        </div>

        <p className="text-xs text-slate-600">
          © {new Date().getFullYear()} Tracklog. Todos os direitos reservados.
        </p>
      </aside>

      <main className="flex-1 flex items-center justify-center bg-white dark:bg-slate-900 p-6 sm:p-10 transition-colors duration-200">
        <div className="w-full max-w-[400px]">
          <div className="mb-8 lg:hidden flex items-center gap-2.5">
            <Truck
              className="h-7 w-7 text-brand-accent"
              strokeWidth={2}
              aria-hidden="true"
            />
            <span className="text-xl font-semibold text-slate-900 dark:text-slate-100">
              Tracklog
            </span>
          </div>

          <div className="mb-8">
            <h1 className="text-2xl font-medium text-slate-900 dark:text-slate-100">
              Bem-vindo de volta
            </h1>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-2">
              Faça login para acessar o painel
            </p>
          </div>

          <div className="space-y-5">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5"
              >
                Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="seu@email.com"
                autoComplete="email"
                className={inputClassName}
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5"
              >
                Senha
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="••••••••"
                autoComplete="current-password"
                className={inputClassName}
              />
            </div>

            {error && (
              <div
                role="alert"
                className="flex items-start gap-2.5 text-sm text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-950/50 border border-red-100 dark:border-red-900 px-3.5 py-3 rounded-lg transition-colors duration-200"
              >
                <AlertCircle
                  size={16}
                  className="shrink-0 mt-0.5"
                  strokeWidth={2}
                  aria-hidden="true"
                />
                <span>{error}</span>
              </div>
            )}

            <button
              type="button"
              onClick={() => void handleLogin()}
              disabled={isLoading || !email || !password}
              className="w-full h-10 inline-flex items-center justify-center gap-2 bg-brand-accent text-white rounded-lg text-sm font-medium hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
            >
              {isLoading ? (
                <>
                  <Loader2
                    size={16}
                    className="animate-spin"
                    strokeWidth={2}
                    aria-hidden="true"
                  />
                  Entrando...
                </>
              ) : (
                "Entrar"
              )}
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
