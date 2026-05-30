import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { notFound } from "next/navigation";
import { apiServer } from "@/services/api.server";
import { Delivery } from "@/types/delivery";
import { Badge } from "@/components/ui/badge";
import { DeliveryTimeline } from "@/components/delivery/delivery-timeline";
import { formatDate } from "@/lib/utils";

interface DeliveryDetailPageProps {
  params: Promise<{ id: string }>;
}

export default async function DeliveryDetailPage({
  params,
}: DeliveryDetailPageProps) {
  const { id } = await params;

  let delivery: Delivery;
  try {
    delivery = await apiServer.get<Delivery>(`/deliveries/${id}`);
  } catch {
    notFound();
  }

  const infoFields = [
    { label: "Destinatário", value: delivery.recipient },
    { label: "Origem", value: delivery.origin },
    { label: "Destino", value: delivery.destination },
    { label: "Criado em", value: formatDate(delivery.createdAt) },
    { label: "Atualizado em", value: formatDate(delivery.updatedAt) },
  ] as const;

  return (
    <div className="space-y-6">
      <Link
        href="/deliveries"
        className="inline-flex items-center gap-1.5 text-sm font-medium text-slate-500 dark:text-slate-400 hover:text-brand-accent dark:hover:text-blue-400 transition-colors duration-200"
      >
        <ArrowLeft size={14} strokeWidth={2} aria-hidden="true" />
        Voltar
      </Link>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h1 className="text-2xl font-medium text-slate-900 dark:text-slate-100">
            {delivery.code}
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            {delivery.origin}
            <span className="mx-1.5 text-slate-300 dark:text-slate-600" aria-hidden="true">
              →
            </span>
            {delivery.destination}
          </p>
        </div>
        <Badge status={delivery.status} size="lg" />
      </div>

      <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-100 dark:border-slate-700 shadow-(--shadow-card) p-5 transition-colors duration-200">
        <h2 className="text-[11px] font-medium uppercase tracking-[0.06em] text-slate-500 dark:text-slate-400 mb-5">
          Informações da entrega
        </h2>
        <dl className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {infoFields.map(({ label, value }) => (
            <div key={label}>
              <dt className="text-[11px] font-medium uppercase tracking-[0.06em] text-slate-500 dark:text-slate-400">
                {label}
              </dt>
              <dd className="mt-1.5 text-sm text-slate-900 dark:text-slate-100 wrap-break-word">
                {value}
              </dd>
            </div>
          ))}
        </dl>
      </div>

      <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-100 dark:border-slate-700 shadow-(--shadow-card) overflow-hidden transition-colors duration-200">
        <div className="px-5 py-4 border-b border-slate-100 dark:border-slate-700">
          <h2 className="text-sm font-medium text-slate-900 dark:text-slate-100">
            Histórico de eventos
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Linha do tempo da movimentação
          </p>
        </div>
        <DeliveryTimeline events={delivery.history} />
      </div>
    </div>
  );
}
