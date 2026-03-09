import { cn } from "@/lib/utils";

type Status = "completed" | "pending" | "failed" | "active" | "inactive" | "approved";

const statusStyles: Record<Status, string> = {
  completed:
    "border-success-border bg-success-muted text-success-muted-foreground",
  active:
    "border-primary-border bg-primary-muted text-primary-muted-foreground",
  pending:
    "border-warning-border bg-warning-muted text-warning-muted-foreground",
  inactive:
    "border-border bg-muted text-muted-foreground",
  failed:
    "border-destructive/30 bg-negative-muted text-negative-muted-foreground",
  approved:
    "border-primary-border bg-primary-muted text-primary-muted-foreground",
};

const statusIcon: Record<Status, string> = {
  completed: "●",
  active: "●",
  pending: "●",
  inactive: "○",
  failed: "✕",
  approved: "●",
};

const statusDotColor: Record<Status, string> = {
  completed: "text-success",
  active: "text-primary",
  pending: "text-warning",
  inactive: "text-muted-foreground",
  failed: "text-destructive",
  approved: "text-primary",
};

const fallbackStyle =
  "border-border bg-muted text-muted-foreground";

export function StatusBadge({ status }: { status: string }) {
  const key = status as Status;
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold border capitalize",
        statusStyles[key] ?? fallbackStyle
      )}
    >
      <span className={`text-[8px] leading-none ${statusDotColor[key] ?? ""}`}>
        {statusIcon[key] ?? "●"}
      </span>
      {status}
    </span>
  );
}
