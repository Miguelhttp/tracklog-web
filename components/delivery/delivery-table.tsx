"use client";

import Link from "next/link";
import { ArrowRight, PackageX } from "lucide-react";
import { Delivery } from "@/types/delivery";
import { Badge } from "@/components/ui/badge";
import { formatDate } from "@/lib/utils";

interface DeliveryTableProps {
  deliveries: Delivery[];
}

const thClassName =
  "h-10 px-5 text-[11px] font-medium uppercase tracking-[0.06em] text-slate-500 dark:text-slate-400";

function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-slate-500 dark:text-slate-400">
      <PackageX
        size={36}
        strokeWidth={1.5}
        className="mb-3 text-slate-300 dark:text-slate-600"
        aria-hidden="true"
      />
      <p className="text-sm">Nenhuma entrega encontrada</p>
    </div>
  );
}

function DeliveryActionLink({ id }: { id: string }) {
  return (
    <Link
      href={`/deliveries/${id}`}
      className="group inline-flex items-center gap-1 text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-brand-accent dark:hover:text-blue-400 transition-colors duration-200"
    >
      Detalhes
      <ArrowRight
        size={14}
        strokeWidth={2}
        className="opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200"
        aria-hidden="true"
      />
    </Link>
  );
}

export function DeliveryTable({ deliveries }: DeliveryTableProps) {
  if (deliveries.length === 0) {
    return <EmptyState />;
  }

  return (
    <>
      <div className="md:hidden divide-y divide-slate-100 dark:divide-slate-700">
        {deliveries.map((delivery) => (
          <article
            key={delivery.id}
            className="p-5 space-y-3 hover:bg-slate-50/50 dark:hover:bg-slate-700/30 transition-colors duration-200"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <p className="font-mono text-sm font-medium text-slate-900 dark:text-slate-100">
                  {delivery.code}
                </p>
                <p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5 truncate">
                  {delivery.recipient}
                </p>
              </div>
              <Badge status={delivery.status} />
            </div>
            <p className="text-sm text-slate-500 dark:text-slate-400 truncate">
              {delivery.origin}
              <span className="mx-1.5 text-slate-300 dark:text-slate-600" aria-hidden="true">
                →
              </span>
              {delivery.destination}
            </p>
            <div className="flex items-center justify-between pt-1">
              <time
                dateTime={delivery.updatedAt}
                className="text-xs text-slate-500 dark:text-slate-400"
              >
                {formatDate(delivery.updatedAt)}
              </time>
              <DeliveryActionLink id={delivery.id} />
            </div>
          </article>
        ))}
      </div>

      <div className="hidden md:block overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-slate-50 dark:bg-slate-800/80 border-b border-slate-200 dark:border-slate-700">
              <th className={`${thClassName} text-left`}>Código</th>
              <th className={`${thClassName} text-left`}>Destinatário</th>
              <th className={`${thClassName} text-left`}>Rota</th>
              <th className={`${thClassName} text-left`}>Status</th>
              <th className={`${thClassName} text-left`}>Atualizado</th>
              <th className={`${thClassName} text-right`}>Ação</th>
            </tr>
          </thead>
          <tbody>
            {deliveries.map((delivery, index) => (
              <tr
                key={delivery.id}
                className={`h-12 border-b border-slate-100 dark:border-slate-700 transition-colors duration-200 hover:bg-slate-50/50 dark:hover:bg-slate-700/30 ${
                  index % 2 === 1
                    ? "bg-slate-50/30 dark:bg-slate-800/50"
                    : "bg-white dark:bg-slate-800"
                }`}
              >
                <td className="px-5 font-mono text-sm font-medium text-slate-900 dark:text-slate-100">
                  {delivery.code}
                </td>
                <td className="px-5 text-slate-700 dark:text-slate-300">
                  {delivery.recipient}
                </td>
                <td className="px-5 text-slate-500 dark:text-slate-400 max-w-[240px]">
                  <span className="truncate block">
                    {delivery.origin}
                    <span className="mx-1.5 text-slate-300 dark:text-slate-600" aria-hidden="true">
                      →
                    </span>
                    {delivery.destination}
                  </span>
                </td>
                <td className="px-5">
                  <Badge status={delivery.status} />
                </td>
                <td className="px-5 text-slate-500 dark:text-slate-400 tabular-nums">
                  <time dateTime={delivery.updatedAt}>
                    {formatDate(delivery.updatedAt)}
                  </time>
                </td>
                <td className="px-5 text-right">
                  <DeliveryActionLink id={delivery.id} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
