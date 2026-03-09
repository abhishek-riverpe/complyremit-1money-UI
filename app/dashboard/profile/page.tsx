"use client";

import { useState, useEffect } from "react";
import { useProfile } from "@/hooks/use-profile";
import { getKybStatus } from "@/services/customer.service";
import { StatusBadge } from "@/components/dashboard/status-badge";
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
  Loader2,
  AlertCircle,
} from "lucide-react";
import type { AssociatedPersonProfile } from "@/types/profile";

const PROFILE_TABS = [
  { key: "business", label: "Business Info", icon: Building2 },
  { key: "financial", label: "Financial Info", icon: DollarSign },
  { key: "tax", label: "Tax Info", icon: Landmark },
  { key: "documents", label: "Documents", icon: FileText },
  { key: "address", label: "Address", icon: MapPin },
  { key: "persons", label: "Associated Persons", icon: User },
] as const;

function formatEnum(value: string | null | undefined): string {
  if (!value) return "—";
  const special: Record<string, string> = { llc: "LLC", dao: "DAO", ssn: "SSN", ein: "EIN", usd: "USD" };
  return value
    .split("_")
    .map((w) => special[w.toLowerCase()] ?? w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
    .join(" ");
}

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
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
      <div className="flex items-center gap-3">
        <Icon className="w-4 h-4 text-muted-foreground" />
        <span className="text-xs uppercase tracking-wider text-muted-foreground">
          {label}
        </span>
      </div>
      <span className="text-sm font-medium">{value || "—"}</span>
    </div>
  );
}

function AddressBlock({
  streetLine1,
  streetLine2,
  city,
  state,
  country,
  subdivision,
  postalCode,
}: {
  streetLine1: string | null;
  streetLine2?: string | null;
  city: string | null;
  state: string | null;
  country: string | null;
  subdivision?: string | null;
  postalCode: string | null;
}) {
  if (!streetLine1 && !city) return <p className="text-sm text-muted-foreground">No address on file.</p>;
  return (
    <p className="text-sm">
      {streetLine1}
      {streetLine2 && <>, {streetLine2}</>}
      <br />
      {city}, {state} {postalCode}
      {subdivision && <><br />{subdivision}</>}
      <br />
      {country}
    </p>
  );
}

export default function ProfilePage() {
  const { profile, loading, error } = useProfile();
  const [activeTab, setActiveTab] = useState("business");
  const [kybStatus, setKybStatus] = useState<string | null>(null);

  useEffect(() => {
    getKybStatus()
      .then((data) => setKybStatus(data?.status ?? null))
      .catch(() => setKybStatus(null));
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="w-6 h-6 animate-spin text-primary" />
        <span className="ml-2 text-sm text-muted-foreground">Loading profile...</span>
      </div>
    );
  }

  if (error || !profile) {
    return (
      <div className="flex flex-col items-center justify-center py-20 gap-2">
        <AlertCircle className="w-6 h-6 text-destructive" />
        <p className="text-sm text-destructive">{error ?? "Failed to load profile."}</p>
      </div>
    );
  }

  const primaryPerson = profile.associatedPersons?.[0];
  const displayName = primaryPerson
    ? `${primaryPerson.firstName} ${primaryPerson.lastName}`
    : profile.businessLegalName ?? "—";

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Profile</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Manage your account information.
        </p>
      </div>

      {/* Header */}
      <Card className="rounded-2xl border-border shadow-sm">
        <CardContent className="p-6">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-full bg-primary-muted flex items-center justify-center">
              <User className="w-7 h-7 text-primary" />
            </div>
            <div>
              <p className="font-semibold text-lg">{displayName}</p>
              <p className="text-sm text-muted-foreground">
                {profile.email}
              </p>
            </div>
            {kybStatus && (
              <div className="ml-auto">
                <StatusBadge status={kybStatus} />
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Tab Bar */}
      <div className="flex gap-1 border-b border-border overflow-x-auto">
        {PROFILE_TABS.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.key;
          return (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`flex items-center gap-2 px-4 py-2.5 text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${
                isActive
                  ? "border-primary text-primary"
                  : "border-transparent text-muted-foreground hover:text-foreground"
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
        <Card className="rounded-2xl border-border shadow-sm">
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <Building2 className="w-4 h-4 text-primary" />
              Business Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Field icon={Building2} label="Legal Name" value={profile.businessLegalName} />
            <Field icon={FileText} label="Description" value={profile.businessDescription} />
            <Field icon={Mail} label="Email" value={profile.email} />
            <Field icon={FileText} label="Business Type" value={formatEnum(profile.businessType)} />
            <Field icon={Landmark} label="Industry" value={profile.businessIndustry} />
            <Field icon={Hash} label="Registration Number" value={profile.businessRegistrationNumber} />
            <Field icon={Calendar} label="Date of Incorporation" value={profile.dateOfIncorporation} />
            <Field icon={LinkIcon} label="Website" value={profile.primaryWebsite} />
          </CardContent>
        </Card>
      )}

      {activeTab === "financial" && (
        <Card className="rounded-2xl border-border shadow-sm">
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <DollarSign className="w-4 h-4 text-primary" />
              Financial Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Field icon={FileText} label="Account Purpose" value={formatEnum(profile.accountPurpose)} />
            <Field icon={TrendingUp} label="Est. Annual Revenue" value={profile.estimatedAnnualRevenueUsd} />
            <Field icon={DollarSign} label="Monthly Fiat Deposits" value={profile.expectedMonthlyFiatDeposits} />
            <Field icon={DollarSign} label="Monthly Fiat Withdrawals" value={profile.expectedMonthlyFiatWithdrawals} />
            <Field icon={FileText} label="Source of Funds" value={profile.sourceOfFunds?.map(formatEnum).join(", ")} />
            <Field icon={FileText} label="Source of Wealth" value={profile.sourceOfWealth?.map(formatEnum).join(", ")} />
          </CardContent>
        </Card>
      )}

      {activeTab === "tax" && (
        <Card className="rounded-2xl border-border shadow-sm">
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <Landmark className="w-4 h-4 text-primary" />
              Tax Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Field icon={Globe} label="Tax Country" value={profile.taxCountry} />
            <Field icon={FileText} label="Tax Type" value={profile.taxType} />
            <Field icon={Hash} label="Tax ID" value={profile.taxId} />
            <Field icon={FileText} label="Publicly Traded" value={profile.publiclyTraded ? "Yes" : "No"} />
          </CardContent>
        </Card>
      )}

      {activeTab === "documents" && (
        <Card className="rounded-2xl border-border shadow-sm">
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <FileText className="w-4 h-4 text-primary" />
              Business Documents
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {profile.documents?.length > 0 ? (
              profile.documents.map((doc) => (
                <div key={doc.id} className="space-y-2 pl-4 border-l-2 border-border">
                  <Field icon={FileText} label="Document Type" value={formatEnum(doc.docType)} />
                  <Field icon={FileText} label="Description" value={doc.description} />
                </div>
              ))
            ) : (
              <p className="text-sm text-muted-foreground">No documents uploaded.</p>
            )}
          </CardContent>
        </Card>
      )}

      {activeTab === "address" && (
        <Card className="rounded-2xl border-border shadow-sm">
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <MapPin className="w-4 h-4 text-primary" />
              Registered Address
            </CardTitle>
          </CardHeader>
          <CardContent>
            <AddressBlock
              streetLine1={profile.registeredAddressStreetLine1}
              streetLine2={profile.registeredAddressStreetLine2}
              city={profile.registeredAddressCity}
              state={profile.registeredAddressState}
              country={profile.registeredAddressCountry}
              subdivision={profile.registeredAddressSubdivision}
              postalCode={profile.registeredAddressPostalCode}
            />
          </CardContent>
        </Card>
      )}

      {activeTab === "persons" && (
        <div className="space-y-4">
          {profile.associatedPersons?.length > 0 ? (
            profile.associatedPersons.map((person: AssociatedPersonProfile) => (
              <Card key={person.id} className="rounded-2xl border-border shadow-sm">
                <CardHeader>
                  <CardTitle className="text-base">
                    {person.firstName} {person.middleName ? `${person.middleName} ` : ""}{person.lastName}
                  </CardTitle>
                  <div className="flex gap-2 mt-1">
                    {person.isSigner && <Badge variant="secondary">Signer</Badge>}
                    {person.isDirector && <Badge variant="secondary">Director</Badge>}
                    {person.hasOwnership && <Badge variant="secondary">Owner{person.ownershipPercentage ? ` (${person.ownershipPercentage}%)` : ""}</Badge>}
                    {person.hasControl && <Badge variant="secondary">Control</Badge>}
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Field icon={Mail} label="Email" value={person.email} />
                  <Field icon={Calendar} label="Date of Birth" value={person.birthDate} />
                  <Field icon={Globe} label="Nationality" value={person.primaryNationality} />
                  <Field icon={Hash} label="Tax ID" value={person.taxId} />
                  <Field icon={FileText} label="Tax Type" value={person.taxType} />
                  <Field icon={Globe} label="Tax Country" value={person.countryOfTax} />
                  {person.identifyingDocuments?.length > 0 && (
                    <>
                      <Separator />
                      <p className="text-xs uppercase tracking-wider text-muted-foreground">
                        Identifying Documents
                      </p>
                      {person.identifyingDocuments.map((doc) => (
                        <div key={doc.id} className="space-y-2 pl-4 border-l-2 border-border">
                          <Field icon={FileText} label="ID Type" value={doc.type} />
                          <Field icon={Globe} label="Issuing Country" value={doc.issuingCountry} />
                          <Field icon={Hash} label="ID Number" value={doc.nationalIdentityNumber} />
                        </div>
                      ))}
                    </>
                  )}
                  {person.poaType && (
                    <>
                      <Separator />
                      <Field icon={FileText} label="Proof of Address Type" value={person.poaType} />
                    </>
                  )}
                  <Separator />
                  <div className="flex items-start gap-3">
                    <MapPin className="w-4 h-4 text-muted-foreground mt-0.5" />
                    <div>
                      <p className="text-xs uppercase tracking-wider text-muted-foreground mb-1">
                        Residential Address
                      </p>
                      <AddressBlock
                        streetLine1={person.residentialAddressStreetLine1}
                        streetLine2={person.residentialAddressStreetLine2}
                        city={person.residentialAddressCity}
                        state={person.residentialAddressState}
                        country={person.residentialAddressCountry}
                        subdivision={person.residentialAddressSubdivision}
                        postalCode={person.residentialAddressPostalCode}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          ) : (
            <Card className="rounded-2xl border-border shadow-sm">
              <CardContent className="p-6">
                <p className="text-sm text-muted-foreground">No associated persons.</p>
              </CardContent>
            </Card>
          )}
        </div>
      )}
    </div>
  );
}
