import {
  CheckCircle,
  Clock,
  Truck,
  XCircle,
  type LucideIcon,
} from "lucide-react";
import { DeliveryStatus } from "@/types/delivery";
import { statusConfig } from "@/lib/utils";

const statusIcons: Record<DeliveryStatus, LucideIcon> = {
  pending: Clock,
  in_transit: Truck,
  delivered: CheckCircle,
  failed: XCircle,
};

interface BadgeProps {
  status: DeliveryStatus;
  size?: "sm" | "lg";
  showIcon?: boolean;
}

const sizeClasses: Record<NonNullable<BadgeProps["size"]>, string> = {
  sm: "px-2 py-0.5 text-xs gap-1",
  lg: "px-2.5 py-1 text-sm gap-1.5",
};

const iconSizes: Record<NonNullable<BadgeProps["size"]>, number> = {
  sm: 11,
  lg: 14,
};

export function Badge({
  status,
  size = "sm",
  showIcon = false,
}: BadgeProps) {
  const { label, className } = statusConfig[status];
  const Icon = statusIcons[status];

  return (
    <span
      className={`inline-flex items-center rounded-badge font-medium border-0 transition-colors duration-200 ${sizeClasses[size]} ${className}`}
    >
      {showIcon && (
        <Icon size={iconSizes[size]} strokeWidth={2.25} aria-hidden="true" />
      )}
      {label}
    </span>
  );
}
