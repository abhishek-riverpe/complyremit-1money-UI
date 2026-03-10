import { z } from "zod";

export const editBusinessInfoSchema = z.object({
  email: z.string().email("Valid email is required").or(z.literal("")),
  business_legal_name: z.string(),
  business_description: z.string(),
  business_type: z.string(),
  business_industry: z.string(),
  business_registration_number: z.string(),
  date_of_incorporation: z.string(),
  primary_website: z.string(),
  publicly_traded: z.boolean(),
  tax_country: z.string(),
  tax_type: z.string(),
  tax_id: z.string(),
});

export const editAddressSchema = z.object({
  registered_address: z.object({
    street_line_1: z.string(),
    street_line_2: z.string(),
    city: z.string(),
    state: z.string(),
    country: z.string(),
    subdivision: z.string(),
    postal_code: z.string(),
  }),
});

export type EditBusinessInfoValues = z.infer<typeof editBusinessInfoSchema>;
export type EditAddressValues = z.infer<typeof editAddressSchema>;
