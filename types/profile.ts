export interface IdentifyingDocumentProfile {
  id: string;
  type: string;
  issuingCountry: string;
  nationalIdentityNumber: string;
}

export interface AssociatedPersonProfile {
  id: string;
  firstName: string;
  middleName: string | null;
  lastName: string;
  email: string;
  birthDate: string;
  primaryNationality: string;
  hasOwnership: boolean;
  ownershipPercentage: number | null;
  hasControl: boolean;
  isSigner: boolean;
  isDirector: boolean;
  countryOfTax: string;
  taxType: string;
  taxId: string;
  poa: string | null;
  poaType: string | null;
  residentialAddressStreetLine1: string;
  residentialAddressStreetLine2: string | null;
  residentialAddressCity: string;
  residentialAddressState: string;
  residentialAddressCountry: string;
  residentialAddressSubdivision: string | null;
  residentialAddressPostalCode: string;
  identifyingDocuments: IdentifyingDocumentProfile[];
}

export interface BusinessDocumentProfile {
  id: string;
  docType: string;
  fileUrl: string;
  description: string | null;
}

export interface UserProfile {
  id: string;
  email: string;
  businessLegalName: string | null;
  businessDescription: string | null;
  businessType: string | null;
  businessIndustry: string | null;
  businessRegistrationNumber: string | null;
  dateOfIncorporation: string | null;
  primaryWebsite: string | null;
  publiclyTraded: boolean | null;
  taxId: string | null;
  taxType: string | null;
  taxCountry: string | null;
  accountPurpose: string | null;
  sourceOfFunds: string[];
  sourceOfWealth: string[];
  estimatedAnnualRevenueUsd: string | null;
  expectedMonthlyFiatDeposits: string | null;
  expectedMonthlyFiatWithdrawals: string | null;
  registeredAddressStreetLine1: string | null;
  registeredAddressStreetLine2: string | null;
  registeredAddressCity: string | null;
  registeredAddressState: string | null;
  registeredAddressCountry: string | null;
  registeredAddressSubdivision: string | null;
  registeredAddressPostalCode: string | null;
  associatedPersons: AssociatedPersonProfile[];
  documents: BusinessDocumentProfile[];
}
