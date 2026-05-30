"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Package, Truck, type LucideIcon } from "lucide-react";

interface NavItem {
  label: string;
  href: string;
  icon: LucideIcon;
}

const navItems: NavItem[] = [
  { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { label: "Entregas", href: "/deliveries", icon: Package },
];

const APP_VERSION = "0.1.0";

function isNavActive(pathname: string, href: string): boolean {
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-60 shrink-0 bg-brand-sidebar dark:bg-[#020617] flex flex-col transition-colors duration-200">
      <div className="px-4 py-5">
        <Link href="/dashboard" className="flex items-center gap-2.5">
          <Truck
            className="h-5 w-5 text-blue-500"
            strokeWidth={2}
            aria-hidden="true"
          />
          <span className="text-base font-semibold text-white tracking-tight">
            Tracklog
          </span>
        </Link>
      </div>

      <div className="mx-4 h-px bg-white/10" aria-hidden="true" />

      <nav className="flex-1 px-3 py-4">
        <p className="px-3 pb-2 text-[11px] font-medium uppercase tracking-[0.06em] text-slate-600 dark:text-slate-500">
          Operações
        </p>
        <ul className="space-y-0.5">
          {navItems.map((item) => {
            const isActive = isNavActive(pathname, item.href);
            const Icon = item.icon;

            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`flex items-center gap-2.5 py-2.5 pl-3 pr-3 text-sm font-medium transition-colors duration-200 ${
                    isActive
                      ? "border-l-2 border-blue-500 bg-white/8 text-white"
                      : "border-l-2 border-transparent text-slate-400 hover:bg-white/4 hover:text-slate-200 dark:text-slate-400 dark:hover:text-slate-200"
                  }`}
                >
                  <Icon size={16} strokeWidth={2} aria-hidden="true" />
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="px-4 py-4 border-t border-white/10">
        <p className="text-[11px] text-slate-600 dark:text-slate-500">
          Tracklog v{APP_VERSION}
        </p>
      </div>
    </aside>
  );
}
