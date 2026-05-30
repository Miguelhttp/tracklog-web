import { DeliveryStatus } from "@/types/delivery";

export function formatDate(dateString: string): string {
  return new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(dateString));
}

export const statusConfig: Record<
  DeliveryStatus,
  { label: string; className: string }
> = {
  pending: {
    label: "Pendente",
    className:
      "bg-status-pending-bg text-status-pending-text dark:bg-amber-950 dark:text-amber-300",
  },
  in_transit: {
    label: "Em Trânsito",
    className:
      "bg-status-transit-bg text-status-transit-text dark:bg-blue-950 dark:text-blue-300",
  },
  delivered: {
    label: "Entregue",
    className:
      "bg-status-delivered-bg text-status-delivered-text dark:bg-green-950 dark:text-green-300",
  },
  failed: {
    label: "Falha",
    className:
      "bg-status-failed-bg text-status-failed-text dark:bg-red-950 dark:text-red-300",
  },
};
