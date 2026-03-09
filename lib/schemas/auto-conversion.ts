import { z } from "zod";

export const createAutoConversionRuleSchema = z.object({
  source_asset: z.string().min(1, "Source asset is required"),
  source_network: z.string().min(1, "Source network is required"),
  destination_asset: z.string().min(1, "Destination asset is required"),
  destination_network: z.string().min(1, "Destination network is required"),
  wallet_address: z.string().optional(),
  external_account_id: z.string().optional(),
});

export type CreateAutoConversionRuleFormValues = z.infer<
  typeof createAutoConversionRuleSchema
>;
