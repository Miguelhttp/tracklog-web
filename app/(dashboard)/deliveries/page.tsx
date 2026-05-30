import { Suspense } from "react";
import { apiServer } from "@/services/api.server";
import { Delivery, DeliveryStatus } from "@/types/delivery";
import { DeliveryTable } from "@/components/delivery/delivery-table";
import { DeliveryFilters } from "@/components/delivery/delivery-filters";

interface DeliveriesPageProps {
  searchParams: Promise<{ status?: DeliveryStatus }>;
}

export default async function DeliveriesPage({
  searchParams,
}: DeliveriesPageProps) {
  const { status } = await searchParams;

  const path = status ? `/deliveries?status=${status}` : "/deliveries";
  const deliveries = await apiServer.get<Delivery[]>(path);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-medium text-slate-900 dark:text-slate-100 transition-colors duration-200">
          Entregas
        </h1>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1 transition-colors duration-200">
          {deliveries.length} entrega{deliveries.length !== 1 ? "s" : ""}{" "}
          encontrada{deliveries.length !== 1 ? "s" : ""}
        </p>
      </div>

      <Suspense>
        <DeliveryFilters />
      </Suspense>

      <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-100 dark:border-slate-700 shadow-[var(--shadow-card)] overflow-hidden transition-colors duration-200">
        <DeliveryTable deliveries={deliveries} />
      </div>
    </div>
  );
}
