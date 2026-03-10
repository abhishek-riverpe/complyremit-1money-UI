"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  TextFormField,
  SelectFormField,
  TextareaFormField,
  CheckboxFormField,
} from "@/components/onboarding/form-fields";
import { AddressForm } from "@/components/onboarding/address-form";
import { BUSINESS_TYPES, TAX_TYPES, COUNTRIES } from "@/lib/constants/onboarding";
import {
  editBusinessInfoSchema,
  editAddressSchema,
  type EditBusinessInfoValues,
  type EditAddressValues,
} from "@/lib/schemas/edit-profile";
import { profileToBusinessInfo, profileToAddress } from "@/lib/utils/profile-to-form";
import { updateCustomer } from "@/services/customer.service";
import type { UserProfile } from "@/types/profile";
import type { UpdateCustomerPayload } from "@/types/onboarding";

const STEPS = ["Business Info", "Address"] as const;

interface EditProfileDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  profile: UserProfile;
  onSuccess: () => void;
}

export function EditProfileDialog({
  open,
  onOpenChange,
  profile,
  onSuccess,
}: EditProfileDialogProps) {
  const [step, setStep] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const [businessData, setBusinessData] = useState<EditBusinessInfoValues | null>(null);

  const businessForm = useForm<EditBusinessInfoValues>({
    resolver: zodResolver(editBusinessInfoSchema),
    defaultValues: profileToBusinessInfo(profile),
  });

  const addressForm = useForm<EditAddressValues>({
    resolver: zodResolver(editAddressSchema),
    defaultValues: profileToAddress(profile),
  });

  function handleNext(data: EditBusinessInfoValues) {
    setBusinessData(data);
    setStep(1);
  }

  async function handleSubmit(addressData: EditAddressValues) {
    if (!businessData) return;

    setSubmitting(true);
    try {
      const payload: UpdateCustomerPayload = {};
      const original = profileToBusinessInfo(profile);
      const origAddr = profileToAddress(profile);

      // Only include changed business fields
      for (const key of Object.keys(businessData) as (keyof EditBusinessInfoValues)[]) {
        const newVal = businessData[key];
        const oldVal = original[key];
        if (newVal !== oldVal) {
          (payload as Record<string, unknown>)[key] = newVal;
        }
      }

      // Only include changed address fields
      const newAddr = addressData.registered_address;
      const oldAddr = origAddr.registered_address;
      const addrChanges: Record<string, string> = {};
      let hasAddrChanges = false;
      for (const key of Object.keys(newAddr) as (keyof typeof newAddr)[]) {
        if (newAddr[key] !== oldAddr[key]) {
          addrChanges[key] = newAddr[key];
          hasAddrChanges = true;
        }
      }
      if (hasAddrChanges) {
        payload.registered_address = addrChanges;
      }

      if (Object.keys(payload).length === 0) {
        toast.info("No changes to save.");
        onOpenChange(false);
        return;
      }

      await updateCustomer(payload);
      toast.success("Profile updated successfully.");
      onOpenChange(false);
      onSuccess();
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Failed to update profile.";
      toast.error(message);
    } finally {
      setSubmitting(false);
    }
  }

  function handleOpenChange(isOpen: boolean) {
    if (!isOpen) {
      setStep(0);
      setBusinessData(null);
      businessForm.reset(profileToBusinessInfo(profile));
      addressForm.reset(profileToAddress(profile));
    }
    onOpenChange(isOpen);
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Edit Profile</DialogTitle>
          <DialogDescription>
            Update your business information.
          </DialogDescription>
        </DialogHeader>

        {/* Step indicator */}
        <div className="flex items-center justify-center gap-3 py-2">
          {STEPS.map((label, i) => (
            <div key={label} className="flex items-center gap-2">
              <div
                className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-medium ${
                  i <= step
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground"
                }`}
              >
                {i + 1}
              </div>
              <span
                className={`text-sm ${
                  i <= step ? "text-foreground font-medium" : "text-muted-foreground"
                }`}
              >
                {label}
              </span>
              {i < STEPS.length - 1 && (
                <div className="w-8 h-px bg-border mx-1" />
              )}
            </div>
          ))}
        </div>

        {/* Step 1: Business Info */}
        {step === 0 && (
          <Form {...businessForm}>
            <form onSubmit={businessForm.handleSubmit(handleNext)} className="space-y-4">
              <Card className="border-border">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm">Business Information</CardTitle>
                </CardHeader>
                <CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <TextFormField
                    control={businessForm.control}
                    name="business_legal_name"
                    label="Legal Name"
                    placeholder="Acme Corp"
                  />
                  <TextFormField
                    control={businessForm.control}
                    name="email"
                    label="Business Email"
                    type="email"
                    placeholder="contact@acmecorp.com"
                  />
                  <SelectFormField
                    control={businessForm.control}
                    name="business_type"
                    label="Business Type"
                    options={BUSINESS_TYPES}
                  />
                  <TextFormField
                    control={businessForm.control}
                    name="business_industry"
                    label="Industry Code (NAICS)"
                    placeholder="311615"
                  />
                  <TextFormField
                    control={businessForm.control}
                    name="date_of_incorporation"
                    label="Date of Incorporation"
                    type="date"
                  />
                  <TextFormField
                    control={businessForm.control}
                    name="business_registration_number"
                    label="Registration Number"
                    placeholder="e.g. 12345678"
                  />
                  <TextFormField
                    control={businessForm.control}
                    name="primary_website"
                    label="Website"
                    placeholder="https://acmecorp.com"
                    className="sm:col-span-2"
                  />
                  <TextareaFormField
                    control={businessForm.control}
                    name="business_description"
                    label="Business Description"
                    placeholder="Describe your business..."
                    className="sm:col-span-2"
                  />
                  <CheckboxFormField
                    control={businessForm.control}
                    name="publicly_traded"
                    label="Publicly Traded"
                    className="sm:col-span-2"
                  />
                </CardContent>
              </Card>

              <Card className="border-border">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm">Tax Information</CardTitle>
                </CardHeader>
                <CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <SelectFormField
                    control={businessForm.control}
                    name="tax_country"
                    label="Tax Country"
                    options={COUNTRIES}
                  />
                  <SelectFormField
                    control={businessForm.control}
                    name="tax_type"
                    label="Tax Type"
                    options={TAX_TYPES}
                  />
                  <TextFormField
                    control={businessForm.control}
                    name="tax_id"
                    label="Tax ID"
                    placeholder="e.g. 12-3456789"
                    className="sm:col-span-2"
                  />
                </CardContent>
              </Card>

              <div className="flex justify-end">
                <Button type="submit">Next</Button>
              </div>
            </form>
          </Form>
        )}

        {/* Step 2: Address */}
        {step === 1 && (
          <Form {...addressForm}>
            <form onSubmit={addressForm.handleSubmit(handleSubmit)} className="space-y-4">
              <Card className="border-border">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm">Registered Address</CardTitle>
                </CardHeader>
                <CardContent>
                  <AddressForm
                    control={addressForm.control}
                    namePrefix="registered_address"
                  />
                </CardContent>
              </Card>

              <div className="flex justify-between">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setStep(0)}
                >
                  Back
                </Button>
                <Button type="submit" disabled={submitting}>
                  {submitting && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                  Save Changes
                </Button>
              </div>
            </form>
          </Form>
        )}
      </DialogContent>
    </Dialog>
  );
}
