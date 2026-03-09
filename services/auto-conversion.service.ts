import apiClient from "@/lib/api-client";
import type {
  CreateAutoConversionRuleRequest,
  AutoConversionRuleResponse,
  AutoConversionRuleListResponse,
  AutoConversionOrderListResponse,
  AutoConversionOrderResponse,
} from "@/types/auto-conversion";

export async function createAutoConversionRule(
  payload: CreateAutoConversionRuleRequest
): Promise<AutoConversionRuleResponse> {
  const res = await apiClient.post("/auto-conversion-rules", payload);
  return res.data;
}

export async function listAutoConversionRules(
  pageSize?: number,
  pageNum?: number
): Promise<AutoConversionRuleListResponse> {
  const params: Record<string, number> = {};
  if (pageSize) params.page_size = pageSize;
  if (pageNum) params.page_num = pageNum;
  const res = await apiClient.get("/auto-conversion-rules", { params });
  return res.data;
}

export async function getAutoConversionRule(
  ruleId: string
): Promise<AutoConversionRuleResponse> {
  const res = await apiClient.get(`/auto-conversion-rules/${ruleId}`);
  return res.data;
}

export async function deleteAutoConversionRule(
  ruleId: string
): Promise<void> {
  await apiClient.delete(`/auto-conversion-rules/${ruleId}`);
}

export async function listRuleOrders(
  ruleId: string
): Promise<AutoConversionOrderListResponse> {
  const res = await apiClient.get(
    `/auto-conversion-rules/${ruleId}/orders`
  );
  return res.data;
}

export async function getRuleOrder(
  ruleId: string,
  orderId: string
): Promise<AutoConversionOrderResponse> {
  const res = await apiClient.get(
    `/auto-conversion-rules/${ruleId}/orders/${orderId}`
  );
  return res.data;
}
