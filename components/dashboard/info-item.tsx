import { cn } from "@/lib/utils";

interface InfoItemProps {
  label: string;
  value: string | null | undefined;
  className?: string;
}

export function InfoItem({ label, value, className }: InfoItemProps) {
  return (
    <div className={cn("space-y-1", className)}>
      <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
        {label}
      </p>
      {value ? (
        <p className="text-sm font-medium text-foreground">{value}</p>
      ) : (
        <p className="text-sm italic text-muted-foreground">N/A</p>
      )}
    </div>
  );
}
