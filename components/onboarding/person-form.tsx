"use client";

import type { Control } from "react-hook-form";
import type { BusinessDetailsFormValues } from "@/lib/schemas/onboarding";
import { useFieldArray } from "react-hook-form";
import {
  TextFormField,
  SelectFormField,
  CheckboxFormField,
  FileUploadFormField,
} from "./form-fields";
import {
  COUNTRIES,
  TAX_TYPES,
  ID_TYPES,
  DEFAULT_IDENTIFYING_INFO,
} from "@/lib/constants/onboarding";
import { Button } from "@/components/ui/button";
import { Plus, Trash2 } from "lucide-react";

interface PersonFormFieldsProps {
  control: Control<BusinessDetailsFormValues>;
  personIndex: number;
  onRemove: () => void;
  canRemove: boolean;
  watchOwnership: boolean;
}

export function PersonFormFields({
  control,
  personIndex,
  onRemove,
  canRemove,
  watchOwnership,
}: PersonFormFieldsProps) {
  return (
    <div className="space-y-6 pt-2">
      {/* Personal Details */}
      <div>
        <p className="text-sm font-medium text-muted-foreground mb-3">Personal Details</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <TextFormField
            control={control}
            name={`associated_persons.${personIndex}.first_name`}
            label="First Name"
            placeholder="John"
          />
          <TextFormField
            control={control}
            name={`associated_persons.${personIndex}.middle_name`}
            label="Middle Name"
            placeholder="Michael (optional)"
          />
          <TextFormField
            control={control}
            name={`associated_persons.${personIndex}.last_name`}
            label="Last Name"
            placeholder="Smith"
          />
          <TextFormField
            control={control}
            name={`associated_persons.${personIndex}.email`}
            label="Email"
            type="email"
            placeholder="john@example.com"
          />
          <TextFormField
            control={control}
            name={`associated_persons.${personIndex}.birth_date`}
            label="Date of Birth"
            type="date"
          />
          <SelectFormField
            control={control}
            name={`associated_persons.${personIndex}.primary_nationality`}
            label="Nationality"
            options={COUNTRIES}
          />
        </div>
      </div>

      {/* Roles & Ownership */}
      <div>
        <p className="text-sm font-medium text-muted-foreground mb-3">Roles & Ownership</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <CheckboxFormField
            control={control}
            name={`associated_persons.${personIndex}.has_ownership`}
            label="Has Ownership"
          />
          <CheckboxFormField
            control={control}
            name={`associated_persons.${personIndex}.has_control`}
            label="Has Control"
          />
          <CheckboxFormField
            control={control}
            name={`associated_persons.${personIndex}.is_signer`}
            label="Is Signer"
          />
          <CheckboxFormField
            control={control}
            name={`associated_persons.${personIndex}.is_director`}
            label="Is Director"
          />
        </div>
        {watchOwnership && (
          <div className="mt-4">
            <TextFormField
              control={control}
              name={`associated_persons.${personIndex}.ownership_percentage`}
              label="Ownership %"
              type="number"
              placeholder="e.g. 25"
            />
          </div>
        )}
      </div>

      {/* Tax Information */}
      <div>
        <p className="text-sm font-medium text-muted-foreground mb-3">Tax Information</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <SelectFormField
            control={control}
            name={`associated_persons.${personIndex}.country_of_tax`}
            label="Tax Country"
            options={COUNTRIES}
          />
          <SelectFormField
            control={control}
            name={`associated_persons.${personIndex}.tax_type`}
            label="Tax Type"
            options={TAX_TYPES}
          />
          <TextFormField
            control={control}
            name={`associated_persons.${personIndex}.tax_id`}
            label="Tax ID"
            placeholder="Tax ID number"
          />
        </div>
      </div>

      {/* Identifying Information */}
      <PersonIdentifyingInfo
        control={control}
        personIndex={personIndex}
      />

      {/* Proof of Address */}
      <div>
        <p className="text-sm font-medium text-muted-foreground mb-3">Proof of Address</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <TextFormField
            control={control}
            name={`associated_persons.${personIndex}.poa_type`}
            label="POA Type"
            placeholder="e.g. Utility bill, Bank statement"
          />
          <FileUploadFormField
            control={control}
            name={`associated_persons.${personIndex}.poa`}
            label="POA Document"
            category="poa"
          />
        </div>
      </div>

      {canRemove && (
        <div className="pt-2">
          <Button
            type="button"
            variant="destructive"
            size="sm"
            onClick={onRemove}
          >
            <Trash2 className="w-4 h-4 mr-1" />
            Remove Person
          </Button>
        </div>
      )}
    </div>
  );
}

function PersonIdentifyingInfo({
  control,
  personIndex,
}: {
  control: Control<BusinessDetailsFormValues>;
  personIndex: number;
}) {
  const { fields, append, remove } = useFieldArray({
    control,
    name: `associated_persons.${personIndex}.identifying_information` as const,
  });

  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <p className="text-sm font-medium text-muted-foreground">Identifying Information</p>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => append({ ...DEFAULT_IDENTIFYING_INFO })}
        >
          <Plus className="w-4 h-4 mr-1" />
          Add ID
        </Button>
      </div>
      <div className="space-y-4">
        {fields.map((field, idIndex) => (
          <div
            key={field.id}
            className="bg-muted/50 rounded-md p-4 space-y-4"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <SelectFormField
                control={control}
                name={`associated_persons.${personIndex}.identifying_information.${idIndex}.type`}
                label="ID Type"
                options={ID_TYPES}
              />
              <SelectFormField
                control={control}
                name={`associated_persons.${personIndex}.identifying_information.${idIndex}.issuing_country`}
                label="Issuing Country"
                options={COUNTRIES}
              />
              <TextFormField
                control={control}
                name={`associated_persons.${personIndex}.identifying_information.${idIndex}.national_identity_number`}
                label="ID Number"
                placeholder="ID number"
                className="sm:col-span-2"
              />
              <FileUploadFormField
                control={control}
                name={`associated_persons.${personIndex}.identifying_information.${idIndex}.image_front`}
                label="Front Image"
                category="id_front"
              />
              <FileUploadFormField
                control={control}
                name={`associated_persons.${personIndex}.identifying_information.${idIndex}.image_back`}
                label="Back Image"
                category="id_back"
              />
            </div>
            {fields.length > 1 && (
              <Button
                type="button"
                variant="destructive"
                size="sm"
                onClick={() => remove(idIndex)}
              >
                <Trash2 className="w-4 h-4 mr-1" />
                Remove ID
              </Button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
