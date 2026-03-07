"use client";

import { useState } from "react";
import { useAuth } from "@/components/providers/auth-provider";
import { useOnboarding } from "@/components/providers/onboarding-provider";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import {
  User,
  Mail,
  Building2,
  Globe,
  Calendar,
  Hash,
  DollarSign,
  MapPin,
  FileText,
  TrendingUp,
  Landmark,
  Link as LinkIcon,
} from "lucide-react";
import Link from "next/link";
import type { BusinessDetailsFormData } from "@/lib/schemas/onboarding";

const PROFILE_TABS = [
  { key: "business", label: "Business Info", icon: Building2 },
  { key: "financial", label: "Financial Info", icon: DollarSign },
  { key: "tax", label: "Tax Info", icon: Landmark },
  { key: "documents", label: "Documents", icon: FileText },
  { key: "address", label: "Address", icon: MapPin },
  { key: "persons", label: "Associated Persons", icon: User },
] as const;

const dummyBusinessDetails: BusinessDetailsFormData = {
  business_legal_name: "Acme Corp Ltd",
  business_description: "International payments and remittance services",
  email: "contact@acmecorp.com",
  business_type: "Limited Liability Company",
  business_industry: "Financial Services",
  business_registration_number: "REG-2024-001234",
  date_of_incorporation: "2020-01-15",
  primary_website: "https://acmecorp.com",
  account_purpose: "Business payments and collections",
  estimated_annual_revenue_usd: "$1M - $5M",
  expected_monthly_fiat_deposits: "$100K - $500K",
  expected_monthly_fiat_withdrawals: "$100K - $500K",
  source_of_funds: ["Business Revenue", "Investments"],
  source_of_wealth: ["Business Profits", "Capital Gains"],
  tax_country: "United States",
  tax_type: "EIN",
  tax_id: "12-3456789",
  publicly_traded: false,
  documents: [
    {
      doc_type: "Certificate of Incorporation",
      description: "Official certificate of incorporation document",
    },
  ],
  associated_persons: [
    {
      first_name: "John",
      middle_name: "",
      last_name: "Doe",
      email: "john.doe@acmecorp.com",
      birth_date: "1985-06-15",
      primary_nationality: "United States",
      tax_id: "987-65-4321",
      tax_type: "SSN",
      country_of_tax: "United States",
      is_signer: true,
      is_director: true,
      has_ownership: true,
      ownership_percentage: 60,
      has_control: true,
      identifying_information: [
        {
          type: "Passport",
          issuing_country: "United States",
          national_identity_number: "US-PASS-123456",
        },
      ],
      poa: true,
      poa_type: "Utility Bill",
    },
  ],
};

const dummyAddressDetails = {
  registered_address: {
    street_line_1: "123 Business Avenue",
    street_line_2: "Suite 400",
    city: "San Francisco",
    state: "California",
    country: "United States",
    postal_code: "94105",
  },
  person_addresses: [
    {
      street_line_1: "456 Residential Lane",
      street_line_2: "",
      city: "San Francisco",
      state: "California",
      country: "United States",
      postal_code: "94102",
    },
  ],
};

function Field({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string | undefined | null;
}) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-3">
        <Icon className="w-4 h-4 text-slate-500 dark:text-slate-400" />
        <span className="text-xs uppercase tracking-wider text-slate-500 dark:text-slate-400">
          {label}
        </span>
      </div>
      <span className="text-sm font-medium">{value || "—"}</span>
    </div>
  );
}

function AddressBlock({ address }: { address: { street_line_1: string; street_line_2?: string; city: string; state: string; subdivision?: string; country: string; postal_code: string } }) {
  return (
    <p className="text-sm">
      {address.street_line_1}
      {address.street_line_2 && <>, {address.street_line_2}</>}
      <br />
      {address.city}, {address.state} {address.postal_code}
      {address.subdivision && <><br />{address.subdivision}</>}
      <br />
      {address.country}
    </p>
  );
}

export default function ProfilePage() {
  const { user } = useAuth();
  const { state } = useOnboarding();
  const [activeTab, setActiveTab] = useState("business");

  const biz = state.businessDetails ?? dummyBusinessDetails;
  const addr = state.addressDetails ?? dummyAddressDetails;

  const primaryPerson = biz.associated_persons?.[0];
  const displayName = primaryPerson
    ? `${primaryPerson.first_name} ${primaryPerson.last_name}`
    : biz.business_legal_name;

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Profile</h1>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
          Manage your account information.
        </p>
      </div>

      {/* Header */}
      <Card className="rounded-2xl border-slate-200 dark:border-slate-700 shadow-sm">
        <CardContent className="p-6">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-full bg-emerald-50 dark:bg-emerald-900/20 flex items-center justify-center">
              <User className="w-7 h-7 text-emerald-500 dark:text-emerald-400" />
            </div>
            <div>
              <p className="font-semibold text-lg">{displayName}</p>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                {biz.email || user?.email}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tab Bar */}
      <div className="flex gap-1 border-b border-slate-200 dark:border-slate-700 overflow-x-auto">
        {PROFILE_TABS.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.key;
          return (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`flex items-center gap-2 px-4 py-2.5 text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${
                isActive
                  ? "border-emerald-500 text-emerald-600 dark:text-emerald-400"
                  : "border-transparent text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300"
              }`}
            >
              <Icon className="w-4 h-4" />
              <span className="hidden sm:inline">{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Tab Content */}
      {activeTab === "business" && (
        <Card className="rounded-2xl border-slate-200 dark:border-slate-700 shadow-sm">
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <Building2 className="w-4 h-4 text-emerald-500 dark:text-emerald-400" />
              Business Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Field icon={Building2} label="Legal Name" value={biz.business_legal_name} />
            <Field icon={FileText} label="Description" value={biz.business_description} />
            <Field icon={Mail} label="Email" value={biz.email} />
            <Field icon={FileText} label="Business Type" value={biz.business_type} />
            <Field icon={Landmark} label="Industry" value={biz.business_industry} />
            <Field icon={Hash} label="Registration Number" value={biz.business_registration_number} />
            <Field icon={Calendar} label="Date of Incorporation" value={biz.date_of_incorporation} />
            <Field icon={LinkIcon} label="Website" value={biz.primary_website} />
          </CardContent>
        </Card>
      )}

      {activeTab === "financial" && (
        <Card className="rounded-2xl border-slate-200 dark:border-slate-700 shadow-sm">
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <DollarSign className="w-4 h-4 text-emerald-500 dark:text-emerald-400" />
              Financial Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Field icon={FileText} label="Account Purpose" value={biz.account_purpose} />
            <Field icon={TrendingUp} label="Est. Annual Revenue" value={biz.estimated_annual_revenue_usd} />
            <Field icon={DollarSign} label="Monthly Fiat Deposits" value={biz.expected_monthly_fiat_deposits} />
            <Field icon={DollarSign} label="Monthly Fiat Withdrawals" value={biz.expected_monthly_fiat_withdrawals} />
            <Field icon={FileText} label="Source of Funds" value={biz.source_of_funds?.join(", ")} />
            <Field icon={FileText} label="Source of Wealth" value={biz.source_of_wealth?.join(", ")} />
          </CardContent>
        </Card>
      )}

      {activeTab === "tax" && (
        <Card className="rounded-2xl border-slate-200 dark:border-slate-700 shadow-sm">
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <Landmark className="w-4 h-4 text-emerald-500 dark:text-emerald-400" />
              Tax Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Field icon={Globe} label="Tax Country" value={biz.tax_country} />
            <Field icon={FileText} label="Tax Type" value={biz.tax_type} />
            <Field icon={Hash} label="Tax ID" value={biz.tax_id} />
            <Field icon={FileText} label="Publicly Traded" value={biz.publicly_traded ? "Yes" : "No"} />
          </CardContent>
        </Card>
      )}

      {activeTab === "documents" && (
        <Card className="rounded-2xl border-slate-200 dark:border-slate-700 shadow-sm">
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <FileText className="w-4 h-4 text-emerald-500 dark:text-emerald-400" />
              Business Documents
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {biz.documents?.length > 0 ? (
              biz.documents.map((doc: { doc_type: string; description: string }, i: number) => (
                <div key={i} className="space-y-2 pl-4 border-l-2 border-slate-200 dark:border-slate-700">
                  <Field icon={FileText} label="Document Type" value={doc.doc_type} />
                  <Field icon={FileText} label="Description" value={doc.description} />
                </div>
              ))
            ) : (
              <p className="text-sm text-slate-500 dark:text-slate-400">No documents uploaded.</p>
            )}
          </CardContent>
        </Card>
      )}

      {activeTab === "address" && (
        <Card className="rounded-2xl border-slate-200 dark:border-slate-700 shadow-sm">
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <MapPin className="w-4 h-4 text-emerald-500 dark:text-emerald-400" />
              Registered Address
            </CardTitle>
          </CardHeader>
          <CardContent>
            {addr?.registered_address ? (
              <AddressBlock address={addr.registered_address} />
            ) : (
              <p className="text-sm text-slate-500 dark:text-slate-400">No address on file.</p>
            )}
          </CardContent>
        </Card>
      )}

      {activeTab === "persons" && (
        <div className="space-y-4">
          {biz.associated_persons?.length > 0 ? (
            biz.associated_persons.map((person, i) => {
              const personAddr = addr?.person_addresses?.[i];
              return (
                <Card key={i} className="rounded-2xl border-slate-200 dark:border-slate-700 shadow-sm">
                  <CardHeader>
                    <CardTitle className="text-base">
                      {person.first_name} {person.middle_name ? `${person.middle_name} ` : ""}{person.last_name}
                    </CardTitle>
                    <div className="flex gap-2 mt-1">
                      {person.is_signer && <Badge variant="secondary">Signer</Badge>}
                      {person.is_director && <Badge variant="secondary">Director</Badge>}
                      {person.has_ownership && <Badge variant="secondary">Owner{person.ownership_percentage ? ` (${person.ownership_percentage}%)` : ""}</Badge>}
                      {person.has_control && <Badge variant="secondary">Control</Badge>}
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <Field icon={Mail} label="Email" value={person.email} />
                    <Field icon={Calendar} label="Date of Birth" value={person.birth_date} />
                    <Field icon={Globe} label="Nationality" value={person.primary_nationality} />
                    <Field icon={Hash} label="Tax ID" value={person.tax_id} />
                    <Field icon={FileText} label="Tax Type" value={person.tax_type} />
                    <Field icon={Globe} label="Tax Country" value={person.country_of_tax} />
                    {person.identifying_information?.length > 0 && (
                      <>
                        <Separator />
                        <p className="text-xs uppercase tracking-wider text-slate-500 dark:text-slate-400">
                          Identifying Documents
                        </p>
                        {person.identifying_information.map((id: { type: string; issuing_country: string; national_identity_number: string }, j: number) => (
                          <div key={j} className="space-y-2 pl-4 border-l-2 border-slate-200 dark:border-slate-700">
                            <Field icon={FileText} label="ID Type" value={id.type} />
                            <Field icon={Globe} label="Issuing Country" value={id.issuing_country} />
                            <Field icon={Hash} label="ID Number" value={id.national_identity_number} />
                          </div>
                        ))}
                      </>
                    )}
                    {person.poa && (
                      <>
                        <Separator />
                        <Field icon={FileText} label="Proof of Address Type" value={person.poa_type} />
                      </>
                    )}
                    {personAddr && (
                      <>
                        <Separator />
                        <div className="flex items-start gap-3">
                          <MapPin className="w-4 h-4 text-slate-500 dark:text-slate-400 mt-0.5" />
                          <div>
                            <p className="text-xs uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1">
                              Residential Address
                            </p>
                            <AddressBlock address={personAddr} />
                          </div>
                        </div>
                      </>
                    )}
                  </CardContent>
                </Card>
              );
            })
          ) : (
            <Card className="rounded-2xl border-slate-200 dark:border-slate-700 shadow-sm">
              <CardContent className="p-6">
                <p className="text-sm text-slate-500 dark:text-slate-400">No associated persons.</p>
              </CardContent>
            </Card>
          )}
        </div>
      )}
    </div>
  );
}
