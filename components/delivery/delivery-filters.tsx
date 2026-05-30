"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { DeliveryStatus } from "@/types/delivery";

const filters: { label: string; value: DeliveryStatus | "all" }[] = [
  { label: "Todas", value: "all" },
  { label: "Pendentes", value: "pending" },
  { label: "Em trânsito", value: "in_transit" },
  { label: "Entregues", value: "delivered" },
  { label: "Falhou", value: "failed" },
];

export function DeliveryFilters() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const current = searchParams.get("status") || "all";

  function handleFilter(value: string) {
    const params = new URLSearchParams();
    if (value !== "all") params.set("status", value);
    const query = params.toString();
    router.push(query ? `/deliveries?${query}` : "/deliveries");
  }

  return (
    <div className="flex gap-1.5 flex-wrap">
      {filters.map((filter) => {
        const isActive = current === filter.value;

        return (
          <button
            key={filter.value}
            type="button"
            onClick={() => handleFilter(filter.value)}
            className={`px-3 py-1.5 rounded-badge text-xs font-medium transition-colors duration-200 ${
              isActive
                ? "bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 shadow-sm"
                : "bg-white dark:bg-slate-800 text-slate-500 dark:text-slate-400 border border-slate-100 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700 hover:text-slate-700 dark:hover:text-slate-200 hover:border-slate-200 dark:hover:border-slate-600"
            }`}
          >
            {filter.label}
          </button>
        );
      })}
    </div>
  );
}
