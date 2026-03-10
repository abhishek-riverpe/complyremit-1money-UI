import type { UserProfile } from "@/types/profile";
import type { EditBusinessInfoValues, EditAddressValues } from "@/lib/schemas/edit-profile";

export function profileToBusinessInfo(profile: UserProfile): EditBusinessInfoValues {
  return {
    email: profile.email ?? "",
    business_legal_name: profile.businessLegalName ?? "",
    business_description: profile.businessDescription ?? "",
    business_type: profile.businessType ?? "",
    business_industry: profile.businessIndustry ?? "",
    business_registration_number: profile.businessRegistrationNumber ?? "",
    date_of_incorporation: profile.dateOfIncorporation ?? "",
    primary_website: profile.primaryWebsite ?? "",
    publicly_traded: profile.publiclyTraded ?? false,
    tax_country: profile.taxCountry ?? "",
    tax_type: profile.taxType ?? "",
    tax_id: profile.taxId ?? "",
  };
}

export function profileToAddress(profile: UserProfile): EditAddressValues {
  return {
    registered_address: {
      street_line_1: profile.registeredAddressStreetLine1 ?? "",
      street_line_2: profile.registeredAddressStreetLine2 ?? "",
      city: profile.registeredAddressCity ?? "",
      state: profile.registeredAddressState ?? "",
      country: profile.registeredAddressCountry ?? "",
      subdivision: profile.registeredAddressSubdivision ?? "",
      postal_code: profile.registeredAddressPostalCode ?? "",
    },
  };
}
