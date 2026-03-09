"use client";

import { Building2, CheckCircle2 } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { InfoItem } from "@/components/dashboard/info-item";
import { useProfile } from "@/hooks/use-profile";
import Link from "next/link";

export function AccountInfoCard() {
  const { profile, loading } = useProfile();

  if (loading) {
    return (
      <Card className="rounded-[32px]">
        <CardHeader className="pb-4">
          <div className="flex items-center gap-3">
            <Skeleton className="h-10 w-10 rounded-xl" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-3 w-48" />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="space-y-2">
                <Skeleton className="h-3 w-20" />
                <Skeleton className="h-4 w-28" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="rounded-[32px]">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary-muted">
              <Building2 className="h-5 w-5 text-primary-muted-foreground" />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-foreground">Business Account</h3>
              <p className="text-xs text-muted-foreground">{profile?.email ?? "N/A"}</p>
            </div>
          </div>
          <div className="flex items-center gap-1.5 rounded-full border border-success-border bg-success-muted px-2.5 py-1">
            <CheckCircle2 className="h-3.5 w-3.5 text-success" />
            <span className="text-xs font-bold text-success-muted-foreground">Verified</span>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <InfoItem label="Business Name" value={profile?.businessLegalName} />
          <InfoItem label="Type" value={profile?.businessType} />
          <InfoItem label="Registration #" value={profile?.businessRegistrationNumber} />
          <InfoItem label="Industry" value={profile?.businessIndustry} />
        </div>

        <Link
          href="/dashboard/profile"
          className="inline-flex text-sm font-medium text-primary hover:text-primary/80"
        >
          View full profile &rarr;
        </Link>
      </CardContent>
    </Card>
  );
}
