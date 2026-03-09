"use client";

import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useOnboarding } from "@/components/providers/onboarding-provider";
import {
  businessDetailsSchema,
  type BusinessDetailsFormValues,
} from "@/lib/schemas/onboarding";
import {
  BUSINESS_TYPES,
  ACCOUNT_PURPOSES,
  SOURCE_OF_FUNDS,
  SOURCE_OF_WEALTH,
  REVENUE_RANGES,
  MONTHLY_VOLUME_RANGES,
  TAX_TYPES,
  COUNTRIES,
  DOCUMENT_TYPES,
  DEFAULT_PERSON,
  REQUIRED_DOCUMENTS_BY_BUSINESS_TYPE,
} from "@/lib/constants/onboarding";
import {
  TextFormField,
  SelectFormField,
  MultiSelectFormField,
  CheckboxFormField,
} from "@/components/onboarding/form-fields";
import { PersonFormFields } from "@/components/onboarding/person-form";
import { DocumentRow } from "@/components/onboarding/document-form";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Separator } from "@/components/ui/separator";
import { Plus } from "lucide-react";
import { useEffect } from "react";

export default function BusinessDetailsPage() {
  const { state, setBusinessDetails, isHydrated } = useOnboarding();
  const router = useRouter();

  // Guard: redirect to TOS if signedAgreementId is missing
  useEffect(() => {
    if (isHydrated && !state.signedAgreementId) {
      router.replace("/onboarding/tos");
    }
  }, [isHydrated, state.signedAgreementId, router]);

  const form = useForm<BusinessDetailsFormValues>({
    resolver: zodResolver(businessDetailsSchema),
    defaultValues: {
      business_legal_name: "",
      business_description: "",
      email: "",
      business_type: "",
      business_industry: "",
      date_of_incorporation: "",
      account_purpose: "",
      source_of_funds: [],
      source_of_wealth: [],
      publicly_traded: false,
      estimated_annual_revenue_usd: "",
      expected_monthly_fiat_deposits: "",
      expected_monthly_fiat_withdrawals: "",
      tax_country: "",
      tax_id: "",
      tax_type: "",
      business_registration_number: "",
      primary_website: "",
      associated_persons: [{ ...DEFAULT_PERSON }],
      documents: [],
    },
  });

  const {
    fields: personFields,
    append: appendPerson,
    remove: removePerson,
  } = useFieldArray({
    control: form.control,
    name: "associated_persons",
  });

  const {
    fields: docFields,
    append: appendDoc,
    remove: removeDoc,
  } = useFieldArray({
    control: form.control,
    name: "documents",
  });

  // Repopulate from context if returning to this step
  useEffect(() => {
    if (isHydrated && state.businessDetails) {
      form.reset(state.businessDetails);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isHydrated]);

  // Pre-populate required documents when business type changes
  const businessType = form.watch("business_type");
  useEffect(() => {
    if (!businessType) return;
    const required = REQUIRED_DOCUMENTS_BY_BUSINESS_TYPE[businessType] ?? [];
    if (required.length === 0) return;

    const currentDocs = form.getValues("documents");
    const currentDocTypes = new Set(currentDocs.map((d) => d.doc_type));

    const missing = required
      .filter((dt) => !currentDocTypes.has(dt))
      .map((dt) => ({ doc_type: dt, file: "", description: "" }));

    if (missing.length > 0) {
      form.setValue("documents", [...currentDocs, ...missing]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [businessType]);

  const onSubmit = (data: BusinessDetailsFormValues) => {
    setBusinessDetails(data);
    router.push("/onboarding/address-details");
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        {/* Business Information */}
        <Card>
          <CardHeader>
            <CardTitle>Business Information</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <TextFormField
              control={form.control}
              name="business_legal_name"
              label="Legal Business Name"
              placeholder="Acme Corporation"
            />
            <TextFormField
              control={form.control}
              name="email"
              label="Business Email"
              type="email"
              placeholder="contact@acmecorp.com"
            />
            <SelectFormField
              control={form.control}
              name="business_type"
              label="Business Type"
              options={BUSINESS_TYPES}
            />
            <TextFormField
              control={form.control}
              name="business_industry"
              label="Industry Code (NAICS)"
              placeholder="311615"
            />
            <TextFormField
              control={form.control}
              name="date_of_incorporation"
              label="Date of Incorporation"
              type="date"
            />
            <TextFormField
              control={form.control}
              name="business_registration_number"
              label="Registration Number"
              placeholder="e.g. 12345678"
            />
            <TextFormField
              control={form.control}
              name="primary_website"
              label="Primary Website"
              type="url"
              placeholder="https://example.com"
            />
            <TextFormField
              control={form.control}
              name="business_description"
              label="Business Description"
              placeholder="Describe your business activities..."
            />
          </CardContent>
        </Card>

        {/* Financial Details */}
        <Card>
          <CardHeader>
            <CardTitle>Financial Details</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <SelectFormField
              control={form.control}
              name="account_purpose"
              label="Account Purpose"
              options={ACCOUNT_PURPOSES}
            />
            <SelectFormField
              control={form.control}
              name="estimated_annual_revenue_usd"
              label="Estimated Annual Revenue"
              options={REVENUE_RANGES}
            />
            <SelectFormField
              control={form.control}
              name="expected_monthly_fiat_deposits"
              label="Expected Monthly Deposits"
              options={MONTHLY_VOLUME_RANGES}
            />
            <SelectFormField
              control={form.control}
              name="expected_monthly_fiat_withdrawals"
              label="Expected Monthly Withdrawals"
              options={MONTHLY_VOLUME_RANGES}
            />
          </CardContent>
        </Card>

        {/* Tax Information */}
        <Card>
          <CardHeader>
            <CardTitle>Tax Information</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <SelectFormField
              control={form.control}
              name="tax_country"
              label="Tax Country"
              options={COUNTRIES}
            />
            <SelectFormField
              control={form.control}
              name="tax_type"
              label="Tax Type"
              options={TAX_TYPES}
            />
            <TextFormField
              control={form.control}
              name="tax_id"
              label="Tax ID"
              placeholder="12-3456789"
            />
            <div className="flex items-end">
              <CheckboxFormField
                control={form.control}
                name="publicly_traded"
                label="Publicly Traded Company"
              />
            </div>
          </CardContent>
        </Card>

        {/* Source of Funds & Wealth */}
        <Card>
          <CardHeader>
            <CardTitle>Source of Funds & Wealth</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <MultiSelectFormField
              control={form.control}
              name="source_of_funds"
              label="Source of Funds"
              options={SOURCE_OF_FUNDS}
              placeholder="Select sources of funds"
            />
            <Separator />
            <MultiSelectFormField
              control={form.control}
              name="source_of_wealth"
              label="Source of Wealth"
              options={SOURCE_OF_WEALTH}
              placeholder="Select sources of wealth"
            />
          </CardContent>
        </Card>

        {/* Associated Persons */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between flex-wrap gap-2">
            <CardTitle>Associated Persons</CardTitle>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => appendPerson({ ...DEFAULT_PERSON })}
            >
              <Plus className="w-4 h-4 mr-1" />
              Add Person
            </Button>
          </CardHeader>
          <CardContent>
            {form.formState.errors.associated_persons?.root && (
              <p className="text-sm text-destructive mb-4">
                {form.formState.errors.associated_persons.root.message}
              </p>
            )}
            <Accordion type="multiple" defaultValue={["person-0"]}>
              {personFields.map((field, index) => (
                <AccordionItem key={field.id} value={`person-${index}`}>
                  <AccordionTrigger className="hover:no-underline">
                    <div className="flex items-center gap-2">
                      <span>
                        {form.watch(
                          `associated_persons.${index}.first_name`
                        ) ||
                          form.watch(
                            `associated_persons.${index}.last_name`
                          )
                          ? `${form.watch(`associated_persons.${index}.first_name`)} ${form.watch(`associated_persons.${index}.last_name`)}`
                          : `Person ${index + 1}`}
                      </span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <PersonFormFields
                      control={form.control}
                      personIndex={index}
                      onRemove={() => removePerson(index)}
                      canRemove={personFields.length > 1}
                      watchOwnership={form.watch(`associated_persons.${index}.has_ownership`)}
                    />
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </CardContent>
        </Card>

        {/* Documents */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between flex-wrap gap-2">
            <CardTitle>Documents</CardTitle>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => appendDoc({ doc_type: "", file: "", description: "" })}
            >
              <Plus className="w-4 h-4 mr-1" />
              Add Document
            </Button>
          </CardHeader>
          <CardContent className="space-y-4">
            {docFields.length === 0 && (
              <p className="text-sm text-muted-foreground">
                No documents added yet. Click &quot;Add Document&quot; to
                upload supporting documents.
              </p>
            )}
            {docFields.map((field, index) => {
              const docType = form.watch(`documents.${index}.doc_type`);
              const requiredTypes = REQUIRED_DOCUMENTS_BY_BUSINESS_TYPE[businessType] ?? [];
              const isRequired = requiredTypes.includes(docType);

              return (
                <DocumentRow
                  key={field.id}
                  control={form.control}
                  index={index}
                  isRequired={isRequired}
                  onRemove={() => removeDoc(index)}
                />
              );
            })}
          </CardContent>
        </Card>

        <div className="flex justify-end">
          <Button type="submit" size="lg">
            Continue to Address Details
          </Button>
        </div>
      </form>
    </Form>
  );
}
