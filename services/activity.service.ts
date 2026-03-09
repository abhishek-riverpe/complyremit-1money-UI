import apiClient from "@/lib/api-client";
import type { ActivityLogResponse, ActivityCategory } from "@/types/activity";

export async function getActivityLog(params?: {
  category?: ActivityCategory;
  cursor?: string;
  limit?: number;
}): Promise<ActivityLogResponse> {
  const query: Record<string, string | number> = {};
  if (params?.category) query.category = params.category;
  if (params?.cursor) query.cursor = params.cursor;
  if (params?.limit) query.limit = params.limit;
  const res = await apiClient.get("/activity", { params: query });
  return res.data;
}
