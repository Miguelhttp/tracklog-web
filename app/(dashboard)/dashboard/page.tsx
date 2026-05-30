import Link from "next/link";
import {
  ArrowRight,
  CheckCircle,
  Clock,
  Truck,
  XCircle,
  type LucideIcon,
} from "lucide-react";
import { apiServer } from "@/services/api.server";
import { Delivery, DeliveryStatus } from "@/types/delivery";
import { Badge } from "@/components/ui/badge";
import { statusConfig } from "@/lib/utils";

const statusList: DeliveryStatus[] = [
  "pending",
  "in_transit",
  "delivered",
  "failed",
];

const metricAccent: Record<DeliveryStatus, string> = {
  pending: "bg-status-pending-accent",
  in_transit: "bg-status-transit-accent",
  delivered: "bg-status-delivered-accent",
  failed: "bg-status-failed-accent",
};

const metricIcons: Record<DeliveryStatus, LucideIcon> = {
  pending: Clock,
  in_transit: Truck,
  delivered: CheckCircle,
  failed: XCircle,
};

export default async function DashboardPage() {
  const deliveries = await apiServer.get<Delivery[]>("/deliveries");

  const countByStatus = statusList.reduce(
    (acc, status) => {
      acc[status] = deliveries.filter(
        (delivery) => delivery.status === status,
      ).length;
      return acc;
    },
    {} as Record<DeliveryStatus, number>,
  );

  const latestDeliveries = deliveries.slice(0, 5);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-medium text-slate-900 dark:text-slate-100 transition-colors duration-200">
          Dashboard
        </h1>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1 transition-colors duration-200">
          Visão geral das entregas
        </p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {statusList.map((status) => {
          const Icon = metricIcons[status];
          const { label } = statusConfig[status];

          return (
            <div
              key={status}
              className="relative overflow-hidden bg-white dark:bg-slate-800 rounded-xl border border-slate-100 dark:border-slate-700 p-5 shadow-(--shadow-card) transition-colors duration-200"
            >
              <span
                className={`absolute left-0 top-0 bottom-0 w-1 ${metricAccent[status]}`}
                aria-hidden="true"
              />
              <Icon
                className="absolute right-4 top-4 h-10 w-10 text-slate-200 dark:text-slate-700"
                strokeWidth={1.5}
                aria-hidden="true"
              />
              <p className="text-[11px] font-medium uppercase tracking-[0.06em] text-slate-500 dark:text-slate-400">
                {label}
              </p>
              <p className="text-4xl font-medium text-slate-900 dark:text-slate-100 mt-3 tabular-nums">
                {countByStatus[status]}
              </p>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">entregas</p>
            </div>
          );
        })}
      </div>

      <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-100 dark:border-slate-700 shadow-(--shadow-card) transition-colors duration-200">
        <div className="px-5 py-4 border-b border-slate-100 dark:border-slate-700 flex items-center justify-between gap-4">
          <div>
            <h2 className="text-sm font-medium text-slate-900 dark:text-slate-100">
              Últimas entregas
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Atividade recente da operação
            </p>
          </div>
          <Link
            href="/deliveries"
            className="inline-flex items-center gap-1 text-sm font-medium text-brand-accent hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200 shrink-0"
          >
            Ver todas
            <ArrowRight size={14} strokeWidth={2} aria-hidden="true" />
          </Link>
        </div>

        <div className="divide-y divide-slate-100 dark:divide-slate-700">
          {latestDeliveries.length === 0 ? (
            <p className="px-5 py-10 text-sm text-slate-500 dark:text-slate-400 text-center">
              Nenhuma entrega encontrada.
            </p>
          ) : (
            latestDeliveries.map((delivery) => (
              <div
                key={delivery.id}
                className="px-5 py-3.5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 hover:bg-slate-50/50 dark:hover:bg-slate-700/30 transition-colors duration-200"
              >
                <div className="min-w-0">
                  <p className="text-sm font-medium text-slate-900 dark:text-slate-100">
                    {delivery.code}
                  </p>
                  <p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5 truncate">
                    {delivery.recipient}
                  </p>
                  <p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5 truncate">
                    {delivery.origin}
                    <span className="mx-1.5 text-slate-300 dark:text-slate-600" aria-hidden="true">
                      →
                    </span>
                    {delivery.destination}
                  </p>
                </div>
                <Badge status={delivery.status} />
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
