import apiClient from "@/lib/api-client";
import type { DepositInstruction } from "@/types/deposit-instructions";

export async function getBankDepositInstructions(): Promise<DepositInstruction> {
  const res = await apiClient.get("/deposit-instructions", {
    params: { asset: "USD", network: "US_ACH" },
  });
  return res.data;
}

export async function getWalletDepositInstructions(): Promise<DepositInstruction> {
  const res = await apiClient.get("/deposit-instructions", {
    params: { asset: "USDC", network: "SOLANA" },
  });
  return res.data;
}
