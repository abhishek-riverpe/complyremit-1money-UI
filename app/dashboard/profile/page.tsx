"use client";

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
        <Icon className="w-4 h-4 text-muted-foreground" />
        <span className="text-xs uppercase tracking-wider text-muted-foreground">
          {label}
        </span>
      </div>
      <span className="text-sm font-medium">{value || "—"}</span>
    </div>
  );
}

function AddressBlock({ address }: { address: { street_line_1: string; street_line_2?: string; city: string; state: string; country: string; postal_code: string } }) {
  return (
    <p className="text-sm">
      {address.street_line_1}
      {address.street_line_2 && <>, {address.street_line_2}</>}
      <br />
      {address.city}, {address.state} {address.postal_code}
      <br />
      {address.country}
    </p>
  );
}

export default function ProfilePage() {
  const { user } = useAuth();
  const { state } = useOnboarding();

  const biz = state.businessDetails;
  const addr = state.addressDetails;

  if (!biz) {
    return (
      <div className="space-y-8">
        <div>
          <h1 className="text-2xl font-bold">Profile</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Manage your account information.
          </p>
        </div>
        <Card className="rounded-2xl">
          <CardContent className="p-6 text-center space-y-4">
            <User className="w-12 h-12 text-muted-foreground mx-auto" />
            <p className="text-muted-foreground">
              Complete onboarding to see your profile.
            </p>
            <Link
              href="/onboarding/business-details"
              className="inline-block bg-green-400 hover:bg-green-500 text-white rounded-lg px-4 py-2 text-sm font-medium transition-colors"
            >
              Start Onboarding
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  const primaryPerson = biz.associated_persons?.[0];
  const displayName = primaryPerson
    ? `${primaryPerson.first_name} ${primaryPerson.last_name}`
    : biz.business_legal_name;

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold">Profile</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Manage your account information.
        </p>
      </div>

      {/* Header */}
      <Card className="rounded-2xl">
        <CardContent className="p-6">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-full bg-green-50 flex items-center justify-center">
              <User className="w-7 h-7 text-green-500" />
            </div>
            <div>
              <p className="font-semibold text-lg">{displayName}</p>
              <p className="text-sm text-muted-foreground">
                {biz.email || user?.email}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Business Info */}
      <Card className="rounded-2xl">
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2">
            <Building2 className="w-4 h-4 text-green-500" />
            Business Information
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Field icon={Building2} label="Legal Name" value={biz.business_legal_name} />
          <Field icon={Mail} label="Email" value={biz.email} />
          <Field icon={FileText} label="Business Type" value={biz.business_type} />
          <Field icon={Landmark} label="Industry" value={biz.business_industry} />
          <Field icon={Hash} label="Registration Number" value={biz.business_registration_number} />
          <Field icon={Calendar} label="Date of Incorporation" value={biz.date_of_incorporation} />
          <Field icon={LinkIcon} label="Website" value={biz.primary_website} />
        </CardContent>
      </Card>

      {/* Financial Info */}
      <Card className="rounded-2xl">
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2">
            <DollarSign className="w-4 h-4 text-green-500" />
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

      {/* Tax Info */}
      <Card className="rounded-2xl">
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2">
            <Landmark className="w-4 h-4 text-green-500" />
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

      {/* Registered Address */}
      {addr?.registered_address && (
        <Card className="rounded-2xl">
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <MapPin className="w-4 h-4 text-green-500" />
              Registered Address
            </CardTitle>
          </CardHeader>
          <CardContent>
            <AddressBlock address={addr.registered_address} />
          </CardContent>
        </Card>
      )}

      {/* Associated Persons */}
      {biz.associated_persons?.length > 0 && (
        <div className="space-y-4">
          <h2 className="text-lg font-semibold flex items-center gap-2">
            <User className="w-5 h-5 text-green-500" />
            Associated Persons
          </h2>
          {biz.associated_persons.map((person, i) => {
            const personAddr = addr?.person_addresses?.[i];
            return (
              <Card key={i} className="rounded-2xl">
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
                  <Field icon={Globe} label="Tax Country" value={person.country_of_tax} />
                  {personAddr && (
                    <>
                      <Separator />
                      <div className="flex items-start gap-3">
                        <MapPin className="w-4 h-4 text-muted-foreground mt-0.5" />
                        <div>
                          <p className="text-xs uppercase tracking-wider text-muted-foreground mb-1">
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
          })}
        </div>
      )}
    </div>
  );
}
