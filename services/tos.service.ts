import apiClient from "@/lib/api-client";

export async function createTosLink(redirectUrl: string) {
  const res = await apiClient.post<{ url: string; session_token: string }>(
    "/users/business/kyb/tos/link",
    { redirect_url: redirectUrl }
  );
  return res.data;
}

export async function signTos(sessionToken: string) {
  const res = await apiClient.post<{ signed_agreement_id: string }>(
    `/users/business/kyb/tos/${sessionToken}/sign`
  );
  return res.data;
}
