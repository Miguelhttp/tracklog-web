"use client";

import { usePathname } from "next/navigation";
import { LogOut } from "lucide-react";
import { useAuth } from "@/contexts/auth-context";
import { ThemeToggle } from "@/components/ui/theme-toggle";

function getInitials(name: string): string {
  return name
    .split(" ")
    .filter(Boolean)
    .map((part) => part[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

interface Breadcrumb {
  parent?: string;
  current: string;
}

function getBreadcrumb(pathname: string): Breadcrumb {
  if (pathname === "/dashboard") return { current: "Dashboard" };
  if (pathname === "/deliveries") return { parent: "Operações", current: "Entregas" };
  if (pathname.startsWith("/deliveries/"))
    return { parent: "Entregas", current: "Detalhe" };
  return { current: "Tracklog" };
}

export function Header() {
  const pathname = usePathname();
  const { user, logout } = useAuth();
  const breadcrumb = getBreadcrumb(pathname);

  return (
    <header className="h-14 shrink-0 bg-white dark:bg-slate-900 border-b border-slate-100 dark:border-slate-800 px-6 flex items-center justify-between gap-4 transition-colors duration-200">
      <nav aria-label="Breadcrumb" className="min-w-0">
        <ol className="flex items-center gap-2 text-sm">
          {breadcrumb.parent && (
            <>
              <li className="text-slate-500 dark:text-slate-400 font-medium truncate">
                {breadcrumb.parent}
              </li>
              <li className="text-slate-300 dark:text-slate-600" aria-hidden="true">
                /
              </li>
            </>
          )}
          <li className="text-slate-900 dark:text-slate-100 font-medium truncate">
            {breadcrumb.current}
          </li>
        </ol>
      </nav>

      <div className="flex items-center gap-3 shrink-0">
        <button
          type="button"
          onClick={logout}
          className="inline-flex items-center gap-1.5 text-sm text-slate-500 dark:text-slate-400 hover:text-red-600 dark:hover:text-red-400 transition-colors duration-200"
        >
          <LogOut size={16} strokeWidth={2} aria-hidden="true" />
          <span className="hidden sm:inline">Sair</span>
        </button>

        <div className="h-6 w-px bg-slate-200 dark:bg-slate-700" aria-hidden="true" />

        <ThemeToggle />

        {user && (
          <>
            <div className="h-6 w-px bg-slate-200 dark:bg-slate-700" aria-hidden="true" />
            <div className="flex items-center gap-3 min-w-0">
              <span className="hidden md:block text-sm font-medium text-slate-700 dark:text-slate-300 truncate max-w-[180px]">
                {user.name}
              </span>
              <span
                className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand-accent-light dark:bg-blue-950 text-xs font-semibold text-brand-accent dark:text-blue-300 ring-2 ring-transparent hover:ring-blue-500/30 transition-all duration-200"
                title={user.name}
                aria-hidden="true"
              >
                {getInitials(user.name)}
              </span>
            </div>
          </>
        )}
      </div>
    </header>
  );
}
