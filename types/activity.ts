export type ActivityCategory =
  | "auth"
  | "kyb"
  | "storage"
  | "conversion"
  | "deposit"
  | "transaction"
  | "profile";

export interface ActivityLogItem {
  id: string;
  action: string;
  category: ActivityCategory;
  detail: string;
  metadata: Record<string, unknown>;
  createdAt: string;
}

export interface ActivityLogResponse {
  items: ActivityLogItem[];
  nextCursor: string | null;
  hasMore: boolean;
}
