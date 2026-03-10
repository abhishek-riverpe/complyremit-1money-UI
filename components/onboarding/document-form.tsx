"use client";

import type { Control } from "react-hook-form";
import type { BusinessDetailsFormValues } from "@/lib/schemas/onboarding";
import {
  TextFormField,
  SelectFormField,
  FileUploadFormField,
} from "./form-fields";
import { DOCUMENT_TYPES } from "@/lib/constants/onboarding";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";

interface DocumentRowProps {
  control: Control<BusinessDetailsFormValues>;
  index: number;
  isRequired: boolean;
  onRemove: () => void;
}

export function DocumentRow({
  control,
  index,
  isRequired,
  onRemove,
}: DocumentRowProps) {
  return (
    <div className="space-y-4 border rounded-md p-4">
      <div className="grid grid-cols-1 sm:grid-cols-[1fr_1fr_auto] gap-4 items-end">
        <SelectFormField
          control={control}
          name={`documents.${index}.doc_type`}
          label="Document Type"
          options={DOCUMENT_TYPES}
          disabled={isRequired}
        />
        <FileUploadFormField
          control={control}
          name={`documents.${index}.file`}
          label="File"
          category="business_document"
        />
        <Button
          type="button"
          variant="destructive"
          size="icon"
          onClick={onRemove}
          disabled={isRequired}
          className={isRequired ? "opacity-50 cursor-not-allowed" : ""}
        >
          <Trash2 className="w-4 h-4" />
        </Button>
      </div>
      <TextFormField
        control={control}
        name={`documents.${index}.description`}
        label="Description"
        placeholder="e.g. Certificate of Formation"
      />
    </div>
  );
}
