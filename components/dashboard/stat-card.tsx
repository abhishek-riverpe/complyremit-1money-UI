import { cn } from "@/lib/utils";
import type { LucideIcon } from "lucide-react";

interface StatCardProps {
  label: string;
  value: string;
  subValue?: string;
  change?: { value: string; positive: boolean };
  icon: LucideIcon;
  iconClassName?: string;
}

export function StatCard({
  label,
  value,
  subValue,
  change,
  icon: Icon,
  iconClassName,
}: StatCardProps) {
  return (
    <div className="rounded-3xl border border-border bg-card p-5 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-3">
        <div
          className={cn(
            "flex h-11 w-11 items-center justify-center rounded-2xl",
            iconClassName ?? "bg-success-muted text-success-muted-foreground"
          )}
        >
          <Icon size={20} strokeWidth={1.75} />
        </div>
        {change && (
          <span
            className={cn(
              "text-xs font-bold px-2 py-1 rounded-full",
              change.positive
                ? "text-success-muted-foreground bg-success-muted"
                : "text-negative-muted-foreground bg-negative-muted"
            )}
          >
            {change.positive ? "+" : ""}
            {change.value}
          </span>
        )}
      </div>
      <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground mb-1">
        {label}
      </p>
      <p className="text-2xl font-bold tracking-tight text-foreground">{value}</p>
      {subValue && (
        <p className="text-sm text-muted-foreground mt-0.5">{subValue}</p>
      )}
    </div>
  );
}
