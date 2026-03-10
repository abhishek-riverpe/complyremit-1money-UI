import apiClient from "@/lib/api-client";
import type { CustomerPayload, UpdateCustomerPayload } from "@/types/onboarding";

export async function createCustomer(payload: CustomerPayload) {
  const res = await apiClient.post("/users/business/kyb", payload);
  return res.data;
}

export async function updateCustomer(payload: UpdateCustomerPayload) {
  const res = await apiClient.put("/users/business/kyb", payload);
  return res.data;
}

export async function getKybStatus() {
  const res = await apiClient.get("/users/business/kyb");
  return res.data;
}
