import type {
  BusinessDetailsFormData,
  AddressDetailsFormData,
  CustomerPayload,
} from "@/types/onboarding";

function formatTaxId(taxId: string, taxType: string): string {
  const digits = taxId.replace(/\D/g, "");
  if (taxType === "SSN" && digits.length === 9) {
    return `${digits.slice(0, 3)}-${digits.slice(3, 5)}-${digits.slice(5)}`;
  }
  if (taxType === "EIN" && digits.length === 9) {
    return `${digits.slice(0, 2)}-${digits.slice(2)}`;
  }
  return taxId;
}

export function assemblePayload(
  businessDetails: BusinessDetailsFormData,
  addressDetails: AddressDetailsFormData,
  signedAgreementId: string
): CustomerPayload {
  const persons = businessDetails.associated_persons.map((person, index) => ({
    ...person,
    tax_id: formatTaxId(person.tax_id, person.tax_type),
    residential_address: addressDetails.person_addresses[index],
  }));

  return {
    business_legal_name: businessDetails.business_legal_name,
    business_description: businessDetails.business_description,
    email: businessDetails.email,
    business_type: businessDetails.business_type,
    business_industry: businessDetails.business_industry,
    registered_address: addressDetails.registered_address,
    date_of_incorporation: businessDetails.date_of_incorporation,
    signed_agreement_id: signedAgreementId,
    associated_persons: persons,
    account_purpose: businessDetails.account_purpose,
    source_of_funds: businessDetails.source_of_funds,
    source_of_wealth: businessDetails.source_of_wealth,
    publicly_traded: businessDetails.publicly_traded,
    estimated_annual_revenue_usd:
      businessDetails.estimated_annual_revenue_usd,
    expected_monthly_fiat_deposits:
      businessDetails.expected_monthly_fiat_deposits,
    expected_monthly_fiat_withdrawals:
      businessDetails.expected_monthly_fiat_withdrawals,
    tax_country: businessDetails.tax_country,
    tax_id: formatTaxId(businessDetails.tax_id, businessDetails.tax_type),
    tax_type: businessDetails.tax_type,
    business_registration_number: businessDetails.business_registration_number,
    primary_website: businessDetails.primary_website,
    documents: businessDetails.documents,
  };
}
