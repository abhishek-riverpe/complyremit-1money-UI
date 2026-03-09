import apiClient from "@/lib/api-client";

export async function createUser() {
  return apiClient.post("/users");
}

export async function getUserProfile() {
  const res = await apiClient.get("/users/business");
  return res.data;
}
